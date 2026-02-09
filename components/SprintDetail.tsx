
import React, { useState } from 'react';
import { 
  Calendar, Clock, CheckCircle2, FileText, Users, ShieldCheck, ArrowRight, PlayCircle, Award, ChevronLeft, 
  Star, Zap, HelpCircle, Check, AlertOctagon, X, Target, BrainCircuit, Recycle, Leaf, Fingerprint, 
  AlertTriangle, Cpu, Megaphone, Download, Building2, Lock, Share2, PlusCircle, Eye
} from 'lucide-react';
import { User, Course, CheckoutItem } from '../types';

interface SprintDetailProps {
  onBack?: () => void;
  onEnroll?: (item: CheckoutItem) => void;
  user?: User | null;
  course: Course; // Now required
}

const SprintDetail: React.FC<SprintDetailProps> = ({ onBack, onEnroll, user, course }) => {
  const [activeTab, setActiveTab] = useState<'overview'|'curriculum'|'reviews'>('overview');
  
  // Widget States
  const [showRoiCalc, setShowRoiCalc] = useState(false);
  const [showReadiness, setShowReadiness] = useState(false);
  
  const RoiCalculator = () => (
     <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-8 animate-fade-in">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
           <Zap className="w-4 h-4 text-amber-500 fill-current" /> Profit ROI Estimator
        </h4>
        <div className="space-y-4">
           <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Current Monthly Cost ($)</label>
              <input type="number" className="w-full mt-1 border-gray-300 rounded p-2 text-sm" placeholder="e.g. 5000" />
           </div>
           <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Est. Improvement (%)</label>
              <input type="number" className="w-full mt-1 border-gray-300 rounded p-2 text-sm" placeholder="e.g. 20" />
           </div>
           <div className="pt-4 border-t border-gray-200 flex justify-between items-end">
              <span className="text-sm font-medium text-gray-600">Annual Savings:</span>
              <span className="text-xl font-bold text-green-600">$12,000</span>
           </div>
        </div>
     </div>
  );

  const handleEnrollClick = () => {
     if (onEnroll) {
        onEnroll({
           id: course.id,
           title: course.title,
           description: `Live Session Access: ${course.shortPromise}`,
           price: course.price,
           type: 'session'
        });
     }
  };

  const handleEnterpriseClick = () => {
     if (onEnroll) {
        // Enterprise Team Pass Logic
        // Fixed price example or dynamic based on base price
        const teamPrice = 2999; 
        onEnroll({
           id: `ent_${course.id}`,
           title: `Enterprise Team Pass: ${course.title}`,
           description: `Unlimited seats for your team for this specific session. Includes dedicated Q&A channel.`,
           price: teamPrice, 
           type: 'enterprise',
           recurringInterval: 'month'
        });
     }
  }

  return (
    <div className="min-h-screen bg-white pb-20 font-sans text-slate-900 animate-fade-in">
      
      {/* 1. Course Hero */}
      <div className="bg-gray-900 text-white pt-12 pb-16 relative overflow-hidden">
         {/* Background Effect */}
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-900 rounded-full blur-3xl opacity-50 -mr-32 -mt-32 pointer-events-none"></div>
         
         <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
               <span className="cursor-pointer hover:text-white" onClick={onBack}>Courses</span>
               <ChevronLeft className="w-3 h-3 rotate-180" />
               <span className="text-white">{course.category}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
               {/* Left Content (8 cols) */}
               <div className="lg:col-span-8">
                  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                     {course.title}
                  </h1>
                  <p className="text-xl text-gray-300 mb-8 max-w-3xl leading-relaxed">
                     {course.shortPromise}
                  </p>

                  {/* Outcomes Chips */}
                  <div className="flex flex-wrap gap-3 mb-8">
                     {course.outcomes.slice(0,3).map((o, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-sm font-medium text-white shadow-sm backdrop-blur-sm">
                           <CheckCircle2 className="w-4 h-4 text-green-400" />
                           {o}
                        </div>
                     ))}
                  </div>

                  {/* Instructor Mini */}
                  <div className="flex items-center gap-4">
                     <img src={course.instructor.avatar} alt="" className="w-12 h-12 rounded-full border-2 border-gray-700" />
                     <div>
                        <p className="text-sm text-gray-400 font-bold uppercase">Instructor</p>
                        <div className="flex items-center gap-2">
                           <span className="font-bold text-white text-lg">{course.instructor.name}</span>
                           {course.instructor.verified && (
                              <ShieldCheck className="w-4 h-4 text-blue-400" />
                           )}
                        </div>
                     </div>
                     <div className="h-8 w-px bg-gray-700 mx-4"></div>
                     <div>
                        <div className="flex items-center gap-1 text-amber-400 font-bold text-lg">
                           <Star className="w-4 h-4 fill-current" /> {course.rating}
                        </div>
                        <p className="text-xs text-gray-400">{course.reviewsCount} verified reviews</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 2. Main Layout (Sticky Right) */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
            
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-16">
               
               {/* About / Why */}
               <section>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Why take this session?</h3>
                  <div className="prose prose-lg text-gray-600 max-w-none">
                     <p>
                        Most courses teach theory. This session is designed to install a capability. 
                        You will leave with a verified <strong>Proof of Work</strong> asset that demonstrates your competence to employers and clients.
                     </p>
                  </div>
                  
                  {/* ROI Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                     {course.roiStats.map((stat, i) => (
                        <div key={i} className="bg-gray-50 border border-gray-200 p-5 rounded-xl">
                           <div className="text-3xl font-extrabold text-gray-900 mb-1">{stat.value}</div>
                           <div className="text-sm font-bold text-gray-700 uppercase tracking-wide">{stat.label}</div>
                           {stat.desc && <div className="text-xs text-gray-500 mt-2">{stat.desc}</div>}
                        </div>
                     ))}
                  </div>
               </section>

               {/* What You'll Build (PoW) */}
               <section>
                  <div className="flex items-center gap-3 mb-6">
                     <div className="bg-black text-white p-2 rounded-lg">
                        <Award className="w-6 h-6" />
                     </div>
                     <h3 className="text-2xl font-bold text-gray-900">What You'll Build</h3>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                     <div className="space-y-6">
                        {course.proofOfWork.map((item, i) => (
                           <div key={i} className="flex gap-4">
                              <div className="mt-1">
                                 <CheckCircle2 className="w-6 h-6 text-brand-600" />
                              </div>
                              <div>
                                 <h4 className="font-bold text-lg text-gray-900">{item.title}</h4>
                                 <p className="text-gray-600 mt-1">{item.description}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="mt-8 pt-8 border-t border-gray-100 flex gap-4">
                        <button className="text-sm font-bold text-brand-600 flex items-center gap-2 hover:underline">
                           <Eye className="w-4 h-4" /> Preview Example
                        </button>
                        <button className="text-sm font-bold text-gray-500 flex items-center gap-2 hover:text-black transition-colors">
                           <Download className="w-4 h-4" /> Download Syllabus
                        </button>
                     </div>
                  </div>
               </section>

               {/* Schedule */}
               <section>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Schedule</h3>
                  <div className="space-y-4">
                     {course.upcomingSessions.slice(0, 2).map((session, i) => (
                        <div key={i} className="flex flex-col md:flex-row gap-6 p-6 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors">
                           <div className="flex-shrink-0 flex md:flex-col items-center gap-2 md:gap-0 md:justify-center md:w-32 md:border-r md:border-gray-100 md:pr-6">
                              <span className="text-xs font-bold text-gray-400 uppercase">Part {i + 1}</span>
                              <div className="text-lg font-bold text-gray-900">{session.title}</div>
                           </div>
                           <div className="flex-1">
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                 <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {session.startDate}</span>
                                 <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {session.time} ({session.timezone})</span>
                              </div>
                              <div className="mt-2 flex gap-2">
                                 <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium border border-gray-200">Live Workshop</span>
                                 <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium border border-gray-200">Q&A</span>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </section>

               {/* Reviews */}
               <section>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Verified Reviews</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {[1,2,3,4].map(i => (
                        <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                           <div className="flex items-center gap-1 text-amber-500 mb-3">
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                           </div>
                           <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                              "Absolutely game-changing. The templates alone were worth the price. I implemented the strategy the next day."
                           </p>
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                              <div>
                                 <p className="text-xs font-bold text-gray-900">Alex M.</p>
                                 <p className="text-xs text-gray-500">Verified Attendee</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </section>

            </div>

            {/* Right Sticky Card (4 cols) */}
            <div className="lg:col-span-4 relative">
               <div className="sticky top-24 space-y-6">
                  
                  {/* ENROLLMENT CARD */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                     {/* Video Preview */}
                     <div className="h-48 bg-gray-900 relative group cursor-pointer">
                        <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{backgroundImage: `url(${course.thumbnail})`}}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border border-white/30">
                              <PlayCircle className="w-8 h-8 text-white fill-current" />
                           </div>
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-1 rounded">
                           Watch Trailer
                        </div>
                     </div>

                     <div className="p-6">
                        <div className="flex items-baseline gap-2 mb-1">
                           <span className="text-4xl font-extrabold text-gray-900 tracking-tight">${course.price}</span>
                           <span className="text-gray-400 text-sm font-medium">{course.currency}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-6 flex items-center gap-1">
                           <ShieldCheck className="w-3 h-3 text-green-600" /> 30-day money-back guarantee
                        </p>

                        {/* Session Status */}
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6">
                           <div className="flex justify-between text-sm items-center mb-1">
                              <span className="text-blue-900 font-bold">Next Cohort</span>
                              <span className="text-blue-700 text-xs">Oct 30</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <div className="flex-1 bg-blue-200 rounded-full h-1.5">
                                 <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                              </div>
                              <span className="text-[10px] text-blue-800 font-bold">5 Seats Left</span>
                           </div>
                        </div>

                        <button 
                           onClick={handleEnrollClick}
                           className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                           {user ? "Secure Your Seat" : "Sign In to Enroll"} <ArrowRight className="w-5 h-5" />
                        </button>
                        
                        {!user && (
                           <button 
                              onClick={handleEnrollClick}
                              className="w-full mt-3 bg-white text-gray-700 border border-gray-300 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors"
                           >
                              Create Free Account
                           </button>
                        )}
                        
                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-4 text-xs text-gray-400 grayscale opacity-70">
                           <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Secure Payment</span>
                           <span>•</span>
                           <span>Stripe</span>
                        </div>
                     </div>
                  </div>

                  {/* Feature Hooks / Widgets */}
                  <div className="space-y-4">
                     {/* Readiness Check */}
                     <button 
                        onClick={() => setShowReadiness(!showReadiness)}
                        className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold text-sm hover:border-gray-300 hover:shadow-sm transition-all flex items-center justify-between px-4"
                     >
                        <span className="flex items-center gap-2"><Target className="w-4 h-4 text-brand-600" /> Am I ready?</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">Check</span>
                     </button>
                     {showReadiness && (
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm animate-fade-in-up">
                           <p className="font-bold mb-2">Prerequisites:</p>
                           <ul className="list-disc pl-4 space-y-1 text-gray-600 text-xs">
                              <li>Basic understanding of P&L</li>
                              <li>Access to company financial data</li>
                              <li>3+ years operating experience</li>
                           </ul>
                        </div>
                     )}

                     {/* ROI Calc Toggle */}
                     <button 
                        onClick={() => setShowRoiCalc(!showRoiCalc)}
                        className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold text-sm hover:border-gray-300 hover:shadow-sm transition-all flex items-center justify-between px-4"
                     >
                        <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-amber-500" /> Calculate ROI</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">Tool</span>
                     </button>
                     {showRoiCalc && <RoiCalculator />}

                     {/* Enterprise CTA */}
                     <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 text-white">
                        <div className="flex items-center gap-2 mb-2">
                           <Building2 className="w-5 h-5 text-blue-400" />
                           <h4 className="font-bold text-sm">Enterprise Team Pass</h4>
                        </div>
                        <p className="text-xs text-gray-300 mb-4">
                           Get unlimited seats for your team for this specific session. Includes 1hr consultation.
                        </p>
                        <button 
                           onClick={handleEnterpriseClick}
                           className="w-full bg-white text-black py-2.5 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors"
                        >
                           Buy Team Pass ($2,999/mo)
                        </button>
                     </div>
                  </div>

               </div>
            </div>

         </div>
      </div>
    </div>
  );
};

export default SprintDetail;