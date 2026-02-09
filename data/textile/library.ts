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
    leak: 'Rework Factory, Line Bottleneck Tax, and WIP Flood are creating hidden throughput loss and delayed fulfillment.',
    strength: 'Operations are controlled with in-line quality gates, WIP limits, line balancing, and preventive maintenance discipline.',
    hook: 'Line Bottleneck Tax',
    kpi: 'FPY %, Defects/100 pieces, Rework hours/day, Line efficiency %, Changeover minutes, WIP level',
    signal_tags: ['quality_built_late', 'wip_pileup', 'bottleneck_bounce'],
    cost: 'Defects are detected too late, labor is spent on rework, and bundles queue while paid capacity sits idle.',
    cliffhanger: 'Fix Mode installs defect heatmaps, WIP clamp rules, and line-balance controls to recover output with current capacity.'
  },
  {
    pillar: 'Money',
    leak: 'Costing Fog, Overtime Profit Leak, and Fabric Cash Trap are turning busy production into thin style-level margin.',
    strength: 'Money systems are style-level: true costing, overtime control, shrinkage visibility, and disciplined buying cycles.',
    hook: 'Costing Fog',
    kpi: 'Cost/garment by style, Gross margin % by style, Overtime cost %, Fabric utilization %, Shrinkage %, Cash conversion cycle',
    signal_tags: ['costing_gap', 'zombie_costs', 'shrinkage_leak'],
    cost: 'Dead stock, rush buys, overtime, and penalties consume margin that should be captured per style and order.',
    cliffhanger: 'Fix Mode builds style-cost discipline linked to waste and overtime drivers so quoted jobs stay profitable.'
  },
  {
    pillar: 'Market',
    leak: 'Buyer Dependency Risk and Spec Confusion Loss are weakening pricing power while complaints and returns drag repeat orders.',
    strength: 'Market execution is reliable: specs are locked, OTD is controlled, and repeat demand is engineered through proof and consistency.',
    hook: 'Buyer Dependency Risk',
    kpi: 'OTD %, Return/complaint %, Repeat order %, Buyer concentration %, Sample-to-order %, Margin per buyer',
    signal_tags: ['channel_dependency', 'spec_drift_discount', 'complaint_handling_gap'],
    cost: 'Disputes, chargebacks, and buyer concentration reduce leverage and force low-margin acceptance behavior.',
    cliffhanger: 'Fix Mode installs a buyer-proof system with spec lock, delivery tracking, and reliability evidence packs.'
  },
  {
    pillar: 'Leadership',
    leak: 'Supervisor Lottery and KPI Theater are keeping the floor in firefighting mode and allowing repeat failures to survive.',
    strength: 'Leadership runs with visible KPI cadence, clear line ownership, and weekly root-cause closure discipline.',
    hook: 'Supervisor Lottery',
    kpi: 'Action closure %, Daily huddle compliance %, Defect recurrence %, Line ownership %, Supervisor score',
    signal_tags: ['management_by_memory', 'no_kpi_ownership', 'no_meeting_to_action'],
    cost: 'Performance swings by shift, approvals bottleneck flow, and unresolved issues repeatedly consume time and margin.',
    cliffhanger: 'Fix Mode assigns owners and enforces closure on top recurring defects, delays, and approval blockers.'
  },
  {
    pillar: 'Innovation',
    leak: 'Style Pipeline Stall and Pattern/Marker Blindspot are leaving speed and cost-down gains unrealized.',
    strength: 'Innovation is systematic: marker efficiency, SMV reduction, digital visibility, and style-mix optimization are tracked.',
    hook: 'Pattern/Marker Blindspot',
    kpi: 'New style launch rate, SMV reduction %, Marker efficiency gain %, Cost-down savings, Digital adoption rate',
    signal_tags: ['pack_size_profit_blindspot', 'slow_bug_fix', 'no_product_testing_rhythm'],
    cost: 'Manual routines and weak experimentation lock in inefficiencies while faster competitors capture buyers.',
    cliffhanger: 'Fix Mode launches a 30-day method and marker optimization sprint tied to throughput and margin.'
  },
  {
    pillar: 'Risk',
    leak: 'Compliance Cliff, supplier quality roulette, and penalty-prone contracts expose the business to sudden margin collapse.',
    strength: 'Risk systems are audit-ready with labor compliance evidence, supplier gates, contract controls, and roll-level traceability.',
    hook: 'Compliance Cliff',
    kpi: 'Audit nonconformities #, Labor incidents #, Supplier defect %, Penalty value, Traceability pass %',
    signal_tags: ['compliance_blocker_risk', 'supplier_variance_risk', 'contract_gap'],
    cost: 'One audit fail, quality deviation, or clause miss can trigger chargebacks, rework, or contract suspension.',
    cliffhanger: 'Fix Mode builds an always-ready compliance vault and penalty prevention routine tied to contract obligations.'
  },
  {
    pillar: 'People',
    leak: 'Skill Variance Tax, absenteeism shock, and fatigue loops are causing unstable quality and recurring rework pressure.',
    strength: 'People systems are stable with skill certification, coached supervisors, handover discipline, and safe defect reporting.',
    hook: 'Skill Variance Tax',
    kpi: 'Attendance %, Training completion %, Skill certification %, Turnover %, Handover compliance %, Defect reporting %',
    signal_tags: ['training_gap', 'cross_function_breakdown', 'weak_shift_handover'],
    cost: 'Output depends on a few stars, absenteeism shocks line flow, and fatigue multiplies defect risk.',
    cliffhanger: 'Fix Mode installs training ladders, backup staffing, and handover controls that make quality repeatable across shifts.'
  }
];

