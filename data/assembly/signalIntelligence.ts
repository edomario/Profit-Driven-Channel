import { PillarId, SignalTag } from '../../types';

export type AssemblySeverityStatus = 'Stable' | 'Watch' | 'Critical';
export type AssemblyCostType = 'Time' | 'Margin' | 'Cash' | 'Trust' | 'Risk' | 'Talent';

export interface AssemblySignalIntel {
  signal_id: SignalTag;
  pillar: PillarId;
  symptom_short: string;
  symptom_long: string;
  cost_short: string;
  cost_long: string;
  cost_type: AssemblyCostType;
  kpi_primary: string;
  kpi_secondary?: string;
  evidence_request: string;
  verification_criteria: string;
  optional_evidence?: string;
  severity_copy: Record<AssemblySeverityStatus, string>;
}

const d = (
  signal_id: SignalTag,
  pillar: PillarId,
  symptom_short: string,
  symptom_long: string,
  cost_short: string,
  cost_long: string,
  cost_type: AssemblyCostType,
  kpi_primary: string,
  kpi_secondary: string,
  evidence_request: string,
  verification_criteria: string,
  optional_evidence: string
): AssemblySignalIntel => ({
  signal_id,
  pillar,
  symptom_short,
  symptom_long,
  cost_short,
  cost_long,
  cost_type,
  kpi_primary,
  kpi_secondary,
  evidence_request,
  verification_criteria,
  optional_evidence,
  severity_copy: {
    Stable: 'Controlled, but optimization opportunity remains.',
    Watch: 'Early leak; predictability is starting to drift.',
    Critical: 'Active leak; this is now shaping margin, output, and trust.'
  }
});

export const ASSEMBLY_COST_FRAMING_STYLES = [
  'Capacity Theft',
  'Margin Erosion',
  'Cash Trap',
  'Trust Tax',
  'Risk Exposure',
  'Talent Drain'
] as const;

export const ASSEMBLY_CLIFFHANGER_STARTERS = [
  'Next, Fix Mode will',
  'To stop this leak, your 7-day sprint will',
  'Your report will show the exact steps to',
  'The next move is to lock',
  'Within 30 days, the control system we build will'
] as const;

