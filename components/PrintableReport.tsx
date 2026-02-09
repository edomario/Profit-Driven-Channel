import React from 'react';
import { GeneratedReport } from '../types';
import {
   Activity, Zap, Shield, Megaphone, Brain, HeartPulse, Users,
   TrendingDown, CheckCircle2, AlertTriangle, Target, Clock
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface PrintableReportProps {
   report: GeneratedReport;
}

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

const PrintableReport: React.FC<PrintableReportProps> = ({ report }) => {
   const radarData = report.pillars.map(p => ({
      subject: p.name,
      A: p.score,
      fullMark: 100
   }));

   const sortedPillars = [...report.pillars].sort((a, b) => b.riskScore - a.riskScore);
   const criticalCount = report.pillars.filter(p => p.riskScore > 60).length;

   return (
      <div className="hidden print:block bg-white text-black font-sans w-full" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>

         {/* --- PAGE 1: COVER --- */}
         <div className="h-screen flex flex-col justify-between p-16 border-b-8 border-slate-900 relative">
            <div className="absolute top-0 right-0 p-16">
               <div className="text-4xl font-extrabold text-slate-200 tracking-tighter">PROFIT DNA</div>
            </div>

            <div className="mt-32">
               <div className="inline-block bg-slate-900 text-white px-4 py-1 text-sm font-bold uppercase tracking-widest mb-6">
                  Confidential Board Report
               </div>
               <h1 className="text-6xl font-black text-slate-900 mb-4 leading-tight">
                  Strategic Health<br />Audit
               </h1>
               <p className="text-2xl text-slate-500 font-light">
                  Prepared for: <span className="font-bold text-slate-900">{report.profileContext?.industry || 'Business'} Leader</span>
               </p>
            </div>

            <div className="grid grid-cols-2 gap-12 border-t-2 border-slate-900 pt-8">
               <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Date of Analysis</p>
                  <p className="text-xl font-bold">{report.date}</p>
               </div>
               <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Archetype Detected</p>
                  <p className="text-xl font-bold text-brand-600">{report.archetype}</p>
               </div>
            </div>
         </div>

         {/* --- PAGE 2: EXECUTIVE SUMMARY --- */}
         <div className="min-h-screen p-12 break-before-page">
            <div className="border-b-2 border-slate-100 pb-4 mb-8 flex justify-between items-end">
               <h2 className="text-3xl font-bold text-slate-900">Executive Summary</h2>
               <span className="text-sm text-slate-400">Page 2</span>
            </div>

            <div className="grid grid-cols-3 gap-8 mb-12">
               <div className="col-span-2">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">The Narrative</h3>
                  <p className="text-lg leading-relaxed text-slate-700 font-medium border-l-4 border-slate-900 pl-6 py-2">
                     {report.executiveSummary}
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-6">
                     <div className="bg-slate-50 p-6 rounded-xl">
                        <p className="text-sm font-bold text-slate-500 mb-1">Critical Bottlenecks</p>
                        <p className="text-4xl font-black text-red-600">{criticalCount}</p>
                        <p className="text-xs text-slate-400 mt-2">Pillars requiring immediate intervention.</p>
                     </div>
                     <div className="bg-slate-50 p-6 rounded-xl">
                        <p className="text-sm font-bold text-slate-500 mb-1">Overall Health Index</p>
                        <p className="text-4xl font-black text-slate-900">
                           {Math.round(report.pillars.reduce((acc, p) => acc + p.score, 0) / 7)}<span className="text-xl text-slate-400">/100</span>
                        </p>
                        <p className="text-xs text-slate-400 mt-2">Composite score across 7 pillars.</p>
                     </div>
                  </div>
               </div>
               <div className="col-span-1 flex flex-col justify-center items-center bg-slate-50 rounded-2xl p-4">
                  <div className="w-full h-64 relative">
                     {/* Recharts doesn't always print perfectly, so we enforce size */}
                     <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                           <PolarGrid stroke="#e2e8f0" />
                           <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                           <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                           <Radar name="My Business" dataKey="A" stroke="#0f172a" fill="#0f172a" fillOpacity={0.2} />
                        </RadarChart>
                     </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-center text-slate-400 mt-4 font-medium italic">Figure 1.1: Operational Balance</p>
               </div>
            </div>

            {/* Economic Impact */}
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Calculated Economic Impact</h3>
            <div className="grid grid-cols-3 gap-6 mb-12">
               <div className="border border-slate-200 p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                     <Clock className="w-5 h-5 text-slate-400" />
                     <h4 className="font-bold text-slate-700">Time Leakage</h4>
                  </div>
                  <div className="text-2xl font-bold mb-2">{report.indices?.timeLeak && report.indices.timeLeak > 50 ? 'High' : 'Moderate'}</div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                     Execution friction is causing payroll hours to be spent on rework, waiting, and manual administration rather than output.
                  </p>
               </div>
               <div className="border border-slate-200 p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                     <Zap className="w-5 h-5 text-slate-400" />
                     <h4 className="font-bold text-slate-700">Cash Drag</h4>
                  </div>
                  <div className="text-2xl font-bold mb-2">{report.indices?.cashLeak && report.indices.cashLeak > 50 ? 'High' : 'Moderate'}</div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                     Inefficiencies in pricing, collections, or expense control are reducing net margin below potential.
                  </p>
               </div>
               <div className="border border-slate-200 p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                     <Shield className="w-5 h-5 text-slate-400" />
                     <h4 className="font-bold text-slate-700">Risk Exposure</h4>
                  </div>
                  <div className="text-2xl font-bold mb-2">{report.indices?.riskExposure && report.indices.riskExposure > 50 ? 'Severe' : 'Managed'}</div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                     Vulnerabilities in compliance, contracts, or data security present a shock risk to business continuity.
                  </p>
               </div>
            </div>
         </div>


         {/* --- PAGE 2.5: AGRO DEEP SCAN (Conditional) --- */}
         {report.agroIndices && report.agroIndices.length > 0 && (
            <div className="min-h-screen p-12 break-before-page">
               <div className="border-b-2 border-slate-100 pb-4 mb-8 flex justify-between items-end">
                  <h2 className="text-3xl font-bold text-slate-900">Agro-Processing Deep Scan</h2>
                  <span className="text-sm text-slate-400">Special Report</span>
               </div>

               {/* Deep Scan Scores */}
               {report.deepScanScores && (
                  <div className="mb-12">
                     <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Operational Maturity</h3>
                     <div className="grid grid-cols-3 gap-8">
                        {Object.entries(report.deepScanScores.pillars).map(([key, score]) => (
                           <div key={key} className="border border-slate-200 p-6 rounded-xl bg-slate-50">
                              <div className="flex justify-between items-center mb-2">
                                 <span className="font-bold text-slate-700 capitalize">{key}</span>
                                 <span className="text-xs font-bold bg-white px-2 py-1 rounded border border-slate-200">
                                    {report.deepScanScores?.confidence[key as keyof typeof report.deepScanScores.confidence]} Conf.
                                 </span>
                              </div>
                              <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden mb-2">
                                 <div className="h-full bg-slate-900" style={{ width: `${score}%` }}></div>
                              </div>
                              <div className="text-right text-2xl font-black text-slate-900">{score}/100</div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {/* Top 3 Indices */}
               <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Detected Profit Leaks</h3>
                  <div className="space-y-8">
                     {report.agroIndices.map((idx, i) => (
                        <div key={idx.id} className="border border-slate-200 rounded-xl p-8 flex gap-8">
                           <div className="w-12 h-12 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                              {idx.id}
                           </div>
                           <div className="flex-1">
                              <div className="flex justify-between items-start mb-4">
                                 <div>
                                    <h4 className="text-xl font-bold text-slate-900">{idx.title}</h4>
                                    <p className="text-slate-500 italic">"{idx.meaning}"</p>
                                 </div>
                                 {idx.detectedCost && (
                                    <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg border border-red-100 text-right">
                                       <div className="font-bold text-lg">{idx.detectedCost}</div>
                                       <div className="text-[10px] uppercase font-bold text-red-400">Est. Loss</div>
                                    </div>
                                 )}
                              </div>

                              <div className="grid grid-cols-2 gap-8 mt-6">
                                 <div>
                                    <h5 className="font-bold text-xs text-slate-400 uppercase mb-2">Signals</h5>
                                    <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                                       {idx.signals.slice(0, 3).map((s, si) => (
                                          <li key={si}>{s}</li>
                                       ))}
                                    </ul>
                                 </div>
                                 <div>
                                    <h5 className="font-bold text-xs text-slate-400 uppercase mb-2">Inspection Items</h5>
                                    <ul className="space-y-2">
                                       {idx.inspectionItems.slice(0, 3).map((item, ii) => (
                                          <li key={ii} className="flex items-center gap-2 text-sm text-slate-900 font-bold">
                                             <div className="w-4 h-4 border-2 border-slate-300 rounded"></div>
                                             {item.item}
                                          </li>
                                       ))}
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         )}

         {/* --- PAGE 3+: PILLAR DEEP DIVES --- */}
         {sortedPillars.map((pillar, index) => {
            const Icon = getPillarIcon(pillar.name);
            const isCritical = pillar.riskScore > 60;

            return (
               <div key={pillar.name} className="min-h-screen p-12 break-before-page flex flex-col">
                  <div className="border-b-2 border-slate-100 pb-4 mb-8 flex justify-between items-end">
                     <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isCritical ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
                           <Icon className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900">{pillar.name} Deep Dive</h2>
                     </div>
                     <span className="text-sm text-slate-400">Page {3 + index}</span>
                  </div>

                  <div className="grid grid-cols-12 gap-8 mb-10">
                     <div className="col-span-4 bg-slate-50 rounded-2xl p-8 flex flex-col items-center justify-center text-center border border-slate-100">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Pillar Score</span>
                        <div className={`text-6xl font-black mb-2 ${isCritical ? 'text-red-600' : 'text-slate-900'}`}>{pillar.score}</div>
                        <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase ${isCritical ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-800'}`}>
                           {pillar.band}
                        </div>
                     </div>
                     <div className="col-span-8">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Diagnostic Findings</h3>
                        <p className="text-xl font-medium text-slate-900 mb-6 leading-relaxed">
                           "{pillar.hiddenCost}"
                        </p>
                        <div className="bg-white border-l-4 border-slate-900 p-4 pl-6 italic text-slate-600">
                           {pillar.deepInsight}
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-12 mb-10">
                     <div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Evidence Detected</h3>
                        <ul className="space-y-4">
                           {pillar.evidenceSnapshots.map((ev, i) => (
                              <li key={i} className="flex gap-4 items-start">
                                 <div className="mt-1.5 w-2 h-2 rounded-full bg-red-500 flex-shrink-0"></div>
                                 <div>
                                    <p className="font-bold text-slate-900 text-sm">{ev.observation}</p>
                                    <p className="text-xs text-slate-500 mt-1">{ev.whyItMatters}</p>
                                 </div>
                              </li>
                           ))}
                        </ul>
                     </div>
                     <div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Underlying Drivers</h3>
                        <div className="space-y-4">
                           {pillar.drivers.map((d, i) => (
                              <div key={i}>
                                 <div className="flex justify-between text-xs font-bold mb-1">
                                    <span className="text-slate-700 uppercase">{d.name}</span>
                                    <span className={d.status === 'Critical' ? 'text-red-600' : 'text-slate-400'}>{d.status}</span>
                                 </div>
                                 <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <div
                                       className={`h-full ${d.status === 'Critical' ? 'bg-red-500' : d.status === 'Weak' ? 'bg-amber-400' : 'bg-green-500'}`}
                                       style={{ width: `${d.score}%` }}
                                    ></div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="mt-auto bg-slate-900 text-white rounded-2xl p-8">
                     <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
                        <Target className="w-5 h-5 text-brand-400" />
                        <h3 className="font-bold text-lg">Prescribed Fix Plan</h3>
                     </div>

                     <div className="grid grid-cols-2 gap-8">
                        <div>
                           <p className="text-xs font-bold text-slate-400 uppercase mb-3">7-Day Stabilization</p>
                           <ul className="space-y-2">
                              {pillar.actions.filter(a => a.type === 'today' || a.type === 'week').map((action, i) => (
                                 <li key={i} className="flex gap-2 text-sm">
                                    <span className="text-brand-400 font-bold">•</span>
                                    {action.text}
                                 </li>
                              ))}
                           </ul>
                        </div>
                        <div>
                           <p className="text-xs font-bold text-slate-400 uppercase mb-3">30-Day Systemization</p>
                           <ul className="space-y-2">
                              {pillar.actions.filter(a => a.type === 'month').map((action, i) => (
                                 <li key={i} className="flex gap-2 text-sm">
                                    <span className="text-brand-400 font-bold">•</span>
                                    {action.text}
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            );
         })}

         {/* --- PAGE LAST: ACTION CHECKLIST --- */}
         <div className="min-h-screen p-12 break-before-page">
            <div className="border-b-2 border-slate-100 pb-4 mb-8">
               <h2 className="text-3xl font-bold text-slate-900">Master Execution Checklist</h2>
            </div>

            <div className="grid grid-cols-1 gap-2">
               {report.pillars.flatMap(p => p.actions.map(a => ({ ...a, pillar: p.name }))).map((action, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-slate-100 py-3">
                     <div className="flex items-center gap-4">
                        <div className="w-6 h-6 border-2 border-slate-300 rounded"></div>
                        <div>
                           <p className="font-bold text-slate-900 text-sm">{action.text}</p>
                           <p className="text-xs text-slate-500">Pillar: {action.pillar} • Owner: {action.owner}</p>
                        </div>
                     </div>
                     <div className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded">
                        {action.type === 'today' ? 'IMMEDIATE' : action.type === 'week' ? 'THIS WEEK' : 'THIS MONTH'}
                     </div>
                  </div>
               ))}
            </div>

            <div className="mt-20 text-center">
               <p className="text-sm text-slate-400 mb-2">Generated by The Profit Driven Channel Analysis Engine</p>
               <p className="text-xs text-slate-300 font-mono">Report ID: {report.id}</p>
            </div>
         </div>

      </div>
   );
};

export default PrintableReport;