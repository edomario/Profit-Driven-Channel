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
  q('QS_OPS_01', 'Operations', ['inventory_accuracy_gap'], 'When a customer asks for a model, I quickly check around the shelves.', 'I check a simple list/system to confirm stock before I speak.', 1.1),
  q('QS_OPS_02', 'Operations', ['no_standard_work'], 'Repairs are tracked mostly by memory and WhatsApp messages.', 'Repairs are tracked using a job card or log with clear stages.', 1.1),

  q('QS_MONEY_01', 'Money', ['pricing_margin_blindspot'], 'I feel the business is doing well when cash moved a lot today.', 'I feel the business is doing well when I can explain today\'s margin clearly.', 1.0),
  q('QS_MONEY_02', 'Money', ['discounting_leak'], 'Discounts depend on the conversation and urgency.', 'Discounts follow a small rule with bands and approval limits.', 1.0),

  q('QS_MARKET_01', 'Market', ['followup_gap'], 'Most customers are one-time buyers unless they return by chance.', 'We have a small follow-up habit that brings people back.', 1.0),
  q('QS_MARKET_02', 'Market', ['value_story_gap'], 'Customers mostly choose us because of price.', 'Customers mostly choose us because they trust our clarity and service.', 1.0),

  q('QS_LEAD_01', 'Leadership', ['no_variance_review'], 'When things go wrong, we talk it out until everyone understands.', 'When things go wrong, we change a small system so it stops repeating.', 1.0),
  q('QS_LEAD_02', 'Leadership', ['decision_bottleneck'], 'Decisions usually wait for one key person.', 'Decisions are guided by simple rules even when the owner is away.', 1.1),

  q('QS_INNOV_01', 'Innovation', ['no_testing_rhythm'], 'We keep selling what has always sold; changing offers feels risky.', 'We test small offers and bundles to increase profit safely.', 1.0),
  q('QS_INNOV_02', 'Innovation', ['offer_measurement_gap'], 'Display arrangement is mostly based on what looks neat.', 'Display arrangement is based on what converts and moves fast.', 1.0),

  q('QS_RISK_01', 'Risk', ['supplier_doc_gap'], 'We mostly trust supplier and device story as long as it looks okay.', 'We verify key details (IMEI, condition, parts source) as routine.', 1.1),
  q('QS_RISK_02', 'Risk', ['policy_vagueness'], 'Warranty terms are explained verbally depending on the situation.', 'Warranty terms are written so disputes reduce.', 1.0),

  q('QS_PEOPLE_01', 'People', ['training_gap'], 'Good staff learn mainly by observing and adapting.', 'Good staff learn through a short checklist and coaching.', 1.0),
  q('QS_PEOPLE_02', 'People', ['incentive_misalignment'], 'Sales performance is mainly measured by money collected and deals closed.', 'Sales performance includes returns, attach rate, and margin quality.', 1.0),

  // DEEP SCAN (10 per pillar)
  // Operations
  q('DS_OPS_01', 'Operations', ['inventory_accuracy_gap'], 'We locate phones by remembering where they were placed.', 'We locate phones using labels/sections or a simple log.', 1.0),
  q('DS_OPS_02', 'Operations', ['receiving_slippage'], 'New stock is added to shelves first and recorded later.', 'New stock is recorded first and then displayed.', 1.0),
  q('DS_OPS_03', 'Operations', ['restock_delay'], 'We notice missing accessories when customers ask.', 'We notice missing accessories through a routine count of fast movers.', 1.0),
  q('DS_OPS_04', 'Operations', ['returns_damage_blindspot'], 'A phone is ready to sell once it powers on.', 'A phone is ready to sell after a short quality checklist test.', 1.0),
  q('DS_OPS_05', 'Operations', ['no_standard_work'], 'Repairs are tracked by conversation threads.', 'Repairs are tracked by status steps from intake to handover.', 1.0),
  q('DS_OPS_06', 'Operations', ['supplier_doc_gap'], 'Parts are used if they fit and work.', 'Parts are used if they fit, work, and pass a sourcing rule.', 1.0),
  q('DS_OPS_07', 'Operations', ['policy_vagueness'], 'Returns are handled after urgent dispatches.', 'Returns follow a standard flow and are logged by reason.', 1.0),
  q('DS_OPS_08', 'Operations', ['receiving_slippage'], 'Staff handle receiving based on experience.', 'Staff handle receiving using a short checklist.', 1.0),
  q('DS_OPS_09', 'Operations', ['restock_delay'], 'We reorder accessories when the shelf looks empty.', 'We reorder accessories when top items hit a defined low point.', 1.0),
  q('DS_OPS_10', 'Operations', ['hero_staff_dependence'], 'If the owner is away, operations slow down.', 'If the owner is away, workflow still runs consistently.', 1.0),

  // Money
  q('DS_MONEY_01', 'Money', ['pricing_inconsistency'], 'I price based on the day\'s market mood and customer pressure.', 'I price from a baseline list with controlled flexibility.', 1.0),
  q('DS_MONEY_02', 'Money', ['discounting_leak'], 'Discounts are used to end negotiations quickly.', 'Discounts are used when they protect volume and margin.', 1.0),
  q('DS_MONEY_03', 'Money', ['pricing_margin_blindspot'], 'I know profit by feel after paying bills.', 'I know profit using a simple daily or weekly margin view.', 1.0),
  q('DS_MONEY_04', 'Money', ['cash_recon_gap'], 'Cash and momo are checked when something feels off.', 'Cash and momo are reconciled daily as routine.', 1.0),
  q('DS_MONEY_05', 'Money', ['returns_damage_blindspot'], 'Refunds and returns are handled case by case without logs.', 'Refunds and returns are logged so patterns become visible.', 1.0),
  q('DS_MONEY_06', 'Money', ['policy_vagueness'], 'Warranty issues are treated as customer service moments only.', 'Warranty issues are tracked as measurable cost signals.', 1.0),
  q('DS_MONEY_07', 'Money', ['credit_terms_risk'], 'Installment sales happen when the customer seems trustworthy.', 'Installment sales happen with deposit, terms, and limits.', 1.0),
  q('DS_MONEY_08', 'Money', ['payment_terms_risk'], 'Supplier debt is paid when pressure comes.', 'Supplier payments follow a plan aligned to cash cycle.', 0.9),
  q('DS_MONEY_09', 'Money', ['pricing_margin_blindspot'], 'Repairs are priced mainly by competitor rates.', 'Repairs are priced by parts, time, risk, and warranty tier.', 1.0),
  q('DS_MONEY_10', 'Money', ['slow_mover_attachment'], 'We buy stock whenever we see a good deal.', 'We buy stock when it matches movement and cash reality.', 1.0),

  // Market
  q('DS_MARKET_01', 'Market', ['followup_gap'], 'We assume customers will return if they liked us.', 'We run a small follow-up habit so they return.', 1.0),
  q('DS_MARKET_02', 'Market', ['followup_gap'], 'Our marketing is mostly being visible and waiting.', 'Our marketing includes capturing and nurturing leads.', 1.0),
  q('DS_MARKET_03', 'Market', ['segment_blindspot'], 'We rely on walk-ins and referrals mostly.', 'We track which channels bring better buyers.', 0.9),
  q('DS_MARKET_04', 'Market', ['value_story_gap'], 'Customers mainly ask about price first.', 'Customers mainly ask about trust, condition, and warranty clarity.', 1.0),
  q('DS_MARKET_05', 'Market', ['followup_gap'], 'We do not record who bought what.', 'We record buyer basics for repeat and upsell.', 1.0),
  q('DS_MARKET_06', 'Market', ['bundle_engine_missing'], 'Accessory selling depends on each staff mood and timing.', 'Accessory selling follows a simple attach script.', 1.0),
  q('DS_MARKET_07', 'Market', ['value_story_gap'], 'We do not actively request reviews.', 'We request reviews as part of the process.', 0.9),
  q('DS_MARKET_08', 'Market', ['pricing_positioning_gap'], 'We sell many categories without a clear identity.', 'We lead with one clear identity and trust promise.', 1.0),
  q('DS_MARKET_09', 'Market', ['followup_gap'], 'Online inquiries are answered when free.', 'Online inquiries follow templates and response-time targets.', 1.0),
  q('DS_MARKET_10', 'Market', ['complaint_handling_gap'], 'Complaints are handled privately and forgotten.', 'Complaints are logged and used to improve the system.', 1.0),

  // Leadership
  q('DS_LEAD_01', 'Leadership', ['kpi_cadence_gap'], 'Targets are discussed verbally.', 'Targets are visible and tracked.', 1.0),
  q('DS_LEAD_02', 'Leadership', ['no_variance_review'], 'Problems are solved by working harder.', 'Problems are solved by changing the workflow.', 1.0),
  q('DS_LEAD_03', 'Leadership', ['decision_bottleneck'], 'Exceptions require the owner most times.', 'Exceptions follow a rulebook.', 1.0),
  q('DS_LEAD_04', 'Leadership', ['training_planning_gap'], 'Staff learn mostly by observation.', 'Staff learn through short training and checklists.', 1.0),
  q('DS_LEAD_05', 'Leadership', ['accountability_soft'], 'Performance is judged by effort and loyalty.', 'Performance is judged by outcomes and quality.', 1.0),
  q('DS_LEAD_06', 'Leadership', ['meeting_no_action'], 'Meetings are the main way we align.', 'Dashboards reduce meetings because truth stays visible.', 0.9),
  q('DS_LEAD_07', 'Leadership', ['fear_silence'], 'Mistakes lead to blame so people do not repeat them.', 'Mistakes lead to root cause so process improves.', 1.0),
  q('DS_LEAD_08', 'Leadership', ['role_clarity_gap'], 'Delegation means giving tasks.', 'Delegation means giving ownership of outcomes.', 0.9),
  q('DS_LEAD_09', 'Leadership', ['policy_vagueness'], 'Everyone can change pricing if needed.', 'Pricing changes follow clear limits.', 1.0),
  q('DS_LEAD_10', 'Leadership', ['fear_silence'], 'Staff feedback is rare to avoid tension.', 'Staff feedback is frequent to improve quality.', 0.9),

  // Innovation
  q('DS_INNOV_01', 'Innovation', ['bundle_engine_missing'], 'Bundles are offered when customers ask.', 'Bundles are offered as a default option.', 1.0),
  q('DS_INNOV_02', 'Innovation', ['no_testing_rhythm'], 'We copy offers from nearby shops.', 'We test offers based on our buyer behavior.', 1.0),
  q('DS_INNOV_03', 'Innovation', ['offer_measurement_gap'], 'Display is rearranged occasionally.', 'Display is optimized using sales evidence.', 0.9),
  q('DS_INNOV_04', 'Innovation', ['slow_mover_attachment'], 'We hesitate to stop slow movers.', 'We clear slow movers routinely to free cash.', 1.0),
  q('DS_INNOV_05', 'Innovation', ['pricing_inconsistency'], 'Repairs are one-price-fits-all.', 'Repairs have clear tiers by speed and warranty.', 1.0),
  q('DS_INNOV_06', 'Innovation', ['offer_measurement_gap'], 'We avoid new systems because they may slow us.', 'We adopt small systems that remove repeat mistakes.', 0.9),
  q('DS_INNOV_07', 'Innovation', ['training_planning_gap'], 'Training is informal.', 'Training is planned in short weekly sessions.', 0.9),
  q('DS_INNOV_08', 'Innovation', ['no_market_feedback_loop'], 'We rely on memory for customer history.', 'We store customer history to improve selling.', 1.0),
  q('DS_INNOV_09', 'Innovation', ['no_testing_rhythm'], 'We rarely run experiments.', 'We run small experiments monthly.', 1.0),
  q('DS_INNOV_10', 'Innovation', ['value_story_gap'], 'We focus on selling products only.', 'We focus on selling confidence and experience.', 0.9),

  // Risk
  q('DS_RISK_01', 'Risk', ['supplier_doc_gap'], 'Devices are accepted if they look clean and work.', 'Devices are accepted after key verification steps.', 1.1),
  q('DS_RISK_02', 'Risk', ['supplier_doc_gap'], 'IMEI and serial are recorded when needed.', 'IMEI and serial are recorded always.', 1.1),
  q('DS_RISK_03', 'Risk', ['policy_vagueness'], 'Warranty is flexible to satisfy customers.', 'Warranty is clear and written to reduce disputes.', 1.0),
  q('DS_RISK_04', 'Risk', ['supplier_selection_undisciplined'], 'Parts sourcing is based on availability.', 'Parts sourcing follows trusted supplier rules.', 1.0),
  q('DS_RISK_05', 'Risk', ['shrinkage_leak'], 'High-value stock is accessible to many staff.', 'High-value stock access is controlled.', 1.0),
  q('DS_RISK_06', 'Risk', ['contract_gap'], 'Refund decisions are negotiated each time.', 'Refund decisions follow defined steps.', 0.9),
  q('DS_RISK_07', 'Risk', ['inventory_accuracy_gap'], 'Stock counts happen when something is missing.', 'Stock counts happen as routine.', 1.0),
  q('DS_RISK_08', 'Risk', ['cash_recon_gap'], 'Cash handling relies on trust.', 'Cash handling relies on controls and reconciliation.', 1.0),
  q('DS_RISK_09', 'Risk', ['data_security_gap'], 'Customer records are stored in chats.', 'Customer records are stored in a secure place.', 0.9),
  q('DS_RISK_10', 'Risk', ['no_variance_review'], 'Security incidents are handled quietly.', 'Security incidents are logged and prevented systematically.', 1.0),

  // People
  q('DS_PEOPLE_01', 'People', ['incentive_misalignment'], 'Sales is rewarded mostly for closing deals.', 'Sales is rewarded for deals that do not bounce back as returns.', 1.0),
  q('DS_PEOPLE_02', 'People', ['accountability_soft'], 'Technicians are praised mostly for speed.', 'Technicians are praised for first-time fix quality.', 1.0),
  q('DS_PEOPLE_03', 'People', ['service_inconsistency'], 'Staff handle customers in their own style.', 'Staff use minimum trust and clarity scripts.', 0.9),
  q('DS_PEOPLE_04', 'People', ['cross_team_friction'], 'Conflicts are avoided to keep peace.', 'Conflicts are surfaced early to protect output.', 0.9),
  q('DS_PEOPLE_05', 'People', ['training_planning_gap'], 'Training is optional.', 'Training is routine.', 1.0),
  q('DS_PEOPLE_06', 'People', ['onboarding_gap'], 'New hires learn by shadowing only.', 'New hires learn through checklist plus shadowing.', 1.0),
  q('DS_PEOPLE_07', 'People', ['blame_culture'], 'Mistakes are punished.', 'Mistakes are analyzed.', 1.0),
  q('DS_PEOPLE_08', 'People', ['accountability_soft'], 'Staff performance is reviewed when problems arise.', 'Staff performance is reviewed routinely.', 0.9),
  q('DS_PEOPLE_09', 'People', ['hero_staff_dependence'], 'Customers depend on one trusted staff member.', 'Shop experience is consistent regardless of who serves.', 1.0),
  q('DS_PEOPLE_10', 'People', ['blame_culture'], 'High performers are kept even if they create issues.', 'Culture is protected even when hard decisions are needed.', 0.9)
];
