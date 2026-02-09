
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { ShieldCheck, Mail, Lock, User as UserIcon, Briefcase, GraduationCap, Building2, ChevronRight, AlertCircle, Chrome, Facebook } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
  initialMode?: 'login' | 'signup';
}

const Auth: React.FC<AuthProps> = ({ onLogin, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [role, setRole] = useState<UserRole>('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // SUPER ADMIN BACKDOOR
    if (isLogin && formData.email === 'admin@execustay.com' && formData.password === 'admin') {
      const adminUser: User = {
        id: 'admin_god',
        name: 'Super Admin',
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=000&color=fff',
        tier: 'elite',
        status: 'approved'
      };
      onLogin(adminUser);
      return;
    }

    // Validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }
    if (!isLogin && !formData.name) {
      setError('Name is required for signup.');
      return;
    }

    // Determine status logic:
    // If Logging in: Assume approved for demo purposes (unless specific demo logic).
    // If Signing up: Trainers are 'pending', everyone else is 'approved'.
    let status: User['status'] = 'approved';
    if (!isLogin && role === 'trainer') {
       status = 'pending';
    }

    // Mock Login/Signup Success
    const mockUser: User = {
      id: `user_${Date.now()}`,
      name: isLogin ? 'Demo User' : formData.name,
      role: isLogin ? 'student' : role, // Default to student on generic login for demo
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(isLogin ? 'Demo User' : formData.name)}&background=random`,
      company: formData.company || undefined,
      tier: 'free',
      status: status
    };

    // If logging in as specific roles for demo purposes based on email hint
    if (isLogin) {
       if (formData.email.includes('trainer')) {
          mockUser.role = 'trainer';
          // Use 'pending' in email to simulate a pending trainer login
          if (formData.email.includes('pending')) {
             mockUser.status = 'pending';
          }
       }
       else if (formData.email.includes('consultant')) mockUser.role = 'consultant';
       else if (formData.email.includes('enterprise')) mockUser.role = 'enterprise_admin';
    }

    onLogin(mockUser);
  };

  const handleSocialLogin = (provider: string) => {
     // Mock Social Login - Trainers via social would likely need a follow-up step, but assume student for now or approved
     const mockUser: User = {
        id: `user_${provider}_${Date.now()}`,
        name: `${provider} User`,
        role: role, // Use selected role for signup flow or default
        avatar: `https://ui-avatars.com/api/?name=${provider}+User&background=random`,
        tier: 'free',
        status: role === 'trainer' && !isLogin ? 'pending' : 'approved'
     };
     onLogin(mockUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">P</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? 'Sign in to access your dashboard' : 'Join the execution marketplace'}
          </p>
        </div>

        {/* Super Admin Hint */}
        {isLogin && (
           <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex flex-col gap-2 text-xs text-blue-800">
              <div className="flex items-start gap-2">
                 <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                 <div>
                    <strong>Super Admin:</strong> <code>admin@execustay.com</code> / <code>admin</code>
                 </div>
              </div>
              <div className="flex items-start gap-2">
                 <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                 <div>
                    <strong>Pending Trainer:</strong> <code>pending_trainer@demo.com</code> / <code>any</code>
                 </div>
              </div>
           </div>
        )}

        <div className="space-y-4">
           {/* Social Sign-In Options */}
           <div className="grid grid-cols-2 gap-3">
              <button 
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                  <Chrome className="w-5 h-5 text-gray-600 mr-2" />
                  <span>Google</span>
              </button>
              <button 
                  type="button"
                  onClick={() => handleSocialLogin('Facebook')}
                  className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                  <Facebook className="w-5 h-5 text-blue-600 mr-2" />
                  <span>Facebook</span>
              </button>
           </div>

           <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
           </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
          {/* Role Selection (Signup Only) */}
          {!isLogin && (
            <div className="grid grid-cols-2 gap-3 mb-6">
               {[
                  { id: 'student', label: 'Student', icon: GraduationCap },
                  { id: 'trainer', label: 'Trainer', icon: Briefcase },
                  { id: 'consultant', label: 'Consultant', icon: UserIcon },
                  { id: 'enterprise_admin', label: 'Company', icon: Building2 }
               ].map((r) => (
                  <div 
                     key={r.id}
                     onClick={() => setRole(r.id as UserRole)}
                     className={`cursor-pointer border rounded-xl p-3 flex flex-col items-center justify-center transition-all ${role === r.id ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                     <r.icon className={`w-6 h-6 mb-2 ${role === r.id ? 'text-black' : 'text-gray-400'}`} />
                     <span className={`text-xs font-bold ${role === r.id ? 'text-black' : 'text-gray-500'}`}>{r.label}</span>
                  </div>
               ))}
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            {!isLogin && (
              <div className="relative">
                <UserIcon className="absolute top-3.5 left-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required={!isLogin}
                  className="appearance-none rounded-none rounded-t-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}
            <div className="relative">
               <Mail className="absolute top-3.5 left-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                className={`appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm ${isLogin ? 'rounded-t-md' : ''}`}
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="relative">
               <Lock className="absolute top-3.5 left-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                className="appearance-none rounded-none rounded-b-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {!isLogin && role === 'trainer' && (
             <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
                Note: Trainer accounts require admin approval before going live.
             </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
            >
              {isLogin ? 'Sign In' : 'Get Started'}
              <ChevronRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
           <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-sm font-medium text-gray-600 hover:text-black hover:underline"
           >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
           </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
