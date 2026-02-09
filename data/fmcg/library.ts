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
};

const pillarStrengthRows: Array<{
  pillar: PillarId;
  strength: string;
  hook: string;
  kpi: string;
}> = [
  {
    pillar: 'Operations',
    strength: 'Operations run with stock truth, disciplined replenishment, pick-pack-check execution, planned routes, and POD-backed delivery reliability.',
    hook: 'Stock Discipline Engine',
    kpi: 'Fill Rate %, OTIF %, Stockout incidents/week (Top SKUs), Inventory Accuracy %, Pick Accuracy %, Fuel/drop'
  },
  {
    pillar: 'Money',
    strength: 'Money is controlled through SKU margin visibility, discount guardrails, AR cadence, daily reconciliation, and inventory cash-release rules.',
    hook: 'Margin-to-Cash Control',
    kpi: 'Gross Margin % by SKU, Net Margin %, DSO, Discount %, Reconciliation variance, Inventory turns'
  },
  {
    pillar: 'Market',
    strength: 'Market execution is stable with repeat-order protection, segmented visit cadence, shelf availability discipline, and fast complaint closure.',
    hook: 'Repeat Revenue Flywheel',
    kpi: 'Repeat order rate, Churn %, Active outlet count, Share-of-shelf sample, Complaint closure time'
  },
  {
    pillar: 'Leadership',
    strength: 'Leadership runs on visible KPIs, action closure, delegated approvals, cross-functional alignment, and policy enforcement.',
    hook: 'Cadence Over Chaos',
    kpi: 'Action closure %, Decision latency, KPI update compliance %, Repeat incident rate, Shared KPI attainment %'
  },
  {
    pillar: 'Innovation',
    strength: 'Innovation is practical and measured: test-and-learn cycles, structured order capture, SKU focus, and data discipline tied to margin outcomes.',
    hook: 'Compounding Improvement Loop',
    kpi: 'Tests/month, Order error rate, New channel contribution %, Bundle adoption %, Data completeness %'
  },
  {
    pillar: 'Risk',
    strength: 'Risk controls are active with shrinkage checks, AR defenses, POD dispute controls, cash governance, supplier compliance, and continuity routines.',
    hook: 'Leakage Shield System',
    kpi: 'Shrinkage %, AR default %, Disputes/month, Reconciliation exceptions, Compliance pass %, Incident closure time'
  },
  {
    pillar: 'People',
    strength: 'People performance is consistent through scorecards, targeted training, cross-coverage, speak-up safety, and onboarding structure.',
    hook: 'Behavior-to-Profit Alignment',
    kpi: 'Collections/rep, POD %, Pick errors/100 lines, Training coverage %, Turnover %, Shift variance'
  }
];

