
import React, { useState, useMemo } from 'react';
import {
   Radar,
   RadarChart,
   PolarGrid,
   PolarAngleAxis,
   PolarRadiusAxis,
   ResponsiveContainer,
   BarChart,
   Bar,
   XAxis,
   YAxis,
   Tooltip,
   CartesianGrid
} from 'recharts';
import {
   Zap,
   TrendingUp,
   ShieldCheck,
   Brain,
   MessageSquare,
   ArrowRight,
   Lock,
   Download,
   AlertTriangle,
   Bot,
   Send,
   Users,
   Trophy,
   Share2,
   Globe,
   Award,
   Loader2,
   PieChart,
   RefreshCw,
   Sliders,
   DollarSign,
   Calendar,
   Clock,
   Activity,
   Info,
   X
} from 'lucide-react';
import { User, PillarScores } from '../types';
import { getGeminiClient } from '../services/gemini';
import { useLocalization } from '../contexts/LocalizationContext';

interface DashboardProps {
   user: User;
   onViewCourse?: (id: string) => void;
   onLaunchTribe?: () => void;
   onViewHRReport?: () => void;
}

// --- Benchmark Modal Component ---
const BenchmarkModal = ({ isOpen, onClose, t, locale }: { isOpen: boolean; onClose: () => void; t: any; locale: any }) => {
   if (!isOpen) return null;
   return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in-95">
         <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
               <h3 className="font-bold text-gray-900">{t('benchmark.modal.title')}</h3>
               <button onClick={onClose} className="text-gray-400 hover:text-black"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-6 text-sm text-gray-600">
               <div>
                  <h4 className="font-bold text-gray-900 mb-1">{t('benchmark.modal.cohortTitle')}</h4>
                  <p>{t('benchmark.modal.cohortBody').replace('{countryName}', locale.country).replace('{industryLabel}', 'SME').replace('{sizeBand}', '1-100 Emp')}</p>
               </div>
               <div>
                  <h4 className="font-bold text-gray-900 mb-1">{t('benchmark.modal.metricTitle')}</h4>
                  <p>{t('benchmark.modal.metricBody')}</p>
               </div>
               <div>
                  <h4 className="font-bold text-gray-900 mb-1">{t('benchmark.modal.confidenceTitle')}</h4>
                  <p>{t('benchmark.modal.confidenceBody')}</p>
               </div>
               <div>
                  <h4 className="font-bold text-gray-900 mb-1">{t('benchmark.modal.updateTitle')}</h4>
                  <p>{t('benchmark.modal.updateBody')}</p>
               </div>
            </div>
            <div className="p-4 bg-gray-50 text-xs text-center text-gray-500 border-t border-gray-100 italic">
               {t('benchmark.modal.footer')}
            </div>
         </div>
      </div>
   );
};

