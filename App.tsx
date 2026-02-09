
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Diagnostic from './components/Diagnostic'; 
import ActionPlanGenerator from './components/ActionPlanGenerator';
import Catalog from './components/Marketplace'; 
import ConsultantMarketplace from './components/ConsultantMarketplace'; 
import CategoryPage from './components/CategoryPage';
import SprintDetail from './components/SprintDetail';
import SearchPage from './components/SearchPage';
import Onboarding from './components/Onboarding';
import SecondBrain from './components/SecondBrain'; 
import LearningLocker from './components/LearningLocker';
import TrainerStudio from './components/TrainerStudio';
import TrainerStudents from './components/TrainerStudents';
import ConsultantDashboard from './components/ConsultantDashboard';
import ConsultantProfile from './components/ConsultantProfile';
import ConsultantOnboarding from './components/ConsultantOnboarding';
import CompanyProfile from './components/CompanyProfile';
import AdminDashboard from './components/AdminDashboard';
import AdManager from './components/AdManager';
import LiveSessionRoom from './components/LiveSessionRoom';
import LiveSchedule from './components/LiveSchedule';
import Auth from './components/Auth';
import Settings from './components/Settings';
import BlogFeed from './components/BlogFeed';
import BlogEditor from './components/BlogEditor';
import PaymentModal from './components/PaymentModal';
import AIAdStudio from './components/AIAdStudio';
import ReportView from './components/ReportView'; 
import HRReportView from './components/HRReportView'; 
import PricingPage from './components/PricingPage';
import PartnerLanding from './components/PartnerLanding'; 
import PartnerDashboard from './components/PartnerDashboard';
import PartnerPricing from './components/PartnerPricing';
import FixMode from './components/FixMode';
import MissionBrief from './components/MissionBrief'; // New
import { ViewState, User, BlogPost, Course, Category, CheckoutItem, Archetype, GeneratedReport, FixPlan } from './types';
import { LocalizationProvider } from './contexts/LocalizationContext';

