
import React, { useState } from 'react';
import { Course, Trainer } from '../types';
import { Search, Filter, BookOpen, Users, Video, Calendar, ArrowRight, Star } from 'lucide-react';

interface SearchPageProps {
  query: string;
  onCourseClick: (slug: string) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ query, onCourseClick }) => {
  const [activeTab, setActiveTab] = useState<'all'|'courses'|'trainers'>('all');

  // Mock Results (In a real app, these would come from the search prop or API)
  const courses: Course[] = [
     {
        id: 's1', 
        title: 'Advanced SaaS Economics', 
        slug: 'saas-economics',
        shortPromise: 'Master unit economics that drive valuation.',
        price: 499,
        currency: 'USD',
        category: 'Finance',
        thumbnail: 'https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=400',
        rating: 4.9,
        reviewsCount: 124,
        level: 'Advanced',
        language: 'English',
        duration: '4 Weeks',
        format: 'Live Session',
        instructor: { id: 't1', name: 'David Sacks', title: 'Partner', avatar: 'https://ui-avatars.com/api/?name=David+Sacks&background=000&color=fff', rating: 4.9, reviewsCount: 500, verified: true },
        outcomes: [], roiStats: [], proofOfWork: [], syllabus: [], resourcesIncluded: [], upcomingSessions: [], badges: [], enterpriseEligible: true
     },
     {
        id: 's2', 
        title: 'AI Implementation Strategy', 
        slug: 'ai-strategy',
        shortPromise: 'Deploy LLMs in enterprise workflows safely.',
        price: 699,
        currency: 'USD',
        category: 'Tech',
        thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=400',
        rating: 4.8,
        reviewsCount: 89,
        level: 'Intermediate',
        language: 'English',
        duration: '3 Weeks',
        format: 'Hybrid',
        instructor: { id: 't2', name: 'Dr. AI', title: 'Chief AI Officer', avatar: 'https://ui-avatars.com/api/?name=Dr+AI&background=000&color=fff', rating: 4.8, reviewsCount: 300, verified: true },
        outcomes: [], roiStats: [], proofOfWork: [], syllabus: [], resourcesIncluded: [], upcomingSessions: [], badges: [], enterpriseEligible: true
     }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-gray-50 py-12">
         <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h1>
            <p className="text-gray-500">Showing results for "<span className="text-black font-medium">{query}</span>"</p>
         </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
         {/* Tabs */}
         <div className="flex gap-4 border-b border-gray-100 mb-8 overflow-x-auto">
            {['all', 'courses', 'trainers', 'resources'].map(tab => (
               <button 
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`pb-3 px-1 text-sm font-bold capitalize border-b-2 transition-colors ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
               >
                  {tab}
               </button>
            ))}
         </div>

         <div className="space-y-8 animate-fade-in">
            {/* Courses Section */}
            {(activeTab === 'all' || activeTab === 'courses') && (
               <section>
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                     <BookOpen className="w-4 h-4 text-gray-500" /> Courses
                  </h3>
                  <div className="grid gap-4">
                     {courses.map(course => (
                        <div 
                           key={course.id} 
                           onClick={() => onCourseClick(course.slug)}
                           className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all cursor-pointer bg-white"
                        >
                           <div className="w-full sm:w-48 aspect-video bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
                           </div>
                           <div className="flex-1">
                              <div className="flex justify-between items-start">
                                 <div>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">{course.category}</span>
                                    <h4 className="font-bold text-lg text-gray-900">{course.title}</h4>
                                 </div>
                                 <span className="font-bold text-gray-900">${course.price}</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1 mb-3">{course.shortPromise}</p>
                              
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                 <div className="flex items-center gap-1">
                                    <img src={course.instructor.avatar} className="w-4 h-4 rounded-full" />
                                    <span>{course.instructor.name}</span>
                                 </div>
                                 <div className="flex items-center gap-1 text-amber-500 font-bold">
                                    <Star className="w-3 h-3 fill-current" /> {course.rating}
                                 </div>
                                 <div className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{course.format}</div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </section>
            )}

            {/* Trainers Section */}
            {(activeTab === 'all' || activeTab === 'trainers') && (
               <section>
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                     <Users className="w-4 h-4 text-gray-500" /> Trainers
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                     {[1,2,3].map(i => (
                        <div key={i} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                           <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                              <img src={`https://ui-avatars.com/api/?name=Trainer+${i}&background=random`} alt="" className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <h4 className="font-bold text-sm text-gray-900">Trainer {i}</h4>
                              <p className="text-xs text-gray-500">Expert in Finance</p>
                           </div>
                           <button className="ml-auto text-xs font-bold border border-gray-300 px-2 py-1 rounded hover:bg-white">View</button>
                        </div>
                     ))}
                  </div>
               </section>
            )}
         </div>
      </div>
    </div>
  );
};

export default SearchPage;