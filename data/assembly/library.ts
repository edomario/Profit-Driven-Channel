import { LibraryItem, PillarId, SignalTag } from '../../types';

const allSizes = ['all' as any];
const allSeverity = ['Critical', 'Watch', 'Stable', 'Strong', 'Emergency'] as Array<'Critical' | 'Watch' | 'Stable' | 'Strong' | 'Emergency'>;

const baseRows: Array<{
  pillar: PillarId;
  leak: string;
  strength: string;
  hook: string;
  kpi: string;
  signal_tags: SignalTag[];
  cost: string;
  cliffhanger: string;
}> = [
  {
    pillar: 'Operations',
    leak: 'Rework Spiral, Yield Bleed, and Line Balancing Debt are turning line activity into hidden throughput and quality loss.',
    strength: 'Operations are stable with controlled BOM/ECO flow, balanced stations, calibrated tools, early quality gates, and full traceability.',
    hook: 'Rework Spiral',
    kpi: 'FPY %, Scrap %, Rework hours/day, Throughput units/hour, OEE, Downtime minutes/day, Changeover time, Test retest rate',
    signal_tags: ['quality_built_late', 'yield_bleed', 'bottleneck_bounce', 'planning_gap', 'changeover_black_hole', 'measurement_blindspot', 'traceability_gap', 'wip_pileup'],
    cost: 'The visible symptom is busy lines; the hidden cost is rework hours, test escapes, and delayed output that quietly erode margin.',
    cliffhanger: 'Fix Mode runs a 7-day containment sprint (defect Pareto + bottleneck stabilization) and a 30-day control build (OEE, kitting, calibration).'
  },
  {
    pillar: 'Money',
    leak: 'Margin Mirage, Expedite Burn, and Costing Blindness are draining cash through rework, premium freight, and mispriced complexity.',
    strength: 'Money control is SKU-level with true unit cost, warranty visibility, route-to-cash discipline, and inventory risk controls.',
    hook: 'Margin Mirage',
    kpi: 'Unit cost/SKU, Gross margin by SKU/customer, Warranty % of sales, Expedite cost/month, Inventory turns, DSO, Overtime cost/unit',
    signal_tags: ['pricing_margin_blindspot', 'costing_gap', 'purchase_panic', 'payment_delay_chokehold', 'inventory_blindspot', 'yield_bleed', 'waste_not_costed', 'supplier_variance_risk'],
    cost: 'Revenue can rise while profit falls when rework, expedite, warranty, and dead stock costs are not controlled as one system.',
    cliffhanger: 'Fix Mode builds a margin bridge in 7 days and a 30-day costing plus quote-governance engine that protects contribution margin.'
  },
  {
    pillar: 'Market',
    leak: 'On-Time Delivery Shame and Spec Drift Disputes are forcing escalations, chargebacks, and price-only negotiations.',
    strength: 'Market performance is predictable with fast RFQ cycles, requirement lock discipline, OTIF reliability, and proof-pack execution.',
    hook: 'OTIF Shame',
    kpi: 'OTIF %, RFQ cycle time, RFQ win rate %, Complaint/return rate, Escalation closure time, Customer concentration %',
    signal_tags: ['spec_drift_discount', 'pricing_positioning_gap', 'complaint_handling_gap', 'channel_dependency', 'weak_proof_pack', 'weak_onboarding', 'planning_gap'],
    cost: 'When requirements shift mid-build and ship dates slip, support load expands and buyer trust weakens faster than sales teams can recover.',
    cliffhanger: 'Fix Mode installs requirements lock + RFQ SLA in 7 days, then builds a 30-day proof-pack and customer feedback loop.'
  },
  {
    pillar: 'Leadership',
    leak: 'Firefighting Factory behavior and Decision Bottlenecks keep issues cycling without closure and standards drifting by pressure.',
    strength: 'Leadership control is visible and delegated with daily KPI boards, ECO governance, root-cause closure, and cross-functional cadence.',
    hook: 'Firefighting Factory',
    kpi: 'Action closure %, CAPA closure time, ECO cycle time, KPI visibility days, Delegation coverage %, Cross-functional cadence adherence',
    signal_tags: ['decision_bottleneck', 'no_kpi_ownership', 'no_variance_review', 'no_meeting_to_action', 'cross_function_breakdown', 'training_planning_gap', 'role_clarity_gap'],
    cost: 'Urgency wins each day, but unresolved root causes keep recreating downtime, defects, and costly approval delays.',
    cliffhanger: 'Fix Mode sets a 7-day line-board + ownership rhythm and a 30-day delegation/CAPA system that prevents repeat failures.'
  },
  {
    pillar: 'Innovation',
    leak: 'Variant Explosion and NPI Stall are increasing complexity while manufacturability and test coverage fail to keep pace.',
    strength: 'Innovation is disciplined through gated NPI, DFM-first reviews, controlled variant strategy, and Kaizen-based process upgrades.',
    hook: 'Variant Explosion',
    kpi: 'NPI milestone hit %, Variant count vs margin concentration, DFM issues pre-launch, Kaizen count/month, Test coverage effectiveness',
    signal_tags: ['sku_complexity_tax', 'no_product_testing_rhythm', 'slow_bug_fix', 'no_market_feedback_loop', 'quality_definition_gap'],
    cost: 'Complexity added without process readiness multiplies changeover tax, test escapes, and engineering firefighting effort.',
    cliffhanger: 'Fix Mode runs a 7-day variant and NPI triage, then a 30-day DFM + test strategy sprint to stabilize launches.'
  },
  {
    pillar: 'Risk',
    leak: 'Traceability Blackout, Supplier Quality Trap, and compliance drift are exposing the business to recall and liability shocks.',
    strength: 'Risk posture is audit-ready with lot-level traceability, incoming controls, firmware/version security, and documented acceptance rules.',
    hook: 'Traceability Blackout',
    kpi: 'Incoming defect ppm, Traceability completeness %, Time-to-trace, Compliance findings/closure, Firmware compliance %, Safety incidents',
    signal_tags: ['traceability_gap', 'supplier_variance_risk', 'compliance_blocker_risk', 'data_security_gap', 'hygiene_drift', 'contract_gap', 'ip_brand_protection_gap', 'disaster_recovery_gap'],
    cost: 'Without traceability and compliance discipline, one bad lot or field failure can become a costly recall and reputation event.',
    cliffhanger: 'Fix Mode establishes 7-day trace and containment controls, then builds a 30-day recall-readiness and compliance system.'
  },
  {
    pillar: 'People',
    leak: 'Skill Gap Drift and Tribal Knowledge dependency are creating shift variance, fatigue defects, and weak quality ownership.',
    strength: 'People performance is stable through role certification, structured handovers, clear ownership, and incentives aligned to FPY/OTIF.',
    hook: 'Shift Variance Tax',
    kpi: 'Training hours/operator, Station certification %, Shift FPY variance, Turnover %, Absenteeism %, Near-miss incidents',
    signal_tags: ['training_gap', 'hero_operator_dependence', 'weak_shift_handover', 'role_clarity_gap', 'blame_culture', 'low_psych_safety', 'cross_function_breakdown'],
    cost: 'When knowledge is trapped in a few people and handovers are weak, defects spike under pressure and recovery relies on overtime.',
    cliffhanger: 'Fix Mode deploys 7-day handover and ownership rules, then a 30-day certification ladder and cross-training plan.'
  }
];

