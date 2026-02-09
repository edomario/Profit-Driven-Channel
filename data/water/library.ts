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
    leak: 'Purity Drift, Fill-Volume Leak, and Cap Seal Roulette are creating hidden loss and unstable customer experience.',
    strength: 'Operations are stable with filter-hour controls, verified CIP, calibrated filling, and stage-based quality gates.',
    hook: 'Fill-Volume Leak',
    kpi: 'Units/hour, Fill variance (ml), Leak rate %, CIP compliance %, Filter schedule compliance %, Downtime minutes/day',
    signal_tags: ['measurement_blindspot', 'quality_definition_gap', 'hygiene_drift'],
    cost: 'Inconsistent controls in filling, sealing, and sanitation convert production volume into rework, leaks, and complaint risk.',
    cliffhanger: 'Fix Mode locks calibration, sanitation cadence, and early QC sampling so quality stabilizes within days.'
  },
  {
    pillar: 'Money',
    leak: 'COGS Mirage, Power Bleed, and route-cost blind spots are eroding margin while sales appear healthy.',
    strength: 'Money control is SKU-level with true unit costing, route economics, disciplined collections, and shrinkage tracking.',
    hook: 'Power Bleed',
    kpi: 'Unit cost/SKU, Power cost per unit, Delivery cost per route, Margin/SKU, Shrinkage variance, DSO',
    signal_tags: ['costing_gap', 'energy_burn_spiral', 'payment_delay_chokehold'],
    cost: 'Unpriced power and delivery variance plus delayed collections cause revenue growth to decouple from cash growth.',
    cliffhanger: 'Fix Mode builds a cost-and-cash control loop so route growth translates into margin and collections.'
  },
  {
    pillar: 'Market',
    leak: 'Trust Collapse risk and Route Blindness are weakening repeat demand, shelf rotation, and price control.',
    strength: 'Market execution is disciplined: clear service-level routines, route profitability tracking, and complaint closure speed.',
    hook: 'Route Blindness',
    kpi: 'OTIF %, Stockout %, Route margin, Complaints per 1,000 + closure time, Repeat retailer %, Price realization',
    signal_tags: ['channel_dependency', 'order_fulfillment_instability', 'complaint_handling_gap'],
    cost: 'Without route and shelf discipline, you lose rotation, absorb returns, and get trapped in low-price negotiations.',
    cliffhanger: 'Fix Mode installs route-margin maps and rotation routines that improve retention and price strength.'
  },
  {
    pillar: 'Leadership',
    leak: 'Firefighting Plant behavior and approval bottlenecks are causing recurring quality drift and missed delivery promises.',
    strength: 'Leadership runs with delegated limits, visible KPIs, and routine root-cause closure across production and dispatch.',
    hook: 'Firefighting Plant',
    kpi: 'Schedule adherence %, Weekly action closure %, Root-cause closure %, Delegation coverage %, KPI update compliance %',
    signal_tags: ['decision_bottleneck', 'no_variance_review', 'no_meeting_to_action'],
    cost: 'When decisions and standards depend on personalities, defects and delays repeat and management attention gets consumed.',
    cliffhanger: 'Fix Mode enforces ownership cadence and closure rules so problems are prevented, not recycled.'
  },
  {
    pillar: 'Innovation',
    leak: 'SKU Chaos and Packaging Premium Gaps are increasing complexity while differentiation and margin power stay weak.',
    strength: 'Innovation is intentional with focused SKU mix, controlled pilots, better packaging signals, and service bundles.',
    hook: 'SKU Chaos',
    kpi: 'New channel tests/quarter, SKU count vs profit concentration, Packaging upgrade adoption %, Premium tier share %',
    signal_tags: ['sku_complexity_tax', 'pack_size_profit_blindspot', 'no_product_testing_rhythm'],
    cost: 'Uncontrolled assortment growth adds setup loss and working-capital drag without improving customer preference.',
    cliffhanger: 'Fix Mode launches a 30-day SKU and packaging sprint that protects simplicity while lifting value perception.'
  },
  {
    pillar: 'Risk',
    leak: 'Contamination exposure and Traceability Blackouts leave the business vulnerable to recall events and compliance shocks.',
    strength: 'Risk controls are audit-ready with testing cadence, traceability records, hygiene verification, and clear acceptance terms.',
    hook: 'Traceability Blackout',
    kpi: 'Water test compliance %, Traceability completeness %, Audit findings #, Nonconformance response time, Safety incidents #',
    signal_tags: ['traceability_gap', 'compliance_blocker_risk', 'hygiene_drift'],
    cost: 'A single quality incident without traceability and testing proof can trigger major account, regulatory, and reputation loss.',
    cliffhanger: 'Fix Mode hardens testing, coding, and incident protocols so complaints are contained before they scale.'
  },
  {
    pillar: 'People',
    leak: 'Shift Variance Tax and Training Void are making quality person-dependent and increasing fatigue defects.',
    strength: 'People systems stabilize output with role certification, structured handovers, and accountability linked to quality KPIs.',
    hook: 'Shift Variance Tax',
    kpi: 'Training hours/worker, Role certification %, Shift defect variance, Turnover %, Absenteeism %, Safety training %',
    signal_tags: ['training_gap', 'weak_shift_handover', 'hero_operator_dependence'],
    cost: 'When critical controls rely on memory and hero operators, quality swings by shift and corrective rework becomes normal.',
    cliffhanger: 'Fix Mode installs certification ladders, shift ownership, and handover discipline to keep quality stable.'
  }
];

