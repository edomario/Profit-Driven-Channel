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
    leak: 'Scrap Storm, Downtime Drain, and Changeover Tax are reducing usable output while hidden defects trigger re-runs.',
    strength: 'Operations are controlled with standard settings, in-process QC, moisture discipline, and schedule adherence.',
    hook: 'Scrap Storm',
    kpi: 'OEE %, Scrap/reject %, Changeover minutes, Downtime hours/week, First-pass quality %, Schedule adherence %',
    signal_tags: ['waste_not_costed', 'downtime_drain', 'changeover_black_hole'],
    cost: 'Unstable settings, weak QC gates, and unmanaged setup losses convert paid machine time into reject volume.',
    cliffhanger: 'Fix Mode installs defect baselines, changeover standards, and first-pass controls to recover capacity quickly.'
  },
  {
    pillar: 'Money',
    leak: 'Yield Blindness, Resin Price Shock exposure, and Energy Leak are compressing margin despite strong throughput activity.',
    strength: 'Money systems are SKU-level with true costing, yield visibility, energy tracking, and disciplined working-capital control.',
    hook: 'Yield Blindness',
    kpi: 'Unit cost/SKU, Yield %, Energy cost per kg, Gross margin/SKU, Inventory days, DSO',
    signal_tags: ['costing_gap', 'yield_bleed', 'energy_burn_spiral'],
    cost: 'Margin is being diluted by unpriced volatility, hidden consumables, and slow cash conversion cycles.',
    cliffhanger: 'Fix Mode builds a unit-cost and pricing buffer engine so resin and energy volatility do not erase margin.'
  },
  {
    pillar: 'Market',
    leak: 'Spec Drift Disputes and Commodity Trap behavior are weakening trust and forcing price-led negotiations.',
    strength: 'Market delivery is proof-driven: specs are signed, OTIF is stable, and compliance evidence supports premium positioning.',
    hook: 'Spec Drift Disputes',
    kpi: 'OTIF %, Complaint rate/closure time, Tender win %, Repeat order %, Price realization, Customer concentration %',
    signal_tags: ['spec_drift_discount', 'pricing_positioning_gap', 'weak_proof_pack'],
    cost: 'Unclear specs and weak documentation trigger returns, disputes, and buyer confidence erosion.',
    cliffhanger: 'Fix Mode installs spec-lock and proof-pack routines that increase repeat orders and reduce discount pressure.'
  },
  {
    pillar: 'Leadership',
    leak: 'Firefighting Factory and Silo Wars are blocking root-cause closure and creating recurring quality and schedule failures.',
    strength: 'Leadership runs with clear KPIs, structured handovers, delegated decisions, and weekly closure on recurring losses.',
    hook: 'Firefighting Factory',
    kpi: 'Action closure %, Schedule adherence %, Root-cause closure %, Handover compliance %, KPI update timeliness %',
    signal_tags: ['panic_scheduling', 'cross_function_breakdown', 'no_variance_review'],
    cost: 'Reactive approvals and unclear ownership allow the same defects and delays to repeat across shifts.',
    cliffhanger: 'Fix Mode installs ownership cadence and root-cause closure so production behavior becomes predictable.'
  },
  {
    pillar: 'Innovation',
    leak: 'SKU Explosion Chaos and Tooling Upgrade Gaps are increasing setup drag while value-add opportunities are missed.',
    strength: 'Innovation is intentional: SKU rationalization, tooling ROI upgrades, sustainability trials, and premium features are planned.',
    hook: 'SKU Explosion Chaos',
    kpi: 'New product trials/quarter, % revenue from improved SKUs, Active SKU count, Changeover reduction %, Tooling ROI',
    signal_tags: ['sku_complexity_tax', 'slow_bug_fix', 'no_product_testing_rhythm'],
    cost: 'Unmanaged SKU growth and delayed upgrades trap the plant in low-margin work with high operational friction.',
    cliffhanger: 'Fix Mode launches a 30-day SKU and tooling optimization sprint tied to margin and throughput gains.'
  },
  {
    pillar: 'Risk',
    leak: 'Food-Grade Liability, Recall Nightmare exposure, and safety inconsistencies are creating severe downside risk.',
    strength: 'Risk controls are audit-ready with traceability, contamination prevention, compliance packs, and documented acceptance terms.',
    hook: 'Recall Nightmare',
    kpi: 'Safety incidents #, Traceability completeness %, Audit findings #, Contamination events #, Recall/return %',
    signal_tags: ['traceability_gap', 'hygiene_drift', 'compliance_blocker_risk'],
    cost: 'One contaminated batch or documentation failure can trigger recalls, penalties, and long-term account loss.',
    cliffhanger: 'Fix Mode hardens traceability, safety, and compliance evidence so incidents are contained before they scale.'
  },
  {
    pillar: 'People',
    leak: 'Shift Variance Tax and Training Void are causing inconsistent settings, unstable yield, and bad-batch recurrence.',
    strength: 'People systems stabilize outcomes with operator certification, handover discipline, and incentives tied to quality and safety.',
    hook: 'Shift Variance Tax',
    kpi: 'Operator certification %, Training hours/month, Turnover %, Absenteeism %, Shift variance (scrap/OEE), Safety training %',
    signal_tags: ['training_gap', 'weak_shift_handover', 'role_clarity_gap'],
    cost: 'When settings depend on operator memory, defects and downtime surge whenever shifts or staffing patterns change.',
    cliffhanger: 'Fix Mode installs standards, certification, and shift ownership so quality is consistent every shift.'
  }
];