const speciesA = 'EMS Contract Manufacturer (PCBA + Box Build)';
const speciesB = 'PCBA-Only (SMT + Reflow + AOI + Test)';
const speciesC = 'Cable / Harness / Connector Assembly';
const speciesD = 'High-Mix Low-Volume Custom Builds (Industrial, Lab, Prototypes)';
const speciesE = 'White-Label / Multi-Variant OEM (Many clients, similar products)';
const speciesF = 'Repair / Refurb / Rework Center (Reverse Logistics)';
const speciesG = 'Precision Electronics / Medical / High-Compliance Assembly';
const speciesLegacyA = 'Contract Electronics Assembly (EMS) — boards & devices';
const speciesLegacyB = 'Component Assembly OEM (connectors, harnesses, modules)';
const speciesLegacyC = 'Final Device Assembly (phones, gadgets, appliances sub-assemblies)';
const speciesLegacyD = 'Private Label / White Label OEM (multiple variants for buyers)';
const speciesLegacyE = 'High-Mix Low-Volume (custom builds)';

const missionRowsForSpecies = (
  speciesCode: string,
  lineType: string[],
  texts: Record<PillarId, string>
): LibraryItem[] => {
  const pillars: PillarId[] = ['Operations', 'Money', 'Market', 'Leadership', 'Innovation', 'Risk', 'People'];
  return pillars.map((pillar) => ({
    id: `MB_ASSEMBLY_${speciesCode}_${pillar.toUpperCase()}`,
    industry: 'manufacturing',
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
  ...missionRowsForSpecies('S1', ['Assembly / OEM', 'Assembly / OEM (electronics, components)', speciesA, speciesLegacyA, speciesLegacyC], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, an Execution Drag pattern that usually means yield is leaking while rework loops consume station time. What looks like hard work is often low first-pass output. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode will isolate the top failure modes, stabilize kitting and testing, and recover clean throughput in 7 days.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - classic Margin Mirage behavior where rework, expedites, and hidden scrap quietly absorb contribution margin. Cost: {COST_IMPACT}. Cliffhanger: The Deep Report builds a margin bridge and shows exactly where to stop the bleed in 30 days.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - usually OTIF instability plus requirement-lock gaps that trigger escalations and chargeback pressure. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode generates a proof pack and requirement-lock routine that restores trust before the next negotiation.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - a firefighting cadence is likely crowding out prevention and repeat-issue closure. Cost: {COST_IMPACT}. Cliffhanger: The 30-day playbook installs daily line cadence and action closure rules that stop repeat fires.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - variant pressure and unstable NPI handoffs are likely increasing operational drag. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode introduces NPI gates that prevent unstable builds from becoming production emergencies.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - traceability fragility is increasing containment and recall exposure. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode creates minimum viable lot-station-operator traceability in 7 days.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - shift variance and skill gaps are likely driving defect volatility. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode deploys station certification and structured handovers to equalize performance.'
  }),

  ...missionRowsForSpecies('S2', [speciesB], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2} - commonly Solder Defect Drift and Calibration Drift with ESD risk in the background. Micro-variation in profiles, inspection windows, and controls quietly pushes FPY down. Cost: {COST_IMPACT}. Cliffhanger: The report will lock process windows, calibration cadence, and test gates to reduce retest and escapes.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - a rework labor black hole is likely absorbing margin without visibility. Cost: {COST_IMPACT}. Cliffhanger: 30-day cost-per-board controls will expose and reduce repeat rework spend.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - quality reputation is fragile and one escape can reset customer confidence. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode will build a quality proof pack and escape-prevention routine that restores trust.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - KPI visibility is likely too weak for stable control. Cost: {COST_IMPACT}. Cliffhanger: A daily FPY-defect-downtime board will shift decisions from opinion to evidence.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - DFM feedback to customers is likely underused. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode converts recurring factory pain into a DFM checklist that improves future builds.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - ESD and traceability gaps are increasing field and recall risk. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs an ESD audit sprint and traceability drill to harden containment.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - tribal setup knowledge is likely creating single-point dependency. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode documents critical settings and cross-trains the next line of operators.'
  }),

  ...missionRowsForSpecies('S3', [speciesC, speciesLegacyB], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2} - torque and kitting variation are likely creating misbuild and return risk. In cable and harness work, verification discipline is margin protection. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode adds kitting and verification gates that prevent miswire and mislabeled output in 7 days.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - custom complexity is likely priced like standard production. Cost: {COST_IMPACT}. Cliffhanger: The Deep Report introduces complexity pricing tiers to protect profit per order.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - revision and requirement drift are likely triggering disputes and avoidable rework. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode locks revision control and acceptance criteria so the factory builds the right rev every time.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - approval bottlenecks are likely slowing execution. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode deploys a delegation matrix with clear limits and faster flow.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - module standardization upside is likely underused. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds a modular platform strategy that reduces recurring custom chaos.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - weak trace and revision discipline can escalate a single field failure into a major event. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens lot-operator-revision traceability and change control.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - shift-level assembly consistency is likely unstable. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode applies station certification with a clear QC stop rule.'
  }),

  ...missionRowsForSpecies('S4', [speciesD, speciesLegacyE], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2} - high-mix context switching is likely creating changeover drag and WIP congestion. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode imposes WIP caps and scheduling rules that stop chaos from spreading across the floor.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - quote underpricing and unbilled engineering time are likely eroding returns. Cost: {COST_IMPACT}. Cliffhanger: The report builds a complexity-based pricing model that charges for real effort.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - lead-time promises are likely misaligned with actual capacity. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode aligns delivery commitments to realistic load and reduces trust erosion.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - priority whiplash is likely diffusing execution across too many active jobs. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs a top-3 execution rule and weekly scheduling cadence.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - reusable templates are likely missing, forcing full rework of similar builds. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode creates reusable build standards that preserve custom value without chaos.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - weak revision control increases dispute and warranty exposure. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces requirement-lock and revision trace before release.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - dependence on one expert is likely limiting delivery resilience. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode activates cross-training and setup documentation for continuity.'
  }),

  ...missionRowsForSpecies('S5', [speciesE, speciesLegacyD], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2} - variant churn and BOM drift are likely turning the line into a configuration error engine. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode rationalizes variants and stabilizes BOM control to cut hidden scrap.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - MOQ and dead-stock risk are likely trapping cash after changes. Cost: {COST_IMPACT}. Cliffhanger: The Deep Report adds ECO inventory impact controls that prevent obsolete stock buildup.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - pricing consistency is likely drifting across similar complexity deals. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode introduces pricing bands and complexity tiers that recover negotiating control.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - uncontrolled change releases are likely destabilizing execution. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs gated ECO releases with clear ownership.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - modular architecture opportunities are likely underused. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode standardizes the core and customizes the shell for faster, cleaner delivery.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - firmware/version and serialization controls are likely below safe scale requirements. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens serialization and firmware locks across client variants.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - variant pressure is likely outrunning training consistency. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs quick-reference cards and station certification to reduce variant errors.'
  }),

  ...missionRowsForSpecies('S6', [speciesF], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2} - hidden scrap and test escape patterns are likely feeding repeat returns. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode deploys a FRACAS loop that converts repairs into prevention data.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - diagnostic and handling effort is likely underpriced. Cost: {COST_IMPACT}. Cliffhanger: The report defines service tiers and pricing so turnaround effort is monetized correctly.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - support load is likely overwhelming engineering capacity. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs ticketing and escalation rules that cut repeated support noise.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - turnaround and closure control are likely under-instrumented. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode sets a daily TAT dashboard and closure rhythm.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - failure insights are likely not feeding product or process upgrades. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds a failure-theme roadmap that drives upstream improvements.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - device and customer-data handling controls may be too weak for current volume. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens data and device handling controls with audit evidence.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - repair outcomes are likely technician-dependent. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode standardizes test routines and technician certification.'
  }),

  ...missionRowsForSpecies('S7', [speciesG], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2} - quality gate and trace controls are likely below compliance-grade expectation. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs minimum viable QMS discipline and traceability checks at critical gates.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - audit panic and compliance rework are likely creating avoidable cost spikes. Cost: {COST_IMPACT}. Cliffhanger: The report builds document control and preventive audit rhythm to stabilize cost.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - buyers likely need stronger evidence of reliability and control. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode produces a compliance-grade proof pack with calibration and trace evidence.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - gated change governance may be too weak for regulated execution. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces ECO governance and approval discipline by risk class.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - improvement velocity may be constrained by uncontrolled change risk. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode creates a controlled innovation pipeline inside compliance boundaries.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - compliance and recall exposure are materially high when traceability or test evidence is weak. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode activates readiness dashboards and drill-based containment response.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - certification depth may be insufficient for high-compliance assembly. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches a role-specific certification ladder with periodic revalidation.'
  })
];

