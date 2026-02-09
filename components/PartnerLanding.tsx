
import React from 'react';
import { 
  Users, 
  Activity, 
  ShieldAlert, 
  TrendingUp, 
  ArrowRight, 
  BarChart2, 
  CheckCircle2, 
  FileText,
  Zap,
  Globe
} from 'lucide-react';

interface PartnerLandingProps {
  onJoin: () => void;
  onLogin: () => void;
}

const PartnerLanding: React.FC<PartnerLandingProps> = ({ onJoin, onLogin }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* 1. Hero Section */}
      <div className="relative bg-slate-900 text-white pt-24 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-900 rounded-full blur-3xl opacity-20 -mr-40 -mt-40 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-800/50 border border-brand-700 rounded-full px-4 py-1.5 mb-8 animate-in fade-in slide-in-from-top-4">
             <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
             <span className="text-xs font-bold text-brand-100 tracking-wide uppercase">Partner Ecosystem Now Live</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight max-w-4xl mx-auto">
            Diagnose all your clients in one click. <br/>
            <span className="text-brand-400">Look like a genius.</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Instantly reveal hidden profit leaks across Finance, Ops, Marketing, and Risk. 
            Get a "Health Map" for your entire portfolio and actionable plans you can monetize.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onJoin}
              className="w-full sm:w-auto bg-brand-500 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-brand-600 transition-all shadow-lg shadow-brand-900/50 flex items-center justify-center gap-2"
            >
              Become a Partner <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={onLogin}
              className="w-full sm:w-auto bg-transparent border border-slate-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-all"
            >
              Partner Login
            </button>
          </div>
        </div>
      </div>

      {/* 2. How it Works */}
      <div className="py-20 bg-gray-50 border-b border-gray-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">The Business Doctor Protocol</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               <div className="text-center relative">
                  <div className="w-16 h-16 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                     <Zap className="w-8 h-8 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">1. Send Diagnostic Link</h3>
                  <p className="text-gray-600">Your client answers a 7-minute Quick Scan. No login required for them.</p>
                  
                  {/* Connector Line */}
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-gray-200"></div>
               </div>
               
               <div className="text-center relative">
                  <div className="w-16 h-16 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                     <BarChart2 className="w-8 h-8 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">2. Get Health Map</h3>
                  <p className="text-gray-600">See a 7-pillar radar chart, critical risks, and benchmark position instantly.</p>
                  
                  {/* Connector Line */}
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-gray-200"></div>
               </div>
               
               <div className="text-center">
                  <div className="w-16 h-16 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                     <ShieldAlert className="w-8 h-8 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">3. Act Before Crisis</h3>
                  <p className="text-gray-600">Receive alerts when a client is heading toward a cash crash or compliance risk.</p>
               </div>
            </div>
         </div>
      </div>

      {/* 3. Partner Type Benefits */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Who is this for?</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition-all bg-white">
               <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <h3 className="font-bold text-lg">Accountants</h3>
               </div>
               <p className="text-gray-600 mb-6 text-sm">
                  Move beyond tax filing. Spot cash leaks, margin erosion, and compliance risks before they become debt.
               </p>
               <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Cashflow Alerts</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Margin Analysis</li>
               </ul>
            </div>

            <div className="p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition-all bg-white">
               <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                  <h3 className="font-bold text-lg">Business Coaches</h3>
               </div>
               <p className="text-gray-600 mb-6 text-sm">
                  Stop guessing. See the real bottleneck—leadership, execution, or sales—not just the symptoms they tell you.
               </p>
               <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Leadership Blindspots</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Team Alignment</li>
               </ul>
            </div>

            <div className="p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition-all bg-white">
               <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-amber-600" />
                  <h3 className="font-bold text-lg">Incubators</h3>
               </div>
               <p className="text-gray-600 mb-6 text-sm">
                  Track 50+ startups like a portfolio. See who is ready for investment and who is about to crash.
               </p>
               <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Portfolio Heatmap</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Investment Readiness</li>
               </ul>
            </div>
         </div>
      </div>

      {/* 4. Pricing / Wholesale */}
      <div className="bg-slate-900 text-white py-20">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Wholesale Power</h2>
            <p className="text-slate-300 text-lg mb-10">
               Buy diagnostic credits in bulk. Resell them or bundle them into your retainer.
               <br/>You only pay when you send a link.
            </p>
            <div className="bg-white/10 rounded-xl p-8 border border-white/20 inline-block text-left">
               <div className="flex items-center justify-between gap-12 mb-4">
                  <span className="font-bold text-lg">Partner Rate</span>
                  <span className="font-mono text-2xl font-bold text-green-400">50% OFF</span>
               </div>
               <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> White-label reports</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> Client Dashboard</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> Priority Support</li>
               </ul>
               <button onClick={onJoin} className="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                  View Partner Plans
               </button>
            </div>
         </div>
      </div>

    </div>
  );
};

export default PartnerLanding;
