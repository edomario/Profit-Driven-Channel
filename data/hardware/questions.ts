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
  q('QS_OPS_01', 'Operations', ['inventory_accuracy_gap'], 'We confirm stock by looking around the yard and shelves.', 'We confirm stock using a simple list/bin system before promising.', 1.1),
  q('QS_OPS_02', 'Operations', ['dispatch_delivery_instability'], 'Deliveries are managed by calls and memory.', 'Deliveries follow a small pick-list plus proof-of-delivery habit.', 1.0),

  q('QS_MONEY_01', 'Money', ['pricing_margin_blindspot'], 'A good day is when money moved a lot.', 'A good day is when we can explain margin clearly on what moved.', 1.0),
  q('QS_MONEY_02', 'Money', ['discounting_leak'], 'Discounts depend on the conversation and urgency.', 'Discounts follow a small rule so pricing stays consistent.', 1.1),

  q('QS_MARKET_01', 'Market', ['followup_gap'], 'Contractors mostly return when they remember us.', 'We use a small follow-up habit that keeps them returning.', 1.0),
  q('QS_MARKET_02', 'Market', ['value_story_gap'], 'Quotes are mostly verbal or WhatsApp without tracking.', 'Quotes are recorded so we can follow up and close.', 1.0),

  q('QS_LEAD_01', 'Leadership', ['no_variance_review'], 'When issues happen, we fix quickly and move on.', 'When issues happen, we adjust a small system so it stops repeating.', 1.0),
  q('QS_LEAD_02', 'Leadership', ['decision_bottleneck'], 'Decisions often wait for one key person.', 'Decisions follow simple rules even when the owner is away.', 1.1),

  q('QS_INNOV_01', 'Innovation', ['no_testing_rhythm'], 'We sell mostly the same way we always have.', 'We test small bundles and packages to lift profit safely.', 1.0),
  q('QS_INNOV_02', 'Innovation', ['no_market_feedback_loop'], 'Stock mix changes mainly by supplier availability.', 'Stock mix changes based on what moves and what customers ask for.', 1.0),

  q('QS_RISK_01', 'Risk', ['supplier_doc_gap'], 'We trust supplier quality unless customers complain.', 'We verify key products and suppliers as routine.', 1.1),
  q('QS_RISK_02', 'Risk', ['policy_vagueness'], 'Returns and disputes are handled case-by-case.', 'Returns and disputes follow clear written rules.', 1.0),

  q('QS_PEOPLE_01', 'People', ['training_gap'], 'Staff learn mainly by observing and adapting.', 'Staff learn through a checklist plus coaching so output stays consistent.', 1.0),
  q('QS_PEOPLE_02', 'People', ['incentive_misalignment'], 'Sales performance is mainly judged by revenue.', 'Sales performance includes margin and error rates.', 1.0),

  // DEEP SCAN (10 per pillar)
  // Operations
  q('DS_OPS_01', 'Operations', ['inventory_accuracy_gap'], 'We locate items by memory and walking the yard.', 'We locate items using zones, labels, and bin logic.', 1.0),
  q('DS_OPS_02', 'Operations', ['receiving_slippage'], 'Receiving is mostly offload now and sort later.', 'Receiving follows a quick check and record first.', 1.0),
  q('DS_OPS_03', 'Operations', ['stockout_tax'], 'We notice stockouts when customers ask.', 'We notice stockouts through a fast-mover routine.', 1.0),
  q('DS_OPS_04', 'Operations', ['dispatch_delivery_instability'], 'Similar sizes and brands sit together without clear separation.', 'Similar sizes and brands are separated to prevent wrong picks.', 1.0),
  q('DS_OPS_05', 'Operations', ['dispatch_delivery_instability'], 'Deliveries are prepared from what the driver remembers.', 'Deliveries are prepared with a pick list and load check.', 1.0),
  q('DS_OPS_06', 'Operations', ['returns_damage_blindspot'], 'Returns go back to shelf quickly.', 'Returns go to quarantine first and then are decided.', 1.0),
  q('DS_OPS_07', 'Operations', ['safe_handling_gap'], 'Breakage is treated as part of business.', 'Breakage is logged by cause and reduced by rules.', 1.0),
  q('DS_OPS_08', 'Operations', ['slow_mover_attachment'], 'Dead stock stays until someone buys it someday.', 'Dead stock triggers a cleanup plan (bundle, discount, transfer).', 1.0),
  q('DS_OPS_09', 'Operations', ['shrinkage_leak'], 'Yard access is flexible depending on who is around.', 'Yard access follows simple controls (who, when, record).', 1.0),
  q('DS_OPS_10', 'Operations', ['hero_staff_dependence'], 'If the storekeeper is away, stock truth becomes harder.', 'Stock truth stays reliable regardless of who is present.', 1.0),

  // Money
  q('DS_MONEY_01', 'Money', ['pricing_inconsistency'], 'Pricing is adjusted based on market mood and customer pressure.', 'Pricing starts from a price book with controlled flexibility.', 1.0),
  q('DS_MONEY_02', 'Money', ['discounting_leak'], 'Discounts are used to close deals faster.', 'Discounts are used within guardrails to protect margin.', 1.0),
  q('DS_MONEY_03', 'Money', ['pricing_margin_blindspot'], 'Profit is what remains after paying bills.', 'Profit is tracked by category margin and leak costs.', 1.1),
  q('DS_MONEY_04', 'Money', ['cash_recon_gap'], 'Cash and momo are checked when something feels off.', 'Cash and momo are reconciled daily as routine.', 1.0),
  q('DS_MONEY_05', 'Money', ['category_margin_blindspot'], 'Delivery cost is treated as a general expense.', 'Delivery cost per order is visible and managed.', 1.0),
  q('DS_MONEY_06', 'Money', ['credit_terms_risk'], 'Credit is given when the customer feels trustworthy.', 'Credit follows deposit, limit, and days rules.', 1.0),
  q('DS_MONEY_07', 'Money', ['payment_delay_chokehold'], 'Credit follow-up is informal reminders.', 'Credit follow-up is a schedule with cut-off rules.', 1.0),
  q('DS_MONEY_08', 'Money', ['supplier_terms_weak'], 'Supplier price changes are handled as they come.', 'Supplier price changes trigger fast price-book updates.', 1.0),
  q('DS_MONEY_09', 'Money', ['returns_damage_blindspot'], 'Returns and breakage are absorbed quietly.', 'Returns and breakage are measured so they reduce over time.', 1.0),
  q('DS_MONEY_10', 'Money', ['slow_mover_attachment'], 'Big purchases happen when there is a good deal.', 'Big purchases happen when turns and cash cycle support them.', 1.0),

  // Market
  q('DS_MARKET_01', 'Market', ['followup_gap'], 'Repeat customers happen naturally.', 'Repeat customers are supported by a follow-up habit.', 1.0),
  q('DS_MARKET_02', 'Market', ['segment_blindspot'], 'We sell to anyone who walks in.', 'We prioritize key segments like contractors and institutions.', 0.9),
  q('DS_MARKET_03', 'Market', ['followup_gap'], 'Quotes are mostly verbal or chat-based.', 'Quotes are logged and tracked.', 1.0),
  q('DS_MARKET_04', 'Market', ['followup_gap'], 'Referrals are left to chance.', 'Referrals are requested as part of service.', 0.9),
  q('DS_MARKET_05', 'Market', ['complaint_handling_gap'], 'Complaints are solved and forgotten.', 'Complaints are logged and used to improve systems.', 1.0),
  q('DS_MARKET_06', 'Market', ['value_story_gap'], 'Customers mainly choose us based on price.', 'Customers mainly choose us based on reliability, trust, and stock.', 1.0),
  q('DS_MARKET_07', 'Market', ['no_market_feedback_loop'], 'We do not track which products drive repeat orders.', 'We track what repeat customers buy most.', 1.0),
  q('DS_MARKET_08', 'Market', ['contract_gap'], 'Contractor relationships are informal.', 'Contractor relationships follow simple tiers and terms.', 0.9),
  q('DS_MARKET_09', 'Market', ['followup_gap'], 'Online inquiries are answered when free.', 'Online inquiries follow templates and speed targets.', 1.0),
  q('DS_MARKET_10', 'Market', ['offer_measurement_gap'], 'Promotions are rare and ad hoc.', 'Promotions are tested and measured.', 0.9),

  // Leadership
  q('DS_LEAD_01', 'Leadership', ['kpi_cadence_gap'], 'Targets are discussed verbally.', 'Targets are visible and tracked.', 1.0),
  q('DS_LEAD_02', 'Leadership', ['no_variance_review'], 'Problems are solved by extra effort.', 'Problems are solved by workflow improvement.', 1.0),
  q('DS_LEAD_03', 'Leadership', ['decision_bottleneck'], 'Exceptions need the owner often.', 'Exceptions follow limits and rules.', 1.0),
  q('DS_LEAD_04', 'Leadership', ['training_planning_gap'], 'Training happens mainly in the moment.', 'Training happens as short weekly sessions.', 0.9),
  q('DS_LEAD_05', 'Leadership', ['accountability_soft'], 'Performance is judged by effort and loyalty.', 'Performance is judged by outcomes and accuracy.', 1.0),
  q('DS_LEAD_06', 'Leadership', ['meeting_no_action'], 'Meetings are how we stay aligned.', 'Dashboards reduce meetings.', 0.9),
  q('DS_LEAD_07', 'Leadership', ['fear_silence'], 'Mistakes lead to blame to stop repeats.', 'Mistakes lead to root cause to stop repeats.', 1.0),
  q('DS_LEAD_08', 'Leadership', ['role_clarity_gap'], 'Delegation is giving tasks.', 'Delegation is giving ownership of outcomes.', 0.9),
  q('DS_LEAD_09', 'Leadership', ['policy_vagueness'], 'Discount and credit rules are flexible.', 'Discount and credit rules are consistent.', 1.0),
  q('DS_LEAD_10', 'Leadership', ['fear_silence'], 'Feedback is avoided to keep peace.', 'Feedback is used to protect standards.', 0.9),

  // Innovation
  q('DS_INNOV_01', 'Innovation', ['bundle_engine_missing'], 'Bundles are offered only when asked.', 'Bundles are offered as a standard option.', 1.0),
  q('DS_INNOV_02', 'Innovation', ['no_market_feedback_loop'], 'Stock mix changes mainly based on supplier availability.', 'Stock mix changes based on demand patterns.', 1.0),
  q('DS_INNOV_03', 'Innovation', ['pricing_inconsistency'], 'Pricing changes are communicated informally.', 'Pricing changes are updated centrally and communicated clearly.', 0.9),
  q('DS_INNOV_04', 'Innovation', ['slow_mover_attachment'], 'We keep slow movers just in case.', 'We clear slow movers to release cash.', 1.0),
  q('DS_INNOV_05', 'Innovation', ['offer_measurement_gap'], 'Quotes are built from scratch each time.', 'Quotes use templates for common project types.', 1.0),
  q('DS_INNOV_06', 'Innovation', ['offer_measurement_gap'], 'Tools and software feel optional.', 'Tools and software are used to reduce mistakes and speed service.', 0.9),
  q('DS_INNOV_07', 'Innovation', ['training_planning_gap'], 'Staff work in their own styles.', 'Staff follow minimum standard workflows.', 0.9),
  q('DS_INNOV_08', 'Innovation', ['no_market_feedback_loop'], 'Customer feedback is taken personally.', 'Customer feedback is used as improvement input.', 0.9),
  q('DS_INNOV_09', 'Innovation', ['no_testing_rhythm'], 'We rarely run experiments.', 'We run small tests monthly.', 1.0),
  q('DS_INNOV_10', 'Innovation', ['offer_measurement_gap'], 'Display and merchandising are based on neatness.', 'Display and merchandising are based on conversion.', 0.9),

  // Risk
  q('DS_RISK_01', 'Risk', ['supplier_doc_gap'], 'We trust quality unless customers complain.', 'We verify key products and suppliers as routine.', 1.1),
  q('DS_RISK_02', 'Risk', ['shrinkage_leak'], 'High-value items are accessible to many staff.', 'High-value items have access controls.', 1.0),
  q('DS_RISK_03', 'Risk', ['policy_vagueness'], 'Returns are negotiated case-by-case.', 'Returns follow clear written rules.', 1.0),
  q('DS_RISK_04', 'Risk', ['inventory_accuracy_gap'], 'Stock counts happen when something is missing.', 'Stock counts happen routinely.', 1.0),
  q('DS_RISK_05', 'Risk', ['supplier_doc_gap'], 'Supplier disputes are handled informally.', 'Supplier disputes use documented receiving evidence.', 1.0),
  q('DS_RISK_06', 'Risk', ['contract_gap'], 'Delivery disputes rely on phone calls.', 'Delivery disputes rely on POD evidence.', 1.0),
  q('DS_RISK_07', 'Risk', ['safe_handling_gap'], 'Safety is handled carefully but informally.', 'Safety has simple written practices and PPE habits.', 0.9),
  q('DS_RISK_08', 'Risk', ['cash_recon_gap'], 'Cash controls rely mostly on trust.', 'Cash controls rely on reconciliation and approvals.', 1.0),
  q('DS_RISK_09', 'Risk', ['pricing_inconsistency'], 'Staff can adjust prices freely when needed.', 'Price adjustments follow limits.', 1.0),
  q('DS_RISK_10', 'Risk', ['no_variance_review'], 'Incidents are handled quietly.', 'Incidents are logged and prevented.', 0.9),

  // People
  q('DS_PEOPLE_01', 'People', ['incentive_misalignment'], 'Sales are praised mainly for closing deals.', 'Sales are praised for closing profitable low-dispute deals.', 1.0),
  q('DS_PEOPLE_02', 'People', ['accountability_soft'], 'Yard staff are praised mostly for speed.', 'Yard staff are praised for accuracy and low damage.', 1.0),
  q('DS_PEOPLE_03', 'People', ['service_inconsistency'], 'Staff handle customers in their own way.', 'Staff use minimum scripts to reduce confusion and disputes.', 0.9),
  q('DS_PEOPLE_04', 'People', ['cross_team_friction'], 'Conflicts are avoided to keep peace.', 'Conflicts are addressed early to protect output.', 0.9),
  q('DS_PEOPLE_05', 'People', ['incentive_misalignment'], 'Incentives are mostly sales-based.', 'Incentives include quality and margin metrics.', 1.0),
  q('DS_PEOPLE_06', 'People', ['onboarding_gap'], 'New hires learn mainly by shadowing.', 'New hires learn by checklist plus shadowing.', 1.0),
  q('DS_PEOPLE_07', 'People', ['blame_culture'], 'Mistakes are punished to prevent repeats.', 'Mistakes are analyzed to remove system causes.', 1.0),
  q('DS_PEOPLE_08', 'People', ['accountability_soft'], 'Performance reviews happen when problems arise.', 'Performance reviews happen routinely.', 0.9),
  q('DS_PEOPLE_09', 'People', ['hero_staff_dependence'], 'Customers depend on one trusted staff member.', 'Service is consistent regardless of who serves.', 1.0),
  q('DS_PEOPLE_10', 'People', ['blame_culture'], 'High performers are kept even if they break rules.', 'Standards are protected consistently.', 0.9)
];
