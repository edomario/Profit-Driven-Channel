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
  q('QS_OPS_01', 'Operations', ['no_standard_work'], 'When production is busy, we rely on supervisor experience to keep things moving.', 'When production is busy, we rely on a visible batch sheet so everyone stays aligned.', 1.1),
  q('QS_OPS_02', 'Operations', ['quality_built_late'], 'We dispatch as soon as orders are ready to keep cash moving.', 'We dispatch when curing and quality timing is satisfied to protect repeat orders.', 1.2),

  q('QS_MONEY_01', 'Money', ['costing_gap'], 'Delivery pricing is negotiated per customer depending on distance and relationship.', 'Delivery pricing follows a standard rule that protects trip economics.', 1.1),
  q('QS_MONEY_02', 'Money', ['pricing_margin_blindspot'], 'We track performance mainly by units sold this week.', 'We track performance mainly by margin per product line and cash collected.', 1.2),

  q('QS_MARKET_01', 'Market', ['spec_drift_discount'], 'Customers usually describe what they want by call or chat and we deliver.', 'Customers usually confirm a simple spec sheet so site expectations are aligned.', 1.2),
  q('QS_MARKET_02', 'Market', ['channel_dependency'], 'Our best customers come through referrals and contractors we know.', 'Our best customers come through referrals plus stable channels we intentionally manage.', 1.0),

  q('QS_LEAD_01', 'Leadership', ['no_variance_review'], 'When issues appear, we handle them quickly and move to the next order.', 'When issues appear, we update the standard so the issue reduces over time.', 1.0),
  q('QS_LEAD_02', 'Leadership', ['decision_bottleneck'], 'Payments and approvals feel safer when controlled by one or two key people.', 'Payments and approvals move faster when clear limits are delegated.', 1.1),

  q('QS_INNOV_01', 'Innovation', ['no_product_testing_rhythm'], 'We add new products when customers ask frequently.', 'We add new products after a small trial proves demand and margin.', 1.0),
  q('QS_INNOV_02', 'Innovation', ['pack_size_profit_blindspot'], 'We focus on popular standard items most of the time.', 'We protect time for at least one premium line that increases pricing power.', 1.0),

  q('QS_RISK_01', 'Risk', ['traceability_gap'], 'Quality confidence comes from experience and customer trust over time.', 'Quality confidence comes from experience plus simple batch and test documentation.', 1.1),
  q('QS_RISK_02', 'Risk', ['hygiene_drift'], 'Safety is mostly handled through common sense and careful workers.', 'Safety is handled through common sense plus routine checks and PPE discipline.', 1.1),

  q('QS_PEOPLE_01', 'People', ['training_gap'], 'New workers learn fastest by working alongside experienced staff.', 'New workers learn fastest with shadowing plus a short checklist for critical steps.', 1.0),
  q('QS_PEOPLE_02', 'People', ['cross_function_breakdown'], 'Output improves most when workers push hard to meet orders.', 'Output improves most when workers push hard while quality steps stay protected.', 1.0),

  // DEEP SCAN (10 per pillar)
  // Operations
  q('DS_OPS_01', 'Operations', ['measurement_blindspot'], 'Mix decisions are adjusted based on how materials feel that day.', 'Mix decisions are adjusted using a consistent measurement routine.', 1.1),
  q('DS_OPS_02', 'Operations', ['measurement_blindspot'], 'Water is added until the mix looks right.', 'Water is added to a target ratio and recorded.', 1.1),
  q('DS_OPS_03', 'Operations', ['quality_built_late'], 'Curing time is flexible when customers need urgent delivery.', 'Curing time is protected with a minimum standard.', 1.2),
  q('DS_OPS_04', 'Operations', ['reactive_maintenance'], 'Molds are replaced only when they obviously fail.', 'Molds are inspected and maintained routinely.', 1.0),
  q('DS_OPS_05', 'Operations', ['quality_built_late'], 'Strength checks happen mainly on complaints or big orders.', 'Strength checks happen on a routine schedule.', 1.1),
  q('DS_OPS_06', 'Operations', ['waste_not_costed'], 'Breakage is accepted as part of loading and delivery.', 'Breakage is tracked by stage and reduced deliberately.', 1.0),
  q('DS_OPS_07', 'Operations', ['flow_instability'], 'Yard stacking depends on available space each day.', 'Yard stacking follows a planned layout and rotation.', 1.0),
  q('DS_OPS_08', 'Operations', ['reactive_maintenance'], 'Machines are fixed when they break.', 'Machines are maintained to reduce breakdowns.', 1.0),
  q('DS_OPS_09', 'Operations', ['quality_built_late'], 'QC happens mostly at dispatch.', 'QC includes first-batch checks to prevent mass defects.', 1.0),
  q('DS_OPS_10', 'Operations', ['planning_gap'], 'We prioritize speed only when demand is high.', 'We prioritize speed while protecting quality-critical steps.', 0.9),

  // Money
  q('DS_MONEY_01', 'Money', ['costing_gap'], 'Cement usage is monitored mainly by eye and experience.', 'Cement usage is monitored against expected batch consumption.', 1.1),
  q('DS_MONEY_02', 'Money', ['costing_gap'], 'Transport cost is assumed and adjusted when fuel rises.', 'Transport cost per trip is tracked and priced by rule.', 1.1),
  q('DS_MONEY_03', 'Money', ['discounting_leak'], 'Discounts are applied whenever customers hesitate.', 'Discounts are tied to volume, terms, and margin rules.', 1.0),
  q('DS_MONEY_04', 'Money', ['credit_terms_risk'], 'We allow flexible payment terms to keep customers.', 'We allow structured payment terms to protect cash flow.', 1.0),
  q('DS_MONEY_05', 'Money', ['pricing_margin_blindspot'], 'We measure success by output and sales volume.', 'We measure success by profit per line and cash collected.', 1.1),
  q('DS_MONEY_06', 'Money', ['waste_not_costed'], 'Material losses are treated as normal operations.', 'Material losses are tracked and investigated as variance.', 1.0),
  q('DS_MONEY_07', 'Money', ['inventory_blindspot'], 'Inventory is produced whenever the team is free.', 'Inventory is produced based on demand and stock policy.', 1.0),
  q('DS_MONEY_08', 'Money', ['purchase_panic'], 'Spare parts are bought when breakdowns happen.', 'Spare parts are planned for critical equipment.', 0.9),
  q('DS_MONEY_09', 'Money', ['pricing_margin_blindspot'], 'Pricing is based mainly on competitor rates.', 'Pricing is based on market rates plus cost and margin targets.', 1.0),
  q('DS_MONEY_10', 'Money', ['payment_delay_chokehold'], 'Collections are handled when customers are ready.', 'Collections follow a routine and escalation rule.', 1.0),

  // Market
  q('DS_MARKET_01', 'Market', ['spec_drift_discount'], 'Specs are agreed mostly through conversation and trust.', 'Specs are agreed through simple written confirmation.', 1.1),
  q('DS_MARKET_02', 'Market', ['pricing_positioning_gap'], 'Customers accept some variation as long as delivery is fast.', 'Customers accept premium pricing when consistency is visible.', 1.0),
  q('DS_MARKET_03', 'Market', ['order_fulfillment_instability'], 'Delivery dates are estimated from current workload.', 'Delivery dates are committed based on a dispatch plan.', 1.1),
  q('DS_MARKET_04', 'Market', ['complaint_handling_gap'], 'Complaints are handled case by case.', 'Complaints are logged and closed to prevent repetition.', 1.0),
  q('DS_MARKET_05', 'Market', ['channel_dependency'], 'Most sales come from relationships only.', 'Sales come from relationships plus stable channels.', 1.0),
  q('DS_MARKET_06', 'Market', ['pricing_positioning_gap'], 'We serve all customer types equally.', 'We focus on segments that improve margin and repeat business.', 1.0),
  q('DS_MARKET_07', 'Market', ['sku_complexity_tax'], 'Product variety helps capture more orders.', 'Product variety helps when it is controlled and profitable.', 0.9),
  q('DS_MARKET_08', 'Market', ['pricing_positioning_gap'], 'We win customers mainly through price.', 'We win through reliability, proof, and service.', 1.1),
  q('DS_MARKET_09', 'Market', ['weak_proof_pack'], 'Marketing is mostly word of mouth.', 'Marketing uses referrals plus simple proof assets.', 0.9),
  q('DS_MARKET_10', 'Market', ['planning_gap'], 'Seasonality is handled as it comes.', 'Seasonality is planned with stock and pricing adjustments.', 1.0),

  // Leadership
  q('DS_LEAD_01', 'Leadership', ['panic_scheduling'], 'Production plans change daily from urgent orders.', 'Production plans adapt, but the core schedule is protected.', 1.1),
  q('DS_LEAD_02', 'Leadership', ['no_standard_work'], 'Quality is enforced mainly through supervision.', 'Quality is enforced through supervision plus visible standards.', 1.0),
  q('DS_LEAD_03', 'Leadership', ['decision_bottleneck'], 'Decisions feel safer when centralized.', 'Decisions move faster when delegated with limits.', 1.0),
  q('DS_LEAD_04', 'Leadership', ['no_meeting_to_action'], 'Meetings happen when issues arise.', 'Reviews happen routinely with action owners.', 1.0),
  q('DS_LEAD_05', 'Leadership', ['hero_operator_dependence'], 'Problems are solved by the most experienced person.', 'Problems are solved by updating systems anyone can repeat.', 1.0),
  q('DS_LEAD_06', 'Leadership', ['priority_whiplash'], 'Teams focus only on today\'s orders.', 'Teams focus on today while protecting next-month stability.', 0.9),
  q('DS_LEAD_07', 'Leadership', ['no_kpi_ownership'], 'KPIs are checked when needed.', 'KPIs are checked daily and weekly with visibility.', 1.0),
  q('DS_LEAD_08', 'Leadership', ['hiring_mismatch'], 'Hiring prioritizes availability and willingness.', 'Hiring prioritizes availability plus skill tests for critical roles.', 0.9),
  q('DS_LEAD_09', 'Leadership', ['training_planning_gap'], 'Training happens informally while working.', 'Training happens informally plus critical-step checklists.', 0.9),
  q('DS_LEAD_10', 'Leadership', ['no_accountability_loop'], 'Accountability is shared without clear owners.', 'Accountability has clear owners per shift and process.', 1.0),

  // Innovation
  q('DS_INNOV_01', 'Innovation', ['no_product_testing_rhythm'], 'We introduce products when competitors do.', 'We introduce products when pilots prove demand and margin.', 1.0),
  q('DS_INNOV_02', 'Innovation', ['pack_size_profit_blindspot'], 'Premium products feel risky because demand is uncertain.', 'Premium products are tested because they protect pricing power.', 0.9),
  q('DS_INNOV_03', 'Innovation', ['slow_bug_fix'], 'Processes improve only when breakdowns force change.', 'Processes improve through routine experiments.', 0.9),
  q('DS_INNOV_04', 'Innovation', ['value_story_gap'], 'Branding is secondary to production capacity.', 'Branding supports production with trust and price strength.', 0.9),
  q('DS_INNOV_05', 'Innovation', ['slow_bug_fix'], 'Molds are upgraded only when they fail completely.', 'Molds are upgraded when ROI is clear.', 1.0),
  q('DS_INNOV_06', 'Innovation', ['sku_complexity_tax'], 'We keep many options to satisfy all customers.', 'We keep options that are profitable and controllable.', 1.0),
  q('DS_INNOV_07', 'Innovation', ['value_story_gap'], 'Delivery is only a cost we endure.', 'Delivery is a value-add service that improves repeat orders.', 0.9),
  q('DS_INNOV_08', 'Innovation', ['low_margin_skus'], 'We rarely measure true product winners.', 'We rank products by profit and scale winners.', 1.0),
  q('DS_INNOV_09', 'Innovation', ['no_variance_review'], 'Quality improvements happen mainly after complaints.', 'Quality improvements happen before complaints through QA routines.', 0.9),
  q('DS_INNOV_10', 'Innovation', ['no_product_testing_rhythm'], 'We avoid changes that might disrupt production.', 'We adopt small safe changes that compound over time.', 0.9),

  // Risk
  q('DS_RISK_01', 'Risk', ['hygiene_drift'], 'Safety is managed mainly through careful behavior.', 'Safety is managed through behavior plus routine checks.', 1.0),
  q('DS_RISK_02', 'Risk', ['hygiene_drift'], 'Dust is controlled only as needed.', 'Dust is controlled with consistent practices.', 1.0),
  q('DS_RISK_03', 'Risk', ['contract_gap'], 'Contracts are simple and relationship-based.', 'Contracts include acceptance, rejection, and defect rules.', 1.1),
  q('DS_RISK_04', 'Risk', ['traceability_gap'], 'Product claims rely on experience and reputation.', 'Product claims are supported by testing and traceability.', 1.0),
  q('DS_RISK_05', 'Risk', ['contract_gap'], 'Disputes are settled mainly by negotiation.', 'Disputes are reduced through clear documentation.', 1.0),
  q('DS_RISK_06', 'Risk', ['fear_index'], 'Incidents are handled quietly to avoid noise.', 'Incidents are logged so they reduce over time.', 0.9),
  q('DS_RISK_07', 'Risk', ['hygiene_drift'], 'Equipment hazards are handled only through supervision.', 'Equipment hazards are handled through supervision plus SOPs.', 0.9),
  q('DS_RISK_08', 'Risk', ['compliance_blocker_risk'], 'Compliance is handled when inspectors appear.', 'Compliance is managed proactively to avoid panic.', 1.0),
  q('DS_RISK_09', 'Risk', ['traceability_gap'], 'Batch details are remembered by staff.', 'Batch details are recorded for traceability.', 1.1),
  q('DS_RISK_10', 'Risk', ['compliance_blocker_risk'], 'Environmental concerns are occasional issues.', 'Environmental concerns are managed to prevent escalations.', 0.9),

  // People
  q('DS_PEOPLE_01', 'People', ['training_gap'], 'Skills are built mainly through experience.', 'Skills are built through experience plus training checklists.', 1.0),
  q('DS_PEOPLE_02', 'People', ['hero_operator_dependence'], 'The best workers carry most quality load.', 'The system carries quality instead of a few stars.', 1.0),
  q('DS_PEOPLE_03', 'People', ['cross_function_breakdown'], 'Overtime is a normal way to meet demand.', 'Overtime is used carefully to avoid quality drop.', 1.0),
  q('DS_PEOPLE_04', 'People', ['role_clarity_gap'], 'Performance is judged mostly by how hard people work.', 'Performance is judged by output plus quality consistency.', 1.0),
  q('DS_PEOPLE_05', 'People', ['weak_shift_handover'], 'Handovers happen naturally through conversation.', 'Handovers follow a quick structure each shift.', 1.0),
  q('DS_PEOPLE_06', 'People', ['low_psych_safety'], 'Motivation comes only from daily pay and stability.', 'Motivation includes pay plus recognition and growth.', 0.9),
  q('DS_PEOPLE_07', 'People', ['role_clarity_gap'], 'People handle roles flexibly without clear ownership.', 'People handle roles flexibly with clear ownership of critical steps.', 1.0),
  q('DS_PEOPLE_08', 'People', ['blame_culture'], 'Mistakes are corrected quickly and work continues.', 'Mistakes are corrected and process is improved to prevent repeats.', 1.0),
  q('DS_PEOPLE_09', 'People', ['onboarding_gap'], 'New workers start quickly with minimal onboarding.', 'New workers start quickly with a short onboarding routine.', 0.9),
  q('DS_PEOPLE_10', 'People', ['hero_operator_dependence'], 'The team relies mostly on a strong supervisor.', 'The team relies on supervision plus standards that hold without one person.', 1.0)
];
