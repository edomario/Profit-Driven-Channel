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
    strength: 'Stock is structured by category, size, and brand; dispatch follows pick-load-POD discipline; returns and damages are quarantined and root-caused.',
    hook: 'Stock Truth + Dispatch Discipline',
    kpi: 'Stock accuracy %, Stockout frequency (Top 30), Delivery accuracy %, Breakage %, Dead stock UGX'
  },
  {
    pillar: 'Money',
    strength: 'Category margin is visible, discount guardrails are active, credit is controlled by rules, and cash/momo is reconciled daily.',
    hook: 'Margin-to-Cash Control',
    kpi: 'Gross margin by category, Discount %, Daily recon variance, DSO, Bad debt %'
  },
  {
    pillar: 'Market',
    strength: 'Contractor and repeat demand are managed through quote tracking, follow-up cadence, and reliability-led service positioning.',
    hook: 'Repeat and Contractor Flywheel',
    kpi: 'Repeat customer %, Quote-to-sale %, AOV, Referral %, Lead response time'
  },
  {
    pillar: 'Leadership',
    strength: 'Execution runs on visible KPIs, defined approval limits, and weekly root-cause closure for recurring leaks.',
    hook: 'Cadence Over Chaos',
    kpi: 'KPI update compliance %, Decision latency, Task closure %, Incident repeat rate'
  },
  {
    pillar: 'Innovation',
    strength: 'Offer growth is test-driven through project kits, standardized quote templates, and lightweight automation of error-prone workflows.',
    hook: 'Measured Offer and Process Improvement',
    kpi: 'Offer tests/month, Bundle adoption %, New offer revenue %, Time per quote/order'
  },
  {
    pillar: 'Risk',
    strength: 'Supplier verification, shrinkage controls, POD-backed dispute handling, and basic safety routines are consistently enforced.',
    hook: 'Counterfeit + Dispute + Shrinkage Shield',
    kpi: 'Counterfeit incidents, Shrinkage %, Dispute %, Safety incidents, Compliance checks'
  },
  {
    pillar: 'People',
    strength: 'Incentives reinforce margin and accuracy, onboarding is structured, and role-level performance is reviewed with clear ownership.',
    hook: 'Profit-Safe Team Behavior',
    kpi: 'Sales margin/staff, Returns/errors by staff, Onboarding completion %, Performance variance'
  }
];

