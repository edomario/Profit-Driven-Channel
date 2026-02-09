import { LibraryItem, PillarId, SignalTag } from '../../types';

const allSizes = ['all' as any];
const allSeverity = ['Critical', 'Watch', 'Stable', 'Strong', 'Emergency'] as Array<'Critical' | 'Watch' | 'Stable' | 'Strong' | 'Emergency'>;

type LeakRow = {
  id: string;
  pillar: PillarId;
  signal_tags: SignalTag[];
  hook: string;
  leak: string;
  cost: string;
  cliffhanger: string;
  kpi: string;
  actionPack?: string;
};

const pillarStrengthRows: Array<{
  pillar: PillarId;
  strength: string;
  hook: string;
  kpi: string;
}> = [
  {
    pillar: 'Operations',
    strength: 'Stock is controlled by SKU-size-color, arrivals follow receive-tag-price-display-photo flow, and fulfillment uses proof before handover.',
    hook: 'Size and Flow Discipline',
    kpi: 'Stock accuracy %, Sell-through %, Stockouts top20, Catalogue completeness %, Dead stock UGX'
  },
  {
    pillar: 'Money',
    strength: 'Category margins are visible, markdown and discount controls are active, and daily cash/momo reconciliation protects decision accuracy.',
    hook: 'Margin-to-Cash Visibility',
    kpi: 'Gross margin by category, Markdown %, Discount %, Recon variance, Return loss UGX'
  },
  {
    pillar: 'Market',
    strength: 'Customer retention is systemized through VIP follow-up, social proof, response discipline, and clear value positioning.',
    hook: 'Trust and Repeat Engine',
    kpi: 'Repeat rate %, AOV, Referral %, Lead response time, Conversion %'
  },
  {
    pillar: 'Leadership',
    strength: 'The boutique runs on visible KPIs, delegated limits, and weekly closure on recurring operational and margin leaks.',
    hook: 'Cadence Over Heroics',
    kpi: 'KPI review compliance %, Decision latency, Task closure %, Repeat incident rate'
  },
  {
    pillar: 'Innovation',
    strength: 'Drop rhythm, bundle offers, and small controlled tests are used to scale winners without creating inventory chaos.',
    hook: 'Measured Newness Loop',
    kpi: 'Drops/week, Bundle adoption %, Test win rate, New item revenue %'
  },
  {
    pillar: 'Risk',
    strength: 'Shrinkage, returns fraud, supplier authenticity, and dispute exposure are controlled by simple but enforced evidence routines.',
    hook: 'Retail Loss Firewall',
    kpi: 'Shrinkage %, Fraud returns %, Counterfeit incidents, Dispute rate %'
  },
  {
    pillar: 'People',
    strength: 'Incentives are aligned to margin and low returns, onboarding is structured, and selling behavior is consistent across staff.',
    hook: 'Consistent Profit Behavior',
    kpi: 'Margin/staff, Return rate by staff, Onboarding completion %, Service consistency score'
  }
];