const speciesA = 'Small Plant Bottled Water (manual/semi-automatic)';
const speciesB = 'Automated Bottling Line (higher volume)';
const speciesC = 'Sachet Water (high volume, price-sensitive)';
const speciesD = 'Ice Blocks / Ice Cubes (standalone)';
const speciesE = 'Bottled Water + Ice (combined plant)';
const speciesF = 'Institutional Supply (schools, hospitals, offices, events)';
const speciesG = 'Distributor / Private Label Bottling';

const missionRowsForSpecies = (
  speciesCode: string,
  lineType: string[],
  texts: Record<PillarId, string>
): LibraryItem[] => {
  const pillars: PillarId[] = ['Operations', 'Money', 'Market', 'Leadership', 'Innovation', 'Risk', 'People'];
  return pillars.map((pillar) => ({
    id: `MB_WATER_${speciesCode}_${pillar.toUpperCase()}`,
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
  ...missionRowsForSpecies('S1', ['Bottled water / ice production', speciesA], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, often showing Filter Fatigue and Cap Seal Roulette in small plants. These leaks look minor but steadily convert finished units into complaints and returns. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs filter-hour tracking, seal sampling, and fill controls that stabilize output fast.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - usually Power Bleed plus COGS Mirage. Without true unit economics, daily production activity can still produce weak cash. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode sets unit-cost and margin rules tied to power and packaging volatility.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - often Brand Blur and Shelf Death dynamics. Product exists, but shelf trust and rotation are fragile. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds a retailer rotation and proof-pack routine that improves repeat orders.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - a firefighting cadence is likely causing standards to drift when pressure rises. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs KPI rhythm and action closure so quality holds even without founder intervention.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - growth options beyond core stock movement are underused. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches a 30-day channel and service bundle sprint to improve stickiness and margin.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - weak testing and traceability create high downside from even one contamination rumor. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens testing cadence and batch coding before incidents escalate.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - training gaps are likely driving shift-level variation. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode adds role certification and handover structure so quality is no longer person-dependent.'
  }),

  ...missionRowsForSpecies('S2', [speciesB], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, typically Downtime Drain plus Fill-Volume Leak. In automated lines, small calibration drift and micro-stoppages compound into major capacity loss. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs calibration logs, PM discipline, and early QC gates to recover output.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - high-volume flow is being diluted by route inefficiency and discount leakage. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode maps route profitability and locks pricing guardrails to protect margin at scale.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - distribution growth may be masking weak shelf reliability and service consistency. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode creates territory controls that increase repeat performance across channels.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - complexity likely exceeds current delegation and escalation design. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode sets decision limits and KPI cadence so operational speed does not compromise control.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - SKU and packaging mix may be growing without a margin lens. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode drives SKU discipline and packaging upgrades tied to price realization.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - scale amplifies traceability and recall risk when controls are weak. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode implements audit-ready coding and incident response routines across all lines.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - operator capability variance is likely translating into downtime and defects. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode certifies critical roles and links incentives to quality plus uptime.'
  }),

  ...missionRowsForSpecies('S3', [speciesC], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, usually sanitation and seal-consistency gaps that create high-volume defect exposure. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs hygiene verification and seal sampling that protects trust in low-margin, high-speed runs.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - thin pricing and power intensity are compressing unit economics. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode ties power-per-unit tracking to pricing and route discipline so volume stays profitable.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - sachet markets punish inconsistency quickly, and trust failure spreads fast. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode adds visible trust cues and complaint closure loops that protect repeat demand.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - daily standard enforcement may be uneven under throughput pressure. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs shift-level ownership and hard quality gates that survive volume spikes.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - differentiation options like service bundles and branded assurance are underused. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs a 30-day value-upgrade sprint that reduces pure price dependence.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - compliance and testing discipline are critical survival controls in sachet categories. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces test schedules, documentation, and response playbooks.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - training and shift consistency gaps are likely driving avoidable defect loops. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs fast role training and handover controls to stabilize execution.'
  }),

  ...missionRowsForSpecies('S4', [speciesD], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, often Cold Chain Gap plus melt-loss handling issues. In standalone ice operations, timing and storage discipline decide usable output. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs melt-loss tracking, storage SOPs, and dispatch timing controls.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - route fuel and melt loss are likely cancelling expected margin. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode adds route pricing rules and minimum-order thresholds to protect contribution per trip.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - reliability expectations are high in fisheries, bars, and events, and service variance is penalized quickly. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds schedule-based delivery offers that improve retention.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - planning gaps are likely causing late-night emergencies and preventable dispatch conflicts. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs daily dispatch planning and action closure routines.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - service innovation like cooler rental and recurring delivery plans is underleveraged. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches a 30-day service-bundle sprint to increase stickiness and margin.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - hygiene handling and documentation gaps can quickly damage account confidence. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces handling SOPs and evidence logs across storage and transport.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - handling discipline and fatigue patterns are likely creating preventable melt and damage loss. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode assigns role accountability and shift controls around storage and loading.'
  }),

  ...missionRowsForSpecies('S5', [speciesE], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, commonly showing scheduling collision between bottling and ice lines. Cost: {COST_IMPACT} as one line surge disrupts the other. Cliffhanger: Fix Mode introduces shared capacity planning and priority rules that protect both outputs.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - blended reporting may be hiding one line subsidizing the other. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode separates per-line costing and route economics so decisions reflect true margin.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - cross-sell opportunities are underused and channel promises may be inconsistent. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode structures bundle offers that increase customer stickiness across both products.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - mixed-line complexity likely exceeds current coordination routines. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode sets role clarity and weekly cadence to reduce operational conflict.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - combined-service differentiation is not being fully captured. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs a 30-day bundled service sprint targeting events and institutions.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - hygiene and traceability demands are elevated when two lines share infrastructure. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens dual-line hygiene and coding controls to contain risk.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - cross-line training and handovers are likely weak points. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode cross-trains teams and standardizes handovers to reduce line bottlenecks.'
  }),

  ...missionRowsForSpecies('S6', [speciesF], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, where reliability gaps in delivery and quality checks are threatening contract confidence. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode establishes delivery calendars with pre-dispatch quality gates.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - institutional credit terms and delayed collections are likely choking cashflow. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode implements contract payment controls and collection escalation rules.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - weak tender proof and service evidence are limiting account growth. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds compliance-grade bid packs and reliability metrics for renewals.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - service delivery may still rely on heroics instead of repeatable systems. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode sets ownership and SLA rhythm so contracts are executed predictably.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - dispenser, subscription, and SLA offerings are underdeveloped. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs a contract-service innovation sprint to raise retention and order value.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - institutional channels demand strict compliance and audit readiness. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces documentation and acceptance controls that reduce penalty risk.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - SOP discipline and role-level accountability need strengthening under contract pressure. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode certifies roles and protects quality ownership under deadline load.'
  }),

  ...missionRowsForSpecies('S7', [speciesG], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, often Label Chaos plus traceability weaknesses across client SKUs. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs private-label job tickets, spec locks, and batch-code discipline to prevent costly mix-ups.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - underquoting small custom runs and special requests is likely collapsing margin. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode creates private-label pricing tiers and MOQ rules tied to profitability.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - concentration risk is high when one account dominates private-label volume. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode deploys account diversification and reliability-led positioning to attract stronger clients.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - documentation-heavy execution may be running without enough planning discipline. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs weekly capacity governance and action closure by account.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - operational innovation in changeovers, premium packs, and service options is underleveraged. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs a 30-day reliability-plus-premium sprint to lift margin per run.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - claim responsibility and acceptance ambiguity can trigger expensive disputes. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces compliance gates and contract clauses for claims, changes, and acceptance.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - high-SKU complexity is exposing training and handover weaknesses. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode standardizes role training and accountability so accuracy holds under pressure.'
  })
];

const generatedRows: LibraryItem[] = baseRows.flatMap((row) => {
  const idBase = row.pillar.toUpperCase();
  return [
    {
      id: `LIB_WATER_${idBase}_LEAK`,
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
      id: `LIB_WATER_${idBase}_STR`,
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
      id: `LIB_WATER_${idBase}_HOOK`,
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
      id: `LIB_WATER_${idBase}_KPI`,
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
