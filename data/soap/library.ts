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
    leak: 'Batch Drift, Formula Roulette, and Fill-Weight Leak are creating unstable quality and hidden unit loss.',
    strength: 'Operations are controlled with locked batch sheets, in-process QC, sanitation discipline, and stable filling controls.',
    hook: 'Batch Drift',
    kpi: 'Batch pass %, Fill-weight variance, Defect rate by SKU, Changeover minutes, Downtime hours, Packaging leak %',
    signal_tags: ['no_standard_work', 'quality_built_late', 'measurement_blindspot'],
    cost: 'Inconsistent mixing and late defect discovery cause re-runs, rejects, and avoidable overfill or underfill loss.',
    cliffhanger: 'Fix Mode installs batch-sheet lock, first-run QC gates, and fill-weight control routines that stabilize output.'
  },
  {
    pillar: 'Money',
    leak: 'COGS Mirage, Yield Blindness, and Ingredient Price Shock exposure are compressing margin despite volume growth.',
    strength: 'Money control is SKU-level with true COGS, yield tracking, disciplined discounts, and protected cash conversion.',
    hook: 'COGS Mirage',
    kpi: 'COGS/SKU, Yield %, Shrinkage %, Gross margin/SKU, Inventory days, DSO',
    signal_tags: ['costing_gap', 'yield_bleed', 'supplier_variance_risk'],
    cost: 'Untracked yield and volatility in ingredients, packaging, and credit terms turn healthy sales into weak cash outcomes.',
    cliffhanger: 'Fix Mode builds true unit costing and pricing guardrails so promo and volatility no longer erase margin.'
  },
  {
    pillar: 'Market',
    leak: 'Trust Collapse and Scent/Performance Drift are weakening repeat purchases and increasing review and return pressure.',
    strength: 'Market performance is consistent: specs are controlled, complaints close quickly, and packaging reinforces brand trust.',
    hook: 'Trust Collapse',
    kpi: 'Repeat purchase %, Complaints per 1,000 + closure time, OTIF %, Price realization, Channel mix, Concentration %',
    signal_tags: ['low_repeat_orders', 'complaint_handling_gap', 'value_story_gap'],
    cost: 'One inconsistent batch can trigger review spirals, retailer rejection, and forced discounting across channels.',
    cliffhanger: 'Fix Mode deploys claim-safe positioning and complaint-to-correction loops that rebuild repeat demand.'
  },
  {
    pillar: 'Leadership',
    leak: 'Firefighting Factory behavior and No Standard Syndrome keep production reactive and defect recurrence high.',
    strength: 'Leadership is systemized with clear ownership, shift handovers, visible KPIs, and weekly root-cause closure.',
    hook: 'Firefighting Factory',
    kpi: 'Schedule adherence %, Root-cause closure %, Action closure %, KPI update compliance %, Delegation coverage %',
    signal_tags: ['panic_scheduling', 'no_kpi_ownership', 'no_variance_review'],
    cost: 'Weak planning and delayed decisions create stockouts, overstock, and repeat quality failures that consume management time.',
    cliffhanger: 'Fix Mode installs planning cadence and ownership loops so recurring problems are closed instead of recycled.'
  },
  {
    pillar: 'Innovation',
    leak: 'Copycat Syndrome and SKU Explosion Chaos are increasing complexity while differentiation and premium margin fade.',
    strength: 'Innovation is intentional: SKU mix is curated, product trials are controlled, and packaging upgrades support premium tiers.',
    hook: 'SKU Explosion Chaos',
    kpi: 'New product trials/quarter, % revenue from improved SKUs, SKU rationalization score, Premium tier share %',
    signal_tags: ['sku_complexity_tax', 'no_product_testing_rhythm', 'pack_size_profit_blindspot'],
    cost: 'Unfocused launches and excessive variants raise setup loss and dilute margin without building lasting market advantage.',
    cliffhanger: 'Fix Mode launches a 30-day differentiation sprint focused on fewer stronger SKUs and premium packaging value.'
  },
  {
    pillar: 'Risk',
    leak: 'Regulatory Cliff and Batch Traceability Blackout leave the business exposed to claims, recalls, and legal penalties.',
    strength: 'Risk controls are audit-ready with traceability, compliant labels/claims, hygiene standards, and SDS coverage.',
    hook: 'Regulatory Cliff',
    kpi: 'Traceability completeness %, Audit findings #, Safety incidents #, Safety complaint response time, SDS coverage %',
    signal_tags: ['compliance_blocker_risk', 'traceability_gap', 'label_risk'],
    cost: 'Weak compliance and traceability create high downside risk where one complaint can escalate into costly brand and legal damage.',
    cliffhanger: 'Fix Mode hardens compliance gates, traceability records, and incident response routines before a recall event occurs.'
  },
  {
    pillar: 'People',
    leak: 'Training Void and Shift Variance Tax are causing formula inconsistency, fatigue defects, and weak accountability.',
    strength: 'People systems stabilize quality through certification, shift discipline, clear batch ownership, and safe issue reporting.',
    hook: 'Shift Variance Tax',
    kpi: 'Training hours/worker, Certification %, Shift variance (yield/defects), Turnover %, Absenteeism %, Safety completion %',
    signal_tags: ['training_gap', 'weak_shift_handover', 'role_clarity_gap'],
    cost: 'When operators improvise and handovers are weak, yield and quality swing by shift and defect loops persist.',
    cliffhanger: 'Fix Mode installs operator certification, role ownership, and shift handover standards to make quality consistent.'
  }
];

