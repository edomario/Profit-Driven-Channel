import React, { useState } from 'react';
import { 
  BarChart, 
  Activity, 
  Plus, 
  Filter, 
  Search, 
  MoreHorizontal, 
  CreditCard, 
  MapPin, 
  Target, 
  MousePointer, 
  Eye, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  LayoutTemplate, 
  DollarSign, 
  ShieldCheck, 
  Megaphone, 
  Calendar,
  X,
  Globe,
  Tag,
  Layout,
  FileText,
  Video,
  Lock,
  ArrowRight,
  Wallet,
  Briefcase,
  Sparkles,
  Loader2,
  Image as ImageIcon
} from 'lucide-react';
import { AdCampaign, User, BillingTransaction, AdObjective } from '../types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { getGeminiClient } from '../services/gemini';

interface AdManagerProps {
  user: User;
}

const AdManager: React.FC<AdManagerProps> = ({ user }) => {
  const [view, setView] = useState<'overview' | 'campaigns' | 'billing' | 'create'>('overview');
  const [walletBalance, setWalletBalance] = useState(user.adWalletBalance || 201.00);
  
  // -- Mock Data --
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([
    {
      id: 'c1',
      advertiserId: user.id,
      type: 'consultant_promo',
      objective: 'clicks',
      status: 'active',
      placements: ['marketplace_listing'],
      budget: { type: 'daily_cap', daily: 50, total: 500, spent: 120, currency: 'USD' },
      targeting: { locations: ['New York, NY'], tags: ['Finance', 'SaaS'], languages: ['English'], contextualOnly: false },
      creative: { 
         headline: 'Fractional CFO Services', 
         body: 'Scale your finance operations without the headcount.', 
         imageUrl: 'https://picsum.photos/400/200?random=101', 
         ctaText: 'Book Audit', 
         landingUrl: '#' 
      },
      metrics: { impressions: 4500, clicks: 180, conversions: 5, ctr: 4.0 }
    },
    {
      id: 'c2',
      advertiserId: user.id,
      type: 'company_ad',
      objective: 'leads',
      status: 'paused',
      placements: ['newsletter_slot'],
      budget: { type: 'fixed_slot', daily: 0, total: 299, spent: 299, currency: 'USD' },
      targeting: { locations: ['Global'], tags: ['AI', 'Engineering'], languages: ['English'], contextualOnly: true },
      creative: { 
         headline: 'AI Implementation Playbook', 
         body: 'Download the definitive guide to enterprise LLMs.', 
         imageUrl: 'https://picsum.photos/400/200?random=102', 
         ctaText: 'Download', 
         landingUrl: '#' 
      },
      metrics: { impressions: 12000, clicks: 320, conversions: 45, ctr: 2.6 }
    }
  ]);

  const [transactions, setTransactions] = useState<BillingTransaction[]>([
     { id: 'tx_1', date: 'Oct 24, 2024', description: 'Wallet Top-up', amount: 500, type: 'credit', status: 'paid', method: 'card' },
     { id: 'tx_2', date: 'Oct 20, 2024', description: 'Campaign: AI Playbook (Fixed Slot)', amount: 299, type: 'debit', status: 'paid', method: 'wallet' },
     { id: 'tx_3', date: 'Oct 18, 2024', description: 'Campaign: Fractional CFO (Daily Spend)', amount: 120, type: 'debit', status: 'paid', method: 'wallet' }
  ]);

  const performanceData = [
    { date: 'Mon', clicks: 45, spend: 22 },
    { date: 'Tue', clicks: 52, spend: 28 },
    { date: 'Wed', clicks: 38, spend: 19 },
    { date: 'Thu', clicks: 65, spend: 35 },
    { date: 'Fri', clicks: 80, spend: 45 },
    { date: 'Sat', clicks: 40, spend: 20 },
    { date: 'Sun', clicks: 35, spend: 18 },
  ];

  // -- Wizard & Modal State --
  const [wizardStep, setWizardStep] = useState(1);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState(100);
  
  const [newCampaign, setNewCampaign] = useState<Partial<AdCampaign>>({
     budget: { type: 'daily_cap', daily: 20, total: 200, spent: 0, currency: 'USD' },
     targeting: { locations: [], tags: [], languages: ['English'], contextualOnly: true },
     creative: { headline: '', body: '', imageUrl: '', ctaText: 'Learn More', landingUrl: '' },
     placements: []
  });

  const [generatingImage, setGeneratingImage] = useState(false);

  // Determine available objectives based on user role (B2B vs Consultant)
  const isCompany = user.role === 'enterprise_admin';

  // -- Actions --

  const handleGenerateImage = async () => {
     if (!newCampaign.creative?.headline) {
        alert("Please enter a headline first to guide the image generation.");
        return;
     }
     setGeneratingImage(true);
     try {
        const ai = await getGeminiClient({ promptForKey: true });
        if (!ai) {
           alert("AI key not configured. Please select a key and try again.");
           return;
        }

        const response = await ai.models.generateContent({
           model: 'gemini-2.5-flash-image',
           contents: {
              parts: [{ text: `Create a professional, high-quality advertisement image for a business campaign. 
              Headline: "${newCampaign.creative.headline}". 
              Description: "${newCampaign.creative.body || ''}". 
              Context: Corporate, trustworthy, clean design.` }]
           }
        });

        let imageUrl = '';
        if (response.candidates?.[0]?.content?.parts) {
           for (const part of response.candidates[0].content.parts) {
              if (part.inlineData) {
                 imageUrl = `data:image/png;base64,${part.inlineData.data}`;
                 break;
              }
           }
        }

        if (imageUrl) {
           setNewCampaign({
              ...newCampaign,
              creative: { ...newCampaign.creative!, imageUrl }
           });
        } else {
           alert("AI generated a response but no image data was found. Please try again.");
        }
     } catch (e) {
        console.error("Nano Banana Gen Error:", e);
        alert("Failed to generate image. Please verify API key and try again.");
     } finally {
        setGeneratingImage(false);
     }
  };

  const handleLaunchClick = () => {
     // Check if funds are sufficient
     const estimatedCost = newCampaign.budget?.type === 'fixed_slot' ? newCampaign.budget.total : newCampaign.budget?.daily;
     
     if (walletBalance < (estimatedCost || 0)) {
        alert("Insufficient funds. Please top up your wallet to launch this campaign.");
        setView('billing');
        setShowTopUpModal(true);
        return;
     }

     // Deduct immediately if fixed slot
     if (newCampaign.budget?.type === 'fixed_slot') {
        const cost = newCampaign.budget.total;
        setWalletBalance(prev => prev - cost);
        setTransactions(prev => [{
           id: `tx_${Date.now()}`,
           date: new Date().toLocaleDateString(),
           description: `Campaign: ${newCampaign.creative?.headline} (Fixed Slot)`,
           amount: cost,
           type: 'debit',
           status: 'paid',
           method: 'wallet'
        }, ...prev]);
     }

     const campaign: AdCampaign = {
        id: `c_${Date.now()}`,
        advertiserId: user.id,
        type: isCompany ? 'company_ad' : 'consultant_promo',
        objective: newCampaign.objective as any || 'clicks',
        status: 'active',
        placements: newCampaign.placements || [],
        budget: newCampaign.budget as any,
        targeting: newCampaign.targeting as any,
        creative: newCampaign.creative as any,
        metrics: { impressions: 0, clicks: 0, conversions: 0, ctr: 0 }
     };

     setCampaigns([campaign, ...campaigns]);
     setView('campaigns');
     setWizardStep(1);
  };

  const processTopUp = (method: 'card' | 'paypal') => {
     setPaymentProcessing(true);
     // Simulate API call / Webhook
     setTimeout(() => {
        setWalletBalance(prev => prev + topUpAmount);
        
        const transaction: BillingTransaction = {
           id: `tx_${Date.now()}`,
           date: new Date().toLocaleDateString(),
           description: `Wallet Top-up`,
           amount: topUpAmount,
           type: 'credit',
           status: 'paid',
           method: method
        };

        setTransactions([transaction, ...transactions]);
        setPaymentProcessing(false);
        setShowTopUpModal(false);
     }, 1500);
  };

  // -- Components --

  const Overview = () => (
     <div className="space-y-8 animate-fade-in">
        {/* Top KPI Cards (Ramp Style) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Available Balance</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">${walletBalance.toFixed(2)}</h3>
              <button onClick={() => setShowTopUpModal(true)} className="text-xs text-brand-600 mt-1 font-bold hover:underline flex items-center">
                 <Plus className="w-3 h-3 mr-1" /> Add Funds
              </button>
           </div>
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Impressions</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">16.5k</h3>
              <p className="text-xs text-green-600 mt-1 font-bold">+12% vs prev</p>
           </div>
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Clicks</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">500</h3>
              <p className="text-xs text-gray-400 mt-1">Avg CPC: $1.14</p>
           </div>
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Conversions</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">50</h3>
              <p className="text-xs text-green-600 mt-1 font-bold">10% Conv. Rate</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Chart */}
           <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-gray-900">Performance Trends</h3>
                 <select className="text-xs border-gray-300 rounded-lg p-1 bg-white">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                 </select>
              </div>
              <div className="h-64">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                       <defs>
                          <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#000000" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                       <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                       <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                       <Tooltip />
                       <Area type="monotone" dataKey="clicks" stroke="#000000" strokeWidth={2} fillOpacity={1} fill="url(#colorClicks)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Quick Actions / Alerts */}
           <div className="space-y-6">
              <div className="bg-brand-600 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
                 <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-2">Create New Campaign</h3>
                    <p className="text-gray-200 text-xs mb-6">
                       {isCompany ? 'Promote your brand, events, or open roles.' : 'Reach high-intent learners and scale your practice.'}
                    </p>
                    <button onClick={() => setView('create')} className="bg-white text-brand-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-100 flex items-center gap-2">
                       <Plus className="w-4 h-4" /> Start Wizard
                    </button>
                 </div>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8 pointer-events-none"></div>
              </div>

              {walletBalance < 50 && (
                 <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
                    <h4 className="font-bold text-red-900 text-sm flex items-center gap-2 mb-2">
                       <AlertCircle className="w-4 h-4" /> Low Balance Warning
                    </h4>
                    <p className="text-xs text-red-800 leading-relaxed">
                       Your ad wallet is running low. Campaigns may pause soon. Top up to ensure uninterrupted delivery.
                    </p>
                    <button onClick={() => setShowTopUpModal(true)} className="mt-3 text-xs bg-red-600 text-white px-3 py-1.5 rounded font-bold hover:bg-red-700">Add Funds</button>
                 </div>
              )}
           </div>
        </div>
     </div>
  );

  const CampaignList = () => (
     <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm animate-fade-in">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
           <h3 className="font-bold text-gray-900">All Campaigns</h3>
           <div className="flex gap-2">
              <div className="relative">
                 <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                 <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-brand-600 focus:border-brand-600" />
              </div>
              <button className="bg-white border border-gray-300 px-3 py-2 rounded-lg text-gray-600 hover:text-black">
                 <Filter className="w-4 h-4" />
              </button>
           </div>
        </div>
        <table className="w-full text-sm text-left">
           <thead className="bg-white text-gray-500 font-medium border-b border-gray-100">
              <tr>
                 <th className="px-6 py-4">Campaign Name</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4">Placement</th>
                 <th className="px-6 py-4">Budget / Spend</th>
                 <th className="px-6 py-4">Results</th>
                 <th className="px-6 py-4 text-right">Actions</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-gray-100">
              {campaigns.map((c) => (
                 <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                       <div className="font-bold text-gray-900">{c.creative.headline}</div>
                       <div className="text-xs text-gray-500 capitalize flex items-center gap-1">
                          <Target className="w-3 h-3" /> {c.objective.replace('_', ' ')}
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide
                          ${c.status === 'active' ? 'bg-green-100 text-green-800' : 
                            c.status === 'pending_payment' ? 'bg-amber-100 text-amber-800' :
                            c.status === 'insufficient_funds' ? 'bg-red-100 text-red-800' :
                            c.status === 'in_review' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                          {c.status.replace('_', ' ')}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded text-gray-600">
                          {c.placements[0] ? c.placements[0].replace('_', ' ') : 'Multiple'}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="text-gray-900 font-bold">${c.budget.spent} <span className="text-gray-400 font-normal text-xs">/ ${c.budget.total}</span></div>
                       {c.budget.type === 'daily_cap' && (
                          <div className="w-24 bg-gray-200 h-1 rounded-full mt-1 overflow-hidden">
                             <div className="bg-brand-600 h-full" style={{ width: `${(c.budget.spent / c.budget.total) * 100}%` }}></div>
                          </div>
                       )}
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex gap-4">
                          <div>
                             <span className="block font-bold text-gray-900">{c.metrics.impressions.toLocaleString()}</span>
                             <span className="text-[10px] text-gray-500 uppercase">Impr</span>
                          </div>
                          <div>
                             <span className="block font-bold text-green-600">{c.metrics.ctr}%</span>
                             <span className="text-[10px] text-gray-500 uppercase">CTR</span>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button className="text-gray-400 hover:text-black p-2 hover:bg-gray-100 rounded-full">
                          <MoreHorizontal className="w-5 h-5" />
                       </button>
                    </td>
                 </tr>
              ))}
           </tbody>
        </table>
     </div>
  );

  const Billing = () => (
     <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
           <h2 className="text-xl font-bold text-gray-900">Ad Wallet & Billing</h2>
           <button 
              onClick={() => setShowTopUpModal(true)}
              className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-700"
           >
              Add Funds
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                 <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Wallet className="w-5 h-5" /> Prepaid Wallet</h3>
                 <div className="text-center py-4">
                    <h2 className="text-5xl font-extrabold text-gray-900 mb-2">${walletBalance.toFixed(2)}</h2>
                    <p className="text-sm text-gray-500">Available Credits</p>
                 </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600 mt-4">
                 Your campaigns will automatically pause if this balance reaches $0. Top up to ensure continuous delivery.
              </div>
           </div>

           <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5" /> Payment Methods</h3>
              <div className="space-y-3">
                 <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-6 bg-gray-800 rounded"></div>
                       <div>
                          <p className="text-sm font-bold text-gray-900">Visa ending in 4242</p>
                          <p className="text-xs text-gray-500">Expires 12/25</p>
                       </div>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Default</span>
                 </div>
                 <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg opacity-60">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-6 bg-blue-100 rounded flex items-center justify-center text-[10px] font-bold text-blue-800">PP</div>
                       <div>
                          <p className="text-sm font-bold text-gray-900">PayPal (sarah@...)</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
           <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-gray-900 text-sm">Transaction Ledger</h3>
           </div>
           <table className="w-full text-sm text-left">
              <thead className="bg-white text-gray-500 font-medium border-b border-gray-100">
                 <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Amount</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50">
                       <td className="px-6 py-4 text-gray-500">{tx.date}</td>
                       <td className="px-6 py-4 font-medium text-gray-900">{tx.description}</td>
                       <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase
                             ${tx.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                             {tx.type}
                          </span>
                       </td>
                       <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-gray-50 text-gray-500 border border-gray-200 uppercase">
                             {tx.status}
                          </span>
                       </td>
                       <td className={`px-6 py-4 text-right font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                          {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
     </div>
  );

  const CreateWizard = () => (
     <div className="max-w-4xl mx-auto animate-fade-in-up pb-20">
        {/* Progress */}
        <div className="flex items-center justify-between mb-8 px-4">
           {[
              { id: 1, label: 'Objective' },
              { id: 2, label: 'Targeting' },
              { id: 3, label: 'Placements' },
              { id: 4, label: 'Creative' },
              { id: 5, label: 'Budget' },
              { id: 6, label: 'Review' }
           ].map((step) => (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2
                    ${wizardStep >= step.id ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-gray-400 border-gray-200'}`}>
                    {wizardStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                 </div>
                 <span className={`text-[10px] sm:text-xs mt-2 font-medium ${wizardStep >= step.id ? 'text-brand-600' : 'text-gray-400'}`}>{step.label}</span>
              </div>
           ))}
           <div className="absolute left-0 right-0 top-4 h-0.5 bg-gray-200 -z-0 mx-12 hidden sm:block"></div> 
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden min-h-[400px] flex flex-col">
           <div className="p-8 flex-1">
              {/* STEPS 1-4 */}
              {wizardStep === 1 && (
                 <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Step 1: Campaign Objective</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       <div 
                          onClick={() => setNewCampaign({...newCampaign, objective: 'clicks'})}
                          className={`cursor-pointer p-6 rounded-xl border-2 transition-all hover:shadow-md
                             ${newCampaign.objective === 'clicks' ? 'border-brand-600 bg-brand-50 ring-1 ring-brand-600' : 'border-gray-200 hover:border-gray-300'}`}
                       >
                          <div className="mb-4 text-gray-900"><MousePointer className="w-8 h-8" /></div>
                          <h4 className="font-bold text-lg capitalize">Traffic</h4>
                          <p className="text-sm text-gray-500 mt-2">Drive visitors to your profile or site.</p>
                       </div>
                       
                       <div 
                          onClick={() => setNewCampaign({...newCampaign, objective: 'leads'})}
                          className={`cursor-pointer p-6 rounded-xl border-2 transition-all hover:shadow-md
                             ${newCampaign.objective === 'leads' ? 'border-brand-600 bg-brand-50 ring-1 ring-brand-600' : 'border-gray-200 hover:border-gray-300'}`}
                       >
                          <div className="mb-4 text-gray-900"><Target className="w-8 h-8" /></div>
                          <h4 className="font-bold text-lg capitalize">Leads</h4>
                          <p className="text-sm text-gray-500 mt-2">Capture emails via resource downloads.</p>
                       </div>

                       {isCompany ? (
                          <div 
                             onClick={() => setNewCampaign({...newCampaign, objective: 'hiring'})}
                             className={`cursor-pointer p-6 rounded-xl border-2 transition-all hover:shadow-md
                                ${newCampaign.objective === 'hiring' ? 'border-brand-600 bg-brand-50 ring-1 ring-brand-600' : 'border-gray-200 hover:border-gray-300'}`}
                          >
                             <div className="mb-4 text-gray-900"><Briefcase className="w-8 h-8" /></div>
                             <h4 className="font-bold text-lg capitalize">Hiring</h4>
                             <p className="text-sm text-gray-500 mt-2">Promote open roles to skilled talent.</p>
                          </div>
                       ) : (
                          <div 
                             onClick={() => setNewCampaign({...newCampaign, objective: 'bookings'})}
                             className={`cursor-pointer p-6 rounded-xl border-2 transition-all hover:shadow-md
                                ${newCampaign.objective === 'bookings' ? 'border-brand-600 bg-brand-50 ring-1 ring-brand-600' : 'border-gray-200 hover:border-gray-300'}`}
                          >
                             <div className="mb-4 text-gray-900"><Calendar className="w-8 h-8" /></div>
                             <h4 className="font-bold text-lg capitalize">Bookings</h4>
                             <p className="text-sm text-gray-500 mt-2">Get paid session bookings.</p>
                          </div>
                       )}
                    </div>
                 </div>
              )}

              {wizardStep === 2 && (
                 <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Step 2: Privacy-Safe Targeting</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-2">Location (Coarse)</label>
                           <div className="relative">
                              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                              <input 
                                 type="text" 
                                 placeholder="e.g. New York, London, Remote" 
                                 className="w-full pl-10 border-gray-300 rounded-lg p-2.5 text-sm" 
                                 onBlur={(e) => {
                                    if(e.target.value) {
                                       setNewCampaign({...newCampaign, targeting: { ...newCampaign.targeting!, locations: [e.target.value] }});
                                    }
                                 }}
                              />
                           </div>
                           <p className="text-xs text-gray-500 mt-1">We target by City/Region only. No precise GPS.</p>
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-2">Language</label>
                           <div className="relative">
                              <Globe className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                              <select 
                                 className="w-full pl-10 border-gray-300 rounded-lg p-2.5 text-sm bg-white"
                                 onChange={(e) => setNewCampaign({...newCampaign, targeting: { ...newCampaign.targeting!, languages: [e.target.value] }})}
                              >
                                 <option value="English">English</option>
                                 <option value="Spanish">Spanish</option>
                                 <option value="Mandarin">Mandarin</option>
                                 <option value="French">French</option>
                              </select>
                           </div>
                        </div>
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Contextual Categories</label>
                       <div className="flex flex-wrap gap-2">
                          {['Finance', 'SaaS', 'AI', 'Leadership', 'Sales', 'Product', 'Engineering'].map(tag => (
                             <button 
                                key={tag}
                                onClick={() => {
                                   const tags = newCampaign.targeting?.tags || [];
                                   const newTags = tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag];
                                   setNewCampaign({...newCampaign, targeting: { ...newCampaign.targeting!, tags: newTags }});
                                }}
                                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors flex items-center gap-1
                                   ${newCampaign.targeting?.tags?.includes(tag) ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                             >
                                <Tag className="w-3 h-3" /> {tag}
                             </button>
                          ))}
                       </div>
                    </div>
                 </div>
              )}

              {wizardStep === 3 && (
                 <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Step 3: Select Placements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                           { id: 'marketplace_listing', label: 'Marketplace Listing', icon: Layout, desc: 'Sponsored tile in search results.' },
                           { id: 'homepage_featured', label: 'Homepage Featured', icon: Target, desc: 'High visibility carousel slot.' },
                           { id: 'newsletter_slot', label: 'Newsletter Sponsor', icon: Megaphone, desc: 'Top placement in daily digest.' },
                           { id: 'resource_library', label: 'Resource Library', icon: FileText, desc: 'Promoted download tile.' }
                        ].map((p) => (
                           <div 
                              key={p.id}
                              onClick={() => {
                                 const current = newCampaign.placements || [];
                                 const updated = current.includes(p.id as any) ? current.filter(x => x !== p.id) : [...current, p.id];
                                 setNewCampaign({...newCampaign, placements: updated as any});
                              }}
                              className={`cursor-pointer p-4 rounded-xl border-2 flex items-start gap-4 transition-all
                                 ${newCampaign.placements?.includes(p.id as any) ? 'border-brand-600 bg-brand-50' : 'border-gray-200 hover:border-gray-300'}`}
                           >
                              <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                                 <p.icon className="w-6 h-6 text-gray-700" />
                              </div>
                              <div>
                                 <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-gray-900">{p.label}</h4>
                                    {newCampaign.placements?.includes(p.id as any) && <CheckCircle2 className="w-4 h-4 text-brand-600" />}
                                 </div>
                                 <p className="text-sm text-gray-500 mt-1">{p.desc}</p>
                              </div>
                           </div>
                        ))}
                    </div>
                 </div>
              )}

              {wizardStep === 4 && (
                 <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Step 4: Design Creative</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Headline (Max 40 chars)</label>
                             <input 
                                type="text" 
                                className="w-full border-gray-300 rounded-lg p-2 text-sm" 
                                placeholder={newCampaign.objective === 'hiring' ? "We're Hiring: Senior PM" : "e.g. Master SaaS Metrics"}
                                value={newCampaign.creative?.headline}
                                onChange={e => setNewCampaign({...newCampaign, creative: { ...newCampaign.creative!, headline: e.target.value }})}
                             />
                          </div>
                          <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Body Text (Max 90 chars)</label>
                             <textarea 
                                className="w-full border-gray-300 rounded-lg p-2 text-sm h-20 resize-none" 
                                placeholder={newCampaign.objective === 'hiring' ? "Join our growth team. Remote friendly." : "Describe your offer..."}
                                value={newCampaign.creative?.body}
                                onChange={e => setNewCampaign({...newCampaign, creative: { ...newCampaign.creative!, body: e.target.value }})}
                             />
                          </div>
                          <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ad Image</label>
                             <div className="flex gap-2">
                                <input 
                                   type="text" 
                                   className="flex-1 border-gray-300 rounded-lg p-2 text-sm" 
                                   placeholder="Image URL or Generate"
                                   value={newCampaign.creative?.imageUrl || ''}
                                   onChange={e => setNewCampaign({...newCampaign, creative: { ...newCampaign.creative!, imageUrl: e.target.value }})}
                                />
                                <button 
                                   onClick={handleGenerateImage}
                                   disabled={generatingImage || !newCampaign.creative?.headline}
                                   className="bg-purple-100 text-purple-700 px-3 py-2 rounded-lg text-xs font-bold hover:bg-purple-200 flex items-center gap-1 disabled:opacity-50"
                                >
                                   {generatingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                   Nano Gen
                                </button>
                             </div>
                             <p className="text-[10px] text-gray-400 mt-1">Powered by Gemini Nano Banana (Flash Image)</p>
                          </div>
                          <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Call to Action</label>
                             <select 
                                className="w-full border-gray-300 rounded-lg p-2 text-sm"
                                value={newCampaign.creative?.ctaText}
                                onChange={e => setNewCampaign({...newCampaign, creative: { ...newCampaign.creative!, ctaText: e.target.value }})}
                             >
                                <option>Learn More</option>
                                <option>Book Now</option>
                                <option>Download</option>
                                <option>Sign Up</option>
                                {isCompany && <option>Apply Now</option>}
                                {isCompany && <option>Register</option>}
                             </select>
                          </div>
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Ad Preview</label>
                          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm max-w-sm">
                             <div className="flex items-start gap-3">
                                <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
                                   {newCampaign.creative?.imageUrl ? (
                                      <img src={newCampaign.creative.imageUrl} className="w-full h-full object-cover" />
                                   ) : (
                                       <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
                                          {newCampaign.objective === 'hiring' ? 'JOBS' : <ImageIcon className="w-6 h-6" />}
                                       </div>
                                   )}
                                </div>
                                <div className="flex-1">
                                   <div className="flex justify-between items-start">
                                      <h4 className="font-bold text-sm text-gray-900 leading-tight">{newCampaign.creative?.headline || 'Your Headline'}</h4>
                                      <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 rounded font-medium">Sponsored</span>
                                   </div>
                                   <p className="text-xs text-gray-600 mt-1 mb-2">{newCampaign.creative?.body || 'Your body text goes here.'}</p>
                                   <button className="text-xs font-bold text-brand-600 hover:underline">{newCampaign.creative?.ctaText || 'Learn More'} &rarr;</button>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              )}

              {/* STEP 5: BUDGET */}
              {wizardStep === 5 && (
                 <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Step 5: Budget & Schedule</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div 
                          onClick={() => setNewCampaign({...newCampaign, budget: { ...newCampaign.budget!, type: 'daily_cap' }})}
                          className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${newCampaign.budget?.type === 'daily_cap' ? 'border-brand-600 bg-brand-50' : 'border-gray-200'}`}
                       >
                          <h4 className="font-bold text-gray-900">Daily Cap (CPC/CPM)</h4>
                          <p className="text-xs text-gray-500">Run continuously. Deduced daily from wallet.</p>
                       </div>
                       <div 
                          onClick={() => setNewCampaign({...newCampaign, budget: { ...newCampaign.budget!, type: 'fixed_slot' }})}
                          className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${newCampaign.budget?.type === 'fixed_slot' ? 'border-brand-600 bg-brand-50' : 'border-gray-200'}`}
                       >
                          <h4 className="font-bold text-gray-900">Fixed Slot (7 Days)</h4>
                          <p className="text-xs text-gray-500">One-time deduction. 1 week visibility.</p>
                       </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                       <div className="flex justify-between items-center mb-4">
                          <label className="font-bold text-gray-900">{newCampaign.budget?.type === 'daily_cap' ? 'Daily Limit' : 'Total Price'}</label>
                          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-1">
                             <span className="text-gray-500 mr-1">$</span>
                             <input 
                                type="number" 
                                className="w-20 text-right outline-none font-bold" 
                                value={newCampaign.budget?.type === 'daily_cap' ? newCampaign.budget?.daily : newCampaign.budget?.total}
                                onChange={e => {
                                   const val = parseInt(e.target.value);
                                   if (newCampaign.budget?.type === 'daily_cap') {
                                      setNewCampaign({...newCampaign, budget: { ...newCampaign.budget!, daily: val, total: val * 30 }});
                                   } else {
                                      setNewCampaign({...newCampaign, budget: { ...newCampaign.budget!, total: val, daily: 0 }});
                                   }
                                }}
                             />
                          </div>
                       </div>
                       <input 
                          type="range" 
                          min="10" 
                          max="500" 
                          step="10"
                          value={newCampaign.budget?.type === 'daily_cap' ? newCampaign.budget?.daily : newCampaign.budget?.total}
                          onChange={e => {
                             const val = parseInt(e.target.value);
                             if (newCampaign.budget?.type === 'daily_cap') {
                                setNewCampaign({...newCampaign, budget: { ...newCampaign.budget!, daily: val, total: val * 30 }});
                             } else {
                                setNewCampaign({...newCampaign, budget: { ...newCampaign.budget!, total: val, daily: 0 }});
                             }
                          }}
                          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-black"
                       />
                    </div>
                 </div>
              )}

              {/* STEP 6: REVIEW & LAUNCH */}
              {wizardStep === 6 && (
                 <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Step 6: Review & Launch</h3>
                    
                    <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 space-y-4">
                       <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                          <span className="text-gray-600">Objective</span>
                          <span className="font-bold capitalize">{newCampaign.objective?.replace('_', ' ')}</span>
                       </div>
                       <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                          <span className="text-gray-600">Placements</span>
                          <span className="font-bold">{newCampaign.placements?.length} Selected</span>
                       </div>
                       <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                          <span className="text-gray-600">Targeting</span>
                          <span className="font-bold">{newCampaign.targeting?.tags.join(', ')} in {newCampaign.targeting?.locations.join(', ')}</span>
                       </div>
                       <div className="flex justify-between items-center text-lg">
                          <span className="font-bold text-gray-900">
                             {newCampaign.budget?.type === 'fixed_slot' ? 'Total Deduction' : 'Daily Spend Cap'}
                          </span>
                          <span className="font-extrabold text-brand-600">${newCampaign.budget?.type === 'fixed_slot' ? newCampaign.budget.total : newCampaign.budget?.daily}</span>
                       </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                       <div>
                          <p className="text-xs text-gray-500 font-bold uppercase">Wallet Balance</p>
                          <p className={`text-xl font-bold ${walletBalance < (newCampaign.budget?.type === 'fixed_slot' ? newCampaign.budget.total : newCampaign.budget?.daily || 0) ? 'text-red-600' : 'text-gray-900'}`}>
                             ${walletBalance.toFixed(2)}
                          </p>
                       </div>
                       {walletBalance < (newCampaign.budget?.type === 'fixed_slot' ? newCampaign.budget.total : newCampaign.budget?.daily || 0) && (
                          <button onClick={() => setShowTopUpModal(true)} className="text-xs bg-red-600 text-white px-3 py-1.5 rounded font-bold hover:bg-red-700">
                             Insufficient Funds - Top Up
                          </button>
                       )}
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                       <AlertCircle className="w-5 h-5 text-yellow-700 flex-shrink-0" />
                       <p className="text-xs text-yellow-800">
                          Your campaign will be active immediately. Funds are deducted from your wallet based on the chosen budget model.
                       </p>
                    </div>
                 </div>
              )}
           </div>

           <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
              {wizardStep > 1 ? (
                 <button onClick={() => setWizardStep(wizardStep - 1)} className="text-gray-600 font-bold text-sm hover:text-black flex items-center gap-1">
                    <ChevronLeft className="w-4 h-4" /> Back
                 </button>
              ) : (<div></div>)}
              
              <button 
                 onClick={wizardStep === 6 ? handleLaunchClick : () => setWizardStep(wizardStep + 1)}
                 className="bg-brand-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-brand-700 flex items-center gap-2"
              >
                 {wizardStep === 6 ? 'Launch Campaign' : 'Continue'}
                 {wizardStep < 6 && <ChevronRight className="w-4 h-4" />}
              </button>
           </div>
        </div>
     </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <div className="flex items-center gap-2 mb-1">
             <h1 className="text-3xl font-bold text-gray-900">Ad Console</h1>
             {isCompany && <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider rounded border border-blue-200">Enterprise</span>}
             {!isCompany && <span className="px-2 py-0.5 bg-brand-100 text-brand-800 text-[10px] font-bold uppercase tracking-wider rounded border border-brand-200">Self Serve</span>}
           </div>
           <p className="text-gray-500">Reach motivated learners with targeted placements.</p>
        </div>
        
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {['overview', 'campaigns', 'billing'].map((tab) => (
            <button
              key={tab}
              onClick={() => setView(tab as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
                view === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
          <button
             onClick={() => setView('create')}
             className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
                view === 'create' ? 'bg-brand-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
             }`}
          >
             + Create
          </button>
        </div>
      </div>

      <div className="animate-fade-in">
         {view === 'overview' && <Overview />}
         {view === 'campaigns' && <CampaignList />}
         {view === 'billing' && <Billing />}
         {view === 'create' && <CreateWizard />}
      </div>

      {/* Top Up Modal */}
      {showTopUpModal && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
               <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900">Add Funds to Wallet</h3>
                  <button onClick={() => setShowTopUpModal(false)} className="text-gray-400 hover:text-black"><X className="w-5 h-5" /></button>
               </div>
               
               <div className="p-6 space-y-6">
                  <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">Select Amount</label>
                     <div className="grid grid-cols-3 gap-2">
                        {[50, 100, 500].map(amt => (
                           <button 
                              key={amt}
                              onClick={() => setTopUpAmount(amt)}
                              className={`py-2 rounded-lg text-sm font-bold border transition-colors ${topUpAmount === amt ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'}`}
                           >
                              ${amt}
                           </button>
                        ))}
                     </div>
                     <div className="relative mt-2">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                           type="number" 
                           value={topUpAmount}
                           onChange={e => setTopUpAmount(parseInt(e.target.value))}
                           className="w-full pl-6 border-gray-300 rounded-lg p-2 text-sm focus:ring-brand-600 focus:border-brand-600"
                        />
                     </div>
                  </div>

                  <div className="space-y-3">
                     <button 
                        onClick={() => processTopUp('card')}
                        disabled={paymentProcessing}
                        className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-black hover:bg-gray-50 transition-all group"
                     >
                        <div className="flex items-center gap-3">
                           <CreditCard className="w-6 h-6 text-gray-600 group-hover:text-black" />
                           <span className="font-bold text-gray-700 group-hover:text-black">Pay with Card</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                     </button>
                     <button 
                        onClick={() => processTopUp('paypal')}
                        disabled={paymentProcessing}
                        className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all group"
                     >
                        <div className="flex items-center gap-3">
                           <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">P</div>
                           <span className="font-bold text-gray-700 group-hover:text-blue-800">PayPal</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                     </button>
                  </div>

                  {paymentProcessing && (
                     <div className="flex items-center justify-center text-sm text-gray-500 gap-2 mt-4 animate-pulse">
                        <Activity className="w-4 h-4 animate-spin" /> Processing Transaction...
                     </div>
                  )}
               </div>
               
               <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
                  <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                     <Lock className="w-3 h-3" /> Secure Payment via Stripe
                  </p>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default AdManager;
