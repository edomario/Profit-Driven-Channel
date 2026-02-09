
import React, { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp, Globe, ShieldCheck, Zap, Building2, Activity, FileText, BarChart3, HelpCircle, ArrowRight } from 'lucide-react';
import { useLocalization } from '../contexts/LocalizationContext';
import { CheckoutItem } from '../types';

interface PricingPageProps {
  onStartScan: () => void;
  onRequestDemo: () => void;
  onCheckout: (item: CheckoutItem) => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onStartScan, onRequestDemo, onCheckout }) => {
  const { locale, price } = useLocalization();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [displayCurrency, setDisplayCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'UGX' | 'KES' | 'NGN'>('USD');

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Dynamic Trust Text based on Region
  const trustText = locale.contentRegion === 'AFRICA_SME' 
    ? "Trusted by SMEs scaling across Africa."
    : "Used by fast-growing teams and agencies.";

  // FAQ Data
  const faqs = [
    { question: "Why is the Quick Scan free?", answer: "We believe every business deserves a baseline diagnosis. The Quick Scan gives you immediate clarity on your 'Profit Archetype' and primary weakness at no cost. You only pay if you want the deep forensic report and action roadmap." },
    { question: "What do I get in the Standard report?", answer: "The Standard plan includes the full 30-page forensic audit, 24-month profit simulator access, the detailed Action Roadmap (PDF + Web), and your verified Industry Leader badge." },
    { question: "How does local pricing work?", answer: "We use Purchasing Power Parity (PPP). If you complete the Quick Scan from an eligible region (like East Africa, India, or LatAm), you will automatically unlock a subsidized rate (up to 50% off) at checkout." },
    { question: "Can I buy just one pillar?", answer: "Currently, we sell the full integrated system because profit leaks are interconnected. Fixing 'Marketing' without fixing 'Finance' usually leads to cashflow breaks." },
    { question: "Is this a subscription?", answer: "The Standard Audit is a one-time purchase. Enterprise plans offers annual licenses for ongoing team access and multi-department tracking." },
    { question: "Can my team take the assessment?", answer: "Yes. The Standard plan covers one owner/admin profile. For multi-user aggregated reporting (to see if your team aligns with you), you need the Enterprise plan." },
  ];

  // Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Business Diagnostic & Profit Leak Scanner",
    "applicationCategory": "BusinessApplication",
    "offers": [
      {
        "@type": "Offer",
        "name": "Standard",
        "price": "97",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "description": "Full deep assessment, 30-page action report, and profit simulator."
      },
      {
        "@type": "Offer",
        "name": "Enterprise",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Custom pricing based on team size, multi-department dashboards, and admin controls."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
      {/* SEO Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* SECTION A: Hero */}
      <div className="bg-slate-900 text-white pt-20 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-900 rounded-full blur-3xl opacity-20 -mr-32 -mt-32 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-800/50 border border-brand-700 rounded-full px-4 py-1.5 mb-8">
             <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
             <span className="text-xs font-bold text-brand-100 tracking-wide uppercase">{trustText}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Pricing built for speed: <br/>
            <span className="text-brand-400">Diagnose the leak, fix the leak.</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Start free. Upgrade only when you want the full forensic audit, simulator, and action roadmap.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStartScan}
              className="w-full sm:w-auto bg-brand-500 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-brand-600 transition-all shadow-lg shadow-brand-900/50 flex items-center justify-center gap-2"
            >
              Start Free Quick Scan <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={onRequestDemo}
              className="w-full sm:w-auto bg-transparent border border-slate-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-all"
            >
              Talk to Sales
            </button>
          </div>
        </div>
      </div>

      {/* SECTION B: Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card 1: Standard */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-brand-600"></div>
            <div className="p-8 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Standard</h3>
                  <p className="text-slate-500 text-sm mt-1">For founders & solo operators</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-slate-900">$97</div>
                  <div className="text-xs text-slate-400 font-medium">USD / one-time</div>
                </div>
              </div>
              
              <div className="prose prose-sm text-slate-600 mb-8">
                <p>Standard is for businesses that want the full diagnostic, a clear profit improvement roadmap, and a report they can actually execute—without hiring a consultant first.</p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  "Full Deep Assessment (7 Pillars)",
                  "30-Page Action Roadmap (PDF)",
                  "Profit Simulator (Advanced)",
                  "Benchmark Badge (Shareable)",
                  "Report History & Trends"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 bg-green-100 p-1 rounded-full"><Check className="w-3 h-3 text-green-600" /></div>
                    <span className="text-sm font-medium text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-8 bg-slate-50 border-t border-slate-100">
              <button 
                onClick={onStartScan}
                className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-black transition-all shadow-sm mb-4"
              >
                Start Free Quick Scan
              </button>
              <p className="text-xs text-center text-slate-500">
                Prefer the best offer? Complete the free scan to unlock <strong>bundle pricing and local rates.</strong>
              </p>
            </div>
          </div>

          {/* Card 2: Enterprise */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col relative opacity-95">
            <div className="p-8 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Enterprise</h3>
                  <p className="text-slate-500 text-sm mt-1">For teams, agencies & incubators</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-slate-900">Custom</div>
                  <div className="text-xs text-slate-400 font-medium">Contact Sales</div>
                </div>
              </div>
              
              <div className="prose prose-sm text-slate-600 mb-8">
                <p>Deploy the diagnostic across multiple departments or portfolio companies. Aggregate data to find systemic weaknesses across your entire organization.</p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  "Everything in Standard",
                  "Multi-User / Dept Dashboard",
                  "Aggregated Heatmaps",
                  "Custom Industry Benchmarks",
                  "Admin Roles & Access Control",
                  "Dedicated Account Manager"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 bg-blue-100 p-1 rounded-full"><Check className="w-3 h-3 text-blue-600" /></div>
                    <span className="text-sm font-medium text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-8 bg-slate-50 border-t border-slate-100 mt-auto">
              <button 
                onClick={onRequestDemo}
                className="w-full bg-white border-2 border-slate-200 text-slate-900 py-3.5 rounded-xl font-bold hover:border-slate-900 hover:bg-slate-50 transition-all mb-4"
              >
                Request Enterprise Demo
              </button>
              <p className="text-xs text-center text-slate-500">
                Volume discounts available for 5+ seats.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION C: Funnel Disclosure */}
      <div className="max-w-3xl mx-auto px-4 mt-16 mb-20">
        <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 flex items-start gap-4">
          <div className="p-2 bg-brand-100 rounded-lg text-brand-700 flex-shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-brand-900 mb-2">Unlock your best price</h4>
            <p className="text-brand-800 text-sm leading-relaxed mb-1">
              Want the best offer? Start with the free Quick Scan. 
              You’ll unlock <strong>bundle pricing, local currency rates, and targeted options</strong> based on your critical pillar. 
              In some regions, the Standard bundle may be available from <span className="font-bold underline">$49</span>.
            </p>
            <p className="text-xs text-brand-600 mt-3 italic">
              * Offers vary by location and assessment type. Final pricing is shown before payment.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION D: Feature Grid */}
      <div className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Everything you need to fix the leak</h2>
            <p className="text-slate-500 mt-2 text-lg">More than just a report. It's an operating system for profit.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Activity, title: "Diagnostic Engine", desc: "Analyzes 7 pillars of your business (Finance, Ops, Marketing, etc) to find the hidden drag." },
              { icon: FileText, title: "Forensic Deep Dive", desc: "100+ data points synthesized into a clear, brutal, and actionable truth about your operation." },
              { icon: BarChart3, title: "Action Roadmap", desc: "A 30-page PDF report with 7-day, 30-day, and 90-day execution plans tailored to your archetype." },
              { icon: Zap, title: "Profit Simulator", desc: "Interactive sliders to see exactly how fixing your 'Fuel' or 'Voice' impacts your bottom line." },
              { icon: ShieldCheck, title: "Benchmark Badge", desc: "See how you stack up against top SMEs in your region. Downloadable for LinkedIn." },
              { icon: Building2, title: "Boardroom AI", desc: "Optional add-on: A 24/7 AI Consultant trained on your specific diagnostic scores." }
            ].map((feat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-900 mb-4">
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION E: Comparison Table */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Compare Plans</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-4 px-6 font-bold text-slate-900 w-1/3">Feature</th>
                <th className="py-4 px-6 font-bold text-slate-900 text-center bg-slate-50">Free Quick Scan</th>
                <th className="py-4 px-6 font-bold text-slate-900 text-center border-x border-slate-200 bg-brand-50/30">Standard ($97)</th>
                <th className="py-4 px-6 font-bold text-slate-900 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { label: "Archetype Detection", free: true, std: true, ent: true },
                { label: "Critical Pillar Alert", free: true, std: true, ent: true },
                { label: "Full Deep Assessment", free: false, std: true, ent: true },
                { label: "30-Page PDF Report", free: false, std: true, ent: true },
                { label: "Profit Simulator", free: "Lite", std: "Advanced", ent: "Advanced" },
                { label: "Benchmark Badge", free: false, std: true, ent: true },
                { label: "Multi-User Dashboard", free: false, std: false, ent: true },
                { label: "Department Analytics", free: false, std: false, ent: true },
                { label: "Admin Controls", free: false, std: false, ent: true },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-medium text-slate-700">{row.label}</td>
                  <td className="py-4 px-6 text-center bg-slate-50">
                    {row.free === true ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : row.free === false ? <X className="w-5 h-5 text-slate-300 mx-auto" /> : <span className="text-xs font-bold text-slate-500">{row.free}</span>}
                  </td>
                  <td className="py-4 px-6 text-center border-x border-slate-200 bg-brand-50/10">
                    {row.std === true ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : row.std === false ? <X className="w-5 h-5 text-slate-300 mx-auto" /> : <span className="text-xs font-bold text-slate-500">{row.std}</span>}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {row.ent === true ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : row.ent === false ? <X className="w-5 h-5 text-slate-300 mx-auto" /> : <span className="text-xs font-bold text-slate-500">{row.ent}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION F: FAQ */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <button 
                onClick={() => toggleFaq(i)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:bg-slate-50 transition-colors"
              >
                {faq.question}
                {openFaq === i ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              {openFaq === i && (
                <div className="p-5 pt-0 text-slate-600 leading-relaxed text-sm animate-in fade-in slide-in-from-top-2">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION G: Final CTA */}
      <div className="bg-slate-900 text-white py-16 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Stop guessing. Find the leak.</h2>
          <p className="text-slate-400 text-lg mb-8">
            Your first diagnostic takes less than 7 minutes. It’s free, private, and brutal.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStartScan}
              className="w-full sm:w-auto bg-brand-500 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-brand-600 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Start Free Quick Scan <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={onRequestDemo}
              className="w-full sm:w-auto bg-transparent border border-slate-700 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-all"
            >
              Request Enterprise Demo
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PricingPage;
