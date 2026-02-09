
import React, { useState } from 'react';
import {
   CheckCircle2, Clock, Zap, ArrowLeft, MoreHorizontal,
   UploadCloud, Link as LinkIcon, FileText, Layout,
   TrendingUp, AlertOctagon, CheckCircle, Search, Filter,
   ShieldCheck, Loader2, Save, Play, Download, Activity, X,
   Target, BarChart3, List
} from 'lucide-react';
import { User, FixTask, FixPlan, PillarScores } from '../types';

interface FixModeProps {
   user: User;
   onUpdateUser: (updatedUser: User) => void;
   onBack: () => void;
}

const FixMode: React.FC<FixModeProps> = ({ user, onUpdateUser, onBack }) => {
   const [activeTask, setActiveTask] = useState<FixTask | null>(null);
   const [evidenceValue, setEvidenceValue] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [activeTab, setActiveTab] = useState<'board' | 'timeline' | 'metrics'>('board');

   if (!user.activeFixPlan) return null;

   const plan = user.activeFixPlan;
   const tasks = plan.tasks;

   const getTasksByStatus = (status: FixTask['status']) =>
      tasks.filter(t => t.status === status);

   const moveTask = (taskId: string, newStatus: FixTask['status']) => {
      const updatedTasks = tasks.map(t =>
         t.id === taskId ? { ...t, status: newStatus } : t
      );
      const progress = Math.round((updatedTasks.filter(t => t.status === 'done').length / updatedTasks.length) * 100);

      onUpdateUser({
         ...user,
         activeFixPlan: { ...plan, tasks: updatedTasks, overallProgress: progress }
      });
   };

   const handleCompleteTask = async () => {
      if (!activeTask || !evidenceValue) return;
      setIsSubmitting(true);

      // Simulate verification
      setTimeout(() => {
         const updatedTasks = tasks.map(t =>
            t.id === activeTask.id
               ? { ...t, status: 'done' as const, evidence: { type: 'text' as const, value: evidenceValue, timestamp: new Date().toISOString() } }
               : t
         );

         const progress = Math.round((updatedTasks.filter(t => t.status === 'done').length / updatedTasks.length) * 100);

         // Rescore Logic
         const pillarKey = activeTask.pillar.toLowerCase() as keyof PillarScores;
         const currentScores = user.pillarScores || { operations: 0, money: 0, market: 0, leadership: 0, innovation: 0, risk: 0, people: 0 };
         const newPillarScore = Math.min(100, (currentScores[pillarKey] || 0) + activeTask.impactScore);

         onUpdateUser({
            ...user,
            pillarScores: { ...currentScores, [pillarKey]: newPillarScore },
            activeFixPlan: { ...plan, tasks: updatedTasks, overallProgress: progress }
         });

         setIsSubmitting(false);
         setActiveTask(null);
         setEvidenceValue('');
      }, 1200);
   };

   const TaskCard: React.FC<{ task: FixTask }> = ({ task }) => (
      <div
         className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-brand-300 hover:shadow-md transition-all cursor-pointer group"
         onClick={() => setActiveTask(task)}
      >
         <div className="flex justify-between items-start mb-2">
            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${task.pillar === 'Risk' ? 'bg-red-50 text-red-700 border-red-100' :
                  task.pillar === 'Money' ? 'bg-green-50 text-green-700 border-green-100' :
                     'bg-blue-50 text-blue-700 border-blue-100'
               }`}>
               {task.pillar}
            </span>
            <span className="text-[10px] text-gray-400 font-medium">{task.deadline}</span>
         </div>
         <h4 className="font-bold text-gray-900 text-sm mb-1 leading-tight group-hover:text-brand-600 transition-colors">{task.title}</h4>
         <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">{task.desc}</p>
         {task.autoTags && task.autoTags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1">
               {task.autoTags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
                     {tag}
                  </span>
               ))}
            </div>
         )}

         <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
            <div className="flex items-center gap-2">
               <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-500">
                  {task.owner[0]}
               </div>
               <span className="text-[10px] text-gray-400">{task.owner}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-brand-600">
               <Zap className="w-3 h-3" /> +{task.impactScore}
            </div>
         </div>
      </div>
   );

   return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
         {/* HUD Header */}
         <header className="bg-slate-900 text-white p-6 sticky top-0 z-30 shadow-xl">
            <div className="max-w-[1400px] mx-auto">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                  <div className="flex items-center gap-4">
                     <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                     </button>
                     <div>
                        <h1 className="text-xl font-bold flex items-center gap-2">
                           {plan.focusArea || 'Execution Engine'} <span className="bg-brand-500 text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">Fix Mode</span>
                        </h1>
                        <p className="text-xs text-slate-400 mt-0.5">Plan started: {new Date(plan.startedAt).toLocaleDateString()}</p>
                     </div>
                  </div>

                  <div className="flex flex-1 md:justify-center items-center gap-8 w-full md:w-auto">
                     <div className="flex-1 max-w-xs">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                           <span>Gap Closing Progress</span>
                           <span>{plan.overallProgress}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                           <div className="bg-brand-400 h-full transition-all duration-1000" style={{ width: `${plan.overallProgress}%` }}></div>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-3">
                     <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all">
                        <Download className="w-4 h-4" /> Export Protocol
                     </button>
                  </div>
               </div>

               {/* KPIs Strip */}
               {plan.kpis && plan.kpis.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
                     <div className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center">
                        <Target className="w-4 h-4 mr-2" /> Target Metrics
                     </div>
                     {plan.kpis.map(kpi => (
                        <div key={kpi.id} className="bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                           <p className="text-[10px] text-slate-400 uppercase truncate">{kpi.name}</p>
                           <p className="text-sm font-bold text-white flex items-center gap-1">
                              -- <span className="text-[10px] font-normal opacity-70">/ {kpi.frequency}</span>
                           </p>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </header>

         {/* Main Board */}
         <main className="max-w-[1400px] mx-auto w-full p-8 flex-1 overflow-hidden flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">

               {/* Backlog */}
               <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-4 px-1">
                     <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm uppercase tracking-widest">
                        <List className="w-4 h-4 text-gray-400" /> Backlog ({getTasksByStatus('backlog').length})
                     </h3>
                     <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="bg-gray-100/50 rounded-2xl p-4 flex-1 overflow-y-auto space-y-4 border border-gray-200/50">
                     {getTasksByStatus('backlog').map(t => <TaskCard key={t.id} task={t} />)}
                     {getTasksByStatus('backlog').length === 0 && (
                        <div className="h-32 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
                           <p className="text-xs">Queue empty.</p>
                        </div>
                     )}
                  </div>
               </div>

               {/* In Progress */}
               <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-4 px-1">
                     <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm uppercase tracking-widest">
                        <Activity className="w-4 h-4 text-brand-600" /> Working ({getTasksByStatus('in_progress').length})
                     </h3>
                     <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="bg-brand-50/30 rounded-2xl p-4 flex-1 overflow-y-auto space-y-4 border border-brand-100/50">
                     {getTasksByStatus('in_progress').map(t => <TaskCard key={t.id} task={t} />)}
                     {getTasksByStatus('in_progress').length === 0 && (
                        <div className="h-32 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-brand-200 rounded-xl text-brand-400/50">
                           <p className="text-xs italic">Drag tasks here to start fixing.</p>
                        </div>
                     )}
                  </div>
               </div>

               {/* Done */}
               <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-4 px-1">
                     <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm uppercase tracking-widest">
                        <CheckCircle2 className="w-4 h-4 text-green-600" /> Verified ({getTasksByStatus('done').length})
                     </h3>
                     <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="bg-green-50/30 rounded-2xl p-4 flex-1 overflow-y-auto space-y-4 border border-green-100/50">
                     {getTasksByStatus('done').map(t => <TaskCard key={t.id} task={t} />)}
                  </div>
               </div>

            </div>
         </main>

         {/* Task Inspection Sidebar */}
         {activeTask && (
            <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
               <div className="w-full max-w-xl h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                     <h3 className="font-bold text-gray-900">Task Protocol</h3>
                     <button onClick={() => setActiveTask(null)} className="text-gray-400 hover:text-black transition-colors"><X className="w-6 h-6" /></button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-8 space-y-8">
                     <div>
                        <span className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-2 block">{activeTask.pillar} PILLAR</span>
                        <h2 className="text-2xl font-black text-gray-900 leading-tight">{activeTask.title}</h2>
                        <p className="text-gray-500 mt-4 leading-relaxed">{activeTask.desc}</p>
                     </div>

                     <div className="grid grid-cols-2 gap-6 py-6 border-y border-gray-100">
                        <div>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Impact Metric</p>
                           <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-green-500" /> {activeTask.metric}
                           </p>
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Effort Level</p>
                           <p className="text-sm font-bold text-gray-900">{activeTask.effort}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Assigned To</p>
                           <p className="text-sm font-bold text-gray-900">{activeTask.owner}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Rescore Reward</p>
                           <p className="text-sm font-bold text-brand-600">+{activeTask.impactScore} points</p>
                        </div>
                        {activeTask.costType && (
                           <div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Cost Type</p>
                              <p className="text-sm font-bold text-gray-900">{activeTask.costType}</p>
                           </div>
                        )}
                     </div>
                     {activeTask.autoTags && activeTask.autoTags.length > 0 && (
                        <div>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Auto Tags</p>
                           <div className="flex flex-wrap gap-2">
                              {activeTask.autoTags.map(tag => (
                                 <span key={tag} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full border border-slate-200">
                                    {tag}
                                 </span>
                              ))}
                           </div>
                        </div>
                     )}

                     {activeTask.status !== 'done' ? (
                        <div className="space-y-6">
                           <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
                              <h4 className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
                                 <UploadCloud className="w-4 h-4" /> Proof-of-Work Required
                              </h4>
                              <p className="text-xs text-amber-800 mb-4 leading-relaxed">
                                 {activeTask.evidencePrompt || 'To mark this task as fixed, upload a brief description of the system change OR a link to the new documentation/SOP.'}
                              </p>
                              {activeTask.verificationCriteria && (
                                 <p className="text-[11px] text-amber-900 mb-4 font-semibold">
                                    Verify: {activeTask.verificationCriteria}
                                 </p>
                              )}
                              {activeTask.optionalEvidence && (
                                 <p className="text-[11px] text-amber-700 mb-4">
                                    Optional: {activeTask.optionalEvidence}
                                 </p>
                              )}
                              <textarea
                                 className="w-full bg-white border border-amber-200 rounded-lg p-3 text-sm focus:ring-black focus:border-black h-32 resize-none"
                                 placeholder="Describe how the fix was implemented..."
                                 value={evidenceValue}
                                 onChange={(e) => setEvidenceValue(e.target.value)}
                              />
                           </div>

                           <div className="flex gap-4">
                              {activeTask.status === 'backlog' && (
                                 <button
                                    onClick={() => moveTask(activeTask.id, 'in_progress')}
                                    className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2"
                                 >
                                    <Play className="w-4 h-4" /> Move to Working
                                 </button>
                              )}
                              <button
                                 onClick={handleCompleteTask}
                                 disabled={!evidenceValue || isSubmitting}
                                 className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/20"
                              >
                                 {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                                 Verify & Rescore
                              </button>
                           </div>
                        </div>
                     ) : (
                        <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                           <div className="flex items-center gap-2 text-green-800 font-bold mb-3">
                              <ShieldCheck className="w-5 h-5" /> Evidence Verified
                           </div>
                           <p className="text-sm text-green-700 leading-relaxed italic">
                              "{activeTask.evidence?.value}"
                           </p>
                           <p className="text-[10px] text-green-600 mt-4 font-mono">Timestamp: {activeTask.evidence?.timestamp}</p>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default FixMode;