const leakRows: LeakRow[] = [
  // OPERATIONS
  {
    id: 'OPS_P1',
    pillar: 'Operations',
    signal_tags: ['inventory_accuracy_gap', 'receiving_slippage', 'hero_staff_dependence'],
    hook: 'Phantom Stock',
    leak: 'Stock appears available in conversation but is not consistently traceable by location, count, and movement records.',
    cost: 'Phantom stock drives search delays, missed sales, and shrinkage blind spots; this typically behaves like a 1-5% monthly profit leak in hardware retail.',
    cliffhanger: 'Fix Mode will lock stock truth using zone labeling, receiving controls, and fast-mover count discipline.',
    kpi: 'Stock accuracy %, Stock confirmation time',
    actionPack: 'OPS-P1'
  },
  {
    id: 'OPS_P2',
    pillar: 'Operations',
    signal_tags: ['stockout_tax', 'restock_delay'],
    hook: 'Stockout Tax',
    leak: 'Fast-moving construction essentials are discovered as out-of-stock at point-of-sale instead of being protected by reorder triggers.',
    cost: 'In project-led buying, stockouts can redirect full job spend to competitors; common impact is 2-6% of monthly sales at risk.',
    cliffhanger: 'Fix Mode will secure Top-30 fast movers with min/max and daily low-stock actions.',
    kpi: 'Top-30 stockouts/week, Fill rate',
    actionPack: 'OPS-P1'
  },
  {
    id: 'OPS_P3',
    pillar: 'Operations',
    signal_tags: ['dispatch_delivery_instability', 'contract_gap'],
    hook: 'Dispatch Drift',
    leak: 'Delivery preparation depends on memory and calls, increasing wrong-item and wrong-quantity shipments.',
    cost: 'Every dispatch error burns re-delivery fuel, delays payment, and triggers settlement discounts; this often compounds into recurring monthly margin loss.',
    cliffhanger: 'Fix Mode will enforce pick-list, load-check, and POD discipline to stop avoidable delivery rework.',
    kpi: 'Delivery accuracy %, Dispute rate %',
    actionPack: 'OPS-P2'
  },
  {
    id: 'OPS_P4',
    pillar: 'Operations',
    signal_tags: ['returns_damage_blindspot', 'safe_handling_gap'],
    hook: 'Breakage Bleed',
    leak: 'Breakage and returns are treated as routine instead of quarantined, measured, and eliminated by cause.',
    cost: 'Unmanaged breakage becomes a daily profit drip in cement, tile, paint, and fragile categories; typical drag is 0.5-2.5% of sales.',
    cliffhanger: 'Fix Mode will isolate breakage causes and enforce handling and stacking controls.',
    kpi: 'Breakage %, Returns %',
    actionPack: 'OPS-P3'
  },
  {
    id: 'OPS_P5',
    pillar: 'Operations',
    signal_tags: ['slow_mover_attachment'],
    hook: 'Slow-Mover Cemetery',
    leak: 'Cash is trapped in low-turn inventory while fast movers risk starving, forcing reactive purchasing behavior.',
    cost: 'Dead stock weakens restock power and increases discount pressure; trapped cash frequently reaches 5-25% of inventory value.',
    cliffhanger: 'Fix Mode will rank dead stock by value and launch controlled cleanup without destroying price integrity.',
    kpi: 'Dead stock UGX, Inventory turns',
    actionPack: 'OPS-P1'
  },

  // MONEY
  {
    id: 'MNY_P1',
    pillar: 'Money',
    signal_tags: ['pricing_margin_blindspot', 'category_margin_blindspot'],
    hook: 'Margin Mirage',
    leak: 'Sales activity is visible, but net margin is unclear once discounts, breakage, delivery, and credit leakage are included.',
    cost: 'Margin mirage typically hides 2-8% revenue leakage when costs are not mapped by category.',
    cliffhanger: 'Fix Mode will build a category margin bridge so every leak has a number and owner.',
    kpi: 'Gross margin by category, Net margin estimate',
    actionPack: 'MNY-P1'
  },
  {
    id: 'MNY_P2',
    pillar: 'Money',
    signal_tags: ['discounting_leak', 'pricing_inconsistency'],
    hook: 'Discount Drift',
    leak: 'Discounting behavior varies by pressure and person, training customers to negotiate margin down.',
    cost: 'A 3-5% unmanaged price drift can erase a large share of monthly profit in thin-margin categories.',
    cliffhanger: 'Fix Mode will install discount bands and approvals that protect close rates and margin.',
    kpi: 'Discount %, Price variance',
    actionPack: 'MNY-P2'
  },
  {
    id: 'MNY_P3',
    pillar: 'Money',
    signal_tags: ['cash_recon_gap'],
    hook: 'Cash Drawer Drift',
    leak: 'Cash and momo movement is not reconciled with enough daily rigor, allowing variance to normalize.',
    cost: 'Small unresolved variances become a permanent monthly tax and reduce decision accuracy.',
    cliffhanger: 'Fix Mode will enforce daily reconciliation and variance reason coding.',
    kpi: 'Daily recon variance UGX, Cash exceptions',
    actionPack: 'MNY-P3'
  },
  {
    id: 'MNY_P4',
    pillar: 'Money',
    signal_tags: ['credit_terms_risk', 'payment_delay_chokehold'],
    hook: 'Credit Sinkhole',
    leak: 'Credit grows faster than collections discipline, starving restock cash and supplier leverage.',
    cost: 'Unmanaged AR reduces cash velocity and raises default risk; typical impact includes larger 30+ and 60+ aging buckets.',
    cliffhanger: 'Fix Mode will enforce credit tiers, collection cadence, and cutoff rules.',
    kpi: 'DSO, Overdue AR %',
    actionPack: 'MNY-P4'
  },
  {
    id: 'MNY_P5',
    pillar: 'Money',
    signal_tags: ['supplier_terms_weak', 'category_margin_blindspot'],
    hook: 'Supplier Price Whiplash',
    leak: 'Supplier price changes are reaching the counter faster than price-book updates, compressing margin silently.',
    cost: 'Delayed update cycles can make high-volume SKUs look healthy while net contribution drops weekly.',
    cliffhanger: 'Fix Mode will tighten supplier-price to shelf-price update speed and protect margin.',
    kpi: 'Price update lead time, Margin by category',
    actionPack: 'MNY-P1'
  },

  // MARKET
  {
    id: 'MKT_P1',
    pillar: 'Market',
    signal_tags: ['followup_gap'],
    hook: 'One-Time Buyer Curse',
    leak: 'The shop depends too heavily on walk-ins and chance repeat behavior instead of a structured follow-up system.',
    cost: 'Without repeat protection, acquisition effort resets continuously and compounding revenue weakens.',
    cliffhanger: 'Fix Mode will build repeat and referral loops tied to contractor and buyer records.',
    kpi: 'Repeat customer %, Referral %',
    actionPack: 'MKT-P2'
  },
  {
    id: 'MKT_P2',
    pillar: 'Market',
    signal_tags: ['value_story_gap'],
    hook: 'Price-Comparison War',
    leak: 'Customer choice is being driven mainly by price because trust and reliability proof are under-leveraged.',
    cost: 'Price-only positioning increases churn and compresses margin over time.',
    cliffhanger: 'Fix Mode will deploy trust proof and value scripts that reduce price pressure.',
    kpi: 'AOV, Repeat rate, Complaint rate',
    actionPack: 'MKT-P2'
  },
  {
    id: 'MKT_P3',
    pillar: 'Market',
    signal_tags: ['followup_gap', 'segment_blindspot'],
    hook: 'Quote Leakage',
    leak: 'Quotes are sent but not tracked and followed, so high-intent buyers drift to faster or more organized competitors.',
    cost: 'Quote leakage is silent churn: pipeline effort spent without close-rate conversion.',
    cliffhanger: 'Fix Mode will install quote logging and follow-up cadence to raise conversion quickly.',
    kpi: 'Quote-to-sale %, Lead response time',
    actionPack: 'MKT-P1'
  },

  // LEADERSHIP
  {
    id: 'LDR_P1',
    pillar: 'Leadership',
    signal_tags: ['kpi_cadence_gap', 'no_kpi_ownership'],
    hook: 'KPI Darkness',
    leak: 'Critical indicators are not visible enough for early intervention, so leak detection happens late.',
    cost: 'Late detection amplifies stockout, discount, and dispute losses that could have been prevented.',
    cliffhanger: 'Fix Mode will install a KPI wall and daily cadence with named owners.',
    kpi: 'KPI update compliance, Incident repeat rate',
    actionPack: 'LDR-P1'
  },
  {
    id: 'LDR_P2',
    pillar: 'Leadership',
    signal_tags: ['decision_bottleneck', 'approval_bottleneck'],
    hook: 'Approval Bottleneck',
    leak: 'Discount, credit, refund, and exception decisions queue behind one person, slowing execution.',
    cost: 'Decision latency creates lost sales, delayed resolution, and avoidable customer friction.',
    cliffhanger: 'Fix Mode will implement approval limits and delegation boundaries that keep control without delay.',
    kpi: 'Decision latency, Approval backlog',
    actionPack: 'LDR-P2'
  },
  {
    id: 'LDR_P3',
    pillar: 'Leadership',
    signal_tags: ['no_variance_review', 'accountability_soft'],
    hook: 'Repeat Leak Tax',
    leak: 'Known issues recur because fixes rely on effort bursts instead of system closure routines.',
    cost: 'Recurring incidents multiply payroll effort and margin loss every month.',
    cliffhanger: 'Fix Mode will enforce root-cause closure on top recurring leaks.',
    kpi: 'Task closure %, Repeat incident rate',
    actionPack: 'LDR-P3'
  },

  // INNOVATION
  {
    id: 'INN_P1',
    pillar: 'Innovation',
    signal_tags: ['bundle_engine_missing', 'no_testing_rhythm'],
    hook: 'No Bundle Engine',
    leak: 'Project bundles and offer tests are underused, limiting AOV growth and structured upsell.',
    cost: 'Without tested bundles, each sale carries lower realized margin and slower learning velocity.',
    cliffhanger: 'Fix Mode will launch high-probability project-kit experiments and track outcomes.',
    kpi: 'Bundle adoption %, AOV',
    actionPack: 'INN-P1'
  },
  {
    id: 'INN_P2',
    pillar: 'Innovation',
    signal_tags: ['offer_measurement_gap', 'no_market_feedback_loop'],
    hook: 'Manual Chaos',
    leak: 'Too many critical steps rely on memory and ad hoc communication, increasing repeat errors.',
    cost: 'Manual chaos drives hidden rework time and slower quote/order throughput.',
    cliffhanger: 'Fix Mode will standardize templates and lightweight automation in high-error workflows.',
    kpi: 'Workflow error rate, Time per quote/order',
    actionPack: 'INN-P2'
  },
  {
    id: 'INN_P3',
    pillar: 'Innovation',
    signal_tags: ['slow_mover_attachment', 'no_market_feedback_loop'],
    hook: 'Stagnant Assortment',
    leak: 'Stock mix is not being refreshed fast enough by demand signals, so slow movers linger and winners starve.',
    cost: 'Stagnant assortment traps cash and lowers conversion in active project categories.',
    cliffhanger: 'Fix Mode will align assortment refresh to turns and repeat-demand data.',
    kpi: 'Fast-mover share %, Inventory turns',
    actionPack: 'INN-P2'
  },

  // RISK
  {
    id: 'RSK_P1',
    pillar: 'Risk',
    signal_tags: ['supplier_doc_gap', 'supplier_selection_undisciplined'],
    hook: 'Counterfeit Landmine',
    leak: 'Product authenticity controls are too weak for high-risk lines and supplier variance scenarios.',
    cost: 'A single counterfeit event can trigger refunds, contractor distrust, and lasting reputation damage.',
    cliffhanger: 'Fix Mode will activate an approved-supplier firewall and verification routine.',
    kpi: 'Counterfeit incidents, Supplier defect rate',
    actionPack: 'RSK-P1'
  },
  {
    id: 'RSK_P2',
    pillar: 'Risk',
    signal_tags: ['shrinkage_leak', 'inventory_accuracy_gap'],
    hook: 'Yard Shrink',
    leak: 'Stock movement and access controls are too loose, allowing small losses to normalize.',
    cost: 'Yard shrink often behaves like a 0.5-3% inventory-value leak per month when controls are weak.',
    cliffhanger: 'Fix Mode will lock access, high-risk counting, and variance accountability.',
    kpi: 'Shrinkage %, Inventory accuracy',
    actionPack: 'RSK-P2'
  },
  {
    id: 'RSK_P3',
    pillar: 'Risk',
    signal_tags: ['contract_gap', 'policy_vagueness'],
    hook: 'Dispute Tax',
    leak: 'Delivery and returns disputes are recurring because terms and proof standards are inconsistent.',
    cost: 'Dispute tax appears as settlement discounts, delayed cash, re-delivery cost, and trust erosion.',
    cliffhanger: 'Fix Mode will standardize terms, POD evidence, and return handling to reduce disputes sharply.',
    kpi: 'Dispute %, Return dispute %',
    actionPack: 'RSK-P3'
  },
  {
    id: 'RSK_P4',
    pillar: 'Risk',
    signal_tags: ['safe_handling_gap', 'no_variance_review'],
    hook: 'Safety Exposure',
    leak: 'Handling and stacking safety controls rely on caution rather than repeatable routines and logging.',
    cost: 'Incidents can create stock loss, downtime, liability exposure, and preventable operational shocks.',
    cliffhanger: 'Fix Mode will implement basic safety routines and incident prevention cadence.',
    kpi: 'Safety incidents, Audit pass rate',
    actionPack: 'RSK-P4'
  },

  // PEOPLE
  {
    id: 'PPL_P1',
    pillar: 'People',
    signal_tags: ['training_gap', 'onboarding_gap'],
    hook: 'Shortcut Culture',
    leak: 'Operational shortcuts are filling process gaps, increasing dispatch errors, disputes, and inconsistent service quality.',
    cost: 'Shortcut culture feels fast but creates a recurring loss loop across errors, rework, and trust damage.',
    cliffhanger: 'Fix Mode will install onboarding and role-level certification that preserves speed and quality.',
    kpi: 'Error rate/staff, Onboarding completion %',
    actionPack: 'PPL-P2'
  },
  {
    id: 'PPL_P2',
    pillar: 'People',
    signal_tags: ['incentive_misalignment', 'accountability_soft'],
    hook: 'Incentive Misalignment',
    leak: 'Volume-only incentives are pushing discounting and risky selling behavior that weakens net profitability.',
    cost: 'Misaligned incentives increase margin leakage and service disputes even when sales volume looks strong.',
    cliffhanger: 'Fix Mode will align incentives to margin, accuracy, and low-dispute outcomes.',
    kpi: 'Margin per staff, Returns/errors by staff',
    actionPack: 'PPL-P1'
  }
];

