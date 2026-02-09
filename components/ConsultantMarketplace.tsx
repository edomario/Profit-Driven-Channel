
import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  Filter, 
  Star, 
  ShieldCheck, 
  Video, 
  Calendar, 
  User as UserIcon,
  ArrowRight,
  Monitor,
  Lock,
  Globe,
  AlertTriangle,
  Briefcase,
  Phone,
  Mail,
  Linkedin,
  CheckCircle2,
  Trophy,
  Zap,
  Tag,
  Building2,
  MessageSquare,
  FileText,
  X
} from 'lucide-react';
import { ConsultantProfile, User } from '../types';
import { useLocalization } from '../contexts/LocalizationContext';
import { EXPERTISE_TAXONOMY, PILLAR_CATEGORY_MAP, ExpertiseTag } from '../data/marketplaceTaxonomy';

interface ConsultantMarketplaceProps {
  onConsultantClick: (id: string) => void;
  onSessionClick: (id: string) => void;
  user?: User | null;
}

const ConsultantMarketplace: React.FC<ConsultantMarketplaceProps> = ({ onConsultantClick, onSessionClick, user }) => {
  const { locale } = useLocalization();
  const [filterCategory, setFilterCategory] = useState('Recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndustry, setActiveIndustry] = useState('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  
  // Context from Diagnostic (Simulated)
  const [criticalPillar, setCriticalPillar] = useState<'Shield' | 'Fuel' | 'Voice' | 'Engine' | 'Pulse' | 'Brain' | 'Tribe' | 'None'>('Shield'); 
  const [userLocation, setUserLocation] = useState(locale.country); 

  // Request Intro Modal State
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState<ConsultantProfile | null>(null);
  const [introStep, setIntroStep] = useState(1);
  const [shareReport, setShareReport] = useState(true);

  // -- 1. Mock Consultants Data --
  const consultants: ConsultantProfile[] = [
    {
      id: 'c1',
      name: 'Sarah Jenkins',
      email: 'sarah.j@expert.com',
      role: 'consultant',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      title: 'Commercial Lawyer & Compliance Expert',
      bio: 'Specializing in East African trade law, contract disputes, and entity registration. 12 years experience in Kampala & Nairobi.',
      location: { lat: 0.3476, lng: 32.5825, city: 'Kampala', country: 'UG' },
      serviceRadiusKm: 50,
      serviceScope: 'country',
      jurisdictions: ['UG', 'KE'],
      deliveryMode: 'hybrid',
      acceptsInPerson: true,
      badges: ['ID Verified', 'Top Rated'],
      metrics: { responseTime: '2h', jobsCompleted: 42, rating: 4.9 },
      services: [],
      specialties: ['Contracts', 'Dispute Resolution', 'Compliance'],
      expertiseTags: ['contracts_drafting', 'regulatory_compliance', 'company_registration'],
      industryTags: ['Logistics', 'Retail / FMCG'],
      primaryCategories: ['Legal & Compliance', 'Shield'],
      tier: 'pro',
      status: 'approved',
      successScore: 98,
      verifiedStatus: 'verified_plus',
      whatsappNumber: '+256 700 123 456',
      linkedinUrl: 'linkedin.com/in/sarahjenkins-law',
      remoteAvailable: true,
      creditsBalance: 120
    },
    {
      id: 'c2',
      name: 'David Okafor',
      email: 'david.o@finance.com',
      role: 'consultant',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      title: 'Fractional CFO & Tax Strategist',
      bio: 'Helping SMEs optimize cash flow and navigate tax audits. Former Big 4 Auditor.',
      location: { lat: 6.5244, lng: 3.3792, city: 'Lagos', country: 'NG' },
      serviceRadiusKm: 20,
      serviceScope: 'country',
      jurisdictions: ['NG'],
      deliveryMode: 'hybrid',
      acceptsInPerson: true,
      badges: ['Vetted Expert'],
      metrics: { responseTime: '4h', jobsCompleted: 15, rating: 5.0 },
      services: [],
      specialties: ['Tax Planning', 'Cash Flow', 'Audits'],
      expertiseTags: ['tax_filing', 'cashflow_forecasting', 'bookkeeping_setup'],
      industryTags: ['Manufacturing', 'Agriculture'],
      primaryCategories: ['Finance & Accounting', 'Fuel'],
      tier: 'pro',
      status: 'approved',
      successScore: 92,
      verifiedStatus: 'verified',
      whatsappNumber: '+234 800 555 1212',
      linkedinUrl: 'linkedin.com/in/davidokafor-cfo',
      remoteAvailable: true,
      creditsBalance: 45
    },
    {
      id: 'c3',
      name: 'Elena Rossi',
      email: 'elena.r@growth.com',
      role: 'consultant',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
      title: 'Growth Marketing Director',
      bio: 'Scaling SaaS and E-commerce brands globally. Expert in paid acquisition and retention loops.',
      location: { lat: 40.7128, lng: -74.0060, city: 'New York', country: 'US' },
      serviceRadiusKm: 0,
      serviceScope: 'global',
      jurisdictions: [],
      deliveryMode: 'remote',
      acceptsInPerson: false,
      badges: ['Top Rated'],
      metrics: { responseTime: '1h', jobsCompleted: 150, rating: 4.9 },
      services: [],
      specialties: ['Paid Ads', 'Retention', 'Funnel Optimization'],
      expertiseTags: ['performance_ads', 'marketing_strategy', 'funnel_building'],
      industryTags: ['SaaS', 'Ecommerce'],
      primaryCategories: ['Marketing & Growth', 'Voice'],
      tier: 'elite',
      status: 'approved',
      successScore: 99,
      verifiedStatus: 'verified_plus',
      whatsappNumber: '+1 555 0199 888',
      linkedinUrl: 'linkedin.com/in/elenarossi-growth',
      remoteAvailable: true,
      creditsBalance: 300
    },
    {
      id: 'c4',
      name: 'James K.',
      email: 'james.k@ops.com',
      role: 'consultant',
      avatar: 'https://ui-avatars.com/api/?name=James+K&background=random',
      title: 'Operations System Architect',
      bio: 'Building SOPs and automation for logistics and retail businesses.',
      location: { lat: 51.5074, lng: -0.1278, city: 'London', country: 'GB' },
      serviceRadiusKm: 0,
      serviceScope: 'global',
      jurisdictions: [],
      deliveryMode: 'remote',
      acceptsInPerson: false,
      badges: [],
      metrics: { responseTime: '12h', jobsCompleted: 8, rating: 4.5 },
      services: [],
      specialties: ['SOPs', 'Automation', 'Logistics'],
      expertiseTags: ['sop_documentation', 'process_optimization', 'inventory_tracking'],
      industryTags: ['Logistics', 'Retail / FMCG'],
      primaryCategories: ['Operations', 'Engine'],
      tier: 'pro',
      status: 'approved',
      successScore: 85,
      verifiedStatus: 'none', // Basic
      remoteAvailable: true,
      creditsBalance: 10
    }
  ];

  // -- 2. Smart Routing Logic --
  // Flatten taxonomy for lookup
  const getAllTags = () => {
    let all: ExpertiseTag[] = [];
    Object.values(EXPERTISE_TAXONOMY).forEach(list => all = [...all, ...list]);
    return all;
  };
  const allTags = getAllTags();

  const getRankedConsultants = () => {
    let results = [...consultants];

    // 1. FILTER: Category / Weakness
    if (filterCategory === 'Recommended' && criticalPillar !== 'None') {
       const targetCategories = PILLAR_CATEGORY_MAP[criticalPillar] || [];
       results = results.filter(c => 
          c.primaryCategories.some(cat => targetCategories.includes(cat)) || 
          c.primaryCategories.includes(criticalPillar) // Fallback to Pillar name
       );
    } else if (filterCategory !== 'Recommended' && filterCategory !== 'All') {
       results = results.filter(c => c.primaryCategories.includes(filterCategory));
    }

    // 2. FILTER: Search
    if (searchQuery) {
       const q = searchQuery.toLowerCase();
       results = results.filter(c => 
          c.name.toLowerCase().includes(q) || 
          c.title.toLowerCase().includes(q) || 
          c.specialties.some(s => s.toLowerCase().includes(q))
       );
    }

    // 3. FILTER: Industry (Optional)
    if (activeIndustry !== 'All') {
        results = results.filter(c => c.industryTags.includes(activeIndustry));
    }

    // 4. FILTER: Verified Only
    if (verifiedOnly) {
       results = results.filter(c => c.verifiedStatus !== 'none');
    }

    // 5. RANKING & GEO-FENCING
    // Calculate Rank Score (0-100) based on relevance
    const rankedResults = results.map(consultant => {
        let rankScore = consultant.successScore * 0.35; // Base: Success Score (35%)
        rankScore += (consultant.metrics.rating * 20) * 0.25; // Base: Rating (25%) -> normalized to 100
        
        // Geo Logic
        const isLegalTax = consultant.primaryCategories.some(c => ['Legal & Compliance', 'Finance & Accounting'].includes(c));
        const isMarketingTech = consultant.primaryCategories.some(c => ['Marketing & Growth', 'Operations', 'Product'].includes(c));

        if (isLegalTax) {
            // Strong boost for matching jurisdiction
            if (consultant.jurisdictions?.includes(userLocation) || consultant.location?.country === userLocation) {
                rankScore += 25; 
            } else {
                rankScore -= 50; // Penalty for wrong jurisdiction in Legal/Tax
            }
        } else if (isMarketingTech) {
            // Small boost for local, but don't penalize remote
            if (consultant.location?.country === userLocation) {
                rankScore += 5;
            }
        }

        // Response Time Boost
        if (consultant.metrics.responseTime.includes('h') && parseInt(consultant.metrics.responseTime) < 4) {
            rankScore += 10;
        }

        // Verified Boost
        if (consultant.verifiedStatus === 'verified_plus') rankScore += 15;
        if (consultant.verifiedStatus === 'verified') rankScore += 10;

        return { ...consultant, rankScore };
    });

    // Sort by Rank Score
    rankedResults.sort((a, b) => b.rankScore - a.rankScore);

    return rankedResults;
  };

  const displayConsultants = getRankedConsultants();

  // -- 3. Request Intro Logic --
  const handleRequestIntro = (consultant: ConsultantProfile) => {
     setSelectedConsultant(consultant);
     setIntroStep(1);
     setShowIntroModal(true);
  };

  const submitIntro = () => {
     // Simulate API call
     setIntroStep(2);
     setTimeout(() => {
        setShowIntroModal(false);
        setIntroStep(1);
        setSelectedConsultant(null);
        alert(`Intro request sent to ${selectedConsultant?.name}. They will review your report and reply.`);
     }, 2000);
  };

  // Helper to get tag label
  const getTagLabel = (id: string) => allTags.find(t => t.id === id)?.label || id;

  const renderGeoBanner = () => {
     const hasLegal = filterCategory === 'Legal & Compliance' || (filterCategory === 'Recommended' && criticalPillar === 'Shield');
     const hasMarketing = filterCategory === 'Marketing & Growth' || (filterCategory === 'Recommended' && criticalPillar === 'Voice');

     if (hasLegal) {
        return (
           <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4 text-amber-700" />
                 <span className="text-amber-800">Showing <strong>local experts first</strong> because legal/tax advice is jurisdiction-specific to {userLocation}.</span>
              </div>
              <button className="text-xs text-amber-900 font-bold underline hover:no-underline">Include Remote</button>
           </div>
        );
     }
     if (hasMarketing) {
        return (
           <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                 <Globe className="w-4 h-4 text-blue-700" />
                 <span className="text-blue-800">Showing <strong>top global experts</strong> because marketing results can be delivered remotely.</span>
              </div>
              <button className="text-xs text-blue-900 font-bold underline hover:no-underline">Prefer Local</button>
           </div>
        );
     }
     return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-slate-900">
      
      {/* Header / Context Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-20 shadow-sm">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
               <div>
                  <h1 className="text-2xl font-bold text-gray-900">Smart Marketplace</h1>
                  <p className="text-sm text-gray-500 mt-1">
                     Showing experts matched to your <span className="font-bold text-black">weakest pillar ({criticalPillar})</span>.
                  </p>
               </div>
               
               {/* Diagnostic Context Simulator */}
               <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-2 rounded-lg">
                  <span className="text-xs font-bold text-blue-800 uppercase">Context:</span>
                  <select 
                     value={criticalPillar}
                     onChange={(e) => setCriticalPillar(e.target.value as any)}
                     className="bg-white border border-blue-200 text-xs font-medium rounded px-2 py-1 text-blue-900 focus:ring-0 cursor-pointer"
                  >
                     <option value="None">General Browsing</option>
                     <option value="Shield">Critical: Shield (Legal)</option>
                     <option value="Fuel">Critical: Fuel (Finance)</option>
                     <option value="Voice">Critical: Voice (Marketing)</option>
                     <option value="Engine">Critical: Engine (Ops)</option>
                  </select>
                  <select 
                     value={userLocation}
                     onChange={(e) => setUserLocation(e.target.value as any)}
                     className="bg-white border border-blue-200 text-xs font-medium rounded px-2 py-1 text-blue-900 focus:ring-0 cursor-pointer"
                  >
                     <option value="UG">Uganda (UG)</option>
                     <option value="NG">Nigeria (NG)</option>
                     <option value="US">USA (US)</option>
                     <option value="GB">UK (GB)</option>
                  </select>
               </div>
            </div>

            {/* Filters */}
            <div className="mt-6 flex flex-col gap-4">
               <div className="flex flex-wrap gap-2">
                  {['Recommended', 'All', ...Object.keys(EXPERTISE_TAXONOMY)].map(cat => (
                     <button 
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                           filterCategory === cat 
                              ? 'bg-black text-white border-black shadow-md' 
                              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                     >
                        {cat}
                     </button>
                  ))}
               </div>
               
               <div className="flex flex-wrap gap-4 items-center">
                   <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <input 
                         type="text" 
                         placeholder="Search skills, tags, or names..." 
                         className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-black focus:border-black"
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                      />
                   </div>
                   <select 
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700"
                      value={activeIndustry}
                      onChange={(e) => setActiveIndustry(e.target.value)}
                   >
                      <option value="All">All Industries</option>
                      <option value="Retail / FMCG">Retail / FMCG</option>
                      <option value="SaaS">SaaS</option>
                      <option value="Logistics">Logistics</option>
                   </select>
                   <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                      <input 
                         type="checkbox" 
                         checked={verifiedOnly} 
                         onChange={(e) => setVerifiedOnly(e.target.checked)}
                         className="rounded border-gray-300 text-black focus:ring-black" 
                      />
                      Verified Only
                   </label>
               </div>
            </div>
         </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         
         {renderGeoBanner()}

         {/* Alert if Local Search yields 0 */}
         {displayConsultants.length === 0 && (
            <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-xl">
               <p className="text-gray-500">No experts found matching your criteria in {userLocation}.</p>
               <button onClick={() => {setFilterCategory('All'); setSearchQuery('');}} className="mt-2 text-brand-600 font-bold hover:underline">Clear Filters</button>
            </div>
         )}

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayConsultants.map(consultant => {
               const isCategoryMatch = consultant.primaryCategories.some(c => PILLAR_CATEGORY_MAP[criticalPillar]?.includes(c));
               const isJurisdictionMatch = consultant.jurisdictions?.includes(userLocation);
               
               return (
                  <div key={consultant.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group flex flex-col relative">
                     
                     {/* Match Banner */}
                     {(isCategoryMatch || isJurisdictionMatch) && (
                        <div className="absolute top-0 right-0 bg-brand-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10 flex items-center gap-1">
                           <Zap className="w-3 h-3 fill-current" /> Smart Match
                        </div>
                     )}

                     {/* Top Row: Identity */}
                     <div className="p-5 flex items-start gap-4 border-b border-gray-50">
                        <div className="w-14 h-14 rounded-full bg-gray-100 overflow-hidden border border-gray-200 flex-shrink-0">
                           <img src={consultant.avatar} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                           <div className="flex items-center justify-between mb-0.5">
                              <h3 className="font-bold text-gray-900 truncate pr-6">{consultant.name}</h3>
                           </div>
                           <div className="flex items-center gap-1 mb-1">
                              {consultant.verifiedStatus === 'verified_plus' && (
                                 <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200">
                                    <ShieldCheck className="w-3 h-3" /> Verified+
                                 </span>
                              )}
                              {consultant.verifiedStatus === 'verified' && (
                                 <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700 border border-gray-200">
                                    <CheckCircle2 className="w-3 h-3" /> Verified
                                 </span>
                              )}
                           </div>
                           <p className="text-xs text-gray-500 truncate">{consultant.title}</p>
                           <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                              <span className="inline-flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded text-[10px] font-medium text-gray-600 border border-gray-200">
                                 <MapPin className="w-3 h-3" /> {consultant.location?.city}, {consultant.location?.country}
                              </span>
                              {consultant.remoteAvailable && (
                                 <span className="inline-flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded text-[10px] font-medium text-green-700 border border-green-100">
                                    <Globe className="w-3 h-3" /> Remote
                                 </span>
                              )}
                           </div>
                        </div>
                     </div>

                     {/* Trust Row */}
                     <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                           <Star className="w-3.5 h-3.5 fill-current" />
                           {consultant.metrics.rating}
                           <span className="text-gray-400 font-normal">({consultant.metrics.jobsCompleted})</span>
                        </div>
                        <div className="flex items-center gap-1.5" title="Success Score: Completion + Satisfaction">
                           <Trophy className={`w-3.5 h-3.5 ${consultant.successScore > 90 ? 'text-green-600' : 'text-gray-400'}`} />
                           <span className="font-bold text-gray-700">{consultant.successScore}/100 Success</span>
                        </div>
                     </div>

                     {/* Expertise Row */}
                     <div className="p-5 flex-1">
                        <div className="flex flex-wrap gap-2 mb-4">
                           {consultant.expertiseTags.slice(0, 4).map((tagId, i) => (
                              <span key={i} className="text-[10px] font-bold bg-white border border-gray-200 px-2 py-1 rounded-md text-gray-600">
                                 {getTagLabel(tagId)}
                              </span>
                           ))}
                           {consultant.expertiseTags.length > 4 && (
                              <span className="text-[10px] text-gray-400 px-1 py-1">+{consultant.expertiseTags.length - 4}</span>
                           )}
                        </div>
                        
                        {/* Industry Chips */}
                        {consultant.industryTags && consultant.industryTags.length > 0 && (
                           <div className="flex flex-wrap gap-1.5 mb-4">
                              {consultant.industryTags.slice(0, 3).map((ind, i) => (
                                 <span key={i} className="flex items-center gap-1 text-[10px] text-gray-500">
                                    <Building2 className="w-3 h-3" /> {ind}
                                 </span>
                              ))}
                           </div>
                        )}

                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                           {consultant.bio}
                        </p>
                     </div>

                     {/* Contact Row / Actions */}
                     <div className="p-5 pt-0 mt-auto">
                        <div className="grid grid-cols-2 gap-3">
                           <button 
                              onClick={() => onConsultantClick(consultant.id)}
                              className="bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors"
                           >
                              View Profile
                           </button>
                           <button 
                              onClick={() => handleRequestIntro(consultant)}
                              className="bg-black text-white py-2.5 rounded-lg text-xs font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-1"
                           >
                              <MessageSquare className="w-3 h-3" /> Request Intro
                           </button>
                        </div>
                        
                        <div className="mt-3 flex items-center justify-center text-[10px] text-gray-400">
                           <span>Responds in ~{consultant.metrics.responseTime}</span>
                        </div>
                     </div>

                  </div>
               );
            })}
         </div>
      </div>

      {/* Request Intro Modal */}
      {showIntroModal && selectedConsultant && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in-95">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
               {introStep === 1 ? (
                  <>
                     <div className="flex justify-between items-start mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Request Intro</h3>
                        <button onClick={() => setShowIntroModal(false)} className="text-gray-400 hover:text-black">
                           <X className="w-5 h-5" />
                        </button>
                     </div>
                     
                     <div className="flex items-center gap-4 mb-6">
                        <img src={selectedConsultant.avatar} className="w-12 h-12 rounded-full border border-gray-200" />
                        <div>
                           <p className="font-bold text-gray-900">{selectedConsultant.name}</p>
                           <p className="text-xs text-gray-500">{selectedConsultant.title}</p>
                        </div>
                     </div>

                     <div className="space-y-4 mb-6">
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                           <h4 className="text-sm font-bold text-gray-900 mb-2">Share Context?</h4>
                           <p className="text-xs text-gray-600 mb-3">
                              Sharing your 30-page diagnostic report helps {selectedConsultant.name.split(' ')[0]} prepare a solution before the first call.
                           </p>
                           <label className="flex items-center gap-3 cursor-pointer">
                              <div className={`w-10 h-6 rounded-full p-1 transition-colors ${shareReport ? 'bg-green-500' : 'bg-gray-300'}`} onClick={() => setShareReport(!shareReport)}>
                                 <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${shareReport ? 'translate-x-4' : 'translate-x-0'}`}></div>
                              </div>
                              <span className="text-sm font-medium text-gray-700">{shareReport ? 'Sharing Report' : 'Don\'t Share'}</span>
                           </label>
                        </div>

                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-1">Message (Optional)</label>
                           <textarea 
                              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-black focus:border-black h-24 resize-none"
                              placeholder={`Hi ${selectedConsultant.name.split(' ')[0]}, I need help with...`}
                           ></textarea>
                        </div>
                     </div>

                     <button 
                        onClick={submitIntro}
                        className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                     >
                        Send Request <ArrowRight className="w-4 h-4" />
                     </button>
                     <p className="text-center text-xs text-gray-400 mt-3">
                        Your contact info will be shared securely.
                     </p>
                  </>
               ) : (
                  <div className="text-center py-8">
                     <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                     </div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2">Request Sent!</h3>
                     <p className="text-gray-500 text-sm">
                        {selectedConsultant.name} has been notified. They usually respond within {selectedConsultant.metrics.responseTime}.
                     </p>
                  </div>
               )}
            </div>
         </div>
      )}
    </div>
  );
};

export default ConsultantMarketplace;
