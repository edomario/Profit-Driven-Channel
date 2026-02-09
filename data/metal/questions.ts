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
  q('QS_OPS_01', 'Operations', ['no_standard_work'], 'We often start fabrication with verbal or WhatsApp specs.', 'We start only after drawings and specs are confirmed.', 1.2),
  q('QS_OPS_02', 'Operations', ['quality_built_late'], 'Defects are usually discovered at the end.', 'Defects are caught early through stage QC checks.', 1.1),

  q('QS_MONEY_01', 'Money', ['costing_gap'], 'We quote mostly to win the job quickly.', 'We quote using material + hours + consumables + margin.', 1.2),
  q('QS_MONEY_02', 'Money', ['cashflow_visibility_gap'], 'We sometimes start work before deposit to secure the client.', 'We start only after deposit to protect cashflow.', 1.1),

  q('QS_MARKET_01', 'Market', ['low_repeat_orders'], 'Most jobs come from referrals but we do not ask systematically.', 'We have a referral + proof system that generates steady leads.', 1.0),
  q('QS_MARKET_02', 'Market', ['spec_drift_discount'], 'Clients sometimes complain about delays or unclear expectations.', 'Clients get clear timelines and progress updates.', 1.1),

  q('QS_LEAD_01', 'Leadership', ['decision_bottleneck'], 'Many decisions wait for the owner or foreman.', 'Teams have decision limits so work moves faster.', 1.1),
  q('QS_LEAD_02', 'Leadership', ['no_variance_review'], 'The same problems repeat under pressure.', 'Problems are solved to root cause so they stop repeating.', 1.0),

  q('QS_INNOV_01', 'Innovation', ['sku_complexity_tax'], 'Repeat jobs are rebuilt from scratch each time.', 'Repeat jobs use templates and jigs to reduce errors and speed up.', 1.0),
  q('QS_INNOV_02', 'Innovation', ['slow_bug_fix'], 'Tools are upgraded only when they fail.', 'Tools are upgraded when ROI shows time savings.', 0.9),

  q('QS_RISK_01', 'Risk', ['hygiene_drift'], 'Safety depends on personal discipline.', 'Safety is enforced with routines and audits.', 1.2),
  q('QS_RISK_02', 'Risk', ['contract_gap'], 'Scope changes are handled informally.', 'Scope changes require signed change orders.', 1.1),

  q('QS_PEOPLE_01', 'People', ['hero_operator_dependence'], 'Quality depends on a few skilled welders.', 'Quality is protected by standards and training.', 1.0),
  q('QS_PEOPLE_02', 'People', ['onboarding_gap'], 'New workers learn by observing and trying.', 'New workers follow structured training stages.', 1.0),

  // DEEP SCAN (10 per pillar)
  // Operations
  q('DS_OPS_01', 'Operations', ['no_standard_work'], 'Specs are mostly verbal.', 'Specs are documented and confirmed.', 1.1),
  q('DS_OPS_02', 'Operations', ['measurement_blindspot'], 'Measurements are checked once.', 'Measurements are verified before cutting.', 1.1),
  q('DS_OPS_03', 'Operations', ['waste_not_costed'], 'Scrap is accepted as normal.', 'Scrap is tracked and reduced.', 1.0),
  q('DS_OPS_04', 'Operations', ['flow_instability'], 'Fit-up is improvised.', 'Fit-up follows standards to reduce distortion.', 1.0),
  q('DS_OPS_05', 'Operations', ['quality_definition_gap'], 'Welding quality varies by person.', 'Welding follows SOP and checks.', 1.0),
  q('DS_OPS_06', 'Operations', ['inventory_blindspot'], 'Consumables run out during jobs.', 'Consumables are staged beforehand.', 1.0),
  q('DS_OPS_07', 'Operations', ['quality_built_late'], 'QC happens at the end.', 'QC happens at each stage.', 1.1),
  q('DS_OPS_08', 'Operations', ['bottleneck_bounce'], 'Bottlenecks surprise us.', 'Bottlenecks are scheduled and managed.', 1.0),
  q('DS_OPS_09', 'Operations', ['order_fulfillment_instability'], 'Painting and finishing delays delivery.', 'Finishing is planned and controlled.', 1.0),
  q('DS_OPS_10', 'Operations', ['measurement_blindspot'], 'Job progress is mostly in people\'s heads.', 'Job progress is visible on a board/dashboard.', 0.9),

  // Money
  q('DS_MONEY_01', 'Money', ['costing_gap'], 'Quotes are fast guesses.', 'Quotes are based on costing and hours.', 1.2),
  q('DS_MONEY_02', 'Money', ['waste_not_costed'], 'Consumables are small things.', 'Consumables are costed per job.', 1.0),
  q('DS_MONEY_03', 'Money', ['costing_gap'], 'We do not track hours per job.', 'We track hours per job type.', 1.1),
  q('DS_MONEY_04', 'Money', ['cashflow_visibility_gap'], 'Deposits are optional.', 'Deposits are mandatory.', 1.1),
  q('DS_MONEY_05', 'Money', ['pricing_margin_blindspot'], 'Scope creep is absorbed.', 'Scope creep is charged with change orders.', 1.0),
  q('DS_MONEY_06', 'Money', ['supplier_variance_risk'], 'Steel price changes surprise us.', 'Quotes have validity windows and buffers.', 1.0),
  q('DS_MONEY_07', 'Money', ['waste_not_costed'], 'Rework costs are ignored.', 'Rework costs are tracked and reduced.', 1.0),
  q('DS_MONEY_08', 'Money', ['pricing_margin_blindspot'], 'Profit is judged by cash received.', 'Profit is measured per job.', 1.0),
  q('DS_MONEY_09', 'Money', ['payment_delay_chokehold'], 'Payment delays are unmanaged.', 'Collections follow a system.', 1.0),
  q('DS_MONEY_10', 'Money', ['cashflow_visibility_gap'], 'Business money mixes with personal.', 'Finances are separated.', 1.0),

  // Market
  q('DS_MARKET_01', 'Market', ['low_repeat_orders'], 'We rely on referrals passively.', 'We actively build referrals and proof packs.', 1.0),
  q('DS_MARKET_02', 'Market', ['order_fulfillment_instability'], 'Delivery dates are flexible.', 'Delivery dates are tracked and protected.', 1.1),
  q('DS_MARKET_03', 'Market', ['pricing_positioning_gap'], 'We compete on price.', 'We compete on standards and reliability.', 1.1),
  q('DS_MARKET_04', 'Market', ['weak_proof_pack'], 'Portfolio is informal.', 'Portfolio is structured and persuasive.', 1.0),
  q('DS_MARKET_05', 'Market', ['spec_drift_discount'], 'Client expectations shift often.', 'Expectations are locked with sign-off.', 1.1),
  q('DS_MARKET_06', 'Market', ['weak_onboarding'], 'Communication is reactive.', 'Communication is proactive and scheduled.', 0.9),
  q('DS_MARKET_07', 'Market', ['complaint_handling_gap'], 'Complaints are handled slowly.', 'Complaints are closed fast with documentation.', 1.0),
  q('DS_MARKET_08', 'Market', ['channel_dependency'], 'One client dominates revenue.', 'Client base is diversified.', 1.1),
  q('DS_MARKET_09', 'Market', ['weak_onboarding'], 'Quote follow-up is weak.', 'Follow-up is systematic until yes/no.', 0.9),
  q('DS_MARKET_10', 'Market', ['spec_drift_discount'], 'Specs are unclear and disputes follow.', 'Specs are clear and disputes reduce.', 1.0),

  // Leadership
  q('DS_LEAD_01', 'Leadership', ['decision_bottleneck'], 'Owner or foreman approves everything.', 'Decisions are delegated with limits.', 1.1),
  q('DS_LEAD_02', 'Leadership', ['priority_whiplash'], 'Planning is reactive.', 'Planning is routine and forward.', 1.0),
  q('DS_LEAD_03', 'Leadership', ['no_variance_review'], 'Problems repeat.', 'Problems are closed to root cause.', 1.1),
  q('DS_LEAD_04', 'Leadership', ['weak_goal_alignment'], 'Standards collapse under pressure.', 'Standards survive busy periods.', 1.0),
  q('DS_LEAD_05', 'Leadership', ['no_accountability_loop'], 'Accountability is unclear.', 'Owners exist per stage/task.', 1.0),
  q('DS_LEAD_06', 'Leadership', ['no_meeting_to_action'], 'Meetings do not produce actions.', 'Meetings produce owners + deadlines.', 1.0),
  q('DS_LEAD_07', 'Leadership', ['no_kpi_ownership'], 'Capacity is ignored when accepting jobs.', 'Capacity planning controls intake.', 1.0),
  q('DS_LEAD_08', 'Leadership', ['management_by_memory'], 'Quality is emotional.', 'Quality is measured.', 1.0),
  q('DS_LEAD_09', 'Leadership', ['weak_goal_alignment'], 'Safety enforcement is inconsistent.', 'Safety enforcement is routine.', 0.9),
  q('DS_LEAD_10', 'Leadership', ['hiring_mismatch'], 'Training is informal.', 'Training is structured.', 0.9),

  // Innovation
  q('DS_INNOV_01', 'Innovation', ['sku_complexity_tax'], 'Repeat jobs are rebuilt from scratch.', 'Templates and jigs reduce errors.', 1.1),
  q('DS_INNOV_02', 'Innovation', ['slow_bug_fix'], 'Layout is traditional.', 'Layout is optimized for flow.', 1.0),
  q('DS_INNOV_03', 'Innovation', ['slow_bug_fix'], 'Tool upgrades are avoided.', 'Tool upgrades are ROI-based.', 1.0),
  q('DS_INNOV_04', 'Innovation', ['quality_definition_gap'], 'Drawings are low quality.', 'Drawings are improved for fabrication efficiency.', 1.0),
  q('DS_INNOV_05', 'Innovation', ['no_product_testing_rhythm'], 'Scrap stays the same yearly.', 'Scrap reduces through improvement cycles.', 1.0),
  q('DS_INNOV_06', 'Innovation', ['no_product_testing_rhythm'], 'No prototype/testing habits.', 'Prototype/testing prevents costly errors.', 0.9),
  q('DS_INNOV_07', 'Innovation', ['no_market_feedback_loop'], 'Digital tracking is avoided.', 'Digital tracking improves speed and visibility.', 0.9),
  q('DS_INNOV_08', 'Innovation', ['slow_bug_fix'], 'Installation methods vary.', 'Installation methods are standardized.', 0.9),
  q('DS_INNOV_09', 'Innovation', ['low_margin_skus'], 'No product lines.', 'Product lines are built with margin strategy.', 1.0),
  q('DS_INNOV_10', 'Innovation', ['no_market_feedback_loop'], 'Learning stays in heads.', 'Learning becomes SOPs.', 0.9),

  // Risk
  q('DS_RISK_01', 'Risk', ['hygiene_drift'], 'Safety is personal choice.', 'Safety is enforced with audits.', 1.1),
  q('DS_RISK_02', 'Risk', ['disaster_recovery_gap'], 'Fire/gas hazards are casual.', 'Fire/gas safety is controlled.', 1.0),
  q('DS_RISK_03', 'Risk', ['contract_gap'], 'Contracts are informal.', 'Contracts include scope and change clauses.', 1.1),
  q('DS_RISK_04', 'Risk', ['traceability_gap'], 'Tool loss is normal.', 'Tool control reduces loss.', 1.0),
  q('DS_RISK_05', 'Risk', ['insurance_gap'], 'Installation risks are not planned.', 'Installation checklists reduce liability.', 1.0),
  q('DS_RISK_06', 'Risk', ['contract_gap'], 'Disputes are emotional.', 'Disputes are documented.', 1.0),
  q('DS_RISK_07', 'Risk', ['ip_brand_protection_gap'], 'IP/designs are shared freely.', 'IP/designs are protected.', 0.9),
  q('DS_RISK_08', 'Risk', ['compliance_blocker_risk'], 'QC records are missing.', 'QC records exist for accountability.', 1.0),
  q('DS_RISK_09', 'Risk', ['compliance_blocker_risk'], 'Compliance is ignored.', 'Compliance is respected where required.', 1.0),
  q('DS_RISK_10', 'Risk', ['data_security_gap'], 'Customer records are scattered.', 'Records are centralized.', 0.9),

  // People
  q('DS_PEOPLE_01', 'People', ['training_gap'], 'Skill varies widely.', 'Skills are standardized.', 1.1),
  q('DS_PEOPLE_02', 'People', ['onboarding_gap'], 'New workers learn by trial.', 'New workers follow structured training.', 1.0),
  q('DS_PEOPLE_03', 'People', ['cross_function_breakdown'], 'Fatigue is normal.', 'Fatigue is managed for quality and safety.', 1.0),
  q('DS_PEOPLE_04', 'People', ['blame_culture'], 'Shortcuts are tolerated.', 'Standards are enforced.', 1.0),
  q('DS_PEOPLE_05', 'People', ['hero_operator_dependence'], 'Turnover is accepted.', 'Retention is built intentionally.', 0.9),
  q('DS_PEOPLE_06', 'People', ['weak_shift_handover'], 'Communication is informal.', 'Handovers are disciplined.', 0.9),
  q('DS_PEOPLE_07', 'People', ['role_clarity_gap'], 'Quality is one person\'s job.', 'Quality is shared responsibility.', 1.0),
  q('DS_PEOPLE_08', 'People', ['fear_index'], 'Safety culture is weak.', 'Safety culture is strong.', 1.0),
  q('DS_PEOPLE_09', 'People', ['role_clarity_gap'], 'Performance is vague.', 'Performance is measured.', 1.0),
  q('DS_PEOPLE_10', 'People', ['low_psych_safety'], 'Morale issues are ignored.', 'Morale is monitored and improved.', 0.9)
];
