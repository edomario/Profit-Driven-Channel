import { PillarId, QuestionDefinition, SignalTag } from '../../types';

const q = (
  qid: string,
  pillar: PillarId,
  signal_tags: SignalTag[],
  textA: string,
  textB: string,
  weight = 1.0,
  line_type: string[] = ['all']
): QuestionDefinition => ({
  qid,
  industry: 'manufacturing',
  line_type,
  pillar,
  signal_tags,
  weight,
  textA,
  textB
});

export const questions: QuestionDefinition[] = [
  // QUICK SCAN (2 per pillar)
  q('QS_OPS_01', 'Operations', ['quality_built_late'], 'When a defect appears, we fix it at the station and keep moving.', 'When a defect appears, we pause long enough to confirm cause before scaling output.', 1.1),
  q('QS_OPS_02', 'Operations', ['planning_gap'], 'When parts are missing, we improvise or swap similar parts to avoid stopping.', 'When parts are missing, we adjust kitting and plan to reduce repeated line surprises.', 1.0),

  q('QS_MONEY_01', 'Money', ['pricing_margin_blindspot'], 'We judge a good month by shipments and revenue.', 'We judge a good month by margin plus reduced rework and scrap.', 1.1),
  q('QS_MONEY_02', 'Money', ['purchase_panic'], 'Expedited shipping is sometimes the easiest way to keep customers happy.', 'Planning discipline is usually the easiest way to keep customers happy.', 1.0),

  q('QS_MARKET_01', 'Market', ['spec_drift_discount'], 'Customer requirements are often clarified as the job progresses.', 'Customer requirements are clarified early so production can execute smoothly.', 1.1),
  q('QS_MARKET_02', 'Market', ['pricing_positioning_gap'], 'We win deals by being flexible on variants and requests.', 'We win deals by being reliable on delivery and quality proof.', 1.0),

  q('QS_LEAD_01', 'Leadership', ['decision_bottleneck'], 'Key decisions feel safer when approved by a few senior people.', 'Key decisions feel smoother when teams have clear limits to act fast.', 1.0),
  q('QS_LEAD_02', 'Leadership', ['no_variance_review'], 'We prefer solving issues quickly to protect output.', 'We prefer solving issues in a way that prevents repeat issues.', 1.1),

  q('QS_INNOV_01', 'Innovation', ['sku_complexity_tax'], 'We add product variants when important customers ask.', 'We add product variants after a small pilot proves yield and demand.', 1.0),
  q('QS_INNOV_02', 'Innovation', ['slow_bug_fix'], 'Automation is attractive to reduce labor and increase speed.', 'Process stability is attractive before adding automation.', 1.0),

  q('QS_RISK_01', 'Risk', ['traceability_gap'], 'Traceability is handled through routines and team memory.', 'Traceability is handled through simple lot and station records.', 1.1),
  q('QS_RISK_02', 'Risk', ['quality_built_late'], 'Quality confidence comes from strong testing at the end.', 'Quality confidence comes from early checks plus testing.', 1.0),

  q('QS_PEOPLE_01', 'People', ['training_gap'], 'New operators learn best by shadowing experienced staff.', 'New operators learn best by shadowing plus a short station checklist.', 1.0),
  q('QS_PEOPLE_02', 'People', ['hero_operator_dependence'], 'Strong supervisors keep the line stable.', 'Strong supervisors plus standard work keep the line stable.', 1.0),

  // DEEP SCAN (10 per pillar)
  // Operations
  q('DS_OPS_01', 'Operations', ['no_standard_work'], 'Work instructions are referenced when someone is unsure.', 'Work instructions are referenced as the default way of working.', 1.0),
  q('DS_OPS_02', 'Operations', ['yield_bleed'], 'Small rework is acceptable if it keeps shipments moving.', 'Small rework is tracked because it grows into bigger losses.', 1.0),
  q('DS_OPS_03', 'Operations', ['bottleneck_bounce'], 'Line speed is set based on experience and feel.', 'Line speed is set based on bottleneck and quality stability.', 1.0),
  q('DS_OPS_04', 'Operations', ['quality_built_late'], 'Testing at the end is our main protection.', 'Early quality gates reduce waste before final testing.', 1.1),
  q('DS_OPS_05', 'Operations', ['measurement_blindspot'], 'Calibration happens when a tool acts strange.', 'Calibration happens on schedule for critical tools.', 1.0),
  q('DS_OPS_06', 'Operations', ['wip_pileup'], 'WIP builds up when demand is high.', 'WIP is limited so problems stay visible.', 1.0),
  q('DS_OPS_07', 'Operations', ['planning_gap'], 'Kitting is flexible and teams pull what they need.', 'Kitting is structured and shortages are prevented early.', 1.0),
  q('DS_OPS_08', 'Operations', ['changeover_black_hole'], 'Changeovers are handled quickly by experienced staff.', 'Changeovers follow a standard to reduce variation.', 1.0),
  q('DS_OPS_09', 'Operations', ['planning_gap'], 'We adjust builds when parts are short.', 'We adjust plans so shortages do not surprise the line.', 1.0),
  q('DS_OPS_10', 'Operations', ['traceability_gap'], 'Traceability is good enough for most cases.', 'Traceability is designed for fast root-cause and recall control.', 1.0),

  // Money
  q('DS_MONEY_01', 'Money', ['pricing_margin_blindspot'], 'Profitability is reviewed at month end.', 'Profitability is reviewed by SKU and customer routinely.', 1.1),
  q('DS_MONEY_02', 'Money', ['waste_not_costed'], 'Scrap and rework are accepted as manufacturing reality.', 'Scrap and rework are treated as controllable loss.', 1.0),
  q('DS_MONEY_03', 'Money', ['purchase_panic'], 'Expedites are part of customer service.', 'Expedites are treated as a cost signal to fix planning.', 1.0),
  q('DS_MONEY_04', 'Money', ['inventory_blindspot'], 'Inventory is purchased to ensure we never run out.', 'Inventory is purchased with MOQ strategy and turnover goals.', 1.0),
  q('DS_MONEY_05', 'Money', ['complaint_handling_gap'], 'Warranty returns are handled quietly by support and quality.', 'Warranty returns are tracked and used to prevent repeat failures.', 1.0),
  q('DS_MONEY_06', 'Money', ['yield_bleed'], 'Overtime is used when demand peaks.', 'Overtime is used when the plan proves it will pay back.', 0.9),
  q('DS_MONEY_07', 'Money', ['costing_gap'], 'Costing is estimated for quotes.', 'Costing is modeled per SKU to protect margin.', 1.1),
  q('DS_MONEY_08', 'Money', ['supplier_variance_risk'], 'Supplier price increases are absorbed when necessary.', 'Supplier price increases trigger pricing or design adjustments.', 0.9),
  q('DS_MONEY_09', 'Money', ['payment_delay_chokehold'], 'Penalties are handled case by case.', 'Penalties are reduced through reliability systems.', 0.9),
  q('DS_MONEY_10', 'Money', ['supplier_variance_risk'], 'Purchasing optimizes unit price.', 'Purchasing optimizes total cost: price, defects, and lead time.', 1.0),

  // Market
  q('DS_MARKET_01', 'Market', ['planning_gap'], 'RFQs are handled as they arrive.', 'RFQs follow a fast quoting workflow.', 1.0),
  q('DS_MARKET_02', 'Market', ['spec_drift_discount'], 'Requirements get clarified during production.', 'Requirements are locked before production.', 1.1),
  q('DS_MARKET_03', 'Market', ['cross_function_breakdown'], 'Urgent customer changes are accepted informally to keep momentum.', 'Urgent changes are accepted through an ECO process to protect stability.', 1.0),
  q('DS_MARKET_04', 'Market', ['pricing_positioning_gap'], 'We win by being flexible on customization.', 'We win by being reliable with proof and delivery.', 1.0),
  q('DS_MARKET_05', 'Market', ['complaint_handling_gap'], 'Customer complaints are handled quickly and moved on.', 'Customer complaints are handled and used for systemic improvement.', 1.0),
  q('DS_MARKET_06', 'Market', ['channel_dependency'], 'We rely on a few strong customers.', 'We diversify accounts to reduce dependency risk.', 1.0),
  q('DS_MARKET_07', 'Market', ['weak_onboarding'], 'Account management happens when customers reach out.', 'Account management follows a routine cadence.', 0.9),
  q('DS_MARKET_08', 'Market', ['weak_proof_pack'], 'Product documentation is shared as needed.', 'Product documentation is standardized and consistent.', 0.9),
  q('DS_MARKET_09', 'Market', ['pricing_margin_blindspot'], 'Competitor pricing drives our pricing heavily.', 'Unit economics and differentiation drive our pricing decisions.', 1.0),
  q('DS_MARKET_10', 'Market', ['pricing_margin_blindspot'], 'We prioritize winning the contract first.', 'We prioritize winning contracts that do not destroy margin.', 1.1),

  // Leadership
  q('DS_LEAD_01', 'Leadership', ['decision_bottleneck'], 'Decisions are reviewed by senior leaders for safety.', 'Decisions are guided by clear limits for speed.', 1.0),
  q('DS_LEAD_02', 'Leadership', ['no_kpi_ownership'], 'KPIs are checked when performance dips.', 'KPIs are checked daily or weekly with clear visibility.', 1.0),
  q('DS_LEAD_03', 'Leadership', ['no_variance_review'], 'Problems are solved by experts quickly.', 'Problems are solved by improving the process for everyone.', 1.0),
  q('DS_LEAD_04', 'Leadership', ['no_meeting_to_action'], 'Meetings happen when issues pile up.', 'Meetings happen routinely with owners and closure dates.', 1.0),
  q('DS_LEAD_05', 'Leadership', ['hiring_mismatch'], 'Hiring fills gaps quickly.', 'Hiring protects quality with basic skill tests for critical roles.', 0.9),
  q('DS_LEAD_06', 'Leadership', ['training_planning_gap'], 'Standards evolve informally based on what works today.', 'Standards evolve through controlled updates and training.', 0.9),
  q('DS_LEAD_07', 'Leadership', ['role_clarity_gap'], 'Quality is mainly a department responsibility.', 'Quality is a line-owned system with shared accountability.', 1.0),
  q('DS_LEAD_08', 'Leadership', ['cross_function_breakdown'], 'Engineering changes can happen fast to satisfy customers.', 'Engineering changes happen fast through a process to prevent chaos.', 1.0),
  q('DS_LEAD_09', 'Leadership', ['decision_bottleneck'], 'Delegation depends on trust and experience.', 'Delegation depends on clear roles and approval limits.', 0.9),
  q('DS_LEAD_10', 'Leadership', ['no_kpi_ownership'], 'We track what matters when time allows.', 'We track what matters because it saves time and loss.', 0.9),

  // Innovation
  q('DS_INNOV_01', 'Innovation', ['sku_complexity_tax'], 'Variants are introduced when customers request them.', 'Variants are introduced after yield and demand pilots.', 1.0),
  q('DS_INNOV_02', 'Innovation', ['slow_bug_fix'], 'Automation is pursued to increase throughput.', 'Automation is pursued after manual process stability is proven.', 1.0),
  q('DS_INNOV_03', 'Innovation', ['no_product_testing_rhythm'], 'DFM happens when production struggles.', 'DFM happens before production struggles.', 1.0),
  q('DS_INNOV_04', 'Innovation', ['quality_built_late'], 'Test coverage evolves mainly from field failures.', 'Test coverage is designed to prevent field failures.', 1.0),
  q('DS_INNOV_05', 'Innovation', ['no_market_feedback_loop'], 'Improvement ideas come mainly from engineering.', 'Improvement ideas come from engineering plus operators.', 0.9),
  q('DS_INNOV_06', 'Innovation', ['no_product_testing_rhythm'], 'Kaizen happens when there is slack time.', 'Kaizen happens on a routine rhythm.', 1.0),
  q('DS_INNOV_07', 'Innovation', ['no_product_testing_rhythm'], 'New products are launched with urgency.', 'New products are launched with gates and pilots.', 1.0),
  q('DS_INNOV_08', 'Innovation', ['sku_complexity_tax'], 'Complexity is tolerated to keep customers satisfied.', 'Complexity is managed to protect yield and delivery.', 1.0),
  q('DS_INNOV_09', 'Innovation', ['quality_definition_gap'], 'We prioritize launch speed.', 'We prioritize launch quality and reliability.', 0.9),
  q('DS_INNOV_10', 'Innovation', ['no_market_feedback_loop'], 'Customer feedback is handled mainly by sales.', 'Customer feedback is translated into product and process improvements.', 0.9),

  // Risk
  q('DS_RISK_01', 'Risk', ['supplier_variance_risk'], 'Supplier lots are trusted if they worked before.', 'Supplier lots are monitored with incoming inspection and scorecards.', 1.0),
  q('DS_RISK_02', 'Risk', ['ip_brand_protection_gap'], 'IP is protected mostly by relationships and trust.', 'IP is protected by controlled access and NDAs.', 1.0),
  q('DS_RISK_03', 'Risk', ['compliance_blocker_risk'], 'Compliance is handled when customers or regulators push.', 'Compliance is handled proactively for readiness.', 1.0),
  q('DS_RISK_04', 'Risk', ['traceability_gap'], 'Traceability is good enough until issues arise.', 'Traceability is designed for fast containment.', 1.0),
  q('DS_RISK_05', 'Risk', ['data_security_gap'], 'Firmware control is handled informally by engineers.', 'Firmware control uses version locks and verification.', 1.0),
  q('DS_RISK_06', 'Risk', ['hygiene_drift'], 'ESD is handled through general awareness.', 'ESD is handled through routine audits and controls.', 1.0),
  q('DS_RISK_07', 'Risk', ['fear_index'], 'Incident reporting is mostly informal.', 'Incident reporting is logged to reduce repeats.', 0.9),
  q('DS_RISK_08', 'Risk', ['contract_gap'], 'Customer returns are handled case by case.', 'Customer returns trigger structured corrective action.', 1.0),
  q('DS_RISK_09', 'Risk', ['hygiene_drift'], 'Safety is managed through careful behavior.', 'Safety is managed through behavior plus routine checks.', 0.9),
  q('DS_RISK_10', 'Risk', ['disaster_recovery_gap'], 'Recall readiness is assumed.', 'Recall readiness is practiced through traceability drills.', 1.0),

  // People
  q('DS_PEOPLE_01', 'People', ['training_gap'], 'Training is primarily on-the-job.', 'Training is on-the-job plus station certification.', 1.0),
  q('DS_PEOPLE_02', 'People', ['weak_shift_handover'], 'Shift handovers happen naturally through conversation.', 'Shift handovers follow a quick structure.', 1.0),
  q('DS_PEOPLE_03', 'People', ['role_clarity_gap'], 'Performance is judged mainly by effort and speed.', 'Performance is judged by yield, quality, and delivery.', 1.0),
  q('DS_PEOPLE_04', 'People', ['hero_operator_dependence'], 'The strongest technicians handle the hard problems.', 'The system is designed so problems do not depend on one person.', 1.0),
  q('DS_PEOPLE_05', 'People', ['role_clarity_gap'], 'QC is respected but production needs to ship.', 'QC is respected and can stop the line when needed.', 1.0),
  q('DS_PEOPLE_06', 'People', ['cross_function_breakdown'], 'Overtime is a normal tool during demand peaks.', 'Overtime is controlled to prevent defect spikes.', 0.9),
  q('DS_PEOPLE_07', 'People', ['role_clarity_gap'], 'Roles are flexible and everyone helps everywhere.', 'Roles are flexible but critical ownership remains clear.', 0.9),
  q('DS_PEOPLE_08', 'People', ['blame_culture'], 'Mistakes are corrected quickly and work continues.', 'Mistakes are corrected and the process is updated.', 1.0),
  q('DS_PEOPLE_09', 'People', ['low_psych_safety'], 'Motivation is mainly stable pay and security.', 'Motivation is stable pay plus growth and recognition.', 0.9),
  q('DS_PEOPLE_10', 'People', ['hero_operator_dependence'], 'When people leave, we adjust as needed.', 'When people leave, we trigger cross-training and retention actions.', 0.9)
];