const toLibraryLeakItems = (row: LeakRow): LibraryItem[] => [
  {
    id: `LIB_HARDWARE_${row.id}_LEAK`,
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
    id: `LIB_HARDWARE_${row.id}_HOOK`,
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
    id: `LIB_HARDWARE_${row.pillar.toUpperCase()}_STR`,
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
    id: `LIB_HARDWARE_${row.pillar.toUpperCase()}_KPI`,
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

const baseSpecies = ['Hardware & Building Materials Shop', 'Hardware & building materials shop'];
const species1 = 'General Hardware Retail';
const species2 = 'Building Materials Yard (cement, steel, bricks, aggregates)';
const species3 = 'Paints & Finishes Shop';
const species4 = 'Plumbing & Electrical Focus';
const species5 = 'Contractor / Project Supply';
const species6 = 'Wholesale / Bulk Distributor';

const missionRowsForSpecies = (
  code: string,
  lineType: string[],
  texts: Record<PillarId, string>
): LibraryItem[] => {
  const pillars: PillarId[] = ['Operations', 'Money', 'Market', 'Leadership', 'Innovation', 'Risk', 'People'];
  return pillars.map((pillar) => ({
    id: `MB_HARDWARE_${code}_${pillar.toUpperCase()}`,
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
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Day-to-day this usually appears as stock uncertainty, dispatch errors, and avoidable handling loss. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs a 7-day stabilization sprint and a 30-day control build tied to {KPI}.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. This often creates Margin Mirage: sales activity rises but net cash and margin remain under pressure. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode rebuilds category margin truth, pricing guardrails, and credit control.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Hardware growth is repeating trust at speed; when this slips, quote conversion and repeat orders weaken. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs contractor follow-up and repeat-order systems.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. The business may be solving issues fast but paying for repeats. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces KPI cadence, decision limits, and closure discipline.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Offer and workflow improvements may be too ad hoc to compound. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches measured project-kit and process experiments.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Counterfeit, shrinkage, dispute, or safety exposure can escalate quickly in this model. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens verification, POD evidence, and control routines.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Outcome quality likely varies by person rather than by system. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode aligns incentives, onboarding, and role ownership to stabilize performance.'
  }),

  ...missionRowsForSpecies('S1', [species1], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. General hardware performance is likely leaking through stock truth and dispatch discipline gaps. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode secures fast-mover flow and dispatch accuracy.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Margin is likely thinning through discount drift and hidden cost leakage. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces category margin and pricing controls.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Repeat demand may be weaker than expected due to inconsistent follow-up and value signaling. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs repeat and referral routines.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Approval friction and low KPI visibility may be slowing execution. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode restores speed with delegated limits and KPI cadence.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Bundle and quote-template opportunities are likely underused. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs a project-kit conversion sprint.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Supplier and dispute controls may be too informal for current transaction volume. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode adds verification and dispute-proof routines.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Staff outcomes may be driven by individual style instead of standards. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode standardizes incentives and onboarding.'
  }),

  ...missionRowsForSpecies('S2', [species2], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Yard-heavy models often leak through movement control, dispatch errors, and breakage. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs yard count discipline and dispatch proof.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Gross sales can hide major loss from breakage, delivery rework, and delayed collections. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode maps true order margin after handling and delivery.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Contractor trust likely drops when yard reliability and delivery accuracy slip. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds contractor SLA and follow-up controls.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Firefighting yard operations may be replacing planned control. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode introduces routine ownership by shift and zone.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Project package and route optimization gains may be missed. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs operational upgrades with measured ROI.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Shrinkage and safety exposure are usually the largest preventable losses in yard models. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode activates access, count, and safety audit discipline.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Yard and dispatch quality may vary by team and pressure level. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode certifies handling and dispatch behaviors.'
  }),

  ...missionRowsForSpecies('S3', [species3], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Paint and finishes models leak quickly when fast shades/sizes stock out and returns are loosely controlled. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode protects fast-turn SKU control.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Price inconsistency and discount drift can quietly flatten category margin. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode tightens price-book speed and discount rules.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Value proof and follow-up may be too weak to sustain repeat trade conversion. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds trust scripts and repeat loops.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Decisions and exceptions may be over-centralized. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode defines decision limits for front-line speed.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Kit offers and display optimization opportunities may be underexploited. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs conversion-focused offer tests.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Supplier and dispute controls may not be strong enough for high-choice retail categories. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode strengthens supplier and return evidence loops.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Selling discipline and product guidance quality may vary by staff member. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode standardizes scripts and coaching.'
  }),

  ...missionRowsForSpecies('S4', [species4], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Plumbing/electrical models are vulnerable to wrong-size picks and receiving drift. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode tightens SKU separation and pick accuracy controls.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. High SKU complexity with weak price discipline can leak margin quickly. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces category pricing and margin visibility.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Repeat trust may be leaking through inconsistent quote and follow-up speed. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode deploys quote tracking and contractor follow-up cadence.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Role and decision boundaries may be creating preventable delays. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs ownership clarity and approval limits.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Standard kits and template quoting are likely underused. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds kit and template adoption into routine.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Counterfeit and supplier-quality exposure is elevated in spec-sensitive categories. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens supplier firewall and verification checks.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Inconsistent product guidance can increase returns and disputes. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode trains role-specific advisory behavior.'
  }),

  ...missionRowsForSpecies('S5', [species5], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Project-supply operations usually leak through quote-to-delivery handoff and exception chaos. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode stabilizes quote, dispatch, and POD execution.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Credit and collection pressure likely threatens restock cash and supplier leverage. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces credit tiers and collections cadence.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Project conversion may be leaking through weak quote follow-up discipline. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs a contractor conversion engine.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Approval bottlenecks can delay project response and close rates. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode defines delegated approval rails.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Standard project templates and bundles are likely under-structured. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches project template and bundle optimization.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Dispute and contract exposure typically rise as project sizes grow. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode strengthens dispute defense and term clarity.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. High-pressure project fulfillment may amplify shortcut behavior. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode reinforces training and accountability controls.'
  }),

  ...missionRowsForSpecies('S6', [species6], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Bulk models leak heavily from stock turns, dispatch errors, and handling losses if discipline slips. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs scale-safe stock and dispatch control.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Volume can hide thin margin when delivery and credit economics are not controlled per order. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces per-order economics and AR defense.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Wholesale trust and retention may weaken under service inconsistency. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode secures repeat account reliability routines.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Scale pressure may outgrow current KPI and decision systems. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode aligns scorecards and delegation for scale.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Standardized bundle and quote operations can unlock faster profitable growth. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches high-impact process experiments.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Bulk movement increases shrinkage, dispute, and safety exposure if controls lag. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode deploys high-volume risk controls and audit cadence.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Team variance at scale can create expensive operational instability. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode standardizes training and performance ownership.'
  })
];

export const library: LibraryItem[] = [
  ...strengthRows,
  ...leakRows.flatMap(toLibraryLeakItems),
  ...missionBriefRows
];