const leakRows: LeakRow[] = [
  // OPS packs
  {
    id: 'OPS_A',
    pillar: 'Operations',
    signal_tags: ['stockout_tax', 'restock_delay'],
    hook: 'Stockout Tax',
    leak: 'Fast movers are starving while demand is present, forcing firefighting replenishment and lost repeat baskets.',
    cost: 'Top-SKU stockouts in FMCG commonly bleed 2-6% of monthly sales through lost repeats and emergency restocking.',
    cliffhanger: 'Fix Mode rebuilds Top-SKU replenishment so availability becomes automatic, not emotional.',
    kpi: 'Fill Rate %, Top-SKU stockout incidents/week'
  },
  {
    id: 'OPS_B',
    pillar: 'Operations',
    signal_tags: ['inventory_accuracy_gap', 'shrinkage_leak'],
    hook: 'Inventory Fog',
    leak: 'System stock and physical stock are drifting, creating phantom availability and wrong purchase decisions.',
    cost: 'Uncontrolled variance typically hides 0.5-3% of inventory value monthly, plus downstream stockout loss.',
    cliffhanger: 'Fix Mode turns stock guessing into stock truth with cycle count cadence and variance ownership.',
    kpi: 'Inventory Accuracy %, Shrinkage %'
  },
  {
    id: 'OPS_C',
    pillar: 'Operations',
    signal_tags: ['dispatch_delivery_instability', 'receiving_slippage'],
    hook: 'Pick Error Leak',
    leak: 'Warehouse accuracy is inconsistent, so wrong picks and redeliveries are consuming delivery capacity.',
    cost: 'Even low dispatch error rates create repeat fuel, labor, and trust loss that compounds every week.',
    cliffhanger: 'Fix Mode enforces pick-pack-check and dispatch audits so wrong supply stops being normal.',
    kpi: 'Pick Accuracy %, Wrong-supply return rate %'
  },
  {
    id: 'OPS_D',
    pillar: 'Operations',
    signal_tags: ['dispatch_delivery_instability', 'contract_gap'],
    hook: 'Route Bleeding',
    leak: 'Routes are consuming fuel/time with weak sequencing and missing POD, increasing disputes and re-deliveries.',
    cost: 'Route inefficiency of 10-20% is common and shows up as fuel burn, fewer drops/day, and avoidable disputes.',
    cliffhanger: 'Fix Mode tightens route design and POD discipline so delivery stops behaving like a gamble.',
    kpi: 'Fuel/drop, Drops/day, POD %'
  },
  {
    id: 'OPS_E',
    pillar: 'Operations',
    signal_tags: ['returns_damage_blindspot', 'expiry_rotation_gap'],
    hook: 'Silent Margin Erosion',
    leak: 'Returns, damage, and expiry are being processed as routine noise instead of root-caused loss.',
    cost: 'Unmanaged returns/damages often consume 1-4% of monthly sales, with expiry quietly wiping category profit.',
    cliffhanger: 'Fix Mode isolates top loss reasons and installs quarantine + FEFO routines to stop recurrence.',
    kpi: 'Returns %, Damage %, Expiry loss UGX/month'
  },
  {
    id: 'OPS_F',
    pillar: 'Operations',
    signal_tags: ['receiving_slippage', 'supplier_terms_weak'],
    hook: 'Receiving Blindspot',
    leak: 'Supplier and receiving errors are entering stock truth, then resurfacing later as disputes and stockouts.',
    cost: 'Supplier OTIF volatility drives rush purchases and avoidable emergency costs while accuracy declines.',
    cliffhanger: 'Fix Mode locks receiving checks and supplier scorecards so supplier chaos stops cascading internally.',
    kpi: 'Supplier OTIF %, Receiving error rate'
  },

  // MONEY packs
  {
    id: 'MNY_A',
    pillar: 'Money',
    signal_tags: ['pricing_margin_blindspot', 'category_margin_blindspot'],
    hook: 'Margin Mirage',
    leak: 'Sales activity is high, but discounts, returns, shrinkage, fuel, and credit losses are swallowing net margin.',
    cost: 'Unmeasured margin killers can leak 2-8% of revenue, and higher volume often amplifies the leak.',
    cliffhanger: 'Fix Mode builds a margin bridge so every leak has an owner, a number, and a deadline.',
    kpi: 'Net Margin %, Leak UGX/month'
  },
  {
    id: 'MNY_B',
    pillar: 'Money',
    signal_tags: ['discounting_leak', 'pricing_inconsistency'],
    hook: 'Discount Addiction',
    leak: 'Pricing and discounting behavior is inconsistent, training customers to negotiate instead of buying value.',
    cost: 'A 3-5% unmanaged discount drift can erase a major share of profit in thin-margin FMCG models.',
    cliffhanger: 'Fix Mode installs discount guardrails so discounting becomes strategic, not emotional.',
    kpi: 'Discount %, Gross Margin %'
  },
  {
    id: 'MNY_C',
    pillar: 'Money',
    signal_tags: ['credit_terms_risk', 'payment_delay_chokehold'],
    hook: 'Credit Sinkhole',
    leak: 'Receivables are growing faster than collections, forcing the business to finance customer working capital.',
    cost: 'Weak AR discipline typically bleeds 1-3% of revenue through delays/defaults and triggers emergency borrowing.',
    cliffhanger: 'Fix Mode converts collections into routine operations with tiered credit controls.',
    kpi: 'DSO, Overdue AR %'
  },
  {
    id: 'MNY_D',
    pillar: 'Money',
    signal_tags: ['cash_recon_gap', 'shrinkage_leak'],
    hook: 'Cash Handling Ghosts',
    leak: 'Small reconciliation variances are accumulating and hiding true business performance.',
    cost: 'Minor daily cash variances compound into material monthly loss and distort decision quality.',
    cliffhanger: 'Fix Mode locks reconciliation truth and exception control so numbers can be trusted again.',
    kpi: 'Reconciliation variance, Cash exceptions/week'
  },
  {
    id: 'MNY_E',
    pillar: 'Money',
    signal_tags: ['offer_measurement_gap', 'discounting_leak'],
    hook: 'Promo Burn',
    leak: 'Promotions are moving volume without clear margin contribution or repeat-order lift.',
    cost: '20-60% of promo spend often fails to produce profit improvement when ROI discipline is missing.',
    cliffhanger: 'Fix Mode converts promos into measured experiments so only profitable campaigns survive.',
    kpi: 'Promo ROI, Margin during promo %'
  },
  {
    id: 'MNY_F',
    pillar: 'Money',
    signal_tags: ['slow_mover_attachment', 'supplier_terms_weak'],
    hook: 'Cash Freeze Purchase',
    leak: 'Slow-moving stock is trapping cash while winners are underfunded and restocking power weakens.',
    cost: 'Dead stock commonly traps 5-25% of inventory value, driving stockouts and borrowing pressure.',
    cliffhanger: 'Fix Mode releases trapped cash and resets buying logic around fast-moving winners.',
    kpi: 'Inventory turns, Dead stock value UGX'
  },

  // MARKET packs
  {
    id: 'MKT_A',
    pillar: 'Market',
    signal_tags: ['followup_gap', 'service_inconsistency'],
    hook: 'Silent Churn',
    leak: 'Repeat customers are quietly reducing order frequency and basket size without formal churn events.',
    cost: 'Losing key repeat accounts can erase months of growth and leave inventory mix unstable.',
    cliffhanger: 'Fix Mode finds repeat-order breakers and launches a protection routine for key accounts.',
    kpi: 'Repeat order rate %, Churn %'
  },
  {
    id: 'MKT_B',
    pillar: 'Market',
    signal_tags: ['segment_blindspot', 'followup_gap'],
    hook: 'Coverage Waste',
    leak: 'Visit effort is spread evenly, so high-value outlets are under-served while low-return coverage consumes time.',
    cost: 'Unsegmented coverage depresses sales/rep productivity and makes repeat demand fragile.',
    cliffhanger: 'Fix Mode applies outlet segmentation and visit cadence to protect high-value demand first.',
    kpi: 'Visit compliance %, Sales/rep/day'
  },
  {
    id: 'MKT_C',
    pillar: 'Market',
    signal_tags: ['value_story_gap', 'stockout_tax'],
    hook: 'Shelf Neglect Leak',
    leak: 'Shelf visibility and availability are inconsistent, giving competitors easier replacement access.',
    cost: 'Weak shelf execution causes gradual volume erosion even when price is competitive.',
    cliffhanger: 'Fix Mode restores shelf discipline where it matters most for repeat pull-through.',
    kpi: 'Share-of-shelf sample, Shelf stockout %'
  },
  {
    id: 'MKT_D',
    pillar: 'Market',
    signal_tags: ['channel_dependency', 'planning_gap'],
    hook: 'Expansion Chaos',
    leak: 'Territory and channel expansion is outpacing service reliability and working-capital control.',
    cost: 'Uncontrolled expansion increases delivery failures, disputes, and AR stress simultaneously.',
    cliffhanger: 'Fix Mode expands only where reliability and margin are sustainable.',
    kpi: 'OTIF %, DSO, Disputes/month'
  },
  {
    id: 'MKT_E',
    pillar: 'Market',
    signal_tags: ['complaint_handling_gap', 'service_inconsistency'],
    hook: 'Complaint Loop',
    leak: 'Complaint resolution is reactive and non-learning, allowing repeat service failures to compound.',
    cost: 'Unresolved complaints increase churn probability and weaken pricing power over time.',
    cliffhanger: 'Fix Mode eliminates top complaint causes so trust stops bleeding.',
    kpi: 'Complaint closure time, Repeat complaint %'
  },
  {
    id: 'MKT_F',
    pillar: 'Market',
    signal_tags: ['bundle_engine_missing', 'value_story_gap'],
    hook: 'Basket Blindness',
    leak: 'Average order value is shrinking because bundle and cross-sell mechanics are weak.',
    cost: 'Lower basket size raises cost-to-serve per UGX sold and forces harder new-customer acquisition.',
    cliffhanger: 'Fix Mode builds bundle plays that grow basket size without discount addiction.',
    kpi: 'Average order value, Bundle adoption %'
  },

  // LEADERSHIP packs
  {
    id: 'LDR_A',
    pillar: 'Leadership',
    signal_tags: ['kpi_cadence_gap', 'no_kpi_ownership'],
    hook: 'KPI Darkness',
    leak: 'Core leaks stay hidden because the business is operating without a stable KPI truth wall.',
    cost: 'Late detection inflates the cost of stockouts, overdue AR, shrinkage, and failed delivery recovery.',
    cliffhanger: 'Fix Mode installs visible KPI cadence so action becomes faster and cheaper.',
    kpi: 'KPI update compliance %, Alert response time'
  },
  {
    id: 'LDR_B',
    pillar: 'Leadership',
    signal_tags: ['meeting_no_action', 'no_variance_review'],
    hook: 'Repeat Leak Tax',
    leak: 'Recurring issues are discussed but not structurally closed, so the business keeps paying the same tax.',
    cost: 'Repeat stockouts, disputes, and returns create permanent margin drain when closure discipline is weak.',
    cliffhanger: 'Fix Mode enforces proof-of-fix so repeated incidents decline instead of recycling.',
    kpi: 'Action closure %, Repeat incidents'
  },
  {
    id: 'LDR_C',
    pillar: 'Leadership',
    signal_tags: ['decision_bottleneck', 'approval_bottleneck'],
    hook: 'Approval Gridlock',
    leak: 'Centralized approvals are delaying dispatch, pricing, and collections decisions that should move in real time.',
    cost: 'Decision latency converts speed into revenue leakage and worsens service reliability.',
    cliffhanger: 'Fix Mode removes approval bottlenecks without losing control.',
    kpi: 'Decision latency, OTIF %'
  },
  {
    id: 'LDR_D',
    pillar: 'Leadership',
    signal_tags: ['cross_team_friction', 'cross_function_breakdown'],
    hook: 'Internal Friction Leak',
    leak: 'Sales, warehouse, and finance are optimizing locally instead of to shared profit outcomes.',
    cost: 'Cross-team misalignment silently wastes payroll time and drives customer trust decay.',
    cliffhanger: 'Fix Mode aligns teams around shared KPIs so conflict stops consuming margin.',
    kpi: 'Shared KPI attainment %, Cross-team issue cycle time'
  },
  {
    id: 'LDR_E',
    pillar: 'Leadership',
    signal_tags: ['policy_vagueness', 'accountability_soft'],
    hook: 'Policy Drift',
    leak: 'Credit, discount, and return rules exist but are inconsistently enforced under pressure.',
    cost: 'Policy loopholes become margin loopholes and are quickly exploited by both teams and customers.',
    cliffhanger: 'Fix Mode enforces policy through workflow and exception tracking.',
    kpi: 'Policy compliance %, Exception rate'
  },
  {
    id: 'LDR_F',
    pillar: 'Leadership',
    signal_tags: ['training_planning_gap', 'role_clarity_gap'],
    hook: 'Performance Guessing',
    leak: 'Coaching and performance decisions are made without consistent role-level scorecards.',
    cost: 'Payroll is spent on activity while performance variance stays high.',
    cliffhanger: 'Fix Mode converts performance into measurable scorecards and coaching loops.',
    kpi: 'Scorecard coverage %, Productivity variance'
  },

  // INNOVATION packs
  {
    id: 'INN_A',
    pillar: 'Innovation',
    signal_tags: ['no_testing_rhythm'],
    hook: 'No Test Rhythm',
    leak: 'Improvements are being guessed, not tested, so change effort does not reliably move KPIs.',
    cost: 'Untested changes waste time and money while measured improvements are delayed.',
    cliffhanger: 'Fix Mode installs a test-and-learn rhythm that compounds measurable gains.',
    kpi: 'Tests/month, Improvement win rate'
  },
  {
    id: 'INN_B',
    pillar: 'Innovation',
    signal_tags: ['offer_measurement_gap', 'no_standard_work'],
    hook: 'App Without Process',
    leak: 'Order capture remains unstructured, creating recurring wrong orders and avoidable dispute load.',
    cost: 'Unstructured ordering multiplies correction costs and customer frustration.',
    cliffhanger: 'Fix Mode structures order capture so errors fall and scaling becomes easier.',
    kpi: 'Order error rate, Tool adoption %'
  },
  {
    id: 'INN_C',
    pillar: 'Innovation',
    signal_tags: ['sku_clutter', 'bundle_engine_missing'],
    hook: 'Assortment Chaos',
    leak: 'SKU sprawl and weak bundle design are increasing complexity while suppressing basket growth.',
    cost: 'Slow movers trap cash and starve fast movers, reducing both turns and order value.',
    cliffhanger: 'Fix Mode rationalizes assortment and installs profitable bundle logic.',
    kpi: 'Inventory turns, Average order value'
  },
  {
    id: 'INN_D',
    pillar: 'Innovation',
    signal_tags: ['planning_gap', 'dispatch_delivery_instability'],
    hook: 'Route Intelligence Gap',
    leak: 'Routing performance is not measured consistently, so inefficiencies persist unchanged.',
    cost: '10-20% logistics inefficiency is common when route design is unmanaged.',
    cliffhanger: 'Fix Mode makes route performance measurable and continuously improvable.',
    kpi: 'Fuel/drop, Drops/day'
  },
  {
    id: 'INN_E',
    pillar: 'Innovation',
    signal_tags: ['no_kpi_ownership', 'no_market_feedback_loop'],
    hook: 'Data Discipline Gap',
    leak: 'Metrics are fragmented, so teams debate numbers and react late to known leak patterns.',
    cost: 'Bad data produces expensive decisions and delayed leak detection.',
    cliffhanger: 'Fix Mode standardizes trusted data flows and alert-driven response.',
    kpi: 'Data completeness %, Alert response time'
  },
  {
    id: 'INN_F',
    pillar: 'Innovation',
    signal_tags: ['supplier_terms_weak', 'supplier_selection_undisciplined'],
    hook: 'Supplier Collaboration Gap',
    leak: 'Supplier variability is forcing emergency operations instead of predictable planning.',
    cost: 'Unstable supply drives stockouts, emergency purchases, and avoidable cash strain.',
    cliffhanger: 'Fix Mode aligns supplier collaboration to planning reality and peak demand.',
    kpi: 'Supplier OTIF %, Stockout rate'
  },

  // RISK packs
  {
    id: 'RSK_A',
    pillar: 'Risk',
    signal_tags: ['shrinkage_leak', 'inventory_accuracy_gap'],
    hook: 'Shrinkage Fog',
    leak: 'Shrinkage is being absorbed as normal, not attacked as preventable loss.',
    cost: 'Uncontrolled shrinkage often runs 0.5-3% of inventory value, plus secondary stockout impact.',
    cliffhanger: 'Fix Mode applies simple controls and counts that reduce shrinkage quickly.',
    kpi: 'Shrinkage %, Inventory accuracy %'
  },
  {
    id: 'RSK_B',
    pillar: 'Risk',
    signal_tags: ['credit_contract_gap', 'payment_delay_chokehold'],
    hook: 'AR Exposure',
    leak: 'Credit exposure is rising faster than collection control, converting growth into financial risk.',
    cost: 'Slow AR velocity weakens restocking power and raises default plus borrowing exposure.',
    cliffhanger: 'Fix Mode installs AR defense tiers and escalation routines before defaults spike.',
    kpi: 'DSO, Default rate %'
  },
  {
    id: 'RSK_C',
    pillar: 'Risk',
    signal_tags: ['contract_gap', 'dispatch_delivery_instability'],
    hook: 'Dispute Tax',
    leak: 'Weak POD and unclear dispute rules are creating short-supply claims and forced settlement discounts.',
    cost: 'Disputes consume delivery time, reduce repeat confidence, and erode realized margin.',
    cliffhanger: 'Fix Mode locks POD and dispute policy so trust and margin are protected.',
    kpi: 'POD %, Dispute rate'
  },
  {
    id: 'RSK_D',
    pillar: 'Risk',
    signal_tags: ['cash_recon_gap'],
    hook: 'Cash Control Exposure',
    leak: 'Cash custody and reconciliation controls are too loose for current transaction volume.',
    cost: 'Weak controls create silent leakage and decision-quality decay through unreliable numbers.',
    cliffhanger: 'Fix Mode hardens reconciliation and audit trails so cash truth is non-negotiable.',
    kpi: 'Reconciliation variance, Cash exception count'
  },
  {
    id: 'RSK_E',
    pillar: 'Risk',
    signal_tags: ['supplier_doc_gap', 'compliance_blocker_risk'],
    hook: 'Authenticity & Compliance Risk',
    leak: 'Supplier verification and compliance evidence are weak, increasing product and regulatory exposure.',
    cost: 'One authenticity or compliance incident can trigger rapid demand and reputation damage.',
    cliffhanger: 'Fix Mode establishes verification and compliance routines before a trust event occurs.',
    kpi: 'Compliance pass %, Approved supplier coverage %'
  },
  {
    id: 'RSK_F',
    pillar: 'Risk',
    signal_tags: ['safe_handling_gap', 'disaster_recovery_gap'],
    hook: 'Continuity Fragility',
    leak: 'Critical incident readiness is weak across safety, data, and business continuity controls.',
    cost: 'One major event can erase months of profit without continuity and response discipline.',
    cliffhanger: 'Fix Mode installs practical continuity and incident control so disruptions stay survivable.',
    kpi: 'Incident closure time, Critical-risk coverage %'
  },

  // PEOPLE packs
  {
    id: 'PPL_A',
    pillar: 'People',
    signal_tags: ['incentive_misalignment', 'role_clarity_gap'],
    hook: 'Incentive Misfire',
    leak: 'Current incentives reward behavior that can grow sales while weakening profit and service quality.',
    cost: 'When incentives ignore collections and discipline, discount leakage and risky credit rise together.',
    cliffhanger: 'Fix Mode aligns scorecards and incentives to profitable growth behaviors.',
    kpi: 'Collections ratio, Discount %'
  },
  {
    id: 'PPL_B',
    pillar: 'People',
    signal_tags: ['service_inconsistency', 'contract_gap'],
    hook: 'Last-Mile Behavior Risk',
    leak: 'Rep and driver execution variance is causing disputes, wrong deliveries, and avoidable trust loss.',
    cost: 'Behavior drift at the last mile increases disputes and repeat-order erosion.',
    cliffhanger: 'Fix Mode standardizes rep-driver discipline with proof-based compliance.',
    kpi: 'POD %, Delivery dispute rate'
  },
  {
    id: 'PPL_C',
    pillar: 'People',
    signal_tags: ['training_gap', 'training_planning_gap'],
    hook: 'Warehouse Error Drift',
    leak: 'Warehouse errors are repeating because training is informal and standards are not certified.',
    cost: 'Untrained routines create recurring pick errors, re-deliveries, and wasteful correction time.',
    cliffhanger: 'Fix Mode installs warehouse SOP certification so error rates fall quickly.',
    kpi: 'Pick accuracy %, Error rate/100 lines'
  },
  {
    id: 'PPL_D',
    pillar: 'People',
    signal_tags: ['hero_staff_dependence', 'onboarding_gap'],
    hook: 'Single Point Failure',
    leak: 'Critical tasks rely on too few people, so absence instantly destabilizes throughput and quality.',
    cost: 'Hidden fragility cost appears as downtime, rushed errors, and leadership overload.',
    cliffhanger: 'Fix Mode builds cross-coverage so operations remain stable when key staff are absent.',
    kpi: 'Coverage %, Staffing-related downtime'
  },
  {
    id: 'PPL_E',
    pillar: 'People',
    signal_tags: ['fear_silence', 'blame_culture'],
    hook: 'Hidden Leak Culture',
    leak: 'Teams avoid reporting issues early, so small leaks grow quietly into expensive incidents.',
    cost: 'Delayed issue reporting amplifies repeat failures, disputes, and rework costs.',
    cliffhanger: 'Fix Mode creates safe reporting and no-blame closure discipline that removes repeat leaks.',
    kpi: 'Issues reported/week, Repeat incident %'
  },
  {
    id: 'PPL_F',
    pillar: 'People',
    signal_tags: ['onboarding_gap', 'peak_season_burnout'],
    hook: 'Ramp-Time Loss',
    leak: 'Weak onboarding and retention controls are increasing early-stage errors and turnover disruption.',
    cost: 'Poor onboarding inflates ramp-time losses and raises avoidable mistakes in customer-facing workflows.',
    cliffhanger: 'Fix Mode installs onboarding and retention controls to protect consistency as the team grows.',
    kpi: 'Ramp time, Turnover %'
  }
];

