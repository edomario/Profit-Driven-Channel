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
    strength: 'Stock is traceable by model and serial, repairs run on staged job control, accessories are counted daily, and open-close routines protect execution consistency.',
    hook: 'Stock Truth Engine',
    kpi: 'Inventory accuracy %, Repair cycle time, First-time QC pass %, Comeback rate %, Top-20 accessory stockouts'
  },
  {
    pillar: 'Money',
    strength: 'Margin is controlled by category, discount guardrails are active, cash and momo are reconciled daily, and warranty-credit leakage is measured.',
    hook: 'Margin-to-Cash Discipline',
    kpi: 'Gross margin by category, Net margin estimate, Discount %, Daily recon variance, DSO, Warranty cost per 100 sales'
  },
  {
    pillar: 'Market',
    strength: 'Repeat demand is systemized through trust signals, lead capture, follow-up cadence, and attach-rate scripts across channels.',
    hook: 'Trust and Repeat Flywheel',
    kpi: 'Repeat customer %, Attach rate, Lead-to-sale conversion %, Referral %, AOV, Review trend'
  },
  {
    pillar: 'Leadership',
    strength: 'The shop runs on visible KPIs, delegated decisions, scorecard accountability, and weekly closure of recurring leak patterns.',
    hook: 'Cadence Over Chaos',
    kpi: 'KPI update compliance %, Decision latency, Task closure %, Repeat incident rate, Scorecard coverage %'
  },
  {
    pillar: 'Innovation',
    strength: 'Growth improvements are test-driven with offer experiments, service productization, and simple automation that reduces error and speeds service.',
    hook: 'Measured Improvement Loop',
    kpi: 'Experiments/month, Bundle adoption %, New offer revenue %, Workflow error reduction %, Conversion trend'
  },
  {
    pillar: 'Risk',
    strength: 'Risk is contained with IMEI discipline, approved parts control, written warranty rules, shrinkage controls, and dispute evidence routines.',
    hook: 'Dispute and Fraud Firewall',
    kpi: 'IMEI logged %, Shrinkage %, Dispute rate, Warranty dispute rate, Supplier defect rate, Security incidents'
  },
  {
    pillar: 'People',
    strength: 'People performance is stable through role-based incentives, technician quality targets, onboarding checklists, and regular coaching.',
    hook: 'Profit-Safe Behavior System',
    kpi: 'First-time fix %, Returns by salesperson, Onboarding completion %, Turnover %, Training completion %'
  }
];