const speciesA = 'CMT Factory (Cut-Make-Trim for buyers)';
const speciesB = 'Uniforms & Workwear Manufacturing';
const speciesC = 'Fashion / Retail Brand (own brand)';
const speciesD = 'Knitwear / T-shirts / Casualwear (high volume)';
const speciesE = 'Tailoring / Bespoke / Small Batch (custom)';

const missionRowsForSpecies = (
  speciesCode: string,
  lineType: string[],
  texts: Record<PillarId, string>
): LibraryItem[] => {
  const pillars: PillarId[] = ['Operations', 'Money', 'Market', 'Leadership', 'Innovation', 'Risk', 'People'];
  return pillars.map((pillar) => ({
    id: `MB_TX_${speciesCode}_${pillar.toUpperCase()}`,
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
  // Species A: CMT default for generic textile selection
  ...missionRowsForSpecies('A', ['Textile & garment manufacturing', speciesA], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, which typically signals a Line Bottleneck Tax plus WIP Flood problem: bundles pile up, operators wait for missing parts, and the line looks busy while output per hour quietly drops. In CMT, profit is speed plus consistency; slow flow becomes an invisible payroll leak. Cost: {COST_IMPACT} through idle time, delayed completion, and last-minute overtime. Cliffhanger: Fix Mode generates a 7-day line balance and WIP clamp so your current staff produces more without extra hours.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - often Costing Fog plus Overtime Profit Leak. Many CMT factories price per piece but do not protect margin per style, especially when rework and overtime spike. Cost: {COST_IMPACT} because meeting the deadline becomes the business model. Cliffhanger: Fix Mode builds a style-level costing sheet (SMV + rework + overtime) so you stop accepting orders that steal profit.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - commonly Buyer Dependency Risk plus Spec Confusion Loss. If one buyer dominates, they control your pricing and tolerance, and unclear specs turn into disputes, rework, and chargebacks. Cost: {COST_IMPACT} in penalties and weak negotiating power. Cliffhanger: Fix Mode generates a buyer-proof system: spec lock checklist + delivery promise tracking + proof packs that protect your reputation.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - meaning output may depend on who is supervising, and recurring defects repeat without closure. Cost: {COST_IMPACT} as performance swings between shifts and blame replaces improvement. Cliffhanger: Fix Mode assigns line owners, sets daily huddles, and forces weekly closure on your top 3 repeat problems.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - in CMT this often means Process Innovation Freeze and missed productivity upgrades (layout, method improvement, small digital tracking). Cost: {COST_IMPACT} because your factory is competing with faster factories. Cliffhanger: Fix Mode launches a 30-day speed upgrade sprint (SMV reduction + layout + checklists) tied directly to output/hour.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - often a Compliance Cliff risk (buyer audits, labor standards) and Contract Penalty Trap (late and defect deductions). Cost: {COST_IMPACT} plus contract loss risk if audits fail. Cliffhanger: Fix Mode creates an audit-ready compliance vault and penalty prevention plan so your contracts stop being fragile.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - commonly Skill Variance Tax and fatigue/rework loops. If quality depends on a few stars, every absence becomes production collapse. Cost: {COST_IMPACT} via defects, rework, and missed delivery. Cliffhanger: Fix Mode installs training ladders + skill certification so output becomes stable and scalable.'
  }),

  // Species B: Uniforms & Workwear
  ...missionRowsForSpecies('B', [speciesB], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, which often points to Changeover Chaos (many variations per client) plus Order Fulfillment Drag. Uniform orders die in the finishing stage: missing sizes, wrong embroidery/branding, and packing errors create rework and delays. Cost: {COST_IMPACT} through repacking, missed delivery dates, and refund or redo cycles. Cliffhanger: Fix Mode creates a 7-day order accuracy system: job cards + finishing checklist + packing verification.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - typically Margin Mirage (Style-Level) + Dead Stock Graveyard (fabric and trims left over from custom jobs). Uniform shops leak money through leftovers, incorrect costing, and rushed overtime to meet client deadlines. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs job costing + leftovers monetization rules so custom work stops creating dead stock.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - often a weak sales pipeline beyond referrals, plus low proof of reliability. Uniform clients buy reliability: delivery date, consistent sizing, consistent branding. Cost: {COST_IMPACT} in lost repeat contracts and weak pricing power. Cliffhanger: Fix Mode generates a B2B renewal system (reorder cycles, corporate account follow-ups, proof portfolio).',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - meaning production planning is reactive and staff roles blur under pressure. Cost: {COST_IMPACT} because chaos increases errors and slows throughput. Cliffhanger: Fix Mode assigns owners (cutting, sewing, branding, finishing, dispatch) and installs a weekly production plan.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - typically missed opportunities in product differentiation: better fabric options, durability standards, sizing systems, and packaging that signals professionalism. Cost: {COST_IMPACT} as you compete on price instead of value. Cliffhanger: Fix Mode launches a 30-day differentiation sprint: premium options + sizing standard + proof pack.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - in uniforms this often means contract disputes, returns due to sizing errors, and compliance gaps when serving schools/companies. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds spec sign-off, sizing verification, and contract clarity so refunds and disputes drop sharply.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - skill and quality inconsistency, plus fatigue during big contracts. Cost: {COST_IMPACT} through rework and late delivery. Cliffhanger: Fix Mode installs training SOPs and finishing discipline to keep quality consistent across teams.'
  }),

  // Species C: Fashion / Retail Brand
  ...missionRowsForSpecies('C', [speciesC], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, typically pointing to WIP Flood + Production Blindspot. Own-brand businesses often lose control because design, production, stock, and sales are not synchronized - so you overproduce slow movers and underproduce best sellers. Cost: {COST_IMPACT} through dead stock, stockouts, and wasted production time. Cliffhanger: Fix Mode builds a 7-day inventory truth system and a production plan tied to real sales.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - commonly Cash Conversion Trap (cash locked in stock) + Costing Fog (no real margin per SKU). Many fashion brands look profitable on Instagram but bleed in the warehouse. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs SKU margin tracking + stock turn targets so cash stops dying on hangers.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - often Trend Lag Death plus weak distribution beyond social media. Fashion dies when you are late or invisible. Cost: {COST_IMPACT} in missed demand waves and inconsistent sales. Cliffhanger: Fix Mode creates a 30-day marketing + product calendar so drops match demand and cash flow becomes predictable.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - meaning decisions are reactive, roles overlap, and execution depends on the founder\'s daily energy. Cost: {COST_IMPACT} through bottlenecks and inconsistent delivery. Cliffhanger: Fix Mode assigns owners and installs weekly planning so the brand runs on systems, not stress.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - in own-brand, innovation is the oxygen. If designs do not evolve, you become background noise. Cost: {COST_IMPACT} as attention and pricing power shrink. Cliffhanger: Fix Mode builds a 30-day collection pipeline and customer feedback loop to keep designs relevant and profitable.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - often IP copy risk, supplier variability, and returns/refunds exposure. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs supplier standards + QC checks + policy discipline to reduce returns and protect reputation.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - usually creative burnout + execution inconsistency. Brands collapse when the team is always tired and mistakes repeat. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs handovers, checklists, and capacity planning so output improves without burning out the team.'
  }),

  // Species D: Knitwear / Casualwear high volume
  ...missionRowsForSpecies('D', [speciesD], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, typically indicating Line Bottleneck Tax + Quality at the End Trap. In high-volume, small defect rates become massive losses. If defects are detected late, you lose thousands of pieces before anyone reacts. Cost: {COST_IMPACT} through scrap, rework, and delivery delays. Cliffhanger: Fix Mode installs in-line quality gates and a 7-day defect heatmap to stop losses fast.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - usually Margin Mirage plus overtime and waste. High volume without tight cost control is a fast path to bankruptcy. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds margin-per-style tracking and overtime control so volume starts producing real profit.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - often price pressure and buyer dependency. In commodity casualwear, your advantage must be speed, consistency, or niche positioning. Cost: {COST_IMPACT} as buyers squeeze you. Cliffhanger: Fix Mode builds proof-of-reliability (OTD, defect rates, speed) to strengthen pricing power.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - meaning daily management routines may be missing, and repeat problems are not closed. Cost: {COST_IMPACT} through recurring breakdowns, recurring defects, and recurring overtime. Cliffhanger: Fix Mode installs daily controls and weekly root-cause closure.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - typically lack of method improvement and digital tracking. In high-volume, tiny improvements compound into huge profit. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode launches SMV reduction and layout improvement sprint tied to output/hour.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - compliance, labor standards, and contract penalty exposure are high in volume manufacturing. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode builds compliance vault and penalty prevention system.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - fatigue and skill variance create silent defect floods. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs training certification + shift discipline to stabilize performance.'
  }),

  // Species E: Tailoring / Bespoke / Small Batch
  ...missionRowsForSpecies('E', [speciesE], {
    Operations: 'OPERATIONS - {STATUS}: We detected {LEAK_1} and {LEAK_2}, often signaling Order Fulfillment Drag and custom chaos. Bespoke shops bleed profit through measurement errors, rework fittings, and inconsistent job tracking. Cost: {COST_IMPACT} through repeated fittings and late delivery. Cliffhanger: Fix Mode builds a 7-day job card + measurement verification + fitting schedule system.',
    Money: 'MONEY - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - typically underpricing custom work and failing to charge for complexity. Many tailor shops sell artistry at commodity prices. Cost: {COST_IMPACT} as time disappears into unpaid detail work. Cliffhanger: Fix Mode installs pricing tiers and complexity fees so every extra detail becomes paid margin.',
    Market: 'MARKET - {STATUS}: We detected {LEAK_1} and {LEAK_2} - often weak referral systems and inconsistent customer experience. In bespoke, your growth engine is customer trust + referrals. Cost: {COST_IMPACT} in lost repeat orders. Cliffhanger: Fix Mode builds a referral ask script + client follow-up routine that turns customers into a sales channel.',
    Leadership: 'LEADERSHIP - {STATUS}: Leadership signals indicate {LEAK_1} and {LEAK_2} - meaning work allocation, deadlines, and quality control are informal. Custom shops collapse under volume because they lack systems. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode assigns owners, deadlines, and finishing checks so growth does not create chaos.',
    Innovation: 'INNOVATION & CREATIVITY - {STATUS}: We detected {LEAK_1} and {LEAK_2} - missed opportunity to standardize a core offering while keeping premium custom upgrades. Cost: {COST_IMPACT} because everything becomes from scratch, slow, and inconsistent. Cliffhanger: Fix Mode creates a standard core + premium upgrades menu that increases speed and margin.',
    Risk: 'RISK - {STATUS}: Signals show {LEAK_1} and {LEAK_2} - disputes over expectations, late delivery, and refund pressure. Cost: {COST_IMPACT}. Cliffhanger: Fix Mode installs contract terms, fitting approvals, and delivery policies that reduce refunds and conflicts.',
    People: 'PEOPLE - {STATUS}: People signals show {LEAK_1} and {LEAK_2} - reliance on one master tailor and inconsistent skill among assistants. Cost: {COST_IMPACT} via quality variance and capacity limits. Cliffhanger: Fix Mode installs training ladders and quality checks so the business scales beyond one person.'
  })
];

const generatedRows: LibraryItem[] = baseRows.flatMap((row) => {
  const idBase = row.pillar.toUpperCase();
  return [
    {
      id: `LIB_TX_${idBase}_LEAK`,
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
      id: `LIB_TX_${idBase}_STR`,
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
      id: `LIB_TX_${idBase}_HOOK`,
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
      id: `LIB_TX_${idBase}_KPI`,
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
