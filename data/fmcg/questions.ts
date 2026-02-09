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
  q('QS_OPS_01', 'Operations', ['restock_delay'], 'When stock is low, I reorder based on what customers asked for recently.', 'When stock is low, I reorder based on reorder rules and fast-mover thresholds.', 1.1),
  q('QS_OPS_02', 'Operations', ['dispatch_delivery_instability'], 'On delivery days, we adjust routes based on who is calling urgently.', 'On delivery days, we mostly follow planned routes and handle urgencies by exception.', 1.0),

  q('QS_MONEY_01', 'Money', ['credit_terms_risk'], 'I am comfortable giving credit when I trust the relationship.', 'I am comfortable giving credit when limits and terms are clear and enforced.', 1.0),
  q('QS_MONEY_02', 'Money', ['discounting_leak'], 'I use discounts when I feel it will secure the order quickly.', 'I use discounts when it fits a planned strategy and margin still holds.', 1.1),

  q('QS_MARKET_01', 'Market', ['value_story_gap'], 'Customers stay mainly because they know us and we relate well.', 'Customers stay mainly because service is consistent: availability and delivery reliability.', 1.0),
  q('QS_MARKET_02', 'Market', ['followup_gap'], 'We focus on gaining new outlets whenever the team has time.', 'We focus on protecting repeat orders first, then gaining new outlets.', 1.0),

  q('QS_LEAD_01', 'Leadership', ['no_variance_review'], 'We solve issues as they arise and move on quickly.', 'We solve issues and document fixes so they do not repeat.', 1.0),
  q('QS_LEAD_02', 'Leadership', ['decision_bottleneck'], 'Most decisions come to me because I see the full picture.', 'Some decisions are delegated with limits so work moves without waiting.', 1.1),

  q('QS_INNOV_01', 'Innovation', ['no_testing_rhythm'], 'We improve by experience and doing what seems practical.', 'We improve by running small tests and keeping what proves results.', 1.0),
  q('QS_INNOV_02', 'Innovation', ['offer_measurement_gap'], 'We use tools/apps when necessary, but the team can manage without them.', 'We use tools/apps where they prevent errors and increase speed.', 1.0),

  q('QS_RISK_01', 'Risk', ['shrinkage_leak'], 'We notice shrinkage when stock just seems to reduce.', 'We notice shrinkage through cycle counts and variance tracking.', 1.1),
  q('QS_RISK_02', 'Risk', ['contract_gap'], 'Disputes are handled case-by-case depending on the customer.', 'Disputes are handled with proof-of-delivery and a clear policy.', 1.0),

  q('QS_PEOPLE_01', 'People', ['hero_staff_dependence'], 'The best performers keep things moving because they know the work well.', 'The best performers keep things moving because the system supports anyone to perform well.', 1.0),
  q('QS_PEOPLE_02', 'People', ['incentive_misalignment'], 'Sales reps are mainly judged by how much they sell.', 'Sales reps are judged by sales plus collections and service discipline.', 1.0),

  // DEEP SCAN (10 per pillar)
  // Operations
  q('DS_OPS_01', 'Operations', ['restock_delay'], 'We detect stock needs when customers start asking more.', 'We detect stock needs through reorder alerts and fast-mover rules.', 1.0),
  q('DS_OPS_02', 'Operations', ['receiving_slippage'], 'Receiving is mainly confirm quantity and store quickly.', 'Receiving includes checks for pack size, damage, and SKU accuracy.', 1.0),
  q('DS_OPS_03', 'Operations', ['inventory_accuracy_gap'], 'Items are stored where space is available.', 'Items are stored by location logic so picking stays fast and accurate.', 1.0),
  q('DS_OPS_04', 'Operations', ['dispatch_delivery_instability'], 'Picking depends on who is on shift.', 'Picking follows a consistent pick-pack-check routine.', 1.0),
  q('DS_OPS_05', 'Operations', ['inventory_accuracy_gap'], 'Stock counts happen when we suspect an issue.', 'Stock counts happen on a scheduled cycle count plan.', 1.0),
  q('DS_OPS_06', 'Operations', ['expiry_rotation_gap'], 'Near-expiry items are noticed when they become slow to move.', 'Near-expiry items are flagged early and actioned through push/transfer/markdown.', 1.0),
  q('DS_OPS_07', 'Operations', ['returns_damage_blindspot'], 'Returns are handled after urgent dispatches.', 'Returns are quarantined and processed quickly to protect inventory truth.', 1.0),
  q('DS_OPS_08', 'Operations', ['dispatch_delivery_instability'], 'Delivery routes change often due to urgent calls.', 'Delivery routes are planned and urgencies are managed with a controlled exception rule.', 1.0),
  q('DS_OPS_09', 'Operations', ['dispatch_delivery_instability'], 'Dispatch speed matters most.', 'Dispatch accuracy matters most because corrections cost more than speed.', 1.0),
  q('DS_OPS_10', 'Operations', ['contract_gap'], 'We use informal notes to track deliveries.', 'We use structured POD confirmations to reduce disputes.', 1.0),

  // Money
  q('DS_MONEY_01', 'Money', ['pricing_inconsistency'], 'Pricing changes depending on the conversation.', 'Pricing follows bands and approval boundaries.', 1.0),
  q('DS_MONEY_02', 'Money', ['discounting_leak'], 'Discounts are used when stock is high or sales are slow.', 'Discounts are used when a planned promo still protects margin.', 1.0),
  q('DS_MONEY_03', 'Money', ['payment_terms_risk'], 'Credit is mainly a relationship tool.', 'Credit is a controlled tool with limits, terms, and consequences.', 1.1),
  q('DS_MONEY_04', 'Money', ['payment_delay_chokehold'], 'Collections happen when cash is urgently needed.', 'Collections happen weekly through an agreed cadence.', 1.0),
  q('DS_MONEY_05', 'Money', ['pricing_margin_blindspot'], 'I judge a good month by sales volume.', 'I judge a good month by profit and cash collected.', 1.1),
  q('DS_MONEY_06', 'Money', ['returns_damage_blindspot'], 'Returns and damages are part of business.', 'Returns and damages are measured and reduced as a margin project.', 1.0),
  q('DS_MONEY_07', 'Money', ['slow_mover_attachment'], 'We buy slow items if supplier pricing looks attractive.', 'We buy slow items only when data shows movement.', 1.0),
  q('DS_MONEY_08', 'Money', ['category_margin_blindspot'], 'Fuel costs are treated as a general expense.', 'Fuel costs are tracked per route and drop to reveal leakage.', 1.0),
  q('DS_MONEY_09', 'Money', ['cash_recon_gap'], 'Cash is reconciled when time allows.', 'Cash is reconciled daily because small variances become big leaks.', 1.0),
  q('DS_MONEY_10', 'Money', ['offer_measurement_gap'], 'Promo spending is decided by opportunity.', 'Promo spending is tracked through ROI.', 0.9),

  // Market
  q('DS_MARKET_01', 'Market', ['value_story_gap'], 'Customers trust us mainly because they know us personally.', 'Customers trust us mainly because service remains consistent.', 1.0),
  q('DS_MARKET_02', 'Market', ['followup_gap'], 'We visit outlets when there is a need.', 'We visit outlets on a planned cadence by segment.', 1.0),
  q('DS_MARKET_03', 'Market', ['service_inconsistency'], 'Merchandising happens when we have time.', 'Merchandising is a routine tied to key SKUs.', 0.9),
  q('DS_MARKET_04', 'Market', ['followup_gap'], 'We focus on increasing outlets.', 'We focus on increasing repeat orders and basket size.', 1.0),
  q('DS_MARKET_05', 'Market', ['complaint_handling_gap'], 'Complaints are solved through quick calls.', 'Complaints are logged and reduced through root-cause fixes.', 1.0),
  q('DS_MARKET_06', 'Market', ['segment_blindspot'], 'We serve all customer types similarly.', 'We tailor service by customer segment.', 0.9),
  q('DS_MARKET_07', 'Market', ['channel_dependency'], 'We depend on 1-2 big customers to stabilize volume.', 'We diversify customers to reduce concentration risk.', 1.1),
  q('DS_MARKET_08', 'Market', ['no_market_feedback_loop'], 'We assume customers order what they need.', 'We proactively recommend replenishment from buying patterns.', 1.0),
  q('DS_MARKET_09', 'Market', ['pricing_margin_blindspot'], 'We measure success by total sales.', 'We measure success by repeat rate, availability, and collections.', 1.0),
  q('DS_MARKET_10', 'Market', ['pricing_positioning_gap'], 'We react when competitors undercut price.', 'We compete through availability, reliability, and value bundles.', 1.0),

  // Leadership
  q('DS_LEAD_01', 'Leadership', ['no_variance_review'], 'When issues happen, we fix quickly and move on.', 'When issues happen, we fix and update the playbook.', 1.0),
  q('DS_LEAD_02', 'Leadership', ['decision_bottleneck'], 'People ask me before making decisions to avoid mistakes.', 'People decide within limits so work continues without waiting.', 1.0),
  q('DS_LEAD_03', 'Leadership', ['priority_whiplash'], 'Targets shift when market conditions change.', 'Targets stay stable enough to build discipline and learning.', 0.9),
  q('DS_LEAD_04', 'Leadership', ['meeting_no_action'], 'Meetings help us align.', 'Dashboards reduce meetings because the truth is visible.', 0.9),
  q('DS_LEAD_05', 'Leadership', ['cross_team_friction'], 'Sales and warehouse work in parallel.', 'Sales and warehouse share KPIs to reduce conflict.', 1.0),
  q('DS_LEAD_06', 'Leadership', ['incentive_misalignment'], 'Incentives reward volume.', 'Incentives reward profitable volume plus collections and reliability.', 1.0),
  q('DS_LEAD_07', 'Leadership', ['fear_silence'], 'Errors are handled quietly to maintain harmony.', 'Errors are surfaced early to prevent costly repeats.', 1.0),
  q('DS_LEAD_08', 'Leadership', ['training_planning_gap'], 'Training is informal: learn by watching.', 'Training is structured with SOP check-offs.', 0.9),
  q('DS_LEAD_09', 'Leadership', ['approval_bottleneck'], 'The business feels stable when I am present.', 'The business feels stable because routines run without me.', 1.0),
  q('DS_LEAD_10', 'Leadership', ['no_kpi_ownership'], 'We judge performance by effort.', 'We judge performance by measurable outcomes.', 1.0),

  // Innovation
  q('DS_INNOV_01', 'Innovation', ['no_testing_rhythm'], 'We improve by experience and instinct.', 'We improve by testing small changes and tracking results.', 1.0),
  q('DS_INNOV_02', 'Innovation', ['sku_clutter'], 'New SKUs are added when customers request them.', 'New SKUs are added after movement and margin tests.', 1.0),
  q('DS_INNOV_03', 'Innovation', ['slow_mover_attachment'], 'We keep slow movers just in case.', 'We rationalize SKUs to protect cash and focus.', 1.0),
  q('DS_INNOV_04', 'Innovation', ['offer_measurement_gap'], 'We adopt tech when problems become painful.', 'We adopt tech early where it prevents repeat errors.', 0.9),
  q('DS_INNOV_05', 'Innovation', ['offer_measurement_gap'], 'Promotions are planned around pressure periods.', 'Promotions run as measured experiments with clear learning.', 1.0),
  q('DS_INNOV_06', 'Innovation', ['no_market_feedback_loop'], 'We rely on reps to remember customer details.', 'We store customer patterns in a system to scale.', 0.9),
  q('DS_INNOV_07', 'Innovation', ['bundle_engine_missing'], 'Delivery disputes are solved through calls and negotiation.', 'Disputes are reduced by improving POD discipline and policy clarity.', 0.9),
  q('DS_INNOV_08', 'Innovation', ['planning_gap'], 'We prioritize growth first and systems later.', 'We build systems alongside growth so growth does not create chaos.', 1.0),
  q('DS_INNOV_09', 'Innovation', ['offer_measurement_gap'], 'We measure innovation by number of ideas.', 'We measure innovation by measurable leak reduction.', 0.9),
  q('DS_INNOV_10', 'Innovation', ['training_planning_gap'], 'We assume staff adapt to changes naturally.', 'We roll out changes with training and simple checklists.', 0.9),

  // Risk
  q('DS_RISK_01', 'Risk', ['shrinkage_leak'], 'Shrinkage is expected in business.', 'Shrinkage is measured and treated as preventable leakage.', 1.1),
  q('DS_RISK_02', 'Risk', ['inventory_accuracy_gap'], 'Stock access is flexible so work moves fast.', 'Stock access is controlled so accountability stays clear.', 1.0),
  q('DS_RISK_03', 'Risk', ['credit_contract_gap'], 'Credit defaults are part of sales risk.', 'Credit defaults are reduced through limits and collections rhythm.', 1.0),
  q('DS_RISK_04', 'Risk', ['contract_gap'], 'Disputes are handled through relationships.', 'Disputes are handled through POD and defined rules.', 1.0),
  q('DS_RISK_05', 'Risk', ['supplier_doc_gap'], 'Supplier authenticity is assumed.', 'Supplier authenticity is verified through approved lists and checks.', 1.0),
  q('DS_RISK_06', 'Risk', ['cash_recon_gap'], 'Cash handling is trusted.', 'Cash handling is controlled by segregation and reconciliation.', 1.0),
  q('DS_RISK_07', 'Risk', ['no_variance_review'], 'Incidents are solved but not logged.', 'Incidents are logged so patterns are removed.', 0.9),
  q('DS_RISK_08', 'Risk', ['policy_vagueness'], 'Returns are accepted to keep customers happy.', 'Returns are accepted with policy to avoid abuse.', 0.9),
  q('DS_RISK_09', 'Risk', ['no_variance_review'], 'Stock discrepancies are corrected quietly.', 'Stock discrepancies are investigated to prevent repeat.', 1.0),
  q('DS_RISK_10', 'Risk', ['role_clarity_gap'], 'We rely on good staff to avoid losses.', 'We rely on controls so losses reduce even when staff changes.', 1.0),

  // People
  q('DS_PEOPLE_01', 'People', ['role_clarity_gap'], 'Reps are trusted to manage customers in their own way.', 'Reps follow a cadence so performance is consistent.', 1.0),
  q('DS_PEOPLE_02', 'People', ['accountability_soft'], 'Collections depend on each rep relationship style.', 'Collections follow an agreed schedule and escalation routine.', 1.0),
  q('DS_PEOPLE_03', 'People', ['service_inconsistency'], 'Drivers handle delivery issues on the spot.', 'Drivers follow POD routines to reduce disputes.', 1.0),
  q('DS_PEOPLE_04', 'People', ['training_gap'], 'Warehouse training happens mostly through experience.', 'Warehouse training follows SOP plus check-offs.', 1.0),
  q('DS_PEOPLE_05', 'People', ['hero_staff_dependence'], 'Strong people carry the team.', 'Systems help average people perform strongly and consistently.', 0.9),
  q('DS_PEOPLE_06', 'People', ['incentive_misalignment'], 'Incentives reward sales volume.', 'Incentives reward sales, collections, and service discipline.', 1.0),
  q('DS_PEOPLE_07', 'People', ['fear_silence'], 'Mistakes are corrected quietly to avoid conflict.', 'Mistakes are used to improve process reliability.', 1.0),
  q('DS_PEOPLE_08', 'People', ['accountability_soft'], 'We keep staff mostly based on loyalty.', 'We keep staff based on reliability and accuracy outcomes.', 0.9),
  q('DS_PEOPLE_09', 'People', ['cross_team_friction'], 'Performance varies by supervision and mood.', 'Performance stays stable because routines are clear.', 1.0),
  q('DS_PEOPLE_10', 'People', ['fear_silence'], 'People avoid reporting issues to keep peace.', 'People report issues early because prevention is rewarded.', 1.0)
];