const leakRows: LeakRow[] = [
  // OPS
  {
    id: 'OPS_P1',
    pillar: 'Operations',
    signal_tags: ['inventory_accuracy_gap', 'supplier_doc_gap'],
    hook: 'Inventory Ghost',
    leak: 'Device stock is not reliably traceable in real time, so search time, missing units, and wrong availability promises are increasing.',
    cost: 'Inventory ghosting can consume 1-5% of monthly profit, and one missing high-value phone can erase a full day of margin.',
    cliffhanger: 'Fix Mode locks stock truth and IMEI discipline so every device has a clear record and location trail.',
    kpi: 'Inventory accuracy %, IMEI log coverage'
  },
  {
    id: 'OPS_P2',
    pillar: 'Operations',
    signal_tags: ['restock_delay', 'stockout_tax'],
    hook: 'Accessory Graveyard',
    leak: 'Fast-moving accessories are missing at point of sale, reducing attach rate and forcing customers to buy elsewhere.',
    cost: 'Missing accessories quietly remove 5-20% of potential margin per phone transaction in many shops.',
    cliffhanger: 'Fix Mode secures Top-30 accessory availability and attach scripts to protect daily margin.',
    kpi: 'Attach rate %, Top-30 stockouts/week'
  },
  {
    id: 'OPS_P3',
    pillar: 'Operations',
    signal_tags: ['no_standard_work', 'returns_damage_blindspot'],
    hook: 'Repair Black Hole',
    leak: 'Repairs are moving without visible stage control, creating delays, rework, and customer disputes at handover.',
    cost: 'Untracked repairs produce repeated labor loss, longer turnaround, and comeback-driven trust erosion.',
    cliffhanger: 'Fix Mode installs job cards, approvals, and QC gates so repair flow becomes predictable.',
    kpi: 'Repair cycle time, Comeback rate'
  },
  {
    id: 'OPS_P4',
    pillar: 'Operations',
    signal_tags: ['receiving_slippage', 'supplier_selection_undisciplined'],
    hook: 'Receiving Drift',
    leak: 'Device and part receiving is inconsistent on condition and serial checks, importing avoidable disputes into the shop.',
    cost: 'Receiving drift creates wrong pricing, supplier friction, and downstream warranty losses that look random.',
    cliffhanger: 'Fix Mode enforces receiving and grading discipline before bad stock enters active inventory.',
    kpi: 'Receiving error rate, Supplier defect rate'
  },
  {
    id: 'OPS_P5',
    pillar: 'Operations',
    signal_tags: ['kpi_cadence_gap', 'hero_staff_dependence'],
    hook: 'Routine Drift',
    leak: 'Daily open-close controls are weak, so cash, stock movements, and pending repair statuses diverge by shift.',
    cost: 'Small routine misses compound into monthly leakage, missed handovers, and decision delays.',
    cliffhanger: 'Fix Mode deploys non-negotiable open-close routines to stabilize day-to-day control.',
    kpi: 'Open-close compliance %, Shift handover compliance %'
  },

  // MONEY
  {
    id: 'MNY_P1',
    pillar: 'Money',
    signal_tags: ['pricing_margin_blindspot', 'category_margin_blindspot'],
    hook: 'Margin Mirage',
    leak: 'Sales activity is high but true category-level profit is unclear, so hidden losses remain unmanaged.',
    cost: 'Without a margin map, shops often leak 2-8% of revenue through unmanaged discounts, returns, and warranty costs.',
    cliffhanger: 'Fix Mode builds a category margin bridge so each leak gets a number, owner, and deadline.',
    kpi: 'Gross margin by category, Net margin estimate'
  },
  {
    id: 'MNY_P2',
    pillar: 'Money',
    signal_tags: ['discounting_leak', 'pricing_inconsistency'],
    hook: 'Discount Drift',
    leak: 'Pricing and discount behavior varies by urgency and negotiation, steadily training customers to push margin down.',
    cost: 'A 3-5% unmanaged price drift can erase most profit in thin-margin phone and accessory sales.',
    cliffhanger: 'Fix Mode installs discount bands and approval limits that preserve margin without killing close rates.',
    kpi: 'Discount rate %, Price variance'
  },
  {
    id: 'MNY_P3',
    pillar: 'Money',
    signal_tags: ['cash_recon_gap'],
    hook: 'Cash Drawer Drift',
    leak: 'Cash and momo movement is not reconciled with enough rigor, creating daily variance and weak financial truth.',
    cost: 'Small daily variances become a permanent monthly tax and distort business decisions.',
    cliffhanger: 'Fix Mode enforces daily reconciliation and exception logging so cash truth is restored.',
    kpi: 'Daily reconciliation variance, Cash exceptions'
  },
  {
    id: 'MNY_P4',
    pillar: 'Money',
    signal_tags: ['policy_vagueness', 'returns_damage_blindspot'],
    hook: 'Warranty Bleed',
    leak: 'Warranty and return boundaries are unclear, driving avoidable repairs, refunds, and dispute settlements.',
    cost: 'Warranty bleed can consume 10-30% of realized profit in used or refurbished-heavy models when unmanaged.',
    cliffhanger: 'Fix Mode clarifies warranty tiers and tracks cost per 100 sales to stop preventable exceptions.',
    kpi: 'Warranty cost/100 sales, Warranty dispute rate'
  },
  {
    id: 'MNY_P5',
    pillar: 'Money',
    signal_tags: ['credit_terms_risk', 'payment_terms_risk'],
    hook: 'Credit Sinkhole',
    leak: 'Installment and account terms are expanding faster than collections discipline, weakening restock cash.',
    cost: 'Credit sinkholes turn booked sales into delayed cash, increasing stock starvation and borrowing pressure.',
    cliffhanger: 'Fix Mode installs deposit, limit, and AR cadence controls to protect cash velocity.',
    kpi: 'DSO, Overdue AR %'
  },

  // MARKET
  {
    id: 'MKT_P1',
    pillar: 'Market',
    signal_tags: ['value_story_gap', 'policy_vagueness'],
    hook: 'Trust Erosion',
    leak: 'Shoppers are not receiving consistent trust proof on condition, authenticity, and warranty clarity.',
    cost: 'Weak trust signals force price-only decisions, reduce AOV, and increase post-sale disputes.',
    cliffhanger: 'Fix Mode builds a trust engine that increases confidence and price resilience.',
    kpi: 'Repeat customer %, Warranty dispute rate'
  },
  {
    id: 'MKT_P2',
    pillar: 'Market',
    signal_tags: ['followup_gap', 'segment_blindspot'],
    hook: 'Lead Leak',
    leak: 'Lead capture and response times are inconsistent, so high-intent inquiries go cold before conversion.',
    cost: 'Slow response can erase channel ROI and bleed daily sales to faster competitors.',
    cliffhanger: 'Fix Mode installs capture templates and response SLAs to convert more inquiries.',
    kpi: 'Lead response SLA, Lead-to-sale conversion %'
  },
  {
    id: 'MKT_P3',
    pillar: 'Market',
    signal_tags: ['bundle_engine_missing', 'service_inconsistency'],
    hook: 'Attach Rate Collapse',
    leak: 'Phone sales are closing without consistent accessory attach behavior, reducing realized margin per transaction.',
    cost: 'Missed attach opportunities make each phone sale less profitable and increase dependency on unit volume.',
    cliffhanger: 'Fix Mode installs bundle defaults and scripts that lift basket value without discount wars.',
    kpi: 'Attach rate %, AOV'
  },
  {
    id: 'MKT_P4',
    pillar: 'Market',
    signal_tags: ['followup_gap', 'complaint_handling_gap'],
    hook: 'One-Time Buyer Curse',
    leak: 'Follow-up, review requests, and referral loops are weak, so repeat demand is left to chance.',
    cost: 'Without a repeat engine, customer acquisition cost rises and growth stays fragile.',
    cliffhanger: 'Fix Mode converts one-time buyers into repeat and referral behavior through simple routines.',
    kpi: 'Repeat rate %, Referral rate %'
  },

  // LEADERSHIP
  {
    id: 'LDR_P1',
    pillar: 'Leadership',
    signal_tags: ['kpi_cadence_gap', 'no_kpi_ownership'],
    hook: 'KPI Darkness',
    leak: 'Critical numbers are not visible daily, so leak detection is delayed and decisions stay reactive.',
    cost: 'Late detection inflates the cost of stockouts, discount drift, disputes, and AR slippage.',
    cliffhanger: 'Fix Mode installs KPI wall cadence so action happens before losses compound.',
    kpi: 'KPI update compliance %, Repeat incident rate'
  },
  {
    id: 'LDR_P2',
    pillar: 'Leadership',
    signal_tags: ['decision_bottleneck', 'approval_bottleneck'],
    hook: 'Approval Bottleneck',
    leak: 'Discount, refund, and warranty exceptions are waiting too long for central approval.',
    cost: 'Decision latency creates missed closes, delayed resolution, and avoidable customer friction.',
    cliffhanger: 'Fix Mode introduces delegation limits that preserve control and restore speed.',
    kpi: 'Decision latency, Exception backlog'
  },
  {
    id: 'LDR_P3',
    pillar: 'Leadership',
    signal_tags: ['training_planning_gap', 'accountability_soft'],
    hook: 'Repeat Leak Tax',
    leak: 'Scorecards and coaching are inconsistent, so known issues repeat by staff, shift, and stress level.',
    cost: 'Payroll effort rises without matching quality and margin outcomes when accountability is soft.',
    cliffhanger: 'Fix Mode ties coaching and scorecards to leak reduction outcomes.',
    kpi: 'Scorecard coverage %, Task closure rate'
  },

  // INNOVATION
  {
    id: 'INN_P1',
    pillar: 'Innovation',
    signal_tags: ['no_testing_rhythm', 'bundle_engine_missing'],
    hook: 'Offer Stagnation',
    leak: 'Offers are changing by instinct instead of measured tests, slowing growth learning.',
    cost: 'No experiment rhythm means missed margin opportunities and slower adaptation to market behavior.',
    cliffhanger: 'Fix Mode creates monthly offer experiments with clear win-loss decisions.',
    kpi: 'Experiments/month, Win rate %'
  },
  {
    id: 'INN_P2',
    pillar: 'Innovation',
    signal_tags: ['pricing_inconsistency', 'no_standard_work'],
    hook: 'Service Productization Gap',
    leak: 'Repair services are not packaged by tier, so delivery promises and pricing vary excessively.',
    cost: 'Unstructured services undercharge complexity and increase dispute probability.',
    cliffhanger: 'Fix Mode productizes repair tiers to raise margin and predictability.',
    kpi: 'Repair tier adoption %, Margin per repair job'
  },
  {
    id: 'INN_P3',
    pillar: 'Innovation',
    signal_tags: ['offer_measurement_gap', 'no_market_feedback_loop'],
    hook: 'Automation Lite Gap',
    leak: 'Manual workflows are creating repeat mistakes because templates and simple systems are underused.',
    cost: 'Manual drift increases handling time and correction cost across sales and repair workflows.',
    cliffhanger: 'Fix Mode applies lightweight automation to remove recurring errors quickly.',
    kpi: 'Template adoption %, Workflow error rate'
  },

  // RISK
  {
    id: 'RSK_P1',
    pillar: 'Risk',
    signal_tags: ['supplier_doc_gap', 'inventory_accuracy_gap'],
    hook: 'Stolen Device Landmine',
    leak: 'IMEI and intake verification gaps increase exposure to high-impact legal and reputational incidents.',
    cost: 'A single stolen-device event can trigger outsized financial and trust loss relative to shop size.',
    cliffhanger: 'Fix Mode builds an IMEI firewall that prevents unknown-device intake risk.',
    kpi: 'IMEI logged %, Stolen-device incidents'
  },
  {
    id: 'RSK_P2',
    pillar: 'Risk',
    signal_tags: ['supplier_selection_undisciplined', 'supplier_doc_gap'],
    hook: 'Fake Parts Comeback Loop',
    leak: 'Part authenticity controls are weak, increasing repeat failures and warranty labor burn.',
    cost: 'Fake or unstable parts generate rework loops that consume technician time and customer trust.',
    cliffhanger: 'Fix Mode enforces approved parts and supplier-quality discipline to break comeback loops.',
    kpi: 'Supplier defect rate, Comeback rate'
  },
  {
    id: 'RSK_P3',
    pillar: 'Risk',
    signal_tags: ['contract_gap', 'policy_vagueness'],
    hook: 'Dispute Tax',
    leak: 'Return and warranty disputes are rising because acceptance boundaries and evidence are weak.',
    cost: 'Dispute tax appears as refunds, rework time, negative reviews, and reduced repeat trust.',
    cliffhanger: 'Fix Mode installs written rules and evidence flows to cut dispute frequency.',
    kpi: 'Dispute rate, Chargeback/refund rate'
  },
  {
    id: 'RSK_P4',
    pillar: 'Risk',
    signal_tags: ['shrinkage_leak', 'cash_recon_gap'],
    hook: 'Silent Shrink',
    leak: 'High-value stock and cash controls are too loose, enabling silent leakage through movement and custody gaps.',
    cost: 'Shrinkage often runs 0.5-3% of inventory value monthly in weak-control environments.',
    cliffhanger: 'Fix Mode strengthens access, counts, and reconciliation so leakage becomes visible and controllable.',
    kpi: 'Shrinkage %, Reconciliation exceptions'
  },

  // PEOPLE
  {
    id: 'PPL_P1',
    pillar: 'People',
    signal_tags: ['incentive_misalignment', 'accountability_soft'],
    hook: 'Volume-Only Incentive Trap',
    leak: 'Staff are rewarded for speed and revenue, not margin quality, attach quality, and low-return behavior.',
    cost: 'Incentive mismatch drives discounting, overselling, and avoidable return cycles.',
    cliffhanger: 'Fix Mode realigns incentives to profit-safe behaviors across sales and repairs.',
    kpi: 'Returns by staff %, Attach rate %, Margin by staff'
  },
  {
    id: 'PPL_P2',
    pillar: 'People',
    signal_tags: ['onboarding_gap', 'training_gap'],
    hook: 'Training-by-Shadowing Drift',
    leak: 'Onboarding relies too much on informal observation, creating high variance in service and quality outcomes.',
    cost: 'Weak onboarding increases ramp-time errors, comebacks, and turnover-related instability.',
    cliffhanger: 'Fix Mode introduces certification checklists that stabilize quality regardless of who is on shift.',
    kpi: 'Onboarding completion %, First-time fix %, Turnover %'
  }
];

