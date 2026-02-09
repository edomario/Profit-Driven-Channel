
import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  MapPin, 
  User as UserIcon, 
  Briefcase, 
  CreditCard, 
  Upload, 
  Plus, 
  Trash2, 
  FileText,
  Camera,
  Globe,
  Tag,
  ArrowLeft,
  DollarSign,
  Info,
  Lock,
  Star,
  Activity,
  Zap,
  Layout,
  MousePointer
} from 'lucide-react';
import { User } from '../types';
import { EXPERTISE_TAXONOMY, INDUSTRY_TAGS } from '../data/marketplaceTaxonomy';

interface ConsultantOnboardingProps {
  onComplete: () => void;
  user: User;
}

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

const ConsultantOnboarding: React.FC<ConsultantOnboardingProps> = ({ onComplete, user }) => {
  const [step, setStep] = useState<Step>(0);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1: Account (Pre-filled from auth mostly)
    phone: '',
    
    // Step 2: Basics
    title: '',
    bio: '',
    
    // Step 3: Specialties
    primaryCategories: [] as string[],
    selectedTags: [] as string[],
    selectedIndustries: [] as string[],
    
    // Step 4: Geo
    location: '',
    serviceScope: 'country' as 'city' | 'country' | 'global',
    remoteAvailable: true,
    jurisdictions: [] as string[],
    
    // Step 5: Offer
    engagementTypes: [] as string[],
    priceBand: 'Standard' as 'Budget' | 'Standard' | 'Premium',
    availability: 'This week' as 'Available now' | 'This week' | 'Next week',
    
    // Step 6: Verification
    subscriptionPlan: 'verified' as 'free' | 'verified',
  });

  const handleNext = () => setStep(prev => (prev < 7 ? prev + 1 : prev) as any);
  const handleBack = () => setStep(prev => (prev > 0 ? prev - 1 : prev) as any);

  // -- Helpers --
  const toggleTag = (id: string) => {
     const current = formData.selectedTags;
     const updated = current.includes(id) ? current.filter(x => x !== id) : [...current, id];
     setFormData({ ...formData, selectedTags: updated });
  };

  const toggleCategory = (cat: string) => {
     const current = formData.primaryCategories;
     if (current.includes(cat)) {
        setFormData({ ...formData, primaryCategories: current.filter(x => x !== cat) });
     } else if (current.length < 2) {
        setFormData({ ...formData, primaryCategories: [...current, cat] });
     }
  };

  const toggleIndustry = (name: string) => {
     const current = formData.selectedIndustries;
     if (current.includes(name)) {
        setFormData({ ...formData, selectedIndustries: current.filter(x => x !== name) });
     } else if (current.length < 5) {
        setFormData({ ...formData, selectedIndustries: [...current, name] });
     }
  };

  const toggleEngagement = (type: string) => {
     const current = formData.engagementTypes;
     const updated = current.includes(type) ? current.filter(x => x !== type) : [...current, type];
     setFormData({ ...formData, engagementTypes: updated });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateProcessing = (cb: () => void) => {
     setIsProcessing(true);
     setTimeout(() => {
        setIsProcessing(false);
        cb();
     }, 1500);
  };

  // -- Step Components --

  const StepWelcome = () => (
     <div className="text-center animate-fade-in py-10">
        <div className="w-20 h-20 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
           <Zap className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Welcome. Let’s build a profile that attracts serious clients.</h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-10 text-lg">
           This takes 6–8 minutes. Profiles with proof + clear specialties get <span className="font-bold text-black">3–5× more unlocks</span>.
        </p>
        
        <div className="max-w-md mx-auto space-y-4 mb-10 text-left">
           {[
              'Add your photo + bio',
              'Choose your specialties (min 3)',
              'Set your service radius',
              'Activate Verified to access the Red Phone Lead Board'
           ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                 <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-sm text-gray-400 shadow-sm">
                    {i+1}
                 </div>
                 <span className="font-medium text-gray-700">{item}</span>
              </div>
           ))}
        </div>

        <div className="flex flex-col gap-3 max-w-xs mx-auto">
           <button onClick={handleNext} className="w-full bg-black text-white py-3.5 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg hover:-translate-y-0.5">Start</button>
           <button className="text-sm text-gray-500 font-medium hover:text-black">Save and continue later</button>
        </div>
     </div>
  );

  const StepAccount = () => (
     <div className="space-y-6 animate-fade-in max-w-md mx-auto">
        <div className="text-center mb-8">
           <h2 className="text-2xl font-bold text-gray-900">Create your consultant account</h2>
           <p className="text-gray-500 mt-2">We use phone verification to reduce spam and protect client privacy.</p>
        </div>
        
        <div className="space-y-4">
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
              <input type="text" value={user.name} disabled className="w-full border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-500" />
           </div>
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
              <input type="email" value={user.email} disabled className="w-full border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-500" />
           </div>
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Mobile Phone (WhatsApp enabled)</label>
              <input 
                 type="tel" 
                 placeholder="+1 555 000 0000" 
                 className="w-full border-gray-300 rounded-lg p-3 focus:ring-black focus:border-black"
                 value={formData.phone}
                 onChange={e => setFormData({...formData, phone: e.target.value})}
              />
           </div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg flex items-start gap-3 border border-blue-100">
           <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
           <p className="text-xs text-blue-800">Your phone is only revealed to clients after you confirm a booking or they unlock your profile.</p>
        </div>
     </div>
  );

  const StepBasics = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="relative w-24 h-24 mx-auto mb-4 group cursor-pointer">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100">
            <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <label htmlFor="avatar-upload" className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
             <Camera className="w-8 h-8" />
             <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Your profile headline</h2>
        <p className="text-gray-500 mt-1">Make it obvious what you do.</p>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
           <p className="text-xs font-bold text-gray-500 uppercase mb-2">Headline Examples:</p>
           <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
              <li>Commercial Lawyer | Contracts + Debt Recovery</li>
              <li>Growth Marketer | Ads + Funnels + Conversion</li>
              <li>Fractional CFO | Cash Flow + Pricing + Controls</li>
           </ul>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Headline (Max 70 chars)</label>
          <input 
            type="text" 
            className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-black focus:border-black"
            placeholder="e.g. Commercial Lawyer for Retail SMEs"
            maxLength={70}
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Bio (Min 150 chars)</label>
          <textarea 
            className="w-full border-gray-300 rounded-lg shadow-sm p-3 h-32 focus:ring-black focus:border-black"
            placeholder="Who do you help? What problem do you solve? What outcomes have you delivered? Add proof (years, clients, metrics)."
            value={formData.bio}
            onChange={e => setFormData({...formData, bio: e.target.value})}
          />
          <div className="flex justify-between mt-2">
             <p className={`text-xs ${formData.bio.length < 150 ? 'text-red-500' : 'text-green-600'}`}>
                {formData.bio.length} / 150 min
             </p>
             <p className="text-xs text-gray-400 italic">Strong bio = niche + outcomes + proof.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const StepSpecialties = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Choose what you’re best at</h2>
          <p className="text-gray-500">Pick 1–2 primary categories, then at least 3 specialties. This is how we match you to leads.</p>
       </div>

       <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Primary Categories */}
          <div>
             <label className="block text-sm font-bold text-gray-700 mb-3">Primary Categories (Max 2)</label>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.keys(EXPERTISE_TAXONOMY).map(cat => (
                   <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`p-3 rounded-lg text-sm font-medium border text-left transition-all ${
                         formData.primaryCategories.includes(cat) 
                            ? 'bg-black text-white border-black' 
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                      }`}
                   >
                      {cat}
                   </button>
                ))}
             </div>
          </div>

          {/* Specialties */}
          <div>
             <label className="block text-sm font-bold text-gray-700 mb-3">
                Expertise Tags (Min 3) <span className="text-red-500">*</span>
             </label>
             <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-64 overflow-y-auto">
                {formData.primaryCategories.length === 0 && <p className="text-sm text-gray-400 text-center py-10">Select a category above to see tags.</p>}
                
                {formData.primaryCategories.map(cat => (
                   <div key={cat} className="mb-4">
                      <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 sticky top-0 bg-gray-50 py-1">{cat}</h4>
                      <div className="flex flex-wrap gap-2">
                         {EXPERTISE_TAXONOMY[cat]?.map(tag => (
                            <button
                               key={tag.id}
                               onClick={() => toggleTag(tag.id)}
                               className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                                  formData.selectedTags.includes(tag.id) 
                                     ? 'bg-brand-600 text-white border-brand-600' 
                                     : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                               }`}
                            >
                               {tag.label}
                            </button>
                         ))}
                      </div>
                   </div>
                ))}
             </div>
             <p className={`text-xs mt-2 ${formData.selectedTags.length < 3 ? 'text-red-500' : 'text-green-600'}`}>
                Selected: {formData.selectedTags.length}. {formData.selectedTags.length < 3 ? '(Minimum 3 required)' : '(Good to go)'}
             </p>
          </div>

          {/* Industries */}
          <div>
             <label className="block text-sm font-bold text-gray-700 mb-3">Best Industries (Optional)</label>
             <div className="flex flex-wrap gap-2">
                {INDUSTRY_TAGS.map(ind => (
                   <button
                      key={ind}
                      onClick={() => toggleIndustry(ind)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                         formData.selectedIndustries.includes(ind) 
                            ? 'bg-gray-800 text-white border-gray-800' 
                            : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                      }`}
                   >
                      {ind}
                   </button>
                ))}
             </div>
          </div>
       </div>
    </div>
  );

  const StepGeo = () => (
     <div className="space-y-6 animate-fade-in max-w-xl mx-auto">
        <div className="text-center mb-6">
           <h2 className="text-2xl font-bold text-gray-900">Where do you serve clients?</h2>
           <p className="text-gray-500">Geo settings help us send you the right leads and prevent irrelevant matches.</p>
        </div>

        <div className="space-y-6">
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Service Radius</label>
              <div className="grid grid-cols-3 gap-3">
                 {['city', 'country', 'global'].map(scope => (
                    <button 
                       key={scope}
                       onClick={() => setFormData({...formData, serviceScope: scope as any})}
                       className={`py-3 rounded-lg text-sm font-bold border capitalize transition-all ${
                          formData.serviceScope === scope 
                             ? 'bg-black text-white border-black' 
                             : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                       }`}
                    >
                       {scope}
                    </button>
                 ))}
              </div>
           </div>

           <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Base Location</label>
              <div className="relative">
                 <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                 <input 
                   type="text" 
                   className="w-full pl-10 border-gray-300 rounded-lg p-3"
                   placeholder="City, Country"
                   value={formData.location}
                   onChange={e => setFormData({...formData, location: e.target.value})}
                />
              </div>
           </div>

           <div className="flex items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
              <input 
                 type="checkbox" 
                 className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                 checked={formData.remoteAvailable}
                 onChange={e => setFormData({...formData, remoteAvailable: e.target.checked})}
              />
              <span className="ml-3 font-medium text-gray-900">I am available for remote engagements</span>
           </div>

           {(formData.primaryCategories.includes('Legal & Compliance') || formData.primaryCategories.includes('Finance & Accounting')) && (
              <div className="animate-in fade-in slide-in-from-top-2">
                 <label className="block text-sm font-bold text-gray-700 mb-1">Jurisdictions you serve</label>
                 <p className="text-xs text-gray-500 mb-2">Legal and tax work is jurisdiction-specific. Select where you can legally advise.</p>
                 <input 
                   type="text" 
                   className="w-full border-gray-300 rounded-lg p-3"
                   placeholder="e.g. Uganda, Kenya, UK (Comma separated)"
                   value={formData.jurisdictions.join(', ')}
                   onChange={e => setFormData({...formData, jurisdictions: e.target.value.split(',').map(s => s.trim())})}
                />
              </div>
           )}
        </div>
     </div>
  );

  const StepOffer = () => (
     <div className="space-y-6 animate-fade-in max-w-xl mx-auto">
        <div className="text-center mb-6">
           <h2 className="text-2xl font-bold text-gray-900">How do you want to work?</h2>
           <p className="text-gray-500">This helps clients choose you faster—and increases lead unlocks.</p>
        </div>

        <div className="space-y-6">
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Engagement Types</label>
              <div className="grid grid-cols-1 gap-2">
                 {['One-off consultation', 'Audit / review', 'Implementation sprint', 'Retainer / monthly support'].map(type => (
                    <button 
                       key={type}
                       onClick={() => toggleEngagement(type)}
                       className={`flex items-center justify-between p-3 rounded-lg border text-sm font-medium text-left transition-all ${
                          formData.engagementTypes.includes(type) 
                             ? 'bg-blue-50 border-blue-500 text-blue-900' 
                             : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                       }`}
                    >
                       {type}
                       {formData.engagementTypes.includes(type) && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                    </button>
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Price Band</label>
                 <select 
                    className="w-full border-gray-300 rounded-lg p-2.5 bg-white"
                    value={formData.priceBand}
                    onChange={e => setFormData({...formData, priceBand: e.target.value as any})}
                 >
                    <option>Budget</option>
                    <option>Standard</option>
                    <option>Premium</option>
                 </select>
              </div>
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Availability</label>
                 <select 
                    className="w-full border-gray-300 rounded-lg p-2.5 bg-white"
                    value={formData.availability}
                    onChange={e => setFormData({...formData, availability: e.target.value as any})}
                 >
                    <option>Available now</option>
                    <option>This week</option>
                    <option>Next week</option>
                 </select>
              </div>
           </div>

           <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600 text-center">
              You can always discuss final pricing after understanding the case.
           </div>
        </div>
     </div>
  );

  const StepVerification = () => (
     <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
        <div className="text-center mb-8">
           <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4">
              Recommended
           </div>
           <h2 className="text-2xl font-bold text-gray-900">Activate Verified Access</h2>
           <p className="text-gray-500 max-w-lg mx-auto mt-2">
              Verified consultants get priority placement and can unlock anonymous leads from the Red Phone Lead Board.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
           {/* Free Plan */}
           <div className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 transition-colors">
              <h3 className="font-bold text-lg text-gray-900">Basic Profile</h3>
              <p className="text-2xl font-bold mt-2">$0 <span className="text-sm font-medium text-gray-500">/ mo</span></p>
              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-400" /> Listed in marketplace</li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-400" /> Standard ranking</li>
                 <li className="flex items-center gap-2 opacity-50"><Lock className="w-4 h-4" /> Cannot unlock Red Phone leads</li>
                 <li className="flex items-center gap-2 opacity-50"><Lock className="w-4 h-4" /> No verified badge</li>
              </ul>
              <button 
                 onClick={() => setFormData({...formData, subscriptionPlan: 'free'})}
                 className={`w-full mt-8 py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                    formData.subscriptionPlan === 'free' ? 'border-black bg-gray-100 text-black' : 'border-gray-200 text-gray-500 hover:border-gray-400'
                 }`}
              >
                 {formData.subscriptionPlan === 'free' ? 'Selected' : 'Select Basic'}
              </button>
           </div>

           {/* Verified Plan */}
           <div className="p-6 rounded-2xl border-2 border-brand-600 bg-brand-50 relative shadow-xl transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase">
                 Best Value
              </div>
              <h3 className="font-bold text-lg text-brand-900 flex items-center gap-2">
                 <ShieldCheck className="w-5 h-5" /> Verified
              </h3>
              <p className="text-2xl font-bold mt-2 text-brand-900">$29 <span className="text-sm font-medium text-brand-700">/ mo</span></p>
              <ul className="mt-6 space-y-3 text-sm text-brand-800">
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-600" /> <strong>Red Phone Lead Board</strong> access</li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-600" /> Unlock client contacts + reports</li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-600" /> Priority marketplace ranking</li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-600" /> Verified Trust Badge</li>
              </ul>
              <button 
                 onClick={() => setFormData({...formData, subscriptionPlan: 'verified'})}
                 className={`w-full mt-8 py-3 rounded-xl font-bold text-sm transition-all shadow-md ${
                    formData.subscriptionPlan === 'verified' ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-brand-900 hover:bg-brand-100'
                 }`}
              >
                 {formData.subscriptionPlan === 'verified' ? 'Selected' : 'Start Verified'}
              </button>
              <p className="text-xs text-center text-brand-700 mt-3">7-day money back guarantee. Cancel anytime.</p>
           </div>
        </div>
     </div>
  );

  const StepPayment = () => (
     <div className="space-y-6 animate-fade-in max-w-md mx-auto text-center">
        {formData.subscriptionPlan === 'verified' ? (
           <>
              <h2 className="text-2xl font-bold text-gray-900">Secure Payment</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
                 <div className="flex justify-between items-center mb-4">
                    <span className="font-medium text-gray-700">Verified Plan</span>
                    <span className="font-bold text-gray-900">$29.00 / mo</span>
                 </div>
                 <div className="h-px bg-gray-200 mb-4"></div>
                 <div className="flex items-center gap-3 bg-white border border-gray-300 p-3 rounded-lg">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <input type="text" placeholder="Card Number" className="flex-1 bg-transparent text-sm outline-none" />
                 </div>
                 <div className="flex gap-3 mt-3">
                    <input type="text" placeholder="MM/YY" className="w-1/2 bg-white border border-gray-300 p-3 rounded-lg text-sm outline-none" />
                    <input type="text" placeholder="CVC" className="w-1/2 bg-white border border-gray-300 p-3 rounded-lg text-sm outline-none" />
                 </div>
              </div>
              <button 
                 onClick={() => simulateProcessing(onComplete)}
                 disabled={isProcessing}
                 className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                 {isProcessing ? 'Processing...' : 'Confirm & Start'}
              </button>
           </>
        ) : (
           <div className="py-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Ready</h2>
              <p className="text-gray-500 mb-8">You are creating a Basic profile. You won't be able to unlock leads from the Red Phone board until you upgrade.</p>
              <button 
                 onClick={onComplete}
                 className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg"
              >
                 Submit Profile
              </button>
           </div>
        )}
     </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress Header */}
      {step > 0 && (
         <div className="border-b border-gray-100 bg-white sticky top-0 z-20 px-6 py-4">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
               <button onClick={handleBack} className="text-gray-400 hover:text-black transition-colors">
                  <ArrowLeft className="w-5 h-5" />
               </button>
               <div className="flex gap-2">
                  {[1,2,3,4,5,6,7].map(s => (
                     <div key={s} className={`h-1.5 w-8 rounded-full transition-colors ${s <= step ? 'bg-black' : 'bg-gray-200'}`}></div>
                  ))}
               </div>
               <div className="w-5"></div>
            </div>
         </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
         <div className="w-full max-w-4xl">
            {step === 0 && <StepWelcome />}
            {step === 1 && <StepAccount />}
            {step === 2 && <StepBasics />}
            {step === 3 && <StepSpecialties />}
            {step === 4 && <StepGeo />}
            {step === 5 && <StepOffer />}
            {step === 6 && <StepVerification />}
            {step === 7 && <StepPayment />}
         </div>
      </div>

      {/* Footer Nav (Only for wizard steps 1-6) */}
      {step > 0 && step < 7 && (
         <div className="border-t border-gray-100 p-4 bg-white sticky bottom-0 z-20">
            <div className="max-w-4xl mx-auto flex justify-end">
               <button
                  onClick={handleNext}
                  disabled={
                     (step === 2 && (!formData.title || formData.bio.length < 150)) ||
                     (step === 3 && formData.selectedTags.length < 3) ||
                     (step === 4 && !formData.location)
                  }
                  className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
               >
                  Next <ChevronRight className="w-4 h-4" />
               </button>
            </div>
         </div>
      )}
    </div>
  );
};

export default ConsultantOnboarding;