const leakRows: LeakRow[] = [
  // OPERATIONS
  {
    id: 'OPS_01',
    pillar: 'Operations',
    signal_tags: ['inventory_accuracy_gap', 'stockout_tax', 'hero_staff_dependence'],
    hook: 'Size Chaos',
    leak: 'Stock may exist, but not in the right sizes/colors or not quickly confirmable, causing immediate lost sales and buyer frustration.',
    cost: 'Size chaos leaks conversion and repeat trust; many boutiques lose 5-15% of potential peak-period sales from size mismatch and slow confirmation.',
    cliffhanger: 'Fix Mode will lock SKU-size truth and reorder triggers so availability is factual, not guesswork.',
    kpi: 'Stock accuracy %, Lost sales due to size gaps',
    actionPack: 'OPS-P1'
  },
  {
    id: 'OPS_02',
    pillar: 'Operations',
    signal_tags: ['no_standard_work', 'pricing_inconsistency'],
    hook: 'Tagging Drift',
    leak: 'Items reach display without consistent tags or prices, creating checkout delays, bargaining pressure, and pricing disputes.',
    cost: 'Tag drift weakens price confidence and increases shrink risk; the leak compounds in every busy hour.',
    cliffhanger: 'Fix Mode will enforce no-tag-no-floor discipline with tag audits and accountability.',
    kpi: 'Untagged item count, Price dispute rate',
    actionPack: 'OPS-P2'
  },
  {
    id: 'OPS_03',
    pillar: 'Operations',
    signal_tags: ['offer_measurement_gap', 'no_market_feedback_loop'],
    hook: 'Catalogue Gap',
    leak: 'New arrivals are not consistently photographed and listed, so online demand cannot convert.',
    cost: 'Catalogue gaps create direct revenue loss online and slower inventory turns offline.',
    cliffhanger: 'Fix Mode will install a catalogue machine from receiving to posting within 24-48 hours.',
    kpi: 'Catalogue completeness %, Online conversion %',
    actionPack: 'OPS-P3'
  },
  {
    id: 'OPS_04',
    pillar: 'Operations',
    signal_tags: ['safe_handling_gap', 'shrinkage_leak'],
    hook: 'Fitting Room Friction',
    leak: 'Try-on flow is informal, reducing conversion while increasing damage and shrink exposure.',
    cost: 'Fitting room friction leaks both conversion and control; profit disappears through low close rates and avoidable losses.',
    cliffhanger: 'Fix Mode will install count-in-out control and style-assist flow to convert more fittings into sales.',
    kpi: 'Fitting conversion %, Fitting incidents',
    actionPack: 'OPS-P4'
  },
  {
    id: 'OPS_05',
    pillar: 'Operations',
    signal_tags: ['slow_mover_attachment'],
    hook: 'Dead Rack Syndrome',
    leak: 'Slow movers remain untouched while cash is trapped and newness weakens.',
    cost: 'Dead rack syndrome forces markdown panic and blocks cash from restocking winners.',
    cliffhanger: 'Fix Mode will identify dead stock and apply controlled markdown and bundle recovery rules.',
    kpi: 'Dead stock UGX, Sell-through 30d',
    actionPack: 'OPS-P5'
  },

  // MONEY
  {
    id: 'MNY_01',
    pillar: 'Money',
    signal_tags: ['pricing_margin_blindspot', 'category_margin_blindspot'],
    hook: 'Margin Mirage',
    leak: 'Revenue looks active while category-level margin is unclear once markdowns, returns, and shrink are included.',
    cost: 'Margin mirage commonly hides 2-8% revenue leakage when category economics are not visible.',
    cliffhanger: 'Fix Mode will build a margin map and leak bridge so every loss has an owner.',
    kpi: 'Gross margin by category, Net margin estimate',
    actionPack: 'MNY-P1'
  },
  {
    id: 'MNY_02',
    pillar: 'Money',
    signal_tags: ['discounting_leak', 'pricing_inconsistency'],
    hook: 'Markdown Panic',
    leak: 'Discount and markdown decisions are reactive, training buyers to wait and negotiate.',
    cost: 'Pricing power erodes quickly; small discount drift can erase most profit in thin-margin periods.',
    cliffhanger: 'Fix Mode will install discount bands and markdown ladder discipline.',
    kpi: 'Discount %, Markdown compliance',
    actionPack: 'MNY-P2'
  },
  {
    id: 'MNY_03',
    pillar: 'Money',
    signal_tags: ['purchase_panic', 'slow_mover_attachment', 'supplier_terms_weak'],
    hook: 'Buying Hangover',
    leak: 'Buying decisions are over-driven by trend excitement and weak test-to-scale controls.',
    cost: 'Buying hangover traps cash in slow styles and forces margin-killing clearance behavior.',
    cliffhanger: 'Fix Mode will enforce open-to-buy limits and test quantity buying.',
    kpi: 'Overbuy rate, Inventory turns',
    actionPack: 'MNY-P4'
  },
  {
    id: 'MNY_04',
    pillar: 'Money',
    signal_tags: ['cash_recon_gap'],
    hook: 'Cash Drawer Drift',
    leak: 'Cash and momo are not reconciled with enough daily discipline, allowing variance to normalize.',
    cost: 'Small unresolved variances become permanent leakage and weaken trust in the numbers.',
    cliffhanger: 'Fix Mode will enforce daily reconciliation and variance reason coding.',
    kpi: 'Daily recon variance UGX, Cash exceptions',
    actionPack: 'MNY-P3'
  },
  {
    id: 'MNY_05',
    pillar: 'Money',
    signal_tags: ['returns_damage_blindspot', 'policy_vagueness'],
    hook: 'Return Refund Bleed',
    leak: 'Return and refund decisions are inconsistent, creating avoidable cost and fraud exposure.',
    cost: 'Return refund bleed reduces net margin and adds dispute handling load across staff.',
    cliffhanger: 'Fix Mode will install exchange-first design and return condition controls.',
    kpi: 'Return rate %, Return loss UGX',
    actionPack: 'MNY-P5'
  },

  // MARKET
  {
    id: 'MKT_01',
    pillar: 'Market',
    signal_tags: ['followup_gap'],
    hook: 'One-Time Buyer Curse',
    leak: 'Customer return behavior is left to chance instead of a repeat engine.',
    cost: 'No retention system means constant replacement of buyers and unstable growth.',
    cliffhanger: 'Fix Mode will set VIP follow-up cadence that turns one-time buyers into repeat demand.',
    kpi: 'Repeat rate %, Repeat revenue %',
    actionPack: 'MKT-P1'
  },
  {
    id: 'MKT_02',
    pillar: 'Market',
    signal_tags: ['value_story_gap'],
    hook: 'Brand Blur',
    leak: 'Positioning is unclear, so customers compare mostly by price and convenience.',
    cost: 'Brand blur reduces conversion quality and pricing strength over time.',
    cliffhanger: 'Fix Mode will align content, scripts, and offers to a clear identity.',
    kpi: 'Conversion %, Price realization',
    actionPack: 'MKT-P4'
  },
  {
    id: 'MKT_03',
    pillar: 'Market',
    signal_tags: ['no_market_feedback_loop', 'followup_gap'],
    hook: 'Content Drought',
    leak: 'Posting and response behavior is inconsistent, causing online lead leakage.',
    cost: 'Content drought and slow responses reduce online conversion and traffic compounding.',
    cliffhanger: 'Fix Mode will install cadence and response SLA to stabilize digital sales.',
    kpi: 'Posts/week, Response time, Online sales %',
    actionPack: 'MKT-P4'
  },
  {
    id: 'MKT_04',
    pillar: 'Market',
    signal_tags: ['weak_proof_pack', 'value_story_gap'],
    hook: 'Trust Gap',
    leak: 'Social proof and confidence signals are weak, increasing hesitation and bargaining pressure.',
    cost: 'Trust gaps reduce conversion and force lower price acceptance.',
    cliffhanger: 'Fix Mode will build social proof and trust scripts that defend margin.',
    kpi: 'Reviews/week, Trust conversion rate',
    actionPack: 'MKT-P2'
  },

  // LEADERSHIP
  {
    id: 'LDR_01',
    pillar: 'Leadership',
    signal_tags: ['kpi_cadence_gap', 'no_kpi_ownership'],
    hook: 'KPI Darkness',
    leak: 'Key numbers are not visible or routinely reviewed, delaying leak detection and response.',
    cost: 'Late detection inflates losses across stockouts, discount drift, and return costs.',
    cliffhanger: 'Fix Mode will put reality on the wall and force weekly closure.',
    kpi: 'KPI review compliance %, Repeat incident rate',
    actionPack: 'LDR-P1'
  },
  {
    id: 'LDR_02',
    pillar: 'Leadership',
    signal_tags: ['decision_bottleneck', 'approval_bottleneck'],
    hook: 'Approval Bottleneck',
    leak: 'Frontline decisions wait for owner approvals, slowing service and creating inconsistent customer experience.',
    cost: 'Decision latency leaks sales and increases dispute escalation.',
    cliffhanger: 'Fix Mode will deploy approval limits so speed improves without control loss.',
    kpi: 'Decision latency, Approval backlog',
    actionPack: 'LDR-P2'
  },
  {
    id: 'LDR_03',
    pillar: 'Leadership',
    signal_tags: ['no_variance_review', 'training_planning_gap'],
    hook: 'Repeat Leak Tax',
    leak: 'Known issues repeat because fixes are reactive and not embedded into standards.',
    cost: 'Repeat leak tax multiplies payroll effort and margin loss every month.',
    cliffhanger: 'Fix Mode will enforce root-cause closure with coaching and ownership.',
    kpi: 'Task closure %, Repeat leak rate',
    actionPack: 'LDR-P3'
  },

  // INNOVATION
  {
    id: 'INN_01',
    pillar: 'Innovation',
    signal_tags: ['no_testing_rhythm'],
    hook: 'Drop Stagnation',
    leak: 'Newness rhythm is inconsistent, reducing customer check-in frequency and launch momentum.',
    cost: 'Stagnant drops reduce return traffic and weaken category freshness.',
    cliffhanger: 'Fix Mode will launch micro-test drop rhythm tied to sell-through.',
    kpi: 'Drops/week, Sell-through 14d',
    actionPack: 'INN-P1'
  },
  {
    id: 'INN_02',
    pillar: 'Innovation',
    signal_tags: ['bundle_engine_missing', 'service_inconsistency'],
    hook: 'Outfit Engine Missing',
    leak: 'Selling single items instead of complete looks is capping AOV and confidence-driven conversion.',
    cost: 'Missing outfit engine reduces basket size and repeat styling demand.',
    cliffhanger: 'Fix Mode will standardize bundles and styling scripts.',
    kpi: 'Bundle adoption %, AOV',
    actionPack: 'MKT-P3'
  },
  {
    id: 'INN_03',
    pillar: 'Innovation',
    signal_tags: ['no_market_feedback_loop', 'purchase_panic'],
    hook: 'Trend Blindness',
    leak: 'Style decisions lag actual customer demand, causing overstock in wrong trends.',
    cost: 'Trend blindness creates buying hangover and markdown pressure.',
    cliffhanger: 'Fix Mode will tie buying decisions to demand feedback and test results.',
    kpi: 'Test-to-scale ratio, New item revenue %',
    actionPack: 'INN-P1'
  },

  // RISK
  {
    id: 'RSK_01',
    pillar: 'Risk',
    signal_tags: ['shrinkage_leak', 'safe_handling_gap'],
    hook: 'Shrink Tax',
    leak: 'Missing items and fitting-floor loss patterns are normalized instead of investigated.',
    cost: 'Shrink tax often behaves like a 0.5-3% inventory-value leak per month in weak-control boutiques.',
    cliffhanger: 'Fix Mode will lock shrink controls and exception accountability.',
    kpi: 'Shrinkage %, Inventory accuracy',
    actionPack: 'RSK-P1'
  },
  {
    id: 'RSK_02',
    pillar: 'Risk',
    signal_tags: ['policy_vagueness', 'returns_damage_blindspot'],
    hook: 'Returns Fraud Loop',
    leak: 'Return checks and policy enforcement are inconsistent, creating abuse and avoidable refund loss.',
    cost: 'Returns fraud loop adds direct margin loss and staff conflict overhead.',
    cliffhanger: 'Fix Mode will enforce returns firewall and condition checklist discipline.',
    kpi: 'Fraud return rate, Return loss UGX',
    actionPack: 'RSK-P2'
  },
  {
    id: 'RSK_03',
    pillar: 'Risk',
    signal_tags: ['supplier_doc_gap', 'supplier_selection_undisciplined'],
    hook: 'Counterfeit Landmine',
    leak: 'Supplier authenticity is under-controlled in high-risk categories like branded shoes and bags.',
    cost: 'One counterfeit incident can trigger refund waves and trust collapse.',
    cliffhanger: 'Fix Mode will install supplier authenticity firewall and evidence logging.',
    kpi: 'Counterfeit incidents, Supplier defect rate',
    actionPack: 'RSK-P3'
  },
  {
    id: 'RSK_04',
    pillar: 'Risk',
    signal_tags: ['contract_gap', 'policy_vagueness'],
    hook: 'Dispute Tax',
    leak: 'Unclear terms and weak proof create recurring refund, delivery, and exchange disputes.',
    cost: 'Dispute tax appears as settlement discounts, delayed cash, and reputation drag.',
    cliffhanger: 'Fix Mode will standardize terms, receipt proof, and dispute closure workflow.',
    kpi: 'Dispute rate %, Chargeback incidents',
    actionPack: 'RSK-P4'
  },

  // PEOPLE
  {
    id: 'PPL_01',
    pillar: 'People',
    signal_tags: ['incentive_misalignment', 'discounting_leak'],
    hook: 'Discount Culture',
    leak: 'Sales behavior uses discounting as the default close tool, weakening price discipline and margin quality.',
    cost: 'Discount culture turns growth into low-quality revenue and unstable profitability.',
    cliffhanger: 'Fix Mode will realign incentives and scripts to protect margin per close.',
    kpi: 'Discount by staff %, Margin per staff',
    actionPack: 'PPL-P1'
  },
  {
    id: 'PPL_02',
    pillar: 'People',
    signal_tags: ['training_gap', 'service_inconsistency', 'onboarding_gap'],
    hook: 'Scriptless Selling',
    leak: 'Sales and styling behavior varies too much by person, causing uneven conversion and return outcomes.',
    cost: 'Scriptless selling lowers AOV and increases avoidable returns and dispute handling.',
    cliffhanger: 'Fix Mode will standardize scripts and certify role behavior.',
    kpi: 'Service consistency score, Return rate by staff',
    actionPack: 'PPL-P2'
  }
];

