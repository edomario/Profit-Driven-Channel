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
  // OPERATIONS
  {
    code: 'OPS_P1',
    pillar: 'Operations',
    signal_tags: ['inventory_accuracy_gap', 'supplier_doc_gap'],
    title7: 'Stock Truth + IMEI Discipline (label + log all devices)',
    title30: 'ABC Cycle Counts + Variance Root-Cause + IMEI audit loop',
    kpi7: 'inventory_accuracy',
    kpi30: 'imei_log_coverage',
    proof7: ['labeled_stock_photo', 'imei_serial_log'],
    proof30: ['cycle_count_report', 'variance_root_cause_log'],
    impact7: 9,
    impact30: 9
  },
  {
    code: 'OPS_P2',
    pillar: 'Operations',
    signal_tags: ['restock_delay', 'stockout_tax'],
    title7: 'Top 30 Accessories Count + Reorder Trigger',
    title30: 'Fast-Mover Min/Max + Dead-Stock Cleanup Plan',
    kpi7: 'top30_stockouts',
    kpi30: 'attach_rate',
    proof7: ['top30_sheet', 'daily_count_log'],
    proof30: ['min_max_sheet', 'dead_stock_action_list'],
    impact7: 8,
    impact30: 8
  },
  {
    code: 'OPS_P3',
    pillar: 'Operations',
    signal_tags: ['no_standard_work', 'returns_damage_blindspot'],
    title7: 'Repair Job Cards + QC Before Handover',
    title30: 'Repair SOP Library + Comeback Elimination Sprint',
    kpi7: 'repair_cycle_time',
    kpi30: 'repair_comeback_rate',
    proof7: ['repair_job_cards', 'repair_qc_checklist'],
    proof30: ['repair_sop_pack', 'comeback_root_cause_log'],
    impact7: 9,
    impact30: 9
  },
  {
    code: 'OPS_P4',
    pillar: 'Operations',
    signal_tags: ['receiving_slippage', 'supplier_selection_undisciplined'],
    title7: 'Receiving & Grading Checklist (model/condition/serial)',
    title30: 'Approved Supplier + Device Grading Consistency Program',
    kpi7: 'receiving_error_rate',
    kpi30: 'supplier_defect_rate',
    proof7: ['receiving_forms', 'grading_samples'],
    proof30: ['approved_supplier_list', 'supplier_scorecard'],
    impact7: 8,
    impact30: 8
  },
  {
    code: 'OPS_P5',
    pillar: 'Operations',
    signal_tags: ['kpi_cadence_gap', 'hero_staff_dependence'],
    title7: 'Daily Open/Close Routine (cash, stock, pending repairs)',
    title30: 'Routine Compliance Tracker + Shift Handover Controls',
    kpi7: 'open_close_compliance',
    kpi30: 'handover_compliance',
    proof7: ['open_close_checklist', 'pending_repairs_log'],
    proof30: ['routine_compliance_report', 'handover_notes'],
    impact7: 7,
    impact30: 8
  },

  // MONEY
  {
    code: 'MNY_P1',
    pillar: 'Money',
    signal_tags: ['pricing_margin_blindspot', 'category_margin_blindspot'],
    title7: 'Margin Map by Category (phones/accessories/repairs)',
    title30: 'Weekly Margin Bridge + Leak Ownership Review',
    kpi7: 'gross_margin_by_category',
    kpi30: 'net_margin_estimate',
    proof7: ['category_margin_sheet', 'cost_assumption_notes'],
    proof30: ['margin_bridge_report', 'leak_owner_actions'],
    impact7: 9,
    impact30: 10
  },
  {
    code: 'MNY_P2',
    pillar: 'Money',
    signal_tags: ['discounting_leak', 'pricing_inconsistency'],
    title7: 'Pricing Guardrails + Discount Bands',
    title30: 'Price List Standardization + Discount Drift Monitor',
    kpi7: 'discount_rate',
    kpi30: 'price_variance',
    proof7: ['discount_policy', 'sales_discount_audit'],
    proof30: ['price_list', 'discount_drift_report'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'MNY_P3',
    pillar: 'Money',
    signal_tags: ['cash_recon_gap'],
    title7: 'Cash + Momo Daily Reconciliation + Variance Log',
    title30: 'Cash-Control SOP + Weekly Spot Audit',
    kpi7: 'daily_recon_variance',
    kpi30: 'cash_exception_count',
    proof7: ['reconciliation_sheet', 'variance_reasons_log'],
    proof30: ['cash_control_sop', 'audit_spotcheck_notes'],
    impact7: 9,
    impact30: 9
  },
  {
    code: 'MNY_P4',
    pillar: 'Money',
    signal_tags: ['policy_vagueness', 'returns_damage_blindspot'],
    title7: 'Warranty/Returns Cost Tracker + Rule Clarification',
    title30: 'Warranty Tier Model + Return Cause Elimination Loop',
    kpi7: 'warranty_cost_per_100_sales',
    kpi30: 'warranty_dispute_rate',
    proof7: ['warranty_cost_log', 'written_warranty_rules'],
    proof30: ['warranty_tier_matrix', 'return_cause_closure_log'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'MNY_P5',
    pillar: 'Money',
    signal_tags: ['credit_terms_risk', 'payment_terms_risk'],
    title7: 'Installment/Credit Rules (deposit, limits, terms)',
    title30: 'AR Aging Cadence + Escalation Rules',
    kpi7: 'credit_rule_compliance',
    kpi30: 'dso',
    proof7: ['credit_terms_doc', 'active_credit_list'],
    proof30: ['ar_aging_report', 'collections_cadence_log'],
    impact7: 9,
    impact30: 10
  },

  // MARKET
  {
    code: 'MKT_P1',
    pillar: 'Market',
    signal_tags: ['value_story_gap', 'policy_vagueness'],
    title7: 'Trust Engine: quality proof + clear warranty language',
    title30: 'Trust Proof Pack + Sales Script Standardization',
    kpi7: 'trust_signal_compliance',
    kpi30: 'repeat_customer_rate',
    proof7: ['warranty_board_photo', 'quality_check_script'],
    proof30: ['trust_proof_pack', 'sales_script_samples'],
    impact7: 7,
    impact30: 8
  },
  {
    code: 'MKT_P2',
    pillar: 'Market',
    signal_tags: ['followup_gap', 'segment_blindspot'],
    title7: 'Lead Capture + Response SLA (WhatsApp/online)',
    title30: 'Lead Pipeline Tracker + Channel Conversion Review',
    kpi7: 'lead_response_sla',
    kpi30: 'lead_to_sale_conversion',
    proof7: ['lead_capture_sheet', 'response_template'],
    proof30: ['pipeline_report', 'channel_conversion_report'],
    impact7: 8,
    impact30: 8
  },
  {
    code: 'MKT_P3',
    pillar: 'Market',
    signal_tags: ['bundle_engine_missing', 'service_inconsistency'],
    title7: 'Attach Rate Script + 3 Bundle Offers',
    title30: 'Bundle Catalog by Buyer Type + Attach Coaching Loop',
    kpi7: 'attach_rate',
    kpi30: 'average_order_value',
    proof7: ['bundle_offers', 'attach_script'],
    proof30: ['bundle_catalog', 'attach_coaching_notes'],
    impact7: 8,
    impact30: 8
  },
  {
    code: 'MKT_P4',
    pillar: 'Market',
    signal_tags: ['followup_gap', 'complaint_handling_gap'],
    title7: 'Reviews + Referral Ask Routine',
    title30: 'Referral Engine + Complaint-to-Recovery Loop',
    kpi7: 'review_volume',
    kpi30: 'referral_rate',
    proof7: ['review_request_log', 'referral_ask_script'],
    proof30: ['referral_tracker', 'recovery_case_log'],
    impact7: 7,
    impact30: 8
  },

  // LEADERSHIP
  {
    code: 'LDR_P1',
    pillar: 'Leadership',
    signal_tags: ['kpi_cadence_gap', 'no_kpi_ownership'],
    title7: 'KPI Wall + Daily 10-min Standup',
    title30: 'KPI Cadence Compliance + Weekly Leak Review',
    kpi7: 'kpi_update_compliance',
    kpi30: 'repeat_incident_rate',
    proof7: ['kpi_wall_photo', 'standup_notes'],
    proof30: ['kpi_cadence_log', 'weekly_leak_review_notes'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'LDR_P2',
    pillar: 'Leadership',
    signal_tags: ['decision_bottleneck', 'approval_bottleneck'],
    title7: 'Approval Limits for Discount/Refund/Warranty Exceptions',
    title30: 'Delegation Matrix + Decision Latency Dashboard',
    kpi7: 'decision_latency',
    kpi30: 'approval_bottleneck_cases',
    proof7: ['approval_limit_doc', 'exception_log'],
    proof30: ['delegation_matrix', 'decision_latency_report'],
    impact7: 8,
    impact30: 8
  },
  {
    code: 'LDR_P3',
    pillar: 'Leadership',
    signal_tags: ['training_planning_gap', 'accountability_soft'],
    title7: 'Role Scorecards + Weekly Coaching Start',
    title30: 'Performance Coaching Cadence + Ownership Audit',
    kpi7: 'scorecard_coverage',
    kpi30: 'task_closure_rate',
    proof7: ['role_scorecards', 'coaching_notes_week1'],
    proof30: ['coaching_calendar', 'ownership_audit'],
    impact7: 7,
    impact30: 8
  },

  // INNOVATION
  {
    code: 'INN_P1',
    pillar: 'Innovation',
    signal_tags: ['no_testing_rhythm', 'bundle_engine_missing'],
    title7: 'Run 1 Offer Experiment (bundle/warranty tier)',
    title30: 'Monthly Offer Test Pipeline + Win/Loss Log',
    kpi7: 'experiments_run',
    kpi30: 'experiment_win_rate',
    proof7: ['experiment_plan', 'week1_results'],
    proof30: ['experiment_pipeline', 'win_loss_log'],
    impact7: 6,
    impact30: 8
  },
  {
    code: 'INN_P2',
    pillar: 'Innovation',
    signal_tags: ['pricing_inconsistency', 'no_standard_work'],
    title7: 'Productize Repair Services (tiered turnaround + warranty)',
    title30: 'Repair Service Catalog + Promise Tracking',
    kpi7: 'repair_tier_adoption',
    kpi30: 'repair_margin_per_job',
    proof7: ['repair_tier_sheet', 'service_terms_display'],
    proof30: ['service_catalog', 'promise_vs_actual_report'],
    impact7: 7,
    impact30: 8
  },
  {
    code: 'INN_P3',
    pillar: 'Innovation',
    signal_tags: ['offer_measurement_gap', 'no_market_feedback_loop'],
    title7: 'Automation Lite: structured templates for order, repair, and follow-up',
    title30: 'POS/Sheets/Labels rollout with usage discipline',
    kpi7: 'template_adoption',
    kpi30: 'workflow_error_rate',
    proof7: ['structured_templates', 'adoption_log_week1'],
    proof30: ['system_usage_report', 'error_rate_before_after'],
    impact7: 7,
    impact30: 8
  },

  // RISK
  {
    code: 'RSK_P1',
    pillar: 'Risk',
    signal_tags: ['supplier_doc_gap', 'inventory_accuracy_gap'],
    title7: 'IMEI/Serial Mandatory Logging + Intake Verification',
    title30: 'IMEI Firewall Audit + Incident Escalation Rules',
    kpi7: 'imei_log_coverage',
    kpi30: 'stolen_device_incidents',
    proof7: ['imei_intake_log', 'verification_checklist'],
    proof30: ['imei_audit_report', 'incident_escalation_policy'],
    impact7: 9,
    impact30: 9
  },
  {
    code: 'RSK_P2',
    pillar: 'Risk',
    signal_tags: ['supplier_selection_undisciplined', 'supplier_doc_gap'],
    title7: 'Approved Parts List + Unknown Parts Quarantine',
    title30: 'Supplier Defect Scorecard + Authenticity Checks',
    kpi7: 'unknown_parts_rate',
    kpi30: 'supplier_defect_rate',
    proof7: ['approved_parts_list', 'quarantine_log'],
    proof30: ['supplier_scorecard', 'auth_check_records'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'RSK_P3',
    pillar: 'Risk',
    signal_tags: ['contract_gap', 'policy_vagueness'],
    title7: 'Written Warranty/Return Rules + Dispute Register',
    title30: 'Dispute Response SOP + Evidence Archive',
    kpi7: 'dispute_rate',
    kpi30: 'warranty_dispute_rate',
    proof7: ['written_policy', 'dispute_register'],
    proof30: ['dispute_sop', 'evidence_archive'],
    impact7: 8,
    impact30: 8
  },
  {
    code: 'RSK_P4',
    pillar: 'Risk',
    signal_tags: ['shrinkage_leak', 'cash_recon_gap'],
    title7: 'High-Value Access Controls + Spot Counts',
    title30: 'Shrinkage Dashboard + Security Incident Review',
    kpi7: 'shrinkage_percent',
    kpi30: 'security_incidents',
    proof7: ['access_control_rules', 'spot_count_log'],
    proof30: ['shrinkage_dashboard', 'incident_review_notes'],
    impact7: 8,
    impact30: 9
  },

  // PEOPLE
  {
    code: 'PPL_P1',
    pillar: 'People',
    signal_tags: ['incentive_misalignment', 'accountability_soft'],
    title7: 'Profit-Safe Incentives (margin + attach + low returns)',
    title30: 'Incentive Alignment Review + Staff Score Outcomes',
    kpi7: 'incentive_alignment_score',
    kpi30: 'returns_rate_by_staff',
    proof7: ['incentive_rule_doc', 'staff_brief_note'],
    proof30: ['incentive_review', 'staff_outcome_report'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'PPL_P2',
    pillar: 'People',
    signal_tags: ['onboarding_gap', 'training_gap'],
    title7: 'Onboarding Checklist + Technician/Sales Skill Check',
    title30: 'Certification Matrix + Weekly Training Cadence',
    kpi7: 'onboarding_completion',
    kpi30: 'first_time_fix_rate',
    proof7: ['onboarding_checklist', 'skill_check_results'],
    proof30: ['certification_matrix', 'training_log'],
    impact7: 8,
    impact30: 9
  }
];

export const actions: ActionDefinition[] = packs.flatMap((pack) => {
  const normalized = pack.code.replace(/-/g, '_');
  const line_type = ['all'];

  const sevenDay: ActionDefinition = {
    action_id: `ACT_ELECTRONICS_${normalized}_7`,
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
    action_id: `ACT_ELECTRONICS_${normalized}_30`,
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
