
import React, { useState } from 'react';
import { 
  ArrowLeft, Printer, Share2, AlertTriangle, TrendingDown, TrendingUp, 
  CheckCircle2, Clock, AlertOctagon, Target, ChevronRight, 
  ChevronDown, Calculator, ShieldAlert, BarChart3, Layout, FileText, Zap,
  MessageSquare, Sliders, Eye, EyeOff
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from 'recharts';
import { HR_INDICES, HRIndexDefinition } from '../data/hrIndices';

interface HRReportViewProps {
  onBack: () => void;
}

// -- DATA GENERATION ENGINE --
// Simulates 12 respondents answering 40 questions (1-7 scale)
// Computes scores for the 10 indices
const generateAnalysis = () => {
  const respondents = 12;
  const indices = HR_INDICES.map(idx => {
    // Simulate a score between 0 and 100
    // Bias towards 'Watch' and 'High Risk' for demo drama
    const baseScore = Math.floor(Math.random() * 60) + 30; // 30-90 range
    
    // Add realistic variance/dispersion
    const dispersion = Math.floor(Math.random() * 15);
    
    let band: 'healthy' | 'watch' | 'highRisk' = 'healthy';
    if (baseScore > 66) band = 'highRisk';
    else if (baseScore > 33) band = 'watch';

    return {
      ...idx,
      score: baseScore,
      band,
      dispersion,
      respondentCount: respondents,
      agreement: dispersion < 10 ? 'High' : 'Mixed'
    };
  });

  // Sort: High Risk first
  const sortedIndices = [...indices].sort((a, b) => b.score - a.score);
  const topRisks = sortedIndices.slice(0, 2);
  const topStrengths = [...indices].sort((a, b) => a.score - b.score).slice(0, 2);

  return {
    department: "Operations & Sales (North)",
    respondents,
    date: new Date().toLocaleDateString(),
    indices,
    topRisks,
    topStrengths
  };
};

const HRReportView: React.FC<HRReportViewProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'snapshot' | 'heatmap' | 'deep_dive' | 'action_plan'>('snapshot');
  const [viewTone, setViewTone] = useState<'executive' | 'operator'>('executive');
  const [data] = useState(generateAnalysis());
  
  // Cost Calc State
  const [headcount, setHeadcount] = useState(12);
  const [hourlyRate, setHourlyRate] = useState(50);
  
  // Calculate Total Business Cost
  const calculateTotalRiskCost = () => {
    let totalHoursLost = 0;
    data.indices.forEach(idx => {
      if (idx.band === 'highRisk') {
        totalHoursLost += idx.timeDragFactor;
      } else if (idx.band === 'watch') {
        totalHoursLost += (idx.timeDragFactor * 0.5);
      }
    });
    return totalHoursLost * headcount * hourlyRate;
  };

  const weeklyLoss = calculateTotalRiskCost();
  const annualLoss = weeklyLoss * 50; // 50 weeks

  // RENDERERS

  const renderSnapshot = () => (
    <div className="space-y-8 animate-fade-in">
      {/* Executive Summary Card */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Executive Snapshot</h2>
            <p className="text-gray-500 mt-2 text-lg">
              Department: <span className="font-bold text-black">{data.department}</span> • {data.respondents} Respondents
            </p>
          </div>
          <div className="text-right bg-red-50 px-6 py-4 rounded-xl border border-red-100">
            <div className="text-sm font-bold text-red-800 uppercase tracking-wide mb-1">Est. Efficiency Loss</div>
            <div className="text-4xl font-black text-red-600">${weeklyLoss.toLocaleString()} <span className="text-sm text-red-400 font-medium">/ week</span></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Strengths */}
          <div className="bg-green-50/50 p-6 rounded-xl border border-green-100">
             <h3 className="font-bold text-green-900 flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-green-600" /> Top Strengths
             </h3>
             <div className="space-y-4">
                {data.topStrengths.map(idx => (
                   <div key={idx.id} className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                      <div className="flex justify-between items-center mb-1">
                         <span className="font-bold text-gray-900">{idx.title}</span>
                         <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">{idx.score}/100 Risk</span>
                      </div>
                      <p className="text-sm text-gray-600">{idx.bands.healthy.executive}</p>
                   </div>
                ))}
             </div>
          </div>

          {/* Silent Killers */}
          <div className="bg-red-50/50 p-6 rounded-xl border border-red-100">
             <h3 className="font-bold text-red-900 flex items-center gap-2 mb-4">
                <ShieldAlert className="w-5 h-5 text-red-600" /> Silent Killers
             </h3>
             <div className="space-y-4">
                {data.topRisks.map(idx => (
                   <div key={idx.id} className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                      <div className="flex justify-between items-center mb-1">
                         <span className="font-bold text-gray-900">{idx.title}</span>
                         <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">CRITICAL ({idx.score})</span>
                      </div>
                      <p className="text-sm text-gray-700 font-medium">
                         {idx.bands.highRisk.executive.replace('{DEPARTMENT}', data.department).replace('{SCORE}', idx.score.toString())}
                      </p>
                      <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                         <span className="text-xs font-bold text-red-500 uppercase">Immediate Fix:</span>
                         <span className="text-xs text-gray-600 truncate">{idx.bands.highRisk.fix7[0]}</span>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Cost Calculator Widget */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl">
         <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl font-bold">Business Cost Calculator</h3>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="space-y-4">
               <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Team Headcount</label>
                  <input 
                     type="number" 
                     value={headcount} 
                     onChange={e => setHeadcount(Number(e.target.value))}
                     className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white font-bold"
                  />
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Avg Hourly Cost ($)</label>
                  <input 
                     type="number" 
                     value={hourlyRate} 
                     onChange={e => setHourlyRate(Number(e.target.value))}
                     className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white font-bold"
                  />
               </div>
            </div>
            <div className="col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700 flex justify-around text-center">
               <div>
                  <p className="text-gray-400 text-sm mb-1">Weekly Leakage</p>
                  <p className="text-3xl font-bold text-red-400">${weeklyLoss.toLocaleString()}</p>
               </div>
               <div className="w-px bg-slate-700"></div>
               <div>
                  <p className="text-gray-400 text-sm mb-1">Annual Impact</p>
                  <p className="text-3xl font-bold text-white">${annualLoss.toLocaleString()}</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  const renderHeatmap = () => (
    <div className="space-y-8 animate-fade-in">
       <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Department Heatmap</h2>
          <div className="flex gap-4 text-sm font-medium">
             <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded-full"></span> Healthy</span>
             <span className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-500 rounded-full"></span> Watch</span>
             <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-600 rounded-full"></span> Critical</span>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.indices.map((idx) => {
             const toneContent = idx.band === 'highRisk' ? idx.bands.highRisk : idx.band === 'watch' ? idx.bands.watch : idx.bands.healthy;
             const text = viewTone === 'executive' ? toneContent.executive : toneContent.operator;
             const parsedText = text.replace('{DEPARTMENT}', data.department).replace('{SCORE}', idx.score.toString()).replace('{AGREEMENT}', idx.agreement);

             return (
               <div key={idx.id} className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                  <div className="flex justify-between items-center mb-2">
                     <h4 className="font-bold text-gray-900">{idx.title}</h4>
                     <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400 font-medium">n={data.respondents}</span>
                        <span className={`text-lg font-black ${idx.score > 66 ? 'text-red-600' : idx.score > 33 ? 'text-amber-500' : 'text-green-600'}`}>
                           {idx.score}
                        </span>
                     </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
                     <div 
                        className={`h-2.5 rounded-full transition-all duration-1000 ${idx.score > 66 ? 'bg-red-600' : idx.score > 33 ? 'bg-amber-500' : 'bg-green-500'}`} 
                        style={{ width: `${idx.score}%` }}
                     ></div>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">
                     {parsedText}
                  </p>

                  {idx.band === 'highRisk' && (
                     <div className="mt-3 flex justify-between items-center">
                        <div className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-50 px-2 py-1 rounded">
                           <AlertOctagon className="w-3 h-3" /> First Fix Opportunity
                        </div>
                     </div>
                  )}
               </div>
             );
          })}
       </div>
    </div>
  );

  const renderDeepDive = () => (
     <div className="space-y-12 animate-fade-in">
        {data.indices.map((idx) => {
           // Skip healthy ones to reduce noise in deep dive, unless requested
           if (idx.band === 'healthy') return null;

           const content = idx.band === 'highRisk' ? idx.bands.highRisk : idx.bands.watch;
           const readout = viewTone === 'executive' ? content.executive : content.operator;
           const parsedReadout = readout.replace('{DEPARTMENT}', data.department).replace('{SCORE}', idx.score.toString()).replace('{AGREEMENT}', idx.agreement);
           
           return (
              <div key={idx.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                 {/* Header */}
                 <div className={`p-6 border-b border-gray-100 flex justify-between items-center ${idx.band === 'highRisk' ? 'bg-red-50' : 'bg-amber-50'}`}>
                    <div className="flex items-center gap-4">
                       <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl text-white ${idx.band === 'highRisk' ? 'bg-red-600' : 'bg-amber-500'}`}>
                          {idx.score}
                       </div>
                       <div>
                          <h3 className="text-xl font-bold text-gray-900">{idx.title}</h3>
                          <div className="flex items-center gap-2 text-xs opacity-80">
                             <span className="uppercase font-bold tracking-wide">{idx.band === 'highRisk' ? 'High Risk' : 'Watch List'}</span>
                             <span>•</span>
                             <span>Agreement: {idx.agreement}</span>
                          </div>
                       </div>
                    </div>
                    {idx.band === 'highRisk' && (
                       <div className="hidden md:block text-right">
                          <p className="text-xs font-bold text-red-800 uppercase">Profit Impact</p>
                          <p className="text-sm text-red-900">{idx.profitLeak}</p>
                       </div>
                    )}
                 </div>

                 <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Diagnosis */}
                    <div className="space-y-6">
                       <div>
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                             {viewTone === 'executive' ? 'Executive Summary' : 'Operator Diagnosis'}
                          </h4>
                          <p className="text-lg font-medium text-gray-900 leading-relaxed">
                             "{parsedReadout}"
                          </p>
                       </div>
                       
                       <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                             What to Measure
                          </h4>
                          <p className="text-sm text-gray-700">
                             {content.measure}
                          </p>
                       </div>

                       {/* Manager Script (Only for High Risk usually, or if defined) */}
                       <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                          <h4 className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-2 flex items-center gap-1">
                             <MessageSquare className="w-3 h-3" /> Root Cause / Insight
                          </h4>
                          <p className="text-sm text-blue-900 italic font-medium">
                             {idx.description}
                          </p>
                       </div>
                    </div>

                    {/* Action Plan */}
                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 h-full">
                       <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-amber-500 fill-current" /> Fix Protocol
                       </h4>
                       
                       <div className="space-y-6 relative">
                          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-200"></div>
                          
                          <div className="relative pl-8">
                             <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-slate-300 border-2 border-white"></div>
                             <p className="text-xs font-bold text-slate-500 uppercase mb-1">7-Day Behavior Fix</p>
                             <ul className="space-y-1">
                                {content.fix7.map((act, i) => (
                                   <li key={i} className="text-sm font-bold text-slate-900">{act}</li>
                                ))}
                             </ul>
                          </div>

                          <div className="relative pl-8">
                             <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-slate-300 border-2 border-white"></div>
                             <p className="text-xs font-bold text-slate-500 uppercase mb-1">30-Day System Fix</p>
                             <ul className="space-y-1">
                                {content.fix30.map((act, i) => (
                                   <li key={i} className="text-sm font-medium text-slate-700">{act}</li>
                                ))}
                             </ul>
                          </div>

                          <div className="relative pl-8">
                             <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-slate-300 border-2 border-white"></div>
                             <p className="text-xs font-bold text-slate-500 uppercase mb-1">90-Day Structural Fix</p>
                             <ul className="space-y-1">
                                {content.fix90.map((act, i) => (
                                   <li key={i} className="text-sm font-medium text-slate-700">{act}</li>
                                ))}
                             </ul>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           );
        })}
     </div>
  );

  const renderActionGenerator = () => (
     <div className="space-y-8 animate-fade-in">
        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-8">
           <div>
              <h2 className="text-3xl font-bold mb-2">Automated Action Plan</h2>
              <p className="text-gray-400">
                 Based on the {data.topRisks.length} critical risks identified, here is your prioritized execution list.
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
                    {data.topRisks.map(idx => (
                       idx.band === 'highRisk' && idx.bands.highRisk.fix7.map((act, i) => (
                          <label key={`${idx.id}_7_${i}`} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-200">
                             <input type="checkbox" className="mt-1 w-4 h-4 text-black rounded border-gray-300 focus:ring-black" />
                             <div>
                                <span className="font-bold text-gray-900">{act}</span>
                                <span className="block text-xs text-gray-500">Fixing: {idx.title}</span>
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
                    {data.topRisks.map(idx => (
                       idx.band === 'highRisk' && idx.bands.highRisk.fix30.map((act, i) => (
                          <label key={`${idx.id}_30_${i}`} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-200">
                             <input type="checkbox" className="mt-1 w-4 h-4 text-black rounded border-gray-300 focus:ring-black" />
                             <div>
                                <span className="font-medium text-gray-800">{act}</span>
                                <span className="block text-xs text-gray-500">Fixing: {idx.title}</span>
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
      
      {/* Navbar */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm px-6 py-4 flex flex-col md:flex-row justify-between items-center print:hidden gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Workplace Forensic Report</h1>
            <p className="text-xs text-gray-500 font-mono">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
           {/* View Tone Toggle */}
           <div className="flex bg-gray-100 p-1 rounded-lg">
              <button 
                 onClick={() => setViewTone('executive')}
                 className={`px-3 py-1.5 text-xs font-bold rounded flex items-center gap-1 transition-all ${viewTone === 'executive' ? 'bg-white text-black shadow-sm' : 'text-gray-500'}`}
              >
                 <Eye className="w-3 h-3" /> Executive
              </button>
              <button 
                 onClick={() => setViewTone('operator')}
                 className={`px-3 py-1.5 text-xs font-bold rounded flex items-center gap-1 transition-all ${viewTone === 'operator' ? 'bg-white text-black shadow-sm' : 'text-gray-500'}`}
              >
                 <Sliders className="w-3 h-3" /> Operator
              </button>
           </div>

           {/* View Switcher */}
           <div className="flex bg-gray-100 p-1 rounded-lg">
              {[
                 { id: 'snapshot', label: 'Snapshot', icon: FileText },
                 { id: 'heatmap', label: 'Heatmap', icon: BarChart3 },
                 { id: 'deep_dive', label: 'Metric Cards', icon: Layout },
                 { id: 'action_plan', label: 'Action Plan', icon: CheckCircle2 }
              ].map(tab => (
                 <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${activeTab === tab.id ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
                 >
                    <tab.icon className="w-4 h-4" /> <span className="hidden lg:inline">{tab.label}</span>
                 </button>
              ))}
           </div>

           <button onClick={() => window.print()} className="hidden md:flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800">
              <Share2 className="w-4 h-4" /> Share
           </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
         {/* Disclaimer for Safety */}
         <div className="mb-8 flex items-center justify-center gap-2 text-xs text-gray-400 bg-white border border-gray-200 p-2 rounded-lg mx-auto w-fit">
            <ShieldAlert className="w-3 h-3" />
            <span>Aggregate Data Only (n={data.respondents}). No individual responses shown.</span>
         </div>

         {activeTab === 'snapshot' && renderSnapshot()}
         {activeTab === 'heatmap' && renderHeatmap()}
         {activeTab === 'deep_dive' && renderDeepDive()}
         {activeTab === 'action_plan' && renderActionGenerator()}
      </div>
    </div>
  );
};

export default HRReportView;