const species1 = 'Film & Bag Manufacturing (poly bags, shrink film, liners)';
const species2 = 'Rigid Packaging (bottles, jerrycans, containers)';
const species3 = 'Injection Molding (caps, parts, household items)';
const species4 = 'Printing & Lamination (labels, flexible packs, pouches)';
const species5 = 'Recycled Plastics (regrind, washing, pelletizing)';
const species6 = 'Industrial Packaging (drums, crates, bulk packaging accessories)';

const missionRowsForSpecies = (
  speciesCode: string,
  lineType: string[],
  texts: Record<PillarId, string>
): LibraryItem[] => {
  const pillars: PillarId[] = ['Operations', 'Money', 'Market', 'Leadership', 'Innovation', 'Risk', 'People'];
  return pillars.map((pillar) => ({
    id: `MB_PLASTICS_${speciesCode}_${pillar.toUpperCase()}`,
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
  // Species 1 default for generic plastics selection
  ...missionRowsForSpecies('S1', ['Plastics & packaging manufacturing', species1], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, which often signals Inconsistent Gauge Leak and Changeover Tax. Film lines make money through stable settings and long runs; when gauge drifts or setups interrupt flow, output falls while scrap spikes. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs gauge controls, fast setup routines, and first-run QC gates that reduce waste quickly.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - typically Yield Blindness plus Resin Price Shock exposure. Without true yield and consumption visibility, margins are guesswork. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds per-kg unit costing and pricing buffers so resin volatility stops eroding margin.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - often Spec Drift Disputes around thickness, strength, seal, and print quality. Cost: {COST_IMPACT} through returns and weakened repeat confidence. Cliffhanger: Fix Mode deploys a signed spec-lock routine that prevents avoidable disputes.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - production may be reactive and standards may vary by shift. Cost: {COST_IMPACT} as hidden scrap and schedule misses compound. Cliffhanger: Fix Mode installs shift handovers, daily KPI visibility, and closure discipline.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - a sign of commodity pressure and weak product evolution. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches a 30-day film upgrade sprint (performance + sustainability options) to improve pricing power.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - weak traceability can turn one bad batch into a return cascade. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens batch IDs and QC evidence so issues are isolated fast.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - likely operator setting variation and uneven training. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode sets standard settings, certification, and quality-linked incentives across shifts.'
  }),

  ...missionRowsForSpecies('S2', [species2], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, commonly indicating Overheat Warp and Quality Bounce-Back. In rigid packaging, unstable settings create leaks, thickness issues, and weak neck finishes that become costly returns. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs in-process leak/thickness tests and stable setting windows per SKU.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - often Energy Leak plus Working Capital Choke. Cost: {COST_IMPACT} through high power burn and excess finished stock. Cliffhanger: Fix Mode adds energy-per-kg tracking and demand-led production rules that free cash and protect margin.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - usually Compliance Confidence Gap for food or chemical buyers. Cost: {COST_IMPACT} in contract loss and pricing pressure. Cliffhanger: Fix Mode builds a compliance proof pack that strengthens buyer trust immediately.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - planning discipline may be weak and decisions too centralized. Cost: {COST_IMPACT} through avoidable downtime and late delivery. Cliffhanger: Fix Mode enforces schedule adherence and delegated decision limits.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - missed premium differentiation in closures, ergonomics, and recyclable materials. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs a product-tier sprint to shift mix toward premium margins.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - contamination and traceability risk remain high in rigid containers. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs cleanliness and traceability controls that reduce contract-ending incidents.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - shift variance is likely driving quality swings. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode certifies operators and standardizes settings so quality is shift-proof.'
  }),

  ...missionRowsForSpecies('S3', [species3], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, often signaling Mold/Die Bottleneck and Maintenance Neglect Spiral. Worn or poorly maintained tooling causes flash, short shots, and unstable cycle time. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds mold care cadence and first-article approvals to reduce scrap and downtime.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - typically Yield Blindness and Bad Batch Tax from weak mix discipline. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs material mix control and SKU-level costing to stabilize margins.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - buyers are questioning consistency (fit, tolerance, repeatability). Cost: {COST_IMPACT} through replacement risk and lost repeat contracts. Cliffhanger: Fix Mode creates quality proof routines and rapid defect-closure loops.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - mold scheduling and machine ownership may be unclear. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode assigns machine ownership and scheduling rules that minimize avoidable changeover loss.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - product line evolution is lagging while market competition intensifies. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches a 30-day higher-margin SKU sprint with test-and-validate discipline.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - tooling/IP and acceptance responsibility may be under-documented. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode strengthens contract clauses for tooling ownership and defect accountability.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - operator improvisation is likely driving unstable quality. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces machine-setting SOPs and operator certification tied to defect and uptime metrics.'
  }),

  ...missionRowsForSpecies('S4', [species4], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, commonly indicating late defect capture in color, registration, adhesion, or seal integrity. Cost: {COST_IMPACT} when misprints are discovered after long runs. Cliffhanger: Fix Mode installs first-run approvals and in-process QC checkpoints to stop expensive reprints.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - often hidden consumables bleed and waste-heavy reprint cycles. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode tracks inks, solvents, sleeves, and blades by job so pricing matches real delivery cost.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - weak artwork sign-off and proof discipline are triggering disputes. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode establishes signed proof workflows that cut conflict and improve trust.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - sales specs and production execution may be misaligned. Cost: {COST_IMPACT} via avoidable rework and delays. Cliffhanger: Fix Mode introduces job-ticket handoffs that translate specs into execution clarity.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - premium finishes and advanced pack formats are under-leveraged. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs a premium-packaging sprint to improve margin per job.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - food-contact and solvent-safety controls may be inconsistent. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens compliance checks and solvent handling SOPs to reduce major incident exposure.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - setup skill variation is likely causing costly misprints. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode certifies setup roles and enforces checklist-based start-up quality.'
  }),

  ...missionRowsForSpecies('S5', [species5], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, often indicating unstable feedstock quality and inconsistent processing controls. Cost: {COST_IMPACT} via pellet variability and rejection risk. Cliffhanger: Fix Mode implements feedstock grading and contamination controls to stabilize output quality.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - yield uncertainty and high energy intensity are eroding value capture. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs yield and energy-per-kg controls to protect pricing and margin.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - buyers are discounting due to inconsistent pellet specifications. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode creates batch certificates and spec sheets that strengthen buyer confidence.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - variable inputs are driving reactive planning and weak KPI ownership. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode assigns ownership for contamination, yield, and uptime with weekly closure cadence.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - quality upgrades and blend innovation are being underused. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches a 30-day quality upgrade sprint to move into higher-value recycled markets.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - environmental compliance exposure is high in waste, wastewater, and emissions handling. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode implements compliance checklists and documentation to reduce shutdown risk.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - sorting discipline and training consistency are weak points. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode ties training and incentives to contamination reduction and stable pellet quality.'
  }),

  ...missionRowsForSpecies('S6', [species6], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, often indicating handling damage and inconsistent strength control. Industrial packs fail expensively when load performance is not managed tightly. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs load-testing and handling standards to reduce transit failures.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - margin is under pressure from energy intensity, material loss, and loose payment terms. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces unit-cost and cash-protection rules so bulk orders stay profitable.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - industrial buyers require reliability proof and compliance confidence. Cost: {COST_IMPACT} in lost contracts when documentation is weak. Cliffhanger: Fix Mode builds tender-grade proof systems that improve win rates and pricing leverage.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - stage ownership and schedule discipline may be weak across shifts. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode assigns stage owners and enforces schedule adherence to stabilize delivery.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - value-add opportunities in closures, tamper features, and recycled-content tiers are underused. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches a 30-day product-tier sprint to increase price strength.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - liability from spill or transit failure is material and can escalate quickly. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens testing and acceptance documentation to reduce legal and contract exposure.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - operator discipline and quality sign-offs are inconsistent. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs training and stage sign-off controls so reliability is repeatable.'
  })
];

const generatedRows: LibraryItem[] = baseRows.flatMap((row) => {
  const idBase = row.pillar.toUpperCase();
  return [
    {
      id: `LIB_PLASTICS_${idBase}_LEAK`,
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
      id: `LIB_PLASTICS_${idBase}_STR`,
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
      id: `LIB_PLASTICS_${idBase}_HOOK`,
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
      id: `LIB_PLASTICS_${idBase}_KPI`,
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
