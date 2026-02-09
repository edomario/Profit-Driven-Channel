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
    signal_tags: ['stockout_tax', 'restock_delay'],
    title7: 'Top-50 Fast Movers + Min-Max Reorder Triggers',
    title30: 'Weekly Fast-Mover Cycle Count + Supplier Reorder Calendar',
    kpi7: 'stockout_rate_top50',
    kpi30: 'seasonal_readiness_score',
    proof7: ['top50_list', 'min_max_rules'],
    proof30: ['cycle_count_log', 'supplier_reorder_calendar'],
    impact7: 9,
    impact30: 10
  },
  {
    code: 'OPS-P2',
    pillar: 'Operations',
    signal_tags: ['inventory_accuracy_gap'],
    title7: 'SKU and Pack-Size Truth System',
    title30: 'SKU-Zone Labeling + Accuracy Audits',
    kpi7: 'inventory_accuracy',
    kpi30: 'sku_lookup_time',
    proof7: ['sku_pack_matrix', 'stock_truth_log'],
    proof30: ['zone_labels_photos', 'accuracy_audit_log'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'OPS-P3',
    pillar: 'Operations',
    signal_tags: ['offer_measurement_gap'],
    title7: 'Shelf Map + Fast-Lane Layout',
    title30: 'Conversion-Led Shelf Optimization',
    kpi7: 'item_find_time_minutes',
    kpi30: 'in_store_conversion_rate',
    proof7: ['shelf_map', 'fast_lane_photo'],
    proof30: ['layout_test_report', 'conversion_tracking'],
    impact7: 7,
    impact30: 8
  },
  {
    code: 'OPS-P4',
    pillar: 'Operations',
    signal_tags: ['no_standard_work', 'contract_gap', 'dispatch_delivery_instability'],
    title7: 'Printing Queue SOP + Order Ticket Proof',
    title30: 'Proof-Before-Print for Large Jobs + Job-Type Price Table',
    kpi7: 'print_job_error_rate',
    kpi30: 'reprint_rate',
    proof7: ['print_ticket_template', 'job_queue_log'],
    proof30: ['printing_sop', 'job_type_price_table'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'OPS-P5',
    pillar: 'Operations',
    signal_tags: ['slow_mover_attachment'],
    title7: 'Dead Stock Identification + Rack Reset',
    title30: 'Dead Books Recovery Plan (Bundle-Markdown-Transfer)',
    kpi7: 'dead_stock_value',
    kpi30: 'inventory_turns',
    proof7: ['dead_stock_list', 'rack_reset_photos'],
    proof30: ['dead_stock_recovery_plan', 'recovery_results'],
    impact7: 8,
    impact30: 9
  },

  // Money
  {
    code: 'MNY-P1',
    pillar: 'Money',
    signal_tags: ['pricing_margin_blindspot', 'category_margin_blindspot'],
    title7: 'Category Margin Map + Price Rules',
    title30: 'Weekly Margin Leak Review by Category',
    kpi7: 'gross_margin_by_category',
    kpi30: 'net_margin_estimate',
    proof7: ['category_margin_sheet', 'price_rule_baseline'],
    proof30: ['margin_leak_log', 'weekly_review_notes'],
    impact7: 9,
    impact30: 10
  },
  {
    code: 'MNY-P2',
    pillar: 'Money',
    signal_tags: ['discounting_leak', 'pricing_inconsistency'],
    title7: 'Discount Bands + Bulk Pricing Rules',
    title30: 'Discount Compliance Audit by Staff',
    kpi7: 'discount_rate',
    kpi30: 'price_variance',
    proof7: ['discount_policy', 'bulk_band_sheet'],
    proof30: ['discount_audit', 'staff_discount_report'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'MNY-P3',
    pillar: 'Money',
    signal_tags: ['credit_terms_risk', 'payment_delay_chokehold'],
    title7: 'Credit Rules + Debtor Aging List',
    title30: 'Collections Cadence + Cutoff Enforcement',
    kpi7: 'credit_outstanding',
    kpi30: 'dso',
    proof7: ['credit_policy', 'debtor_aging_report'],
    proof30: ['collections_log', 'cutoff_enforcement_log'],
    impact7: 9,
    impact30: 9
  },
  {
    code: 'MNY-P4',
    pillar: 'Money',
    signal_tags: ['cash_recon_gap', 'shrinkage_leak'],
    title7: 'Cash-Momo Reconciliation + Variance Log',
    title30: 'Shrink Controls + Weekly Cash Spot Audits',
    kpi7: 'daily_recon_variance',
    kpi30: 'shrinkage_percent',
    proof7: ['daily_recon_sheet', 'variance_reason_log'],
    proof30: ['shrink_control_sheet', 'cash_audit_notes'],
    impact7: 9,
    impact30: 9
  },
  {
    code: 'MNY-P5',
    pillar: 'Money',
    signal_tags: ['waste_not_costed'],
    title7: 'Printing Cost Calculator + Pricing Correction',
    title30: 'Service Margin Tracking by Job Type',
    kpi7: 'print_cost_per_job',
    kpi30: 'print_margin_percent',
    proof7: ['printing_cost_sheet', 'revised_price_table'],
    proof30: ['service_margin_report', 'job_type_profitability'],
    impact7: 8,
    impact30: 9
  },

  // Market
  {
    code: 'MKT-P1',
    pillar: 'Market',
    signal_tags: ['channel_dependency', 'followup_gap'],
    title7: 'School and Office Contract Outreach Engine',
    title30: 'Account Plan + Contract Renewal Rhythm',
    kpi7: 'school_office_contract_count',
    kpi30: 'contract_revenue_share',
    proof7: ['account_target_list', 'outreach_log'],
    proof30: ['account_plan', 'renewal_tracker'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'MKT-P2',
    pillar: 'Market',
    signal_tags: ['bundle_engine_missing'],
    title7: 'Back-to-School Kits + Sales Scripts',
    title30: 'List-Based Kit Selling Partnerships',
    kpi7: 'bundle_adoption_rate',
    kpi30: 'average_order_value',
    proof7: ['kit_tier_sheet', 'bundle_display_photo'],
    proof30: ['school_partner_list', 'kit_order_logs'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'MKT-P3',
    pillar: 'Market',
    signal_tags: ['followup_gap'],
    title7: 'VIP and WhatsApp Retention Engine',
    title30: 'Repeat Trigger Cadence by Segment',
    kpi7: 'repeat_customer_rate',
    kpi30: 'repeat_revenue_percent',
    proof7: ['vip_list', 'broadcast_templates'],
    proof30: ['segment_trigger_plan', 'retention_report'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'MKT-P4',
    pillar: 'Market',
    signal_tags: ['weak_onboarding', 'followup_gap'],
    title7: 'Response SLA + Order Message Templates',
    title30: 'Inquiry-to-Order Pipeline Tracker',
    kpi7: 'response_time_minutes',
    kpi30: 'inquiry_conversion_rate',
    proof7: ['response_sla', 'chat_templates'],
    proof30: ['pipeline_tracker', 'conversion_report'],
    impact7: 8,
    impact30: 8
  },

  // Leadership
  {
    code: 'LDR-P1',
    pillar: 'Leadership',
    signal_tags: ['kpi_cadence_gap'],
    title7: 'KPI Wall + Weekly Review',
    title30: 'Leak Dashboard + Owner Accountability',
    kpi7: 'kpi_update_compliance',
    kpi30: 'repeat_incident_rate',
    proof7: ['kpi_wall_photo', 'weekly_kpi_notes'],
    proof30: ['leak_dashboard', 'owner_action_tracker'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'LDR-P2',
    pillar: 'Leadership',
    signal_tags: ['decision_bottleneck', 'approval_bottleneck'],
    title7: 'Delegation Limits for Discounts, Returns, and Credit',
    title30: 'Approval Matrix + Decision Latency Tracking',
    kpi7: 'decision_latency',
    kpi30: 'approval_backlog',
    proof7: ['delegation_limits_doc', 'decision_log'],
    proof30: ['approval_matrix', 'latency_report'],
    impact7: 8,
    impact30: 8
  },
  {
    code: 'LDR-P3',
    pillar: 'Leadership',
    signal_tags: ['no_variance_review', 'training_planning_gap'],
    title7: 'Standards Coaching + Error Audit Loop',
    title30: 'Repeat-Leak Elimination Routine',
    kpi7: 'coaching_sessions_done',
    kpi30: 'task_closure_rate',
    proof7: ['coaching_log', 'error_audit_sheet'],
    proof30: ['repeat_leak_report', 'elimination_actions'],
    impact7: 7,
    impact30: 8
  },

  // Innovation
  {
    code: 'INN-P1',
    pillar: 'Innovation',
    signal_tags: ['planning_gap', 'no_testing_rhythm'],
    title7: 'Seasonal Campaign Engine (Exam/Back-to-School)',
    title30: 'Season Calendar + Pre-Season Stock Plan',
    kpi7: 'seasonal_execution_score',
    kpi30: 'seasonal_readiness_score',
    proof7: ['season_campaign_plan', 'campaign_assets'],
    proof30: ['season_calendar', 'preseason_stock_plan'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'INN-P2',
    pillar: 'Innovation',
    signal_tags: ['service_inconsistency', 'offer_measurement_gap'],
    title7: 'Service Upsell Engine (Lamination, Covering, Delivery)',
    title30: 'Service Package Menu + Upsell Tracking',
    kpi7: 'service_upsell_rate',
    kpi30: 'service_revenue_percent',
    proof7: ['service_offer_sheet', 'upsell_script'],
    proof30: ['service_menu', 'upsell_tracking_report'],
    impact7: 7,
    impact30: 8
  },
  {
    code: 'INN-P3',
    pillar: 'Innovation',
    signal_tags: ['no_testing_rhythm', 'no_market_feedback_loop'],
    title7: 'New Title and Item Micro-Test Pipeline',
    title30: 'Test-to-Scale Decision Framework',
    kpi7: 'tests_run_per_month',
    kpi30: 'test_win_rate',
    proof7: ['micro_test_sheet', 'test_result_log'],
    proof30: ['scale_framework', 'winner_scale_report'],
    impact7: 7,
    impact30: 8
  },

  // Risk
  {
    code: 'RSK-P1',
    pillar: 'Risk',
    signal_tags: ['supplier_doc_gap', 'supplier_selection_undisciplined'],
    title7: 'Anti-Counterfeit and Piracy Supplier Firewall',
    title30: 'Approved Supplier Scorecard + Evidence Folder',
    kpi7: 'counterfeit_flags',
    kpi30: 'supplier_verification_coverage',
    proof7: ['approved_supplier_list', 'auth_checks_log'],
    proof30: ['supplier_scorecard', 'evidence_folder_index'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'RSK-P2',
    pillar: 'Risk',
    signal_tags: ['shrinkage_leak'],
    title7: 'Small-Item Theft Control (Display + Access)',
    title30: 'Shrink Dashboard + Exception Review',
    kpi7: 'shrink_incidents',
    kpi30: 'shrinkage_percent',
    proof7: ['high_risk_item_controls', 'incident_log'],
    proof30: ['shrink_dashboard', 'exception_review_notes'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'RSK-P3',
    pillar: 'Risk',
    signal_tags: ['receiving_slippage', 'supplier_doc_gap'],
    title7: 'Supplier Short-Delivery Verification Routine',
    title30: 'Receiving Evidence Trail + Supplier Claim Workflow',
    kpi7: 'short_delivery_rate',
    kpi30: 'supplier_claim_recovery_rate',
    proof7: ['receiving_checklist', 'short_delivery_log'],
    proof30: ['receiving_evidence_archive', 'claim_tracker'],
    impact7: 8,
    impact30: 8
  },
  {
    code: 'RSK-P4',
    pillar: 'Risk',
    signal_tags: ['contract_gap', 'policy_vagueness'],
    title7: 'Printing Dispute Defense SOP',
    title30: 'Terms + Proof + Reprint Decision Framework',
    kpi7: 'print_dispute_rate',
    kpi30: 'refund_reprint_rate',
    proof7: ['printing_terms_sheet', 'job_proof_records'],
    proof30: ['dispute_sop', 'reprint_decision_log'],
    impact7: 8,
    impact30: 8
  },

  // People
  {
    code: 'PPL-P1',
    pillar: 'People',
    signal_tags: ['incentive_misalignment', 'accountability_soft'],
    title7: 'Incentives Aligned to Accuracy + Low Shrink + Service',
    title30: 'Role Scorecards + Incentive Outcome Review',
    kpi7: 'incentive_alignment_score',
    kpi30: 'performance_variance',
    proof7: ['incentive_rules', 'staff_brief'],
    proof30: ['role_scorecards', 'incentive_outcome_report'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'PPL-P2',
    pillar: 'People',
    signal_tags: ['training_gap', 'onboarding_gap', 'service_inconsistency'],
    title7: 'Product Navigation + Bundle Script Certification',
    title30: 'Onboarding and Service Consistency Cadence',
    kpi7: 'training_completion',
    kpi30: 'service_consistency_score',
    proof7: ['training_checklists', 'script_certification_log'],
    proof30: ['onboarding_plan', 'service_audit_log'],
    impact7: 8,
    impact30: 9
  }
];

export const actions: ActionDefinition[] = packs.flatMap((pack) => {
  const normalized = pack.code.replace(/-/g, '_');
  const line_type = ['all'];

  const sevenDay: ActionDefinition = {
    action_id: `ACT_STATIONERY_${normalized}_7`,
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
    action_id: `ACT_STATIONERY_${normalized}_30`,
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
