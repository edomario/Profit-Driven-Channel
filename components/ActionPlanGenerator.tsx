import React, { useState, useEffect } from 'react';
import { generateActionPlan } from '../services/gemini';
import { ActionPlan, ActionStep } from '../types';
import { Loader2, Plus, FileText, CheckCircle, UploadCloud, Link as LinkIcon, AlertCircle, Check } from 'lucide-react';

const ActionPlanGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<ActionPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await generateActionPlan(topic);
      if (result) {
        setPlan(result);
      } else {
        setError('Could not generate plan. Please try a more specific topic.');
      }
    } catch (e) {
      setError('An error occurred while connecting to the intelligence engine.');
    } finally {
      setLoading(false);
    }
  };

  const handleStepComplete = (stepId: string) => {
    if (!plan) return;
    const updatedSteps = plan.steps.map(s => {
      if (s.id === stepId) {
        // Explicitly type the new status to match ActionStep['status']
        const newStatus: 'pending' | 'completed' = s.status === 'completed' ? 'pending' : 'completed';
        return { ...s, status: newStatus };
      }
      return s;
    });
    setPlan({ ...plan, steps: updatedSteps });
  };

  const handleFileUpload = (stepId: string, file: File) => {
    // In a real app, upload file to server here.
    // For demo, we just mark as complete and maybe console log.
    console.log(`File uploaded for step ${stepId}:`, file.name);
    
    if (!plan) return;
    const updatedSteps = plan.steps.map(s => {
      if (s.id === stepId) {
        return { ...s, status: 'completed' as const };
      }
      return s;
    });
    setPlan({ ...plan, steps: updatedSteps });
  };

  const completedCount = plan?.steps.filter(s => s.status === 'completed').length || 0;
  const totalCount = plan?.steps.length || 0;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Action Lab</h1>
        <p className="text-gray-500 mt-2">Turn any content, meeting, or idea into an executable proof-of-work protocol.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Source Material / Topic
            </label>
            <textarea
              className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent resize-none text-sm"
              placeholder="Paste a YouTube URL, meeting notes, or describe a skill you want to master..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            
            <div className="mt-4 flex flex-col gap-2">
               <button 
                onClick={handleGenerate}
                disabled={loading || !topic}
                className="w-full flex items-center justify-center bg-black text-white py-2.5 rounded-md font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
               >
                 {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                 {loading ? 'Analyzing...' : 'Generate Protocol'}
               </button>
               {error && (
                 <div className="flex items-center text-xs text-red-600 mt-2 bg-red-50 p-2 rounded">
                    <AlertCircle className="w-4 h-4 mr-1.5" />
                    {error}
                 </div>
               )}
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
             <h4 className="text-sm font-semibold text-blue-900 mb-1">How it works</h4>
             <p className="text-xs text-blue-700">
                Our AI extracts actionable steps from your input. Completing these steps generates a "Proof of Work" certificate valid for your professional profile.
             </p>
          </div>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-8">
          {!plan && !loading && (
             <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-gray-400">
                <FileText className="w-12 h-12 mb-4 opacity-50" />
                <p>No active protocol. Generate one to start executing.</p>
             </div>
          )}

          {loading && (
             <div className="h-full min-h-[400px] flex flex-col items-center justify-center border border-gray-200 rounded-xl bg-white">
                <div className="w-full max-w-md space-y-4 px-8">
                   <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="flex-1 space-y-2">
                         <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                         <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                      </div>
                   </div>
                   <div className="space-y-2 pt-4">
                      <div className="h-2 bg-gray-100 rounded w-full animate-pulse"></div>
                      <div className="h-2 bg-gray-100 rounded w-full animate-pulse"></div>
                      <div className="h-2 bg-gray-100 rounded w-5/6 animate-pulse"></div>
                   </div>
                </div>
                <p className="mt-8 text-sm text-gray-500 animate-pulse">Synthesizing execution steps...</p>
             </div>
          )}

          {plan && !loading && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{plan.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">Proof of Work Protocol • ID: {plan.id.slice(0, 8)}</p>
                </div>
                <div className="radial-progress text-brand-600 text-xs font-bold" style={{"--value": progress, "--size": "3rem"} as any}>
                  {progress}%
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {plan.steps.map((step, index) => (
                  <div key={step.id} className={`p-6 group transition-colors ${step.status === 'completed' ? 'bg-green-50/30' : 'hover:bg-gray-50'}`}>
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm border 
                        ${step.status === 'completed' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200 group-hover:border-gray-300'}`}>
                        {step.status === 'completed' ? <Check className="w-4 h-4" /> : index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                           <h3 className={`text-sm font-bold ${step.status === 'completed' ? 'text-green-900' : 'text-gray-900'}`}>{step.title}</h3>
                           <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 border border-gray-200 px-2 py-0.5 rounded">
                              {step.requiredProofType}
                           </span>
                        </div>
                        <p className={`text-sm mt-1 leading-relaxed ${step.status === 'completed' ? 'text-green-800' : 'text-gray-600'}`}>
                          {step.description}
                        </p>
                        
                        {/* Proof Upload Area */}
                        <div className="mt-4 flex items-center gap-3">
                           {step.requiredProofType === 'file' && (
                             <>
                               <input 
                                 type="file" 
                                 id={`file-${step.id}`} 
                                 className="hidden" 
                                 onChange={(e) => {
                                   if (e.target.files?.[0]) {
                                     handleFileUpload(step.id, e.target.files[0]);
                                   }
                                 }}
                               />
                               <label 
                                 htmlFor={`file-${step.id}`}
                                 className={`flex items-center text-xs font-medium border px-3 py-1.5 rounded transition-colors cursor-pointer
                                   ${step.status === 'completed' 
                                     ? 'bg-green-100 border-green-200 text-green-700 hover:bg-green-200' 
                                     : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                               >
                                  <UploadCloud className="w-3.5 h-3.5 mr-1.5" />
                                  {step.status === 'completed' ? 'Evidence Uploaded' : 'Upload Evidence'}
                               </label>
                             </>
                           )}
                           {step.requiredProofType === 'link' && (
                             <button 
                               onClick={() => handleStepComplete(step.id)}
                               className={`flex items-center text-xs font-medium border px-3 py-1.5 rounded transition-colors
                                 ${step.status === 'completed' 
                                   ? 'bg-green-100 border-green-200 text-green-700' 
                                   : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                             >
                                <LinkIcon className="w-3.5 h-3.5 mr-1.5" />
                                {step.status === 'completed' ? 'Link Submitted' : 'Submit Link'}
                             </button>
                           )}
                           {step.requiredProofType === 'text' && (
                             <button 
                               onClick={() => handleStepComplete(step.id)}
                               className={`flex items-center text-xs font-medium border px-3 py-1.5 rounded transition-colors
                                 ${step.status === 'completed' 
                                   ? 'bg-green-100 border-green-200 text-green-700' 
                                   : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                             >
                                <FileText className="w-3.5 h-3.5 mr-1.5" />
                                {step.status === 'completed' ? 'Reflection Saved' : 'Write Reflection'}
                             </button>
                           )}
                           
                           {step.status !== 'completed' && (
                             <button 
                                onClick={() => handleStepComplete(step.id)}
                                className="ml-auto text-xs text-gray-400 hover:text-brand-600 font-medium transition-colors"
                             >
                               Mark Done
                             </button>
                           )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                 <button className="bg-brand-600 text-white px-6 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-brand-500 transition-colors">
                    Save Protocol
                 </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionPlanGenerator;