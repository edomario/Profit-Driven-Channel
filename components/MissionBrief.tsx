
import React, { useRef } from 'react';
import { GeneratedReport, CheckoutItem } from '../types';
import { INDUSTRY_LEAK_TOKENS } from '../data/industryContext';
import {
   ShieldAlert, Lock, ArrowRight, CheckCircle2, FileText,
   AlertTriangle, Eye, Zap, Activity, Users, Brain, HeartPulse,
   Megaphone, Shield, Download, Star, ChevronDown, Printer, TrendingDown
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface MissionBriefProps {
   report: GeneratedReport;
   onUnlock: (item: CheckoutItem) => void;
}

const MissionBrief: React.FC<MissionBriefProps> = ({ report, onUnlock }) => {
   const scrollContainerRef = useRef<HTMLDivElement>(null);

   // --- 1. DATA PREP ---

   // Sort pillars by risk (Highest risk first)
   const criticalPillars = [...report.pillars]
      .sort((a, b) => b.riskScore - a.riskScore)
      .slice(0, 3); // Top 3 risks

   const sortedPillars = [...report.pillars].sort((a, b) => b.riskScore - a.riskScore);

   // Industry Context
   const industryKey = report.profileContext?.industry?.toLowerCase() || 'other';
   const leakTokens = INDUSTRY_LEAK_TOKENS[industryKey] || INDUSTRY_LEAK_TOKENS['other'];

   // Calculate Leak Range (Proxy Logic)
   const engineScore = report.pillars.find(p => p.name === 'Engine')?.score || 50;
   const fuelScore = report.pillars.find(p => p.name === 'Fuel')?.score || 50;
   const avgCore = (engineScore + fuelScore) / 2;

   let leakMin = 5;
   let leakMax = 10;
   if (avgCore < 40) { leakMin = 20; leakMax = 35; }
   else if (avgCore < 60) { leakMin = 10; leakMax = 25; }

   // Bonus Asset Logic based on #1 Critical Pillar
   const criticalPillarName = criticalPillars[0]?.name || 'Engine';
   const BONUS_ASSETS: Record<string, { title: string; type: string }> = {
      Engine: { title: 'Standard Operating Procedure (SOP) Template', type: 'Word' },
      Fuel: { title: '13-Week Cash Flow Forecast', type: 'Excel' },
      Voice: { title: 'High-Ticket Sales Script', type: 'PDF' },
      Brain: { title: 'Weekly Leadership Scorecard', type: 'Sheet' },
      Pulse: { title: 'Customer Feedback Log', type: 'Notion' },
      Shield: { title: 'Risk & Compliance Checklist', type: 'PDF' },
      Tribe: { title: 'Team Alignment One-Pager', type: 'PDF' }
   };
   const bonusAsset = BONUS_ASSETS[criticalPillarName] || BONUS_ASSETS['Engine'];

   const getPillarIcon = (name: string) => {
      switch (name) {
         case 'Engine': return Activity;
         case 'Fuel': return Zap;
         case 'Voice': return Megaphone;
         case 'Brain': return Brain;
         case 'Pulse': return HeartPulse;
         case 'Shield': return Shield;
         case 'Tribe': return Users;
         default: return Activity;
      }
   };

   const radarData = report.pillars.map(p => ({
      subject: p.name,
      A: p.score,
      fullMark: 100
   }));

   const handleUnlockClick = () => {
      onUnlock({
         id: 'report_unlock',
         title: 'Full Forensic Report & Fix Plan',
         description: `Unlock the 30-page deep scan, 7-day action plan, and profit simulator for ${report.profileContext?.businessName || 'your business'}.`,
         price: 97,
         type: 'one_time'
      });
   };

   return (
      <div className="min-h-screen bg-slate-100 font-sans text-slate-900 pb-24" ref={scrollContainerRef}>

         {/* Header / Nav */}
         <div className="bg-slate-900 text-white sticky top-0 z-30 shadow-md">
            <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <div className="bg-brand-600 p-2 rounded-lg">
                     <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="leading-tight">
                     <h1 className="text-sm font-bold uppercase tracking-wider text-slate-400">Profit Leak Field Report</h1>
                     <p className="font-bold">{report.profileContext?.businessName || 'Business Analysis'}</p>
                  </div>
               </div>
               <button
                  onClick={handleUnlockClick}
                  className="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg flex items-center gap-2"
               >
                  <Lock className="w-3 h-3" /> Unlock Full Scan ($97)
               </button>
            </div>
         </div>

         <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

            {/* --- PAGE 1: COVER & SNAPSHOT --- */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
               <div className="h-2 bg-gradient-to-r from-red-500 via-amber-500 to-green-500"></div>
               <div className="p-8 md:p-12">

                  {/* Metadata Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start border-b border-slate-100 pb-8 mb-8 gap-6">
                     <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                           {new Date().toLocaleDateString()} • REF: {report.id.substring(0, 8).toUpperCase()}
                        </p>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
                           Strategic Health Snapshot
                        </h1>
                        <div className="flex gap-2 text-sm text-slate-500">
                           <span className="bg-slate-100 px-2 py-1 rounded text-slate-700 font-medium">
                              {report.profileContext?.industry || 'General'} Edition
                           </span>
                           <span className="bg-slate-100 px-2 py-1 rounded text-slate-700 font-medium">
                              {report.profileContext?.size || 'Unknown'} Team
                           </span>
                        </div>
                     </div>

                     <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-xl border border-slate-100">
                        <div>
                           <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Archetype</p>
                           <p className="text-xl font-bold text-brand-600">{report.archetype}</p>
                        </div>
                        <div className="h-10 w-px bg-slate-200"></div>
                        <div>
                           <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Risk Score</p>
                           <p className="text-xl font-bold text-slate-900">{report.indices?.riskExposure || 50}/100</p>
                        </div>
                     </div>
                  </div>

                  {/* Executive Summary Teaser */}
                  <div className="prose prose-lg text-slate-600 mb-12 max-w-none">
                     <p className="font-medium text-slate-800 border-l-4 border-brand-500 pl-4">
                        {report.executiveSummary}
                     </p>
                     <p>
                        Our forensic analysis detected <strong>{criticalPillars.length} critical bottlenecks</strong> currently limiting your growth.
                        The data indicates that your primary constraint is in the <strong>{criticalPillars[0]?.name}</strong> pillar.
                     </p>
                  </div>

                  {/* Radar Chart */}
                  <div className="h-80 w-full mb-12">
                     <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                           <PolarGrid stroke="#e2e8f0" />
                           <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }} />
                           <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                           <Radar name="My Business" dataKey="A" stroke="#0f172a" fill="#0f172a" fillOpacity={0.2} />
                        </RadarChart>
                     </ResponsiveContainer>
                  </div>

                  {/* Critical Issues List */}
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                     <ShieldAlert className="w-4 h-4 text-red-600" /> Critical Leaks Detected
                  </h3>
                  <div className="grid gap-4">
                     {criticalPillars.map((p) => (
                        <div key={p.name} className="flex items-start gap-4 p-4 border border-red-100 bg-red-50/50 rounded-lg">
                           <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                           <div>
                              <h4 className="font-bold text-red-900">{p.name} System Failure</h4>
                              <p className="text-sm text-red-800 mt-1">{p.hiddenCost}</p>
                           </div>
                        </div>
                     ))}
                  </div>

               </div>
            </div>

            {/* --- PAGE 2: TEASER / LOCKED CONTENT --- */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
               <div className="p-8 md:p-12 opacity-50 blur-sm pointer-events-none select-none">
                  <h3 className="text-2xl font-bold mb-6">Detailed Fix Plan</h3>
                  <div className="space-y-6">
                     <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                     <div className="h-4 bg-slate-200 rounded w-full"></div>
                     <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                     <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="h-32 bg-slate-100 rounded-lg"></div>
                        <div className="h-32 bg-slate-100 rounded-lg"></div>
                     </div>
                  </div>
               </div>

               {/* Lock Overlay */}
               <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60">
                  <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 max-w-md text-center">
                     <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8" />
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 mb-2">Unlock the Full Report</h3>
                     <p className="text-slate-500 mb-6 text-sm">
                        Get the comprehensive 30-page forensic audit, including your 7-day fix plan, profit simulator, and deep dive analysis for every pillar.
                     </p>

                     <div className="space-y-3 mb-6 text-left text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                           <CheckCircle2 className="w-4 h-4 text-green-500" />
                           <span>30-Page Deep Scan PDF</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <CheckCircle2 className="w-4 h-4 text-green-500" />
                           <span>7-Day & 30-Day Action Plans</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <CheckCircle2 className="w-4 h-4 text-green-500" />
                           <span>Full Profit Simulator Access</span>
                        </div>
                     </div>

                     <button
                        onClick={handleUnlockClick}
                        className="w-full bg-black hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2"
                     >
                        Unlock Now <span className="text-brand-400 font-normal">| $97</span>
                     </button>
                     <p className="text-xs text-slate-400 mt-4">
                        100% Money-back guarantee. Secure payment.
                     </p>
                  </div>
               </div>
            </div>

         </div>
      </div>
   );
};

export default MissionBrief;