const toLibraryLeakItems = (row: LeakRow): LibraryItem[] => [
  {
    id: `LIB_FASHION_${row.id}_LEAK`,
    industry: 'retail',
    line_type: ['all'],
    pillar: row.pillar,
    signal_tags: row.signal_tags,
    severity_fit: allSeverity,
    business_size_fit: allSizes,
    text: row.leak,
    type: 'leak',
    hook_text: row.hook,
    cost_text: row.cost,
    cliffhanger_text: row.cliffhanger,
    kpi_text: row.kpi,
    fix_task_ids: row.actionPack ? [row.actionPack] : undefined
  },
  {
    id: `LIB_FASHION_${row.id}_HOOK`,
    industry: 'retail',
    line_type: ['all'],
    pillar: row.pillar,
    signal_tags: row.signal_tags,
    severity_fit: allSeverity,
    business_size_fit: allSizes,
    text: row.hook,
    type: 'hook',
    hook_text: row.hook,
    kpi_text: row.kpi,
    fix_task_ids: row.actionPack ? [row.actionPack] : undefined
  }
];

const strengthRows: LibraryItem[] = pillarStrengthRows.flatMap((row) => [
  {
    id: `LIB_FASHION_${row.pillar.toUpperCase()}_STR`,
    industry: 'retail',
    line_type: ['all'],
    pillar: row.pillar,
    signal_tags: [],
    severity_fit: ['Stable', 'Strong'],
    business_size_fit: allSizes,
    text: row.strength,
    type: 'strength',
    hook_text: row.hook,
    kpi_text: row.kpi
  },
  {
    id: `LIB_FASHION_${row.pillar.toUpperCase()}_KPI`,
    industry: 'retail',
    line_type: ['all'],
    pillar: row.pillar,
    signal_tags: [],
    severity_fit: allSeverity,
    business_size_fit: allSizes,
    text: row.kpi,
    type: 'kpi',
    kpi_text: row.kpi
  }
]);