const toLibraryLeakItems = (row: LeakRow): LibraryItem[] => [
  {
    id: `LIB_ELECTRONICS_${row.id}_LEAK`,
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
    id: `LIB_ELECTRONICS_${row.id}_HOOK`,
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
    id: `LIB_ELECTRONICS_${row.pillar.toUpperCase()}_STR`,
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
    id: `LIB_ELECTRONICS_${row.pillar.toUpperCase()}_KPI`,
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

const baseSpecies = ['Electronics & Phone Shop', 'Electronics & phone shop'];
const species1 = 'New Phones Retail';
const species2 = 'Used / Refurbished Phones';
const species3 = 'Repairs & Service Center';
const species4 = 'Accessories-Focused Shop';
const species5 = 'Corporate / Institutional Supply (Phones/Gadgets)';
const species6 = 'Online / Instagram / WhatsApp Phone Shop';

const missionRowsForSpecies = (
  code: string,
  lineType: string[],
  texts: Record<PillarId, string>
): LibraryItem[] => {
  const pillars: PillarId[] = ['Operations', 'Money', 'Market', 'Leadership', 'Innovation', 'Risk', 'People'];
  return pillars.map((pillar) => ({
    id: `MB_ELECTRONICS_${code}_${pillar.toUpperCase()}`,
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
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. In electronics retail this usually appears as stock confusion, repair delays, and accessory misses. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches a 7-day containment sprint and 30-day control build tied to {KPI}.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. This pattern often creates busy days with thin profit and weak cash velocity. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode maps margin leakage and enforces pricing, warranty, and reconciliation discipline.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Trust and repeat behavior are likely leaking through inconsistent follow-up and offer execution. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs a repeat-order and lead-conversion engine.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. The shop is likely solving today while paying for the same issues tomorrow. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode sets KPI cadence, decision limits, and closure discipline.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Improvement may be happening by instinct, not measured tests. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs monthly offer and workflow experiments with clear win criteria.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Exposure is building across device verification, authenticity, disputes, or shrinkage controls. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens verification and evidence routines before a trust event occurs.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Execution quality likely varies by person and pressure, increasing returns and rework. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode aligns incentives, training, and ownership to stabilize outcomes.'
  }),

  ...missionRowsForSpecies('S1', [species1], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. New-phone retail wins on stock reliability and attach execution, and both appear unstable. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode secures fast-mover flow and attach discipline.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Price drift and discount pressure are likely compressing realized margin. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs price guardrails and category margin control.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Competing on price alone is weakening repeat trust and value perception. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode deploys a trust-first sales and follow-up engine.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Decision friction is likely slowing front-line execution. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode sets approval limits and daily KPI control.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Bundle and display innovation appears underused. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs a conversion-focused bundle sprint.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Warranty and dispute exposure are likely rising with inconsistent policy clarity. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens policy and evidence controls.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Sales behavior may be rewarding speed over profit quality. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode aligns incentives to margin-safe selling.'
  }),

  ...missionRowsForSpecies('S2', [species2], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Used/refurb models leak fast when grading and QC discipline drift. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs intake grading and pre-sale QC gates.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Warranty and rework costs are likely erasing expected margin on units sold. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode makes warranty cost visible and controllable.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Trust volatility is likely suppressing repeat demand and pricing confidence. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds a condition-proof trust layer.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Standards may vary by staff and shift. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs role-level controls and routine closure.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Offer design may be stagnant while market confidence requires clear tiers. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches condition and warranty tier optimization.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Stolen-device and authenticity exposure are likely elevated. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode activates IMEI firewall and supplier verification routines.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Technician and sales consistency appears uneven. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode certifies quality-critical behaviors.'
  }),

  ...missionRowsForSpecies('S3', [species3], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Repair center performance is likely trapped in workflow gaps and comeback loops. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode applies staged job control and QC lock.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Repair pricing and warranty boundaries may be under-protecting margin. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs tiered pricing and warranty guardrails.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Service trust can degrade quickly when turnaround promises slip. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode ties promise accuracy to customer follow-up.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Owner dependency likely limits throughput and closure. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode deploys delegated control and KPI cadence.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Service productization opportunities are likely underleveraged. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds repair offers that scale predictably.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Parts and dispute exposure can escalate quickly in repair-heavy models. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode strengthens parts control and dispute defense.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. First-time fix consistency likely varies by technician. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode links coaching and incentives to comeback reduction.'
  }),

  ...missionRowsForSpecies('S4', [species4], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Accessories-led stores leak through fast-mover stockouts and weak count discipline. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode secures Top-30 flow and daily stock truth.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Small-ticket price drift is likely compounding into major margin loss. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces price guardrails and leak tracking.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Basket growth is likely capped by weak bundle and script execution. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs attach and bundle conversion routines.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. KPI visibility likely lags behind transaction velocity. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode deploys a high-frequency KPI rhythm.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Offer experimentation may be too slow for category speed. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches monthly offer tests.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Shrink and authenticity exposure are likely under-controlled. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens access and supplier verification.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Sales behavior likely varies too much by staff. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode aligns incentives to quality margin outcomes.'
  }),

  ...missionRowsForSpecies('S5', [species5], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Institutional fulfillment likely suffers from documentation and execution drift. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode locks intake-to-delivery controls.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. AR and exception pricing are likely weakening cash velocity. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs contract-grade credit and pricing discipline.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Account retention likely depends on reliability proof that is currently inconsistent. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode creates a key-account trust and follow-up cadence.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Cross-function alignment may be too weak for account-level SLA expectations. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode aligns teams on shared account KPIs.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Service packaging for B2B may be underdeveloped. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode productizes account offers and support tiers.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Contract and dispute exposure are likely rising with weak evidence routines. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces documentation and dispute SOP controls.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Team role boundaries may be unclear under account pressure. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode sets scorecards and ownership clarity.'
  }),

  ...missionRowsForSpecies('S6', [species6], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Online-heavy flow likely leaks through response and handover inconsistencies. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode structures lead, order, and dispatch workflows.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Payment and refund friction can quietly erode channel profitability. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode secures reconciliation and refund controls.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Digital conversion is likely limited by slow response and weak trust proof. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode deploys response SLAs and social proof routines.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2}. Digital operations may depend too much on a few people and ad-hoc decisions. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode standardizes ownership and KPI cadence.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2}. Offer testing and channel learning may be too reactive. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs a monthly conversion experiment loop.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2}. Delivery, refund, and record-keeping exposure is likely elevated. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode strengthens dispute-proof records and policy controls.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2}. Response quality likely varies by who is on chat or counter. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs scripts, coaching, and role-level standards.'
  })
];

export const library: LibraryItem[] = [
  ...strengthRows,
  ...leakRows.flatMap(toLibraryLeakItems),
  ...missionBriefRows
];
