
import React, { useState } from 'react';
import { CheckCircle2, Zap, ArrowRight, ShieldCheck, Globe, Star } from 'lucide-react';

interface PartnerPricingProps {
  mode: 'seo' | 'funnel'; // Public SEO page vs Internal Funnel
  onSignup?: () => void;
  onSelectPack?: (packId: string) => void;
}

const PartnerPricing: React.FC<PartnerPricingProps> = ({ mode, onSignup, onSelectPack }) => {
  const [estimateClients, setEstimateClients] = useState(25);

  const packs = [
    {
      id: 'starter',
      name: 'Starter',
      credits: 100,
      clientsCovered: '10-25',
      bestFor: 'Solo Consultants',
      price: mode === 'seo' ? '$—' : '$190',
      perCredit: mode === 'seo' ? '' : '$1.90',
      features: ['Quick Scan & Deep Audit', 'Partner Dashboard', 'Basic Alerts']
    },
    {
      id: 'growth',
      name: 'Growth',
      credits: 300,
      clientsCovered: '25-75',
      bestFor: 'Small Firms',
      price: mode === 'seo' ? '$—' : '$450',
      perCredit: mode === 'seo' ? '' : '$1.50',
      highlight: true,
      features: ['Everything in Starter', 'Wholesale Discount (20%)', 'Priority Support', 'White-label Reports']
    },
    {
      id: 'scale',
      name: 'Scale',
      credits: 800,
      clientsCovered: '75-200',
      bestFor: 'Agencies',
      price: mode === 'seo' ? '$—' : '$960',
      perCredit: mode === 'seo' ? '' : '$1.20',
      features: ['Everything in Growth', 'Wholesale Discount (40%)', 'API Access', 'Dedicated Success Mgr']
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* Hero */}
      <div className="bg-slate-900 text-white pt-20 pb-24 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
               {mode === 'seo' ? 'Partner Pricing' : 'Wholesale Credit Packs'}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
               {mode === 'seo' 
                  ? "Run diagnostics across 50+ clients, track risk, and get action plans you can sell. You only pay when you send a link."
                  : "Unlock exclusive partner rates. Buy credits in bulk to increase your margin."}
            </p>
            
            {mode === 'seo' && (
               <button onClick={onSignup} className="bg-brand-500 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-brand-600 transition-all shadow-lg flex items-center gap-2 mx-auto">
                  Create Partner Account <ArrowRight className="w-5 h-5" />
               </button>
            )}
         </div>
      </div>

      {/* Funnel Bonus Banner */}
      {mode === 'funnel' && (
         <div className="bg-green-50 border-b border-green-100 py-4">
            <div className="max-w-7xl mx-auto px-4 flex justify-center items-center gap-2 text-green-800 font-bold text-sm">
               <Zap className="w-4 h-4" />
               First-Pack Bonus Active: Get 10% extra credits on your first purchase.
            </div>
         </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
         
         {/* Usage Estimator */}
         <div className="max-w-2xl mx-auto mb-16 text-center">
            <h3 className="font-bold text-gray-900 mb-4">Estimate your monthly usage</h3>
            <div className="flex items-center gap-4">
               <span className="text-sm font-bold text-gray-500">10 Clients</span>
               <input 
                  type="range" min="10" max="200" step="10" 
                  value={estimateClients} 
                  onChange={(e) => setEstimateClients(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
               />
               <span className="text-sm font-bold text-gray-500">200+ Clients</span>
            </div>
            <p className="mt-4 text-brand-600 font-bold">
               {estimateClients} Clients ≈ {Math.ceil(estimateClients * 1.5)} Credits / Month
            </p>
            <p className="text-xs text-gray-400 mt-1">(Assumes mix of Quick Scans and Deep Audits)</p>
         </div>

         {/* Pack Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packs.map(pack => (
               <div key={pack.id} className={`bg-white rounded-2xl p-8 border-2 flex flex-col relative transition-all hover:shadow-xl ${pack.highlight ? 'border-black shadow-lg scale-105' : 'border-gray-100 shadow-sm'}`}>
                  {pack.highlight && (
                     <div className="absolute top-0 left-0 right-0 bg-black text-white text-xs font-bold py-1 text-center uppercase tracking-widest rounded-t-lg">
                        Best Value
                     </div>
                  )}
                  
                  <div className="mb-6 mt-2">
                     <h3 className="text-xl font-bold text-gray-900">{pack.name}</h3>
                     <p className="text-sm text-gray-500">{pack.bestFor}</p>
                  </div>

                  <div className="mb-6">
                     <div className="text-4xl font-extrabold text-gray-900">{pack.price}</div>
                     {mode === 'funnel' && <div className="text-sm font-medium text-green-600">{pack.perCredit} / credit</div>}
                     <div className="text-sm text-gray-500 mt-2 font-bold">{pack.credits} Credits</div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-1">
                     {pack.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                           <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                           {feat}
                        </li>
                     ))}
                  </ul>

                  <button 
                     onClick={() => onSelectPack && onSelectPack(pack.id)}
                     className={`w-full py-3.5 rounded-xl font-bold transition-colors ${pack.highlight ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                  >
                     {mode === 'seo' ? 'View Pricing' : 'Buy Pack'}
                  </button>
               </div>
            ))}
         </div>

         {/* SEO: Enterprise vs Standard */}
         {mode === 'seo' && (
            <div className="mt-20 max-w-4xl mx-auto bg-gray-50 rounded-2xl p-8 border border-gray-200 flex flex-col md:flex-row items-center gap-8">
               <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise Partners</h3>
                  <p className="text-gray-600 mb-4">
                     For incubators, large firms, and associations managing 200+ clients.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                     <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-black" /> White-label domain</li>
                     <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-black" /> Custom cohorts & benchmarks</li>
                     <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-black" /> API Integration</li>
                  </ul>
               </div>
               <button className="bg-white border-2 border-black text-black px-8 py-3 rounded-xl font-bold hover:bg-black hover:text-white transition-colors">
                  Contact Sales
               </button>
            </div>
         )}

         {/* SEO FAQ */}
         {mode === 'seo' && (
            <div className="mt-20 max-w-3xl mx-auto">
               <h2 className="text-2xl font-bold text-center mb-8">Partner FAQ</h2>
               <div className="space-y-4">
                  {[
                     { q: "Do credits expire?", a: "No. Your credits never expire." },
                     { q: "Can I brand the reports?", a: "Yes. All partner reports include your logo and firm details in the header." },
                     { q: "How much does a scan cost?", a: "A Quick Scan costs 1 credit. A Deep Audit costs 5 credits." }
                  ].map((faq, i) => (
                     <div key={i} className="border border-gray-200 rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-2">{faq.q}</h4>
                        <p className="text-gray-600 text-sm">{faq.a}</p>
                     </div>
                  ))}
               </div>
            </div>
         )}

         {/* Funnel Footer */}
         {mode === 'funnel' && (
            <div className="mt-12 text-center text-xs text-gray-400">
               <p>Secure payment via Stripe. 14-day refund policy on unused credits.</p>
            </div>
         )}

      </div>
    </div>
  );
};

export default PartnerPricing;