const baseSpecies = ['Fashion & boutique', 'Fashion & Boutique'];
const species1 = 'Women\'s Boutique (casual + office + occasion)';
const species2 = 'Men\'s Fashion (smart casual + formal)';
const species3 = 'Kids & Family Wear';
const species4 = 'Shoes / Bags / Accessories Boutique';
const species5 = 'Streetwear & Trend Drops';
const species6 = 'Bridal / Occasion / Formal Wear';
const species7 = 'Thrift / Resale (mitumba / curated secondhand)';
const species8 = 'Tailoring / Bespoke + Boutique Hybrid';
const species9 = 'Online-First Boutique (WhatsApp/IG/TikTok sales)';

const missionRowsForSpecies = (
  code: string,
  lineType: string[],
  texts: Record<PillarId, string>
): LibraryItem[] => {
  const pillars: PillarId[] = ['Operations', 'Money', 'Market', 'Leadership', 'Innovation', 'Risk', 'People'];
  return pillars.map((pillar) => ({
    id: `MB_FASHION_${code}_${pillar.toUpperCase()}`,
    industry: 'retail',
    line_type: lineType,
    pillar,
    signal_tags: [],
    severity_fit: allSeverity,
    business_size_fit: allSizes,
    text: texts[pillar],
    type: 'mission_brief'
  }));
};

