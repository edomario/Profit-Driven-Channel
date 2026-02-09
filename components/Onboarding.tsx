
import React from 'react';
import { Check, Shield, Globe } from 'lucide-react';
import { CheckoutItem } from '../types';
import { useLocalization } from '../contexts/LocalizationContext';

interface OnboardingProps {
   onCheckout?: (item: CheckoutItem) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onCheckout }) => {
  const { price, locale, t } = useLocalization();

  const tiers = [
    {
      id: 'free',
      name: 'Free',
      basePriceUSD: 0,
      description: 'Access to open marketplace and basic community pods.',
      features: ['Marketplace Access', 'Community Rooms', 'Basic Profile', 'Pay-per-course'],
      cta: 'Current Plan',
      current: true,
    },
    {
      id: 'pro',
      name: 'Pro',
      basePriceUSD: 49,
      description: 'Unlock the Second Brain, Action Lab, and certified proofs.',
      features: ['Everything in Free', 'Second Brain AI', 'Unlimited Action Plans', 'Verified Certificates', 'Priority Support'],
      cta: 'Upgrade to Pro',
      featured: true,
    },
    {
      id: 'elite',
      name: 'Elite',
      basePriceUSD: 199,
      description: 'Direct access to mentors, offline events, and private deal flow.',
      features: ['Everything in Pro', '1-on-1 Mentorship', 'Offline Event Access', 'Private Deal Flow', 'Concierge Booking'],
      cta: 'Apply for Elite',
    },
  ];

  const handlePlanSelect = (tier: any) => {
     if (tier.current) return;
     if (onCheckout) {
        onCheckout({
           id: tier.id,
           title: `${tier.name} Membership`,
           description: tier.description,
           price: tier.basePriceUSD, // Actual price handling should be robust in checkout
           type: 'subscription',
           recurringInterval: 'month'
        });
     }
  };

  const handleEnterpriseClick = () => {
     if (onCheckout) {
        onCheckout({
           id: 'enterprise_license',
           title: 'Enterprise License',
           description: 'Global access for teams, unified billing, and custom sprint creation.',
           price: 0, // Custom
           type: 'enterprise'
        });
     }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-base font-semibold text-brand-600 tracking-wide uppercase">Membership Tiers</h2>
        <h1 className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">Choose your execution velocity.</h1>
        <p className="mt-4 text-xl text-gray-500">
          Stop paying for content. Start paying for outcomes. Upgrade to unlock AI-driven execution tools.
        </p>
        
        {locale.pricingTier > 1 && (
           <div className="mt-6 inline-flex items-center gap-2 bg-green-50 text-green-800 px-4 py-2 rounded-full text-sm font-bold border border-green-200 animate-in fade-in slide-in-from-top-4">
              <Globe className="w-4 h-4" />
              {t('pricing.ppp_notice')}
           </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
        {tiers.map((tier) => (
          <div 
            key={tier.name}
            className={`relative flex flex-col rounded-2xl border ${tier.featured ? 'border-brand-500 shadow-xl scale-105 z-10' : 'border-gray-200 shadow-sm'} bg-white p-8`}
          >
            {tier.featured && (
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                <span className="inline-flex rounded-full bg-brand-500 px-4 py-1 text-sm font-semibold text-white shadow-sm">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
              <p className="mt-2 text-sm text-gray-500">{tier.description}</p>
            </div>
            
            <div className="mb-6 flex flex-col items-baseline">
              <div className="flex items-baseline">
                 <span className="text-4xl font-extrabold text-gray-900">
                    {price(tier.basePriceUSD)}
                 </span>
                 <span className="text-gray-500 font-medium ml-1">/month</span>
              </div>
              {/* Show original price strikethrough if discounted */}
              {locale.pricingTier > 1 && tier.basePriceUSD > 0 && (
                 <span className="text-sm text-gray-400 line-through mt-1">
                    US Price: ${tier.basePriceUSD}/mo
                 </span>
              )}
            </div>

            <ul className="mb-8 space-y-4 flex-1">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-brand-500" />
                  </div>
                  <p className="ml-3 text-sm text-gray-700">{feature}</p>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePlanSelect(tier)}
              className={`w-full rounded-lg px-4 py-3 text-center text-sm font-semibold transition-all ${
                tier.featured || tier.name === 'Elite'
                  ? 'bg-black text-white hover:bg-gray-800 shadow-md' 
                  : 'bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200'
              } ${tier.current ? 'opacity-50 cursor-default' : ''}`}
            >
              {tier.cta}
            </button>
            
            {tier.name === 'Elite' && (
               <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-500">
                  <Shield className="w-3 h-3 text-gray-400" />
                  <span>KYC Verification Required</span>
               </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-16 bg-gray-50 rounded-xl p-8 border border-gray-200 flex flex-col md:flex-row items-center justify-between">
         <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-gray-900">Enterprise Licensing</h3>
            <p className="text-sm text-gray-500 max-w-xl mt-1">
               Looking to deploy ExecuStay for your entire team? Get seat-based pricing, unified billing, and custom sprint development.
            </p>
         </div>
         <button 
            onClick={handleEnterpriseClick}
            className="whitespace-nowrap px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition-colors"
         >
            Contact Sales
         </button>
      </div>
    </div>
  );
};

export default Onboarding;