const LIB: Partial<Record<SignalTag, AssemblySignalIntel>> = {
  quality_built_late: d(
    'quality_built_late',
    'Operations',
    'Defects are detected after value has already been added.',
    'Stations look productive, but failures surface late and force expensive recovery loops.',
    'Capacity is consumed twice as rework replaces first-pass output.',
    'This usually appears as higher rework hours, slower throughput, and rising defect escapes.',
    'Time',
    'FPY %',
    'Rework hours/day',
    'Upload first-article checks and stage-gate QC sign-off for each shift.',
    'Evidence is valid when checks are dated and tied to active SKUs.',
    'Before/after defect Pareto screenshot.'
  ),
  yield_bleed: d(
    'yield_bleed',
    'Operations',
    'Good units are leaking into scrap and retest.',
    'Daily output appears busy, but yield instability keeps delivered good units flat.',
    'Margin is diluted by material and labor used on non-saleable output.',
    'The leak compounds through scrap, rework labor, and hidden test time.',
    'Margin',
    'FPY %',
    'Scrap %',
    'Upload scrap reasons by station and weekly FPY trend.',
    'Evidence is valid when reason codes and station mapping are complete.',
    'Photo of scrap quarantine with labels.'
  ),
  bottleneck_bounce: d(
    'bottleneck_bounce',
    'Operations',
    'One station is throttling the whole line.',
    'Queues grow before one operation while downstream capacity stays idle or underused.',
    'Throughput stays capped while labor cost remains fixed.',
    'The cost shows as lower units/hour, overtime pressure, and missed daily plans.',
    'Time',
    'Throughput units/hour',
    'Downtime minutes/day',
    'Upload bottleneck station cycle-time snapshot and queue photo.',
    'Evidence is valid when bottleneck station and timing window are clear.',
    'Short video from queue build-up point.'
  ),
  wip_pileup: d(
    'wip_pileup',
    'Operations',
    'WIP is absorbing visibility and delaying defect detection.',
    'Too much in-process inventory hides flow issues until late-stage failure or schedule miss.',
    'Lead time expands and quality problems become expensive to unwind.',
    'Cash and capacity both get trapped while output predictability drops.',
    'Cash',
    'WIP level',
    'Lead time',
    'Upload WIP counts per station with FIFO lane photo.',
    'Evidence is valid when station counts and cap limits are documented.',
    'Before/after WIP map.'
  ),
  planning_gap: d(
    'planning_gap',
    'Operations',
    'Parts and priorities arrive late, forcing line improvisation.',
    'Frequent shortages or scheduling surprises cause stop-start execution throughout the shift.',
    'Expedites and idle labor become normalized operating cost.',
    'It appears as line stops, schedule misses, and higher rescue spend.',
    'Cash',
    'Line stop count',
    'OTIF %',
    'Upload shortage board and daily kit-complete checklist.',
    'Evidence is valid when missing part number, stop duration, and owner are present.',
    'Supplier lead-time variance export.'
  ),
  changeover_black_hole: d(
    'changeover_black_hole',
    'Operations',
    'Variant switches are consuming disproportionate production time.',
    'Frequent changeovers disrupt rhythm and create post-change defect spikes.',
    'Output opportunity is lost and complexity tax rises.',
    'The leak appears in lower throughput and unstable FPY after each switch.',
    'Time',
    'Changeover time',
    'FPY %',
    'Upload timed changeover log from stop to first good unit.',
    'Evidence is valid when steps and elapsed time are captured per variant.',
    'Video of current setup sequence.'
  ),
  measurement_blindspot: d(
    'measurement_blindspot',
    'Operations',
    'Tool and test drift is creating unreliable pass/fail outcomes.',
    'Calibration discipline is inconsistent, so variation gets mistaken for random failure.',
    'Retests rise and true root cause is delayed.',
    'The cost appears as test instability, escapes, and preventable debug effort.',
    'Risk',
    'Calibration compliance %',
    'Retest rate %',
    'Upload calibration schedule and critical tool status tags.',
    'Evidence is valid when due dates are visible and not expired.',
    'Last failed calibration corrective action.'
  ),
  traceability_gap: d(
    'traceability_gap',
    'Risk',
    'Failures cannot be rapidly traced to lot, station, and operator.',
    'Containment depends on memory and ad hoc checks instead of structured serial or lot history.',
    'Incident blast radius increases and recall containment slows.',
    'The cost appears as slower containment, broader rework scope, and dispute exposure.',
    'Risk',
    'Traceability completeness %',
    'Time-to-trace',
    'Upload batch or serial trace from finished unit back to lot and station.',
    'Evidence is valid when the trace path is complete and timestamped.',
    'Trace drill report with containment timing.'
  ),
  no_standard_work: d(
    'no_standard_work',
    'Operations',
    'Execution quality depends on who is on station.',
    'Instructions are optional or outdated, so operators rely on memory and local shortcuts.',
    'Variation expands and training ramp time increases.',
    'The cost appears as shift-dependent quality and recurring errors.',
    'Talent',
    'Audit pass %',
    'Shift FPY variance',
    'Upload current station SOP and operator acknowledgement list.',
    'Evidence is valid when SOP version and sign-off date are visible.',
    'Photo of visual work standard at station.'
  ),
  purchase_panic: d(
    'purchase_panic',
    'Money',
    'Rescue buying and premium freight are replacing planning.',
    'Material decisions are made under urgency instead of lead-time and cost control.',
    'Emergency pricing and logistics premiums compress gross margin.',
    'The leak appears as expedite spikes and unstable unit economics.',
    'Cash',
    'Expedite UGX/month',
    'Material cost variance',
    'Upload expedite invoice log with root-cause codes.',
    'Evidence is valid when each expedite has cause and prevention owner.',
    'Supplier SLA comparison sheet.'
  ),
  pricing_margin_blindspot: d(
    'pricing_margin_blindspot',
    'Money',
    'Shipments are growing faster than protected margin.',
    'Deals are priced to win volume while complexity, rework, and support cost are underweighted.',
    'Contribution margin is being traded for revenue optics.',
    'The cost appears as revenue growth with weak cash and declining profitability.',
    'Margin',
    'Gross margin % by SKU',
    'Contribution margin by customer',
    'Upload SKU margin bridge including scrap, rework, and expedite.',
    'Evidence is valid when margin bridge includes at least three leak categories.',
    'Quote vs actual margin comparison.'
  ),
  costing_gap: d(
    'costing_gap',
    'Money',
    'True per-SKU economics are unclear at quote and scheduling time.',
    'Labor, test, scrap, and overhead are not consistently reflected in quoting logic.',
    'Unprofitable work is accepted and capacity is misallocated.',
    'The cost appears as low-margin jobs dominating high-value resources.',
    'Margin',
    'Unit cost per SKU',
    'Quote accuracy %',
    'Upload current unit cost model with labor, materials, test, and overhead.',
    'Evidence is valid when each major cost bucket is explicit.',
    'Complexity-tier pricing table.'
  ),
  payment_delay_chokehold: d(
    'payment_delay_chokehold',
    'Money',
    'Cash conversion is lagging behind shipments.',
    'Delivery performance does not translate into timely collections, increasing working-capital strain.',
    'Cash is trapped in receivables while operations continue funding customer delay.',
    'The leak appears as tighter liquidity and emergency payment prioritization.',
    'Cash',
    'DSO',
    'Aging >30 days',
    'Upload receivables aging and collection follow-up cadence.',
    'Evidence is valid when aging buckets and follow-up dates are current.',
    'Stop-delivery escalation rule.'
  ),
  inventory_blindspot: d(
    'inventory_blindspot',
    'Money',
    'Cash is locked in parts and WIP without clear turnover control.',
    'Stock policies are reactive, causing both overstock and urgent shortages.',
    'Working capital stays trapped and obsolescence risk rises with ECO churn.',
    'The cost appears as low turns, dead stock growth, and planning instability.',
    'Cash',
    'Inventory turns',
    'Dead stock value',
    'Upload inventory aging report with top slow-moving items.',
    'Evidence is valid when aging bands and value by item are shown.',
    'Dead stock reduction plan.'
  ),
  waste_not_costed: d(
    'waste_not_costed',
    'Money',
    'Scrap and rework are tracked operationally but not fully monetized.',
    'Losses are accepted as process noise rather than explicit cost drivers.',
    'Profitability is overstated and decisions underreact to leak severity.',
    'The cost appears as repeated waste with no financial closure pressure.',
    'Margin',
    'Scrap cost/month',
    'Rework cost/month',
    'Upload scrap and rework valuation summary for latest month.',
    'Evidence is valid when quantity and unit cost are both captured.',
    'Before/after leak valuation trend.'
  ),
  supplier_variance_risk: d(
    'supplier_variance_risk',
    'Risk',
    'Incoming lot variation is destabilizing process yield.',
    'Supplier quality inconsistency creates hidden rework and unreliable line performance.',
    'You pay supplier quality cost through scrap, retest, and delay.',
    'The cost appears as incoming defects, unstable FPY, and OTIF pressure.',
    'Risk',
    'Incoming defect ppm',
    'Supplier corrective-action closure time',
    'Upload incoming inspection summary and supplier corrective-action log.',
    'Evidence is valid when lot-level defects and supplier owner/date are visible.',
    'Top supplier scorecard.'
  ),
  spec_drift_discount: d(
    'spec_drift_discount',
    'Market',
    'Requirements are changing in-flight and forcing costly corrections.',
    'Sales, engineering, and production are not locking CTQs early enough.',
    'Unplanned changes create rework and pricing concessions.',
    'The cost appears as disputes, delay, and margin giveback.',
    'Trust',
    'Spec dispute count',
    'ECO cycle time',
    'Upload requirement-lock checklist and latest signed acceptance criteria.',
    'Evidence is valid when revision and approval timestamp are explicit.',
    'Customer change-request log.'
  ),
  pricing_positioning_gap: d(
    'pricing_positioning_gap',
    'Market',
    'Commercial wins rely on flexibility more than reliability proof.',
    'Differentiation is weak, so negotiations converge to price pressure.',
    'Margin and account quality degrade as price concessions increase.',
    'The cost appears as low-value mix and unstable forecast confidence.',
    'Margin',
    'Price realization',
    'Win rate %',
    'Upload proof-pack draft (quality, delivery, trace evidence) used in quoting.',
    'Evidence is valid when proof-pack is attached to live quote flow.',
    'Win/loss reason notes.'
  ),
  complaint_handling_gap: d(
    'complaint_handling_gap',
    'Market',
    'Escalations close slowly and the same issues recur.',
    'Customer issues are handled tactically without a strong prevention loop into operations.',
    'Support load expands and trust decays faster than recovery efforts.',
    'The cost appears as repeat complaints, warranty burden, and engineering diversion.',
    'Trust',
    'Complaint closure time',
    'Repeat complaint %',
    'Upload complaint register with root-cause and closure owner.',
    'Evidence is valid when repeat-theme tracking is visible.',
    'FRACAS linkage to complaint themes.'
  ),
  channel_dependency: d(
    'channel_dependency',
    'Market',
    'A few accounts hold disproportionate pricing power.',
    'Revenue concentration amplifies negotiation pressure and forecast volatility.',
    'Any account shock directly impacts operating cash and capacity utilization.',
    'The cost appears as tighter terms and lower strategic flexibility.',
    'Cash',
    'Revenue concentration top-1/top-5',
    'Margin by customer',
    'Upload customer concentration chart with margin overlay.',
    'Evidence is valid when concentration and margin are shown together.',
    'Diversification pipeline tracker.'
  ),
  weak_onboarding: d(
    'weak_onboarding',
    'Market',
    'Account handoff quality is inconsistent after PO win.',
    'Customer expectation and execution alignment degrades during onboarding and first deliveries.',
    'Early-stage friction increases complaint and churn risk.',
    'The cost appears as slower ramp and repeat clarifications.',
    'Trust',
    'Onboarding completion %',
    'Early complaint rate',
    'Upload onboarding checklist and first-delivery communication template.',
    'Evidence is valid when checklist is customer-specific and signed.',
    'First 30-day account review notes.'
  ),
  weak_proof_pack: d(
    'weak_proof_pack',
    'Market',
    'Commercial story lacks quality and reliability evidence.',
    'Without proof artifacts, technical confidence is replaced by price skepticism.',
    'Deal velocity and price integrity weaken.',
    'The cost appears as slower conversions and heavier discounting.',
    'Trust',
    'RFQ win rate',
    'Price realization',
    'Upload current test certificate and trace-summary template used in quotes.',
    'Evidence is valid when live quotes include the proof attachment.',
    'Three customer-ready case snippets.'
  ),
  decision_bottleneck: d(
    'decision_bottleneck',
    'Leadership',
    'Execution waits for a small approval core.',
    'Critical decisions queue behind limited approvers, slowing containment and schedule recovery.',
    'Response speed drops and issue dwell time increases.',
    'The cost appears as delayed closures, OTIF misses, and avoidable urgency.',
    'Time',
    'Decision latency',
    'Action closure rate %',
    'Upload approval matrix and list of delayed decisions from last 2 weeks.',
    'Evidence is valid when delegated limits are explicit.',
    'Before/after latency trend.'
  ),
  no_kpi_ownership: d(
    'no_kpi_ownership',
    'Leadership',
    'Daily execution lacks clear numerical ownership.',
    'KPIs exist but have no accountable owner, so response timing is inconsistent.',
    'Weak visibility allows losses to compound before action.',
    'The cost appears as repeated surprises in quality, downtime, and delivery.',
    'Time',
    'KPI update compliance %',
    'Action closure rate %',
    'Upload daily KPI board with named owners.',
    'Evidence is valid when owner and cadence are visible for each KPI.',
    'Weekly KPI review notes.'
  ),
  no_variance_review: d(
    'no_variance_review',
    'Leadership',
    'Variances are patched but not converted into prevention.',
    'Operational exceptions recur because closure discipline is weak.',
    'Payroll and capacity are consumed by repeated failures.',
    'The cost appears as recurring defects and unstable week-to-week performance.',
    'Time',
    'Repeat defect recurrence %',
    'CAPA closure time',
    'Upload top variance log with root-cause closure status.',
    'Evidence is valid when recurrence tracking and owner/date exist.',
    '5-Whys summary for top 3 issues.'
  ),
  no_meeting_to_action: d(
    'no_meeting_to_action',
    'Leadership',
    'Meetings produce discussion without verified closure.',
    'Action ownership and deadlines are not enforced consistently after review.',
    'Execution drifts while issues resurface.',
    'The cost appears as delayed implementation and repeat escalations.',
    'Time',
    'Action closure rate %',
    'Lead time',
    'Upload meeting action tracker with owner and due date fields.',
    'Evidence is valid when closed actions link to proof.',
    'Rolling overdue-action report.'
  ),
  cross_function_breakdown: d(
    'cross_function_breakdown',
    'Leadership',
    'Engineering, quality, and production are resolving issues in silos.',
    'Handoffs are weak, so defects and change impacts travel without alignment.',
    'Cycle time increases while responsibility clarity decreases.',
    'The cost appears as slower fixes, late ECO containment, and blame loops.',
    'Talent',
    'Cross-functional issue closure time',
    'ECO defect rate',
    'Upload daily cross-functional standup notes with blockers and owners.',
    'Evidence is valid when blocker owner and closure date are present.',
    'Shared KPI dashboard screenshot.'
  ),
  training_planning_gap: d(
    'training_planning_gap',
    'Leadership',
    'Capability development is reactive to failures.',
    'Training is not planned against recurring error patterns and line criticality.',
    'Skill gaps persist and onboarding drag stays high.',
    'The cost appears as repeat mistakes and slow ramp on critical stations.',
    'Talent',
    'Training completion %',
    'Ramp time',
    'Upload monthly training plan linked to top defects.',
    'Evidence is valid when planned sessions map to station risk.',
    'Certification matrix progress chart.'
  ),
  hiring_mismatch: d(
    'hiring_mismatch',
    'Leadership',
    'Urgency hiring is increasing variance on critical work.',
    'Role-fit checks are limited, so early errors and supervision load rise.',
    'Output stability degrades as line complexity grows.',
    'The cost appears as rework, retraining, and supervisor overload.',
    'Talent',
    '90-day retention %',
    'New-hire defect rate',
    'Upload hiring scorecard and station skill-test template.',
    'Evidence is valid when hiring criteria include station-critical skills.',
    'New-hire ramp performance summary.'
  ),
  role_clarity_gap: d(
    'role_clarity_gap',
    'People',
    'Ownership of quality, downtime, and delivery outcomes is blurred.',
    'Teams help broadly, but critical accountability boundaries are unclear.',
    'Issues linger because ownership is distributed without closure authority.',
    'The cost appears as slower action and recurring preventable defects.',
    'Talent',
    'Owner assignment completeness %',
    'Closure rate %',
    'Upload role scorecards for FPY, downtime, and escapes.',
    'Evidence is valid when each KPI has named accountable owner.',
    'RACI snapshot for one active SKU.'
  ),
  fear_index: d(
    'fear_index',
    'People',
    'Incidents are underreported until impact is high.',
    'Teams avoid early escalation when consequences are unclear or punitive.',
    'Hidden defects survive longer and containment gets more expensive.',
    'The cost appears as surprise escapes and late-stage firefighting.',
    'Risk',
    'Incident reporting rate',
    'Escape count',
    'Upload incident log with near-miss entries and closure actions.',
    'Evidence is valid when logs include preventive actions, not only events.',
    'Anonymous reporting channel screenshot.'
  ),
  blame_culture: d(
    'blame_culture',
    'People',
    'Teams optimize for self-protection over early truth.',
    'Defect data quality drops when issue reporting triggers blame instead of system fixes.',
    'Learning loop weakens and recurrence increases.',
    'The cost appears as repeated defects and slower root-cause closure.',
    'Talent',
    'Repeat defect %',
    'Incident closure time',
    'Upload no-blame reporting policy and recent retros log.',
    'Evidence is valid when retros include system actions and owners.',
    'Trend of self-reported issues by shift.'
  ),
  low_psych_safety: d(
    'low_psych_safety',
    'People',
    'Critical issues are raised late or indirectly.',
    'Operators hesitate to flag weak builds early, allowing defects to travel downstream.',
    'Containment cost increases as signal latency grows.',
    'The cost appears as late catches, escapes, and morale drag.',
    'Talent',
    'Near-miss reporting #',
    'Escapes per month',
    'Upload shift handover notes with defect and risk flags.',
    'Evidence is valid when risk items include action owner and timestamp.',
    'Team pulse check summary.'
  ),
  training_gap: d(
    'training_gap',
    'People',
    'Critical station controls are not consistently learned.',
    'Operators adapt by experience, creating uneven quality across shifts and products.',
    'Skill inconsistency drives defect recurrence and supervision load.',
    'The cost appears as higher rework, longer ramp-up, and shift volatility.',
    'Talent',
    'Certification coverage %',
    'Shift FPY variance',
    'Upload station training records and certification matrix.',
    'Evidence is valid when critical stations have current certified owners.',
    'Before/after skill gap tracker.'
  ),
  weak_shift_handover: d(
    'weak_shift_handover',
    'People',
    'Shift transitions are leaking defect context.',
    'Operational context is transferred verbally and inconsistently, so known risks recur.',
    'Quality and pace diverge by shift with avoidable repeats.',
    'The cost appears as restart losses and recurring defects after handover.',
    'Time',
    'Shift variance gap',
    'Repeat defect %',
    'Upload shift handover checklist with latest two completed examples.',
    'Evidence is valid when defect, material, and machine status are captured.',
    'Handover compliance trend.'
  ),
  hero_operator_dependence: d(
    'hero_operator_dependence',
    'People',
    'Line stability depends on a few specialists.',
    'Output and quality drop disproportionately when key operators are unavailable.',
    'Scalability is constrained by concentration risk in critical skills.',
    'The cost appears as unstable coverage and delayed recovery under absence.',
    'Talent',
    'Critical role coverage %',
    'Absence impact on FPY',
    'Upload critical-role coverage matrix and backup assignment list.',
    'Evidence is valid when at least two trained backups exist per critical station.',
    'Cross-training completion tracker.'
  ),
  sku_complexity_tax: d(
    'sku_complexity_tax',
    'Innovation',
    'Variant load is growing faster than operational control.',
    'Each added variant amplifies changeover pressure, documentation overhead, and error probability.',
    'Complexity tax reduces effective capacity and predictable margin.',
    'The cost appears as longer changeovers, more mix-ups, and higher WIP drag.',
    'Margin',
    'Changeover time',
    'Margin by variant tier',
    'Upload active SKU list with complexity tags and margin ranking.',
    'Evidence is valid when low-margin high-complexity SKUs are identified.',
    'Variant rationalization decision log.'
  ),
  no_product_testing_rhythm: d(
    'no_product_testing_rhythm',
    'Innovation',
    'NPI and product changes lack a repeatable pilot rhythm.',
    'New releases are pushed under urgency without stable test gates and learning capture.',
    'Launch defects and rework rise, delaying reliable scale.',
    'The cost appears as ramp instability and recurring launch fire drills.',
    'Risk',
    'NPI defect rate',
    'NPI milestone hit %',
    'Upload NPI gate checklist and latest pilot report.',
    'Evidence is valid when pilot output includes pass/fail criteria and sign-offs.',
    'Post-launch defect trend.'
  ),
  slow_bug_fix: d(
    'slow_bug_fix',
    'Innovation',
    'Improvement cadence is slower than defect recurrence.',
    'Known issues remain open long enough to reappear in production or field outcomes.',
    'Engineering effort stays in reactive mode instead of prevention.',
    'The cost appears as persistent defect loops and delayed release confidence.',
    'Time',
    'Bug closure SLA',
    'Repeat defect %',
    'Upload defect backlog with aging and owner fields.',
    'Evidence is valid when closure SLA and priority bands are defined.',
    'Weekly closure burn-down chart.'
  ),
  no_market_feedback_loop: d(
    'no_market_feedback_loop',
    'Innovation',
    'Customer feedback is not shaping design and process quickly.',
    'Commercial and support signals remain disconnected from engineering prioritization.',
    'Market-fit improvements lag while service burden grows.',
    'The cost appears as recurring complaints and weaker price leverage.',
    'Trust',
    'Feedback-to-change cycle time',
    'Repeat complaint %',
    'Upload customer issue themes linked to roadmap actions.',
    'Evidence is valid when each theme has planned owner and ETA.',
    'QBR summary with closed actions.'
  ),
  quality_definition_gap: d(
    'quality_definition_gap',
    'Innovation',
    'Quality expectations are not translated into robust test criteria.',
    'Teams share intent but differ on measurable pass/fail thresholds under variation.',
    'Ambiguity drives false passes, retests, and preventable escapes.',
    'The cost appears as inconsistent acceptance behavior and customer dispute risk.',
    'Risk',
    'Escape rate',
    'Retest rate',
    'Upload CTQ definition and acceptance test criteria by SKU family.',
    'Evidence is valid when CTQs map to test steps and limits.',
    'Updated test coverage matrix.'
  ),
  hygiene_drift: d(
    'hygiene_drift',
    'Risk',
    'ESD and discipline controls are uneven across shifts.',
    'Routine protective behaviors degrade under pressure, increasing intermittent or latent failures.',
    'Failure diagnosis cost rises and reliability confidence drops.',
    'The cost appears as mystery defects and avoidable field returns.',
    'Risk',
    'ESD audit pass %',
    'Intermittent failure rate',
    'Upload latest ESD and workstation discipline audit with findings.',
    'Evidence is valid when nonconformance actions have owner and due date.',
    'Before/after audit score trend.'
  ),
  contract_gap: d(
    'contract_gap',
    'Risk',
    'Acceptance boundaries and liability terms are underspecified.',
    'Returns, rework scope, and defect accountability become negotiation topics after shipment.',
    'Financial exposure increases through disputes and unpaid correction work.',
    'The cost appears as chargebacks, legal friction, and delayed collections.',
    'Risk',
    'Dispute rate',
    'Chargeback value',
    'Upload standard contract terms covering acceptance and returns.',
    'Evidence is valid when terms are present in active customer templates.',
    'Recent signed acceptance criteria.'
  ),
  compliance_blocker_risk: d(
    'compliance_blocker_risk',
    'Risk',
    'Compliance readiness is reactive instead of operational.',
    'Audit requirements are assembled under deadline pressure rather than maintained continuously.',
    'Certification and customer approvals become bottlenecks.',
    'The cost appears as delayed opportunities and escalation risk.',
    'Risk',
    'Audit findings #',
    'Closure time',
    'Upload compliance checklist with current status and owner.',
    'Evidence is valid when open gaps have dated closure actions.',
    'Internal audit calendar.'
  ),
  data_security_gap: d(
    'data_security_gap',
    'Risk',
    'Firmware and data access controls are too permissive.',
    'Version integrity and access governance are not consistently enforced across stations.',
    'Security incidents and wrong-version risk increase.',
    'The cost appears as field instability, compliance exposure, and trust loss.',
    'Risk',
    'Firmware compliance %',
    'Access incident #',
    'Upload firmware governance SOP and role-based access matrix.',
    'Evidence is valid when version lock and approval path are documented.',
    'Signed firmware release log.'
  ),
  ip_brand_protection_gap: d(
    'ip_brand_protection_gap',
    'Risk',
    'Customer design assets are insufficiently protected.',
    'Sensitive drawings and files are shared without strict access control and auditability.',
    'IP leakage risk undermines enterprise trust and legal posture.',
    'The cost appears as contract risk and reduced access to high-value programs.',
    'Risk',
    'Unauthorized access incidents',
    'NDA compliance %',
    'Upload NDA process and design-file access policy.',
    'Evidence is valid when file access is role-bound and logged.',
    'Periodic access review record.'
  ),
  disaster_recovery_gap: d(
    'disaster_recovery_gap',
    'Risk',
    'Containment and recovery are not drill-tested.',
    'Teams can describe response actions, but no recent simulation validates speed and completeness.',
    'Incident downtime risk is higher than assumed.',
    'The cost appears as longer outages and uncontrolled failure spread.',
    'Risk',
    'Time-to-contain',
    'Recovery time objective',
    'Upload latest containment or recall drill summary.',
    'Evidence is valid when timeline, roles, and gaps are documented.',
    'Updated continuity playbook.'
  )
};

