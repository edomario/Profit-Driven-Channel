
import React, { useState } from 'react';
import { Search, ArrowRight, Star, TrendingUp, CheckCircle2, PlayCircle, ShieldCheck, Quote, Activity, Brain } from 'lucide-react';
import { Course, Category } from '../types';
import { useLocalization } from '../contexts/LocalizationContext';

interface HeroProps {
  onSearch: (query: string) => void;
  onCourseClick: (slug: string) => void;
  onCategoryClick: (key: string) => void;
  onViewSchedule?: () => void;
  onStartDiagnostic: () => void;
  courses: Course[];
  categories: Category[];
}

const Hero: React.FC<HeroProps> = ({ onSearch, onCourseClick, onCategoryClick, onViewSchedule, onStartDiagnostic, courses, categories }) => {
  const [query, setQuery] = useState('');
  const { t, locale } = useLocalization();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  const featuredCourses = courses.slice(0, 3);

  // Dynamic Social Proof Text based on region
  const socialProofText = locale.contentRegion === 'AFRICA_SME' 
     ? t('hero.trust_tier3') 
     : t('hero.trust_tier1');

  return (
    <div className="bg-white font-sans">
      
      {/* 1. Hero Section - Diagnostic Focus */}
      <div className="relative bg-white border-b border-gray-100 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <div className="max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-6 border border-red-100">
                 <Activity className="w-3 h-3" /> Profit Warning
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-slate-900">
                Determine your <br/> <span className="text-brand-600">Business DNA.</span>
              </h1>
              
              <div className="text-xl text-gray-600 mb-8 leading-relaxed">
                <p>
                   What is the <span className="font-bold text-black">#1 thing</span> keeping you awake at night? 
                   Take the doctor-grade diagnostic to find the hidden leaks in your operation.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                 <button 
                    onClick={onStartDiagnostic}
                    className="bg-profit text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2 transform hover:-translate-y-1"
                 >
                    <Activity className="w-5 h-5" /> Start The Scan
                 </button>
                 <button 
                    onClick={() => onCategoryClick('all')}
                    className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                 >
                    {t('hero.cta_partners')}
                 </button>
              </div>
              
              <div className="mt-8 flex items-center gap-4 text-sm text-gray-500">
                 <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                       <img key={i} src={`https://ui-avatars.com/api/?background=random&name=User+${i}`} className="w-8 h-8 rounded-full border-2 border-white" />
                    ))}
                 </div>
                 <p className="font-medium text-gray-700">{socialProofText}</p>
              </div>
            </div>

            {/* Hero Visual - Radar Chart Abstract */}
            <div className="relative hidden lg:block">
               <div className="absolute inset-0 bg-gradient-to-tr from-brand-100 to-transparent rounded-full blur-3xl opacity-30 transform translate-x-10 translate-y-10"></div>
               
               {/* Abstract Radar */}
               <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 max-w-md mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-700">
                  <div className="flex items-center justify-between mb-6">
                     <h3 className="font-bold text-gray-900">Profit DNA Score</h3>
                     <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">CRITICAL</span>
                  </div>
                  <div className="relative h-64 w-full flex items-center justify-center">
                     {/* Radar Background */}
                     <div className="absolute inset-0 border border-dashed border-gray-200 rounded-full"></div>
                     <div className="absolute inset-8 border border-dashed border-gray-200 rounded-full"></div>
                     <div className="absolute inset-16 border border-dashed border-gray-200 rounded-full"></div>
                     
                     {/* Abstract Shape */}
                     <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
                        <polygon points="50,10 90,40 70,90 30,90 10,40" className="fill-brand-600 stroke-brand-800 stroke-2 opacity-20" />
                        <polygon points="50,10 90,40 70,90 30,90 10,40" className="fill-none stroke-brand-600 stroke-2" />
                        {/* Weak Point */}
                        <circle cx="30" cy="90" r="4" className="fill-red-500 animate-ping" />
                     </svg>
                     
                     <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow-lg border border-red-100 text-xs text-red-600 font-bold">
                        Profit Leak Detected: -30%
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. The 3 Features (Stack) */}
      <div className="bg-gray-50 py-20">
         <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <h2 className="text-3xl font-bold text-gray-900 mb-4">Stop Guessing. Start Measuring.</h2>
               <p className="text-gray-500 text-lg">We don't just give you courses. We give you a live operating system for profit.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                     <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Profit Simulator</h3>
                  <p className="text-gray-600 leading-relaxed">
                     Interactive sliders show exactly how fixing your "Fuel" (Finance) or "Voice" (Marketing) impacts your bottom line.
                  </p>
               </div>
               <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                     <Brain className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Boardroom AI</h3>
                  <p className="text-gray-600 leading-relaxed">
                     A 24/7 AI Consultant trained on your specific diagnostic scores. Ask it "How do I fire my toxic manager?" and get a script tailored to your conflict style.
                  </p>
               </div>
               <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-6">
                     <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Competitor Benchmarks</h3>
                  <p className="text-gray-600 leading-relaxed">
                     See how you stack up against top SMEs in your region. Download the "Industry Leader" badge if you qualify.
                  </p>
               </div>
            </div>
         </div>
      </div>

      {/* 3. Featured Courses */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
         <div className="flex justify-between items-end mb-10">
            <div>
               <h2 className="text-3xl font-bold text-gray-900 mb-2">Fix the Leaks</h2>
               <p className="text-lg text-gray-600">Prescribed training based on common weak pillars.</p>
            </div>
            <button 
               onClick={onViewSchedule ? onViewSchedule : () => onCategoryClick('all')} 
               className="hidden md:flex items-center gap-2 text-brand-600 font-bold hover:underline"
            >
               View All <ArrowRight className="w-4 h-4" />
            </button>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredCourses.map(course => (
               <div 
                  key={course.id}
                  onClick={() => onCourseClick(course.slug)}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
               >
                  <div className="aspect-video relative overflow-hidden bg-gray-100">
                     <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{course.category}</span>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                           <Star className="w-3 h-3 fill-current" /> {course.rating}
                        </div>
                     </div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                        {course.title}
                     </h3>
                     <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.shortPromise}</p>
                     
                     <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <img src={course.instructor.avatar} alt="" className="w-8 h-8 rounded-full border border-gray-200" />
                           <div>
                              <p className="text-xs font-bold text-gray-900">{course.instructor.name}</p>
                           </div>
                        </div>
                        <span className="text-lg font-bold text-gray-900">${course.price}</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* 4. Trust Bar */}
      <div className="bg-white py-12 border-t border-gray-200">
         <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Trusted by teams at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               {['Acme Corp', 'GlobalBank', 'TechFlow', 'Stripe', 'Brex'].map((brand, i) => (
                  <span key={i} className="text-xl font-extrabold text-gray-800">{brand}</span>
               ))}
            </div>
         </div>
      </div>

    </div>
  );
};

export default Hero;
