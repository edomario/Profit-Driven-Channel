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
  industry: 'retail',
  line_type,
  pillar,
  signal_tags,
  weight,
  textA,
  textB
});

export const questions: QuestionDefinition[] = [
  // QUICK SCAN (2 per pillar)
  q('QS_OPS_01', 'Operations', ['inventory_accuracy_gap', 'stockout_tax'], 'We remember what sizes and colors are available by experience.', 'We check a simple SKU-size list before promising.', 1.1),
  q('QS_OPS_02', 'Operations', ['no_standard_work', 'offer_measurement_gap'], 'New arrivals go to the floor as soon as they come.', 'New arrivals follow a routine (tag -> price -> display -> photo).', 1.0),

  q('QS_MONEY_01', 'Money', ['pricing_margin_blindspot', 'category_margin_blindspot'], 'A good week is when sales were high.', 'A good week is when margin stayed healthy and controlled.', 1.0),
  q('QS_MONEY_02', 'Money', ['discounting_leak', 'pricing_inconsistency'], 'Discounts depend on the customer and the moment.', 'Discounts follow simple bands so profit stays safe.', 1.1),

  q('QS_MARKET_01', 'Market', ['followup_gap'], 'Customers come back when they remember us.', 'We use a small VIP and follow-up habit that brings them back.', 1.0),
  q('QS_MARKET_02', 'Market', ['no_market_feedback_loop'], 'We post products when we have time.', 'We post on a schedule so online sales stay steady.', 1.0),

  q('QS_LEAD_01', 'Leadership', ['decision_bottleneck', 'approval_bottleneck'], 'Most decisions still need the owner.', 'We use rules so the team can decide quickly.', 1.0),
  q('QS_LEAD_02', 'Leadership', ['no_variance_review'], 'We solve issues fast and move on.', 'We adjust the system so the issue does not repeat.', 1.0),

  q('QS_INNOV_01', 'Innovation', ['no_testing_rhythm'], 'We buy what looks good and feels right.', 'We test small quantities and scale what sells fast.', 1.0),
  q('QS_INNOV_02', 'Innovation', ['bundle_engine_missing'], 'We mostly sell single items.', 'We often sell complete looks or bundles.', 1.0),

  q('QS_RISK_01', 'Risk', ['policy_vagueness', 'contract_gap'], 'Returns are handled case-by-case to keep customers happy.', 'Returns follow clear rules that protect profit and fairness.', 1.0),
  q('QS_RISK_02', 'Risk', ['shrinkage_leak'], 'Missing items are assumed to be part of business.', 'Missing items trigger a simple check system.', 1.0),

  q('QS_PEOPLE_01', 'People', ['training_gap', 'onboarding_gap'], 'Staff learn mainly by observing and adapting.', 'Staff learn through a checklist and scripts so service stays consistent.', 1.0),
  q('QS_PEOPLE_02', 'People', ['incentive_misalignment'], 'Sales is measured mainly by revenue.', 'Sales includes margin and low-return behavior.', 1.0),

  // DEEP SCAN (10 per pillar)
  // Operations
  q('DS_OPS_01', 'Operations', ['inventory_accuracy_gap'], 'I find items by memory and scanning racks.', 'I find items by labeled sections and SKU logic.', 1.0),
  q('DS_OPS_02', 'Operations', ['stockout_tax'], 'Sizes are tracked informally in my head.', 'Sizes are tracked with a simple SKU-size matrix.', 1.0),
  q('DS_OPS_03', 'Operations', ['no_standard_work'], 'New arrivals go straight to the floor.', 'New arrivals follow tag, price, and photo routine.', 1.0),
  q('DS_OPS_04', 'Operations', ['pricing_inconsistency'], 'Tagging happens when customers ask.', 'Tagging is mandatory before display.', 1.0),
  q('DS_OPS_05', 'Operations', ['offer_measurement_gap'], 'Photos are taken when time allows.', 'Photos happen as part of receiving workflow.', 1.0),
  q('DS_OPS_06', 'Operations', ['no_market_feedback_loop'], 'Displays are changed when they look boring.', 'Displays are changed based on selling performance.', 0.9),
  q('DS_OPS_07', 'Operations', ['safe_handling_gap', 'shrinkage_leak'], 'Fitting room flow is informal.', 'Fitting room follows a count and flow routine.', 1.0),
  q('DS_OPS_08', 'Operations', ['slow_mover_attachment'], 'Dead stock stays until someone loves it.', 'Dead stock triggers bundle or markdown ladder actions.', 1.0),
  q('DS_OPS_09', 'Operations', ['dispatch_delivery_instability'], 'Online orders are handled in chats only.', 'Online orders follow confirm, pack, dispatch, and proof steps.', 1.0),
  q('DS_OPS_10', 'Operations', ['hero_staff_dependence'], 'If one key staff is absent, chaos increases.', 'Work stays consistent regardless of who is on shift.', 1.0),

  // Money
  q('DS_MONEY_01', 'Money', ['pricing_inconsistency'], 'Pricing is based on what competitors charge today.', 'Pricing starts from cost plus target margin rules.', 1.0),
  q('DS_MONEY_02', 'Money', ['discounting_leak'], 'Discounts are used to speed up decisions.', 'Discounts are used inside set bands.', 1.0),
  q('DS_MONEY_03', 'Money', ['pricing_margin_blindspot'], 'Profit is whatever remains after expenses.', 'Profit is tracked by category margin and leak costs.', 1.1),
  q('DS_MONEY_04', 'Money', ['discounting_leak', 'slow_mover_attachment'], 'Markdown happens when stock feels stuck.', 'Markdown follows an age-based ladder.', 1.0),
  q('DS_MONEY_05', 'Money', ['purchase_panic', 'slow_mover_attachment'], 'Buying is driven by what looks good.', 'Buying follows open-to-buy budgets and tests.', 1.0),
  q('DS_MONEY_06', 'Money', ['policy_vagueness', 'returns_damage_blindspot'], 'Returns are mostly customer-happiness decisions.', 'Returns follow rules that protect profit.', 1.0),
  q('DS_MONEY_07', 'Money', ['cash_recon_gap'], 'Cash and momo are checked when something feels off.', 'Cash and momo are reconciled daily.', 1.0),
  q('DS_MONEY_08', 'Money', ['slow_mover_attachment'], 'I keep a wide variety even if it moves slowly.', 'I protect cash by managing turns and dead stock.', 1.0),
  q('DS_MONEY_09', 'Money', ['supplier_terms_weak'], 'Supplier terms are accepted as given.', 'Supplier terms are negotiated and tracked.', 0.9),
  q('DS_MONEY_10', 'Money', ['discounting_leak', 'bundle_engine_missing'], 'Promotions are mostly price cuts.', 'Promotions are bundles and value offers to protect margin.', 0.9),

  // Market
  q('DS_MARKET_01', 'Market', ['followup_gap'], 'Repeat customers happen naturally.', 'Repeat customers are built through VIP and follow-up routines.', 1.0),
  q('DS_MARKET_02', 'Market', ['value_story_gap'], 'Our brand is a bit of everything.', 'Our brand is clear on style and price point.', 1.0),
  q('DS_MARKET_03', 'Market', ['no_market_feedback_loop'], 'We post when we remember.', 'We post on a schedule.', 1.0),
  q('DS_MARKET_04', 'Market', ['followup_gap'], 'We rely on walk-ins and referrals.', 'We capture contacts and follow up.', 1.0),
  q('DS_MARKET_05', 'Market', ['value_story_gap'], 'Customers bargain a lot.', 'Customers accept our price because value is clear.', 1.0),
  q('DS_MARKET_06', 'Market', ['bundle_engine_missing'], 'We sell what is available today.', 'We sell looks that solve occasions.', 0.9),
  q('DS_MARKET_07', 'Market', ['weak_proof_pack'], 'Reviews happen by chance.', 'Reviews are requested systematically.', 1.0),
  q('DS_MARKET_08', 'Market', ['followup_gap'], 'Online inquiries are answered when free.', 'Online inquiries follow templates and response targets.', 1.0),
  q('DS_MARKET_09', 'Market', ['no_market_feedback_loop'], 'I do not track which items bring customers back.', 'I track repeat drivers and feature them.', 0.9),
  q('DS_MARKET_10', 'Market', ['value_story_gap'], 'We avoid showing prices publicly.', 'We use clear pricing to reduce friction and time waste.', 0.9),

  // Leadership
  q('DS_LEAD_01', 'Leadership', ['kpi_cadence_gap'], 'Targets live in my head.', 'Targets are visible and reviewed weekly.', 1.0),
  q('DS_LEAD_02', 'Leadership', ['no_variance_review'], 'I solve problems personally.', 'I build systems so problems do not repeat.', 1.0),
  q('DS_LEAD_03', 'Leadership', ['approval_bottleneck', 'decision_bottleneck'], 'Discount and refund exceptions need me.', 'Discount and refund exceptions follow limits and rules.', 1.0),
  q('DS_LEAD_04', 'Leadership', ['training_planning_gap'], 'Staff learn mainly in the moment.', 'Staff learn via short checklists and scripts.', 0.9),
  q('DS_LEAD_05', 'Leadership', ['accountability_soft'], 'Performance is judged by effort.', 'Performance is judged by outcomes and standards.', 1.0),
  q('DS_LEAD_06', 'Leadership', ['meeting_no_action'], 'Meetings are how we stay aligned.', 'Dashboards reduce meeting time.', 0.9),
  q('DS_LEAD_07', 'Leadership', ['no_variance_review'], 'Mistakes are handled emotionally.', 'Mistakes are handled by root-cause.', 1.0),
  q('DS_LEAD_08', 'Leadership', ['role_clarity_gap'], 'I delegate tasks.', 'I delegate ownership outcomes.', 0.9),
  q('DS_LEAD_09', 'Leadership', ['priority_whiplash'], 'We change direction often.', 'We run weekly plans and stick to them.', 0.9),
  q('DS_LEAD_10', 'Leadership', ['fear_silence'], 'Feedback is avoided to keep peace.', 'Feedback is used to protect standards.', 0.9),

  // Innovation
  q('DS_INNOV_01', 'Innovation', ['no_testing_rhythm'], 'We buy new styles in bulk when excited.', 'We test small and scale winners.', 1.0),
  q('DS_INNOV_02', 'Innovation', ['no_testing_rhythm'], 'Newness depends on supplier availability.', 'Newness follows a planned drop rhythm.', 1.0),
  q('DS_INNOV_03', 'Innovation', ['bundle_engine_missing'], 'Styling is optional and personal.', 'Styling is a repeatable script plus bundle system.', 0.9),
  q('DS_INNOV_04', 'Innovation', ['no_testing_rhythm'], 'We rarely run experiments.', 'We run small offer tests monthly.', 1.0),
  q('DS_INNOV_05', 'Innovation', ['discounting_leak'], 'We rely on discounts to move stock.', 'We rely on bundles and value to move stock.', 0.9),
  q('DS_INNOV_06', 'Innovation', ['offer_measurement_gap'], 'Product naming is casual.', 'Product naming is consistent for search and conversion.', 0.9),
  q('DS_INNOV_07', 'Innovation', ['service_inconsistency'], 'Size guidance is try-and-see.', 'Size guidance is structured to reduce returns.', 0.9),
  q('DS_INNOV_08', 'Innovation', ['no_market_feedback_loop'], 'Customer feedback is taken personally.', 'Customer feedback is used to improve buying.', 0.9),
  q('DS_INNOV_09', 'Innovation', ['offer_measurement_gap'], 'We do not use much automation.', 'We use templates and tools to reduce mistakes.', 0.9),
  q('DS_INNOV_10', 'Innovation', ['no_market_feedback_loop'], 'We do not build repeatable basics.', 'We build repeatable winners and exclusives.', 0.9),

  // Risk
  q('DS_RISK_01', 'Risk', ['shrinkage_leak'], 'Missing items are normal sometimes.', 'Missing items trigger shrink checks.', 1.0),
  q('DS_RISK_02', 'Risk', ['shrinkage_leak', 'safe_handling_gap'], 'Fitting room is flexible.', 'Fitting room has controls and count-in-out.', 1.0),
  q('DS_RISK_03', 'Risk', ['policy_vagueness'], 'Returns are negotiated case-by-case.', 'Returns follow clear policy.', 1.0),
  q('DS_RISK_04', 'Risk', ['cash_recon_gap'], 'Refund approvals are informal.', 'Refund approvals are controlled and recorded.', 1.0),
  q('DS_RISK_05', 'Risk', ['supplier_doc_gap', 'supplier_selection_undisciplined'], 'We trust supplier authenticity.', 'We verify authenticity for risk categories.', 1.0),
  q('DS_RISK_06', 'Risk', ['contract_gap'], 'Online deliveries rely on chat proof.', 'Online deliveries use clear proof-of-delivery.', 1.0),
  q('DS_RISK_07', 'Risk', ['data_security_gap'], 'Customer contacts are stored casually.', 'Customer data is stored securely with access control.', 0.9),
  q('DS_RISK_08', 'Risk', ['pricing_inconsistency'], 'Discounts can be changed by anyone.', 'Discount changes have limits per role.', 1.0),
  q('DS_RISK_09', 'Risk', ['returns_damage_blindspot'], 'Damage or wear on returns is subjective.', 'Return checks use a consistent checklist.', 1.0),
  q('DS_RISK_10', 'Risk', ['contract_gap', 'policy_vagueness'], 'Disputes are solved by giving in.', 'Disputes are reduced by clear terms and proof.', 1.0),

  // People
  q('DS_PEOPLE_01', 'People', ['incentive_misalignment'], 'Sales is praised mainly for closing deals.', 'Sales is praised for profitable low-return closing.', 1.0),
  q('DS_PEOPLE_02', 'People', ['incentive_misalignment'], 'Staff discount to keep customers happy.', 'Staff use value scripts to protect price.', 1.0),
  q('DS_PEOPLE_03', 'People', ['service_inconsistency'], 'Staff service style is personal.', 'Staff use minimum scripts for consistency.', 1.0),
  q('DS_PEOPLE_04', 'People', ['training_gap'], 'Upselling feels pushy.', 'Upselling is styling help and value.', 0.9),
  q('DS_PEOPLE_05', 'People', ['incentive_misalignment'], 'Incentives reward revenue.', 'Incentives reward margin and quality.', 1.0),
  q('DS_PEOPLE_06', 'People', ['onboarding_gap'], 'New hires learn by shadowing only.', 'New hires learn by checklist plus shadowing.', 1.0),
  q('DS_PEOPLE_07', 'People', ['blame_culture'], 'Mistakes are punished to prevent repeats.', 'Mistakes are analyzed to remove system causes.', 1.0),
  q('DS_PEOPLE_08', 'People', ['accountability_soft'], 'Reviews happen when problems arise.', 'Reviews happen routinely.', 0.9),
  q('DS_PEOPLE_09', 'People', ['hero_staff_dependence'], 'One star staff member carries the store.', 'The store performs regardless of who is on shift.', 1.0),
  q('DS_PEOPLE_10', 'People', ['blame_culture'], 'High performers can break rules.', 'Standards are protected consistently.', 0.9)
];