const Dashboard: React.FC<DashboardProps> = ({ user, onViewCourse, onLaunchTribe, onViewHRReport }) => {
   const { t, price, locale, setCurrency, setLanguage } = useLocalization();
   const isBasicPlan = user.planType === 'basic';
   const [showBenchModal, setShowBenchModal] = useState(false);

   // --- 1. DATA PREP ---
   const scores = user.pillarScores || {
      operations: 50, money: 20, market: 60, leadership: 80, innovation: 40, risk: 30, people: 0
   };

   // Prepare localized tooltips for Radar
   const radarData = Object.keys(scores).map(key => {
      const k = key as keyof typeof scores;
      return {
         subject: t(`pillar.${String(k)}`.toLowerCase()), // "Engine"
         key: k,
         A: scores[k],
         fullMark: 100,
         tooltip: t(`tooltip.${String(k)}.meaning`)
      };
   });

   // Derived Metrics
   const sortedPillars = Object.entries(scores).sort(([, a], [, b]) => (a as number) - (b as number));
   const criticalPillar = sortedPillars[0]; // [name, score]
   const topStrength = sortedPillars[sortedPillars.length - 1];

   // Benchmark Logic (Mock Cohort)
   const cohortSize = 450;
   const weightedScore = (
      (scores.money * 1.5) + (scores.operations * 1.2) + (scores.market * 1.2) +
      scores.leadership + scores.innovation + scores.risk + scores.people
   ) / 7.9; // Sum of weights

   const percentile = Math.min(99, Math.round((weightedScore / 100) * 100)); // Simplified rank
   const isLeader = percentile > 80;

   // --- 2. SIMULATOR STATE (DYNAMIC) ---
   // Baseline Defaults
   const [baselineRevenue, setBaselineRevenue] = useState(100000); // Monthly
   const [baselineMargin, setBaselineMargin] = useState(20); // %

   // Dynamic Levers based on Spec 5.2
   // LEVER MAPPING
   const LEVER_MAPPING: Record<string, string[]> = {
      money: ['costControl', 'price', 'retention'],
      operations: ['efficiency', 'teamSpeed', 'costControl'],
      market: ['conversion', 'retention', 'price'],
      innovation: ['quality', 'conversion', 'retention'],
      risk: ['riskReduction', 'costControl', 'teamSpeed'],
      leadership: ['teamSpeed', 'efficiency', 'conversion'],
      people: ['teamSpeed', 'efficiency', 'retention']
   };

   const activeLeverKeys = LEVER_MAPPING[String(criticalPillar[0]).toLowerCase()] || ['price', 'conversion', 'retention'];

   // Lever Values State (0-100 scale representing % improvement)
   const [leverValues, setLeverValues] = useState<Record<string, number>>({
      price: 0, conversion: 0, retention: 0, efficiency: 0,
      costControl: 0, quality: 0, riskReduction: 0, teamSpeed: 0
   });

   // Simulator Math (Spec 4.3 + Refined)
   const calculateProjection = () => {
      // Revenue Drivers: Price, Conversion, Retention, Quality (reduces churn/refunds -> net rev), Risk (protects loss)
      // Margin Drivers: Cost Control, Efficiency, Price

      // 1. Revenue Multipliers
      const revMult_Price = 1 + (leverValues.price || 0) / 100;
      const revMult_Conv = 1 + (leverValues.conversion || 0) / 100;
      const revMult_Ret = 1 + (leverValues.retention || 0) / 100;
      const revMult_Qual = 1 + (leverValues.quality || 0) / 200; // Half impact on rev

      const rawRevMult = revMult_Price * revMult_Conv * revMult_Ret * revMult_Qual;
      // Dampening
      const effectiveRevMult = 1 + (rawRevMult - 1) * 0.75;

      const newRevenue = baselineRevenue * effectiveRevMult;

      // 2. Margin Impact
      // Price increases margin directly.
      // Cost Control increases margin directly.
      // Efficiency increases margin (lower COGS/OpEx).
      const marginImpact_Price = (leverValues.price || 0) * 0.5; // Half of price hike goes to margin
      const marginImpact_Cost = (leverValues.costControl || 0) * 0.8; // Direct cost savings
      const marginImpact_Eff = (leverValues.efficiency || 0) * 0.4; // Efficiency gains

      const newMarginPercent = baselineMargin + marginImpact_Price + marginImpact_Cost + marginImpact_Eff;

      // 3. Profit
      const currentProfit = baselineRevenue * (baselineMargin / 100);
      const newProfit = newRevenue * (newMarginPercent / 100);

      return {
         revenue: newRevenue,
         profit: newProfit,
         delta: newProfit - currentProfit
      };
   };

   const projection = calculateProjection();

   // Find biggest lever for explanation
   const biggestLeverKey = activeLeverKeys.reduce((a, b) => (leverValues[a] > leverValues[b] ? a : b));
   const biggestLeverName = t(`sim.slider.${biggestLeverKey}`);

   // --- 3. AI STATE ---
   const [chatQuery, setChatQuery] = useState('');
   const [chatResponse, setChatResponse] = useState('');
   const [aiLoading, setAiLoading] = useState(false);

   const handleAskAI = async () => {
      if (isBasicPlan) { alert("Upgrade to Premium to unlock Boardroom AI."); return; }
      if (!chatQuery) return;
      setAiLoading(true);
      setChatResponse('');

      try {
         const ai = await getGeminiClient({ promptForKey: true });
         if (!ai) {
            setChatResponse("AI key not configured. Select a key to continue.");
            return;
         }

         const systemContext = `You are a Pocket COO. User scores: ${JSON.stringify(scores)}. Critical: ${String(criticalPillar[0])}. Advice must be numeric and ruthless.`;

         const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: chatQuery,
            config: { systemInstruction: systemContext }
         });
         setChatResponse(response.text || "Analysis complete.");
      } catch (e) {
         console.error(e);
         setChatResponse("AI Connection failed.");
      } finally {
         setAiLoading(false);
      }
   };

   const handleDownloadBadge = () => {
      alert(`Downloading 'Top ${100 - percentile}% Industry Leader' Badge...`);
   };

   // Custom Radar Tooltip
   const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
         const data = payload[0].payload;
         return (
            <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-200 max-w-xs">
               <p className="font-bold text-gray-900 mb-1">{data.subject}: {data.A}/100</p>
               <p className="text-xs text-gray-500 mb-3">{data.tooltip}</p>

               <div className="bg-blue-50 p-2 rounded border border-blue-100 mb-2">
                  <p className="text-[10px] font-bold text-blue-800 uppercase mb-1">If Weak (Leak)</p>
                  <p className="text-xs text-blue-900 leading-tight">{t(`tooltip.${data.key.toLowerCase()}.weakLeak`)}</p>
               </div>

               <div className="bg-green-50 p-2 rounded border border-green-100">
                  <p className="text-[10px] font-bold text-green-800 uppercase mb-1">Quick Fix</p>
                  <p className="text-xs text-green-900 leading-tight">{t(`tooltip.${data.key.toLowerCase()}.weekFix`)}</p>
               </div>
            </div>
         );
      }
      return null;
   };

   return (
      <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-full font-sans text-slate-900">

         {/* --- A. TOP BAR (HUD HEADER) --- */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
                  {user.company ? user.company[0] : user.name[0]}
               </div>
               <div>
                  <h1 className="text-xl font-bold text-gray-900 leading-none mb-1">
                     {t('hud.title')}
                  </h1>
                  <p className="text-xs font-medium text-gray-500">
                     {t('hud.subtitle').replace('{businessName}', user.company || 'My Business').replace('{industryLabel}', 'Retail').replace('{countryName}', locale.country)}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                     <Clock className="w-3 h-3" />
                     <span>{t('hud.lastUpdated').replace('{date}', new Date().toLocaleDateString())}</span>
                     <button className="text-brand-600 hover:underline flex items-center gap-1 ml-2">
                        <RefreshCw className="w-3 h-3" /> {t('hud.refresh')}
                     </button>
                  </div>
               </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
               {/* Global Selectors */}
               <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
                  <Globe className="w-4 h-4 text-gray-400 ml-2" />
                  <select
                     className="bg-transparent border-none text-xs font-bold text-gray-700 focus:ring-0 cursor-pointer"
                     value={locale.language}
                     onChange={(e) => setLanguage(e.target.value as any)}
                  >
                     <option value="en">English</option>
                     <option value="fr">Français</option>
                     <option value="sw">Swahili</option>
                  </select>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <select
                     className="bg-transparent border-none text-xs font-bold text-gray-700 focus:ring-0 cursor-pointer"
                     value={locale.currency}
                     onChange={(e) => setCurrency(e.target.value as any)}
                  >
                     <option value="USD">USD</option>
                     <option value="EUR">EUR</option>
                     <option value="GBP">GBP</option>
                     <option value="UGX">UGX</option>
                     <option value="KES">KES</option>
                     <option value="NGN">NGN</option>
                  </select>
               </div>

               <button
                  onClick={() => onViewCourse?.('fix-critical')}
                  className="bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 shadow-lg shadow-red-200 flex items-center gap-2 animate-pulse"
                  title={t('hud.primaryCta_helper')}
               >
                  <AlertTriangle className="w-4 h-4" /> {t('hud.primaryCta')}
               </button>
            </div>
         </div>

         {/* --- B. MAIN GRID --- */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">

            {/* 1. RADAR CHART (Left 8 cols) */}
            <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-8 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>

               <div className="flex-1 min-h-[300px]">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
                           <Activity className="w-5 h-5 text-gray-400" /> {t('radar.title')}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">{t('radar.subtitle')}</p>
                     </div>
                     <div className="flex gap-2 text-xs font-medium">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-black"></span> You</span>
                        <span className="flex items-center gap-1 text-gray-400"><span className="w-2 h-2 rounded-full bg-gray-300"></span> Goal</span>
                     </div>
                  </div>

                  <ResponsiveContainer width="100%" height="100%">
                     <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 11, fontWeight: 'bold' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                        <Radar name="My Business" dataKey="A" stroke="#000000" fill="#000000" fillOpacity={0.1} />
                        <Radar name="Goal" dataKey="fullMark" stroke="transparent" fill="#f3f4f6" fillOpacity={0.3} />
                        <Tooltip content={<CustomTooltip />} />
                     </RadarChart>
                  </ResponsiveContainer>
               </div>

               <div className="w-full md:w-64 flex flex-col justify-center space-y-6 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">

                  {/* Critical Weakness */}
                  <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                     <p className="text-xs font-bold text-red-800 uppercase tracking-wide mb-1 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> {t('radar.critical_label')}
                     </p>
                     <div className="text-2xl font-black text-red-600 mb-1">{t(`pillar.${String(criticalPillar[0]).toLowerCase()}`)}</div>
                     <p className="text-xs text-red-700 leading-tight mb-3">
                        {t('radar.critical_helper')}
                     </p>
                     <button className="w-full bg-white border border-red-200 text-red-700 text-xs font-bold py-2 rounded-lg hover:bg-red-50 transition-colors">
                        {t('radar.cta_focusPillar').replace('{pillarName}', String(criticalPillar[0]))} &rarr;
                     </button>
                  </div>

                  {/* Top Strength */}
                  <div className="px-2">
                     <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> {t('radar.strength_label')}
                     </p>
                     <div className="text-xl font-bold text-gray-900">{t(`pillar.${String(topStrength[0]).toLowerCase()}`)}</div>
                     <p className="text-xs text-gray-500">
                        Score: {topStrength[1]}/100. {t('radar.strength_helper')}
                     </p>
                  </div>
               </div>
            </div>

            {/* 2. BENCHMARK CARD (Right 4 cols) */}
            <div className="lg:col-span-4 bg-gray-900 text-white p-8 rounded-3xl shadow-xl flex flex-col relative overflow-hidden">
               {/* Abstract BG */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 pointer-events-none"></div>

               <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-2 mb-4 opacity-80">
                     <Trophy className="w-5 h-5 text-yellow-400" />
                     <span className="text-xs font-bold uppercase tracking-widest">Market Rank</span>
                  </div>

                  <h2 className="text-3xl font-extrabold mb-2">
                     {percentile > 80
                        ? t('benchmark.headline_high').replace('{topPercent}', (100 - percentile).toString()).replace('{industryLabel}', 'SME').replace('{countryName}', locale.country)
                        : t('benchmark.headline_mid').replace('{percentAhead}', percentile.toString()).replace('{industryLabel}', 'SME').replace('{countryName}', locale.country)
                     }
                  </h2>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                     {t('benchmark.subhead').replace('{cohortSize}', cohortSize.toString())}
                  </p>

                  <div className="space-y-3">
                     <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Your Index</span>
                        <span className="text-white font-bold">{weightedScore.toFixed(0)}</span>
                     </div>
                     <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-2 rounded-full" style={{ width: `${percentile}%` }}></div>
                     </div>
                     <p className="text-[10px] text-gray-500 text-right pt-1">{t('benchmark.confidence_high')}</p>
                  </div>
               </div>

               <div className="mt-8 relative z-10 pt-6 border-t border-white/10">
                  {isLeader ? (
                     <button
                        onClick={handleDownloadBadge}
                        className="w-full bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-all transform hover:scale-[1.02]"
                     >
                        <Award className="w-4 h-4" /> {t('benchmark.downloadBadge')}
                     </button>
                  ) : (
                     <button className="w-full bg-white/10 text-white font-bold py-3 rounded-xl border border-white/20 hover:bg-white/20 flex items-center justify-center gap-2">
                        View Improvement Path
                     </button>
                  )}
                  <button
                     onClick={() => setShowBenchModal(true)}
                     className="w-full text-center text-gray-500 text-xs mt-3 hover:text-white flex items-center justify-center gap-1"
                  >
                     <Info className="w-3 h-3" /> {t('benchmark.howCalculated')}
                  </button>
               </div>
            </div>
         </div>

         <BenchmarkModal isOpen={showBenchModal} onClose={() => setShowBenchModal(false)} t={t} locale={locale} />

         {/* --- C. PROFIT SIMULATOR (Full Width) --- */}
         <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden mb-8">
            <div className="p-8 bg-gray-50 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <div>
                  <h3 className="text-2xl font-extrabold text-gray-900 flex items-center gap-3">
                     <Zap className="w-6 h-6 text-amber-500 fill-current" /> {t('sim.title')}
                  </h3>
                  <p className="text-gray-500 mt-2 max-w-2xl">
                     {t('sim.subtitle')}
                  </p>
               </div>

               {/* Big Number Output */}
               <div className="flex items-center gap-8 text-right bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div>
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Current Profit</p>
                     <p className="text-lg font-bold text-gray-600">{price(baselineRevenue * (baselineMargin / 100))}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-xs font-bold text-green-600 uppercase tracking-wide animate-pulse">Projected Gain</p>
                     <p className="text-3xl font-black text-green-600">
                        +{price(projection.delta)}
                     </p>
                  </div>
               </div>
            </div>

            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">

               {/* Levers Column */}
               <div className="lg:col-span-2 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

                     {activeLeverKeys.map(key => (
                        <div key={key}>
                           <div className="flex justify-between items-center mb-3">
                              <label className="font-bold text-gray-900 flex items-center gap-2">
                                 {key === 'price' ? <DollarSign className="w-4 h-4 text-gray-400" /> : <Sliders className="w-4 h-4 text-gray-400" />}
                                 {t(`sim.slider.${key}`)}
                              </label>
                              <span className="text-sm font-bold bg-gray-100 px-2 py-1 rounded">{leverValues[key] || 0}%</span>
                           </div>
                           <input
                              type="range" min="0" max="30" step="1"
                              value={leverValues[key] || 0}
                              onChange={(e) => setLeverValues({ ...leverValues, [key]: parseInt(e.target.value) })}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                           />
                           <p className="text-xs text-gray-500 mt-2">
                              {t(`sim.slider.${key}_helper`)}
                           </p>
                        </div>
                     ))}

                     {/* Baseline Adjuster */}
                     <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300 opacity-80 hover:opacity-100 transition-opacity">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-xs font-bold text-gray-500 uppercase">{t('sim.baseline.revenue').split(':')[0]}</span>
                           <input
                              type="number"
                              value={baselineRevenue}
                              onChange={(e) => setBaselineRevenue(parseInt(e.target.value))}
                              className="w-24 text-right text-xs font-bold bg-white border border-gray-300 rounded p-1"
                           />
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-xs font-bold text-gray-500 uppercase">{t('sim.baseline.margin').split(':')[0]}</span>
                           <input
                              type="number"
                              value={baselineMargin}
                              onChange={(e) => setBaselineMargin(parseInt(e.target.value))}
                              className="w-24 text-right text-xs font-bold bg-white border border-gray-300 rounded p-1"
                           />
                        </div>
                        <p className="text-[10px] text-center mt-3 text-gray-400 italic">{t('trust.simulatorNote')}</p>
                     </div>
                  </div>
               </div>

               {/* Explanation Column */}
               <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-gray-100 pt-8 lg:pt-0 lg:pl-12 flex flex-col justify-center">
                  <div className="mb-6">
                     <h4 className="font-bold text-gray-900 mb-2">
                        {t('sim.output.bestLever').replace('{leverName}', biggestLeverName)}
                     </h4>
                     <p className="text-sm text-gray-600 leading-relaxed">
                        {t('sim.output.why')
                           .replace('{pillarName}', t(`pillar.${String(criticalPillar[0]).toLowerCase()}`))
                           .replace('{mechanism}', t(`sim.mechanism.${String(criticalPillar[0]).toLowerCase()}`))
                        }
                     </p>
                  </div>
                  <div className="space-y-3">
                     <button className="w-full bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-transform hover:scale-[1.02] shadow-lg">
                        {t('sim.cta.saveScenario')}
                     </button>
                     <button className="w-full bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl font-bold hover:bg-gray-50">
                        {t('sim.cta.generatePlan')}
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* --- D. STRATEGIC ADVISOR (Boardroom AI) --- */}
         <div className={`bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-3xl border border-indigo-100 relative overflow-hidden transition-all ${isBasicPlan ? 'opacity-90' : ''}`}>
            <div className="relative z-10 flex flex-col md:flex-row gap-8">
               <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="bg-white p-2 rounded-xl shadow-sm text-indigo-600">
                        <Bot className="w-6 h-6" />
                     </div>
                     <h3 className="text-xl font-bold text-indigo-900">Boardroom AI (Pocket COO)</h3>
                  </div>
                  <p className="text-indigo-800/80 mb-6 max-w-xl text-sm leading-relaxed">
                     I have analyzed your {String(criticalPillar[0])} score ({criticalPillar[1]}/100).
                     It is significantly below the industry average of 65.
                     Ask me specifically: "How do I fix my {String(criticalPillar[0])} leak?"
                  </p>

                  <div className="flex gap-2 max-w-lg">
                     <input
                        type="text"
                        className="flex-1 border-0 shadow-sm rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500"
                        placeholder="Ask for a script, strategy, or fix..."
                        value={chatQuery}
                        onChange={(e) => setChatQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                        disabled={isBasicPlan || aiLoading}
                     />
                     <button
                        onClick={handleAskAI}
                        disabled={aiLoading || isBasicPlan}
                        className="bg-indigo-600 text-white p-4 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md hover:shadow-lg"
                     >
                        {aiLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                     </button>
                  </div>
               </div>

               {/* Chat Output Area */}
               <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm min-h-[160px]">
                  {isBasicPlan ? (
                     <div className="h-full flex flex-col items-center justify-center text-center">
                        <Lock className="w-8 h-8 text-indigo-300 mb-2" />
                        <p className="text-sm font-bold text-indigo-900">Premium Feature</p>
                        <p className="text-xs text-indigo-600">Upgrade to unlock AI analysis.</p>
                     </div>
                  ) : chatResponse ? (
                     <p className="text-sm text-gray-800 leading-relaxed font-medium">{chatResponse}</p>
                  ) : (
                     <div className="h-full flex items-center justify-center text-indigo-300 text-sm italic">
                        AI Waiting for input...
                     </div>
                  )}
               </div>
            </div>
         </div>

      </div>
   );
};

export default Dashboard;
