import React, { useState } from 'react';
import { 
  DollarSign, 
  Users, 
  Clock, 
  AlertTriangle, 
  Calendar, 
  Plus, 
  FileText, 
  Share2, 
  TrendingUp, 
  Lock, 
  CheckCircle2, 
  AlertOctagon, 
  ChevronRight, 
  UploadCloud, 
  Layout, 
  ListChecks, 
  Settings, 
  Filter, 
  ArrowRight, 
  Download, 
  Info, 
  Video, 
  Edit, 
  ArrowLeft, 
  Grid, 
  BookOpen, 
  MessageSquare, 
  Award, 
  ShieldCheck, 
  Eye, 
  Loader2, 
  Trash2, 
  Sparkles, 
  BarChart2, 
  ThumbsUp, 
  ThumbsDown, 
  UserX, 
  CreditCard, 
  Lightbulb, 
  QrCode, 
  Megaphone, 
  Globe, 
  Link as LinkIcon, 
  XCircle, 
  FileCheck, 
  Star, 
  CheckSquare, 
  Building2,
  Flag,
  Hourglass,
  X
} from 'lucide-react';
import { Transaction, Sprint, SprintStatus, SprintLevel, SprintCurriculumBlock, SprintTask, QuizQuestion, BlogPost, ReferralCode, TrainerPromotion, SprintTemplate, ViewState, User } from '../types';
import { generateQuiz } from '../services/gemini';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';

interface TrainerStudioProps {
  user: User;
  onLaunchLive?: () => void;
  onNavigate?: (view: ViewState) => void;
}

