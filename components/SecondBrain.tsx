
import React, { useState } from 'react';
import { Search, Play, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { askSecondBrain, SecondBrainResult } from '../services/gemini';

const SecondBrain: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SecondBrainResult | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setResult(null);
    try {
      const data = await askSecondBrain(query);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto min-h-full flex flex-col">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium mb-4">
           <Sparkles className="w-3 h-3" />
           <span>Semantic Intelligence Engine</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Second Brain</h1>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
           Don't watch hours of video. Ask a question, get the exact clip, and receive a "Do This Now" protocol.
        </p>
      </div>

      <div className="max-w-2xl mx-auto w-full relative z-10">
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-xl leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm text-base"
            placeholder="How do I negotiate equity in a Series A startup?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
             type="submit"
             disabled={loading || !query}
             className="absolute inset-y-2 right-2 px-4 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors flex items-center"
          >
             {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Ask'}
          </button>
        </form>
      </div>

      <div className="mt-12 flex-1">
        {loading && (
           <div className="flex flex-col items-center justify-center space-y-4 opacity-50">
              <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
           </div>
        )}

        {result && (
          <div className="animate-fade-in-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Video Result */}
               <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="bg-gray-900 aspect-video relative flex items-center justify-center group cursor-pointer">
                     {/* Mock Video UI */}
                     <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{backgroundImage: 'url(https://picsum.photos/800/450?grayscale)'}}></div>
                     <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                     </div>
                     <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded font-mono">
                        Jump to {result.timestamp}
                     </div>
                  </div>
                  <div className="p-5">
                     <h3 className="font-bold text-gray-900 line-clamp-1">{result.videoTitle}</h3>
                     <p className="text-sm text-gray-500 mt-1">Found best answer at <span className="text-indigo-600 font-medium">{result.timestamp}</span></p>
                  </div>
               </div>

               {/* Action Plan Result */}
               <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-6">
                  <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center">
                     <Sparkles className="w-4 h-4 mr-2 text-indigo-600" />
                     Execution Protocol
                  </h3>
                  
                  <div className="mb-6 bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                     <p className="text-sm text-gray-700 leading-relaxed italic">
                        "{result.answer}"
                     </p>
                  </div>

                  <div className="space-y-3">
                     <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Do This Now</p>
                     {result.actionItems.map((item, idx) => (
                        <div key={idx} className="flex items-start bg-white p-3 rounded-md border border-indigo-100">
                           <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                              {idx + 1}
                           </div>
                           <p className="text-sm text-indigo-900">{item}</p>
                           <button className="ml-auto text-gray-400 hover:text-indigo-600">
                              <ArrowRight className="w-4 h-4" />
                           </button>
                        </div>
                     ))}
                  </div>
                  
                  <button className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                     Save to Action Lab
                  </button>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecondBrain;