
import React, { useState } from 'react';
import { Clock, CheckCircle, FileText, Award, Lock, PlayCircle } from 'lucide-react';

const LearningLocker: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sprints' | 'archive' | 'proofs'>('sprints');

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
         <div>
            <h1 className="text-3xl font-bold text-gray-900">Learning Locker</h1>
            <p className="text-gray-500 mt-1">Your central hub for content, execution, and credentials.</p>
         </div>
      </div>

      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
             { id: 'sprints', label: 'Live Sessions', count: 3 }, 
             { id: 'archive', label: 'My Archive', count: 12 }, 
             { id: 'proofs', label: 'Proof of Work', count: 5 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`${
                activeTab === tab.id
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              {tab.label}
              <span className={`ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium ${activeTab === tab.id ? 'bg-gray-100 text-black' : 'bg-gray-100 text-gray-500'}`}>
                 {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'sprints' && (
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3].map((i) => (
               <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <span className="text-xs font-bold text-brand-600 uppercase tracking-wide">In Progress</span>
                        <h3 className="text-lg font-bold text-gray-900 mt-1">Advanced React Patterns</h3>
                     </div>
                     <div className="radial-progress text-brand-600 text-xs font-bold" style={{"--value": i * 25, "--size": "2.5rem"} as any}>
                        {i * 25}%
                     </div>
                  </div>
                  <div className="flex-1 space-y-3 mb-6">
                     <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-brand-500 mr-2" />
                        <span>Completed Module 1: Hooks Deep Dive</span>
                     </div>
                     <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-brand-500 mr-2" />
                        <span>Submitted Action Plan: State Management</span>
                     </div>
                     <div className="flex items-center text-sm text-gray-400">
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full mr-2"></div>
                        <span>Pending: Performance Audit Proof</span>
                     </div>
                  </div>
                  <button className="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800">
                     Resume Session
                  </button>
               </div>
            ))}
         </div>
      )}

      {activeTab === 'archive' && (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
               <div key={i} className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                     <img src={`https://picsum.photos/400/225?random=${i+10}`} alt="" className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <PlayCircle className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all" />
                     </div>
                     <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                        12:40
                     </span>
                  </div>
                  <div className="p-3">
                     <h4 className="text-sm font-medium text-gray-900 line-clamp-2">How to Scale a Sales Team from 0 to 10M ARR</h4>
                     <p className="text-xs text-gray-500 mt-1">Saved on Oct {i + 1}</p>
                  </div>
               </div>
            ))}
         </div>
      )}

      {activeTab === 'proofs' && (
         <div className="space-y-4">
            {[
               { title: 'Kubernetes Deployment Protocol', type: 'Certificate', date: 'Oct 24, 2024' },
               { title: 'Series A Pitch Deck Audit', type: 'Action Plan', date: 'Oct 12, 2024' },
               { title: 'Supply Chain Optimization', type: 'Certificate', date: 'Sep 28, 2024' }
            ].map((proof, i) => (
               <div key={i} className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center ${proof.type === 'Certificate' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                        {proof.type === 'Certificate' ? <Award className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-gray-900">{proof.title}</h4>
                        <p className="text-xs text-gray-500">{proof.type} • Verified on {proof.date}</p>
                     </div>
                  </div>
                  <button className="text-xs font-medium text-gray-600 hover:text-black border border-gray-200 bg-white px-3 py-1.5 rounded-md shadow-sm">
                     View Credential
                  </button>
               </div>
            ))}
            
            <div className="bg-gray-50 border border-gray-200 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center">
               <Lock className="w-8 h-8 text-gray-300 mb-2" />
               <h4 className="text-sm font-medium text-gray-900">Complete 3 more sessions to unlock Elite status</h4>
               <p className="text-xs text-gray-500 mt-1">Elite members get direct access to instructors.</p>
            </div>
         </div>
      )}
    </div>
  );
};

export default LearningLocker;