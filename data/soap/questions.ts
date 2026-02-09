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
  q('QS_OPS_01', 'Operations', ['no_standard_work'], 'The same recipe sometimes gives different results.', 'Batch results are consistent because controls are tight.', 1.2),
  q('QS_OPS_02', 'Operations', ['quality_built_late'], 'Quality issues are usually found after production.', 'Quality is checked early with first-run gates to prevent waste.', 1.1),

  q('QS_MONEY_01', 'Money', ['costing_gap'], 'We set prices mainly from competitors and intuition.', 'We set prices using true SKU cost and margin rules.', 1.2),
  q('QS_MONEY_02', 'Money', ['discounting_leak'], 'Discounts are used often to move stock.', 'Discounts are controlled and tied to volume and terms.', 1.0),

  q('QS_MARKET_01', 'Market', ['low_repeat_orders'], 'Customers sometimes complain about scent or performance changes.', 'Customers experience consistent scent and performance.', 1.1),
  q('QS_MARKET_02', 'Market', ['value_story_gap'], 'Our packaging is functional but not a strong shelf seller.', 'Packaging builds trust and improves conversion.', 1.0),

  q('QS_LEAD_01', 'Leadership', ['panic_scheduling'], 'Production often reacts to urgent orders and surprises.', 'Production follows a realistic plan that the factory respects.', 1.1),
  q('QS_LEAD_02', 'Leadership', ['no_variance_review'], 'Problems repeat because we move on quickly.', 'Problems are closed to root cause so they stop repeating.', 1.0),

  q('QS_INNOV_01', 'Innovation', ['no_product_testing_rhythm'], 'We mostly copy what sells in the market.', 'We differentiate with clear positioning and product tiers.', 1.0),
  q('QS_INNOV_02', 'Innovation', ['sku_complexity_tax'], 'We keep adding SKUs to please everyone.', 'We manage SKUs to protect consistency and margin.', 1.0),

  q('QS_RISK_01', 'Risk', ['traceability_gap'], 'Traceability is limited when a complaint happens.', 'Every unit can be traced to batch and raw lots.', 1.2),
  q('QS_RISK_02', 'Risk', ['label_risk'], 'Labels and claims are designed mainly for marketing impact.', 'Labels and claims are controlled to avoid compliance trouble.', 1.1),

  q('QS_PEOPLE_01', 'People', ['weak_shift_handover'], 'Quality varies depending on who is on shift.', 'Quality is consistent because SOPs and training are strong.', 1.0),
  q('QS_PEOPLE_02', 'People', ['training_gap'], 'Staff learn mainly by doing and adapting.', 'Staff learn through structured training and certification.', 1.0),

  // DEEP SCAN (10 per pillar)
  // Operations
  q('DS_OPS_01', 'Operations', ['no_standard_work'], 'Batch outcomes vary more than we would like.', 'Batch outcomes are consistent because controls are stable.', 1.1),
  q('DS_OPS_02', 'Operations', ['no_standard_work'], 'Mixing steps are experience-based.', 'Mixing steps are documented and followed.', 1.0),
  q('DS_OPS_03', 'Operations', ['measurement_blindspot'], 'pH and viscosity checks are occasional.', 'pH and viscosity checks are routine and recorded.', 1.0),
  q('DS_OPS_04', 'Operations', ['measurement_blindspot'], 'Fragrance strength varies across batches.', 'Fragrance loading is controlled and consistent.', 1.0),
  q('DS_OPS_05', 'Operations', ['measurement_blindspot'], 'Fill weights drift during runs.', 'Fill weights are monitored and corrected quickly.', 1.1),
  q('DS_OPS_06', 'Operations', ['hygiene_drift'], 'Changeover cleaning is rushed.', 'Changeover cleaning is standardized to prevent carryover.', 1.0),
  q('DS_OPS_07', 'Operations', ['inventory_blindspot'], 'Raw material stockouts happen mid-run.', 'Raw materials are staged before starting.', 1.0),
  q('DS_OPS_08', 'Operations', ['quality_built_late'], 'QC happens mostly after production.', 'QC gates prevent full-run waste.', 1.1),
  q('DS_OPS_09', 'Operations', ['order_fulfillment_instability'], 'Packaging failures show up in transit.', 'Packaging integrity is tested before dispatch.', 1.0),
  q('DS_OPS_10', 'Operations', ['reactive_maintenance'], 'Downtime is accepted as normal.', 'Downtime is logged, analyzed, and reduced.', 1.0),

  // Money
  q('DS_MONEY_01', 'Money', ['costing_gap'], 'True cost per SKU is not clear.', 'True cost per SKU is known and reviewed.', 1.2),
  q('DS_MONEY_02', 'Money', ['yield_bleed'], 'Yield per batch is not measured precisely.', 'Yield is tracked and improved by SKU and batch.', 1.1),
  q('DS_MONEY_03', 'Money', ['shrinkage_leak'], 'Shrinkage and spill losses are not measured.', 'Shrinkage is tracked and reduced.', 1.0),
  q('DS_MONEY_04', 'Money', ['supplier_variance_risk'], 'Ingredient price changes hit margin suddenly.', 'Pricing rules protect margin from volatility.', 1.0),
  q('DS_MONEY_05', 'Money', ['discounting_leak'], 'Discounts are used to move stock.', 'Discounts are strategic and controlled.', 1.0),
  q('DS_MONEY_06', 'Money', ['sku_complexity_tax'], 'Small inefficient runs are common.', 'Production planning reduces small-batch inefficiency.', 0.9),
  q('DS_MONEY_07', 'Money', ['inventory_blindspot'], 'Expiry write-offs happen often.', 'Inventory rotation prevents expiry losses.', 1.0),
  q('DS_MONEY_08', 'Money', ['pricing_margin_blindspot'], 'Returns and refunds are treated as normal.', 'Returns and refunds trigger corrective cost action.', 1.0),
  q('DS_MONEY_09', 'Money', ['credit_terms_risk'], 'Credit terms are loose and unmanaged.', 'Credit terms protect cashflow and collections.', 1.0),
  q('DS_MONEY_10', 'Money', ['pricing_margin_blindspot'], 'Profit is judged by sales volume.', 'Profit is judged by margin per SKU.', 1.1),

  // Market
  q('DS_MARKET_01', 'Market', ['spec_drift_discount'], 'Specs and expectations can be informal.', 'Specs and claims are locked and controlled.', 1.1),
  q('DS_MARKET_02', 'Market', ['value_story_gap'], 'Brand consistency varies by batch.', 'Brand consistency is protected across batches.', 1.0),
  q('DS_MARKET_03', 'Market', ['complaint_handling_gap'], 'Complaints are handled slowly.', 'Complaints are closed fast with root cause.', 1.0),
  q('DS_MARKET_04', 'Market', ['value_story_gap'], 'Packaging is mostly functional.', 'Packaging is a trust and conversion asset.', 1.0),
  q('DS_MARKET_05', 'Market', ['pricing_positioning_gap'], 'We compete mainly on price.', 'We compete on value and differentiation.', 1.1),
  q('DS_MARKET_06', 'Market', ['channel_dependency'], 'Distribution is narrow and fragile.', 'Distribution is diversified and planned.', 1.0),
  q('DS_MARKET_07', 'Market', ['no_market_feedback_loop'], 'Reviews are not monitored consistently.', 'Reviews and feedback are tracked and used.', 0.9),
  q('DS_MARKET_08', 'Market', ['pricing_positioning_gap'], 'Product tiers are unclear.', 'Product tiers protect margin and positioning.', 1.0),
  q('DS_MARKET_09', 'Market', ['channel_dependency'], 'Customer concentration is high.', 'Customer base is diversified.', 1.0),
  q('DS_MARKET_10', 'Market', ['ip_brand_protection_gap'], 'Counterfeit risk is ignored.', 'Counterfeit protection is active.', 0.9),

  // Leadership
  q('DS_LEAD_01', 'Leadership', ['panic_scheduling'], 'The factory runs on urgent surprises.', 'The factory runs on disciplined planning.', 1.1),
  q('DS_LEAD_02', 'Leadership', ['no_standard_work'], 'Standards vary by person and shift.', 'Standards are consistent across shifts.', 1.0),
  q('DS_LEAD_03', 'Leadership', ['cross_function_breakdown'], 'Departments blame each other.', 'Cross-functional problem solving happens.', 1.0),
  q('DS_LEAD_04', 'Leadership', ['no_meeting_to_action'], 'Meetings do not close actions.', 'Meetings close actions with owners and deadlines.', 1.0),
  q('DS_LEAD_05', 'Leadership', ['decision_bottleneck'], 'Founder approves everything.', 'Decisions are delegated with limits.', 1.0),
  q('DS_LEAD_06', 'Leadership', ['no_kpi_ownership'], 'KPIs are unclear or hidden.', 'KPIs are visible daily.', 1.0),
  q('DS_LEAD_07', 'Leadership', ['no_variance_review'], 'Root causes are rarely closed.', 'Root causes are closed systematically.', 1.0),
  q('DS_LEAD_08', 'Leadership', ['hiring_mismatch'], 'Training is informal.', 'Training is structured and tracked.', 0.9),
  q('DS_LEAD_09', 'Leadership', ['planning_gap'], 'Demand planning is weak.', 'Demand planning guides production.', 1.0),
  q('DS_LEAD_10', 'Leadership', ['no_accountability_loop'], 'Quality ownership is unclear.', 'Quality ownership is explicit by stage and shift.', 1.0),

  // Innovation
  q('DS_INNOV_01', 'Innovation', ['no_product_testing_rhythm'], 'Product line is mostly copycat.', 'Product line has clear differentiation.', 1.0),
  q('DS_INNOV_02', 'Innovation', ['sku_complexity_tax'], 'SKU count keeps growing without control.', 'SKU count is managed intentionally.', 1.0),
  q('DS_INNOV_03', 'Innovation', ['no_market_feedback_loop'], 'Trends are noticed late.', 'Trends are tracked and tested early.', 0.9),
  q('DS_INNOV_04', 'Innovation', ['pack_size_profit_blindspot'], 'Packaging is basic.', 'Packaging innovation increases value.', 1.0),
  q('DS_INNOV_05', 'Innovation', ['no_product_testing_rhythm'], 'R&D is seen as a cost.', 'R&D is treated as survival.', 1.0),
  q('DS_INNOV_06', 'Innovation', ['no_product_testing_rhythm'], 'New launches are mostly guesses.', 'New launches are controlled trials.', 1.0),
  q('DS_INNOV_07', 'Innovation', ['low_margin_skus'], 'Weak products are rarely removed.', 'Products that drain margin are cut quickly.', 0.9),
  q('DS_INNOV_08', 'Innovation', ['pack_size_profit_blindspot'], 'No premium tier exists.', 'Premium tiers protect margin.', 0.9),
  q('DS_INNOV_09', 'Innovation', ['no_market_feedback_loop'], 'Customer feedback is ignored.', 'Customer feedback drives upgrades.', 0.9),
  q('DS_INNOV_10', 'Innovation', ['slow_bug_fix'], 'Performance improvements are rare.', 'Performance improvements are routine.', 0.9),

  // Risk
  q('DS_RISK_01', 'Risk', ['traceability_gap'], 'Traceability is limited.', 'Traceability is complete and fast.', 1.2),
  q('DS_RISK_02', 'Risk', ['label_risk'], 'Labels and claims are mainly marketing-driven.', 'Labels and claims are compliance-controlled.', 1.1),
  q('DS_RISK_03', 'Risk', ['hygiene_drift'], 'Hygiene controls are informal.', 'Hygiene controls are enforced.', 1.1),
  q('DS_RISK_04', 'Risk', ['hygiene_drift'], 'Contamination risk is not measured.', 'Contamination risk is managed systematically.', 1.0),
  q('DS_RISK_05', 'Risk', ['disaster_recovery_gap'], 'A product recall would be chaotic.', 'A recall would be controlled and fast.', 1.0),
  q('DS_RISK_06', 'Risk', ['compliance_blocker_risk'], 'SDS/MSDS coverage is incomplete.', 'SDS/MSDS coverage is complete.', 1.0),
  q('DS_RISK_07', 'Risk', ['hygiene_drift'], 'Chemical storage is casual.', 'Chemical storage is safe and audited.', 1.0),
  q('DS_RISK_08', 'Risk', ['fear_index'], 'Safety incidents are under-reported.', 'Incidents and near-misses are reported early.', 0.9),
  q('DS_RISK_09', 'Risk', ['contract_gap'], 'Distributor contracts are weak.', 'Distributor contracts define terms clearly.', 0.9),
  q('DS_RISK_10', 'Risk', ['ip_brand_protection_gap'], 'IP and brand protection are weak.', 'IP and brand protection are active.', 0.9),

  // People
  q('DS_PEOPLE_01', 'People', ['training_gap'], 'Operators rely on improvisation.', 'Operators follow SOPs and critical limits.', 1.1),
  q('DS_PEOPLE_02', 'People', ['weak_shift_handover'], 'Shift quality varies.', 'Shift quality is consistent.', 1.0),
  q('DS_PEOPLE_03', 'People', ['cross_function_breakdown'], 'Fatigue leads to mistakes.', 'Fatigue is managed to protect quality.', 1.0),
  q('DS_PEOPLE_04', 'People', ['role_clarity_gap'], 'Batch accountability is unclear.', 'Batch accountability is clear per line and shift.', 1.0),
  q('DS_PEOPLE_05', 'People', ['training_gap'], 'Training is informal.', 'Training is structured and certified.', 1.0),
  q('DS_PEOPLE_06', 'People', ['hero_operator_dependence'], 'Staff turnover disrupts quality.', 'Retention is managed to protect stability.', 0.9),
  q('DS_PEOPLE_07', 'People', ['blame_culture'], 'Incentives reward speed only.', 'Incentives reward quality and yield.', 1.0),
  q('DS_PEOPLE_08', 'People', ['weak_shift_handover'], 'Handovers lose critical details.', 'Handovers are disciplined and complete.', 0.9),
  q('DS_PEOPLE_09', 'People', ['fear_index'], 'QC is ignored under pressure.', 'QC is protected under pressure.', 1.0),
  q('DS_PEOPLE_10', 'People', ['low_psych_safety'], 'Safety culture varies by team.', 'Safety culture is consistent.', 0.9)
];
