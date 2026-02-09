
import React, { useState } from 'react';
import { 
  MapPin, 
  Star, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Calendar as CalendarIcon, 
  MessageCircle, 
  Video, 
  FileText, 
  Lock, 
  Filter, 
  ChevronRight, 
  Shield, 
  AlertCircle, 
  Award, 
  TrendingUp, 
  Zap, 
  Check, 
  X,
  CreditCard,
  ChevronLeft,
  AlertOctagon,
  Linkedin,
  Twitter,
  Globe,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { CheckoutItem } from '../types';

interface ConsultantProfileProps {
   onBook?: (item: CheckoutItem) => void;
}

const ConsultantProfile: React.FC<ConsultantProfileProps> = ({ onBook }) => {
  const [activeTab, setActiveTab] = useState<'services' | 'resources' | 'reviews' | 'outcomes' | 'safety'>('services');
  const [showConsent, setShowConsent] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  
  // Booking Wizard State
  const [showBooking, setShowBooking] = useState(false);
  const [bookingStep, setBookingStep] = useState<1|2|3>(1);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Request Intro State
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [shareReport, setShareReport] = useState(true);
  const [introSent, setIntroSent] = useState(false);

  // Geo Logic Simulation (Mock User Location vs Consultant)
  const USER_LAT = 30.2672; // Austin
  const USER_LNG = -97.7431;
  const CONSULTANT_LAT = 30.2672; // Also Austin (Close)
  
  const calculateDistance = () => {
     if (Math.abs(USER_LAT - CONSULTANT_LAT) < 0.5) return 5; // Close
     return 5000; // Far
  };
  const distanceKm = calculateDistance();
  const isNear = distanceKm <= 50;

  // Mock Consultant Data
  const consultant = {
    name: "Sarah Jenkins",
    title: "Product Strategy Consultant & Fractional CPO",
    avatar: "https://picsum.photos/400/400?random=50",
    badges: ["ID Verified", "Top Rated", "Vetted Expert"],
    bio: "Former VP of Product at 2 Unicorns. I help Series A/B founders streamline their product roadmap, hire their first PMs, and set up agile workflows that actually scale.",
    location: "San Francisco, CA",
    radius: "50mi radius",
    metrics: {
      lastActive: '12m ago',
      responseTime: '58m',
      cancellationRate: '0%',
      completionRate: '100%',
      disputeRate: '0%',
      jobsCompleted: 42
    }
  };

  const services = [
    { id: 1, title: 'Strategy Audit', type: 'Virtual', price: 250, duration: '60 min', desc: 'Deep dive into your current roadmap and blockers via Google Meet.' },
    { id: 2, title: 'In-Person Workshop', type: 'In-Person', price: 1200, duration: '4 hours', desc: 'Half-day alignment session at a verified venue (WeWork/Capital Factory).', verifiedVenue: 'Capital Factory, 701 Brazos St' },
    { id: 3, title: 'Fractional CPO Retainer', type: 'Hybrid', price: 4000, duration: 'Monthly', desc: 'Ongoing leadership (5hrs/week). Includes Slack access.' },
  ];

  const resources = [
    { id: 1, title: 'Product Launch Checklist', type: 'PDF', downloads: 1240, desc: 'The exact 50-point list I use for Tier 1 launches.' },
    { id: 2, title: 'Hiring Scorecard Template', type: 'Sheet', downloads: 850, desc: 'Evaluate PM candidates objectively.' },
  ];

  const reviews = [
    { id: 1, user: 'Mike T.', role: 'CEO @ TechStart', rating: 5, date: 'Oct 2024', text: 'Incredible strategic insight. Sarah identified a bottleneck we missed for months. Worth every penny.' },
    { id: 2, user: 'Jenny L.', role: 'Founder', rating: 5, date: 'Sep 2024', text: 'The workshop completely realigned our team. Professional, sharp, and actionable.' },
    { id: 3, user: 'David K.', role: 'CTO', rating: 4.8, date: 'Aug 2024', text: 'Great insights, though scheduling took a bit of back and forth initially.' },
  ];

  const outcomes = [
    { metric: '$2M', desc: 'Revenue Impact', verified: true, source: 'Platform Data' },
    { metric: '30%', desc: 'Faster Ship Velocity', verified: true, source: 'Client Report' },
    { metric: '12', desc: 'Teams Scaled', verified: false, source: 'Self Reported' },
  ];

  const handleBook = (service: any) => {
    if (service.type === 'In-Person' && !isNear) {
       alert("This service is only available to clients within 50km of the consultant's location. Please book a virtual session.");
       return;
    }
    setSelectedService(service);
    if (onBook) {
       onBook({
          id: `serv_${service.id}`,
          title: `${service.title} with Sarah`,
          description: service.desc,
          price: service.price,
          type: 'session'
       });
    } else {
       setBookingStep(1);
       setSelectedTime(null);
       setBookingConfirmed(false);
       setShowBooking(true);
    }
  };

  const handleRequestIntro = () => {
     setIntroSent(false);
     setShowIntroModal(true);
  }

  const submitIntro = () => {
     setTimeout(() => {
        setIntroSent(true);
        setTimeout(() => setShowIntroModal(false), 2000);
     }, 1500);
  }

  const handleDownload = () => setShowConsent(true);
  const confirmConsent = () => {
    setShowConsent(false);
    setDownloaded(true);
  };

  const BookingWizard = () => {
     if (bookingConfirmed) {
        return (
           <div className="p-8 text-center animate-scale-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
              <p className="text-sm text-gray-600 mb-6">
                 A calendar invite has been sent to your email.
              </p>
              <button onClick={() => setShowBooking(false)} className="w-full bg-black text-white py-3 rounded-lg font-bold">
                 Done
              </button>
           </div>
        );
     }

     const taxRate = 0.08;
     const taxAmount = selectedService ? selectedService.price * taxRate : 0;
     const totalAmount = selectedService ? selectedService.price + taxAmount : 0;

     return (
        <div className="h-full flex flex-col">
           <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-2">
                 {bookingStep > 1 && (
                    <button onClick={() => setBookingStep(prev => (prev - 1) as any)} className="text-gray-500 hover:text-black">
                       <ChevronLeft className="w-5 h-5" />
                    </button>
                 )}
                 <div>
                    <h3 className="font-bold text-gray-900 text-sm">
                       {bookingStep === 1 ? 'Select Time' : bookingStep === 2 ? 'Review & Safety' : 'Payment'}
                    </h3>
                    <div className="flex gap-1 mt-1">
                       {[1, 2, 3].map(s => (
                          <div key={s} className={`h-1 w-6 rounded-full transition-colors ${s <= bookingStep ? 'bg-black' : 'bg-gray-200'}`}></div>
                       ))}
                    </div>
                 </div>
              </div>
              <button onClick={() => setShowBooking(false)} className="text-gray-400 hover:text-black">
                 <X className="w-5 h-5" />
              </button>
           </div>

           <div className="p-6 flex-1 overflow-y-auto">
              {bookingStep === 1 && (
                 <div className="animate-fade-in">
                    <p className="text-sm text-gray-500 mb-4">Select a slot for <span className="font-bold text-gray-900">{selectedService.title}</span> ({selectedService.duration})</p>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                       {['Mon', 'Tue', 'Wed', 'Thu'].map(d => (
                          <button key={d} className="p-2 border border-gray-200 rounded text-center hover:border-black focus:border-black focus:bg-gray-50 transition-colors">
                             <span className="block text-xs text-gray-500">{d}</span>
                             <span className="block font-bold text-sm">Oct 24</span>
                          </button>
                       ))}
                    </div>
                    <div className="space-y-2">
                       {['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'].map(t => (
                          <button 
                             key={t} 
                             onClick={() => setSelectedTime(t)}
                             className={`w-full flex items-center justify-between p-3 border rounded-lg transition-all ${selectedTime === t ? 'border-brand-600 bg-brand-50 ring-1 ring-brand-600' : 'border-gray-200 hover:border-gray-300'}`}
                          >
                             <span className={`font-medium text-sm ${selectedTime === t ? 'text-brand-900' : 'text-gray-700'}`}>{t}</span>
                             {selectedTime === t && <CheckCircle2 className="w-4 h-4 text-brand-600" />}
                          </button>
                       ))}
                    </div>
                 </div>
              )}

              {bookingStep === 2 && (
                 <div className="animate-fade-in space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                       <h4 className="font-bold text-gray-900 text-sm mb-2">Service Details</h4>
                       <div className="text-xs text-gray-600 space-y-1">
                          <p><span className="font-medium">Service:</span> {selectedService.title}</p>
                          <p><span className="font-medium">Time:</span> {selectedTime}, Oct 24</p>
                          <p><span className="font-medium">Price:</span> ${selectedService.price}</p>
                       </div>
                    </div>
                 </div>
              )}

              {bookingStep === 3 && (
                 <div className="animate-fade-in space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-2">
                       <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-2">
                          <span className="text-base font-bold text-gray-900">Total</span>
                          <span className="text-xl font-bold text-gray-900">${totalAmount.toFixed(2)}</span>
                       </div>
                    </div>
                 </div>
              )}
           </div>

           <div className="p-4 border-t border-gray-100">
              <button 
                 onClick={() => {
                    if (bookingStep < 3) setBookingStep(prev => (prev + 1) as any);
                    else setBookingConfirmed(true);
                 }}
                 disabled={bookingStep === 1 && !selectedTime}
                 className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                 {bookingStep === 3 ? `Pay $${totalAmount.toFixed(2)}` : 'Continue'}
              </button>
           </div>
        </div>
     );
  };

  return (
    <div className="min-h-full bg-gray-50 font-sans text-slate-900 pb-20">
      {/* 1. Trust Header / Hero */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar & Badges */}
            <div className="flex-shrink-0">
               <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-gray-200 overflow-hidden shadow-sm border border-gray-100">
                  <img src={consultant.avatar} alt={consultant.name} className="w-full h-full object-cover" />
               </div>
               <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start max-w-[140px]">
                  {consultant.badges.map((badge, i) => (
                    <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700 border border-gray-200">
                       {badge === 'ID Verified' && <ShieldCheck className="w-3 h-3 mr-1 text-emerald-600" />}
                       {badge === 'Top Rated' && <Star className="w-3 h-3 mr-1 text-amber-500 fill-current" />}
                       {badge}
                    </span>
                  ))}
               </div>
            </div>

            {/* Info & Metrics */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                 <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{consultant.name}</h1>
                    <p className="text-gray-600 font-medium text-lg mt-1">{consultant.title}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                       <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {consultant.location} ({consultant.radius})</span>
                       <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 font-medium">
                          <Clock className="w-3.5 h-3.5" /> Responds in {consultant.metrics.responseTime}
                       </span>
                    </div>
                 </div>
                 <div className="flex gap-3">
                    <button 
                        onClick={handleRequestIntro}
                        className="flex-1 md:flex-none bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
                    >
                       <MessageSquare className="w-4 h-4" /> Request Intro
                    </button>
                    <button 
                        onClick={() => handleBook(services[0])}
                        className="flex-1 md:flex-none bg-black text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 shadow-sm transition-colors"
                    >
                       Book Session
                    </button>
                 </div>
              </div>

              {/* Trust Scorecard */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4 py-4 border-t border-gray-100">
                 {[
                    { label: 'Completion Rate', value: consultant.metrics.completionRate, color: 'text-emerald-600' },
                    { label: 'Dispute Rate', value: consultant.metrics.disputeRate, color: 'text-gray-900' },
                    { label: 'Last Active', value: consultant.metrics.lastActive, color: 'text-gray-900' },
                    { label: 'Jobs Done', value: consultant.metrics.jobsCompleted, color: 'text-gray-900' },
                    { label: 'Cancellation', value: consultant.metrics.cancellationRate, color: 'text-gray-900' },
                 ].map((stat, i) => (
                    <div key={i}>
                       <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">{stat.label}</p>
                       <p className={`text-sm font-bold mt-0.5 ${stat.color}`}>{stat.value}</p>
                    </div>
                 ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
           <nav className="-mb-px flex space-x-8 overflow-x-auto no-scrollbar">
              {[
                 { id: 'services', label: 'Services', icon: Zap },
                 { id: 'resources', label: 'Resources', icon: Download },
                 { id: 'outcomes', label: 'Impact', icon: TrendingUp },
                 { id: 'reviews', label: 'Reviews', icon: Star },
                 { id: 'safety', label: 'Policies', icon: Shield }
              ].map((tab) => (
                 <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                       activeTab === tab.id
                          ? 'border-black text-black'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                 >
                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-black' : 'text-gray-400'}`} />
                    {tab.label}
                 </button>
              ))}
           </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Primary Content Column */}
            <div className="lg:col-span-2 space-y-8 animate-fade-in">
               {activeTab === 'services' && (
                  <div className="space-y-6">
                     <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900">Available Services</h3>
                        <div className="flex items-center gap-2">
                           <button className="flex items-center gap-1 text-xs font-medium bg-white border border-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-50">
                              <Filter className="w-3 h-3" /> Filters
                           </button>
                        </div>
                     </div>
                     <div className="grid gap-4">
                        {services.map((s) => (
                           <div key={s.id} className={`bg-white rounded-xl border p-5 transition-all group ${s.type === 'In-Person' && !isNear ? 'border-gray-100 opacity-60' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'}`}>
                              <div className="flex justify-between items-start">
                                 <div className="flex gap-4">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                       s.type === 'Virtual' ? 'bg-purple-50 text-purple-600' : 
                                       s.type === 'In-Person' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                                    }`}>
                                       {s.type === 'Virtual' ? <Video className="w-6 h-6" /> : 
                                        s.type === 'In-Person' ? <MapPin className="w-6 h-6" /> : <CalendarIcon className="w-6 h-6" />}
                                    </div>
                                    <div>
                                       <h4 className="font-bold text-gray-900 text-lg group-hover:text-brand-600 transition-colors">{s.title}</h4>
                                       <div className="flex items-center gap-3 mt-1 text-xs font-medium text-gray-500">
                                          <span className="bg-gray-100 px-2 py-0.5 rounded">{s.type}</span>
                                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {s.duration}</span>
                                          {s.type === 'In-Person' && !isNear && (
                                             <span className="text-red-500 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" /> Too Far ({Math.round(distanceKm)}km)
                                             </span>
                                          )}
                                       </div>
                                       <p className="text-sm text-gray-600 mt-3 leading-relaxed">{s.desc}</p>
                                    </div>
                                 </div>
                                 <div className="text-right flex flex-col items-end gap-3">
                                    <span className="text-xl font-bold text-gray-900">${s.price}</span>
                                    <button 
                                       onClick={() => handleBook(s)}
                                       disabled={s.type === 'In-Person' && !isNear}
                                       className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors ${
                                          s.type === 'In-Person' && !isNear 
                                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                          : 'bg-black text-white hover:bg-gray-800'
                                       }`}
                                    >
                                       {s.type === 'In-Person' && !isNear ? 'Unavailable' : 'Book'}
                                    </button>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}
               {/* Other tabs omitted for brevity but remain unchanged */}
            </div>

            {/* Right Column: Sticky Info */}
            <div className="space-y-6">
               <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-36">
                  <h3 className="font-bold text-gray-900 mb-4">About Sarah</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                     {consultant.bio}
                  </p>
                  
                  <div className="flex items-center gap-3 mb-6">
                     <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-[#0077b5] hover:text-white transition-colors">
                        <Linkedin className="w-4 h-4" />
                     </a>
                     <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-[#1DA1F2] hover:text-white transition-colors">
                        <Twitter className="w-4 h-4" />
                     </a>
                     <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-900 hover:text-white transition-colors">
                        <Globe className="w-4 h-4" />
                     </a>
                  </div>

                  <div className="space-y-3">
                     <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-2"><MapPin className="w-4 h-4" /> Service Area</span>
                        <span className="font-medium text-gray-900">San Francisco ±50mi</span>
                     </div>
                     <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-2"><Clock className="w-4 h-4" /> Availability</span>
                        <span className="font-medium text-green-600">Next Slot: Tomorrow</span>
                     </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                     <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors mb-3">
                        Share Profile
                     </button>
                     <p className="text-xs text-center text-gray-400">
                        Member since 2023 • 98% Job Success
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Intro Modal */}
      {showIntroModal && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in-95">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
               {introSent ? (
                  <div className="text-center py-8">
                     <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                     </div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2">Request Sent!</h3>
                     <p className="text-gray-500 text-sm">
                        {consultant.name} has been notified. They usually respond within {consultant.metrics.responseTime}.
                     </p>
                  </div>
               ) : (
                  <>
                     <div className="flex justify-between items-start mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Request Intro</h3>
                        <button onClick={() => setShowIntroModal(false)} className="text-gray-400 hover:text-black">
                           <X className="w-5 h-5" />
                        </button>
                     </div>
                     
                     <div className="flex items-center gap-4 mb-6">
                        <img src={consultant.avatar} className="w-12 h-12 rounded-full border border-gray-200" />
                        <div>
                           <p className="font-bold text-gray-900">{consultant.name}</p>
                           <p className="text-xs text-gray-500">{consultant.title}</p>
                        </div>
                     </div>

                     <div className="space-y-4 mb-6">
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                           <h4 className="text-sm font-bold text-gray-900 mb-2">Share Context?</h4>
                           <p className="text-xs text-gray-600 mb-3">
                              Sharing your 30-page diagnostic report helps {consultant.name.split(' ')[0]} prepare a solution before the first call.
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
                              placeholder={`Hi ${consultant.name.split(' ')[0]}, I need help with...`}
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
               )}
            </div>
         </div>
      )}

      {/* Booking Modal Overlay */}
      {showBooking && selectedService && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden h-[600px] flex flex-col">
              <BookingWizard />
           </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantProfile;
