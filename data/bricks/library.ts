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
    leak: 'Curing Debt, Water Ratio Roulette, and Mold Drift are driving rejects, breakage, and inconsistent site performance.',
    strength: 'Operations run on controlled mix ratios, curing compliance, mold discipline, and stage QC from batch start to dispatch.',
    hook: 'Curing Debt',
    kpi: 'Output/shift, Reject %, Strength pass %, Dimensional pass %, Curing compliance %, Downtime hours',
    signal_tags: ['measurement_blindspot', 'quality_built_late', 'reactive_maintenance'],
    cost: 'Rushed curing and mix inconsistency create hidden defects that surface later as site rejections and replacements.',
    cliffhanger: 'Fix Mode locks ratio, curing, and first-batch checks so quality stabilizes without sacrificing throughput.'
  },
  {
    pillar: 'Money',
    leak: 'Cement Burn, Ghost Transport Cost, and Margin Mirage are turning busy weeks into weak cash outcomes.',
    strength: 'Money control is line-specific with true unit costing, transport economics, controlled credits, and shrinkage visibility.',
    hook: 'Cement Burn',
    kpi: 'Unit cost/SKU, Cement usage per batch, Margin by line %, Transport cost/trip, DSO, Shrinkage variance',
    signal_tags: ['costing_gap', 'pricing_margin_blindspot', 'payment_delay_chokehold'],
    cost: 'Unpriced delivery realities and material variance drain margin even when sales volume appears strong.',
    cliffhanger: 'Fix Mode installs per-line costing and credit discipline so volume converts to cash, not leakage.'
  },
  {
    pillar: 'Market',
    leak: 'Spec Drift Disputes and Site Rejection risk are weakening contractor trust and forcing price-only negotiations.',
    strength: 'Market performance is reliable with signed specs, dispatch consistency, and clear proof of quality and strength.',
    hook: 'Site Rejection Nightmare',
    kpi: 'OTIF %, Site rejection %, Complaint rate + closure time, Repeat customer %, Channel mix, Concentration %',
    signal_tags: ['spec_drift_discount', 'order_fulfillment_instability', 'low_repeat_orders'],
    cost: 'Inconsistent specs, late dispatch, and weak proof assets trigger returns, rumors, and contractor churn.',
    cliffhanger: 'Fix Mode deploys spec-lock and proof-pack discipline that rebuilds trust and protects price realization.'
  },
  {
    pillar: 'Leadership',
    leak: 'Firefighting Yard behavior and No Standard Syndrome keep recurring issues alive and decision speed too slow.',
    strength: 'Leadership runs with visible KPI cadence, delegated limits, and weekly root-cause closure.',
    hook: 'Firefighting Yard',
    kpi: 'Schedule adherence %, Action closure %, Root-cause closure %, Delegation coverage %, KPI update compliance %',
    signal_tags: ['panic_scheduling', 'decision_bottleneck', 'no_kpi_ownership'],
    cost: 'Without stable ownership and standard routines, yard variability compounds into chronic delay and quality risk.',
    cliffhanger: 'Fix Mode sets production rhythm, owners, and closure rules so performance is repeatable under pressure.'
  },
  {
    pillar: 'Innovation',
    leak: 'Product Mix Chaos and Tooling Upgrade Gaps are increasing complexity while premium potential remains untapped.',
    strength: 'Innovation is disciplined with SKU rationalization, mold/tool ROI upgrades, and premium product testing cadence.',
    hook: 'Product Mix Chaos',
    kpi: 'New trials/quarter, Premium share %, Mold/tooling uptime %, SKU health score, Bundle adoption %',
    signal_tags: ['sku_complexity_tax', 'slow_bug_fix', 'no_product_testing_rhythm'],
    cost: 'Too many uncontrolled SKUs and outdated molds lock the yard into low-margin commodity behavior.',
    cliffhanger: 'Fix Mode launches a 30-day premium-line and tooling-improvement sprint tied to margin and consistency.'
  },
  {
    pillar: 'Risk',
    leak: 'Strength Liability, Dust Exposure, and Contract ambiguity are creating preventable legal and safety downside.',
    strength: 'Risk is controlled with traceability, acceptance terms, safety checks, and compliance-ready records.',
    hook: 'Strength Liability',
    kpi: 'Safety incidents #, PPE compliance %, Dust checks %, Contract disputes # + resolution time, Traceability completeness %',
    signal_tags: ['contract_gap', 'traceability_gap', 'compliance_blocker_risk'],
    cost: 'One structural failure, incident, or undocumented dispute can erase hard-won profit and damage long-term trust.',
    cliffhanger: 'Fix Mode hardens traceability, contract terms, and safety routines before disputes or incidents escalate.'
  },
  {
    pillar: 'People',
    leak: 'Shift Variance Tax and Training Void are causing inconsistent strength, reject spikes, and avoidable fatigue errors.',
    strength: 'People systems stabilize output through role certification, shift handovers, and quality-linked accountability.',
    hook: 'Shift Variance Tax',
    kpi: 'Training hours/worker, Certification %, Shift variance day vs night, Turnover %, Absenteeism %',
    signal_tags: ['training_gap', 'weak_shift_handover', 'role_clarity_gap'],
    cost: 'When critical steps rely on memory and hero operators, quality swings and defects scale with workload pressure.',
    cliffhanger: 'Fix Mode installs certification, handover standards, and shift ownership to make quality less person-dependent.'
  }
];

