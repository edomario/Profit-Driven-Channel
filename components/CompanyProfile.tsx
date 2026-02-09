import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Globe, 
  ShieldCheck, 
  Users, 
  Download, 
  Calendar, 
  Briefcase, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  FileText
} from 'lucide-react';
import { CompanyProfile as CompanyProfileType } from '../types';

const CompanyProfile: React.FC = () => {
  // Mock Data
  const company: CompanyProfileType = {
    id: 'c1',
    slug: 'techflow-inc',
    name: 'TechFlow Inc.',
    logo: 'https://ui-avatars.com/api/?name=TechFlow&background=000&color=fff&size=128',
    description: 'TechFlow provides the leading financial operating system for high-growth SaaS startups. We help you automate AR/AP, manage burn, and extend runway.',
    website: 'https://techflow.example.com',
    industry: 'Fintech',
    region: 'Global',
    verificationLevel: 'partner',
    resources: [
       { id: 'r1', title: 'The 2025 SaaS Benchmarks Report', type: 'pdf', downloads: 2400, leadsGenerated: 0, uploadDate: 'Oct 1, 2024', accessLevel: 'free' },
       { id: 'r2', title: 'Series B Financial Model Template', type: 'template', downloads: 1800, leadsGenerated: 0, uploadDate: 'Sep 15, 2024', accessLevel: 'free' }
    ],
    events: [
       { id: 'e1', companyId: 'c1', title: 'Scaling Finance Teams: 0 to 10', description: 'Live panel with CFOs from Stripe and Brex.', date: 'Oct 30, 2024 • 10:00 AM PST', duration: '60 min', hostName: 'TechFlow x Sarah Jenkins', registrationUrl: '#', registrations: 450 },
       { id: 'e2', companyId: 'c1', title: 'Automating the Close Process', description: 'Workshop on reducing monthly close time by 50%.', date: 'Nov 5, 2024 • 1:00 PM PST', duration: '90 min', hostName: 'TechFlow Team', registrationUrl: '#', registrations: 120 }
    ],
    hiringPosts: [
       { id: 'h1', companyId: 'c1', title: 'Senior Product Manager, Growth', location: 'Remote (US)', type: 'remote', description: 'Lead our PLG initiatives.', applyUrl: '#', status: 'active', tags: ['Product', 'Growth'] },
       { id: 'h2', companyId: 'c1', title: 'Account Executive - Enterprise', location: 'New York, NY', type: 'hybrid', description: 'Close 6-figure deals.', applyUrl: '#', status: 'active', tags: ['Sales', 'Enterprise'] }
    ]
  };

  const [activeTab, setActiveTab] = useState<'about' | 'resources' | 'events' | 'jobs'>('about');

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-slate-900">
      
      {/* Header / Banner */}
      <div className="bg-white border-b border-gray-200">
         <div className="h-32 bg-gradient-to-r from-gray-900 to-gray-800"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 pb-8">
               <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                  <div className="w-24 h-24 bg-white rounded-xl shadow-md p-1">
                     <img src={company.logo} alt={company.name} className="w-full h-full rounded-lg object-cover" />
                  </div>
                  <div className="mb-2">
                     <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
                        {company.verificationLevel === 'partner' && (
                           <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold border border-blue-100 uppercase tracking-wide">
                              <ShieldCheck className="w-3 h-3" /> Trusted Partner
                           </span>
                        )}
                     </div>
                     <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-2">
                        <span className="flex items-center gap-1"><Building2 className="w-4 h-4" /> {company.industry}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {company.region}</span>
                        <a href={company.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-brand-600 hover:underline">
                           <Globe className="w-4 h-4" /> Website
                        </a>
                     </div>
                  </div>
               </div>
               <div className="flex gap-3 mt-4 md:mt-0 self-end md:self-auto">
                  <button className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm">
                     Contact Sales
                  </button>
                  <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                     Follow
                  </button>
               </div>
            </div>

            {/* Navigation */}
            <div className="flex space-x-8 border-t border-gray-100 pt-1">
               {[
                  { id: 'about', label: 'About' },
                  { id: 'resources', label: 'Resources', count: company.resources.length },
                  { id: 'events', label: 'Events', count: company.events.length },
                  { id: 'jobs', label: 'Careers', count: company.hiringPosts.length }
               ].map((tab) => (
                  <button
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id as any)}
                     className={`flex items-center gap-2 py-4 border-b-2 text-sm font-medium transition-colors ${activeTab === tab.id ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                     {tab.label}
                     {tab.count !== undefined && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>
                           {tab.count}
                        </span>
                     )}
                  </button>
               ))}
            </div>
         </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
               
               {activeTab === 'about' && (
                  <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm animate-fade-in">
                     <h3 className="text-xl font-bold text-gray-900 mb-4">About Us</h3>
                     <p className="text-gray-600 leading-relaxed text-lg">
                        {company.description}
                     </p>
                     
                     <div className="mt-8 grid grid-cols-3 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                           <div className="text-2xl font-bold text-gray-900">500+</div>
                           <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mt-1">Customers</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                           <div className="text-2xl font-bold text-gray-900">$100M+</div>
                           <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mt-1">Managed ARR</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                           <div className="text-2xl font-bold text-gray-900">Global</div>
                           <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mt-1">Support 24/7</div>
                        </div>
                     </div>
                  </div>
               )}

               {activeTab === 'resources' && (
                  <div className="space-y-6 animate-fade-in">
                     <h3 className="text-xl font-bold text-gray-900">Expert Resources</h3>
                     <div className="grid gap-4">
                        {company.resources.map((res) => (
                           <div key={res.id} className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow flex items-start justify-between">
                              <div className="flex gap-4">
                                 <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-6 h-6" />
                                 </div>
                                 <div>
                                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{res.title}</h4>
                                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                                       <span className="uppercase font-bold text-xs bg-gray-100 px-2 py-0.5 rounded">{res.type}</span>
                                       <span>{res.downloads} downloads</span>
                                    </div>
                                 </div>
                              </div>
                              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 flex items-center gap-2">
                                 <Download className="w-4 h-4" /> Access
                              </button>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {activeTab === 'events' && (
                  <div className="space-y-6 animate-fade-in">
                     <h3 className="text-xl font-bold text-gray-900">Upcoming Events</h3>
                     <div className="grid gap-4">
                        {company.events.map((evt) => (
                           <div key={evt.id} className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                              <div className="flex flex-col md:flex-row justify-between gap-6">
                                 <div>
                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-100 uppercase tracking-wide mb-2">
                                       Sponsored
                                    </span>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">{evt.title}</h4>
                                    <p className="text-gray-600 text-sm mb-4 max-w-xl">{evt.description}</p>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                       <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {evt.date}</span>
                                       <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {evt.registrations} Registered</span>
                                       <span className="font-medium text-gray-900">Host: {evt.hostName}</span>
                                    </div>
                                 </div>
                                 <div className="flex-shrink-0 self-start md:self-center">
                                    <button className="w-full md:w-auto bg-black text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm">
                                       Register Free
                                    </button>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {activeTab === 'jobs' && (
                  <div className="space-y-6 animate-fade-in">
                     <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900">Open Roles</h3>
                        <span className="text-sm text-gray-500">We're hiring builders.</span>
                     </div>
                     <div className="grid gap-4">
                        {company.hiringPosts.map((job) => (
                           <div key={job.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors">
                              <div className="flex justify-between items-start">
                                 <div>
                                    <h4 className="text-lg font-bold text-gray-900">{job.title}</h4>
                                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                                       <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                                       <span className="bg-gray-100 px-2 py-0.5 rounded capitalize">{job.type}</span>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                       {job.tags.map(tag => (
                                          <span key={tag} className="text-xs bg-gray-50 border border-gray-200 px-2 py-1 rounded text-gray-600">{tag}</span>
                                       ))}
                                    </div>
                                 </div>
                                 <button className="text-sm font-bold text-brand-600 border border-brand-200 bg-brand-50 px-4 py-2 rounded-lg hover:bg-brand-100 transition-colors flex items-center gap-1">
                                    Apply <ExternalLink className="w-3 h-3" />
                                 </button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
               <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                     <CheckCircle2 className="w-5 h-5 text-green-600" /> Trusted Partner
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                     This company has been verified for business compliance, brand safety, and positive community feedback.
                  </p>
                  <div className="space-y-3 pt-4 border-t border-gray-100">
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Member Since</span>
                        <span className="font-bold text-gray-900">2023</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Response Rate</span>
                        <span className="font-bold text-green-600">High</span>
                     </div>
                  </div>
               </div>

               {/* Ad Placeholder (Contextual) */}
               <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">Advertisement</p>
                  <div className="bg-white h-48 rounded-lg border border-gray-200 flex items-center justify-center mb-3">
                     <span className="text-gray-400 text-sm">Targeted Ad Slot</span>
                  </div>
                  <button className="text-xs text-gray-500 hover:text-black underline">Remove Ads</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CompanyProfile;