import { QuestionDefinition } from '../../types';

export const questions: QuestionDefinition[] = [
  // QUICK SCAN (2 per pillar)
  {
    qid: 'QS_OPS_01',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Operations',
    signal_tags: ['measurement_blindspot'],
    weight: 1.2,
    textA: 'We judge performance by busy days and visible activity.',
    textB: 'We judge performance by measured output (tons, recovery, downtime).'
  },
  {
    qid: 'QS_OPS_02',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Operations',
    signal_tags: ['flow_instability'],
    weight: 1.1,
    textA: 'We move material when space allows.',
    textB: 'We move material with checkpoints (pit to stockpile to sale) to prevent loss.'
  },
  {
    qid: 'QS_MONEY_01',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Money',
    signal_tags: ['costing_gap'],
    weight: 1.2,
    textA: 'We manage costs when cash gets tight.',
    textB: 'We track cost per ton so decisions stay profitable.'
  },
  {
    qid: 'QS_MONEY_02',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Money',
    signal_tags: ['cashflow_visibility_gap'],
    weight: 1.1,
    textA: 'Fuel and small purchases are hard to track but necessary.',
    textB: 'We reconcile fuel and tools because that is where profit leaks hide.'
  },
  {
    qid: 'QS_MARKET_01',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Market',
    signal_tags: ['channel_dependency'],
    weight: 1.2,
    textA: 'We mostly sell to the buyer we trust.',
    textB: 'We keep options so pricing does not get controlled.'
  },
  {
    qid: 'QS_MARKET_02',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Market',
    signal_tags: ['weak_proof_pack'],
    weight: 1.1,
    textA: 'Deductions happen; we accept them to keep moving.',
    textB: 'We verify weight and quality evidence to reduce surprise deductions.'
  },
  {
    qid: 'QS_LEAD_01',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Leadership',
    signal_tags: ['priority_whiplash'],
    weight: 1.1,
    textA: 'Decisions happen based on what problem is loudest today.',
    textB: 'Decisions follow the weekly KPI review and priorities.'
  },
  {
    qid: 'QS_LEAD_02',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Leadership',
    signal_tags: ['no_accountability_loop'],
    weight: 1.0,
    textA: 'Operations depend on a few key people being present.',
    textB: 'Operations run from clear owners and simple SOPs.'
  },
  {
    qid: 'QS_INNOV_01',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Innovation',
    signal_tags: ['quality_definition_gap'],
    weight: 1.0,
    textA: 'We focus on digging more to increase income.',
    textB: 'We focus on recovery and processing improvements to increase value per ton.'
  },
  {
    qid: 'QS_INNOV_02',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Innovation',
    signal_tags: ['no_product_testing_rhythm'],
    weight: 1.0,
    textA: 'We keep using tools that are familiar.',
    textB: 'We test small upgrades that reduce downtime and increase recovery.'
  },
  {
    qid: 'QS_RISK_01',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Risk',
    signal_tags: ['hygiene_drift'],
    weight: 1.2,
    textA: 'Safety is managed through common sense and experience.',
    textB: 'Safety is managed through routines (PPE, hazard checks, incident logs).'
  },
  {
    qid: 'QS_RISK_02',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Risk',
    signal_tags: ['compliance_blocker_risk'],
    weight: 1.1,
    textA: 'Documentation and compliance are handled when needed.',
    textB: 'Documentation is maintained so surprises do not shut us down.'
  },
  {
    qid: 'QS_PEOPLE_01',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'People',
    signal_tags: ['training_gap'],
    weight: 1.0,
    textA: 'Speed is the main indicator of a good worker.',
    textB: 'Discipline and recovery quality matter as much as speed.'
  },
  {
    qid: 'QS_PEOPLE_02',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'People',
    signal_tags: ['fear_index'],
    weight: 1.0,
    textA: 'Mistakes are fixed quietly to avoid conflict.',
    textB: 'Mistakes are logged so they do not repeat and drain money.'
  },

  // DEEP SCAN (10 per pillar)
  // Operations
  {
    qid: 'DS_OPS_01',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Operations',
    signal_tags: ['measurement_blindspot'],
    weight: 1.1,
    textA: 'Output is estimated informally.',
    textB: 'Output is measured daily and reconciled.'
  },
  {
    qid: 'DS_OPS_02',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Operations',
    signal_tags: ['quality_built_late'],
    weight: 1.1,
    textA: 'Recovery losses are assumed normal.',
    textB: 'Recovery is audited and improved.'
  },
  {
    qid: 'DS_OPS_03',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Operations',
    signal_tags: ['flow_instability'],
    weight: 1.0,
    textA: 'Material movement is not logged consistently.',
    textB: 'Material movement has checkpoints and logs.'
  },
  {
    qid: 'DS_OPS_04',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Operations',
    signal_tags: ['energy_burn_spiral'],
    weight: 1.0,
    textA: 'Fuel is issued without strict reconciliation.',
    textB: 'Fuel is tracked per unit and shift.'
  },
  {
    qid: 'DS_OPS_05',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Operations',
    signal_tags: ['wip_pileup'],
    weight: 1.0,
    textA: 'Stockpiles mix grades.',
    textB: 'Stockpiles are labeled and segregated.'
  },
  {
    qid: 'DS_OPS_06',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Operations',
    signal_tags: ['reactive_maintenance'],
    weight: 1.1,
    textA: 'Downtime repeats with the same causes.',
    textB: 'Downtime is prevented with PM routines.'
  },
  {
    qid: 'DS_OPS_07',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Operations',
    signal_tags: ['planning_gap'],
    weight: 1.0,
    textA: 'Wet season slows us unpredictably.',
    textB: 'Wet season is planned with access and water controls.'
  },
  {
    qid: 'DS_OPS_08',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Operations',
    signal_tags: ['bottleneck_bounce'],
    weight: 1.0,
    textA: 'Processing is always behind.',
    textB: 'Processing bottlenecks are identified and fixed.'
  },
  {
    qid: 'DS_OPS_09',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Operations',
    signal_tags: ['no_standard_work'],
    weight: 1.0,
    textA: 'Work changes daily based on emergencies.',
    textB: 'Work follows a weekly plan.'
  },
  {
    qid: 'DS_OPS_10',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Operations',
    signal_tags: ['weak_proof_pack'],
    weight: 1.0,
    textA: 'Evidence for shipments is inconsistent.',
    textB: 'Evidence packs are mandatory.'
  },

  // Money
  {
    qid: 'DS_MONEY_01',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Money',
    signal_tags: ['costing_gap'],
    weight: 1.2,
    textA: 'We do not know exact cost per ton.',
    textB: 'We track cost per ton monthly.'
  },
  {
    qid: 'DS_MONEY_02',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Money',
    signal_tags: ['cashflow_visibility_gap'],
    weight: 1.1,
    textA: 'Cash spends are hard to categorize.',
    textB: 'All spends are recorded and explained.'
  },
  {
    qid: 'DS_MONEY_03',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Money',
    signal_tags: ['waste_not_costed'],
    weight: 1.0,
    textA: 'Fuel and tool losses are tolerated.',
    textB: 'Fuel and tools are controlled because they kill margin.'
  },
  {
    qid: 'DS_MONEY_04',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Money',
    signal_tags: ['pricing_margin_blindspot'],
    weight: 1.0,
    textA: 'Pricing is decided mainly by buyer offer.',
    textB: 'Pricing is negotiated from our benchmarks and proof.'
  },
  {
    qid: 'DS_MONEY_05',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Money',
    signal_tags: ['discounting_leak'],
    weight: 1.0,
    textA: 'Deductions surprise us.',
    textB: 'Deductions are predicted and managed via terms.'
  },
  {
    qid: 'DS_MONEY_06',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Money',
    signal_tags: ['payment_delay_chokehold'],
    weight: 1.1,
    textA: 'Payment delays are accepted.',
    textB: 'Payment timing is enforced with gates and terms.'
  },
  {
    qid: 'DS_MONEY_07',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Money',
    signal_tags: ['credit_terms_risk'],
    weight: 1.0,
    textA: 'Debt is used to keep digging.',
    textB: 'Debt is used only for ROI improvements.'
  },
  {
    qid: 'DS_MONEY_08',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Money',
    signal_tags: ['purchase_panic'],
    weight: 1.0,
    textA: 'We invest in equipment when we feel pressure.',
    textB: 'We invest based on recovery and downtime ROI.'
  },
  {
    qid: 'DS_MONEY_09',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Money',
    signal_tags: ['tax_compliance_gap'],
    weight: 1.0,
    textA: 'Royalties and compliance costs are last-minute.',
    textB: 'Compliance costs are forecasted.'
  },
  {
    qid: 'DS_MONEY_10',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Money',
    signal_tags: ['pricing_margin_blindspot'],
    weight: 1.0,
    textA: 'Profit is judged by cash today.',
    textB: 'Profit is judged by margin and control.'
  },

  // Market
  {
    qid: 'DS_MARKET_01',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Market',
    signal_tags: ['channel_dependency'],
    weight: 1.2,
    textA: 'We sell mainly to one buyer.',
    textB: 'We maintain multiple buyer options.'
  },
  {
    qid: 'DS_MARKET_02',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Market',
    signal_tags: ['contract_gap'],
    weight: 1.0,
    textA: 'Buyer terms are informal.',
    textB: 'Buyer terms are written and clear.'
  },
  {
    qid: 'DS_MARKET_03',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Market',
    signal_tags: ['spec_drift_discount'],
    weight: 1.0,
    textA: 'Quality and grade are assumed.',
    textB: 'Quality is documented and consistent.'
  },
  {
    qid: 'DS_MARKET_04',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Market',
    signal_tags: ['weak_proof_pack'],
    weight: 1.0,
    textA: 'Disputes are common and emotional.',
    textB: 'Disputes are resolved with evidence.'
  },
  {
    qid: 'DS_MARKET_05',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Market',
    signal_tags: ['pricing_positioning_gap'],
    weight: 1.0,
    textA: 'We accept assay results without verification.',
    textB: 'We verify or use agreed methods.'
  },
  {
    qid: 'DS_MARKET_06',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Market',
    signal_tags: ['low_repeat_orders'],
    weight: 1.0,
    textA: 'We do not track repeat buyer behavior.',
    textB: 'We track buyer reliability and pricing patterns.'
  },
  {
    qid: 'DS_MARKET_07',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Market',
    signal_tags: ['buyer_power_trap'],
    weight: 1.1,
    textA: 'We sell immediately due to cash needs.',
    textB: 'We sell strategically when terms are best.'
  },
  {
    qid: 'DS_MARKET_08',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Market',
    signal_tags: ['value_story_gap'],
    weight: 0.9,
    textA: 'Reputation depends on relationships.',
    textB: 'Reputation depends on reliability and documentation.'
  },
  {
    qid: 'DS_MARKET_09',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Market',
    signal_tags: ['pricing_positioning_gap'],
    weight: 1.0,
    textA: 'We do not know market benchmarks consistently.',
    textB: 'Benchmarks are tracked weekly.'
  },
  {
    qid: 'DS_MARKET_10',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Market',
    signal_tags: ['buyer_power_trap'],
    weight: 1.1,
    textA: 'Buyers set the rules.',
    textB: 'We negotiate from our numbers and proof.'
  },

  // Leadership
  {
    qid: 'DS_LEAD_01',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Leadership',
    signal_tags: ['no_accountability_loop'],
    weight: 1.1,
    textA: 'Roles overlap; everyone helps.',
    textB: 'Each stage has an owner with KPIs.'
  },
  {
    qid: 'DS_LEAD_02',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Leadership',
    signal_tags: ['no_kpi_ownership'],
    weight: 1.0,
    textA: 'Weekly review is optional.',
    textB: 'Weekly review is non-negotiable.'
  },
  {
    qid: 'DS_LEAD_03',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Leadership',
    signal_tags: ['no_variance_review'],
    weight: 1.0,
    textA: 'Issues are fixed once and forgotten.',
    textB: 'Issues are logged and prevented.'
  },
  {
    qid: 'DS_LEAD_04',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Leadership',
    signal_tags: ['weak_goal_alignment'],
    weight: 1.0,
    textA: 'Standards change based on who is present.',
    textB: 'Standards are documented and enforced.'
  },
  {
    qid: 'DS_LEAD_05',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Leadership',
    signal_tags: ['priority_whiplash'],
    weight: 1.0,
    textA: 'Priorities shift daily.',
    textB: 'Priorities follow plan and KPIs.'
  },
  {
    qid: 'DS_LEAD_06',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Leadership',
    signal_tags: ['decision_bottleneck'],
    weight: 1.0,
    textA: 'Supervisors rely on shouting to manage.',
    textB: 'Supervisors manage through targets and checklists.'
  },
  {
    qid: 'DS_LEAD_07',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Leadership',
    signal_tags: ['weak_goal_alignment'],
    weight: 1.0,
    textA: 'Crew output expectations are unclear.',
    textB: 'Crew can state targets and rules daily.'
  },
  {
    qid: 'DS_LEAD_08',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Leadership',
    signal_tags: ['hiring_mismatch'],
    weight: 1.0,
    textA: 'Training is learn by watching.',
    textB: 'Training is structured and tested.'
  },
  {
    qid: 'DS_LEAD_09',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Leadership',
    signal_tags: ['fear_index'],
    weight: 0.9,
    textA: 'Trust is maintained through fear.',
    textB: 'Trust is maintained through clarity and fairness.'
  },
  {
    qid: 'DS_LEAD_10',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Leadership',
    signal_tags: ['management_by_memory'],
    weight: 1.0,
    textA: 'Results depend on one hero.',
    textB: 'Results depend on systems.'
  },

  // Innovation
  {
    qid: 'DS_INNOV_01',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Innovation',
    signal_tags: ['quality_definition_gap'],
    weight: 1.1,
    textA: 'We increase income by digging more.',
    textB: 'We increase income by improving recovery and value per ton.'
  },
  {
    qid: 'DS_INNOV_02',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Innovation',
    signal_tags: ['no_product_testing_rhythm'],
    weight: 1.0,
    textA: 'We rarely test improvements.',
    textB: 'We test one improvement monthly with KPIs.'
  },
  {
    qid: 'DS_INNOV_03',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Innovation',
    signal_tags: ['quality_definition_gap'],
    weight: 1.0,
    textA: 'Processing layout is as it is.',
    textB: 'Layout is optimized to reduce rehandling and loss.'
  },
  {
    qid: 'DS_INNOV_04',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Innovation',
    signal_tags: ['slow_bug_fix'],
    weight: 1.0,
    textA: 'Downtime is accepted.',
    textB: 'Downtime is reduced through PM and spares.'
  },
  {
    qid: 'DS_INNOV_05',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Innovation',
    signal_tags: ['no_market_feedback_loop'],
    weight: 0.9,
    textA: 'Data is scattered.',
    textB: 'Data is centralized into simple dashboards.'
  },
  {
    qid: 'DS_INNOV_06',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Innovation',
    signal_tags: ['quality_definition_gap'],
    weight: 1.0,
    textA: 'No templates or checklists.',
    textB: 'Templates and checklists drive consistency.'
  },
  {
    qid: 'DS_INNOV_07',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Innovation',
    signal_tags: ['pack_size_profit_blindspot'],
    weight: 1.0,
    textA: 'Incentives reward speed.',
    textB: 'Incentives reward recovery and discipline.'
  },
  {
    qid: 'DS_INNOV_08',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Innovation',
    signal_tags: ['quality_definition_gap'],
    weight: 0.9,
    textA: 'No benefit from grade separation.',
    textB: 'Grade separation improves price and reduces disputes.'
  },
  {
    qid: 'DS_INNOV_09',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Innovation',
    signal_tags: ['no_market_feedback_loop'],
    weight: 0.9,
    textA: 'No documentation systems.',
    textB: 'Document packs strengthen bargaining and compliance.'
  },
  {
    qid: 'DS_INNOV_10',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Innovation',
    signal_tags: ['complaint_echo'],
    weight: 0.9,
    textA: 'Learning does not carry forward.',
    textB: 'SOPs update each season.'
  },

  // Risk
  {
    qid: 'DS_RISK_01',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Risk',
    signal_tags: ['hygiene_drift'],
    weight: 1.1,
    textA: 'Safety is informal.',
    textB: 'Safety uses routines and logs.'
  },
  {
    qid: 'DS_RISK_02',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Risk',
    signal_tags: ['hygiene_drift'],
    weight: 1.0,
    textA: 'PPE is when available.',
    textB: 'PPE is enforced.'
  },
  {
    qid: 'DS_RISK_03',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Risk',
    signal_tags: ['compliance_blocker_risk'],
    weight: 1.0,
    textA: 'Compliance is handled when needed.',
    textB: 'Compliance readiness is maintained.'
  },
  {
    qid: 'DS_RISK_04',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Risk',
    signal_tags: ['traceability_gap'],
    weight: 1.1,
    textA: 'Chain-of-custody is weak.',
    textB: 'Chain-of-custody is documented.'
  },
  {
    qid: 'DS_RISK_05',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Risk',
    signal_tags: ['traceability_gap'],
    weight: 1.0,
    textA: 'Theft issues are suspected but hard to prove.',
    textB: 'Movement logs reduce theft and disputes.'
  },
  {
    qid: 'DS_RISK_06',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Risk',
    signal_tags: ['data_security_gap'],
    weight: 0.9,
    textA: 'Records are incomplete.',
    textB: 'Records are audit-ready.'
  },
  {
    qid: 'DS_RISK_07',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Risk',
    signal_tags: ['contract_gap'],
    weight: 1.0,
    textA: 'Contracts are informal.',
    textB: 'Terms are written.'
  },
  {
    qid: 'DS_RISK_08',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Risk',
    signal_tags: ['compliance_blocker_risk'],
    weight: 1.0,
    textA: 'Environmental risks are ignored.',
    textB: 'Environmental controls are planned.'
  },
  {
    qid: 'DS_RISK_09',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Risk',
    signal_tags: ['disaster_recovery_gap'],
    weight: 1.0,
    textA: 'Incidents are handled quietly.',
    textB: 'Incidents are logged and corrected.'
  },
  {
    qid: 'DS_RISK_10',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'Risk',
    signal_tags: ['insurance_gap'],
    weight: 0.9,
    textA: 'Security is reactive.',
    textB: 'Security is systematic.'
  },

  // People
  {
    qid: 'DS_PEOPLE_01',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'People',
    signal_tags: ['training_gap'],
    weight: 1.1,
    textA: 'Skill is assumed.',
    textB: 'Skills are trained and tested.'
  },
  {
    qid: 'DS_PEOPLE_02',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'People',
    signal_tags: ['fear_index'],
    weight: 1.0,
    textA: 'Mistakes are hidden.',
    textB: 'Mistakes are logged to prevent repeats.'
  },
  {
    qid: 'DS_PEOPLE_03',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'People',
    signal_tags: ['blame_culture'],
    weight: 1.0,
    textA: 'Speed is rewarded most.',
    textB: 'Recovery and discipline are rewarded.'
  },
  {
    qid: 'DS_PEOPLE_04',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'People',
    signal_tags: ['approval_bottleneck'],
    weight: 1.0,
    textA: 'Supervisors manage through pressure.',
    textB: 'Supervisors manage through clarity.'
  },
  {
    qid: 'DS_PEOPLE_05',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'People',
    signal_tags: ['role_clarity_gap'],
    weight: 1.0,
    textA: 'Handoffs are informal.',
    textB: 'Handoffs have checklists.'
  },
  {
    qid: 'DS_PEOPLE_06',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'People',
    signal_tags: ['onboarding_gap'],
    weight: 0.9,
    textA: 'New workers learn by watching.',
    textB: 'New workers onboard with standards.'
  },
  {
    qid: 'DS_PEOPLE_07',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'People',
    signal_tags: ['cross_function_breakdown'],
    weight: 0.9,
    textA: 'Fatigue is accepted.',
    textB: 'Work rhythm prevents fatigue errors.'
  },
  {
    qid: 'DS_PEOPLE_08',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'People',
    signal_tags: ['meeting_theater'],
    weight: 0.8,
    textA: 'Discipline varies by day.',
    textB: 'Discipline is consistent.'
  },
  {
    qid: 'DS_PEOPLE_09',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'People',
    signal_tags: ['hero_operator_dependence'],
    weight: 1.0,
    textA: 'Accountability exists only when money disappears.',
    textB: 'Accountability exists daily.'
  },
  {
    qid: 'DS_PEOPLE_10',
    industry: 'mining',
    line_type: ['all'],
    pillar: 'People',
    signal_tags: ['low_psych_safety'],
    weight: 1.0,
    textA: 'Culture is blame-driven.',
    textB: 'Culture is improvement-driven.'
  }
];
