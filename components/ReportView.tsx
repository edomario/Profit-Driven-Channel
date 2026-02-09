import React, { useState } from 'react';
import { GeneratedReport, PillarReport, ViewState } from '../types';
import {
   ArrowLeft, Printer, Share2, AlertTriangle, CheckCircle2,
   Activity, Zap, Shield, Megaphone, Brain, HeartPulse, Users,
   TrendingUp, Clock, Calendar, Target, LayoutDashboard, Flag,
   ChevronDown, ChevronUp, AlertOctagon, Download, PlusCircle, PlayCircle, BarChart3, HelpCircle,
   FileText, Link as LinkIcon, ArrowRight, BookOpen
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { generateFixPlan } from '../services/fixEngine';
import PrintableReport from './PrintableReport';
import { AgroReportSection } from './AgroReportSection';
import ReactMarkdown from 'react-markdown'; // Ensure this package is available or simulate markdown rendering

interface ReportViewProps {
   report: GeneratedReport;
   onBack: () => void;
   onStartFix: (plan: any) => void;
}

const ReportView: React.FC<ReportViewProps> = ({ report, onBack, onStartFix }) => {
   const [activeTab, setActiveTab] = useState<'dashboard' | 'deep_dive' | 'roadmap' | 'action_plan'>('dashboard');
   const [expandedPillar, setExpandedPillar] = useState<string | null>(null);

   const handlePrint = () => {
      window.print();
   };

   const handleFixInitiation = () => {
      const plan = generateFixPlan(report);
      onStartFix(plan);
   };

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

   const rankingData = [...report.pillars]
      .sort((a, b) => b.riskScore - a.riskScore) // Highest risk first
      .map(p => ({
         name: p.name,
         risk: p.riskScore,
         fill: p.riskScore > 60 ? '#ef4444' : p.riskScore > 40 ? '#f59e0b' : '#22c55e'
      }));

   // --- RENDERERS ---



   const ExecutiveDashboard = () => (
      <div className="space-y-12 animate-fade-in">
         {/* Top Score Block */}
         <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
               <div className="flex-1">
                  <h2 className="text-3xl font-extrabold mb-4">Business Health Snapshot</h2>
                  <p className="text-slate-300 text-lg mb-8 max-w-2xl leading-relaxed">
                     Your strongest potential comes from fixing <span className="text-white font-bold underline">{rankingData[0].name}</span> and stabilizing <span className="text-white font-bold underline">{rankingData[1].name}</span>.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 print:hidden">
                     <button
                        onClick={handleFixInitiation}
                        className="bg-brand-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-400 transition-all shadow-lg shadow-brand-900/40 flex items-center justify-center gap-2 group"
                     >
                        Start Fix Plan <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                     </button>
                     <button
                        onClick={handlePrint}
                        className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                     >
                        <FileText className="w-5 h-5" /> Board Deck
                     </button>
                  </div>

                  <div className="grid grid-cols-3 gap-6 mt-12">
                     <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                        <div className="text-xs font-bold text-slate-400 uppercase">Time Leak</div>
                        <div className="text-2xl font-bold text-white mt-1">{report.indices?.timeLeak || 0}<span className="text-xs font-normal text-slate-500">/100</span></div>
                     </div>
                     <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                        <div className="text-xs font-bold text-slate-400 uppercase">Cash Leak</div>
                        <div className="text-2xl font-bold text-white mt-1">{report.indices?.cashLeak || 0}<span className="text-xs font-normal text-slate-500">/100</span></div>
                     </div>
                     <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                        <div className="text-xs font-bold text-slate-400 uppercase">Risk Index</div>
                        <div className="text-2xl font-bold text-white mt-1">{report.indices?.riskExposure || 0}<span className="text-xs font-normal text-slate-500">/100</span></div>
                     </div>
                  </div>
               </div>

               <div className="w-64 h-64 relative flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                     <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                        <Radar name="My Business" dataKey="A" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.3} />
                     </RadarChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>

         {/* MISSION BRIEF */}
         <div className="bg-white border-l-8 border-slate-900 p-8 rounded-r-2xl shadow-sm flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Mission Brief</h3>
               <p className="text-xl font-medium text-slate-800 leading-relaxed font-serif">
                  "{report.executiveSummary}"
               </p>
               <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Live Analysis • {report.date}
               </div>
            </div>
            <div className="w-full md:w-64 bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-2xl mb-2">
                  {report.archetype.includes('Sovereign') ? '👑' :
                     report.archetype.includes('General') ? '🛡️' :
                        report.archetype.includes('King') ? '⚔️' : '💎'}
               </div>
               <p className="text-xs font-bold text-slate-400 uppercase">Archetype</p>
               <p className="text-sm font-bold text-slate-900">{report.archetype}</p>
            </div>
         </div>

         {/* AGRO SPECIFIC REPORT */}
         <AgroReportSection report={report} />

         {/* Top 3 Leaks (Cards) */}
         <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
               <AlertOctagon className="w-5 h-5 text-red-600" /> Priority Fixes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[rankingData[0], rankingData[1], rankingData[2]].map((item, i) => {
                  const pillar = report.pillars.find(p => p.name === item.name);
                  if (!pillar) return null;

                  return (
                     <div key={item.name} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                           <h4 className="font-bold text-lg text-gray-900">{item.name}</h4>
                           <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${item.risk > 60 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                              {pillar.band}
                           </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed font-medium">
                           {pillar.quickScanAnalysis || pillar.hiddenCost}
                        </p>

                        <div className="mt-auto space-y-3 pt-4 border-t border-gray-100">
                           <div className="flex items-start gap-2">
                              <TrendingUp className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-gray-600">{pillar.profitConsequence ? pillar.profitConsequence[0] : 'Impacts profit stability'}</p>
                           </div>
                           <div className="flex items-start gap-2">
                              <Zap className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                              <p className="text-xs font-bold text-brand-700">{pillar.fixLever.action}</p>
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );

   const PillarDeepDives = () => (
      <div className="space-y-16 animate-fade-in">
         {report.pillars.map((pillar, idx) => {
            const isExpanded = expandedPillar === pillar.name || pillar.riskScore > 60;
            const Icon = getPillarIcon(pillar.name);

            return (
               <div key={idx} className={`border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 bg-white ${pillar.riskScore > 60 ? 'border-red-200 ring-4 ring-red-50' : 'border-gray-200'}`}>

                  {/* 1. Header Card */}
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setExpandedPillar(isExpanded ? null : pillar.name)}>
                     <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-2xl text-white shadow-sm ${pillar.riskScore > 60 ? 'bg-red-600' : pillar.riskScore > 30 ? 'bg-amber-500' : 'bg-green-600'}`}>
                           {pillar.score}
                        </div>
                        <div>
                           <h3 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                              {pillar.name}
                              {pillar.riskScore > 60 && <AlertOctagon className="w-5 h-5 text-red-600" />}
                           </h3>
                           <div className="flex items-center gap-2 mt-1">
                              <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${pillar.riskScore > 60 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'}`}>
                                 {pillar.band}
                              </span>
                              <span className="text-xs text-gray-400">• Read Time: 5 mins</span>
                           </div>
                        </div>
                     </div>
                     <div className="text-gray-400">
                        {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                     </div>
                  </div>

                  {isExpanded && (
                     <div className="bg-gray-50/50 p-8 space-y-12">

                        {/* BOOK: CHAPTER CONTENT */}
                        {pillar.deepScanChapter ? (
                           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                              {/* Left Rail: The Narrative */}
                              <div className="lg:col-span-2 space-y-10">

                                 <div className="prose prose-lg text-slate-700 max-w-none">
                                    {/* Section 1: Theory */}
                                    <ReactMarkdown>{pillar.deepScanChapter.theory}</ReactMarkdown>

                                    <hr className="my-8 border-slate-200" />

                                    {/* Section 2: Diagnosis */}
                                    <ReactMarkdown>{pillar.deepScanChapter.diagnosis}</ReactMarkdown>
                                 </div>

                                 <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                                    <ReactMarkdown className="prose prose-sm max-w-none text-blue-900">{pillar.deepScanChapter.psychology}</ReactMarkdown>
                                 </div>

                                 <div className="prose prose-lg text-slate-700 max-w-none">
                                    <ReactMarkdown>{pillar.deepScanChapter.financials}</ReactMarkdown>
                                 </div>

                              </div>

                              {/* Right Rail: Evidence & Action */}
                              <div className="space-y-8">
                                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-32">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                       <FileText className="w-4 h-4" /> Detected Signals
                                    </h4>
                                    <ul className="space-y-4 mb-8">
                                       {pillar.evidenceSnapshots.map((snap, i) => (
                                          <li key={i} className="text-sm">
                                             <span className="font-bold block text-slate-900 mb-1">{snap.observation}</span>
                                             <span className="text-slate-500 text-xs">{snap.whyItMatters}</span>
                                          </li>
                                       ))}
                                    </ul>

                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                       <Zap className="w-4 h-4" /> Immediate Prescription
                                    </h4>
                                    <div className="bg-brand-50 p-4 rounded-lg border border-brand-100 text-brand-900 text-sm font-medium mb-4">
                                       {pillar.fixLever.action}
                                    </div>

                                    <button
                                       onClick={handleFixInitiation}
                                       className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
                                    >
                                       Activate Fix Plan
                                    </button>
                                 </div>
                              </div>

                           </div>
                        ) : (
                           // Fallback if no chapter data
                           <div className="text-center py-12">
                              <p>Deep scan data generating...</p>
                           </div>
                        )}

                        {/* CARD 3: FIX PLAN (The "Consulting" Value) */}
                        <div className="bg-white border-2 border-brand-100 rounded-xl overflow-hidden shadow-sm mt-8">
                           <div className="bg-brand-50 p-4 border-b border-brand-100 flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                 <BookOpen className="w-5 h-5 text-brand-600" />
                                 <h4 className="font-bold text-brand-900">Execution Protocol</h4>
                              </div>
                           </div>

                           <div className="p-8">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                 {/* 7 Day */}
                                 <div>
                                    <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                       <Clock className="w-4 h-4 text-gray-400" /> Phase 1: Stabilization (7 Days)
                                    </h5>
                                    <ul className="space-y-4">
                                       {pillar.actions.filter(a => a.type === 'today' || a.type === 'week').map((act, i) => (
                                          <li key={i} className="flex gap-3">
                                             <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">{i + 1}</div>
                                             <div>
                                                <p className="text-sm font-bold text-gray-900">{act.text}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{act.owner} • Metric: {act.metric}</p>
                                             </div>
                                          </li>
                                       ))}
                                    </ul>
                                 </div>

                                 {/* 30 Day */}
                                 <div>
                                    <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                       <Calendar className="w-4 h-4 text-gray-400" /> Phase 2: Systemization (30 Days)
                                    </h5>
                                    <ul className="space-y-4">
                                       {pillar.actions.filter(a => a.type === 'month').map((act, i) => (
                                          <li key={i} className="flex gap-3">
                                             <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">{i + 1}</div>
                                             <div>
                                                <p className="text-sm font-bold text-gray-900">{act.text}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{act.owner} • Metric: {act.metric}</p>
                                             </div>
                                          </li>
                                       ))}
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>

                     </div>
                  )}
               </div>
            );
         })}
      </div>
   );

   const RoadmapView = () => (
      <div className="space-y-8 animate-fade-in">
         <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">90-Day Execution Timeline</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
               Don't try to fix everything at once. Follow this sequence to stabilize first, then scale.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="absolute top-8 left-0 w-full h-1 bg-gray-200 hidden md:block -z-10"></div>

            {/* Phase 1 */}
            <div className="bg-white p-6 rounded-xl border-t-4 border-red-500 shadow-lg">
               <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-lg mb-4 border-4 border-white">1</div>
               <h3 className="font-bold text-xl text-gray-900 mb-1">Stabilize</h3>
               <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-6">Days 0-30</p>
               <ul className="space-y-4">
                  {report.pillars.filter(p => p.riskScore > 50).map(p => (
                     <li key={p.name} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700">Fix {p.name} leaks</span>
                     </li>
                  ))}
                  <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
                     <span className="text-sm font-medium text-gray-700">Stop cash bleeding</span>
                  </li>
               </ul>
            </div>

            {/* Phase 2 */}
            <div className="bg-white p-6 rounded-xl border-t-4 border-amber-500 shadow-lg">
               <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold text-lg mb-4 border-4 border-white">2</div>
               <h3 className="font-bold text-xl text-gray-900 mb-1">Systemize</h3>
               <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-6">Days 31-60</p>
               <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                     <span className="text-sm font-medium text-gray-700">Install core SOPs</span>
                  </li>
                  <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                     <span className="text-sm font-medium text-gray-700">Delegation limits</span>
                  </li>
                  <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                     <span className="text-sm font-medium text-gray-700">Weekly scorecard rhythm</span>
                  </li>
               </ul>
            </div>

            {/* Phase 3 */}
            <div className="bg-white p-6 rounded-xl border-t-4 border-green-500 shadow-lg">
               <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-lg mb-4 border-4 border-white">3</div>
               <h3 className="font-bold text-xl text-gray-900 mb-1">Scale</h3>
               <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-6">Days 61-90</p>
               <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                     <span className="text-sm font-medium text-gray-700">Hiring & Training</span>
                  </li>
                  <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                     <span className="text-sm font-medium text-gray-700">Marketing automation</span>
                  </li>
                  <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                     <span className="text-sm font-medium text-gray-700">New offer launch</span>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );

   const renderActionGenerator = () => (
      <div className="space-y-8 animate-fade-in">
         <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
               <h2 className="text-3xl font-bold mb-2">Automated Action Plan</h2>
               <p className="text-gray-400">
                  Based on the {report.pillars.filter(p => p.riskScore > 60).length} critical risks identified, here is your prioritized execution list.
               </p>
            </div>
            <button onClick={() => window.print()} className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-100 flex items-center gap-2">
               <Printer className="w-4 h-4" /> Print Checklist
            </button>
         </div>

         <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="space-y-8">
               {/* Phase 1 */}
               <div>
                  <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
                     <Clock className="w-5 h-5 text-red-600" /> Phase 1: Stabilize (Week 1)
                  </h3>
                  <div className="space-y-3">
                     {report.pillars.map(p => (
                        p.riskScore > 60 && p.actions.filter(a => a.type === 'today' || a.type === 'week').map((act, i) => (
                           <label key={`${p.name}_7_${i}`} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-200">
                              <input type="checkbox" className="mt-1 w-4 h-4 text-black rounded border-gray-300 focus:ring-black" />
                              <div>
                                 <span className="font-bold text-gray-900">{act.text}</span>
                                 <span className="block text-xs text-gray-500">Fixing: {p.name}</span>
                              </div>
                           </label>
                        ))
                     ))}
                  </div>
               </div>

               {/* Phase 2 */}
               <div>
                  <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
                     <Target className="w-5 h-5 text-amber-500" /> Phase 2: Systemize (Days 14-30)
                  </h3>
                  <div className="space-y-3">
                     {report.pillars.map(p => (
                        p.riskScore > 60 && p.actions.filter(a => a.type === 'month').map((act, i) => (
                           <label key={`${p.name}_30_${i}`} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-200">
                              <input type="checkbox" className="mt-1 w-4 h-4 text-black rounded border-gray-300 focus:ring-black" />
                              <div>
                                 <span className="font-medium text-gray-800">{act.text}</span>
                                 <span className="block text-xs text-gray-500">Fixing: {p.name}</span>
                              </div>
                           </label>
                        ))
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );

   return (
      <div className="min-h-screen bg-gray-50 py-8 font-sans text-slate-900 print:bg-white print:py-0">

         {/* Sticky Header */}
         <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm px-6 py-4 flex justify-between items-center print:hidden">
            <div className="flex items-center gap-4">
               <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                  <ArrowLeft className="w-5 h-5" />
               </button>
               <div>
                  <h1 className="text-lg font-bold text-gray-900">Deep Scan Report</h1>
                  <p className="text-xs text-gray-500">{report.archetype} • {report.date}</p>
               </div>
            </div>

            {/* Tab Switcher */}
            <div className="flex bg-gray-100 p-1 rounded-lg">
               {['dashboard', 'deep_dive', 'roadmap', 'action_plan'].map(tab => (
                  <button
                     key={tab}
                     onClick={() => setActiveTab(tab as any)}
                     className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
                  >
                     {tab.replace('_', ' ')}
                  </button>
               ))}
            </div>

            <div className="flex gap-2">
               <button onClick={handleFixInitiation} className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-700 transition-colors flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Start Fix
               </button>
               <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold hover:bg-gray-50">
                  <Printer className="w-4 h-4" /> PDF
               </button>
            </div>
         </div>

         <div className="max-w-6xl mx-auto p-8 print:hidden">
            {activeTab === 'dashboard' && <ExecutiveDashboard />}
            {activeTab === 'deep_dive' && <PillarDeepDives />}
            {activeTab === 'roadmap' && <RoadmapView />}
            {activeTab === 'action_plan' && renderActionGenerator()}
         </div>

         {/* --- PRINT ONLY REPORT --- */}
         <PrintableReport report={report} />

      </div>
   );
};

export default ReportView;
