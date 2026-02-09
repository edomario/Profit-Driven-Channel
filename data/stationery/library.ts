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
    strength: 'Core items are controlled by SKU and pack-size, receiving is disciplined, shelves are conversion-led, and printing jobs follow ticketed queue flow.',
    hook: 'Stock and Queue Discipline',
    kpi: 'Top-50 stockouts/week, Stock accuracy %, Printing error %, Dead stock UGX'
  },
  {
    pillar: 'Money',
    strength: 'Category margins, discount bands, credit discipline, and daily cash plus momo reconciliation keep profit and cash predictable.',
    hook: 'Margin-to-Cash Control',
    kpi: 'Gross margin by category, Discount %, Credit aging, Recon variance UGX, Shrink %'
  },
  {
    pillar: 'Market',
    strength: 'Repeat demand is built through school-office account routines, VIP follow-up, bundle offers, and fast response channels.',
    hook: 'Repeat and Contract Engine',
    kpi: 'Repeat rate %, School-office contracts, AOV, Bundle adoption %, Response time'
  },
  {
    pillar: 'Leadership',
    strength: 'Execution runs on visible KPIs, clear decision limits, and weekly closure of recurring leak patterns.',
    hook: 'Cadence Over Chaos',
    kpi: 'KPI review compliance, Decision latency, Task closure %, Repeat incident rate'
  },
  {
    pillar: 'Innovation',
    strength: 'Seasonal campaigns, service productization, and micro-tests are run systematically to scale what works and stop what leaks.',
    hook: 'Measured Growth Loop',
    kpi: 'Campaign execution score, New tests/month, Service upsell %, Test win rate'
  },
  {
    pillar: 'Risk',
    strength: 'Supplier authenticity, short-delivery checks, shrink controls, and dispute-proof routines protect trust and margin.',
    hook: 'Loss and Trust Firewall',
    kpi: 'Counterfeit flags, Short-delivery rate, Shrink %, Dispute %, Cash exceptions'
  },
  {
    pillar: 'People',
    strength: 'Incentives, scripts, and onboarding align behavior with margin quality, service consistency, and low error rates.',
    hook: 'Profit-Safe Behavior',
    kpi: 'Margin/staff, Discount by staff %, Training completion %, Service consistency score'
  }
];