const SPRINT_TEMPLATES: SprintTemplate[] = [
  {
    id: 'tpl_ma',
    category: 'Corporate Strategy',
    title: 'M&A for SMEs: Buying Profit',
    description: 'Grow faster by acquiring profitable businesses. A step-by-step guide to deal sourcing, valuation, and integration.',
    tags: ['Strategy', 'Finance', 'Growth'],
    outcomes: ['Develop Acquisition Thesis', 'Target Screening Scorecard', 'Deal Model (LBO Light)', '100-Day Integration Plan'],
    kpiMetrics: ['EBITDA Multiple', 'DSCR (Debt Service)', 'Payback Period', 'Customer Retention'],
    tasks: [
      { id: 't1', title: 'Define Acquisition Thesis', description: 'Identify target size, industry, and geography.', difficulty: 'medium', priority: 'high', estimatedMinutes: 60, dueDaysAfterPart2: 2, proofType: 'file', isRequired: true, mentorReviewRequired: true },
      { id: 't2', title: 'Screen 10 Targets', description: 'Use the scorecard to filter potential deals.', difficulty: 'hard', priority: 'medium', estimatedMinutes: 120, dueDaysAfterPart2: 7, proofType: 'file', isRequired: true, mentorReviewRequired: false },
      { id: 't3', title: 'Draft LOI', description: 'Create a non-binding Letter of Intent based on valuation.', difficulty: 'hard', priority: 'high', estimatedMinutes: 90, dueDaysAfterPart2: 10, proofType: 'file', isRequired: false, mentorReviewRequired: true }
    ],
    resources: [
      { id: 'r1', title: 'SME Valuation Model.xlsx', type: 'template', downloads: 0 },
      { id: 'r2', title: 'Due Diligence Checklist', type: 'checklist', downloads: 0 }
    ]
  },
  {
    id: 'tpl_supply',
    category: 'Operations',
    title: 'Global Supply Chain & Logistics',
    description: 'Protect margins by optimizing inventory and shipping. Reduce dead capital and improve cash conversion.',
    tags: ['Operations', 'Logistics', 'Cash Flow'],
    outcomes: ['Inventory Optimization Plan', 'Supplier Negotiation Strategy', 'Shipping Cost Analysis'],
    kpiMetrics: ['Inventory Turns', 'Stockout Rate', 'Landed Cost', 'Cash Conversion Cycle'],
    tasks: [
      { id: 't1', title: 'Map Supply Chain Costs', description: 'Identify where cash is trapped in the chain.', difficulty: 'medium', priority: 'high', estimatedMinutes: 60, dueDaysAfterPart2: 3, proofType: 'file', isRequired: true, mentorReviewRequired: false },
      { id: 't2', title: 'Calculate Reorder Points', description: 'Set safety stock levels based on lead time.', difficulty: 'medium', priority: 'medium', estimatedMinutes: 45, dueDaysAfterPart2: 5, proofType: 'file', isRequired: true, mentorReviewRequired: false }
    ],
    resources: [
      { id: 'r1', title: 'Inventory Tracker.xlsx', type: 'template', downloads: 0 },
      { id: 'r2', title: 'Incoterms Cheat Sheet', type: 'pdf', downloads: 0 }
    ]
  },
  {
    id: 'tpl_frac',
    category: 'Human Capital',
    title: 'Fractional Executive Management',
    description: 'Get C-level outcomes without C-level payroll. How to hire, scope, and manage fractional leaders.',
    tags: ['Leadership', 'Hiring', 'Management'],
    outcomes: ['Fractional Role Scope', 'ROI Scorecard', 'Knowledge Transfer Plan'],
    kpiMetrics: ['Payroll Savings vs Full-Time', 'Strategic Deliverables', 'Team Velocity'],
    tasks: [
      { id: 't1', title: 'Define Fractional Scope', description: 'What outcomes do you need in 10hrs/week?', difficulty: 'medium', priority: 'high', estimatedMinutes: 45, dueDaysAfterPart2: 2, proofType: 'text', isRequired: true, mentorReviewRequired: true },
      { id: 't2', title: 'Create Vetting Scorecard', description: 'Interview questions to test systems thinking.', difficulty: 'medium', priority: 'medium', estimatedMinutes: 60, dueDaysAfterPart2: 5, proofType: 'file', isRequired: true, mentorReviewRequired: false }
    ],
    resources: [
      { id: 'r1', title: 'Fractional Contract Template', type: 'template', downloads: 0 }
    ]
  },
  {
    id: 'tpl_ent_proj',
    category: 'Enterprise Productivity',
    title: 'Department Profit Improvement',
    description: 'Turn training into verified business improvements. A structured project cycle for teams.',
    tags: ['Enterprise', 'Efficiency', 'Cost Control'],
    outcomes: ['Project Charter', 'Baseline Analysis', 'Intervention Plan', 'Impact Report'],
    kpiMetrics: ['Cost Reduction %', 'Revenue Lift %', 'Hours Saved', 'Error Rate Reduction'],
    tasks: [
      { id: 't1', title: 'Select Primary Metric', description: 'Choose one KPI to improve (Cost, Speed, Quality).', difficulty: 'easy', priority: 'high', estimatedMinutes: 30, dueDaysAfterPart2: 1, proofType: 'text', isRequired: true, mentorReviewRequired: true },
      { id: 't2', title: 'Root Cause Analysis', description: 'Why is the metric currently underperforming?', difficulty: 'medium', priority: 'medium', estimatedMinutes: 60, dueDaysAfterPart2: 3, proofType: 'file', isRequired: true, mentorReviewRequired: false },
      { id: 't3', title: 'Final Impact Report', description: 'Measure the delta after intervention.', difficulty: 'hard', priority: 'high', estimatedMinutes: 120, dueDaysAfterPart2: 30, proofType: 'file', isRequired: true, mentorReviewRequired: true }
    ],
    resources: [
      { id: 'r1', title: 'Profit Project Template.ppt', type: 'template', downloads: 0 },
      { id: 'r2', title: 'Mentor Check-in Guide', type: 'pdf', downloads: 0 }
    ]
  },
  {
    id: 'tpl_real_estate',
    category: 'Real Estate',
    title: 'Rental Strategy & Cashflow',
    description: 'Buy properties based on math, not emotion. Learn to calculate true cashflow and risk.',
    tags: ['Investing', 'Real Estate', 'Wealth'],
    outcomes: ['Rental Deal Analyzer', 'Buy Box Criteria', 'Tenant Screening Checklist', 'Reserve Plan'],
    kpiMetrics: ['Cash on Cash Return', 'Cap Rate', 'Debt Service Coverage Ratio', 'Net Cashflow'],
    tasks: [
      { id: 't1', title: 'Define Buy Box', description: 'Set your criteria for location, price, and yield.', difficulty: 'easy', priority: 'high', estimatedMinutes: 45, dueDaysAfterPart2: 2, proofType: 'file', isRequired: true, mentorReviewRequired: false },
      { id: 't2', title: 'Analyze 3 Deals', description: 'Use the calculator to find one profitable deal.', difficulty: 'hard', priority: 'medium', estimatedMinutes: 90, dueDaysAfterPart2: 7, proofType: 'file', isRequired: true, mentorReviewRequired: true }
    ],
    resources: [
      { id: 'r1', title: 'Rental Calculator.xlsx', type: 'template', downloads: 0 },
      { id: 'r2', title: 'Lease Agreement Essentials', type: 'pdf', downloads: 0 }
    ]
  },
  {
    id: 'tpl_risk',
    category: 'Risk & Trust',
    title: 'Fraud & Scam Defense',
    description: 'Protect your business from phishing, fake invoices, and data leaks.',
    tags: ['Security', 'Risk', 'Operations'],
    outcomes: ['Fraud Prevention Checklist', 'Access Control Map', 'Incident Response Plan'],
    kpiMetrics: ['Incident Response Time', 'Phishing Test Pass Rate', 'Backup Frequency'],
    tasks: [
      { id: 't1', title: 'Audit Access Controls', description: 'Who has admin access? Revoke unnecessary keys.', difficulty: 'medium', priority: 'high', estimatedMinutes: 60, dueDaysAfterPart2: 3, proofType: 'file', isRequired: true, mentorReviewRequired: false },
      { id: 't2', title: 'Create Incident Plan', description: 'What do you do in the first 30 minutes of a breach?', difficulty: 'medium', priority: 'medium', estimatedMinutes: 45, dueDaysAfterPart2: 5, proofType: 'text', isRequired: true, mentorReviewRequired: true }
    ],
    resources: [
      { id: 'r1', title: 'Security Hygiene Checklist', type: 'checklist', downloads: 0 }
    ]
  },
  {
    id: 'tpl_ai_ops',
    category: 'AI for Profit',
    title: 'AI Productivity Workflows',
    description: 'Install verified AI workflows for admin, support, and operations to save hours/week.',
    tags: ['AI', 'Productivity', 'Automation'],
    outcomes: ['3 Verified AI Workflows', 'Prompt Library', 'Verification Checklist'],
    kpiMetrics: ['Hours Saved per Week', 'Error Rate', 'Task Cycle Time'],
    tasks: [
      { id: 't1', title: 'Map High-Friction Task', description: 'Identify one repetitive process to automate.', difficulty: 'easy', priority: 'medium', estimatedMinutes: 30, dueDaysAfterPart2: 1, proofType: 'text', isRequired: true, mentorReviewRequired: false },
      { id: 't2', title: 'Build & Verify Workflow', description: 'Create the prompt chain and the human verification step.', difficulty: 'medium', priority: 'high', estimatedMinutes: 60, dueDaysAfterPart2: 3, proofType: 'file', isRequired: true, mentorReviewRequired: true }
    ],
    resources: [
      { id: 'r1', title: 'Prompt Engineering Guide', type: 'pdf', downloads: 0 }
    ]
  }
];

