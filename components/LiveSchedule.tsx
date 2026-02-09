
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, ArrowRight, Video, Filter, ChevronDown, Check, Search } from 'lucide-react';
import { CheckoutItem } from '../types';

interface LiveScheduleProps {
  onBook: (item: CheckoutItem) => void;
}

const LiveSchedule: React.FC<LiveScheduleProps> = ({ onBook }) => {
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Session Data
  const sessions = [
    {
      id: 'sess_1',
      title: "Advanced SaaS Economics - Part 1",
      instructor: "David Sacks",
      role: "Partner @ Craft",
      date: "Oct 30, 2024",
      time: "10:00 AM PST",
      duration: "90 min",
      price: 499,
      category: "Finance",
      format: "Virtual",
      seatsLeft: 5,
      image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 'sess_2',
      title: "AI Implementation Strategy - Kickoff",
      instructor: "Dr. AI",
      role: "Chief AI Officer",
      date: "Nov 02, 2024",
      time: "1:00 PM EST",
      duration: "120 min",
      price: 699,
      category: "Tech",
      format: "Hybrid",
      seatsLeft: 12,
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 'sess_3',
      title: "Supply Chain Resilience Workshop",
      instructor: "Elena R.",
      role: "VP Ops @ GlobalLog",
      date: "Nov 05, 2024",
      time: "9:00 AM CST",
      duration: "4 hours",
      price: 1200,
      category: "Ops",
      format: "In-Person",
      seatsLeft: 3,
      location: "Austin, TX",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 'sess_4',
      title: "High-Stakes Influence",
      instructor: "Chris Voss",
      role: "Negotiator",
      date: "Nov 10, 2024",
      time: "11:00 AM PST",
      duration: "60 min",
      price: 299,
      category: "Leadership",
      format: "Virtual",
      seatsLeft: 20,
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400"
    }
  ];

  const filteredSessions = sessions.filter(s => {
    const matchesCategory = filterCategory === 'All' || s.category === filterCategory;
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 animate-fade-in">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Session Schedule</h1>
          <p className="text-gray-500 max-w-2xl">
            Browse upcoming live sprints, workshops, and masterclasses. Secure your seat before cohorts fill up.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {['All', 'Finance', 'Tech', 'Ops', 'Leadership'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border
                  ${filterCategory === cat 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search session or instructor..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-black focus:border-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="space-y-4">
          {filteredSessions.map((session) => (
            <div key={session.id} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow group">
              
              {/* Date Block */}
              <div className="flex-shrink-0 flex flex-row md:flex-col items-center justify-center md:w-24 gap-2 md:gap-0 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-6">
                <span className="text-sm font-bold text-red-600 uppercase tracking-wider">{session.date.split(' ')[0]}</span>
                <span className="text-2xl font-extrabold text-gray-900">{session.date.split(' ')[1].replace(',', '')}</span>
                <span className="text-xs text-gray-500">{session.date.split(' ')[2]}</span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide
                        ${session.format === 'Virtual' ? 'bg-purple-100 text-purple-700' : 
                          session.format === 'In-Person' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                        {session.format}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {session.time} • {session.duration}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-brand-600 transition-colors">
                      {session.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 mt-3">
                      <img src={`https://ui-avatars.com/api/?name=${session.instructor}&background=random`} alt="" className="w-6 h-6 rounded-full" />
                      <div className="text-sm">
                        <span className="font-medium text-gray-900">{session.instructor}</span>
                        <span className="text-gray-500 mx-1">•</span>
                        <span className="text-gray-500 text-xs">{session.role}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3 min-w-[140px]">
                    <div className="text-right">
                      <span className="block text-xl font-bold text-gray-900">${session.price}</span>
                      <span className="text-xs text-red-600 font-medium">{session.seatsLeft} seats left</span>
                    </div>
                    <button 
                      onClick={() => onBook({
                        id: session.id,
                        title: session.title,
                        description: `Live Session on ${session.date}`,
                        price: session.price,
                        type: 'session'
                      })}
                      className="w-full bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                      Book Seat <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}

          {filteredSessions.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200 border-dashed">
              <p className="text-gray-500">No sessions found matching your criteria.</p>
              <button 
                onClick={() => {setFilterCategory('All'); setSearchQuery('');}}
                className="mt-4 text-brand-600 font-bold hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveSchedule;
