
import React, { useState } from 'react';
import { Course, Category, User } from '../types';
import { Search, ArrowRight, Star, Clock, Users, Zap, TrendingUp, ChevronDown } from 'lucide-react';

interface CatalogProps {
  categories: Category[];
  trendingCourses: Course[];
  onCategoryClick: (key: string) => void;
  onCourseClick: (slug: string) => void;
  onSearch: (query: string) => void;
  user?: User | null;
  onViewPricing?: () => void;
  onBookDemo?: () => void;
}

const Catalog: React.FC<CatalogProps> = ({ categories, trendingCourses, onCategoryClick, onCourseClick, onSearch, user, onViewPricing, onBookDemo }) => {
  const [sortBy, setSortBy] = useState<'popular' | 'soon' | 'rated' | 'practical'>('popular');

  const getSortedCourses = () => {
    const courses = [...trendingCourses];
    switch (sortBy) {
      case 'popular':
        return courses.sort((a, b) => b.reviewsCount - a.reviewsCount);
      case 'soon':
        return courses.sort((a, b) => {
          // Parse loose dates like "Oct 30"
          const getTime = (dateStr?: string) => {
             if (!dateStr) return Infinity;
             const d = new Date(dateStr);
             // If invalid date (e.g. "Oct 30" works, but let's be safe), treat as far future
             return isNaN(d.getTime()) ? Infinity : d.getTime();
          };
          
          const dateA = getTime(a.upcomingSessions?.[0]?.startDate);
          const dateB = getTime(b.upcomingSessions?.[0]?.startDate);
          return dateA - dateB;
        });
      case 'rated':
        return courses.sort((a, b) => b.rating - a.rating);
      case 'practical':
        // Sort by number of outcomes defined (proxy for practicality/density)
        return courses.sort((a, b) => (b.outcomes?.length || 0) - (a.outcomes?.length || 0));
      default:
        return courses;
    }
  };

  const sortedCourses = getSortedCourses();
  const isConsultant = user?.role === 'consultant';

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <div className="bg-gray-50 border-b border-gray-200 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            {isConsultant ? (
               <>Market Insights: <span className="text-profit">Student Demand</span></>
            ) : (
               <>Learn, Execute and <span className="text-profit">Watch Your Profit Grow.</span></>
            )}
          </h1>
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
            {isConsultant 
               ? "See what courses your potential clients are taking. Align your services with market trends."
               : "Join live sessions led by vetted executives. Execute real projects, verified by AI, and level up your career."
            }
          </p>
          
          <div className="relative max-w-xl mx-auto shadow-lg rounded-full">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-profit focus:border-transparent text-base"
              placeholder={isConsultant ? "Search niche topics..." : "Search for skills, roles, or outcomes..."}
              onKeyDown={(e) => e.key === 'Enter' && onSearch((e.target as HTMLInputElement).value)}
            />
            <button className="absolute right-2 top-2 bottom-2 bg-profit text-white px-6 rounded-full text-sm font-bold hover:bg-green-600 transition-colors">
              Find Course
            </button>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="font-medium text-gray-900">Popular:</span>
            {['SaaS Finance', 'AI Ops', 'Leadership', 'Supply Chain'].map(tag => (
               <button key={tag} onClick={() => onSearch(tag)} className="hover:text-brand-600 hover:underline transition-colors">{tag}</button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Categories Grid */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
           <div>
              <h2 className="text-2xl font-bold text-gray-900">Explore by Subject</h2>
              <p className="text-gray-500 mt-1">Deep dive into specialized execution tracks.</p>
           </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
           {categories.map((cat) => (
              <div 
                 key={cat.id} 
                 onClick={() => onCategoryClick(cat.key)}
                 className="group bg-white border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer flex flex-col items-start h-full"
              >
                 <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
                 <h3 className="font-bold text-gray-900 text-base md:text-lg mb-2">{cat.name}</h3>
                 <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{cat.description}</p>
              </div>
           ))}
        </div>
      </div>

      {/* 3. Trending Courses */}
      <div className="bg-gray-50 py-16 border-y border-gray-200">
         <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
               <div className="flex items-center gap-2">
                  <div className="bg-red-100 p-2 rounded-full text-red-600">
                     <TrendingUp className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                     {isConsultant ? "Trending in Your Niche" : "Trending Sessions"}
                  </h2>
               </div>

               <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 font-medium">Sort by:</span>
                  <div className="relative group">
                     <button className="flex items-center gap-1 text-sm font-bold text-gray-900 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                        {sortBy === 'popular' ? 'Most Popular' : 
                         sortBy === 'soon' ? 'Starts Soon' : 
                         sortBy === 'rated' ? 'Highest Rated' : 'Most Practical'}
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                     </button>
                     <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-20 hidden group-hover:block">
                        <button onClick={() => setSortBy('popular')} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 font-medium text-gray-700 hover:text-black">Most Popular</button>
                        <button onClick={() => setSortBy('soon')} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 font-medium text-gray-700 hover:text-black">Starts Soon</button>
                        <button onClick={() => setSortBy('rated')} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 font-medium text-gray-700 hover:text-black">Highest Rated</button>
                        <button onClick={() => setSortBy('practical')} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 font-medium text-gray-700 hover:text-black">Most Practical</button>
                     </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
               {sortedCourses.map((course) => (
                  <div 
                     key={course.id}
                     onClick={() => onCourseClick(course.slug)}
                     className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
                  >
                     {/* Thumbnail */}
                     <div className="aspect-video relative bg-gray-200 overflow-hidden">
                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                        <div className="absolute top-3 left-3">
                           <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-gray-900 shadow-sm">
                              {course.category}
                           </span>
                        </div>
                        {course.format === 'Live Session' && (
                           <div className="absolute bottom-3 right-3">
                              <span className="bg-black/80 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                                 <Clock className="w-3 h-3" /> Live
                              </span>
                           </div>
                        )}
                     </div>

                     {/* Content */}
                     <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 line-clamp-2 min-h-[3rem]">
                           {course.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                           {course.shortPromise}
                        </p>

                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <img src={course.instructor.avatar} alt="" className="w-6 h-6 rounded-full bg-gray-100" />
                              <span className="text-xs font-medium text-gray-700 truncate max-w-[80px] lg:max-w-[100px]">{course.instructor.name}</span>
                           </div>
                           <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                              <Star className="w-3 h-3 fill-current" /> {course.rating}
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* 4. Enterprise CTA */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
         <div className="bg-black rounded-2xl p-10 md:p-16 text-center md:text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gray-800 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
               <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Upskill your entire team.</h2>
                  <p className="text-gray-400 text-lg mb-8">
                     Get enterprise-grade access to all sessions, unified billing, and custom learning paths. Trusted by 500+ forward-thinking companies.
                  </p>
                  <div className="flex flex-wrap gap-4">
                     <button 
                        onClick={onBookDemo}
                        className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                     >
                        Book Demo
                     </button>
                     <button 
                        onClick={onViewPricing}
                        className="border border-gray-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-900 transition-colors"
                     >
                        View Team Packs
                     </button>
                  </div>
               </div>
               
               {/* Abstract Visual */}
               <div className="hidden md:block">
                  <div className="w-64 h-48 bg-gray-900 rounded-xl border border-gray-700 p-4 flex flex-col gap-3 opacity-90 rotate-3">
                     <div className="h-4 w-1/2 bg-gray-700 rounded animate-pulse"></div>
                     <div className="h-2 w-full bg-gray-800 rounded"></div>
                     <div className="h-2 w-3/4 bg-gray-800 rounded"></div>
                     <div className="mt-auto flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                        <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                        <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Catalog;
