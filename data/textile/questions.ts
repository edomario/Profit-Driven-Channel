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
  q('QS_OPS_01', 'Operations', ['quality_built_late'], 'We catch most defects at the final inspection stage.', 'We prevent defects in-line so rework stays low.', 1.2),
  q('QS_OPS_02', 'Operations', ['wip_pileup'], 'WIP is high because we like to keep everyone busy.', 'WIP is controlled so bottlenecks and defects show early.', 1.1),

  q('QS_MONEY_01', 'Money', ['costing_gap'], 'We price mainly from buyer expectations and competitors.', 'We price using style-level costing and margin targets.', 1.2),
  q('QS_MONEY_02', 'Money', ['zombie_costs'], 'Overtime is normal to meet deadlines.', 'Overtime is controlled because it silently destroys margin.', 1.1),

  q('QS_MARKET_01', 'Market', ['channel_dependency'], 'One or two buyers drive most of our production.', 'We diversify buyers and channels to reduce dependency risk.', 1.2),
  q('QS_MARKET_02', 'Market', ['spec_drift_discount'], 'Specs change often and we adjust as we go.', 'Specs are locked clearly to prevent disputes and rework.', 1.1),

  q('QS_LEAD_01', 'Leadership', ['management_by_memory'], 'Output depends heavily on the supervisor on shift.', 'Output is driven by standards and clear line ownership.', 1.1),
  q('QS_LEAD_02', 'Leadership', ['no_variance_review'], 'We discuss issues often but they return again.', 'We close issues to root cause so they stop repeating.', 1.0),

  q('QS_INNOV_01', 'Innovation', ['pack_size_profit_blindspot'], 'We rarely optimize patterns and markers unless fabric prices spike.', 'We continuously improve marker efficiency to protect margin.', 1.0),
  q('QS_INNOV_02', 'Innovation', ['no_product_testing_rhythm'], 'We mostly produce what buyers request with little evolution.', 'We evolve designs and processes to increase margin and speed.', 1.0),

  q('QS_RISK_01', 'Risk', ['compliance_blocker_risk'], 'Compliance documentation is assembled when needed.', 'Compliance documentation is always audit-ready.', 1.2),
  q('QS_RISK_02', 'Risk', ['supplier_variance_risk'], 'Fabric variability is handled during sewing when issues appear.', 'Fabric quality is checked upfront to prevent waste.', 1.1),

  q('QS_PEOPLE_01', 'People', ['training_gap'], 'Skill varies by operator; experienced people carry the line.', 'Skills are standardized through training and certification.', 1.0),
  q('QS_PEOPLE_02', 'People', ['cross_function_breakdown'], 'Absenteeism disrupts production frequently.', 'We plan staffing and backups to protect output.', 1.0),

  // DEEP SCAN (10 per pillar)
  // Operations
  q('DS_OPS_01', 'Operations', ['measurement_blindspot'], 'We mainly track total output.', 'We track FPY, defects, rework, and line efficiency daily.', 1.1),
  q('DS_OPS_02', 'Operations', ['quality_built_late'], 'Defects are caught mostly at final inspection.', 'Defects are prevented with in-line checks.', 1.1),
  q('DS_OPS_03', 'Operations', ['quality_built_late'], 'Rework is common and accepted.', 'Rework is treated as a profit emergency.', 1.1),
  q('DS_OPS_04', 'Operations', ['wip_pileup'], 'WIP is high and unmanaged.', 'WIP is capped to expose bottlenecks early.', 1.0),
  q('DS_OPS_05', 'Operations', ['changeover_black_hole'], 'Changeovers are slow and improvised.', 'Changeovers follow a standard and are optimized.', 1.0),
  q('DS_OPS_06', 'Operations', ['bottleneck_bounce'], 'Bottlenecks are handled informally.', 'Bottlenecks are measured and line-balanced.', 1.0),
  q('DS_OPS_07', 'Operations', ['planning_gap'], 'Material shortages surprise us.', 'Materials are staged with readiness checks.', 1.0),
  q('DS_OPS_08', 'Operations', ['reactive_maintenance'], 'Maintenance is reactive.', 'Maintenance is preventive.', 1.0),
  q('DS_OPS_09', 'Operations', ['measurement_blindspot'], 'Production visibility is limited.', 'Production has real-time tracking.', 1.0),
  q('DS_OPS_10', 'Operations', ['order_fulfillment_instability'], 'Packing and shipping is often rushed.', 'Fulfillment has a stable flow with controls.', 1.0),

  // Money
  q('DS_MONEY_01', 'Money', ['costing_gap'], 'We do not know cost per garment by style.', 'We know true cost and margin by style.', 1.2),
  q('DS_MONEY_02', 'Money', ['waste_not_costed'], 'Fabric waste is not tracked in money terms.', 'Fabric waste is tracked as UGX loss.', 1.1),
  q('DS_MONEY_03', 'Money', ['zombie_costs'], 'Overtime is frequent.', 'Overtime is controlled and analyzed.', 1.0),
  q('DS_MONEY_04', 'Money', ['purchase_panic'], 'Rush purchases happen often.', 'Purchases are forecasted and planned.', 1.0),
  q('DS_MONEY_05', 'Money', ['inventory_blindspot'], 'Dead stock accumulates.', 'Dead stock is minimized and monetized.', 1.0),
  q('DS_MONEY_06', 'Money', ['shrinkage_leak'], 'Shrinkage and theft are not tightly controlled.', 'Shrinkage is measured and controlled.', 1.0),
  q('DS_MONEY_07', 'Money', ['discounting_leak'], 'Discounts and penalties are common.', 'Penalties are prevented with delivery discipline.', 1.0),
  q('DS_MONEY_08', 'Money', ['costing_gap'], 'Sampling costs are unclear.', 'Sampling has budgets and conversion targets.', 0.9),
  q('DS_MONEY_09', 'Money', ['pricing_margin_blindspot'], 'We focus on revenue volume.', 'We focus on profit per style and order.', 1.1),
  q('DS_MONEY_10', 'Money', ['costing_gap'], 'Job costing is not reliable.', 'Job costing is accurate and consistent.', 1.1),

  // Market
  q('DS_MARKET_01', 'Market', ['channel_dependency'], 'We rely on one major buyer.', 'We diversify buyers and channels.', 1.2),
  q('DS_MARKET_02', 'Market', ['spec_drift_discount'], 'Spec changes cause confusion.', 'Specs are locked and controlled.', 1.1),
  q('DS_MARKET_03', 'Market', ['complaint_handling_gap'], 'Quality issues are handled after complaints.', 'Quality reputation is protected proactively.', 1.0),
  q('DS_MARKET_04', 'Market', ['order_fulfillment_instability'], 'On-time delivery varies.', 'On-time delivery is measured and improved.', 1.0),
  q('DS_MARKET_05', 'Market', ['complaint_handling_gap'], 'Returns are not analyzed deeply.', 'Returns are tracked by style and prevented.', 1.0),
  q('DS_MARKET_06', 'Market', ['pricing_positioning_gap'], 'We compete on price.', 'We compete on reliability and quality.', 1.0),
  q('DS_MARKET_07', 'Market', ['pricing_positioning_gap'], 'MOQ pressure forces bad orders.', 'MOQ strategy is aligned to capacity and margin.', 1.0),
  q('DS_MARKET_08', 'Market', ['weak_onboarding'], 'Buyer communication is reactive.', 'Buyer communication is structured and timely.', 0.9),
  q('DS_MARKET_09', 'Market', ['value_story_gap'], 'Trend changes catch us late.', 'We respond fast to trend signals.', 0.9),
  q('DS_MARKET_10', 'Market', ['low_repeat_orders'], 'We do not track repeat order drivers.', 'We track and engineer repeat orders.', 1.0),

  // Leadership
  q('DS_LEAD_01', 'Leadership', ['no_variance_review'], 'Problems repeat without closure.', 'Problems are closed to root cause.', 1.1),
  q('DS_LEAD_02', 'Leadership', ['no_kpi_ownership'], 'KPIs exist but do not drive action.', 'KPI reviews produce owners and deadlines.', 1.0),
  q('DS_LEAD_03', 'Leadership', ['management_by_memory'], 'Supervisors vary widely in performance.', 'Supervisors follow standard management routines.', 1.0),
  q('DS_LEAD_04', 'Leadership', ['decision_bottleneck'], 'Approvals slow production.', 'Delegated limits speed execution.', 1.0),
  q('DS_LEAD_05', 'Leadership', ['blame_culture'], 'Defects are hidden to avoid blame.', 'Defects are reported early.', 1.0),
  q('DS_LEAD_06', 'Leadership', ['no_meeting_to_action'], 'Meetings do not close tasks.', 'Meetings close tasks.', 1.0),
  q('DS_LEAD_07', 'Leadership', ['hiring_mismatch'], 'Training is informal.', 'Training is structured.', 0.9),
  q('DS_LEAD_08', 'Leadership', ['weak_goal_alignment'], 'Standards collapse during peak demand.', 'Standards survive peak demand.', 1.0),
  q('DS_LEAD_09', 'Leadership', ['hero_operator_dependence'], 'Factory depends on heroes.', 'Factory runs on systems.', 1.0),
  q('DS_LEAD_10', 'Leadership', ['no_accountability_loop'], 'Accountability is emotional.', 'Accountability is measured.', 0.9),

  // Innovation
  q('DS_INNOV_01', 'Innovation', ['pack_size_profit_blindspot'], 'Marker efficiency is not a priority.', 'Marker efficiency is a continuous cost-down lever.', 1.0),
  q('DS_INNOV_02', 'Innovation', ['slow_bug_fix'], 'SMV is not improved systematically.', 'SMV reduction is a monthly program.', 1.0),
  q('DS_INNOV_03', 'Innovation', ['no_product_testing_rhythm'], 'Designs rarely evolve.', 'Designs evolve for margin and demand.', 1.0),
  q('DS_INNOV_04', 'Innovation', ['pack_size_profit_blindspot'], 'Packaging and presentation is basic.', 'Presentation is optimized for premium pricing.', 0.9),
  q('DS_INNOV_05', 'Innovation', ['slow_bug_fix'], 'Processes do not change much.', 'Process improvements are tracked with ROI.', 1.0),
  q('DS_INNOV_06', 'Innovation', ['no_market_feedback_loop'], 'Ideas are ad hoc.', 'Ideas are captured and executed.', 0.9),
  q('DS_INNOV_07', 'Innovation', ['no_product_testing_rhythm'], 'Sampling is chaotic.', 'Sampling is standardized and improved.', 0.9),
  q('DS_INNOV_08', 'Innovation', ['no_market_feedback_loop'], 'Digital tools are avoided.', 'Digital tools increase speed and visibility.', 0.9),
  q('DS_INNOV_09', 'Innovation', ['sku_complexity_tax'], 'Product mix is not optimized.', 'Product mix is optimized for margin.', 1.0),
  q('DS_INNOV_10', 'Innovation', ['no_market_feedback_loop'], 'Learning stays in heads.', 'Learning becomes SOPs.', 0.9),

  // Risk
  q('DS_RISK_01', 'Risk', ['compliance_blocker_risk'], 'Audits cause panic.', 'Audits are routine because docs are ready.', 1.2),
  q('DS_RISK_02', 'Risk', ['compliance_blocker_risk'], 'Labor compliance is loosely managed.', 'Labor compliance is documented and enforced.', 1.1),
  q('DS_RISK_03', 'Risk', ['supplier_variance_risk'], 'Supplier variability is discovered late.', 'Supplier quality is verified early.', 1.0),
  q('DS_RISK_04', 'Risk', ['contract_gap'], 'Contract penalties are frequent surprises.', 'Contract penalties are prevented by controls.', 1.0),
  q('DS_RISK_05', 'Risk', ['ip_brand_protection_gap'], 'IP and designs are casually shared.', 'IP and design files are protected.', 1.0),
  q('DS_RISK_06', 'Risk', ['hygiene_drift'], 'Safety standards drift under pressure.', 'Safety standards are consistent.', 1.0),
  q('DS_RISK_07', 'Risk', ['contract_gap'], 'Subcontractor quality is unmanaged.', 'Subcontractors follow strict standards.', 0.9),
  q('DS_RISK_08', 'Risk', ['traceability_gap'], 'Traceability by roll and batch is weak.', 'Traceability is strong.', 1.0),
  q('DS_RISK_09', 'Risk', ['data_security_gap'], 'Documentation is scattered.', 'Documentation is centralized.', 0.9),
  q('DS_RISK_10', 'Risk', ['disaster_recovery_gap'], 'Risk is addressed after incidents.', 'Risk is prevented proactively.', 1.0),

  // People
  q('DS_PEOPLE_01', 'People', ['training_gap'], 'Skills vary widely.', 'Skills are standardized.', 1.1),
  q('DS_PEOPLE_02', 'People', ['onboarding_gap'], 'Onboarding is mostly shadowing.', 'Onboarding uses SOPs and checklists.', 1.0),
  q('DS_PEOPLE_03', 'People', ['cross_function_breakdown'], 'Absenteeism disrupts output often.', 'Staffing plans protect output.', 1.0),
  q('DS_PEOPLE_04', 'People', ['cross_function_breakdown'], 'Fatigue is common during peak.', 'Fatigue is managed.', 1.0),
  q('DS_PEOPLE_05', 'People', ['blame_culture'], 'Incentives reward speed.', 'Incentives reward quality and output.', 1.0),
  q('DS_PEOPLE_06', 'People', ['role_clarity_gap'], 'Supervisor coaching is limited.', 'Supervisors coach routinely.', 0.9),
  q('DS_PEOPLE_07', 'People', ['fear_index'], 'Defects are hidden.', 'Defects are reported early.', 1.0),
  q('DS_PEOPLE_08', 'People', ['hero_operator_dependence'], 'Turnover is accepted.', 'Retention is engineered.', 0.9),
  q('DS_PEOPLE_09', 'People', ['weak_shift_handover'], 'Handover is informal.', 'Handover is standardized.', 1.0),
  q('DS_PEOPLE_10', 'People', ['low_psych_safety'], 'Morale issues are ignored.', 'Morale is monitored and improved.', 0.9)
];