const generatedRows: LibraryItem[] = baseRows.flatMap((row) => {
  const idBase = row.pillar.toUpperCase();
  return [
    {
      id: `LIB_ASSEMBLY_${idBase}_LEAK`,
      industry: 'manufacturing',
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
      id: `LIB_ASSEMBLY_${idBase}_STR`,
      industry: 'manufacturing',
      line_type: ['all'],
      pillar: row.pillar,
      signal_tags: row.signal_tags,
      severity_fit: ['Stable', 'Strong'],
      business_size_fit: allSizes,
      text: row.strength,
      type: 'strength',
      hook_text: row.hook,
      kpi_text: row.kpi
    },
    {
      id: `LIB_ASSEMBLY_${idBase}_HOOK`,
      industry: 'manufacturing',
      line_type: ['all'],
      pillar: row.pillar,
      signal_tags: [],
      severity_fit: allSeverity,
      business_size_fit: allSizes,
      text: row.hook,
      type: 'hook',
      hook_text: row.hook,
      kpi_text: row.kpi
    },
    {
      id: `LIB_ASSEMBLY_${idBase}_KPI`,
      industry: 'manufacturing',
      line_type: ['all'],
      pillar: row.pillar,
      signal_tags: [],
      severity_fit: allSeverity,
      business_size_fit: allSizes,
      text: row.kpi,
      type: 'kpi',
      kpi_text: row.kpi
    }
  ];
});

export const library: LibraryItem[] = [...generatedRows, ...missionBriefRows];