// Mock Data
const CATEGORIES: Category[] = [
  { id: '1', key: 'finance', name: 'Wealth & Capital', description: 'Master asset allocation.', icon: '💰' },
  { id: '2', key: 'business', name: 'Business Systems', description: 'Operational excellence.', icon: '💼' },
];
const EXTENDED_COURSES: Course[] = [
  {
    id: 'c1', slug: 'saas-economics', title: 'The Portfolio Blueprint', shortPromise: 'Protect capital first.',
    instructor: { id: 't1', name: 'Michael V.', title: 'Fund Manager', avatar: '', rating: 4.9, reviewsCount: 840, verified: true },
    price: 499, currency: 'USD', category: 'Wealth & Capital', thumbnail: 'https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=400',
    rating: 4.9, reviewsCount: 840, level: 'Intermediate', language: 'English', duration: '4 Weeks', format: 'Live Session',
    outcomes: [], roiStats: [], proofOfWork: [], syllabus: [], resourcesIncluded: [], upcomingSessions: [], badges: [], enterpriseEligible: true
  }
];

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>('landing');
  const [lang] = useState({ code: 'en', name: 'English', flag: '🇺🇸' });
  const [user, setUser] = useState<User | null>(null);
  
  // Navigation State
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [checkoutItem, setCheckoutItem] = useState<CheckoutItem | null>(null);

  // Router Logic
  const handleAuthSuccess = (loggedInUser: User) => {
     setUser(loggedInUser);
     if (currentView === 'diagnostic_result') setView('dashboard');
     else if (loggedInUser.role === 'partner') setView('partner_dashboard');
     else setView('dashboard');
  };

  const handleLogout = () => {
     setUser(null);
     setView('landing');
  };

  const handleDiagnosticComplete = (archetype: Archetype, scores: any, planType: 'basic' | 'premium', report?: GeneratedReport) => {
     if (user) {
        setUser({ ...user, archetype, pillarScores: scores, planType, latestReport: report });
        // Go to Mission Brief first instead of full report
        if (report) setView('mission_brief');
        else setView('dashboard');
     } else {
        const tempUser: User = {
           id: 'temp_user',
           name: 'Guest User',
           role: 'student',
           avatar: 'https://ui-avatars.com/api/?name=Guest',
           archetype,
           pillarScores: scores,
           status: 'approved',
           planType, 
           latestReport: report
        };
        setUser(tempUser);
        if (report) setView('mission_brief');
        else setView('dashboard');
     }
  };

  const handleStartFixPlan = (plan: FixPlan) => {
     if (user) {
        setUser({ ...user, activeFixPlan: plan });
        setView('fix_mode');
     }
  };

  const renderView = () => {
    if (!user && ['auth', 'login', 'signup'].includes(currentView)) {
       return <Auth onLogin={handleAuthSuccess} initialMode={currentView === 'signup' ? 'signup' : 'login'} />;
    }

    switch (currentView) {
      case 'landing': return <Hero onSearch={handleSearch} onCourseClick={handleCourseSelect} onCategoryClick={handleCategorySelect} onViewSchedule={() => setView('live_schedule')} onStartDiagnostic={() => setView('diagnostic')} courses={EXTENDED_COURSES} categories={CATEGORIES} />;
      case 'diagnostic': return <Diagnostic onComplete={handleDiagnosticComplete} variant="owner" />;
      case 'tribe_diagnostic': return <Diagnostic onComplete={(arch) => alert(`Employee Profile: ${arch}`)} variant="employee" />;
      case 'catalog': return <Catalog categories={CATEGORIES} trendingCourses={EXTENDED_COURSES} onCategoryClick={handleCategorySelect} onCourseClick={handleCourseSelect} onSearch={handleSearch} user={user} onViewPricing={() => setView('pricing')} />;
      case 'consultant_marketplace': return <ConsultantMarketplace onConsultantClick={() => setView('consultant_profile')} onSessionClick={() => setView('live_session')} user={user} />;
      case 'category': return selectedCategory ? <CategoryPage category={selectedCategory} courses={EXTENDED_COURSES} onCourseClick={handleCourseSelect} /> : null;
      case 'course': return selectedCourse ? <SprintDetail course={selectedCourse} onEnroll={handleCheckout} user={user} onBack={() => setView('catalog')} /> : null;
      case 'search': return <SearchPage query={searchQuery} onCourseClick={handleCourseSelect} />;
      case 'pricing': return <PricingPage onStartScan={() => setView('diagnostic')} onRequestDemo={() => setView('company_profile')} onCheckout={handleCheckout} />;
      case 'blog_feed': return <BlogFeed onRead={() => {}} posts={[]} user={user} onCreatePost={() => setView('blog_editor')} />;
      case 'blog_editor':
        return user
          ? <BlogEditor onBack={() => setView('blog_feed')} onPublish={(_post) => setView('blog_feed')} />
          : <Auth onLogin={handleAuthSuccess} initialMode="login" />;
      case 'live_schedule': return <LiveSchedule onBook={handleCheckout} />;
      case 'consultant_profile': return <ConsultantProfile onBook={handleCheckout} />;
      case 'company_profile': return <CompanyProfile />;
      case 'partner_landing': return <PartnerLanding onJoin={() => setView('signup')} onLogin={() => setView('login')} />;
      case 'partner_pricing': return <PartnerPricing mode="seo" onSignup={() => setView('signup')} />;
    }

    if (!user) return <Auth onLogin={handleAuthSuccess} />;

    switch (currentView) {
      case 'dashboard': return <Dashboard user={user} onViewCourse={handleCourseSelect} onLaunchTribe={() => setView('tribe_diagnostic')} onViewHRReport={() => setView('hr_report')} />;
      case 'report_view': return user.latestReport ? <ReportView report={user.latestReport} onBack={() => setView('dashboard')} onStartFix={handleStartFixPlan} /> : <Dashboard user={user} onViewCourse={handleCourseSelect} onLaunchTribe={() => setView('tribe_diagnostic')} onViewHRReport={() => setView('hr_report')} />;
      case 'mission_brief': return user.latestReport ? <MissionBrief report={user.latestReport} onUnlock={handleCheckout} /> : <Dashboard user={user} onViewCourse={handleCourseSelect} onLaunchTribe={() => setView('tribe_diagnostic')} onViewHRReport={() => setView('hr_report')} />;
      case 'fix_mode': return user.activeFixPlan ? <FixMode user={user} onUpdateUser={setUser} onBack={() => setView('dashboard')} /> : <Dashboard user={user} onViewCourse={handleCourseSelect} onLaunchTribe={() => setView('tribe_diagnostic')} onViewHRReport={() => setView('hr_report')} />;
      case 'hr_report': return <HRReportView onBack={() => setView('dashboard')} />;
      case 'consultant_dashboard': return <ConsultantDashboard />;
      case 'partner_dashboard': return <PartnerDashboard />;
      case 'studio': return <TrainerStudio user={user} onLaunchLive={() => setView('live_session')} onNavigate={(view) => setView(view)} />;
      case 'students': return <TrainerStudents />;
      case 'ad_manager': return <AdManager user={user} />;
      case 'billing': return <Settings />;
      case 'clients': return <ConsultantDashboard />;
      case 'consultant_onboarding': return <ConsultantOnboarding user={user} onComplete={() => setView('consultant_dashboard')} />;
      case 'company_profile': return <CompanyProfile />;
      case 'team': return <Settings />;
      case 'admin_dashboard': return <AdminDashboard initialTab="users" />;
      case 'admin_verifications': return <AdminDashboard initialTab="users" />;
      case 'blog_editor': return <BlogEditor onBack={() => setView('blog_feed')} onPublish={(_post) => setView('blog_feed')} />;
      case 'live_session': return <LiveSessionRoom user={user} onExit={() => setView('live_schedule')} />;
      case 'action_lab': return <ActionPlanGenerator />;
      case 'second_brain': return <SecondBrain />; 
      case 'ai_ad_studio': return <AIAdStudio user={user} />;
      case 'locker': return <LearningLocker />;
      case 'settings': return <Settings />;
      case 'catalog': return <Catalog categories={CATEGORIES} trendingCourses={EXTENDED_COURSES} onCategoryClick={handleCategorySelect} onCourseClick={handleCourseSelect} onSearch={handleSearch} user={user} onViewPricing={() => setView('pricing')} />;
      default: return <Dashboard user={user} onViewCourse={handleCourseSelect} onLaunchTribe={() => setView('tribe_diagnostic')} onViewHRReport={() => setView('hr_report')} />;
    }
  };

  const handleSearch = (q: string) => { setSearchQuery(q); setView('search'); };
  const handleCategorySelect = (k: string) => { 
     if(k==='all') { setView('catalog'); } else { const c = CATEGORIES.find(cat=>cat.key===k); if(c){setSelectedCategory(c); setView('category');} }
  };
  const handleCourseSelect = (slug: string) => { const c = EXTENDED_COURSES.find(x=>x.slug===slug); if(c){setSelectedCourse(c); setView('course');} };
  const handleCheckout = (i: CheckoutItem) => { if(!user) setView('login'); else setCheckoutItem(i); };

  const isPublicLayout = !user || ['landing', 'auth', 'login', 'signup', 'diagnostic', 'tribe_diagnostic', 'catalog', 'pricing', 'search', 'consultant_profile', 'report_view', 'hr_report', 'partner_landing', 'partner_pricing', 'fix_mode', 'mission_brief'].includes(currentView);

  return (
    <LocalizationProvider>
      <div className="h-full bg-surface-container flex flex-col font-sans text-on-surface">
        {currentView !== 'live_session' && currentView !== 'diagnostic' && currentView !== 'tribe_diagnostic' && currentView !== 'report_view' && currentView !== 'hr_report' && currentView !== 'partner_landing' && currentView !== 'fix_mode' && currentView !== 'mission_brief' && (
          <Navbar 
            currentView={currentView} 
            setView={setView} 
            lang={lang} 
            user={user}
            onLogout={handleLogout}
            categories={CATEGORIES}
            onSearch={handleSearch}
            onCategorySelect={handleCategorySelect}
          />
        )}
        
        <div className="flex flex-1 max-w-[100%] mx-auto w-full overflow-hidden">
          {!isPublicLayout && user && (
            <Sidebar 
              currentView={currentView} 
              setView={setView} 
              userRole={user.role} 
            />
          )}
          
          <main className={`flex-1 w-full overflow-y-auto ${!isPublicLayout ? 'bg-surface-container' : ''}`}>
            {renderView()}
          </main>
        </div>

        {checkoutItem && (
           <PaymentModal 
              item={checkoutItem} 
              isOpen={!!checkoutItem} 
              onClose={() => setCheckoutItem(null)} 
              onConfirm={() => {
                 setCheckoutItem(null);
                 if (checkoutItem.id === 'report_unlock') {
                    setView('report_view'); // Unlock success -> go to full report
                 }
              }} 
              user={user} 
           />
        )}
      </div>
    </LocalizationProvider>
  );
};

export default App;
