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
    leak: 'Rework Forge, Scrap Mountain, and Fit-Up Failure Loop are consuming labor and steel while delivery promises slip.',
    strength: 'Operations are controlled with drawing lock, fit-up standards, staged QC, and managed bottlenecks.',
    hook: 'Rework Forge',
    kpi: 'Scrap %, Rework hours/job, First-pass weld quality %, On-time completion %, Cycle time/job, Stockout incidents #',
    signal_tags: ['quality_built_late', 'waste_not_costed', 'flow_instability'],
    cost: 'Cutting errors, distortion, and late-stage defects create refabrication cycles that burn material and time.',
    cliffhanger: 'Fix Mode installs drawing/spec lock, fit-up SOP, and QC stage gates so metal leaves the shop right the first time.'
  },
  {
    pillar: 'Money',
    leak: 'Underquote Suicide and Hidden Consumables Bleed are compressing margin while payment delays and rework costs grow.',
    strength: 'Money control is job-level with accurate quoting, tracked hours, deposit discipline, and costed consumables.',
    hook: 'Underquote Suicide',
    kpi: 'Profit/job, Quote accuracy, Consumables cost/job, Deposit rate, DSO, Warranty/rework cost',
    signal_tags: ['costing_gap', 'pricing_margin_blindspot', 'payment_delay_chokehold'],
    cost: 'Jobs are won fast but profitability is lost in unpriced consumables, scope changes, and overtime-heavy execution.',
    cliffhanger: 'Fix Mode builds full job-costing and change-order rules so every quoted job protects margin in execution.'
  },
  {
    pillar: 'Market',
    leak: 'Trust Collapse and Spec Confusion Dispute patterns are weakening close rate and repeat contract confidence.',
    strength: 'Market execution is professional: specs are signed, progress is communicated, and proof packs support premium pricing.',
    hook: 'Trust Collapse',
    kpi: 'Quote-to-deposit %, On-time delivery %, Complaint/dispute %, Repeat client %, AOV, Referral %',
    signal_tags: ['spec_drift_discount', 'weak_proof_pack', 'channel_dependency'],
    cost: 'Unclear expectations and weak follow-through reduce referrals, trigger disputes, and force price-driven negotiations.',
    cliffhanger: 'Fix Mode deploys a proof-driven sales and updates cadence so clients buy reliability, not the cheapest quote.'
  },
  {
    pillar: 'Leadership',
    leak: 'Founder Bottleneck and Firefighting Workshop patterns are causing slow decisions, unstable quality, and repeated issues.',
    strength: 'Leadership runs on clear stage ownership, daily plan-vs-actual rhythm, and weekly closure of recurring causes.',
    hook: 'Founder Bottleneck',
    kpi: 'Action closure %, Job card compliance %, Recurring defect rate, Capacity utilization %, Delegation coverage %',
    signal_tags: ['decision_bottleneck', 'no_accountability_loop', 'no_meeting_to_action'],
    cost: 'When decisions and standards depend on one person, throughput stalls and defect recurrence becomes expensive.',
    cliffhanger: 'Fix Mode assigns stage owners and installs closure cadence so quality and deadlines survive pressure.'
  },
  {
    pillar: 'Innovation',
    leak: 'Jig-less Production and Repeat Work Blindness are forcing rework, long setup time, and avoidable scrap.',
    strength: 'Innovation is practical: jigs/templates, improved drawings, optimized layouts, and digital tracking cut waste and delay.',
    hook: 'Jig-less Production',
    kpi: 'Jig adoption %, Setup time reduction %, Scrap trend, New product lines/quarter, Digital tracking coverage %',
    signal_tags: ['sku_complexity_tax', 'slow_bug_fix', 'no_market_feedback_loop'],
    cost: 'Rebuilding repeat parts from scratch blocks compounding efficiency gains that should improve margin every month.',
    cliffhanger: 'Fix Mode launches a 30-day jigs + method + digital visibility sprint tied to cycle time and scrap reduction.'
  },
  {
    pillar: 'Risk',
    leak: 'Safety Time Bomb and Contract Penalty exposure are rising due to informal controls in high-risk welding and site work.',
    strength: 'Risk systems are enforced with safety routines, signed scope/change terms, traceable records, and site sign-offs.',
    hook: 'Contract Penalty Trap',
    kpi: 'Safety incidents/near misses, Contract coverage %, Tool loss #, Compliance issues #, Installation incidents #',
    signal_tags: ['hygiene_drift', 'contract_gap', 'compliance_blocker_risk'],
    cost: 'One incident, dispute, or late penalty can erase monthly profit and damage long-term contract access.',
    cliffhanger: 'Fix Mode implements safety audits, contract controls, and documentation discipline to prevent business-ending shocks.'
  },
  {
    pillar: 'People',
    leak: 'Skill Variance Tax and Training Void are creating quality swings, hidden scrap, and fragile delivery capacity.',
    strength: 'People systems stabilize output through tested skill standards, structured onboarding, and shared quality ownership.',
    hook: 'Skill Variance Tax',
    kpi: 'Skill certification %, Training hours/month, Attendance %, Turnover %, Quality participation %, Safety completion %',
    signal_tags: ['training_gap', 'hero_operator_dependence', 'onboarding_gap'],
    cost: 'When quality relies on a few welders and apprentices learn by guessing, defects and delays scale with workload.',
    cliffhanger: 'Fix Mode installs internal skill tests, training ladders, and disciplined handovers so quality is repeatable.'
  }
];