const missionBriefRows: LibraryItem[] = [
  ...missionRowsForSpecies('S0', baseSpecies, {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. This usually appears as daily stock uncertainty, weak size matching, and avoidable floor friction. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs a 7-day stabilization sprint and a 30-day control build tied to {KPI}.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. This often creates Margin Mirage: sales move while net profit and restock cash stay under pressure. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens margin map, markdown discipline, and cash controls.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Fashion growth depends on repeat trust and content rhythm; when this slips, conversion decays quietly. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs retention, proof, and conversion systems.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. The boutique may be busy but paying for repeats because closure discipline is weak. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces KPI cadence, delegation, and no-repeat control.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Newness and offer learning may be too ad hoc to compound. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches measured drop and bundle experiments.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Shrinkage, return fraud, and authenticity risks can escalate quickly if controls stay informal. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds a practical loss-prevention firewall.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Service quality and pricing behavior likely vary by person more than by standard. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode aligns incentives, scripts, and certification.'
  }),

  ...missionRowsForSpecies('S1', [species1], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Women\'s boutique performance is leaking through size truth and catalogue speed gaps. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode secures size availability and arrival-to-listing flow.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Markdown panic and discount drift may be flattening category profit. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces margin-safe markdown rules.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Repeat trust likely weakens when styling confidence and follow-up are inconsistent. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds repeat and social-proof loops.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Decision speed and weekly control may be under pressure. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode defines ownership and approvals.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Bundle and drop experimentation is likely below potential. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches high-ROI offer tests.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Return dispute and shrinkage controls may be too informal for current volume. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens returns and floor controls.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Styling and close quality may vary too much by staff. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode standardizes scripts and incentives.'
  }),

  ...missionRowsForSpecies('S2', [species2], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Men\'s fashion models often leak through fit availability and slow-moving category buildup. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode secures fast-fit stock and rack rotation.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Margin may be leaking via uncontrolled discounting and weak markdown sequencing. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode stabilizes pricing discipline.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Brand clarity and repeat routines may be under-structured. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds a clear value story and retention rhythm.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. KPI visibility and owner dependency may be slowing execution. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs cadence and delegation limits.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Outfit engine and offer testing likely need structure. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches controlled bundle tests.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Policy inconsistency may be increasing disputes and avoidable loss. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces policy and proof standards.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Sales behavior may be too price-driven versus value-led. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode aligns incentives to margin quality.'
  }),

  ...missionRowsForSpecies('S3', [species3], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Kids/family models are highly exposed to size mismatch and return flow breakdown. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode locks size matrix and return controls.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Margin can disappear through high return costs and overbuying. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces buying and return economics.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Repeat cycles with parents may be underleveraged. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds parent-focused retention loops.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Standards may vary by shift and rush periods. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode reinforces routine ownership.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Pack offers and repeat basics may be under-optimized. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs bundle and basics tests.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Return fraud and shrink exposure are likely above safe levels. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs a practical fraud firewall.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Policy enforcement consistency may be weak. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode certifies role behavior.'
  }),

  ...missionRowsForSpecies('S4', [species4], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Shoes/bags/accessories models leak when tagging, authenticity, and fast mover control are weak. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode secures high-risk SKU flow.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Margin may be eroding through discount pressure and returns settlements. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode restores price confidence and return boundaries.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Trust proof may be insufficient for higher-ticket conversion. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds social proof and authenticity messaging.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Approvals and policy consistency may slow the floor. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode sharpens delegation and controls.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Bundle and styling opportunity may be underused. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches look-based selling systems.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Counterfeit and dispute exposure is often high in this model. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens supplier firewall and evidence trails.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Price defense and product trust communication may vary by seller. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode trains trust-led scripts.'
  }),

  ...missionRowsForSpecies('S5', [species5], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Streetwear models leak quickly when drop rhythm and fulfilment consistency break. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs drop and dispatch discipline.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Hype-driven buying may be creating cash traps in slow styles. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces micro-test buying.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Content cadence and proof velocity may be too low for demand cycles. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds content + response SLAs.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Execution may be too reactive to trend spikes. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode creates weekly operating rhythm.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Test-to-scale decisions may be weakly governed. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces winner-scaling logic.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Shrink and dispute exposure rises with high-volume drops. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens drop-day controls.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Shift quality can drift under drop pressure. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode standardizes scripts and accountability.'
  }),

  ...missionRowsForSpecies('S6', [species6], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Occasion/formal models leak through weak appointment flow and return-policy inconsistency. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode secures quote-to-fit flow and quality checks.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. High-ticket margin may be leaking through exception discounts and returns. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces price and policy boundaries.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Trust and proof gaps can stall premium conversion. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode strengthens premium proof stack.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Owner dependency may be limiting service speed. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode delegates decision rails.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Service productization may be underdeveloped. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds premium service offers.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Dispute exposure is high when terms are verbal. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode documents terms and proof.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Premium service consistency may vary by staff. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode certifies customer journey behavior.'
  }),

  ...missionRowsForSpecies('S7', [species7], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Resale models leak through sorting/tagging inconsistency and dead-rack buildup. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces intake-to-floor speed and rack controls.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Margin confusion and markdown panic can eat resale gains quickly. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds pricing and markdown discipline.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Trust and newness signals may be inconsistent for repeat traffic. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds proof and drop cadence.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Execution may depend too heavily on one curator. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode distributes standards and ownership.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Curation tests and bundle strategy may be underused. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches rapid curation experiments.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Return disputes and shrink risk can rise in mixed-condition stock. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens intake evidence and returns checks.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Consistency in grading and selling language may vary too much. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode certifies intake and sales scripts.'
  }),

  ...missionRowsForSpecies('S8', [species8], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Tailoring-plus-boutique models leak through handoff and status-tracking gaps. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode locks intake-to-delivery job flow.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Underpriced labor and return exceptions may be reducing blended margins. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode maps service + product economics.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Conversion may be leaking from weak quote follow-up and low proof content. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds a conversion pipeline.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Cross-team handoff friction may be slowing consistency. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode defines handoff ownership.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Productized service tiers may be missing. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode creates tiered service offers.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Dispute exposure rises where terms and proofs are informal. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs dispute-safe documentation.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Service quality may depend on individual stars. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode standardizes capabilities across staff.'
  }),

  ...missionRowsForSpecies('S9', [species9], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Online-first models leak through catalogue delays and weak fulfillment proof. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode secures listing-to-delivery flow.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Margin can leak fast through discount pressure and return costs. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode protects unit economics per order.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Response speed and trust proof are likely limiting conversion. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces SLA and proof content loops.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Decision and coordination cadence may be too reactive for online pace. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode aligns daily control rhythm.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Offer testing likely needs tighter cadence. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches data-backed offer sprints.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Delivery and refund disputes can escalate quickly without proof standards. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode deploys dispute-proof workflows.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Consistent response and selling scripts may be uneven across online handlers. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode certifies digital sales behavior.'
  })
];

export const library: LibraryItem[] = [
  ...strengthRows,
  ...leakRows.flatMap(toLibraryLeakItems),
  ...missionBriefRows
];