const species1 = 'Manual Yard Bricks (small-scale clay bricks / hand-mold)';
const species2 = 'Concrete Blocks (hollow/solid blocks, machine-vibro)';
const species3 = 'Pavers / Kerbs / Precast (high mix + high QC demand)';
const species4 = 'Cement Tiles / Terrazzo / Floor Tiles';
const species5 = 'Roofing Tiles (concrete tiles, decorative roofing pieces)';
const species6 = 'Multi-Product Yard (blocks + pavers + tiles + custom orders)';

const missionRowsForSpecies = (
  speciesCode: string,
  lineType: string[],
  texts: Record<PillarId, string>
): LibraryItem[] => {
  const pillars: PillarId[] = ['Operations', 'Money', 'Market', 'Leadership', 'Innovation', 'Risk', 'People'];
  return pillars.map((pillar) => ({
    id: `MB_BRICKS_${speciesCode}_${pillar.toUpperCase()}`,
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
  ...missionRowsForSpecies('S1', ['Bricks / blocks / cement products', species1], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, often appearing as Curing Debt and Stockyard Chaos in manual yards. When drying and curing controls drift, bricks may look fine today but fail later and trigger replacements. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode deploys yard-zone controls, batch tags, and stacking discipline so quality stays stable without slowing output.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - usually Margin Mirage and Ghost Transport Cost. High activity does not always convert to cash when delivery economics are unclear. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs simple unit-cost and trip-pricing rules so every delivery protects margin.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - contractor trust is at risk when timing and quality vary. Cost: {COST_IMPACT} through lower repeat confidence and forced discounts. Cliffhanger: Fix Mode builds a contractor promise system with signed specs and delivery-slot reliability.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - urgent orders may be overriding quality discipline. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode establishes weekly planning and non-negotiable quality gates that hold during rush periods.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - differentiation is weak and price pressure is increasing. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches a 30-day premium-brick promise sprint built around consistency and service value.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - manual yards face safety and documentation risk during disputes. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs acceptance terms and safety routines that reduce costly incidents and arguments.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - training gaps in drying and stacking discipline are likely. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode introduces critical-step checklists so quality is not dependent on one expert.'
  }),

  ...missionRowsForSpecies('S2', [species2], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, often indicating Water Ratio Roulette and Mold Drift. In block production, inconsistent mix and worn molds drive strength swings and dimension failures. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode locks mix ratios, mold checks, and first-batch QC to stabilize output immediately.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - Cement Burn and Underquote behavior may be reducing margin on large orders. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds per-block costing with cement variance and delivery economics included.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - site rejection risk rises when size, edge, or curing consistency slips. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode adds site-spec confirmation and dispatch QC routines that reduce rejection risk.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - shift standards may be inconsistent. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs KPI boards and shift handovers that keep quality stable across teams.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - premium variants and bundled services are under-leveraged. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches a 30-day premium block and delivery-bundle sprint to improve price strength.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - strength liability and dust exposure are material risks. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode strengthens traceability and safety discipline to reduce disputes and incidents.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - knowledge gaps in mixing and curing are likely creating variability. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode aligns training and incentives to strength-pass and reject reduction.'
  }),

  ...missionRowsForSpecies('S3', [species3], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, commonly appearing as Batch Blindness and Breakage Tax. Precast value depends on precision and handling discipline, and small edge damage compounds quickly. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches a handling, stacking, and curing control sprint that reduces breakage fast.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - transport leakage and inventory freeze may be tying up cash. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode ranks product-line profitability and sets stock rules that free working capital.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - color, pattern, and thickness drift can trigger expensive disputes. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs sample/spec lock and batch consistency checks to reduce rejections.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - high SKU mix may be overwhelming planning discipline. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode introduces weekly production prioritization around top-margin SKUs first.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - premium pattern and finish opportunities are underused. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs a 30-day signature collection sprint to lift price and repeat demand.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - acceptance criteria and delivery proof may be too weak for dispute protection. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces acceptance documentation and dispatch evidence discipline.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - handling skill variation is likely driving breakage. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs handling certification and role ownership at yard stages.'
  }),

  ...missionRowsForSpecies('S4', [species4], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, often showing as finish variance and curing drift. Tile buyers judge visual consistency immediately, and small defects carry large rejection risk. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs finish QC, curing protection, and batch tags to reduce visible defects.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - rework and waste are likely hiding true unit economics. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds per-tile costing and rework tracking so profitability becomes visible and controllable.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - quality rumors spread quickly in tile channels. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode creates consistency proof packs and acceptance standards that protect reputation.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - QA enforcement may be inconsistent. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs daily quality boards and stop-the-line authority on defects.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - premium finishes and design variations are underdeveloped. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs a 30-day premium tile trial to lift margin and differentiation.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - dust and dispute exposure remain high without stronger controls. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces dust control and acceptance documentation routines.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - finishing skill variance is likely affecting consistency. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds finishing certification and stage handover standards.'
  }),

  ...missionRowsForSpecies('S5', [species5], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, often indicating Crack Cascade and Mold Drift. Roofing tiles fail expensively when curing and mold condition are weak. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode deploys mold maintenance, curing controls, and load-handling routines to reduce installation-time failures.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - breakage and delivery losses may be absorbing margin. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs delivery pricing and breakage-stage tracking so transport stays profitable.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - roofing channels are trust-sensitive and failure spreads quickly. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds a reliability proof pack for contractors and installers.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - reactive planning and weak QA gates are likely. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces QA gates that stop defective tiles from leaving the yard.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - premium styles and partner-install options are underused. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs a 30-day premium roofing line and partner bundle pilot.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - handling and dust safety exposure remains high. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs hazard routines and accountability checks across loading and yard operations.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - handling and curing discipline training may be inconsistent. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode certifies critical roles and links incentives to breakage reduction.'
  }),

  ...missionRowsForSpecies('S6', [species6], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, commonly Product Mix Chaos and Downtime Drain. Multi-product yards lose flow when frequent changeovers and inconsistent standards stack up. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode sets production priority around top-margin SKUs first and stabilizes flow.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - margin visibility is likely weak across product lines with different cost structures. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs per-line costing so drain products are cut and winners are scaled.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - customer clarity and consistency may be weak across categories. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds clear tiers and one unified proof pack across blocks, pavers, and tiles.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - founder bottleneck and planning drift are likely increasing with complexity. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs delegation limits, cadence planning, and KPI boards.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - product additions may be reactive instead of margin-led. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches a disciplined one-winner-per-quarter innovation rhythm.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - complexity raises dispute and safety exposure. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces traceability, acceptance criteria, and safety standards across all lines.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - multi-line handovers and role clarity likely need tightening. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode creates role-based certification across mix, cure, finish, and dispatch.'
  })
];

const generatedRows: LibraryItem[] = baseRows.flatMap((row) => {
  const idBase = row.pillar.toUpperCase();
  return [
    {
      id: `LIB_BRICKS_${idBase}_LEAK`,
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
      id: `LIB_BRICKS_${idBase}_STR`,
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
      id: `LIB_BRICKS_${idBase}_HOOK`,
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
      id: `LIB_BRICKS_${idBase}_KPI`,
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