const species1 = 'Structural Steel & Construction Fabrication (frames, beams, gates, stairs)';
const species2 = 'Doors, Windows, Grills & Security Products';
const species3 = 'Industrial Fabrication (tanks, platforms, racks, hoppers)';
const species4 = 'Automotive Fabrication (trailers, bodies, repairs/mods)';
const species5 = 'Aluminum Fabrication (doors, partitions, glazing frames)';
const species6 = 'Stainless Steel Works (kitchen, hospital, food-grade)';

const missionRowsForSpecies = (
  speciesCode: string,
  lineType: string[],
  texts: Record<PillarId, string>
): LibraryItem[] => {
  const pillars: PillarId[] = ['Operations', 'Money', 'Market', 'Leadership', 'Innovation', 'Risk', 'People'];
  return pillars.map((pillar) => ({
    id: `MB_METAL_${speciesCode}_${pillar.toUpperCase()}`,
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
  // Species 1 (default for generic metal selection)
  ...missionRowsForSpecies('S1', ['Metal works / fabrication', species1], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, which often signals No-Drawings Chaos and Fit-Up Failure Loop. In structural work, one wrong measurement becomes a full refabrication - steel does not forgive. When fit-up is improvised, weld distortion increases, alignment fails, and rework becomes normal. Cost: {COST_IMPACT} through scrap, rework labor, and site returns. Cliffhanger: Fix Mode generates a 7-day drawing lock + fit-up SOP + stage QC gates so steel leaves the shop right the first time.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - usually Underquote Suicide plus Hidden Consumables Bleed (gas, electrodes, discs, wire). Structural jobs look profitable until you add the real weld hours, grinder time, transport, and site adjustments. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds a job-costing template that prices steel + labor + consumables + transport so you stop winning jobs that lose money.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - often a Trust Collapse risk: late delivery, weak progress updates, and unclear specs. In construction, reliability is the product. Cost: {COST_IMPACT} in lost repeat contracts and reduced pricing power. Cliffhanger: Fix Mode installs a professional bid pack + progress reporting so clients trust you like a contractor, not a hustler.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - meaning the shop may run on firefighting, and decisions wait for one person. This creates Founder Bottleneck delays and chaotic quality. Cost: {COST_IMPACT} as jobs slip and overtime grows. Cliffhanger: Fix Mode assigns owners per stage (cut-fit-weld-finish-install) and forces weekly closure on repeat issues.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - usually missing jigs, templates, and better fabrication standards. Structural profit compounds through small time savings repeated daily. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches a 30-day jigs + layout + method improvement sprint tied to cycle time and scrap reduction.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - structural work carries high risk: safety incidents, site liability, contract penalties. One accident or a failed structure can destroy the business. Cost: {COST_IMPACT} plus catastrophic downside. Cliffhanger: Fix Mode creates safety audits, contract clauses, and installation checklists to reduce business-ending risk.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - commonly Skill Variance Tax. If weld quality depends on that one guy, output becomes fragile. Cost: {COST_IMPACT} via rework and inconsistent delivery. Cliffhanger: Fix Mode builds internal skill tests + weld SOPs so quality becomes predictable across the team.'
  }),

  // Species 2
  ...missionRowsForSpecies('S2', [species2], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, often pointing to Measurement Drift and Weld Quality Roulette. Security products look simple, but customers notice gaps, misalignment, weak hinges, and poor finish immediately. Small mistakes multiply because you repeat the same work at high volume. Cost: {COST_IMPACT} through refabrication, returns, and reputation damage. Cliffhanger: Fix Mode installs a 7-day measurement lock + jig templates + finishing standard to reduce rework fast.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - usually Underquote Suicide plus Scope Creep Theft (extra locks, stronger hinges, thicker steel, extra coats). Cost: {COST_IMPACT} because small upgrades become unpaid margin killers. Cliffhanger: Fix Mode builds tier pricing (standard/premium) and a change-order script so upgrades become profit, not pain.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - often a Price War Trap. Many shops sell the same grills; winners differentiate through finish, durability, and installation professionalism. Cost: {COST_IMPACT} in thin margins and endless haggling. Cliffhanger: Fix Mode creates a proof pack (before/after, durability promises, install SOP) that justifies higher prices.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - likely missing standard work. When pressure rises, shortcuts happen, defects rise, and refunds appear. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs daily job boards + QC gates so quality does not collapse during busy weeks.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - missed modular designs and standardized components (hinge plates, lock boxes, frame sizes). Cost: {COST_IMPACT} because you keep reinventing what could be templated. Cliffhanger: Fix Mode builds a 30-day modular library that reduces cycle time and increases output.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - security work carries installation liability and customer disputes if locks fail, hinges snap, or welding cracks. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs installation sign-off + warranty terms + material standards to reduce disputes.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - apprentices guessing and shortcut culture lead to weak welds and misalignment. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode creates training checklists and quality ownership so defects reduce without constant shouting.'
  }),

  // Species 3
  ...missionRowsForSpecies('S3', [species3], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, often indicating Fit-Up Failure Loop and No-Drawings Chaos. Industrial jobs require precision and testing; fabrication errors are expensive because the product must function under load, pressure, or wear. Cost: {COST_IMPACT} through rework, failed tests, and client trust loss. Cliffhanger: Fix Mode generates a 7-day drawing/spec lock plus stage testing checklists so failures are caught early.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - commonly Hidden Consumables Bleed plus Time Theft Fog. Industrial work has heavy grinding, fitting, and finishing time; if you do not track hours, you underprice by default. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs time tracking + job costing so your quotes match reality and margins stabilize.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - industrial buyers pay for documentation, testing, and reliability. If your offers look informal, you lose contracts even if you have skills. Cost: {COST_IMPACT} in lost high-ticket jobs. Cliffhanger: Fix Mode builds a contractor-level documentation pack that increases close rate and price strength.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - likely weak project planning and unclear ownership. Industrial jobs fail when the shop is not run like a project. Cost: {COST_IMPACT} via delays, overtime, and errors. Cliffhanger: Fix Mode installs project execution routines: owners, deadlines, progress checks, and action closure.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - missed opportunities in design-for-fabrication (simplifying joints, using jigs, modularity). Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches a 30-day design simplification sprint to reduce build time while improving reliability.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - industrial failures create serious liability. Safety, standards, and documentation protect your future. Cost: {COST_IMPACT} plus catastrophic downside. Cliffhanger: Fix Mode builds compliance checklists and QC documentation to reduce dangerous failures.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - high-skill work requires consistent weld quality and disciplined QC behavior. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds skill standards and a no-shame QC culture so defects are surfaced early, not hidden.'
  }),

  // Species 4
  ...missionRowsForSpecies('S4', [species4], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, often pointing to Measurement Drift and Rework Forge. Automotive jobs are messy: unknown damage, hidden alignment issues, and client changes. Without structured intake and inspection, jobs expand and deadlines explode. Cost: {COST_IMPACT} through refabrication, repeated fitting, and wasted labor. Cliffhanger: Fix Mode installs a 7-day intake inspection + scope lock system so every job starts with clarity.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - typically Scope Creep Theft plus undercharging for complexity. Automotive work kills profit when you charge like it is simple but deliver like it is engineering. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode creates complexity pricing and stage billing so custom mods stop draining cash.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - automotive buyers buy trust and turnaround time. If delivery is inconsistent, referrals die. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds customer updates and proof-of-work (photos at each stage) to increase trust and repeat business.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - likely chaotic job prioritization and unclear ownership. Cost: {COST_IMPACT} as jobs pile up half-finished. Cliffhanger: Fix Mode builds job boards and prioritization rules so cash jobs move first and backlog reduces.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - missed opportunity to standardize repeat elements (trailer frames, hinge sets, mounting points). Cost: {COST_IMPACT}. Cliffhanger: Fix Mode creates a 30-day standard kit system so speed and margin increase.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - automotive fabrication has serious liability if a trailer fails on the road. Cost: {COST_IMPACT} plus business-ending risk. Cliffhanger: Fix Mode adds safety and load-testing checklists plus warranty terms to reduce dangerous failures.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - shortcut culture and fatigue can cause weak welds and dangerous builds. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs quality sign-offs and training ladders so builds are safe and consistent.'
  }),

  // Species 5
  ...missionRowsForSpecies('S5', [species5], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, often indicating Measurement Drift and weak finishing/installation discipline. Aluminum looks clean - until gaps show, frames misalign, or seals fail. Cost: {COST_IMPACT} via refits, returns, and site delays. Cliffhanger: Fix Mode builds a 7-day measurement lock + installation checklist so site rework drops immediately.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - commonly undercharging for installation complexity and rework risk. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs tier pricing and change orders so custom glass, seals, and hardware upgrades become margin.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - aluminum buyers choose finish quality and professionalism. Weak documentation makes you look cheap. Cost: {COST_IMPACT} through low closing rates and price pressure. Cliffhanger: Fix Mode builds a proof portfolio and professional quote pack that lifts price confidence.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - likely poor coordination between workshop fabrication and site installation. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode assigns stage owners and forces handover checklists for smooth installation.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - missed modular templates for common sizes and standard hardware kits. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds a 30-day standard sizes + hardware kit library to reduce errors and speed delivery.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - safety and liability risks exist in glass handling and installation. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode adds safety SOPs and acceptance sign-offs to reduce incidents and disputes.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - installation skill variance creates visible defects and customer complaints. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs training checklists and quality sign-off so finish looks premium every time.'
  }),

  // Species 6
  ...missionRowsForSpecies('S6', [species6], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, often pointing to Finish Standards Gaps and fabrication inconsistency. Stainless customers judge weld cleanliness, polish, hygiene, and durability - small defects look like incompetence. Cost: {COST_IMPACT} through rework, rejection, and brand damage. Cliffhanger: Fix Mode builds a 7-day finishing standard + QC checklist so output becomes consistently premium.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - stainless often suffers from undercharging for finishing labor. Polish and hygiene-grade quality are time expensive; if you price like mild steel, you lose money. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds stainless-specific pricing (finish grades, labor tiers) so premium work produces premium margins.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - stainless buyers pay for hygiene confidence, professionalism, and proof. Cost: {COST_IMPACT} if clients doubt your standards. Cliffhanger: Fix Mode creates a hygiene-grade proof pack (photos, specs, finish grade language) that boosts close rates and pricing power.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - likely missing standards and stage ownership for finishing and QC. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs owners and QC gates so defects are caught early, not after polishing.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - missed modular designs and repeat templates for sinks, tables, shelves, and kitchen sets. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds a 30-day modular catalog to increase speed and repeat sales.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - food and hospital-related stainless work carries reputational and compliance risk. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds documentation, acceptance sign-off, and warranty terms to reduce disputes and protect reputation.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - stainless finishing skill variance is brutal: one bad welder or polisher can destroy the brand. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs skill tests + finishing SOPs so premium output becomes consistent.'
  })
];

const generatedRows: LibraryItem[] = baseRows.flatMap((row) => {
  const idBase = row.pillar.toUpperCase();
  return [
    {
      id: `LIB_METAL_${idBase}_LEAK`,
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
      id: `LIB_METAL_${idBase}_STR`,
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
      id: `LIB_METAL_${idBase}_HOOK`,
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
      id: `LIB_METAL_${idBase}_KPI`,
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
