
import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Zap, 
  Filter, 
  CheckCircle2, 
  BarChart2, 
  PlusCircle, 
  Shield, 
  DollarSign, 
  Lock, 
  X, 
  PhoneCall,
  Clock,
  Wallet,
  ShieldCheck,
  Stethoscope,
  Copy,
  UserPlus,
  Briefcase,
  AlertTriangle,
  History,
  CreditCard,
  Building2,
  TrendingUp,
  Tag,
  Mail,
  Linkedin,
  MessageSquare,
  ChevronRight,
  Download
} from 'lucide-react';
import { Lead } from '../types';

// Mock Leads Data (Red Phone)
const MOCK_LEADS: Lead[] = [
  { 
    id: 'rp1', 
    title: 'Retail business needs Contract support',
    role: 'Owner', 
    company: 'Kampala Hardware Ltd', 
    sourceResource: 'Quick Scan', 
    date: '10m ago', 
    status: 'new', 
    consent: true, 
    location: 'Gulu, UG', 
    consentText: 'Opted In', 
    weakness: 'Shield',
    criticalPillar: 'Shield',
    topWeaknessTag: 'Contracts',
    leadSize: 'S',
    creditCost: 2,
    urgency: 'Today',
    matchScore: 95,
    tags: ['contracts_drafting', 'compliance'],
    anonSummary: 'Needs quick review of supplier contracts. Main risk: Unsigned agreements with key vendors.',
    problem: 'Legal Exposure'
  },
  { 
    id: 'rp2', 
    title: 'SME needs help fixing Cash Flow leaks',
    role: 'MD', 
    company: 'Swift Movers', 
    sourceResource: 'Deep Assessment', 
    date: '1h ago', 
    status: 'new', 
    consent: true, 
    location: 'Kampala, UG', 
    consentText: 'Opted In', 
    weakness: 'Fuel', 
    criticalPillar: 'Fuel',
    topWeaknessTag: 'Invoicing',
    leadSize: 'M',
    creditCost: 5,
    urgency: 'This Week',
    matchScore: 88,
    tags: ['cost_audit', 'process_optimization'],
    anonSummary: 'Transport company leaking profit on fuel/maintenance. Wants "Fuel Pillar" fix plan implementation.',
    problem: 'Ops Expense Leak'
  },
  { 
    id: 'rp3', 
    title: 'Agro-Processor HR Overhaul',
    role: 'HR Manager', 
    company: 'Nile Agro', 
    sourceResource: 'Deep Assessment', 
    date: '3h ago', 
    status: 'hot', 
    consent: true, 
    location: 'Jinja, UG', 
    consentText: 'Opted In', 
    weakness: 'Brain', 
    criticalPillar: 'Brain',
    topWeaknessTag: 'Hiring',
    leadSize: 'XL',
    creditCost: 20,
    urgency: 'This Month',
    matchScore: 75,
    tags: ['org_design', 'performance_management'],
    anonSummary: '200+ staff factory. Union issues and low productivity. Needs full leadership restructure.',
    problem: 'Labor Efficiency'
  }
];

const ConsultantDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'red_phone' | 'credits' | 'clients'>('red_phone');
  
  // Wallet State
  const [credits, setCredits] = useState(25); 
  const [showTopUp, setShowTopUp] = useState(false);
  
  // Subscription State
  const [isVerified, setIsVerified] = useState(true); 

  // Lead Board State
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [showLeadDetail, setShowLeadDetail] = useState(false);
  
  // Message Gen State
  const [messageType, setMessageType] = useState<'whatsapp' | 'email' | 'linkedin'>('whatsapp');

  // -- Actions --

  const handleUnlockClick = (lead: Lead) => {
     setSelectedLead(lead);
     setShowUnlockModal(true);
  };

  const confirmUnlock = () => {
     if (!selectedLead) return;
     
     if (credits < selectedLead.creditCost) {
        setShowUnlockModal(false);
        setShowTopUp(true);
        return;
     }

     setCredits(prev => prev - selectedLead.creditCost);
     // Update lead to unlocked
     setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, isUnlocked: true, status: 'contacted' } : l));
     
     setShowUnlockModal(false);
     setShowLeadDetail(true); // Open detail view immediately
  };

  const handleBuyCredits = (amount: number, cost: number) => {
     setCredits(prev => prev + amount);
     setShowTopUp(false);
     alert(`Purchased ${amount} credits!`);
  }

  // -- Dynamic Message Generator --
  const generateMessage = (lead: Lead, type: 'whatsapp' | 'email' | 'linkedin') => {
     const consultantName = "Sarah"; // Mock
     const clientName = lead.role; // Mock, usually First Name
     const pillar = lead.criticalPillar || 'Operations';
     const riskTag = lead.topWeaknessTag || 'Systems';

     if (type === 'whatsapp') {
        return `Hi ${clientName}, I'm ${consultantName}. I saw your diagnostic and noticed the biggest pressure is in ${pillar} — especially ${riskTag}. \n\nIf you want, I can help you fix this with a simple 2-step plan: (1) identify the leak (2) implement controls. \n\nQuick question: what's the #1 symptom you feel right now?`;
     }
     if (type === 'linkedin') {
        return `Hi ${clientName}, I saw your diagnostic results for ${lead.company}. Your critical bottleneck is ${pillar} (especially ${riskTag}). \n\nI help businesses fix that with a short audit + implementation sprint. Want me to send a 3-step plan?`;
     }
     // Email
     return `Subject: Quick fix for your ${pillar} leak in ${lead.company}\n\nHi ${clientName},\n\nI'm ${consultantName}. I reviewed your diagnostic report for ${lead.company}. Your highest risk appears to be ${pillar}, driven by ${riskTag}.\n\nHere's what I recommend (simple + practical):\n1. Immediate fix (7 days): Audit current process.\n2. System fix (30 days): Implement controls.\n\nIf you reply with your current monthly revenue volume, I'll send you a free 1-page action plan tailored to your situation.\n\nRegards,\n${consultantName}`;
  };

  // -- Renderers --

  const renderRedPhone = () => (
     <div className="space-y-6 animate-fade-in">
        {/* Header Stats */}
        <div className="bg-gray-900 text-white p-6 rounded-xl flex flex-col md:flex-row items-center justify-between shadow-lg">
           <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="p-3 bg-red-600 rounded-full animate-pulse">
                 <PhoneCall className="w-6 h-6 text-white" />
              </div>
              <div>
                 <h2 className="text-xl font-bold">Red Phone Lead Board</h2>
                 <p className="text-gray-400 text-sm">Real-time leads matched to your specialties.</p>
              </div>
           </div>
           <div className="flex items-center gap-6">
              <div className="text-right">
                 <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">Credits</span>
                 <p className="text-3xl font-mono font-bold text-brand-400">{credits}</p>
              </div>
              <button 
                 onClick={() => setShowTopUp(true)}
                 className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-lg font-bold transition-colors shadow-lg"
              >
                 Buy Credits
              </button>
           </div>
        </div>

        {/* Filters (Simplified) */}
        <div className="flex gap-2 overflow-x-auto pb-2">
           {['All', 'Critical', 'High Value', 'Local'].map(f => (
              <button key={f} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-600 hover:text-black hover:border-gray-400 whitespace-nowrap">
                 {f}
              </button>
           ))}
        </div>

        {!isVerified ? (
           <div className="text-center py-20 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl">
              <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Unlock the Lead Board</h3>
              <p className="text-gray-500 max-w-md mx-auto mt-2 mb-6">
                 Verified consultants get access to high-intent leads. Subscribe to see who needs your help right now.
              </p>
              <button onClick={() => setIsVerified(true)} className="bg-black text-white px-6 py-3 rounded-lg font-bold">
                 Get Verified ($29/mo)
              </button>
           </div>
        ) : (
           <div className="grid grid-cols-1 gap-4">
              {leads.map(lead => {
                 const isUnlocked = lead.isUnlocked;
                 
                 return (
                    <div key={lead.id} className={`bg-white p-6 rounded-xl border shadow-sm flex flex-col md:flex-row gap-6 transition-all ${isUnlocked ? 'border-green-200 ring-1 ring-green-100' : 'border-gray-200 hover:shadow-md'}`}>
                       
                       {/* Left: Lead Context */}
                       <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                             <div className="flex gap-2">
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border 
                                   ${lead.leadSize === 'XL' ? 'bg-purple-100 text-purple-800 border-purple-200' : 
                                     lead.leadSize === 'L' ? 'bg-blue-100 text-blue-800 border-blue-200' : 
                                     'bg-gray-100 text-gray-700 border-gray-200'}`}>
                                   Size: {lead.leadSize}
                                </span>
                                <span className="px-2 py-1 rounded text-[10px] font-bold uppercase bg-red-50 text-red-700 border border-red-100">
                                   {lead.criticalPillar} Critical
                                </span>
                                <span className="px-2 py-1 rounded text-[10px] font-bold uppercase bg-gray-100 text-gray-600 border border-gray-200">
                                   {lead.urgency}
                                </span>
                             </div>
                             <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {lead.date}
                             </span>
                          </div>

                          <h3 className="text-lg font-bold text-gray-900 mb-1">{isUnlocked ? `${lead.role} @ ${lead.company}` : lead.title}</h3>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                             <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {lead.location}</span>
                             {isUnlocked && <span className="font-bold text-green-600">Unlocked</span>}
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                             <p className="text-sm text-gray-700 leading-relaxed">
                                {lead.anonSummary}
                             </p>
                             <div className="mt-3 flex flex-wrap gap-2">
                                {lead.tags.map(t => (
                                   <span key={t} className="text-[10px] font-bold bg-white border border-gray-300 px-2 py-1 rounded text-gray-600">
                                      {t}
                                   </span>
                                ))}
                             </div>
                          </div>

                          {isUnlocked ? (
                             <div className="flex gap-3">
                                <button 
                                   onClick={() => { setSelectedLead(lead); setShowLeadDetail(true); }}
                                   className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800"
                                >
                                   View Full Report & Contact
                                </button>
                             </div>
                          ) : (
                             <div className="flex items-center justify-between md:justify-start gap-6">
                                <button 
                                   onClick={() => handleUnlockClick(lead)}
                                   className="bg-brand-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-brand-700 shadow-sm flex items-center gap-2"
                                >
                                   Unlock Lead <span className="bg-brand-800 px-1.5 py-0.5 rounded text-[10px]">{lead.creditCost} CR</span>
                                </button>
                                <button className="text-sm text-gray-500 font-bold hover:text-black">View Details</button>
                             </div>
                          )}
                       </div>
                    </div>
                 );
              })}
           </div>
        )}
     </div>
  );

  const renderCredits = () => (
     <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
        <div className="text-center mb-8">
           <h2 className="text-3xl font-bold text-gray-900">Buy Credits</h2>
           <p className="text-gray-500 mt-2">Credits unlock client contacts + full diagnostic report context.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
              { amount: 10, cost: 20, label: 'Starter', desc: 'Good for ~2-5 leads' },
              { amount: 50, cost: 90, label: 'Pro', desc: 'Best Value. ~15 leads', popular: true },
              { amount: 100, cost: 160, label: 'Agency', desc: 'Volume discounting' }
           ].map((pkg) => (
              <div key={pkg.amount} className={`relative bg-white border rounded-2xl p-8 text-center hover:shadow-xl transition-all cursor-pointer ${pkg.popular ? 'border-brand-600 shadow-md ring-1 ring-brand-600' : 'border-gray-200'}`}>
                 {pkg.popular && <div className="absolute top-0 right-0 bg-brand-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Best Value</div>}
                 <h3 className="text-gray-500 font-bold uppercase text-xs mb-4">{pkg.label}</h3>
                 <div className="text-5xl font-black text-gray-900 mb-2">{pkg.amount}</div>
                 <p className="text-gray-400 text-sm mb-6">Credits</p>
                 <div className="text-2xl font-bold text-gray-900 mb-2">${pkg.cost}</div>
                 <p className="text-xs text-gray-400 mb-6">{pkg.desc}</p>
                 <button onClick={() => handleBuyCredits(pkg.amount, pkg.cost)} className={`w-full py-3 rounded-lg font-bold transition-colors ${pkg.popular ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                    Buy Now
                 </button>
              </div>
           ))}
        </div>
        <p className="text-center text-xs text-gray-400">If a lead is invalid (wrong contact), you can request a credit review within 24 hours.</p>
     </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-full">
       
       {/* Top Nav */}
       {!showLeadDetail && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
               <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold text-gray-900">Consultant Portal</h1>
                  {isVerified && <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full border border-blue-200 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Verified</span>}
               </div>
            </div>
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
              {['red_phone', 'credits', 'clients'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all whitespace-nowrap ${
                    activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
       )}

      <div className="animate-fade-in">
         {!showLeadDetail && activeTab === 'red_phone' && renderRedPhone()}
         {!showLeadDetail && activeTab === 'credits' && renderCredits()}
         
         {/* LEAD DETAIL VIEW */}
         {showLeadDetail && selectedLead && (
            <div className="animate-fade-in">
               <button onClick={() => setShowLeadDetail(false)} className="mb-6 flex items-center text-sm font-bold text-gray-500 hover:text-black">
                  <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Back to Board
               </button>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left: Lead Context */}
                  <div className="lg:col-span-2 space-y-6">
                     <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedLead.role} @ {selectedLead.company}</h1>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                           <span>{selectedLead.location}</span>
                           <span>•</span>
                           <span>{selectedLead.industry}</span>
                           <span>•</span>
                           <span className="text-red-600 font-bold">{selectedLead.criticalPillar} Critical</span>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-6">
                           <h4 className="font-bold text-blue-900 text-sm mb-2">Report Summary</h4>
                           <ul className="space-y-2 text-sm text-blue-800">
                              <li className="flex items-start gap-2"><TrendingUp className="w-4 h-4 mt-0.5" /> Top Risk: {selectedLead.topWeaknessTag}</li>
                              <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 mt-0.5" /> Profit Leak: High friction in {selectedLead.weakness} pillar.</li>
                              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5" /> Recommended: 30-Day System Fix Sprint.</li>
                           </ul>
                           <button className="mt-4 text-xs font-bold text-blue-700 hover:underline flex items-center gap-1">
                              <Download className="w-3 h-3" /> Download Full 30-Page Report
                           </button>
                        </div>

                        <div className="space-y-4">
                           <h3 className="font-bold text-gray-900">Reach Out</h3>
                           <div className="flex gap-3">
                              <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 flex items-center justify-center gap-2">
                                 <MessageSquare className="w-4 h-4" /> WhatsApp
                              </button>
                              <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50 flex items-center justify-center gap-2">
                                 <Mail className="w-4 h-4" /> Email
                              </button>
                              <button className="flex-1 bg-[#0077b5] text-white py-3 rounded-lg font-bold hover:opacity-90 flex items-center justify-center gap-2">
                                 <Linkedin className="w-4 h-4" /> LinkedIn
                              </button>
                           </div>
                        </div>
                     </div>

                     {/* Message Generator */}
                     <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                           <h3 className="font-bold text-gray-900">Suggested Opening Message</h3>
                           <div className="flex bg-gray-100 p-1 rounded-lg">
                              {['whatsapp', 'email', 'linkedin'].map(t => (
                                 <button 
                                    key={t}
                                    onClick={() => setMessageType(t as any)}
                                    className={`px-3 py-1 text-xs font-bold rounded capitalize ${messageType === t ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
                                 >
                                    {t}
                                 </button>
                              ))}
                           </div>
                        </div>
                        <div className="relative">
                           <textarea 
                              className="w-full h-48 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 font-mono bg-gray-50 focus:bg-white transition-colors"
                              defaultValue={generateMessage(selectedLead, messageType)}
                           />
                           <button className="absolute bottom-4 right-4 bg-white shadow-sm border border-gray-200 text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 hover:text-brand-600">
                              <Copy className="w-3 h-3" /> Copy
                           </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-center">Personalized based on client's diagnostic report data.</p>
                     </div>
                  </div>

                  {/* Right: CRM Status */}
                  <div className="space-y-6">
                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4">Lead Status</h3>
                        <div className="space-y-2">
                           {['New', 'Contacted', 'In Discussion', 'Won', 'Lost'].map(status => (
                              <button key={status} className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all flex justify-between items-center">
                                 {status}
                                 {selectedLead.status === status.toLowerCase().replace(' ', '_') && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                              </button>
                           ))}
                        </div>
                        <button className="w-full mt-4 text-xs text-red-500 font-bold hover:underline">Report Invalid Lead</button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>

      {/* Unlock Modal */}
      {showUnlockModal && selectedLead && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in-95">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
               <h3 className="text-xl font-bold text-gray-900 mb-4">Unlock this lead?</h3>
               <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-sm text-gray-600">Cost</span>
                     <span className="font-bold text-gray-900">{selectedLead.creditCost} Credits</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-sm text-gray-600">Your Balance</span>
                     <span className={`font-bold ${credits < selectedLead.creditCost ? 'text-red-600' : 'text-green-600'}`}>{credits} Credits</span>
                  </div>
               </div>
               
               <div className="space-y-3 mb-6">
                  <p className="text-sm font-bold text-gray-900">You will receive:</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                     <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Client Phone & Email</li>
                     <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> WhatsApp Click-to-Chat</li>
                     <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Full 30-Page Diagnostic Report</li>
                  </ul>
               </div>

               <div className="flex gap-3">
                  <button onClick={() => setShowUnlockModal(false)} className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50">Cancel</button>
                  <button 
                     onClick={confirmUnlock}
                     className="flex-1 bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800"
                  >
                     Unlock Now
                  </button>
               </div>
               <p className="text-xs text-gray-400 text-center mt-4">Only unlock leads you can realistically serve. Abuse can lead to suspension.</p>
            </div>
         </div>
      )}

      {/* Top Up Modal (Reused Logic) */}
      {showTopUp && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
               <h3 className="text-xl font-bold text-gray-900 mb-4">Buy Credits</h3>
               <p className="text-gray-500 mb-6 text-sm">Credits unlock client contacts + full diagnostic report context.</p>
               <div className="space-y-3 mb-6">
                  {[
                     { amt: 10, cost: 20 },
                     { amt: 25, cost: 45 },
                     { amt: 50, cost: 90, best: true }
                  ].map(pkg => (
                     <button 
                        key={pkg.amt}
                        onClick={() => handleBuyCredits(pkg.amt, pkg.cost)}
                        className={`w-full flex justify-between items-center p-4 border rounded-xl hover:border-black transition-all ${pkg.best ? 'border-brand-600 bg-brand-50' : 'border-gray-200'}`}
                     >
                        <span className="font-bold">{pkg.amt} Credits</span>
                        <span className="font-medium">${pkg.cost}</span>
                     </button>
                  ))}
               </div>
               <button onClick={() => setShowTopUp(false)} className="w-full text-gray-500 hover:text-black text-sm font-bold">Cancel</button>
            </div>
         </div>
      )}
    </div>
  );
};

export default ConsultantDashboard;