const leakRows: LeakRow[] = [
  // Operations
  {
    id: 'OPS_01',
    pillar: 'Operations',
    signal_tags: ['stockout_tax', 'restock_delay'],
    hook: 'Stockout Tax',
    leak: 'Core stationery items are discovered missing when customers are already at the counter, especially during exam and school peaks.',
    cost: 'In list-based shopping, one missing item can lose the full basket and future repeat demand.',
    cliffhanger: 'Fix Mode secures Top-50 fast movers and reorder triggers before demand spikes.',
    kpi: 'Top-50 stockouts/week, Seasonal readiness score',
    actionPack: 'OPS-P1'
  },
  {
    id: 'OPS_02',
    pillar: 'Operations',
    signal_tags: ['inventory_accuracy_gap'],
    hook: 'SKU Fog',
    leak: 'Stock exists in theory but exact variant or pack-size cannot be confirmed fast enough to close sales confidently.',
    cost: 'SKU fog wastes floor time, creates wrong picks, and weakens trust in availability promises.',
    cliffhanger: 'Fix Mode builds SKU and pack-size truth so confirmation is fast and reliable.',
    kpi: 'Stock accuracy %, Item find time',
    actionPack: 'OPS-P2'
  },
  {
    id: 'OPS_03',
    pillar: 'Operations',
    signal_tags: ['offer_measurement_gap'],
    hook: 'Shelf Maze',
    leak: 'Shelf layout is neat but not conversion-led, so customers spend too long searching and buy less.',
    cost: 'Slow item discovery reduces conversion and increases staff interruption load.',
    cliffhanger: 'Fix Mode deploys shelf maps and fast-lane zones optimized for speed and basket size.',
    kpi: 'Customer time-to-find item, In-store conversion %',
    actionPack: 'OPS-P3'
  },
  {
    id: 'OPS_04',
    pillar: 'Operations',
    signal_tags: ['no_standard_work', 'contract_gap'],
    hook: 'Queue Chaos',
    leak: 'Printing and photocopy jobs are managed verbally, causing reprints, delays, and payment disputes.',
    cost: 'Queue chaos turns a high-frequency service into avoidable rework and reputation drag.',
    cliffhanger: 'Fix Mode installs ticketed queue control with proof checkpoints.',
    kpi: 'Print job error %, Disputes/week',
    actionPack: 'OPS-P4'
  },
  {
    id: 'OPS_05',
    pillar: 'Operations',
    signal_tags: ['slow_mover_attachment'],
    hook: 'Dead Book Trap',
    leak: 'Slow-moving books and legacy items sit for long periods, tying cash while fast movers starve.',
    cost: 'Dead inventory reduces restock power and forces reactive discounting.',
    cliffhanger: 'Fix Mode runs dead-stock recovery with bundle, markdown, and transfer rules.',
    kpi: 'Dead stock UGX, Inventory turns',
    actionPack: 'OPS-P5'
  },

  // Money
  {
    id: 'MNY_01',
    pillar: 'Money',
    signal_tags: ['pricing_margin_blindspot', 'category_margin_blindspot'],
    hook: 'Margin Mirage',
    leak: 'Sales look active but category-level profitability is unclear once discounts, shrink, and returns are included.',
    cost: 'Without category margin truth, decisions scale volume while hiding profit loss.',
    cliffhanger: 'Fix Mode builds category margin maps and leak reviews.',
    kpi: 'Gross margin by category, Net margin estimate',
    actionPack: 'MNY-P1'
  },
  {
    id: 'MNY_02',
    pillar: 'Money',
    signal_tags: ['discounting_leak', 'pricing_inconsistency'],
    hook: 'Bargain Drift',
    leak: 'Discounting happens by negotiation mood instead of clear bands, compressing margin each day.',
    cost: 'Random discounting trains buyers to negotiate and steadily erodes pricing power.',
    cliffhanger: 'Fix Mode enforces discount bands and bulk pricing guardrails.',
    kpi: 'Discount %, Price variance',
    actionPack: 'MNY-P2'
  },
  {
    id: 'MNY_03',
    pillar: 'Money',
    signal_tags: ['credit_terms_risk', 'payment_delay_chokehold'],
    hook: 'Credit Sink',
    leak: 'Credit is extended without disciplined limits and collections cadence, trapping cash needed for peak stock.',
    cost: 'Delayed collections weaken restocking power and increase bad debt risk.',
    cliffhanger: 'Fix Mode installs credit tiers, aging visibility, and cutoff rules.',
    kpi: 'Credit outstanding, Aging buckets, DSO',
    actionPack: 'MNY-P3'
  },
  {
    id: 'MNY_04',
    pillar: 'Money',
    signal_tags: ['cash_recon_gap', 'shrinkage_leak'],
    hook: 'Cash Drawer Drift',
    leak: 'Cash and momo reconciliation is inconsistent, so daily variances and small-item shrink become normalized.',
    cost: 'Small unresolved variances become permanent monthly leakage.',
    cliffhanger: 'Fix Mode enforces daily money truth and shrink exception logging.',
    kpi: 'Cash-momo variance UGX/day, Shrink %',
    actionPack: 'MNY-P4'
  },
  {
    id: 'MNY_05',
    pillar: 'Money',
    signal_tags: ['waste_not_costed'],
    hook: 'Hidden Service Leak',
    leak: 'Printing and photocopy prices are set by market guess, not by full paper-toner-time cost.',
    cost: 'Busy print desks can destroy margin when service costs are not priced accurately.',
    cliffhanger: 'Fix Mode installs print cost calculators and job-type pricing corrections.',
    kpi: 'Cost per print job, Print margin %',
    actionPack: 'MNY-P5'
  },

  // Market
  {
    id: 'MKT_01',
    pillar: 'Market',
    signal_tags: ['channel_dependency', 'followup_gap'],
    hook: 'School Contract Miss',
    leak: 'Schools and offices are served ad hoc without a structured account rhythm, so predictable bulk revenue is lost.',
    cost: 'Lack of account discipline weakens repeat volume and planning accuracy.',
    cliffhanger: 'Fix Mode builds school and office contract outreach plus renewal cadence.',
    kpi: 'Contract count, Contract revenue share',
    actionPack: 'MKT-P1'
  },
  {
    id: 'MKT_02',
    pillar: 'Market',
    signal_tags: ['followup_gap'],
    hook: 'One-Time Buyer Curse',
    leak: 'Parents and students buy once and disappear because there is no retention follow-up system.',
    cost: 'Replacing buyers repeatedly is more expensive than retaining known buyers.',
    cliffhanger: 'Fix Mode launches VIP and follow-up loops that convert one-time buyers to repeat demand.',
    kpi: 'Repeat rate %, Repeat revenue %',
    actionPack: 'MKT-P3'
  },
  {
    id: 'MKT_03',
    pillar: 'Market',
    signal_tags: ['weak_onboarding', 'followup_gap'],
    hook: 'WhatsApp Blackhole',
    leak: 'Inquiry responses are slow and inconsistent, so high-intent orders are lost to faster competitors.',
    cost: 'In fast retail channels, response latency directly reduces conversion.',
    cliffhanger: 'Fix Mode sets response SLAs and templates for faster close rates.',
    kpi: 'Response time, Inquiry-to-order conversion',
    actionPack: 'MKT-P4'
  },
  {
    id: 'MKT_04',
    pillar: 'Market',
    signal_tags: ['bundle_engine_missing'],
    hook: 'Bundle Blindness',
    leak: 'Selling items one-by-one instead of ready kits reduces average order value and checkout speed.',
    cost: 'Missed bundles leave margin on the counter and slow service in peak hours.',
    cliffhanger: 'Fix Mode deploys back-to-school and office kits with scripts.',
    kpi: 'AOV, Bundle adoption %',
    actionPack: 'MKT-P2'
  },

  // Leadership
  {
    id: 'LDR_01',
    pillar: 'Leadership',
    signal_tags: ['kpi_cadence_gap'],
    hook: 'KPI Darkness',
    leak: 'Weekly truth on stockouts, shrink, margin, and season readiness is not visible enough to drive early correction.',
    cost: 'Late leak detection increases loss size and reaction cost.',
    cliffhanger: 'Fix Mode puts KPI visibility and weekly review cadence in place.',
    kpi: 'KPI review compliance, Leak trend',
    actionPack: 'LDR-P1'
  },
  {
    id: 'LDR_02',
    pillar: 'Leadership',
    signal_tags: ['decision_bottleneck', 'approval_bottleneck'],
    hook: 'Approval Bottleneck',
    leak: 'Routine exceptions wait for one decision-maker, slowing sales and resolution speed.',
    cost: 'Decision delay creates checkout friction and lost demand.',
    cliffhanger: 'Fix Mode sets delegation limits and approval matrixes.',
    kpi: 'Decision latency, Approval backlog',
    actionPack: 'LDR-P2'
  },
  {
    id: 'LDR_03',
    pillar: 'Leadership',
    signal_tags: ['no_variance_review', 'training_planning_gap'],
    hook: 'Repeat Leak Tax',
    leak: 'The same mistakes recur because corrective actions are not embedded into standard routines.',
    cost: 'Repeat leak tax drains margin and team energy every week.',
    cliffhanger: 'Fix Mode enforces standards coaching and repeat-leak elimination rituals.',
    kpi: 'Repeat incident rate, Task closure %',
    actionPack: 'LDR-P3'
  },

  // Innovation
  {
    id: 'INN_01',
    pillar: 'Innovation',
    signal_tags: ['planning_gap', 'no_testing_rhythm'],
    hook: 'Seasonality Shock',
    leak: 'Season campaigns are reactive and late, causing stock mismatches and missed demand windows.',
    cost: 'Missing seasonal timing weakens both sales and stock efficiency.',
    cliffhanger: 'Fix Mode builds seasonal campaign and pre-buy calendars.',
    kpi: 'Seasonal readiness score, Campaign execution score',
    actionPack: 'INN-P1'
  },
  {
    id: 'INN_02',
    pillar: 'Innovation',
    signal_tags: ['service_inconsistency', 'offer_measurement_gap'],
    hook: 'Service Opportunity Leak',
    leak: 'High-margin add-on services are offered inconsistently and not tracked as a growth lever.',
    cost: 'Service underutilization lowers basket value and customer convenience stickiness.',
    cliffhanger: 'Fix Mode productizes services and tracks upsell performance.',
    kpi: 'Service upsell adoption %, Service revenue %',
    actionPack: 'INN-P2'
  },

  // Risk
  {
    id: 'RSK_01',
    pillar: 'Risk',
    signal_tags: ['supplier_doc_gap', 'supplier_selection_undisciplined'],
    hook: 'Counterfeit/Piracy Landmine',
    leak: 'Supplier trust is not backed by verification evidence in risk categories like textbooks and branded supplies.',
    cost: 'One counterfeit incident can trigger refund waves and trust collapse with schools and parents.',
    cliffhanger: 'Fix Mode installs approved supplier firewall and authenticity checks.',
    kpi: 'Counterfeit flags, Supplier verification coverage',
    actionPack: 'RSK-P1'
  },
  {
    id: 'RSK_02',
    pillar: 'Risk',
    signal_tags: ['shrinkage_leak'],
    hook: 'Theft Tax',
    leak: 'Small items disappear quietly due to weak access and monitoring discipline.',
    cost: 'Small-ticket shrink compounds into large monthly profit erosion.',
    cliffhanger: 'Fix Mode hardens small-item theft controls and shrink dashboards.',
    kpi: 'Shrink incidents, Shrink %',
    actionPack: 'RSK-P2'
  },
  {
    id: 'RSK_03',
    pillar: 'Risk',
    signal_tags: ['receiving_slippage', 'supplier_doc_gap'],
    hook: 'Supplier Short-Delivery',
    leak: 'Supplier deliveries are accepted without rigorous counting and evidence, leaving claim recovery weak.',
    cost: 'Short-delivery losses and invoice errors quietly reduce usable margin.',
    cliffhanger: 'Fix Mode installs receiving verification and claim workflow evidence.',
    kpi: 'Short-delivery rate, Claim recovery rate',
    actionPack: 'RSK-P3'
  },
  {
    id: 'RSK_04',
    pillar: 'Risk',
    signal_tags: ['contract_gap', 'policy_vagueness'],
    hook: 'Dispute Tax',
    leak: 'Unclear terms for printing and returns create recurring refund and reprint disputes.',
    cost: 'Dispute tax shows up as rework, concessions, and trust erosion.',
    cliffhanger: 'Fix Mode installs terms-proof workflows to reduce arguments and losses.',
    kpi: 'Dispute rate %, Refund-reprint rate',
    actionPack: 'RSK-P4'
  },

  // People
  {
    id: 'PPL_01',
    pillar: 'People',
    signal_tags: ['training_gap', 'service_inconsistency'],
    hook: 'Scriptless Selling',
    leak: 'Staff do not consistently guide customers to faster and higher-value purchases like kits and relevant add-ons.',
    cost: 'Scriptless selling lowers conversion speed and average basket value.',
    cliffhanger: 'Fix Mode certifies product navigation and bundle scripts across shifts.',
    kpi: 'AOV, Bundle adoption %, Service consistency score',
    actionPack: 'PPL-P2'
  },
  {
    id: 'PPL_02',
    pillar: 'People',
    signal_tags: ['incentive_misalignment', 'accountability_soft'],
    hook: 'Careless Handling',
    leak: 'Accuracy and control behaviors are under-incentivized, so miscounts, variances, and avoidable errors persist.',
    cost: 'Careless handling increases shrink, disputes, and operational rework.',
    cliffhanger: 'Fix Mode aligns incentives to profitable and accurate behavior.',
    kpi: 'Shrink %, Errors by staff, Margin per staff',
    actionPack: 'PPL-P1'
  }
];

