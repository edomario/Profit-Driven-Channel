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
  q('QS_OPS_01', 'Operations', ['waste_not_costed'], 'Scrap and rework are a normal cost of production.', 'Scrap and rework are tracked daily and reduced deliberately.', 1.2),
  q('QS_OPS_02', 'Operations', ['changeover_black_hole'], 'Changeovers often disrupt the whole day.', 'Changeovers are standardized and consistently fast.', 1.1),

  q('QS_MONEY_01', 'Money', ['pricing_margin_blindspot'], 'We judge performance mainly by sales volume.', 'We judge performance by margin per SKU and cashflow stability.', 1.2),
  q('QS_MONEY_02', 'Money', ['supplier_variance_risk'], 'Resin price changes often surprise our pricing.', 'Pricing has rules and buffers that protect us from resin volatility.', 1.1),

  q('QS_MARKET_01', 'Market', ['spec_drift_discount'], 'Customer specs are sometimes assumed or verbally agreed.', 'Customer specs are locked with sign-off (gauge/print/seal).', 1.2),
  q('QS_MARKET_02', 'Market', ['pricing_positioning_gap'], 'We compete mostly on price.', 'We compete on consistency, proof, and lead time.', 1.1),

  q('QS_LEAD_01', 'Leadership', ['panic_scheduling'], 'Production is often reactive to urgent orders.', 'Production follows a plan with schedule discipline.', 1.1),
  q('QS_LEAD_02', 'Leadership', ['cross_function_breakdown'], 'Defects usually trigger blame between departments.', 'Defects trigger root-cause fixes and standard updates.', 1.0),

  q('QS_INNOV_01', 'Innovation', ['sku_complexity_tax'], 'We keep adding SKUs whenever customers ask.', 'We manage SKU complexity and protect changeover efficiency.', 1.0),
  q('QS_INNOV_02', 'Innovation', ['no_product_testing_rhythm'], 'Sustainability is not a focus right now.', 'We track sustainability trends and adapt packaging options.', 0.9),

  q('QS_RISK_01', 'Risk', ['traceability_gap'], 'Traceability is limited when something goes wrong.', 'Batch IDs and QC records make traceability fast and reliable.', 1.2),
  q('QS_RISK_02', 'Risk', ['hygiene_drift'], 'Safety depends on personal discipline.', 'Safety is enforced with routines and audits.', 1.1),

  q('QS_PEOPLE_01', 'People', ['weak_shift_handover'], 'Quality varies by shift or operator.', 'Quality is consistent due to standards and training.', 1.0),
  q('QS_PEOPLE_02', 'People', ['training_gap'], 'Operators learn mainly through improvisation.', 'Operators follow documented settings and certification.', 1.0),

  // DEEP SCAN (10 per pillar)
  // Operations
  q('DS_OPS_01', 'Operations', ['waste_not_costed'], 'Scrap is accepted as normal.', 'Scrap is tracked and actively reduced.', 1.1),
  q('DS_OPS_02', 'Operations', ['quality_built_late'], 'Defects are mostly caught at the end.', 'In-process QC gates catch defects early.', 1.1),
  q('DS_OPS_03', 'Operations', ['changeover_black_hole'], 'Changeovers are unpredictable.', 'Changeovers follow a standard checklist.', 1.0),
  q('DS_OPS_04', 'Operations', ['no_stop_codes'], 'Downtime causes are unclear.', 'Downtime is logged with root causes.', 1.0),
  q('DS_OPS_05', 'Operations', ['supplier_variance_risk'], 'Material storage is casual.', 'Material moisture and storage are controlled.', 1.0),
  q('DS_OPS_06', 'Operations', ['measurement_blindspot'], 'Temperature settings vary by operator.', 'Settings are standardized and documented.', 1.0),
  q('DS_OPS_07', 'Operations', ['measurement_blindspot'], 'Gauge variation is common.', 'Gauge is monitored to prevent rejects.', 1.0),
  q('DS_OPS_08', 'Operations', ['reactive_maintenance'], 'Maintenance is reactive.', 'Preventive maintenance is planned and executed.', 1.0),
  q('DS_OPS_09', 'Operations', ['order_fulfillment_instability'], 'Finished goods get damaged in handling.', 'Handling and packing standards prevent damage.', 0.9),
  q('DS_OPS_10', 'Operations', ['planning_gap'], 'Production schedules are frequently ignored.', 'Schedule adherence is measured and enforced.', 1.0),

  // Money
  q('DS_MONEY_01', 'Money', ['costing_gap'], 'Unit cost is not clear per SKU.', 'Unit cost is known per SKU.', 1.2),
  q('DS_MONEY_02', 'Money', ['yield_bleed'], 'Yield is not measured precisely.', 'Yield is measured by SKU and shift.', 1.1),
  q('DS_MONEY_03', 'Money', ['energy_burn_spiral'], 'Energy cost is not tracked per kg/unit.', 'Energy cost is tracked and optimized.', 1.1),
  q('DS_MONEY_04', 'Money', ['waste_not_costed'], 'Consumables are ignored in costing.', 'Consumables are built into costing.', 1.0),
  q('DS_MONEY_05', 'Money', ['inventory_blindspot'], 'Overproduction happens often.', 'Production follows demand planning.', 1.0),
  q('DS_MONEY_06', 'Money', ['credit_terms_risk'], 'Credit terms are loose.', 'Credit terms protect cashflow.', 1.0),
  q('DS_MONEY_07', 'Money', ['discounting_leak'], 'Discounts are used to move stock.', 'Discounts are tied to strategy and terms.', 1.0),
  q('DS_MONEY_08', 'Money', ['pricing_margin_blindspot'], 'Margin is judged by total revenue.', 'Margin is judged per SKU.', 1.0),
  q('DS_MONEY_09', 'Money', ['supplier_variance_risk'], 'Resin volatility is absorbed silently.', 'Resin volatility is managed in pricing rules.', 1.0),
  q('DS_MONEY_10', 'Money', ['cashflow_visibility_gap'], 'Working capital is unmanaged.', 'Working capital is actively controlled.', 1.1),

  // Market
  q('DS_MARKET_01', 'Market', ['spec_drift_discount'], 'Specs are often assumed.', 'Specs are locked and signed off.', 1.1),
  q('DS_MARKET_02', 'Market', ['complaint_handling_gap'], 'Complaints are handled slowly.', 'Complaints are closed fast with data.', 1.0),
  q('DS_MARKET_03', 'Market', ['compliance_blocker_risk'], 'Compliance proof is weak.', 'Compliance proof is shared proactively.', 1.0),
  q('DS_MARKET_04', 'Market', ['pricing_positioning_gap'], 'We mostly compete on price.', 'We compete on consistency and trust.', 1.1),
  q('DS_MARKET_05', 'Market', ['order_fulfillment_instability'], 'Delivery dates are flexible.', 'OTIF is protected and measured.', 1.0),
  q('DS_MARKET_06', 'Market', ['weak_proof_pack'], 'Tenders are lost due to weak documentation.', 'Tender packs are professional and complete.', 1.0),
  q('DS_MARKET_07', 'Market', ['channel_dependency'], 'Customer concentration is high.', 'Customer base is diversified.', 1.1),
  q('DS_MARKET_08', 'Market', ['pricing_positioning_gap'], 'Product tiers are unclear.', 'Product tiers protect margin.', 0.9),
  q('DS_MARKET_09', 'Market', ['value_story_gap'], 'Branding looks generic.', 'Branding and finish options add value.', 0.9),
  q('DS_MARKET_10', 'Market', ['no_market_feedback_loop'], 'Market feedback is not measured systematically.', 'Feedback is tracked and used for improvements.', 0.9),

  // Leadership
  q('DS_LEAD_01', 'Leadership', ['panic_scheduling'], 'Production is firefighting.', 'Production follows disciplined planning.', 1.1),
  q('DS_LEAD_02', 'Leadership', ['cross_function_breakdown'], 'Departments blame each other.', 'Cross-functional fixes happen quickly.', 1.0),
  q('DS_LEAD_03', 'Leadership', ['no_kpi_ownership'], 'KPIs are unclear.', 'KPIs are clear and visible.', 1.0),
  q('DS_LEAD_04', 'Leadership', ['no_variance_review'], 'Root causes are ignored.', 'Root causes are closed and verified.', 1.1),
  q('DS_LEAD_05', 'Leadership', ['weak_shift_handover'], 'Shift handovers are informal.', 'Shift handovers are structured.', 0.9),
  q('DS_LEAD_06', 'Leadership', ['no_standard_work'], 'Standards vary by shift.', 'Standards are consistent.', 1.0),
  q('DS_LEAD_07', 'Leadership', ['decision_bottleneck'], 'Decisions wait for one person.', 'Decisions are delegated with limits.', 1.0),
  q('DS_LEAD_08', 'Leadership', ['no_kpi_ownership'], 'Capacity planning is weak.', 'Capacity planning controls intake.', 1.0),
  q('DS_LEAD_09', 'Leadership', ['no_meeting_to_action'], 'Meetings do not close actions.', 'Meetings close actions with owners.', 1.0),
  q('DS_LEAD_10', 'Leadership', ['no_product_testing_rhythm'], 'Improvement ideas die.', 'Improvement ideas become controlled experiments.', 0.9),

  // Innovation
  q('DS_INNOV_01', 'Innovation', ['sku_complexity_tax'], 'SKU count grows uncontrolled.', 'SKU complexity is managed intentionally.', 1.1),
  q('DS_INNOV_02', 'Innovation', ['no_product_testing_rhythm'], 'We rarely trial new materials.', 'We run controlled trials for new options.', 1.0),
  q('DS_INNOV_03', 'Innovation', ['pack_size_profit_blindspot'], 'Sustainability is ignored.', 'Sustainability is part of the roadmap.', 1.0),
  q('DS_INNOV_04', 'Innovation', ['slow_bug_fix'], 'Tooling upgrades are delayed.', 'Tooling upgrades are planned with ROI.', 1.0),
  q('DS_INNOV_05', 'Innovation', ['slow_bug_fix'], 'Process improvements are random.', 'Process improvements are systematic.', 1.0),
  q('DS_INNOV_06', 'Innovation', ['no_market_feedback_loop'], 'Product designs stay the same.', 'Designs evolve with customer needs.', 0.9),
  q('DS_INNOV_07', 'Innovation', ['changeover_black_hole'], 'Changeover reduction is not pursued.', 'Changeover reduction is a key project.', 1.0),
  q('DS_INNOV_08', 'Innovation', ['no_market_feedback_loop'], 'Customer feedback is unstructured.', 'Feedback drives innovation priorities.', 0.9),
  q('DS_INNOV_09', 'Innovation', ['value_story_gap'], 'No premium finishes or features are offered.', 'Premium features are developed to increase margin.', 0.9),
  q('DS_INNOV_10', 'Innovation', ['no_product_testing_rhythm'], 'Innovation is seen as cost.', 'Innovation is treated as strategic survival.', 1.0),

  // Risk
  q('DS_RISK_01', 'Risk', ['traceability_gap'], 'Traceability is weak.', 'Traceability is strong (batch IDs and lots).', 1.2),
  q('DS_RISK_02', 'Risk', ['hygiene_drift'], 'Food-grade controls are informal.', 'Food-grade controls are strict.', 1.1),
  q('DS_RISK_03', 'Risk', ['compliance_blocker_risk'], 'Compliance documents are scattered.', 'Compliance documents are controlled.', 1.0),
  q('DS_RISK_04', 'Risk', ['hygiene_drift'], 'Safety depends on personal discipline.', 'Safety is enforced by routine.', 1.0),
  q('DS_RISK_05', 'Risk', ['compliance_blocker_risk'], 'Environmental waste is unmanaged.', 'Waste is managed compliantly.', 1.0),
  q('DS_RISK_06', 'Risk', ['ip_brand_protection_gap'], 'Artwork/IP terms are unclear.', 'Artwork/IP terms are documented.', 0.9),
  q('DS_RISK_07', 'Risk', ['disaster_recovery_gap'], 'Recalls would be chaotic.', 'Recalls are controlled through traceability.', 1.0),
  q('DS_RISK_08', 'Risk', ['contract_gap'], 'Acceptance criteria are unclear.', 'Acceptance criteria are defined in writing.', 1.0),
  q('DS_RISK_09', 'Risk', ['no_variance_review'], 'Incident reporting is delayed.', 'Incident reporting is immediate.', 0.9),
  q('DS_RISK_10', 'Risk', ['compliance_blocker_risk'], 'Audit readiness is low.', 'Audit readiness is maintained continuously.', 1.0),

  // People
  q('DS_PEOPLE_01', 'People', ['weak_shift_handover'], 'Quality varies by shift.', 'Quality is consistent due to training and standards.', 1.1),
  q('DS_PEOPLE_02', 'People', ['training_gap'], 'Operators guess machine settings.', 'Operators follow standard settings.', 1.0),
  q('DS_PEOPLE_03', 'People', ['cross_function_breakdown'], 'Fatigue drives defects.', 'Fatigue is managed.', 1.0),
  q('DS_PEOPLE_04', 'People', ['role_clarity_gap'], 'No one clearly owns yield.', 'Yield ownership is explicit by shift and line.', 1.0),
  q('DS_PEOPLE_05', 'People', ['hero_operator_dependence'], 'Turnover disrupts output.', 'Retention is planned and supported.', 0.9),
  q('DS_PEOPLE_06', 'People', ['weak_shift_handover'], 'Handovers lose key information.', 'Handovers are disciplined.', 0.9),
  q('DS_PEOPLE_07', 'People', ['blame_culture'], 'Incentives reward speed only.', 'Incentives reward quality and safety too.', 1.0),
  q('DS_PEOPLE_08', 'People', ['training_gap'], 'Training is informal.', 'Training is structured and certified.', 1.0),
  q('DS_PEOPLE_09', 'People', ['low_psych_safety'], 'Morale issues are ignored.', 'Morale is monitored and improved.', 0.9),
  q('DS_PEOPLE_10', 'People', ['fear_index'], 'Safety culture varies by team.', 'Safety culture is consistent.', 1.0)
];
