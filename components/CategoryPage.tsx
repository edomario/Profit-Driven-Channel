
import React, { useState } from 'react';
import { Category, Course } from '../types';
import { Filter, ChevronDown, Check, Star, Clock, Zap } from 'lucide-react';

interface CategoryPageProps {
  category: Category;
  courses: Course[];
  onCourseClick: (slug: string) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, courses, onCourseClick }) => {
  const [filters, setFilters] = useState({
    level: [] as string[],
    format: [] as string[],
    language: [] as string[]
  });

  const toggleFilter = (type: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const current = prev[type];
      const updated = current.includes(value) ? current.filter(i => i !== value) : [...current, value];
      return { ...prev, [type]: updated };
    });
  };

  const filteredCourses = courses.filter(c => {
    // Ensure course belongs to this category (matches Name or Key)
    if (c.category !== category.name && c.category !== category.key) return false;

    // Filter by Level
    if (filters.level.length > 0 && !filters.level.includes(c.level)) return false;
    
    // Filter by Format
    if (filters.format.length > 0 && !filters.format.includes(c.format)) return false;

    // Filter by Language
    if (filters.language.length > 0 && !filters.language.includes(c.language)) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Category Hero */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex items-start gap-6">
             <div className="text-6xl hidden md:block">{category.icon}</div>
             <div className="max-w-3xl">
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">{category.name} Courses</h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                   {category.description}
                </p>
                {/* ROI Bullets */}
                {category.roiBullets && (
                   <div className="flex flex-wrap gap-4">
                      {category.roiBullets.map((bullet, i) => (
                         <span key={i} className="inline-flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                            <Zap className="w-3.5 h-3.5 text-amber-500 fill-current" /> {bullet}
                         </span>
                      ))}
                   </div>
                )}
             </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Area (Rail + Results) */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <div className="flex flex-col lg:flex-row gap-8">
            
            {/* LEFT: Filter Rail */}
            <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
               <div className="flex items-center gap-2 font-bold text-gray-900 pb-4 border-b border-gray-100">
                  <Filter className="w-4 h-4" /> Filters
               </div>

               {/* Level Filter */}
               <div>
                  <h4 className="font-bold text-sm text-gray-900 mb-3">Level</h4>
                  <div className="space-y-2">
                     {['Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                        <label key={lvl} className="flex items-center gap-3 cursor-pointer group">
                           <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filters.level.includes(lvl) ? 'bg-black border-black' : 'bg-white border-gray-300 group-hover:border-gray-400'}`}>
                              {filters.level.includes(lvl) && <Check className="w-3 h-3 text-white" />}
                           </div>
                           <input type="checkbox" className="hidden" checked={filters.level.includes(lvl)} onChange={() => toggleFilter('level', lvl)} />
                           <span className="text-sm text-gray-600 group-hover:text-gray-900">{lvl}</span>
                        </label>
                     ))}
                  </div>
               </div>

               {/* Format Filter */}
               <div>
                  <h4 className="font-bold text-sm text-gray-900 mb-3">Format</h4>
                  <div className="space-y-2">
                     {['Live Session', 'On-Demand', 'Hybrid'].map(fmt => (
                        <label key={fmt} className="flex items-center gap-3 cursor-pointer group">
                           <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filters.format.includes(fmt) ? 'bg-black border-black' : 'bg-white border-gray-300 group-hover:border-gray-400'}`}>
                              {filters.format.includes(fmt) && <Check className="w-3 h-3 text-white" />}
                           </div>
                           <input type="checkbox" className="hidden" checked={filters.format.includes(fmt)} onChange={() => toggleFilter('format', fmt)} />
                           <span className="text-sm text-gray-600 group-hover:text-gray-900">{fmt}</span>
                        </label>
                     ))}
                  </div>
               </div>

               {/* Language Filter */}
               <div>
                  <h4 className="font-bold text-sm text-gray-900 mb-3">Language</h4>
                  <div className="space-y-2">
                     {['English', 'Spanish', 'French'].map(lang => (
                        <label key={lang} className="flex items-center gap-3 cursor-pointer group">
                           <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filters.language.includes(lang) ? 'bg-black border-black' : 'bg-white border-gray-300 group-hover:border-gray-400'}`}>
                              {filters.language.includes(lang) && <Check className="w-3 h-3 text-white" />}
                           </div>
                           <input type="checkbox" className="hidden" checked={filters.language.includes(lang)} onChange={() => toggleFilter('language', lang)} />
                           <span className="text-sm text-gray-600 group-hover:text-gray-900">{lang}</span>
                        </label>
                     ))}
                  </div>
               </div>
            </div>

            {/* RIGHT: Results */}
            <div className="flex-1">
               <div className="mb-6 flex justify-between items-center">
                  <p className="text-sm text-gray-500 font-medium">{filteredCourses.length} results</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                     <span>Sort by:</span>
                     <button className="font-bold flex items-center gap-1 hover:text-black">Popular <ChevronDown className="w-3 h-3" /></button>
                  </div>
               </div>

               <div className="space-y-4">
                  {filteredCourses.map(course => (
                     <div 
                        key={course.id} 
                        onClick={() => onCourseClick(course.slug)}
                        className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-6 hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer group"
                     >
                        <div className="w-full md:w-64 aspect-video bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden relative">
                           <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                           {course.format === 'Live Session' && (
                              <div className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded">LIVE</div>
                           )}
                        </div>
                        
                        <div className="flex-1 flex flex-col">
                           <div className="flex justify-between items-start">
                              <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-2">{course.title}</h3>
                              <span className="text-lg font-bold text-gray-900">${course.price}</span>
                           </div>
                           <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.shortPromise}</p>
                           
                           {/* Outcomes / Meta */}
                           <div className="mt-auto flex flex-wrap items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1.5">
                                 <img src={course.instructor.avatar} alt="" className="w-5 h-5 rounded-full bg-gray-200" />
                                 <span className="font-medium text-gray-700">{course.instructor.name}</span>
                              </div>
                              <div className="h-3 w-px bg-gray-300"></div>
                              <div className="flex items-center gap-1">
                                 <Star className="w-3 h-3 text-amber-500 fill-current" /> {course.rating} ({course.reviewsCount})
                              </div>
                              <div className="h-3 w-px bg-gray-300"></div>
                              <div className="flex items-center gap-1">
                                 <Clock className="w-3 h-3" /> {course.duration}
                              </div>
                              <div className="h-3 w-px bg-gray-300"></div>
                              <div className="font-medium">{course.level}</div>
                           </div>
                        </div>
                     </div>
                  ))}
                  
                  {filteredCourses.length === 0 && (
                     <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-xl">
                        <p className="text-gray-500">No courses match your filters.</p>
                        <button 
                           onClick={() => setFilters({ level: [], format: [], language: [] })}
                           className="mt-4 text-brand-600 font-bold hover:underline"
                        >
                           Clear all filters
                        </button>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CategoryPage;