const species1 = 'Laundry Detergent & Multipurpose Cleaners (powder/liquid)';
const species2 = 'Bar Soap & Bath Soap (beauty/medicated)';
const species3 = 'Personal Care & Cosmetics (lotions, creams, oils, hair products)';
const species4 = 'Institutional / Bulk Supply (hotels, hospitals, schools)';
const species5 = 'Natural/Organic & Sensitive-Skin Brands';
const species6 = 'Distributors / Private Label Manufacturing';

const missionRowsForSpecies = (
  speciesCode: string,
  lineType: string[],
  texts: Record<PillarId, string>
): LibraryItem[] => {
  const pillars: PillarId[] = ['Operations', 'Money', 'Market', 'Leadership', 'Innovation', 'Risk', 'People'];
  return pillars.map((pillar) => ({
    id: `MB_SOAP_${speciesCode}_${pillar.toUpperCase()}`,
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
  ...missionRowsForSpecies('S1', ['Soap / detergents / cosmetics production', species1], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, often showing Batch Drift plus Fill-Weight Leak. When concentration, pH, viscosity, or fill controls drift, product quality becomes unpredictable and complaints rise. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs batch-sheet lock, first-run QC gates, and fill-weight controls that stabilize quality and margin.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - typically Ingredient Price Shock exposure plus COGS Mirage. If true unit cost and volatility buffers are missing, higher sales can still mean weaker profit. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds true unit-cost and margin-protection pricing rules tied to ingredient volatility.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - usually Commodity Trap and Trust Collapse behavior. In detergents, inconsistent performance and scent quickly destroy repeat demand. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode establishes clear value positioning and proof-backed consistency that protects repeat sales.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - production may be reactive and standards may shift by operator. Cost: {COST_IMPACT} through recurring defects and planning chaos. Cliffhanger: Fix Mode installs handover rhythm, KPI visibility, and closure discipline to prevent repeat failures.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - copycat products and weak differentiation are limiting margin power. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches a 30-day premium and refill-pack sprint to improve value perception and pricing strength.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - claim and chemical safety exposure can trigger regulatory and reputation shocks. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces label compliance, SDS coverage, and safety SOPs across production and handling.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - training gaps in critical controls are likely driving unstable batch outcomes. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode sets operator certification and quality-linked incentives to reduce variability by shift.'
  }),

  ...missionRowsForSpecies('S2', [species2], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, often pointing to Formula Roulette and Changeover Contamination. Bar and bath soaps need stable curing, fragrance retention, and finish quality to avoid rejects. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode deploys controlled batch sheets, cleaning standards, and first-run checks to reduce rejects quickly.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - ingredient volatility and shrinkage are reducing unit economics. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode introduces yield visibility and true per-bar costing so pricing reflects real delivery cost.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - brand positioning is weak and price pressure is high. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds a clear product story and packaging upgrade path that supports premium pricing.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - standard work and quality discipline may be inconsistent. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs daily quality boards and root-cause closure cadence.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - missed variants and tier strategy are limiting growth. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs a 30-day tier design sprint across standard, premium, and specialty bars.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - medicated claims and compliance exposure may be under-controlled. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces claim-approval and label-compliance workflows.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - skill inconsistency is likely causing quality variation. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs training checklists and certified process ownership.'
  }),

  ...missionRowsForSpecies('S3', [species3], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, commonly showing Sanitation Slip and Batch Drift. Cosmetics brands are trust-sensitive, and stability issues can quickly become return and review crises. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode hardens hygiene controls, in-process checks, and changeover discipline.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - dead stock and weak SKU economics are likely trapping cash. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode creates SKU profitability ranking and expiry control routines to stop inventory decay.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - review sensitivity and scent/performance inconsistency are undermining trust. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs complaint-response workflows and batch-linked proof assets that rebuild confidence.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - launch governance and documentation discipline may be weak. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode introduces approval gates and controlled trial protocols before full-scale launch.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - premium feel and trend alignment are under-leveraged. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs a 30-day premiumization sprint around one hero product and stronger shelf design.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - skin-reaction and compliance risk need stronger controls. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces ingredient disclosure controls and traceability for complaint events.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - hygiene and critical control training may be inconsistent. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode certifies staff on sanitation and batch-critical checkpoints.'
  }),

  ...missionRowsForSpecies('S4', [species4], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, often indicating fill inconsistency and packaging integrity risk. Institutional buyers require reliable output and leak-free delivery. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs integrity checks and dispatch QC to protect contract reliability.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - contract pricing and long payment terms may be creating cash stress. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces contract pricing rules, billing cadence, and collections discipline.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - institutional growth is being limited by weak tender and compliance proof. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds a bid-grade proof pack that improves close rates and retention.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - delivery systems may be reactive under contract pressure. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode establishes delivery calendars and ownership rules to stabilize service levels.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - refill and dispenser system opportunities may be underused. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches a 30-day institutional system-pack sprint to improve contract stickiness.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - compliance and safety requirements in institutional channels are high stakes. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs acceptance, SDS, and compliance-control routines to reduce contract exposure.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - pressure periods may trigger QC shortcuts. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode protects QC accountability even under tight delivery windows.'
  }),

  ...missionRowsForSpecies('S5', [species5], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, commonly indicating Batch Drift and hygiene inconsistency. Sensitive-skin products fail fast when process control is weak. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs stability and sanitation controls so natural claims stay reliable.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - expensive ingredients and small-batch inefficiency are pressuring margin. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode sets minimum viable batch economics and true unit costing to protect profitability.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - negative reactions and reviews can escalate quickly in this segment. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode deploys trust-safe messaging and rapid complaint response routines.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - creative energy may be outrunning process discipline. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs product governance and QC gate discipline before scale.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - premium packaging and repeat-buy systems are underdeveloped. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches a 30-day premium trust sprint across packaging, bundles, and hero SKUs.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - sensitive-skin claims need strict evidence and disclosure controls. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces compliant claims and ingredient transparency checkpoints.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - hygiene and critical-control training gaps may be exposing quality risk. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode introduces certification and explicit quality ownership per batch.'
  }),

  ...missionRowsForSpecies('S6', [species6], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, often indicating Label Chaos and Changeover Contamination in multi-client runs. Private label work demands exact execution across formula, artwork, and packaging specs. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode implements job-ticket lock and controlled changeovers to eliminate avoidable mix-ups.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - private-label margin is likely eroding from underpricing and small-run complexity. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode creates tiered private-label pricing and MOQs tied to true profitability.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - concentration risk and weak differentiation are limiting negotiating power. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds a diversification and reliability-positioning plan to attract stronger buyers.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - multi-client scheduling may be chaotic without capacity governance. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs capacity planning and weekly closure routines to stabilize delivery.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - operational innovation in fast changeovers and premium options is underused. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode runs a 30-day reliability + premium-options sprint to raise margin per run.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - claim responsibility, compliance, and contract ambiguity can trigger major disputes. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode enforces compliance gates and acceptance clauses across private-label contracts.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - high-SKU complexity requires stronger training and role accountability. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode standardizes training and ownership so accuracy survives pressure.'
  })
];

const generatedRows: LibraryItem[] = baseRows.flatMap((row) => {
  const idBase = row.pillar.toUpperCase();
  return [
    {
      id: `LIB_SOAP_${idBase}_LEAK`,
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
      id: `LIB_SOAP_${idBase}_STR`,
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
      id: `LIB_SOAP_${idBase}_HOOK`,
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
      id: `LIB_SOAP_${idBase}_KPI`,
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