const toLibraryLeakItems = (row: LeakRow): LibraryItem[] => [
  {
    id: `LIB_FMCG_${row.id}_LEAK`,
    industry: 'retail',
    line_type: ['all'],
    pillar: row.pillar,
    signal_tags: row.signal_tags,
    severity_fit: ['Critical', 'Watch', 'Emergency'],
    business_size_fit: allSizes,
    text: row.leak,
    type: 'leak',
    hook_text: row.hook,
    cost_text: row.cost,
    cliffhanger_text: row.cliffhanger,
    kpi_text: row.kpi
  },
  {
    id: `LIB_FMCG_${row.id}_HOOK`,
    industry: 'retail',
    line_type: ['all'],
    pillar: row.pillar,
    signal_tags: row.signal_tags,
    severity_fit: allSeverity,
    business_size_fit: allSizes,
    text: row.hook,
    type: 'hook',
    hook_text: row.hook,
    kpi_text: row.kpi
  }
];

const strengthRows: LibraryItem[] = pillarStrengthRows.flatMap((row) => [
  {
    id: `LIB_FMCG_${row.pillar.toUpperCase()}_STR`,
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
    id: `LIB_FMCG_${row.pillar.toUpperCase()}_KPI`,
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

const baseSpecies = 'FMCG wholesale & distribution';
const speciesA = 'Cash & Carry Wholesaler (walk-in shop, bulk buying)';
const speciesB = 'Route-to-Market Distributor (van sales to retailers)';
const speciesC = 'Sub-Distributor / Agent Network (many small resellers)';
const speciesD = 'Modern Trade / Key Accounts (supermarkets, chains)';
const speciesE = 'Importer + Regional Distributor (cross-border + bulk)';
const speciesF = 'Cold-Chain / Perishables Distributor (dairy, frozen, chilled)';

const missionRowsForSpecies = (
  code: string,
  lineType: string[],
  texts: Record<PillarId, string>
): LibraryItem[] => {
  const pillars: PillarId[] = ['Operations', 'Money', 'Market', 'Leadership', 'Innovation', 'Risk', 'People'];
  return pillars.map((pillar) => ({
    id: `MB_FMCG_${code}_${pillar.toUpperCase()}`,
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
  ...missionRowsForSpecies('S0', [baseSpecies], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Day-to-day this usually appears as stockouts, dispatch errors, and route firefighting. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode starts a 7-day stabilization sprint and a 30-day control build tied to {KPI}.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}, a familiar pattern where sales momentum hides margin and cash leakage. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode maps and closes your highest-value margin leaks first.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. This often shows as silent churn, weaker repeat orders, and price pressure. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode locks repeat-order protection and service reliability routines.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. The business is likely spending too much energy on recovery instead of prevention. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs KPI cadence, action closure, and delegated control.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Improvement is likely happening inconsistently, with weak test discipline and SKU clutter. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs measured experiments and scales only what works.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Exposure is building across shrinkage, AR, disputes, or compliance controls. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode deploys practical controls that reduce downside quickly.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Execution quality is likely varying by person, shift, or pressure cycle. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode aligns scorecards, training, and accountability to stabilize output.'
  }),

  ...missionRowsForSpecies('A', [speciesA], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. In cash-and-carry models, availability and stock truth decide trust; when either breaks, walk-in conversion drops. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode will lock Top SKU replenishment and cycle-count truth in 7 days.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Cash-and-carry should print cash, but discount drift and dead-stock freezes quietly weaken liquidity. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode will deploy margin bridge control and cash-release actions.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Repeat buying in this model depends on predictable availability, not only relationship goodwill. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode creates a repeat-order protection shelf strategy.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Without cadence, buying and restocking swing between overbuy and stockout. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs weekly KPI rhythm and ownership.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Growth upside is likely trapped in weak assortment discipline and untested bundle plays. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs a focused assortment and bundle sprint.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Shrinkage and cash-control risk are likely under-measured in this high-transaction format. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens access, reconciliation, and audit trails.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Warehouse and checkout behavior likely varies by individual habit. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs role check-offs and scorecard accountability.'
  }),

  ...missionRowsForSpecies('B', [speciesB], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Route models leak through low drop density, failed deliveries, and POD gaps. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode rebuilds route logic and POD discipline to recover fuel and trust.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Route sales often look strong while AR and delivery economics silently erode cash. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces route-level profitability and AR cadence.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Customers reduce orders when route reliability or stock consistency drops. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode protects repeat demand with service-level routing.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Owner-driven approvals are likely slowing execution on route-critical decisions. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode deploys delegated limits and shared KPIs.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Route-to-market innovation may be lagging where digital capture and route batching should be compounding gains. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs an execution-tech sprint.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Dispute and cash-handling risk are elevated in last-mile workflows. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens POD, dispute, and custody controls.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Rep and driver behaviors are likely driving leak variance across routes. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode aligns incentives to profitable delivery discipline.'
  }),

  ...missionRowsForSpecies('C', [speciesC], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. In agent networks, stock visibility and replenishment rhythm are usually the first control gaps. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode creates network stock visibility and replenishment triggers.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Many small accounts can hide large AR and leakage exposure when controls are loose. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode applies tiered credit and disciplined collections.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Coverage without consistency can dilute trust faster than it grows reach. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode identifies high-value agents and stabilizes service execution.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Network performance likely lacks a standard scorecard and enforcement rhythm. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs a network execution playbook.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Upside is likely blocked by weak standardization and limited learn loops across agents. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode productizes what works and scales it.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Agent models face elevated authenticity, pricing-drift, and leakage risk. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode deploys control points and verification rules.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Agent behavior and compliance variance are likely creating margin inconsistency. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode aligns incentives and compliance routines.'
  }),

  ...missionRowsForSpecies('D', [speciesD], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. In modern trade, OTIF and execution documentation are non-negotiable. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs OTIF control and proof discipline to reduce penalties.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Chargebacks and long payment terms can quietly choke cash despite volume growth. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds a cash-conversion defense and penalty prevention system.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Growth here depends on shelf execution and service reliability, not relationship strength alone. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode sets promo and shelf routines that preserve margin.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Key-account execution likely suffers from weak cross-functional closure rhythm. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode aligns sales, ops, and finance around shared KPIs.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Promo and assortment decisions may be under-measured in profitability terms. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode deploys ROI-based trade activation rules.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Penalty, compliance, and dispute exposure is elevated when execution proof is weak. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens compliance and acceptance evidence flows.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Merchandiser and account execution variance is likely causing avoidable penalties. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds role scorecards and compliance training.'
  }),

  ...missionRowsForSpecies('E', [speciesE], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Long lead-time models leak through forecast misses that create either stockouts or cash-frozen overstock. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs demand and replenishment discipline.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. FX swings, duties, and term mismatch are likely compressing realized margin. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode applies margin protection rules tied to landed cost and terms.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Territory growth may be masking weak cost-to-serve economics by region. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode identifies profitable territories after real delivery cost.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Regional complexity likely exceeds current delegation and KPI discipline. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs branch-level scorecards and cadence.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. SKU sprawl may be replacing disciplined portfolio strategy. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode rationalizes assortment to protect turns and margin.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Authenticity, border compliance, and leakage exposure are likely elevated. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds verification and compliance control points.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Branch variance may be creating uneven service and collections outcomes. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode standardizes routines across territories.'
  }),

  ...missionRowsForSpecies('F', [speciesF], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. In perishables, temperature and rotation discipline decide whether margin survives. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs cold-chain checks and FEFO actions immediately.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Spoilage, returns, and emergency logistics likely form the largest hidden margin leak. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode quantifies and contains spoilage in 7 days.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Perishable customers punish inconsistency quickly, so trust decay is fast and expensive. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode rebuilds reliability where repeat orders are won or lost.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. This model likely needs tighter check discipline and non-negotiable routines. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds compliance cadence that survives pressure.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Packaging, route timing, and handling improvements may be underexploited. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode prioritizes high-ROI operational innovation.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Food safety and reputation downside are severe when controls fail. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces incident response and audit readiness.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Handling discipline and training consistency are likely core stability gaps. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode certifies critical handling roles and ownership.'
  })
];

export const library: LibraryItem[] = [
  ...strengthRows,
  ...leakRows.flatMap(toLibraryLeakItems),
  ...missionBriefRows
];
