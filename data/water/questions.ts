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
  q('QS_OPS_01', 'Operations', ['no_standard_work'], 'When the line is busy, we rely on operator experience to keep flow smooth.', 'When the line is busy, we rely on a simple checklist to keep flow consistent.', 1.1),
  q('QS_OPS_02', 'Operations', ['quality_built_late'], 'We prefer to ship as soon as bottles or ice are ready to keep momentum.', 'We prefer to ship when quick quality gates are satisfied to protect repeat demand.', 1.1),

  q('QS_MONEY_01', 'Money', ['costing_gap'], 'Delivery and fuel costs are handled as part of doing business.', 'Delivery and fuel costs are tracked and priced into each route.', 1.1),
  q('QS_MONEY_02', 'Money', ['pricing_margin_blindspot'], 'We review costs when cash feels tight.', 'We review costs on a routine schedule to prevent surprises.', 1.0),

  q('QS_MARKET_01', 'Market', ['channel_dependency'], 'Retailers usually decide what sells best based on what they ask for.', 'We usually decide what to push based on what moves fastest and pays best.', 1.0),
  q('QS_MARKET_02', 'Market', ['order_fulfillment_instability'], 'We rely on relationships to maintain shelf space.', 'We rely on relationships plus a simple rotation routine to protect shelf health.', 1.0),

  q('QS_LEAD_01', 'Leadership', ['no_variance_review'], 'Problems are handled quickly so production can continue.', 'Problems are handled and standards are updated so they reduce over time.', 1.0),
  q('QS_LEAD_02', 'Leadership', ['decision_bottleneck'], 'Approvals feel safest when controlled by one or two key people.', 'Approvals feel smoother when decision limits are delegated.', 1.1),

  q('QS_INNOV_01', 'Innovation', ['no_product_testing_rhythm'], 'We add new bottle sizes or offers when demand asks for them often.', 'We add new offers after a small test proves demand and margin.', 1.0),
  q('QS_INNOV_02', 'Innovation', ['pack_size_profit_blindspot'], 'Our focus is producing core products consistently.', 'Our focus is producing core products plus building one premium advantage.', 1.0),

  q('QS_RISK_01', 'Risk', ['traceability_gap'], 'Quality confidence comes from experience and customer trust.', 'Quality confidence comes from experience plus records that make issues traceable.', 1.1),
  q('QS_RISK_02', 'Risk', ['hygiene_drift'], 'Hygiene is maintained through routine habits and supervision.', 'Hygiene is maintained through habits plus verified cleaning steps.', 1.1),

  q('QS_PEOPLE_01', 'People', ['training_gap'], 'New staff learn best by working alongside experienced staff.', 'New staff learn best by shadowing plus a short role checklist.', 1.0),
  q('QS_PEOPLE_02', 'People', ['hero_operator_dependence'], 'Strong workers are the backbone of quality.', 'Strong workers plus clear standards keep quality stable when teams change.', 1.0),

  // DEEP SCAN (10 per pillar)
  // Operations
  q('DS_OPS_01', 'Operations', ['quality_definition_gap'], 'Filter changes happen when output or taste signals it is needed.', 'Filter changes happen on tracked hours or volume.', 1.0),
  q('DS_OPS_02', 'Operations', ['hygiene_drift'], 'Cleaning happens when the team finds a gap.', 'Cleaning happens on planned cycles with sign-off.', 1.0),
  q('DS_OPS_03', 'Operations', ['measurement_blindspot'], 'Fill checks are done when something looks off.', 'Fill checks are done on a timed sampling routine.', 1.0),
  q('DS_OPS_04', 'Operations', ['quality_definition_gap'], 'Caps are checked mainly by feel and speed.', 'Caps are checked with periodic sampling standards.', 1.0),
  q('DS_OPS_05', 'Operations', ['label_risk'], 'Label and date coding is handled as a routine step.', 'Label and date coding includes quick verification each batch.', 1.0),
  q('DS_OPS_06', 'Operations', ['no_stop_codes'], 'Downtime is treated as part of production life.', 'Downtime is logged with causes so it reduces over time.', 1.1),
  q('DS_OPS_07', 'Operations', ['flow_instability'], 'Storage is arranged based on available space.', 'Storage is arranged by rotation and dispatch speed.', 0.9),
  q('DS_OPS_08', 'Operations', ['waste_not_costed'], 'Ice storage is managed by keep-it-cold and move-fast habits.', 'Ice storage is managed by a simple melt-loss control routine.', 1.0),
  q('DS_OPS_09', 'Operations', ['measurement_blindspot'], 'Batch differences are handled by adjusting on the fly.', 'Batch differences are handled by referencing target specs and records.', 1.0),
  q('DS_OPS_10', 'Operations', ['quality_built_late'], 'QC is strongest at the end before dispatch.', 'QC includes early gates to prevent mass waste.', 1.1),

  // Money
  q('DS_MONEY_01', 'Money', ['energy_burn_spiral'], 'Power costs are reviewed mainly when bills spike.', 'Power costs are tracked daily and linked to output.', 1.1),
  q('DS_MONEY_02', 'Money', ['energy_burn_spiral'], 'Generator and diesel use is managed as needed.', 'Generator and diesel use is tracked as cost per unit.', 1.0),
  q('DS_MONEY_03', 'Money', ['pricing_margin_blindspot'], 'Pricing follows competitor rates and market pressure.', 'Pricing uses market rates plus true unit cost and margin targets.', 1.1),
  q('DS_MONEY_04', 'Money', ['costing_gap'], 'Delivery costs are negotiated route by route.', 'Delivery costs are priced by rule using route economics.', 1.0),
  q('DS_MONEY_05', 'Money', ['credit_terms_risk'], 'Credit is offered to keep retailers loyal.', 'Credit is offered within terms that protect cashflow.', 1.0),
  q('DS_MONEY_06', 'Money', ['payment_delay_chokehold'], 'Collections happen when leverage allows.', 'Collections follow a routine with escalation rules.', 1.0),
  q('DS_MONEY_07', 'Money', ['shrinkage_leak'], 'Shrinkage is accepted as normal small loss.', 'Shrinkage is tracked as variance and reduced.', 1.0),
  q('DS_MONEY_08', 'Money', ['discounting_leak'], 'Discounts are used when movement slows.', 'Discounts are tied to volume, terms, and margin protection.', 1.0),
  q('DS_MONEY_09', 'Money', ['reactive_maintenance'], 'Maintenance spending happens when breakdowns force it.', 'Maintenance spending is planned to prevent breakdowns.', 1.0),
  q('DS_MONEY_10', 'Money', ['pricing_margin_blindspot'], 'Performance is judged by sales volume and market presence.', 'Performance is judged by margin per SKU and cash collected.', 1.1),

  // Market
  q('DS_MARKET_01', 'Market', ['spec_drift_discount'], 'Retail specs are handled through relationship understanding.', 'Retail specs are locked with a simple written confirmation.', 1.0),
  q('DS_MARKET_02', 'Market', ['value_story_gap'], 'Shelf space is maintained through relationships.', 'Shelf space is maintained through relationships plus rotation checks.', 1.0),
  q('DS_MARKET_03', 'Market', ['order_fulfillment_instability'], 'Out-of-stock is handled with quick restocking when possible.', 'Out-of-stock is handled through reorder triggers and dispatch discipline.', 1.1),
  q('DS_MARKET_04', 'Market', ['complaint_handling_gap'], 'Complaints are resolved case-by-case.', 'Complaints are logged and closed to prevent repeats.', 1.0),
  q('DS_MARKET_05', 'Market', ['channel_dependency'], 'Most growth comes from adding more shops.', 'Growth comes from adding more profitable shops and routes.', 1.0),
  q('DS_MARKET_06', 'Market', ['weak_proof_pack'], 'Marketing is mostly word-of-mouth and visibility.', 'Marketing uses referrals plus trust-proof assets.', 0.9),
  q('DS_MARKET_07', 'Market', ['pricing_positioning_gap'], 'Sales are driven mainly by price competitiveness.', 'Sales are driven by reliability, service, and trust.', 1.1),
  q('DS_MARKET_08', 'Market', ['sku_complexity_tax'], 'Product mix expands when customers ask.', 'Product mix expands when profitability and operations can support it.', 0.9),
  q('DS_MARKET_09', 'Market', ['measurement_blindspot'], 'Route performance is judged by feel and effort.', 'Route performance is judged by margin and reorder behavior.', 1.0),
  q('DS_MARKET_10', 'Market', ['planning_gap'], 'Seasonality is handled as it comes.', 'Seasonality is planned with route and stock adjustments.', 1.0),

  // Leadership
  q('DS_LEAD_01', 'Leadership', ['decision_bottleneck'], 'The owner stays close to daily operations for control.', 'The owner designs systems so daily operations run without constant presence.', 1.0),
  q('DS_LEAD_02', 'Leadership', ['decision_bottleneck'], 'Decisions feel safest when centralized.', 'Decisions feel faster when delegated with limits.', 1.0),
  q('DS_LEAD_03', 'Leadership', ['no_kpi_ownership'], 'Targets focus on output and deliveries.', 'Targets focus on output, quality, and cash collection.', 1.0),
  q('DS_LEAD_04', 'Leadership', ['no_variance_review'], 'Problems are solved by the most experienced person.', 'Problems are solved by updating standard work.', 1.0),
  q('DS_LEAD_05', 'Leadership', ['no_meeting_to_action'], 'Meetings happen when issues pile up.', 'Reviews happen routinely with action owners.', 1.0),
  q('DS_LEAD_06', 'Leadership', ['hiring_mismatch'], 'Hiring prioritizes availability and willingness.', 'Hiring prioritizes availability plus skills for critical roles.', 0.9),
  q('DS_LEAD_07', 'Leadership', ['training_planning_gap'], 'Training happens informally during work.', 'Training happens informally plus structured checklists.', 0.9),
  q('DS_LEAD_08', 'Leadership', ['role_clarity_gap'], 'QC authority depends on leadership presence.', 'QC authority is protected even under pressure.', 1.0),
  q('DS_LEAD_09', 'Leadership', ['cross_function_breakdown'], 'Sales and production coordinate as needed.', 'Sales and production coordinate through a shared schedule.', 1.0),
  q('DS_LEAD_10', 'Leadership', ['pricing_margin_blindspot'], 'Success is measured by growth and visibility.', 'Success is measured by stable margins and repeat demand.', 0.9),

  // Innovation
  q('DS_INNOV_01', 'Innovation', ['sku_complexity_tax'], 'New SKUs are introduced to match competitors.', 'New SKUs are introduced after pilots prove margin.', 1.0),
  q('DS_INNOV_02', 'Innovation', ['pack_size_profit_blindspot'], 'Packaging is chosen mainly for affordability and availability.', 'Packaging is chosen for affordability plus trust and shelf impact.', 1.0),
  q('DS_INNOV_03', 'Innovation', ['value_story_gap'], 'Delivery is treated as a necessary cost.', 'Delivery is treated as a value-add service.', 0.9),
  q('DS_INNOV_04', 'Innovation', ['no_market_feedback_loop'], 'Retail expansion is prioritized first.', 'Institutional and B2B channels are tested intentionally.', 0.9),
  q('DS_INNOV_05', 'Innovation', ['slow_bug_fix'], 'Changes are avoided to reduce production disruption.', 'Small safe improvements are adopted to compound gains.', 0.9),
  q('DS_INNOV_06', 'Innovation', ['pack_size_profit_blindspot'], 'Core product movement is the only focus.', 'Core product movement plus one premium differentiator is the focus.', 1.0),
  q('DS_INNOV_07', 'Innovation', ['no_market_feedback_loop'], 'Customer feedback is handled mainly through sales conversations.', 'Customer feedback is used to improve product and process.', 0.9),
  q('DS_INNOV_08', 'Innovation', ['value_story_gap'], 'Brand assets are minimal and practical.', 'Brand assets include trust signals and proof visuals.', 0.9),
  q('DS_INNOV_09', 'Innovation', ['sku_complexity_tax'], 'Multiple sizes are kept to capture demand widely.', 'Sizes are kept when operations can deliver them consistently.', 1.0),
  q('DS_INNOV_10', 'Innovation', ['no_product_testing_rhythm'], 'Innovation happens when spare time appears.', 'Innovation happens on planned sprints.', 1.0),

  // Risk
  q('DS_RISK_01', 'Risk', ['hygiene_drift'], 'Hygiene is enforced through supervision and experience.', 'Hygiene is enforced through supervision plus verified records.', 1.1),
  q('DS_RISK_02', 'Risk', ['compliance_blocker_risk'], 'Water testing happens when required or when concerns arise.', 'Water testing happens on schedule with documentation.', 1.1),
  q('DS_RISK_03', 'Risk', ['traceability_gap'], 'Traceability is handled through memory and routine.', 'Traceability is handled through batch and shift coding.', 1.0),
  q('DS_RISK_04', 'Risk', ['no_variance_review'], 'Issues are corrected quickly to protect the brand.', 'Issues are corrected and logged to prevent repeats.', 0.9),
  q('DS_RISK_05', 'Risk', ['compliance_blocker_risk'], 'Compliance is handled when needed.', 'Compliance is managed proactively.', 1.0),
  q('DS_RISK_06', 'Risk', ['label_risk'], 'Labels are designed mainly for marketing clarity.', 'Labels are designed for marketing clarity plus compliance checks.', 1.0),
  q('DS_RISK_07', 'Risk', ['hygiene_drift'], 'Safety is maintained by careful workers.', 'Safety is maintained by workers plus routine checks.', 0.9),
  q('DS_RISK_08', 'Risk', ['disaster_recovery_gap'], 'Recall events are considered unlikely and not emphasized.', 'Recall readiness is planned as a protection tool.', 1.0),
  q('DS_RISK_09', 'Risk', ['contract_gap'], 'Contract terms are managed through relationships.', 'Contract terms define returns, rejection, and acceptance criteria.', 0.9),
  q('DS_RISK_10', 'Risk', ['fear_index'], 'Incidents are handled quickly and quietly.', 'Incidents are handled quickly and used to strengthen controls.', 0.9),

  // People
  q('DS_PEOPLE_01', 'People', ['hero_operator_dependence'], 'Strong workers keep quality stable.', 'Strong workers plus standards keep quality stable.', 1.0),
  q('DS_PEOPLE_02', 'People', ['weak_shift_handover'], 'Shifts differ naturally in speed and approach.', 'Shifts differ, so handovers and checklists protect consistency.', 1.0),
  q('DS_PEOPLE_03', 'People', ['cross_function_breakdown'], 'Overtime is normal during high demand.', 'Overtime is controlled to protect quality.', 1.0),
  q('DS_PEOPLE_04', 'People', ['training_gap'], 'People learn best by doing on the job.', 'People learn by doing plus quick structured guidance.', 1.0),
  q('DS_PEOPLE_05', 'People', ['role_clarity_gap'], 'Accountability is shared across the team.', 'Accountability has clear owners per shift and line.', 1.0),
  q('DS_PEOPLE_06', 'People', ['blame_culture'], 'Mistakes are corrected and production continues.', 'Mistakes are corrected and process is updated.', 1.0),
  q('DS_PEOPLE_07', 'People', ['low_psych_safety'], 'Motivation comes from stable income.', 'Motivation comes from stable income plus recognition and growth.', 0.9),
  q('DS_PEOPLE_08', 'People', ['hero_operator_dependence'], 'Staff turnover is handled when it happens.', 'Staff turnover is reduced through training and role clarity.', 0.9),
  q('DS_PEOPLE_09', 'People', ['training_gap'], 'Quality checks depend on experienced staff.', 'Quality checks are teachable and consistent.', 0.9),
  q('DS_PEOPLE_10', 'People', ['hero_operator_dependence'], 'The team relies on a strong supervisor.', 'The team relies on supervision plus visible standards.', 1.0)
];