const TrainerStudio: React.FC<TrainerStudioProps> = ({ user, onLaunchLive, onNavigate }) => {
  // Navigation State
  const [viewMode, setViewMode] = useState<'dashboard' | 'editor' | 'templates'>('dashboard');
  const [activeTab, setActiveTab] = useState<'overview' | 'wallet' | 'marketing'>('overview');
  const [editorModule, setEditorModule] = useState<'overview' | 'curriculum' | 'tasks' | 'resources' | 'quiz' | 'outcomes' | 'cohort' | 'quality' | 'analytics' | 'promote'>('overview');
  
  // Data State
  const [selectedSprint, setSelectedSprint] = useState<Sprint | null>(null);
  const [sprints, setSprints] = useState<Sprint[]>([
     { 
        id: 's1', 
        title: 'Advanced SaaS Economics', 
        status: 'published',
        reviewStatus: 'approved',
        level: 'advanced', 
        language: 'English',
        shortDescription: 'Master unit economics.',
        price: 499,
        currency: 'USD',
        maxSeats: 50,
        seatsSold: 42,
        waitlistEnabled: true,
        categoryTags: ['Cash Flow', 'Finance'],
        outcomes: ['Build a model', 'Audit burn rate', 'Calculate CAC'],
        kpiMetrics: ['CAC Payback', 'Net Revenue Retention', 'Burn Multiple'],
        sessions: [
           { id: 'sess1', partNumber: 1, startsAt: new Date(Date.now() + 86400000).toISOString(), endsAt: '', timezone: 'UTC', status: 'scheduled' },
           { id: 'sess2', partNumber: 2, startsAt: new Date(Date.now() + 172800000).toISOString(), endsAt: '', timezone: 'UTC', status: 'scheduled' }
        ],
        resources: [
           { id: 'r1', title: 'Financial Model v4', type: 'template', downloads: 120 }
        ],
        curriculum: [
           { id: 'b1', partNumber: 1, title: 'Unit Economics Framework', durationMinutes: 45, keyPoints: [] },
           { id: 'b2', partNumber: 2, title: 'Live Case Study', durationMinutes: 45, keyPoints: [] }
        ],
        tasks: [
           { id: 't1', title: 'Audit your CAC', description: 'Use the template.', difficulty: 'medium', priority: 'high', estimatedMinutes: 60, dueDaysAfterPart2: 3, proofType: 'file', isRequired: true, mentorReviewRequired: true }
        ]
     },
     {
        id: 's3', 
        title: 'YouTube Revenue Engine',
        status: 'draft',
        reviewStatus: 'draft',
        level: 'beginner',
        language: 'English',
        shortDescription: 'Turn views into money. Build a predictable content pipeline.',
        price: 600,
        currency: 'USD',
        maxSeats: 200,
        seatsSold: 0,
        waitlistEnabled: false,
        categoryTags: ['Content Systems', 'Marketing'],
        outcomes: [],
        kpiMetrics: [],
        sessions: [],
        resources: [],
        curriculum: [],
        tasks: []
     }
  ]);

  // Marketing State (B7)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
     { id: 'b1', title: 'Why CAC Payback > LTV', slug: 'why-cac-payback', status: 'published', views: 1240, conversions: 5, publishedAt: 'Oct 15, 2024', tags: ['Finance'], allowComments: true, allowRatings: true },
     { id: 'b2', title: 'The Series B Checklist', slug: 'series-b-checklist', status: 'draft', views: 0, conversions: 0, publishedAt: '', tags: ['Fundraising'], allowComments: true, allowRatings: true }
  ]);
  const [referrals, setReferrals] = useState<ReferralCode[]>([
     { id: 'ref1', code: 'SAAS-VIP', targetType: 'session', targetId: 's1', clicks: 85, signups: 12, earnedCredits: 600, status: 'active' }
  ]);

  // -- Wallet State (B3 Spec) --
  const [walletFilter, setWalletFilter] = useState<'all' | 'escrowed' | 'released' | 'withheld'>('all');
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalProcessing, setWithdrawalProcessing] = useState(false);

  // Initial wallet balance mock
  const transactions: Transaction[] = [
    { id: 'tx1', studentName: 'Aggregated (8 students)', sprintTitle: 'SaaS Economics', grossAmount: 3992, netAmount: 1996.00, date: 'Oct 24, 2024', status: 'released', escrowReleaseAt: 'Oct 27, 2024', seatsCount: 8, type: 'single' },
    { id: 'tx2', studentName: 'Aggregated (5 students)', sprintTitle: 'AI Strategy', grossAmount: 4995, netAmount: 2497.50, date: 'Oct 28, 2024', status: 'escrowed', escrowReleaseAt: 'Oct 31, 2024', seatsCount: 5, type: 'single' },
    // Enterprise Royalty: 30% of $5000 is $1500
    { id: 'tx3', studentName: 'TechFlow Enterprise', sprintTitle: 'SaaS Economics (Team License)', grossAmount: 5000, netAmount: 1500.00, date: 'Oct 29, 2024', status: 'released', type: 'enterprise_royalty' }, 
  ];
  
  // To demonstrate the threshold, let's artificially lower the available balance for demo purposes if needed
  // But keeping consistent with transactions: 1996 + 1500 = 3496. 
  const wallet = { available: 3496.00, pending: 2497.50, onHold: 0.00 };
  const WITHDRAWAL_THRESHOLD = 100.00;

  // APPROVAL CHECK
  if (user.status === 'pending') {
     return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white p-8">
           <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <Hourglass className="w-10 h-10 text-amber-600" />
           </div>
           <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Under Review</h1>
           <p className="text-gray-500 max-w-md text-center mb-8">
              Thanks for applying to be a trainer on The Profit Driven Channel. 
              Our team is verifying your credentials. You will receive an email once your account is approved to start creating sessions.
           </p>
           <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 w-full max-w-lg">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">Review Checklist</h3>
              <ul className="space-y-3">
                 <li className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Identity Verification
                 </li>
                 <li className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Professional Profile Check
                 </li>
                 <li className="flex items-center gap-3 text-sm text-gray-600 opacity-60">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div> 
                    Admin Approval
                 </li>
              </ul>
           </div>
        </div>
     );
  }

  if (user.status === 'rejected' || user.status === 'suspended') {
     return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white p-8">
           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <UserX className="w-10 h-10 text-red-600" />
           </div>
           <h1 className="text-3xl font-bold text-gray-900 mb-2">Account {user.status === 'suspended' ? 'Suspended' : 'Not Approved'}</h1>
           <p className="text-gray-500 max-w-md text-center">
              Your trainer account is currently inactive. Please contact support for more details.
           </p>
        </div>
     );
  }

  // ... (rest of logic same as before) ...
  const handleEditSprint = (sprint: Sprint) => {
     setSelectedSprint({ ...sprint }); 
     setViewMode('editor');
     if (sprint.reviewStatus === 'changes_requested') {
        setEditorModule('quality'); 
     } else {
        setEditorModule('overview');
     }
  };

  const handleCreateSprint = () => setViewMode('templates');

  const applyTemplate = (tpl: SprintTemplate) => {
     const newSprint: Sprint = {
        id: `s_${Date.now()}`,
        title: tpl.title,
        shortDescription: tpl.description,
        status: 'draft',
        level: 'intermediate',
        language: 'English',
        price: 0,
        currency: 'USD',
        maxSeats: 30,
        seatsSold: 0,
        waitlistEnabled: false,
        categoryTags: tpl.tags,
        outcomes: tpl.outcomes,
        kpiMetrics: tpl.kpiMetrics,
        tasks: tpl.tasks,
        resources: tpl.resources,
        sessions: [],
        curriculum: [],
        reviewStatus: 'draft'
     };
     setSelectedSprint(newSprint);
     setViewMode('editor');
     setEditorModule('overview');
  };

  const saveSprint = () => {
     if (selectedSprint) {
        if (selectedSprint.reviewStatus === 'pending') {
           alert("Cannot edit while under review.");
           return;
        }
        setSprints(prev => {
           const idx = prev.findIndex(s => s.id === selectedSprint.id);
           if (idx >= 0) {
              const updated = [...prev];
              updated[idx] = selectedSprint;
              return updated;
           }
           return [...prev, selectedSprint];
        });
        alert('Session Series Saved');
     }
  };

  const handleWithdrawalRequest = () => {
     setWithdrawalProcessing(true);
     setTimeout(() => {
        setWithdrawalProcessing(false);
        setShowWithdrawalModal(false);
        alert(`Withdrawal of $${withdrawalAmount || wallet.available} initiated via Stripe Connect.`);
     }, 1500);
  };

  // ... (Sub-Components) ...

  const DashboardOverview = () => (
    <div className="space-y-8 animate-fade-in">
       {/* ... same as before ... */}
       <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
         <div className="flex items-start gap-4 flex-1">
            <div className="bg-amber-100 p-2 rounded-full mt-1 sm:mt-0">
               <Clock className="w-6 h-6 text-amber-600 animate-pulse" />
            </div>
            <div>
               <h3 className="text-sm font-bold text-amber-900">Sentinel Active: Upcoming Session</h3>
               <p className="text-xs text-amber-700 mt-1">
                  Advanced SaaS Economics - Session 2 starts in <span className="font-bold">15 minutes</span>.
               </p>
            </div>
         </div>
         <button 
            onClick={onLaunchLive}
            className="w-full sm:w-auto bg-black text-white text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
         >
            <Video className="w-4 h-4" /> Launch Live Room
         </button>
      </div>

      <div className="flex justify-between items-center">
         <h2 className="text-xl font-bold text-gray-900">Your Session Series</h2>
         <button onClick={handleCreateSprint} className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Series
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {sprints.map(s => (
            <div key={s.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow group relative overflow-hidden">
               {s.reviewStatus === 'changes_requested' && (
                  <div className="absolute top-0 left-0 right-0 bg-red-100 h-1.5"></div>
               )}
               {s.reviewStatus === 'pending' && (
                  <div className="absolute top-0 left-0 right-0 bg-blue-100 h-1.5 animate-pulse"></div>
               )}
               <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                     <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide w-fit mb-1
                        ${s.status === 'published' ? 'bg-green-100 text-green-800' : 
                          s.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'}`}>
                        {s.status}
                     </span>
                  </div>
                  <div className="text-right">
                     <span className="block text-lg font-bold text-gray-900">${s.price}</span>
                     <span className="text-xs text-gray-500">{s.seatsSold}/{s.maxSeats} Sold</span>
                  </div>
               </div>
               <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
               <p className="text-sm text-gray-500 mb-4 line-clamp-2">{s.shortDescription || 'No description'}</p>
               <div className="pt-4 border-t border-gray-100 flex gap-2">
                  <button onClick={() => handleEditSprint(s)} className="flex-1 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-bold hover:bg-gray-50">
                     {s.reviewStatus === 'changes_requested' ? 'Fix Issues' : 'Manage'}
                  </button>
               </div>
            </div>
         ))}
      </div>
    </div>
  );

  const TemplateSelector = () => (
     <div className="max-w-6xl mx-auto py-8">
        {/* ... same as before ... */}
        <button onClick={() => setViewMode('dashboard')} className="flex items-center text-sm font-bold text-gray-500 hover:text-black mb-6">
           <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose a Blueprint</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {/* Blank */}
           <div 
              onClick={() => applyTemplate({ id: 'blank', category: 'General', title: 'Untitled Series', description: '', tags: [], outcomes: [], tasks: [], resources: [], kpiMetrics: [] })}
              className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-black cursor-pointer flex flex-col items-center justify-center min-h-[300px]"
           >
              <Plus className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="font-bold text-gray-900">Start from Scratch</h3>
           </div>
           {/* Templates */}
           {SPRINT_TEMPLATES.map(tpl => (
              <div key={tpl.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow flex flex-col">
                 <div className="flex justify-between items-start mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase rounded">{tpl.category}</span>
                 </div>
                 <h3 className="font-bold text-lg text-gray-900 mb-2">{tpl.title}</h3>
                 <p className="text-sm text-gray-500 mb-4 line-clamp-3">{tpl.description}</p>
                 <button 
                    onClick={() => applyTemplate(tpl)}
                    className="mt-auto w-full bg-black text-white py-2 rounded-lg text-sm font-bold hover:bg-gray-800"
                 >
                    Use Template
                 </button>
              </div>
           ))}
        </div>
     </div>
  );

  const WalletView = () => {
     const progress = Math.min((wallet.available / WITHDRAWAL_THRESHOLD) * 100, 100);
     
     return (
     <div className="space-y-8 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Available Balance Card */}
           <div className="bg-black text-white p-8 rounded-xl shadow-lg relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
              
              <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">Available to Withdraw</p>
                  <h2 className="text-4xl font-bold tracking-tight mb-2">${wallet.available.toFixed(2)}</h2>
                  
                  {/* Threshold Progress */}
                  {wallet.available < WITHDRAWAL_THRESHOLD && (
                      <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                              <span>${wallet.available.toFixed(0)} / ${WITHDRAWAL_THRESHOLD}</span>
                              <span>{progress.toFixed(0)}% to payout</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-1.5">
                              <div className="bg-amber-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                          </div>
                          <p className="text-[10px] text-gray-500 mt-1">Minimum ${WITHDRAWAL_THRESHOLD.toFixed(2)} required.</p>
                      </div>
                  )}
              </div>

              <button 
                onClick={() => setShowWithdrawalModal(true)}
                disabled={wallet.available < WITHDRAWAL_THRESHOLD} 
                className="w-full bg-brand-600 text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-brand-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-auto"
              >
                 {wallet.available < WITHDRAWAL_THRESHOLD ? `Locked (<$${WITHDRAWAL_THRESHOLD})` : 'Request Withdrawal'}
              </button>
           </div>

           {/* Escrow Card */}
           <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -mr-2 -mt-2"></div>
              <p className="text-sm font-medium text-gray-500 mb-1">Pending (Escrow)</p>
              <h2 className="text-3xl font-bold text-gray-900">${wallet.pending.toFixed(2)}</h2>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                 <p className="text-xs text-blue-800 leading-relaxed">
                    <span className="block mb-1">🛡️ <strong>Release Schedule:</strong></span>
                    Funds move to "Available" <strong>24h after Part 2</strong> of a live session is marked complete. Subscription revenue clears in 7 days.
                 </p>
              </div>
           </div>

            {/* Documents Card */}
           <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm font-medium text-gray-500 mb-4">Tax & Documents</p>
              <div className="space-y-3">
                 {['Sep 2024 Statement', 'Aug 2024 Statement', '2023 1099-K Form'].map((doc, i) => (
                     <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors cursor-pointer group border border-transparent hover:border-gray-100">
                        <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400 group-hover:text-black" />
                            <span className="text-sm text-gray-600 group-hover:text-black">{doc}</span>
                        </div>
                        <Download className="w-4 h-4 text-gray-300 group-hover:text-black" />
                     </div>
                 ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-4 text-center">
                 1099-K is generated automatically if you exceed the reporting threshold.
              </p>
           </div>
        </div>

        {/* Transaction History with Enterprise Logic */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
           <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-gray-900">Transaction Ledger</h3>
           </div>
           <table className="w-full text-sm text-left">
              <thead className="bg-white text-gray-500 font-medium border-b border-gray-100">
                 <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Source</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Net Amount</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50">
                       <td className="px-6 py-4 text-gray-500">{tx.date}</td>
                       <td className="px-6 py-4">
                          <span className="font-bold text-gray-900 block">{tx.sprintTitle}</span>
                          <span className="text-xs text-gray-500">{tx.studentName}</span>
                       </td>
                       <td className="px-6 py-4">
                          {tx.type === 'enterprise_royalty' ? (
                             <div className="flex flex-col">
                                <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-bold border border-purple-200 w-fit">
                                   <Building2 className="w-3 h-3" /> 30% Rev Share
                                </span>
                                <span className="text-[10px] text-gray-400 mt-1">Enterprise Plan</span>
                             </div>
                          ) : (
                             <span className="inline-flex items-center bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                                Direct Sale
                             </span>
                          )}
                       </td>
                       <td className="px-6 py-4">
                          <span className={`text-xs font-bold uppercase ${tx.status === 'released' ? 'text-green-600' : 'text-amber-600'}`}>
                             {tx.status}
                          </span>
                          {tx.status === 'escrowed' && tx.escrowReleaseAt && (
                             <span className="block text-[10px] text-gray-400 mt-0.5">Releases {tx.escrowReleaseAt}</span>
                          )}
                       </td>
                       <td className="px-6 py-4 text-right font-mono font-bold text-gray-900">
                          ${tx.netAmount.toFixed(2)}
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
     </div>
     );
  };

  const MarketingHub = () => ( <div>Marketing Content</div> ); 
  const EditorSidebar = () => ( 
     <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-[calc(100vh-64px)] overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
           <button onClick={() => setViewMode('dashboard')} className="flex items-center text-xs font-bold text-gray-500 hover:text-black mb-4">
              <ArrowLeft className="w-3 h-3 mr-1" /> Back to Dashboard
           </button>
           <h3 className="font-bold text-gray-900 truncate" title={selectedSprint?.title}>{selectedSprint?.title}</h3>
           
           <div className="mt-2">
              {selectedSprint?.reviewStatus === 'pending' && (
                 <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded">Under Review</span>
              )}
              {selectedSprint?.reviewStatus === 'changes_requested' && (
                 <span className="text-[10px] font-bold bg-red-100 text-red-800 px-2 py-1 rounded">Action Required</span>
              )}
              {(!selectedSprint?.reviewStatus || selectedSprint?.reviewStatus === 'draft') && (
                 <span className="text-[10px] font-bold bg-gray-200 text-gray-700 px-2 py-1 rounded">Draft</span>
              )}
              {selectedSprint?.reviewStatus === 'approved' && (
                 <span className="text-[10px] font-bold bg-green-100 text-green-800 px-2 py-1 rounded">Approved</span>
              )}
           </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
           {[
              { id: 'overview', label: 'Overview', icon: Layout },
              { id: 'curriculum', label: 'Curriculum', icon: ListChecks },
              { id: 'tasks', label: 'Action Tasks', icon: CheckSquare },
              { id: 'resources', label: 'Resources', icon: FileText },
              { id: 'outcomes', label: 'Outcomes Rubric', icon: TrendingUp },
              { id: 'quiz', label: 'Quiz Builder', icon:  ListChecks },
              { id: 'cohort', label: 'Cohort Tools', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: BarChart2 },
              { id: 'promote', label: 'Promote', icon: Megaphone },
              { id: 'quality', label: 'Publishing', icon: ShieldCheck }
           ].map(item => (
              <button 
                 key={item.id}
                 onClick={() => setEditorModule(item.id as any)}
                 className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    editorModule === item.id ? 'bg-white text-black shadow-sm ring-1 ring-gray-200' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                 }`}
              >
                 <item.icon className="w-4 h-4 mr-3" />
                 {item.label}
              </button>
           ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
           <button 
              onClick={saveSprint} 
              disabled={selectedSprint?.reviewStatus === 'pending'}
              className="w-full bg-black text-white py-2 rounded-lg text-sm font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
           >
              Save Changes
           </button>
        </div>
     </div>
  );

  const ModuleTasks = () => {
     if (!selectedSprint) return null;

     const addTask = () => {
        const newTask: SprintTask = {
           id: `t_${Date.now()}`,
           title: 'New Action Task',
           description: '',
           difficulty: 'medium',
           priority: 'medium',
           estimatedMinutes: 60,
           dueDaysAfterPart2: 3,
           proofType: 'text',
           isRequired: true,
           mentorReviewRequired: false
        };
        setSelectedSprint({
           ...selectedSprint,
           tasks: [...(selectedSprint.tasks || []), newTask]
        });
     };

     const updateTask = (id: string, field: keyof SprintTask, value: any) => {
        const updatedTasks = selectedSprint.tasks?.map(t => 
           t.id === id ? { ...t, [field]: value } : t
        ) || [];
        setSelectedSprint({ ...selectedSprint, tasks: updatedTasks });
     };

     const removeTask = (id: string) => {
        setSelectedSprint({
           ...selectedSprint,
           tasks: selectedSprint.tasks?.filter(t => t.id !== id) || []
        });
     };

     const getPriorityColor = (p: string) => {
        switch(p) {
           case 'high': return 'bg-red-100 text-red-700 border-red-200';
           case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
           case 'low': return 'bg-green-100 text-green-700 border-green-200';
           default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
     }

     return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
           <div className="flex justify-between items-center">
              <div>
                 <h2 className="text-2xl font-bold text-gray-900">Action Tasks</h2>
                 <p className="text-sm text-gray-500">Define the Proof of Work required for certification.</p>
              </div>
              <button onClick={addTask} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800">
                 <Plus className="w-4 h-4" /> Add Task
              </button>
           </div>

           <div className="space-y-4">
              {selectedSprint.tasks?.map((task, index) => (
                 <div key={task.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:border-gray-300 transition-all">
                    <div className="flex justify-between items-start mb-4">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-sm text-gray-500">
                             {index + 1}
                          </div>
                          <input 
                             type="text" 
                             value={task.title} 
                             onChange={(e) => updateTask(task.id, 'title', e.target.value)}
                             className="font-bold text-lg text-gray-900 border-none focus:ring-0 p-0 placeholder-gray-400 w-96"
                             placeholder="Task Title"
                          />
                       </div>
                       <button onClick={() => removeTask(task.id)} className="text-gray-400 hover:text-red-500">
                          <Trash2 className="w-5 h-5" />
                       </button>
                    </div>

                    <div className="pl-11 space-y-4">
                       <textarea 
                          value={task.description}
                          onChange={(e) => updateTask(task.id, 'description', e.target.value)}
                          className="w-full text-sm text-gray-600 border border-gray-200 rounded-lg p-3 focus:ring-black focus:border-black resize-none"
                          placeholder="Describe exactly what the student needs to do..."
                          rows={2}
                       />

                       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Difficulty</label>
                             <select 
                                value={task.difficulty}
                                onChange={(e) => updateTask(task.id, 'difficulty', e.target.value)}
                                className="w-full text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
                             >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                             </select>
                          </div>
                          <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Priority</label>
                             <select 
                                value={task.priority}
                                onChange={(e) => updateTask(task.id, 'priority', e.target.value)}
                                className="w-full text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
                             >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                             </select>
                          </div>
                          <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Est. Time (Min)</label>
                             <input 
                                type="number" 
                                value={task.estimatedMinutes}
                                onChange={(e) => updateTask(task.id, 'estimatedMinutes', parseInt(e.target.value))}
                                className="w-full text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
                             />
                          </div>
                          <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Due (Days after)</label>
                             <input 
                                type="number" 
                                value={task.dueDaysAfterPart2}
                                onChange={(e) => updateTask(task.id, 'dueDaysAfterPart2', parseInt(e.target.value))}
                                className="w-full text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
                             />
                          </div>
                          <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Proof Type</label>
                             <select 
                                value={task.proofType}
                                onChange={(e) => updateTask(task.id, 'proofType', e.target.value)}
                                className="w-full text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
                             >
                                <option value="file">File Upload</option>
                                <option value="link">URL Link</option>
                                <option value="text">Text Response</option>
                             </select>
                          </div>
                       </div>

                       {/* Priority Visual Indicator */}
                       <div className="flex items-center gap-2 mt-2">
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getPriorityColor(task.priority || 'medium')}`}>
                             {task.priority || 'medium'} Priority
                          </span>
                       </div>

                       <div className="flex items-center gap-6 pt-2 border-t border-gray-100">
                          <label className="flex items-center gap-2 cursor-pointer">
                             <div className={`w-10 h-5 rounded-full p-0.5 transition-colors ${task.isRequired ? 'bg-black' : 'bg-gray-200'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${task.isRequired ? 'translate-x-5' : 'translate-x-0'}`}></div>
                             </div>
                             <input 
                                type="checkbox" 
                                className="hidden" 
                                checked={task.isRequired} 
                                onChange={(e) => updateTask(task.id, 'isRequired', e.target.checked)}
                             />
                             <span className="text-sm font-medium text-gray-700">Required for Cert</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                             <div className={`w-10 h-5 rounded-full p-0.5 transition-colors ${task.mentorReviewRequired ? 'bg-purple-600' : 'bg-gray-200'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${task.mentorReviewRequired ? 'translate-x-5' : 'translate-x-0'}`}></div>
                             </div>
                             <input 
                                type="checkbox" 
                                className="hidden" 
                                checked={task.mentorReviewRequired || false} 
                                onChange={(e) => updateTask(task.id, 'mentorReviewRequired', e.target.checked)}
                             />
                             <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                Mentor Review <ShieldCheck className="w-3 h-3 text-purple-600" />
                             </span>
                          </label>
                       </div>
                    </div>
                 </div>
              ))}
              
              {(!selectedSprint.tasks || selectedSprint.tasks.length === 0) && (
                 <div className="text-center py-12 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl">
                    <p className="text-gray-500">No action tasks defined. Add tasks to build the student's Proof of Work.</p>
                 </div>
              )}
           </div>
        </div>
     );
  };

  const ModuleAnalytics = () => <div>Analytics Module Placeholder</div>; 
  const ModuleCurriculum = () => <div>Curriculum Module Placeholder</div>;
  const ModuleQuiz = () => <div>Quiz Module Placeholder</div>;
  const ModulePromote = () => <div>Promote Module Placeholder</div>;
  const ModuleQuality = () => <div>Quality Module Placeholder</div>;

  // -- Main Render --
  // ... (abbreviated for brevity, Logic remains identical to previous turn but using updated sub-components)
  if (viewMode === 'editor' && selectedSprint) {
     return (
        <div className="flex min-h-screen bg-white">
           <EditorSidebar />
           <div className="flex-1 p-8 overflow-y-auto h-[calc(100vh-64px)]">
              {editorModule === 'overview' && (
                 <div className="max-w-2xl mx-auto space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900">Session Series Overview</h2>
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                       <input 
                          className="w-full border-gray-300 rounded-lg p-2" 
                          value={selectedSprint.title}
                          onChange={e => setSelectedSprint({...selectedSprint, title: e.target.value})}
                          disabled={selectedSprint.reviewStatus === 'pending'}
                       />
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-1">Hook / Short Description</label>
                       <textarea 
                          className="w-full border-gray-300 rounded-lg p-2 h-24 resize-none" 
                          value={selectedSprint.shortDescription}
                          onChange={e => setSelectedSprint({...selectedSprint, shortDescription: e.target.value})}
                          disabled={selectedSprint.reviewStatus === 'pending'}
                       />
                    </div>
                    
                    {/* KPI Metrics Display */}
                    {selectedSprint.kpiMetrics && selectedSprint.kpiMetrics.length > 0 && (
                       <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                          <h4 className="font-bold text-blue-900 text-sm mb-2">Targeted KPIs (Gold Standard)</h4>
                          <div className="flex flex-wrap gap-2">
                             {selectedSprint.kpiMetrics.map((kpi, i) => (
                                <span key={i} className="bg-white text-blue-800 text-xs font-bold px-2 py-1 rounded border border-blue-200">{kpi}</span>
                             ))}
                          </div>
                       </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-1">Price (USD)</label>
                           <input type="number" className="w-full border-gray-300 rounded-lg p-2" value={selectedSprint.price} onChange={e => setSelectedSprint({...selectedSprint, price: parseInt(e.target.value)})} disabled={selectedSprint.reviewStatus === 'pending'} />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-1">Seats</label>
                           <input type="number" className="w-full border-gray-300 rounded-lg p-2" value={selectedSprint.maxSeats} onChange={e => setSelectedSprint({...selectedSprint, maxSeats: parseInt(e.target.value)})} disabled={selectedSprint.reviewStatus === 'pending'} />
                        </div>
                    </div>
                    
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Outcomes (Required for Profit Standard)</label>
                       <div className="space-y-2">
                          {selectedSprint.outcomes.map((o, i) => (
                             <div key={i} className="flex gap-2">
                                <input className="w-full border-gray-300 rounded p-2 text-sm" value={o} readOnly disabled={selectedSprint.reviewStatus === 'pending'} />
                                {selectedSprint.reviewStatus !== 'pending' && (
                                   <button onClick={() => setSelectedSprint({...selectedSprint, outcomes: selectedSprint.outcomes.filter((_, idx) => idx !== i)})} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4"/></button>
                                )}
                             </div>
                          ))}
                          {selectedSprint.reviewStatus !== 'pending' && (
                             <div className="flex gap-2">
                                <input id="new-outcome" className="w-full border-gray-300 rounded p-2 text-sm" placeholder="e.g. Build a 30-day forecast" onKeyDown={(e) => {
                                   if (e.key === 'Enter') {
                                      const val = (e.target as HTMLInputElement).value;
                                      if(val) {
                                         setSelectedSprint({...selectedSprint, outcomes: [...selectedSprint.outcomes, val]});
                                         (e.target as HTMLInputElement).value = '';
                                      }
                                   }
                                }}/>
                                <button onClick={() => {
                                   const el = document.getElementById('new-outcome') as HTMLInputElement;
                                   if(el.value) {
                                      setSelectedSprint({...selectedSprint, outcomes: [...selectedSprint.outcomes, el.value]});
                                      el.value = '';
                                   }
                                }} className="bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm font-bold hover:bg-gray-200">Add</button>
                             </div>
                          )}
                       </div>
                    </div>
                 </div>
              )}
              {editorModule === 'curriculum' && <ModuleCurriculum />}
              {editorModule === 'tasks' && <ModuleTasks />}
              {editorModule === 'quiz' && <ModuleQuiz />}
              {editorModule === 'quality' && <ModuleQuality />}
              {editorModule === 'analytics' && <ModuleAnalytics />}
              {editorModule === 'promote' && <ModulePromote />}
              {(editorModule === 'resources' || editorModule === 'cohort') && (
                 <div className="text-center py-12">
                    <p className="text-gray-400">Module under construction in this demo. For 'Resources' validation, use the mock data provided.</p>
                    {editorModule === 'resources' && (
                       <div className="mt-4 space-y-2">
                          {selectedSprint.resources.map(r => (
                             <div key={r.id} className="text-sm">{r.title} ({r.type})</div>
                          ))}
                          <button onClick={() => setSelectedSprint({...selectedSprint, resources: [...selectedSprint.resources, {id: `r_${Date.now()}`, title: 'New Resource', type: 'pdf', downloads: 0}]})} className="mt-2 bg-gray-100 px-4 py-2 rounded-sm">+ Add Resource</button>
                       </div>
                    )}
                 </div>
              )}
           </div>
        </div>
     );
  }

  if (viewMode === 'templates') {
     return <TemplateSelector />;
  }

  // Dashboard Mode
  return (
    <div className="p-8 max-w-7xl mx-auto min-h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <div className="flex items-center gap-2 mb-1">
             <h1 className="text-3xl font-bold text-gray-900">Partner Dashboard</h1>
             <span className="px-2 py-0.5 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-wider rounded">Studio</span>
           </div>
           <p className="text-gray-500">Manage your cohorts, track earnings, and build sessions.</p>
        </div>
        
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {['overview', 'wallet', 'marketing'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
                activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="animate-fade-in">
         {activeTab === 'overview' && <DashboardOverview />}
         {activeTab === 'wallet' && <WalletView />}
         {activeTab === 'marketing' && <MarketingHub />}
      </div>

      {/* Withdrawal Modal */}
      {showWithdrawalModal && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
               <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900">Initiate Payout</h3>
                  <button onClick={() => setShowWithdrawalModal(false)} className="text-gray-400 hover:text-black">
                     <X className="w-5 h-5" />
                  </button>
               </div>
               <div className="p-6 space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                     <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Available Balance</span>
                        <span className="font-bold text-gray-900">${wallet.available.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between text-xs text-gray-500">
                        <span>Threshold Met</span>
                        <span className="text-green-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Yes</span>
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">Amount to Withdraw</label>
                     <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                        <input 
                           type="number" 
                           placeholder={wallet.available.toFixed(2)} 
                           className="w-full pl-7 border-gray-300 rounded-lg p-2 text-sm focus:ring-black focus:border-black"
                           max={wallet.available}
                           value={withdrawalAmount}
                           onChange={(e) => setWithdrawalAmount(e.target.value)}
                        />
                        <button 
                           onClick={() => setWithdrawalAmount(wallet.available.toString())}
                           className="absolute right-2 top-2 text-xs font-bold text-brand-600 hover:underline"
                        >
                           Max
                        </button>
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">Payout Method</label>
                     <select className="w-full border-gray-300 rounded-lg p-2 text-sm focus:ring-black focus:border-black">
                        <option>Stripe Connect (Bank Transfer) •••• 4242</option>
                        <option>PayPal Payouts (user@example.com)</option>
                     </select>
                  </div>

                  <button 
                     onClick={handleWithdrawalRequest}
                     disabled={withdrawalProcessing || (parseFloat(withdrawalAmount) > wallet.available)}
                     className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                     {withdrawalProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Withdrawal'}
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default TrainerStudio;