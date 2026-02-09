
import React from 'react';
import { 
  LayoutDashboard, Zap, BookOpen, Settings, Users, CreditCard, Briefcase, 
  BarChart2, Video, FileText, BrainCircuit, Library, ArrowUpCircle, Flag, 
  ShieldAlert, Gavel, Activity, Megaphone, Building2, Newspaper, Sparkles
} from 'lucide-react';
import { ViewState, UserRole } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  userRole: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, userRole }) => {
  
  const getMenuItems = (role: UserRole) => {
    const common = [
      { id: 'blog_feed', label: 'Blog', icon: Newspaper },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];

    switch (role) {
      case 'student':
        return [
          { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
          { id: 'second_brain', label: 'Second Brain', icon: BrainCircuit },
          { id: 'locker', label: 'Learning Locker', icon: Library },
          { id: 'action_lab', label: 'Action Lab', icon: Zap },
          { id: 'ai_ad_studio', label: 'AI Ad Studio', icon: Sparkles },
          { id: 'catalog', label: 'Marketplace', icon: BookOpen },
          { id: 'pricing', label: 'Upgrade Tier', icon: ArrowUpCircle },
          ...common
        ];
      case 'trainer':
        return [
          { id: 'dashboard', label: 'Partner Dashboard', icon: LayoutDashboard },
          { id: 'studio', label: 'Content Studio', icon: Video },
          { id: 'students', label: 'My Students', icon: Users },
          { id: 'ad_manager', label: 'Promotions', icon: Megaphone },
          { id: 'ai_ad_studio', label: 'AI Ad Studio', icon: Sparkles },
          { id: 'billing', label: 'Earnings', icon: BarChart2 },
          ...common
        ];
      case 'consultant':
        return [
          { id: 'consultant_dashboard', label: 'Command Center', icon: LayoutDashboard },
          { id: 'clients', label: 'Client List', icon: Briefcase },
          { id: 'ad_manager', label: 'Promotions', icon: Megaphone },
          { id: 'ai_ad_studio', label: 'AI Ad Studio', icon: Sparkles },
          { id: 'consultant_marketplace', label: 'View Marketplace', icon: BookOpen },
          { id: 'consultant_onboarding', label: 'Build Profile', icon: Flag },
          ...common
        ];
      case 'enterprise_admin':
        return [
          { id: 'dashboard', label: 'Company Overview', icon: LayoutDashboard },
          { id: 'company_profile', label: 'Public Profile', icon: Building2 },
          { id: 'ad_manager', label: 'Ads & Sponsors', icon: Megaphone },
          { id: 'ai_ad_studio', label: 'AI Ad Studio', icon: Sparkles },
          { id: 'team', label: 'Team Management', icon: Users },
          { id: 'billing', label: 'Billing & Seats', icon: CreditCard },
          ...common
        ];
      case 'admin':
        return [
          { id: 'admin_dashboard', label: 'Platform Overview', icon: Activity },
          { id: 'admin_verifications', label: 'Verifications', icon: ShieldAlert },
          { id: 'admin_dashboard', label: 'Disputes & Finance', icon: Gavel },
          { id: 'ad_manager', label: 'Ad Policy Review', icon: Megaphone },
          ...common
        ];
      default:
        return [{ id: 'dashboard', label: 'Overview', icon: LayoutDashboard }, ...common];
    }
  };

  const menuItems = getMenuItems(userRole);

  return (
    <aside className="w-[280px] bg-surface-container h-[calc(100vh-72px)] hidden md:flex flex-col sticky top-[72px] p-3 overflow-y-auto">
      <div className="mb-4 px-4 mt-2">
        <h3 className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-widest">
          {userRole.replace('_', ' ')}
        </h3>
      </div>
      
      <nav className="space-y-1 flex-1">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as ViewState)}
              className={`w-full flex items-center h-[56px] px-4 rounded-full transition-all duration-200 group relative
                ${isActive 
                  ? 'bg-secondary-container text-on-secondary-container font-bold shadow-sm' 
                  : 'text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface'
                }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-on-secondary-container' : 'text-on-surface-variant group-hover:text-on-surface'}`} />
              <span className="text-sm tracking-wide">{item.label}</span>
              
              {isActive && (
                 <span className="absolute right-4 w-1.5 h-1.5 rounded-full bg-on-secondary-container"></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info Card */}
      <div className="mt-auto px-2 pb-4">
        <div className="bg-surface p-4 rounded-2xl border border-outline/10 shadow-sm">
           {userRole === 'student' && (
             <>
               <div className="flex justify-between items-center mb-2">
                 <span className="text-xs font-bold text-primary">Pro Member</span>
                 <span className="text-[10px] bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full">Active</span>
               </div>
               <div className="w-full bg-surface-variant rounded-full h-1">
                 <div className="bg-primary h-1 rounded-full w-3/4"></div>
               </div>
               <p className="text-[10px] text-on-surface-variant mt-2 text-right">75% to Elite</p>
             </>
           )}
           {userRole !== 'student' && (
              <div className="text-xs text-on-surface-variant text-center">
                 <p className="font-bold text-on-surface">ExecuStay v2.4</p>
                 <p>Material Design 3 Enabled</p>
              </div>
           )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