const FALLBACK: AssemblySignalIntel = {
  signal_id: 'quality_built_late',
  pillar: 'Operations',
  symptom_short: 'Execution variance is visible but not yet tightly controlled.',
  symptom_long: 'The team is compensating in real time, but repeated friction points are still consuming capacity.',
  cost_short: 'Hidden recovery work is reducing effective output and margin.',
  cost_long: 'This usually shows up as overtime, retests, delayed closures, and avoidable escalations.',
  cost_type: 'Time',
  kpi_primary: 'FPY %',
  kpi_secondary: 'Downtime minutes/day',
  evidence_request: 'Upload one dated proof of process control improvement for this signal.',
  verification_criteria: 'Evidence is valid when it is dated, relevant, and linked to a measurable KPI.',
  optional_evidence: 'Before/after KPI screenshot.',
  severity_copy: {
    Stable: 'Controlled with optimization upside.',
    Watch: 'Early leak forming; stabilization needed.',
    Critical: 'Active leak; containment required now.'
  }
};

export const ASSEMBLY_SIGNAL_INTELLIGENCE: Partial<Record<SignalTag, AssemblySignalIntel>> = LIB;

export const getAssemblySignalIntel = (tag: SignalTag): AssemblySignalIntel =>
  ASSEMBLY_SIGNAL_INTELLIGENCE[tag] || { ...FALLBACK, signal_id: tag };

export const humanizeSignalTag = (tag: SignalTag): string =>
  tag.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export const buildAssemblySymptom = (tags: SignalTag[]): string => {
  const parts = tags.slice(0, 2).map((tag) => getAssemblySignalIntel(tag).symptom_short);
  if (parts.length === 0) return FALLBACK.symptom_short;
  if (parts.length === 1) return parts[0];
  return `${parts[0]} and ${parts[1]}`;
};

export const buildAssemblyCostNarrative = (
  tags: SignalTag[],
  framing: string,
  status: AssemblySeverityStatus
): string => {
  const primary = getAssemblySignalIntel(tags[0] || 'quality_built_late');
  const secondary = getAssemblySignalIntel(tags[1] || tags[0] || 'quality_built_late');
  const severity = primary.severity_copy[status];
  return `${framing}: ${primary.cost_short} ${secondary.cost_short} ${severity}`;
};

export const buildAssemblyEvidencePrompt = (tags: SignalTag[]): string => {
  const intel = getAssemblySignalIntel(tags[0] || 'quality_built_late');
  return `${intel.evidence_request} Verify: ${intel.verification_criteria}`;
};
