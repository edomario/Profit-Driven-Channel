
import React, { useState, useRef, useEffect } from 'react';
import { Globe, Menu, ChevronDown, Search, LogOut, X, LayoutDashboard, BookOpen, Video, Users, CreditCard } from 'lucide-react';
import { ViewState, User as UserType, RegionCode } from '../types';
import { useLocalization } from '../contexts/LocalizationContext';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  lang: Language;
  user: UserType | null;
  onLogout: () => void;
  categories: any[];
  onSearch: (query: string) => void;
  onCategorySelect: (key: string) => void;
}

const AVAILABLE_REGIONS: RegionCode[] = ['GLOBAL', 'US', 'GB', 'FR', 'UG', 'KE', 'NG', 'IN'];

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, user, onLogout, categories, onSearch, onCategorySelect }) => {
  const { locale, setRegion, t } = useLocalization();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setIsMegaMenuOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const navigate = (view: ViewState) => {
    setView(view);
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  };

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-surface-container/95 backdrop-blur-sm border-b border-white/50 h-[72px] flex items-center shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-4">
          
          {/* Left: Logo & Menu Trigger */}
          <div className="flex items-center gap-6">
            {/* Mobile Menu Icon */}
            <button 
               className="md:hidden p-3 rounded-full hover:bg-surface-variant/50 text-on-surface transition-colors ripple"
               onClick={() => setIsMobileMenuOpen(true)}
             >
                <Menu className="w-6 h-6" />
             </button>

            <div 
              className="flex items-center cursor-pointer gap-3" 
              onClick={() => navigate('landing')}
            >
              <div className="w-10 h-10 bg-primary-container text-on-primary-container rounded-xl flex items-center justify-center shadow-sm">
                 <span className="font-bold text-xl">P</span>
              </div>
              <span className="font-medium text-xl tracking-tight text-on-surface hidden sm:block">Profit Channel</span>
            </div>

            {/* Desktop Categories Pill */}
            <div className="hidden md:block relative" ref={menuRef}>
               <button 
                  className={`flex items-center gap-2 text-sm font-medium py-2 px-4 rounded-full transition-all border ${isMegaMenuOpen ? 'bg-secondary-container text-on-secondary-container border-transparent' : 'bg-surface border-outline/20 text-on-surface-variant hover:bg-surface-variant/30'}`}
                  onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
               >
                  {t('nav.courses')} <ChevronDown className={`w-4 h-4 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
               </button>

               {/* Mega Menu (M3 Surface) */}
               {isMegaMenuOpen && (
                  <div className="absolute top-full left-0 w-[600px] bg-surface rounded-2xl shadow-elevation-3 mt-3 p-2 overflow-hidden z-50 animate-in fade-in zoom-in-95 origin-top-left border border-outline/10">
                     <div className="grid grid-cols-2 gap-2">
                        {categories.map((cat) => (
                           <button 
                              key={cat.key}
                              onClick={() => { onCategorySelect(cat.key); setIsMegaMenuOpen(false); }}
                              className="group text-left px-4 py-3 rounded-xl hover:bg-surface-variant/30 hover:text-primary text-sm font-medium text-on-surface flex items-center gap-3 transition-all duration-200"
                           >
                              <span className="text-xl transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3">{cat.icon}</span> 
                              <span>{cat.name}</span>
                           </button>
                        ))}
                     </div>
                     <div className="mt-2 pt-2 border-t border-outline/10 px-2 pb-1">
                        <button 
                           onClick={() => navigate('catalog')}
                           className="w-full text-center py-2.5 rounded-full text-sm font-bold text-primary hover:bg-primary-container/30 transition-colors"
                        >
                           View all courses
                        </button>
                     </div>
                  </div>
               )}
            </div>
          </div>

          {/* Middle: M3 Search Bar */}
          <div className="hidden lg:block flex-1 max-w-md mx-4">
             <form onSubmit={handleSearchSubmit} className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <Search className="w-5 h-5 text-on-surface-variant/70" />
                </div>
                <input 
                   type="text" 
                   placeholder="Search..." 
                   className="w-full pl-12 pr-4 py-3 bg-surface-variant/40 hover:bg-surface-variant/60 focus:bg-surface-variant/80 border-none rounded-full text-on-surface text-base placeholder-on-surface-variant/70 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                />
             </form>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 md:gap-4">
             {/* Region Pill */}
             <div className="hidden md:flex items-center">
                <div className="group relative">
                   <button className="flex items-center gap-2 text-sm text-on-surface-variant hover:bg-surface-variant/30 rounded-full px-3 py-1.5 transition-colors border border-outline/20">
                      <Globe className="w-4 h-4" />
                      <span className="font-medium">{locale.country}</span>
                   </button>
                   {/* Region Dropdown */}
                   <div className="absolute top-full right-0 mt-2 w-40 bg-surface rounded-xl shadow-elevation-2 overflow-hidden z-20 hidden group-hover:block py-2">
                      {AVAILABLE_REGIONS.map(r => (
                         <button 
                            key={r}
                            onClick={() => setRegion(r)}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-container flex items-center justify-between ${locale.country === r ? 'text-primary font-bold' : 'text-on-surface'}`}
                         >
                            {r}
                         </button>
                      ))}
                   </div>
                </div>
             </div>

             {user ? (
               <div className="flex items-center gap-2">
                  <div className="hidden md:flex flex-col items-end mr-2">
                     <span className="text-sm font-bold text-on-surface leading-none">{user.name}</span>
                     <span className="text-[10px] text-on-surface-variant">{user.role}</span>
                  </div>
                  <button 
                     onClick={() => navigate('dashboard')}
                     className="w-10 h-10 rounded-full overflow-hidden border-2 border-surface shadow-sm hover:ring-2 hover:ring-primary transition-all"
                  >
                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                  </button>
               </div>
             ) : (
               <div className="flex items-center gap-2">
                  <button 
                     onClick={() => navigate('login')}
                     className="text-sm font-medium text-primary hover:bg-primary-container/30 px-4 py-2 rounded-full transition-colors"
                  >
                     {t('nav.login')}
                  </button>
                  <button 
                     onClick={() => navigate('signup')}
                     className="bg-primary text-on-primary px-5 py-2 rounded-full text-sm font-medium hover:shadow-elevation-1 hover:bg-primary/90 transition-all"
                  >
                     {t('nav.get_started')}
                  </button>
               </div>
             )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer (Redesigned) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end font-sans">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Drawer Container */}
          <div className="relative w-[85%] max-w-[320px] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white">
               {user ? (
                 <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-gray-200" />
                    <div>
                       <p className="font-bold text-gray-900 text-sm leading-tight">{user.name}</p>
                       <p className="text-xs text-gray-500 capitalize">{user.role.replace('_', ' ')}</p>
                    </div>
                 </div>
               ) : (
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold">P</div>
                    <span className="text-lg font-bold text-gray-900 tracking-tight">Profit Channel</span>
                 </div>
               )}
               <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
               >
                  <X className="w-6 h-6" />
               </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto py-2">
               <div className="px-3 space-y-1">
                  {/* Navigation Items */}
                  {[
                     { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, show: !!user },
                     { id: 'catalog', label: t('nav.courses'), icon: BookOpen, show: true },
                     { id: 'live_schedule', label: t('nav.live'), icon: Video, show: true },
                     { id: 'consultant_marketplace', label: t('nav.experts'), icon: Users, show: true },
                     { id: 'pricing', label: t('nav.pricing'), icon: CreditCard, show: true },
                  ].filter(l => l.show).map(link => (
                     <button 
                        key={link.id}
                        onClick={() => navigate(link.id as ViewState)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${currentView === link.id ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                     >
                        {link.icon && <link.icon className="w-5 h-5" />}
                        {link.label}
                     </button>
                  ))}
               </div>

               {/* Divider */}
               <div className="my-4 border-t border-gray-100 mx-5"></div>

               {/* Preferences */}
                <div className="px-5 space-y-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Settings</p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 font-medium">Region</span>
                        <div className="flex gap-2">
                           {['GLOBAL', 'US', 'UG'].map(r => (
                              <button 
                                 key={r}
                                 onClick={() => setRegion(r as RegionCode)}
                                 className={`text-[10px] font-bold px-2 py-1 rounded border ${locale.country === r ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200'}`}
                              >
                                 {r}
                              </button>
                           ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="p-5 border-t border-gray-100 bg-gray-50 mt-auto">
               {user ? (
                  <button 
                     onClick={onLogout}
                     className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-red-600 bg-white border border-red-100 hover:bg-red-50 rounded-xl transition-colors shadow-sm"
                  >
                     <LogOut className="w-5 h-5" /> Sign Out
                  </button>
               ) : (
                  <div className="grid grid-cols-2 gap-3">
                     <button onClick={() => navigate('login')} className="px-4 py-3 rounded-xl text-sm font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 shadow-sm">
                        Log In
                     </button>
                     <button onClick={() => navigate('signup')} className="px-4 py-3 rounded-xl text-sm font-bold text-white bg-black hover:bg-gray-800 shadow-md">
                        Sign Up
                     </button>
                  </div>
               )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