const toLibraryLeakItems = (row: LeakRow): LibraryItem[] => [
  {
    id: `LIB_STATIONERY_${row.id}_LEAK`,
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
    id: `LIB_STATIONERY_${row.id}_HOOK`,
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
    id: `LIB_STATIONERY_${row.pillar.toUpperCase()}_STR`,
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
    id: `LIB_STATIONERY_${row.pillar.toUpperCase()}_KPI`,
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

const speciesBase = ['Stationery & bookstore', 'Stationery & Bookstore'];
const speciesSchool = 'School stationery retail (exercise books, pens, geometry sets, bags)';
const speciesBookstore = 'Bookstore (textbooks + novels + reference)';
const speciesPrintHybrid = 'Printing / photocopy + stationery hybrid';
const speciesOffice = 'Office supply store (B2B + retail)';
const speciesWholesale = 'Wholesale stationery distributor';
const speciesReligious = 'Religious books & church supply';
const speciesKids = 'Kids learning materials / toys + books';
const speciesOnline = 'Online-first (WhatsApp/IG orders + delivery)';
const speciesExamPop = 'Exam-season pop-up / seasonal heavy store';

const missionRowsForSpecies = (
  code: string,
  lineType: string[],
  texts: Record<PillarId, string>
): LibraryItem[] => {
  const pillars: PillarId[] = ['Operations', 'Money', 'Market', 'Leadership', 'Innovation', 'Risk', 'People'];
  return pillars.map((pillar) => ({
    id: `MB_STATIONERY_${code}_${pillar.toUpperCase()}`,
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
  ...missionRowsForSpecies('S1', [speciesSchool], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. School stationery performance is exposed to stockout and season-readiness gaps during list-based demand spikes. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode secures Top-50 readiness and fast confirmation workflows tied to {KPI}.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Bargain drift and weak credit controls can make busy peak periods cash-starved. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces margin-safe pricing and collections cadence.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Repeat parent and teacher demand likely depends too much on chance rather than a retention system. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds a repeat and school-outreach engine.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. The team may react fast but still repeat the same leaks each term. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs KPI cadence and no-repeat routines.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Bundle and seasonal campaign opportunities may be underused. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches kit and season test sprints.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Supplier authenticity and shrink controls may be too informal for peak volume pressure. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens supplier and shrink safeguards.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Service and selling quality likely varies by shift, reducing consistency and speed. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode certifies scripts and role behavior.'
  }),
  ...missionRowsForSpecies('S2', [speciesPrintHybrid], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Printing hybrids often leak through queue chaos and untracked job flow. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs ticketed queue and proof-before-print controls.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Hidden service costing can turn high activity into low profit. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces print cost pricing and margin tracking by job type.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Response and reliability gaps can push recurring print customers to faster shops. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode sets response SLA and account retention routines.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Decision and standards drift may be inflating reprints and disputes. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode defines owner-independent rules and audits.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Service productization likely has room to lift margins. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds service package offers and upsell scripts.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Print dispute and proof gaps can create repeated settlement losses. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs terms-proof dispute defense.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Queue handling and ticket discipline may vary by operator. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode certifies queue SOP behavior.'
  }),
  ...missionRowsForSpecies('S3', [speciesBookstore], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Bookstore models are vulnerable to dead-stock buildup and slow shelf-turn cycles. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode resets rack economics and reorder discipline.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Margin and buying discipline may be weak, trapping cash in low-turn titles. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces open-to-buy and markdown ladder controls.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Repeat reader retention and referral loops may be under-structured. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds reader retention and recommendation routines.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. KPI visibility may be too weak to catch title-level leaks early. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode sets weekly title and turn reviews.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. New title testing cadence may be below market pace. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs micro-tests and winner scaling.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Counterfeit/piracy and return disputes can become trust-critical risks. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs supplier verification and policy controls.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Selling guidance and product navigation may be inconsistent. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode standardizes scripts and curation behavior.'
  }),
  ...missionRowsForSpecies('S4', [speciesOffice], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Office-supply models leak when account fulfillment and variant control are informal. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode stabilizes account-level stock and delivery execution.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Credit and pricing inconsistency can make B2B growth cash-negative. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode tightens credit and margin governance.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Contract outreach and renewal discipline may be weak. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds account plans and renewal cadence.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Approvals and ownership gaps may delay response to accounts. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces delegation and KPI closure.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Bundle and service mix upgrades may be underexploited in B2B. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches office-pack experiments.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Supplier and dispute controls may not be strong enough for account scale. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens verification and proof standards.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Account handling quality may depend too heavily on individual staff. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode certifies account-service standards.'
  }),
  ...missionRowsForSpecies('S5', [speciesWholesale], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Wholesale operations leak through pack-size confusion and dispatch proof gaps. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode secures SKU-pack truth and dispatch controls.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Discount drift and credit load can flatten wholesale margin quickly. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode restores pricing and collections discipline.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Account concentration and weak follow-up can reduce order stability. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode strengthens account retention cadence.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. KPI cadence may be too weak for wholesale complexity. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs weekly control rhythms.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Service and offer experimentation may be underpowered. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches measured offer tests.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Shrink and short-delivery risks can compound at volume. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds receiving and shrink defense.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Accuracy and policy discipline may vary by shift. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode standardizes role behavior.'
  }),
  ...missionRowsForSpecies('S6', [speciesReligious], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Religious-book supply can leak via dead stock and weak request tracking. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode improves curation and stock-turn control.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Category margin visibility may be low where demand is uneven. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs category-level margin governance.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Community repeat demand may be underleveraged. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds community follow-up and referral loops.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Decision and standards consistency may need reinforcement. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode sets weekly cadence and roles.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Offer packaging and value-add services may be limited. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs targeted offer tests.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Supplier authenticity and return policy ambiguity may expose trust. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode tightens supplier and dispute controls.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Service guidance quality may vary too much across staff. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode certifies customer support scripts.'
  }),
  ...missionRowsForSpecies('S7', [speciesKids], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Kids-learning models leak through assortment mismatch and dead stock buildup. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode aligns stock to repeat demand signals.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Buying and markdown discipline may be weakening margin quality. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces test-to-buy controls.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Parent retention and bundle conversion may be underperforming. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds parent-focused repeat and kit offers.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Workflow consistency may break under peak parent traffic. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode stabilizes standards and ownership.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Product and service experimentation may be too irregular. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches monthly micro-tests.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Return disputes and shrink can rise in small-item categories. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens controls and policy enforcement.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Script and policy adherence may vary by staff. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode certifies roles and scripts.'
  }),
  ...missionRowsForSpecies('S8', [speciesOnline], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Online-first models leak through response and fulfillment inconsistency. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode secures inquiry-to-delivery flow.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Margin can leak quickly through discounting and return disputes online. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode protects per-order economics and refund controls.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Slow response and weak repeat systems are likely reducing conversion. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces response SLAs and retention routines.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Coordination may be too reactive for online demand speed. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode aligns daily control cadence.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Offer test cadence may be below growth potential. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches test-to-scale loops.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Delivery and refund disputes can escalate without proof discipline. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs dispute-proof evidence flow.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Response quality may vary by handler. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode certifies online service behavior.'
  }),
  ...missionRowsForSpecies('S9', [speciesExamPop], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Seasonal-heavy models leak through late stocking and queue overload. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs peak-readiness and queue controls.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Peak-period discounting and credit shortcuts may collapse margin. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode protects peak margin and cash routines.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Peak buyers may not convert to repeat cycles after season. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds post-season retention flows.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Priority and execution pressure may cause repeated mistakes. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces weekly control under pressure.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Seasonal offer and service optimization may be reactive. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode structures campaign and service tests.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Peak intensity can raise shrink and dispute exposure quickly. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens peak-risk controls.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Temporary and rush staffing may weaken standards. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode locks simple role certification.'
  }),

  // Base fallback mission brief
  ...missionRowsForSpecies('S0', speciesBase, {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Stationery and bookstore performance usually leaks through stock truth, season planning, and queue control gaps. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs a 7-day stabilization sprint and a 30-day control build tied to {KPI}.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. This often creates Margin Mirage: sales move while category margin and cash stability stay weak. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens pricing, discount, and collections controls.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Repeat demand and contract reliability are likely under-systemized. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds retention and outreach engines.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. The business may be working hard but paying repeat leak tax. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces KPI cadence and action closure.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Offers and services may rely on instinct over measured tests. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches a controlled test pipeline.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Supplier, shrink, and dispute controls may be too informal for stable scale. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs practical risk firewalls.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Service and policy consistency likely varies by staff. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode aligns incentives, scripts, and onboarding.'
  })
];

export const library: LibraryItem[] = [
  ...strengthRows,
  ...leakRows.flatMap(toLibraryLeakItems),
  ...missionBriefRows
];
