import { ActionDefinition, PillarId, SignalTag } from '../../types';

type BusinessSize = 'solo' | 'micro' | 'small' | 'small_med' | 'medium' | 'large' | 'enterprise';

interface PackDef {
  code: string;
  pillar: PillarId;
  signal_tags: SignalTag[];
  title7: string;
  title30: string;
  kpi7: string;
  kpi30: string;
  proof7: string[];
  proof30: string[];
  impact7: number;
  impact30: number;
}

const ownerMap: Record<BusinessSize, string> = {
  solo: 'Owner',
  micro: 'Owner',
  small: 'Store Manager',
  small_med: 'Store Manager',
  medium: 'Department Lead',
  large: 'Department Lead',
  enterprise: 'Function Head'
};

const packs: PackDef[] = [
  // Operations
  {
    code: 'OPS-P1',
    pillar: 'Operations',
    signal_tags: ['inventory_accuracy_gap', 'stockout_tax', 'restock_delay'],
    title7: 'SKU-Size Truth + Top-20 Fast Mover Counts',
    title30: 'SKU-Size Matrix + Reorder Triggers by Size/Color',
    kpi7: 'stockout_rate_top20',
    kpi30: 'inventory_accuracy',
    proof7: ['top20_sheet', 'daily_size_count_log'],
    proof30: ['sku_size_matrix', 'reorder_rules'],
    impact7: 9,
    impact30: 10
  },
  {
    code: 'OPS-P2',
    pillar: 'Operations',
    signal_tags: ['no_standard_work', 'pricing_inconsistency'],
    title7: 'No Tag No Floor + Tagging Station Discipline',
    title30: 'Tag Standard + Daily Tag Audits',
    kpi7: 'untagged_items_count',
    kpi30: 'price_dispute_rate',
    proof7: ['tag_station_photo', 'untagged_exception_log'],
    proof30: ['tag_standard', 'tag_audit_log'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'OPS-P3',
    pillar: 'Operations',
    signal_tags: ['offer_measurement_gap', 'no_market_feedback_loop'],
    title7: 'Catalogue Machine (Receive > Tag > Photo > List)',
    title30: 'Drop Calendar + Content Templates',
    kpi7: 'catalogue_completeness',
    kpi30: 'online_conversion_rate',
    proof7: ['arrival_catalogue_log', 'listing_links'],
    proof30: ['drop_calendar', 'content_template_pack'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'OPS-P4',
    pillar: 'Operations',
    signal_tags: ['safe_handling_gap', 'shrinkage_leak'],
    title7: 'Fitting Room Count-In-Out + Damage Prevention Rule',
    title30: 'Try-On Styling Flow + Fitting Conversion Tracking',
    kpi7: 'fitting_room_incidents',
    kpi30: 'fitting_conversion_rate',
    proof7: ['fitting_policy', 'incident_log'],
    proof30: ['style_assist_script', 'fitting_conversion_sheet'],
    impact7: 8,
    impact30: 8
  },
  {
    code: 'OPS-P5',
    pillar: 'Operations',
    signal_tags: ['slow_mover_attachment'],
    title7: 'Dead Rack Identification + Rack Reset',
    title30: 'Dead Stock Markdown Ladder + Bundle Recovery Plan',
    kpi7: 'dead_stock_value',
    kpi30: 'sell_through_30d',
    proof7: ['dead_rack_list', 'before_after_rack_photos'],
    proof30: ['markdown_ladder', 'recovery_report'],
    impact7: 8,
    impact30: 9
  },

  // Money
  {
    code: 'MNY-P1',
    pillar: 'Money',
    signal_tags: ['pricing_margin_blindspot', 'category_margin_blindspot'],
    title7: 'Category Margin Map + Price Rule Baseline',
    title30: 'Weekly Profit Leak Review by Category',
    kpi7: 'gross_margin_by_category',
    kpi30: 'net_margin_estimate',
    proof7: ['margin_map', 'price_rules_sheet'],
    proof30: ['weekly_leak_log', 'margin_review_notes'],
    impact7: 9,
    impact30: 10
  },
  {
    code: 'MNY-P2',
    pillar: 'Money',
    signal_tags: ['discounting_leak', 'pricing_inconsistency'],
    title7: 'Discount Guardrails + Approval Bands',
    title30: 'Age-Based Markdown Ladder Compliance',
    kpi7: 'discount_rate',
    kpi30: 'markdown_compliance',
    proof7: ['discount_policy', 'approval_log'],
    proof30: ['markdown_ladder', 'markdown_audit'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'MNY-P3',
    pillar: 'Money',
    signal_tags: ['cash_recon_gap'],
    title7: 'Daily Cash + Momo Reconciliation + Variance Log',
    title30: 'Refund Approval Controls + Weekly Spot Audits',
    kpi7: 'daily_recon_variance',
    kpi30: 'refund_exception_count',
    proof7: ['daily_recon_sheets', 'variance_log'],
    proof30: ['refund_sop', 'audit_notes'],
    impact7: 9,
    impact30: 9
  },
  {
    code: 'MNY-P4',
    pillar: 'Money',
    signal_tags: ['purchase_panic', 'slow_mover_attachment', 'supplier_terms_weak'],
    title7: 'Open-to-Buy Budget + Test Quantity Rule',
    title30: 'Supplier Terms Tracker + OTB Compliance Rhythm',
    kpi7: 'overbuy_rate',
    kpi30: 'inventory_turns',
    proof7: ['otb_sheet', 'purchase_test_rule'],
    proof30: ['supplier_terms_tracker', 'otb_compliance_log'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'MNY-P5',
    pillar: 'Money',
    signal_tags: ['returns_damage_blindspot', 'policy_vagueness'],
    title7: 'Exchange-First Policy + Return Quarantine Checks',
    title30: 'Return Reason Coding + Return Loss Reduction Loop',
    kpi7: 'return_rate',
    kpi30: 'return_loss_value',
    proof7: ['returns_policy', 'quarantine_log'],
    proof30: ['return_reason_report', 'loss_reduction_actions'],
    impact7: 8,
    impact30: 9
  },

  // Market
  {
    code: 'MKT-P1',
    pillar: 'Market',
    signal_tags: ['followup_gap'],
    title7: 'VIP List + Weekly WhatsApp Follow-Up Rhythm',
    title30: 'Tiered VIP Perks + Repeat Triggers',
    kpi7: 'repeat_customer_rate',
    kpi30: 'repeat_revenue_percent',
    proof7: ['vip_list', 'followup_templates'],
    proof30: ['vip_tier_plan', 'repeat_trigger_sheet'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'MKT-P2',
    pillar: 'Market',
    signal_tags: ['weak_proof_pack', 'value_story_gap'],
    title7: 'Social Proof Engine (Reviews + Customer Looks)',
    title30: 'Proof Wall + Trust Content Highlights',
    kpi7: 'reviews_per_week',
    kpi30: 'trust_conversion_rate',
    proof7: ['review_requests', 'customer_photo_consent_log'],
    proof30: ['proof_wall_links', 'trust_content_calendar'],
    impact7: 7,
    impact30: 8
  },
  {
    code: 'MKT-P3',
    pillar: 'Market',
    signal_tags: ['bundle_engine_missing', 'service_inconsistency'],
    title7: 'Outfit Bundle Board + Styling Script Launch',
    title30: 'Bundle Training + AOV Lift Tracking',
    kpi7: 'bundle_adoption_rate',
    kpi30: 'average_order_value',
    proof7: ['bundle_board', 'styling_scripts'],
    proof30: ['bundle_training_log', 'aov_report'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'MKT-P4',
    pillar: 'Market',
    signal_tags: ['no_market_feedback_loop', 'followup_gap'],
    title7: 'Content Cadence + Response SLA',
    title30: 'Drop Story Calendar + Channel Conversion Review',
    kpi7: 'content_cadence_compliance',
    kpi30: 'online_sales_percent',
    proof7: ['posting_schedule', 'response_sla_log'],
    proof30: ['drop_story_calendar', 'channel_conversion_report'],
    impact7: 8,
    impact30: 8
  },

  // Leadership
  {
    code: 'LDR-P1',
    pillar: 'Leadership',
    signal_tags: ['kpi_cadence_gap', 'no_kpi_ownership'],
    title7: 'KPI Wall + Weekly Performance Review',
    title30: 'Leak Review Cadence + Action Closure Tracker',
    kpi7: 'kpi_update_compliance',
    kpi30: 'task_closure_rate',
    proof7: ['kpi_wall_photo', 'weekly_review_notes'],
    proof30: ['closure_tracker', 'repeat_leak_report'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'LDR-P2',
    pillar: 'Leadership',
    signal_tags: ['decision_bottleneck', 'approval_bottleneck', 'policy_vagueness'],
    title7: 'Delegation Limits for Discount and Refund Decisions',
    title30: 'Approval Matrix + Decision Latency Tracking',
    kpi7: 'decision_latency',
    kpi30: 'approval_backlog',
    proof7: ['delegation_rules', 'decision_log'],
    proof30: ['approval_matrix', 'latency_dashboard'],
    impact7: 8,
    impact30: 8
  },
  {
    code: 'LDR-P3',
    pillar: 'Leadership',
    signal_tags: ['training_planning_gap', 'no_variance_review', 'accountability_soft'],
    title7: 'Standards Coaching: Scripts + Policy Enforcement',
    title30: 'Role Scorecards + Repeat-Leak Elimination Routine',
    kpi7: 'coaching_sessions_done',
    kpi30: 'repeat_incident_rate',
    proof7: ['coaching_log', 'policy_briefs'],
    proof30: ['role_scorecards', 'root_cause_actions'],
    impact7: 7,
    impact30: 8
  },

  // Innovation
  {
    code: 'INN-P1',
    pillar: 'Innovation',
    signal_tags: ['no_testing_rhythm'],
    title7: 'Drop Rhythm + Micro-Test Plan',
    title30: 'Monthly Test-to-Scale Pipeline',
    kpi7: 'drops_per_week',
    kpi30: 'test_win_rate',
    proof7: ['drop_plan', 'test_sheet'],
    proof30: ['test_scale_pipeline', 'win_loss_report'],
    impact7: 7,
    impact30: 8
  },
  {
    code: 'INN-P2',
    pillar: 'Innovation',
    signal_tags: ['supplier_selection_undisciplined', 'no_market_feedback_loop'],
    title7: 'Private Label or Exclusive Sourcing Candidate List',
    title30: 'Repeatable Winner Program (Exclusive Basics)',
    kpi7: 'exclusive_candidate_count',
    kpi30: 'repeatable_winner_revenue_percent',
    proof7: ['candidate_list', 'supplier_shortlist'],
    proof30: ['winner_program_doc', 'revenue_split_report'],
    impact7: 6,
    impact30: 8
  },
  {
    code: 'INN-P3',
    pillar: 'Innovation',
    signal_tags: ['bundle_engine_missing', 'service_inconsistency'],
    title7: 'Experience Upgrade Pilot (Styling Session + Size Guide)',
    title30: 'Productized Styling Service + Booking Flow',
    kpi7: 'styling_session_count',
    kpi30: 'experience_conversion_rate',
    proof7: ['pilot_script', 'session_log'],
    proof30: ['service_menu', 'booking_flow'],
    impact7: 7,
    impact30: 8
  },

  // Risk
  {
    code: 'RSK-P1',
    pillar: 'Risk',
    signal_tags: ['shrinkage_leak', 'safe_handling_gap'],
    title7: 'Shrinkage Controls (Tagging + Fitting + Access Rules)',
    title30: 'Shrinkage Dashboard + Weekly Exception Review',
    kpi7: 'shrinkage_percent',
    kpi30: 'inventory_accuracy',
    proof7: ['shrink_controls_sheet', 'fitting_check_log'],
    proof30: ['shrink_dashboard', 'exception_review_notes'],
    impact7: 9,
    impact30: 9
  },
  {
    code: 'RSK-P2',
    pillar: 'Risk',
    signal_tags: ['policy_vagueness', 'returns_damage_blindspot'],
    title7: 'Returns Fraud Firewall (Policy + Condition Checklist)',
    title30: 'Returns Fraud Trend Reduction Loop',
    kpi7: 'fraud_flagged_returns',
    kpi30: 'returns_fraud_rate',
    proof7: ['returns_firewall_policy', 'condition_checklist_records'],
    proof30: ['fraud_trend_report', 'closure_actions'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'RSK-P3',
    pillar: 'Risk',
    signal_tags: ['supplier_doc_gap', 'supplier_selection_undisciplined'],
    title7: 'Supplier Authenticity Firewall',
    title30: 'Supplier Authenticity Scorecard + Incident SOP',
    kpi7: 'authenticity_check_coverage',
    kpi30: 'supplier_defect_incidents',
    proof7: ['approved_supplier_list', 'auth_check_log'],
    proof30: ['supplier_auth_scorecard', 'incident_sop'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'RSK-P4',
    pillar: 'Risk',
    signal_tags: ['contract_gap', 'policy_vagueness'],
    title7: 'Dispute Defense (Terms + Receipts + Delivery Proof)',
    title30: 'Dispute Trend Elimination Workflow',
    kpi7: 'dispute_rate',
    kpi30: 'chargeback_dispute_incidents',
    proof7: ['terms_sheet', 'receipt_and_pod_samples'],
    proof30: ['dispute_log', 'elimination_actions'],
    impact7: 8,
    impact30: 8
  },

  // People
  {
    code: 'PPL-P1',
    pillar: 'People',
    signal_tags: ['incentive_misalignment'],
    title7: 'Incentives Aligned to Margin + Low Returns',
    title30: 'Staff Incentive Outcome Review by Role',
    kpi7: 'incentive_alignment_score',
    kpi30: 'margin_per_staff',
    proof7: ['incentive_rules_doc', 'staff_brief_record'],
    proof30: ['incentive_outcome_report', 'review_notes'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'PPL-P2',
    pillar: 'People',
    signal_tags: ['training_gap', 'onboarding_gap', 'service_inconsistency'],
    title7: 'Onboarding + Certification (Styling, Policy, Catalogue)',
    title30: 'Weekly Training Cadence + Service Script Audits',
    kpi7: 'onboarding_completion',
    kpi30: 'service_consistency_score',
    proof7: ['onboarding_checklists', 'certification_sheet'],
    proof30: ['training_log', 'script_audit_results'],
    impact7: 8,
    impact30: 9
  }
];

export const actions: ActionDefinition[] = packs.flatMap((pack) => {
  const normalized = pack.code.replace(/-/g, '_');
  const line_type = ['all'];

  const sevenDay: ActionDefinition = {
    action_id: `ACT_FASHION_${normalized}_7`,
    industry: 'retail',
    line_type,
    pillar: pack.pillar,
    signal_tags: pack.signal_tags,
    title: pack.title7,
    days: 7,
    effort: 'S',
    default_owner_by_size: ownerMap,
    kpi_links: [pack.kpi7],
    proof_required: pack.proof7,
    impact_score: pack.impact7
  };

  const thirtyDay: ActionDefinition = {
    action_id: `ACT_FASHION_${normalized}_30`,
    industry: 'retail',
    line_type,
    pillar: pack.pillar,
    signal_tags: pack.signal_tags,
    title: pack.title30,
    days: 30,
    effort: 'M',
    default_owner_by_size: ownerMap,
    kpi_links: [pack.kpi30],
    proof_required: pack.proof30,
    impact_score: pack.impact30
  };

  return [sevenDay, thirtyDay];
});
