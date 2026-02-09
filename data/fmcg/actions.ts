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
  micro: 'Ops Lead',
  small: 'Ops Lead',
  small_med: 'Manager',
  medium: 'Department Lead',
  large: 'Department Lead',
  enterprise: 'Function Head'
};

const packs: PackDef[] = [
  // OPERATIONS
  {
    code: 'OPS-A',
    pillar: 'Operations',
    signal_tags: ['stockout_tax', 'restock_delay'],
    title7: 'Top 30 Fast Movers + Daily Stockout Board',
    title30: 'Reorder Points + Supplier Lead-Time Calendar (Top 50 SKUs)',
    kpi7: 'stockout_rate_top30',
    kpi30: 'fill_rate_top50',
    proof7: ['top_sku_list', 'stockout_board'],
    proof30: ['rop_sheet', 'supplier_calendar'],
    impact7: 9,
    impact30: 10
  },
  {
    code: 'OPS-B',
    pillar: 'Operations',
    signal_tags: ['inventory_accuracy_gap', 'shrinkage_leak'],
    title7: 'Cycle Count Sprint + Variance Log',
    title30: 'ABC Cycle Count Program + Bin Ownership',
    kpi7: 'inventory_accuracy',
    kpi30: 'shrinkage_percent',
    proof7: ['cycle_count_sheet', 'variance_log'],
    proof30: ['abc_count_plan', 'bin_owner_matrix'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'OPS-C',
    pillar: 'Operations',
    signal_tags: ['dispatch_delivery_instability', 'receiving_slippage'],
    title7: 'Pick-Pack-Check Rule + 10 Dispatch Audits/Day',
    title30: 'Warehouse SOP Pack + Location/Bin Labeling',
    kpi7: 'pick_accuracy',
    kpi30: 'order_cycle_time',
    proof7: ['dispatch_checklist', 'dispatch_audit_log'],
    proof30: ['warehouse_sop_pack', 'bin_layout_map'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'OPS-D',
    pillar: 'Operations',
    signal_tags: ['dispatch_delivery_instability', 'contract_gap'],
    title7: 'Route Quick Fix + POD on Every Delivery',
    title30: 'Route Density Scheduling + Dispute Playbook',
    kpi7: 'pod_completion',
    kpi30: 'fuel_cost_per_drop',
    proof7: ['route_plan_before_after', 'pod_samples'],
    proof30: ['route_schedule', 'dispute_playbook'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'OPS-E',
    pillar: 'Operations',
    signal_tags: ['returns_damage_blindspot', 'expiry_rotation_gap'],
    title7: 'Returns Quarantine + 30/60/90 Near-Expiry Rescue List',
    title30: 'FEFO Rule + Returns Root-Cause Elimination Sprint',
    kpi7: 'returns_rate',
    kpi30: 'expiry_loss_ugx',
    proof7: ['quarantine_photo', 'near_expiry_sheet'],
    proof30: ['fefo_sop', 'returns_root_cause_log'],
    impact7: 9,
    impact30: 9
  },
  {
    code: 'OPS-F',
    pillar: 'Operations',
    signal_tags: ['receiving_slippage', 'supplier_terms_weak'],
    title7: 'Receiving Checklist + Supplier OTIF Snapshot',
    title30: 'Supplier Scorecard + Delivery Commitment Calendar',
    kpi7: 'supplier_otif',
    kpi30: 'receiving_error_rate',
    proof7: ['receiving_checklist', 'supplier_otif_snapshot'],
    proof30: ['supplier_scorecard', 'delivery_commitment_sheet'],
    impact7: 7,
    impact30: 8
  },

  // MONEY
  {
    code: 'MNY-A',
    pillar: 'Money',
    signal_tags: ['pricing_margin_blindspot', 'category_margin_blindspot'],
    title7: 'Margin Bridge + Top 3 Leak Freeze',
    title30: 'SKU Margin Dashboard + Monthly Leak Ownership Review',
    kpi7: 'net_margin_percent',
    kpi30: 'leak_value_ugx',
    proof7: ['margin_bridge', 'top_leak_actions'],
    proof30: ['sku_margin_dashboard', 'owner_review_notes'],
    impact7: 9,
    impact30: 10
  },
  {
    code: 'MNY-B',
    pillar: 'Money',
    signal_tags: ['discounting_leak', 'pricing_inconsistency'],
    title7: 'Price List + Discount Approval Guardrails',
    title30: 'Segment Pricing Policy + Price Drift Monitoring',
    kpi7: 'discount_rate',
    kpi30: 'price_variance',
    proof7: ['price_list', 'discount_approval_log'],
    proof30: ['segment_pricing_policy', 'price_drift_report'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'MNY-C',
    pillar: 'Money',
    signal_tags: ['credit_terms_risk', 'payment_delay_chokehold'],
    title7: 'AR Aging Freeze + Collections Cadence',
    title30: 'Credit Tiers + Escalation Ladder',
    kpi7: 'overdue_percent',
    kpi30: 'dso',
    proof7: ['ar_aging', 'blocked_accounts'],
    proof30: ['credit_tier_policy', 'collections_escalation_log'],
    impact7: 9,
    impact30: 10
  },
  {
    code: 'MNY-D',
    pillar: 'Money',
    signal_tags: ['cash_recon_gap', 'shrinkage_leak'],
    title7: 'Daily Cash/Momo/Bank Reconciliation + Variance Log',
    title30: 'Cash SOP + Segregation of Duties + Audit Spot Checks',
    kpi7: 'recon_variance',
    kpi30: 'cash_exception_count',
    proof7: ['daily_reconciliation_sheet', 'variance_log'],
    proof30: ['cash_sop', 'audit_spot_checks'],
    impact7: 9,
    impact30: 9
  },
  {
    code: 'MNY-E',
    pillar: 'Money',
    signal_tags: ['offer_measurement_gap', 'discounting_leak'],
    title7: 'Promo ROI Baseline + Stop Non-Profitable Promo',
    title30: 'Promo ROI Approval Template + A/B Promo Calendar',
    kpi7: 'promo_roi',
    kpi30: 'promo_margin_impact',
    proof7: ['promo_cost_sheet', 'promo_stop_decision'],
    proof30: ['promo_roi_template', 'ab_test_results'],
    impact7: 7,
    impact30: 8
  },
  {
    code: 'MNY-F',
    pillar: 'Money',
    signal_tags: ['slow_mover_attachment', 'supplier_terms_weak'],
    title7: 'Dead Stock Action List + Slow-Mover Purchase Freeze',
    title30: 'Inventory Aging Dashboard + Supplier Terms Reset',
    kpi7: 'dead_stock_value',
    kpi30: 'inventory_turns',
    proof7: ['dead_stock_list', 'purchase_freeze_note'],
    proof30: ['aging_dashboard', 'supplier_terms_summary'],
    impact7: 8,
    impact30: 9
  },

  // MARKET
  {
    code: 'MKT-A',
    pillar: 'Market',
    signal_tags: ['followup_gap', 'service_inconsistency'],
    title7: 'Top 50 Customer Repeat Order Protection Sweep',
    title30: 'Key Account Health Score + Churn Triggers',
    kpi7: 'repeat_order_rate',
    kpi30: 'customer_churn_rate',
    proof7: ['top_customer_outreach_log', 'declining_account_list'],
    proof30: ['account_health_scoreboard', 'churn_trigger_rules'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'MKT-B',
    pillar: 'Market',
    signal_tags: ['segment_blindspot', 'followup_gap'],
    title7: 'A/B/C Outlet Segmentation + Visit Cadence',
    title30: 'Territory Coverage Map + Activation Tracker',
    kpi7: 'visit_compliance',
    kpi30: 'active_outlet_count',
    proof7: ['abc_outlet_list', 'visit_cadence_plan'],
    proof30: ['territory_map', 'activation_report'],
    impact7: 7,
    impact30: 8
  },
  {
    code: 'MKT-C',
    pillar: 'Market',
    signal_tags: ['value_story_gap', 'stockout_tax'],
    title7: 'Top 10 SKU Shelf Audit + Availability Fix',
    title30: 'Merchandising Standards + Weekly Shelf Audit Loop',
    kpi7: 'shelf_stockout_rate',
    kpi30: 'share_of_shelf',
    proof7: ['shelf_audit_photos', 'availability_fix_log'],
    proof30: ['merch_sop', 'weekly_audit_summary'],
    impact7: 7,
    impact30: 8
  },
  {
    code: 'MKT-D',
    pillar: 'Market',
    signal_tags: ['channel_dependency', 'planning_gap'],
    title7: 'One Controlled Channel Expansion Test',
    title30: 'Channel Strategy + Service Level by Channel',
    kpi7: 'new_channel_sales',
    kpi30: 'profit_by_channel',
    proof7: ['channel_test_plan', 'test_results'],
    proof30: ['channel_strategy_doc', 'channel_margin_report'],
    impact7: 6,
    impact30: 8
  },
  {
    code: 'MKT-E',
    pillar: 'Market',
    signal_tags: ['complaint_handling_gap', 'service_inconsistency'],
    title7: 'Complaint Log + 24h/48h Closure SLA',
    title30: 'Complaint Root-Cause Closure System',
    kpi7: 'complaint_closure_time',
    kpi30: 'repeat_complaint_rate',
    proof7: ['complaint_register', 'sla_tracker'],
    proof30: ['root_cause_closure_log', 'repeat_issue_report'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'MKT-F',
    pillar: 'Market',
    signal_tags: ['bundle_engine_missing', 'value_story_gap'],
    title7: 'Top 5 Cross-Sell Bundles + Rep Offer Script',
    title30: 'Segment Bundle Catalog + Margin Tracking',
    kpi7: 'average_order_value',
    kpi30: 'bundle_adoption_rate',
    proof7: ['bundle_sheet', 'rep_script'],
    proof30: ['bundle_catalog', 'bundle_margin_report'],
    impact7: 7,
    impact30: 8
  },

  // LEADERSHIP
  {
    code: 'LDR-A',
    pillar: 'Leadership',
    signal_tags: ['kpi_cadence_gap', 'no_kpi_ownership'],
    title7: '7 Core KPI Truth Wall (daily/weekly update)',
    title30: 'Dashboard Cadence + KPI Threshold Alerts',
    kpi7: 'kpi_update_compliance',
    kpi30: 'kpi_alert_response_time',
    proof7: ['kpi_wall_photo', 'owner_assignments'],
    proof30: ['dashboard_screens', 'alert_log'],
    impact7: 8,
    impact30: 8
  },
  {
    code: 'LDR-B',
    pillar: 'Leadership',
    signal_tags: ['meeting_no_action', 'no_variance_review'],
    title7: 'Action Tracker + Top 5 Repeat Leak Closures',
    title30: 'Weekly Root-Cause Cadence + No-Repeat Rule',
    kpi7: 'action_closure_rate',
    kpi30: 'repeat_incident_rate',
    proof7: ['action_tracker', 'proof_of_fix'],
    proof30: ['root_cause_notes', 'repeat_incident_trend'],
    impact7: 9,
    impact30: 9
  },
  {
    code: 'LDR-C',
    pillar: 'Leadership',
    signal_tags: ['decision_bottleneck', 'approval_bottleneck'],
    title7: 'Decision Stall Map + 7-Day Delegation Test',
    title30: 'Delegation Matrix + Decision Latency Review',
    kpi7: 'stalled_decisions_count',
    kpi30: 'decision_latency',
    proof7: ['decision_stall_list', 'delegated_decision_log'],
    proof30: ['delegation_matrix', 'decision_latency_report'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'LDR-D',
    pillar: 'Leadership',
    signal_tags: ['cross_team_friction', 'cross_function_breakdown'],
    title7: 'Sales-Ops-Finance 15-min Shared KPI Standup',
    title30: 'Weekly Joint Planning + Shared Outcome Incentives',
    kpi7: 'standup_compliance',
    kpi30: 'shared_kpi_improvement',
    proof7: ['standup_notes', 'shared_kpi_board'],
    proof30: ['joint_planning_minutes', 'incentive_alignment_note'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'LDR-E',
    pillar: 'Leadership',
    signal_tags: ['policy_vagueness', 'accountability_soft'],
    title7: 'Credit/Discount/Returns Policy Publish + Compliance Audit',
    title30: 'Policy Workflow Controls + Exception Tracking',
    kpi7: 'policy_compliance_percent',
    kpi30: 'exception_rate',
    proof7: ['policy_docs', 'policy_audit_samples'],
    proof30: ['workflow_rules', 'exception_report'],
    impact7: 8,
    impact30: 8
  },
  {
    code: 'LDR-F',
    pillar: 'Leadership',
    signal_tags: ['training_planning_gap', 'role_clarity_gap'],
    title7: 'Role Scorecards + 1 Coaching Session per Role',
    title30: 'Monthly Coaching Cadence + Promotion-by-Scorecard',
    kpi7: 'scorecard_coverage',
    kpi30: 'performance_variance',
    proof7: ['role_scorecards', 'coaching_notes'],
    proof30: ['coaching_calendar', 'promotion_criteria'],
    impact7: 7,
    impact30: 8
  },

  // INNOVATION
  {
    code: 'INN-A',
    pillar: 'Innovation',
    signal_tags: ['no_testing_rhythm'],
    title7: 'Run 1 Measured Improvement Experiment',
    title30: 'Experiment Pipeline (2 tests/month)',
    kpi7: 'tests_run',
    kpi30: 'improvement_win_rate',
    proof7: ['experiment_sheet', 'before_after_results'],
    proof30: ['test_pipeline_board', 'learning_library'],
    impact7: 6,
    impact30: 8
  },
  {
    code: 'INN-B',
    pillar: 'Innovation',
    signal_tags: ['offer_measurement_gap', 'no_standard_work'],
    title7: 'Structured Order Capture Template Pilot',
    title30: 'Digital Order Capture Rollout + POD Integration',
    kpi7: 'order_error_rate',
    kpi30: 'tool_adoption_percent',
    proof7: ['order_template', 'pilot_audit'],
    proof30: ['app_usage_report', 'pod_integration_evidence'],
    impact7: 7,
    impact30: 8
  },
  {
    code: 'INN-C',
    pillar: 'Innovation',
    signal_tags: ['sku_clutter', 'bundle_engine_missing'],
    title7: 'Slow-Mover Freeze + 2 Bundle Offers',
    title30: 'SKU Rationalization + Segment Bundle Catalog',
    kpi7: 'average_order_value',
    kpi30: 'inventory_turns',
    proof7: ['slow_mover_freeze', 'bundle_offer_sheet'],
    proof30: ['sku_keep_kill_list', 'bundle_adoption_report'],
    impact7: 7,
    impact30: 8
  },
  {
    code: 'INN-D',
    pillar: 'Innovation',
    signal_tags: ['planning_gap', 'dispatch_delivery_instability'],
    title7: 'Measure Route Core Metrics (drops/km/fuel)',
    title30: 'Route Optimization Framework + Driver Board',
    kpi7: 'drops_per_day',
    kpi30: 'fuel_per_drop',
    proof7: ['route_metric_sheet', 'inefficiency_fix_note'],
    proof30: ['optimized_routes', 'driver_board_photo'],
    impact7: 7,
    impact30: 8
  },
  {
    code: 'INN-E',
    pillar: 'Innovation',
    signal_tags: ['no_kpi_ownership', 'no_market_feedback_loop'],
    title7: 'Single Source Data Sheet + Core Metrics Discipline',
    title30: 'Automated Alerts (stockout/AR/expiry) + Review Rhythm',
    kpi7: 'data_completeness',
    kpi30: 'alert_response_time',
    proof7: ['single_source_sheet', 'metric_update_log'],
    proof30: ['alert_rules', 'weekly_review_notes'],
    impact7: 7,
    impact30: 8
  },
  {
    code: 'INN-F',
    pillar: 'Innovation',
    signal_tags: ['supplier_terms_weak', 'supplier_selection_undisciplined'],
    title7: 'Top SKU Forecast Share + Delivery Window Commitments',
    title30: 'Supplier SLA Reviews + Peak-Season Joint Plan',
    kpi7: 'supplier_otif',
    kpi30: 'stockout_rate',
    proof7: ['supplier_forecast_notes', 'delivery_window_agreements'],
    proof30: ['supplier_sla_reviews', 'peak_plan_doc'],
    impact7: 6,
    impact30: 8
  },

  // RISK
  {
    code: 'RSK-A',
    pillar: 'Risk',
    signal_tags: ['shrinkage_leak', 'inventory_accuracy_gap'],
    title7: 'High-Risk Zone Lock + Variance Audit',
    title30: 'Routine Shrinkage Audits + Segregation Controls',
    kpi7: 'shrinkage_percent',
    kpi30: 'inventory_accuracy',
    proof7: ['zone_access_rules', 'variance_audit'],
    proof30: ['audit_schedule', 'segregation_matrix'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'RSK-B',
    pillar: 'Risk',
    signal_tags: ['credit_contract_gap', 'payment_delay_chokehold'],
    title7: 'Overdue Freeze + Credit Limits',
    title30: 'Credit Scoring Tiers + Default Prevention Playbook',
    kpi7: 'overdue_balance',
    kpi30: 'default_rate',
    proof7: ['credit_freeze_list', 'credit_limits'],
    proof30: ['credit_tiering_model', 'default_playbook'],
    impact7: 9,
    impact30: 9
  },
  {
    code: 'RSK-C',
    pillar: 'Risk',
    signal_tags: ['contract_gap', 'dispatch_delivery_instability'],
    title7: 'POD Mandatory + Dispute Log SLA',
    title30: 'Dispute Policy + Driver POD Compliance Audits',
    kpi7: 'pod_completion',
    kpi30: 'dispute_rate',
    proof7: ['pod_samples', 'dispute_log'],
    proof30: ['dispute_policy', 'driver_audit_results'],
    impact7: 8,
    impact30: 8
  },
  {
    code: 'RSK-D',
    pillar: 'Risk',
    signal_tags: ['cash_recon_gap'],
    title7: 'Cash Reconciliation Discipline + Custody Time Limits',
    title30: 'Cash SOP + Weekly Exception Audit',
    kpi7: 'recon_variance',
    kpi30: 'cash_exception_count',
    proof7: ['cash_recon_log', 'deposit_timing_log'],
    proof30: ['cash_sop', 'weekly_exception_audit'],
    impact7: 8,
    impact30: 8
  },
  {
    code: 'RSK-E',
    pillar: 'Risk',
    signal_tags: ['supplier_doc_gap', 'compliance_blocker_risk'],
    title7: 'Approved Supplier List + Compliance Document Organizer',
    title30: 'Supplier Verification Procedure + Product Compliance Checklist',
    kpi7: 'approved_supplier_coverage',
    kpi30: 'compliance_pass_rate',
    proof7: ['approved_supplier_list', 'compliance_folder_snapshot'],
    proof30: ['verification_procedure', 'compliance_checklist'],
    impact7: 7,
    impact30: 8
  },
  {
    code: 'RSK-F',
    pillar: 'Risk',
    signal_tags: ['safe_handling_gap', 'disaster_recovery_gap'],
    title7: 'Top 5 Business-Killer Risk Sheet + Backup Critical Records',
    title30: 'Continuity Plan + Safety Incident Log + Insurance Review',
    kpi7: 'critical_risk_coverage',
    kpi30: 'incident_closure_time',
    proof7: ['risk_sheet', 'record_backup_proof'],
    proof30: ['continuity_plan', 'incident_log', 'insurance_review_note'],
    impact7: 7,
    impact30: 8
  },

  // PEOPLE
  {
    code: 'PPL-A',
    pillar: 'People',
    signal_tags: ['incentive_misalignment', 'role_clarity_gap'],
    title7: 'Rep/Driver/Warehouse Scorecards (profit-safe behaviors)',
    title30: 'Incentives Tied to Scorecards + Coaching Rhythm',
    kpi7: 'scorecard_coverage',
    kpi30: 'collections_ratio',
    proof7: ['role_scorecards', 'scorecard_baseline'],
    proof30: ['incentive_policy', 'coaching_logs'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'PPL-B',
    pillar: 'People',
    signal_tags: ['service_inconsistency', 'contract_gap'],
    title7: 'Rep/Driver Discipline Reset (route + POD + order format)',
    title30: 'Behavior Audits + Escalation for Repeat Non-Compliance',
    kpi7: 'pod_completion',
    kpi30: 'delivery_dispute_rate',
    proof7: ['discipline_checklist', 'pod_compliance_log'],
    proof30: ['behavior_audit_report', 'escalation_records'],
    impact7: 7,
    impact30: 8
  },
  {
    code: 'PPL-C',
    pillar: 'People',
    signal_tags: ['training_gap', 'training_planning_gap'],
    title7: 'Warehouse Pick-Pack-Check Training Sprint',
    title30: 'Warehouse SOP Certification Matrix + Cross-Shift Audits',
    kpi7: 'pick_accuracy',
    kpi30: 'warehouse_error_rate',
    proof7: ['training_attendance', 'skill_checkoff'],
    proof30: ['certification_matrix', 'shift_audit_log'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'PPL-D',
    pillar: 'People',
    signal_tags: ['hero_staff_dependence', 'onboarding_gap'],
    title7: 'Single-Point-Failure Task Map + Cross-Train 2 Tasks',
    title30: 'Coverage Matrix + Backup Role Assignments',
    kpi7: 'critical_coverage_gaps',
    kpi30: 'staffing_downtime_incidents',
    proof7: ['single_point_failure_map', 'cross_training_log'],
    proof30: ['coverage_matrix', 'backup_role_assignments'],
    impact7: 7,
    impact30: 8
  },
  {
    code: 'PPL-E',
    pillar: 'People',
    signal_tags: ['fear_silence', 'blame_culture'],
    title7: 'Safe Reporting Channel + Fix One Reported Issue Fast',
    title30: 'No-Blame Incident Review Cadence + Repeat Leak Removal',
    kpi7: 'issues_reported_count',
    kpi30: 'repeat_incident_rate',
    proof7: ['safe_reporting_channel', 'first_issue_fix_proof'],
    proof30: ['incident_review_notes', 'repeat_leak_elimination_log'],
    impact7: 7,
    impact30: 8
  },
  {
    code: 'PPL-F',
    pillar: 'People',
    signal_tags: ['onboarding_gap', 'peak_season_burnout'],
    title7: 'Role Onboarding Checklist + First-7-Day Success Criteria',
    title30: '30-60-90 Onboarding + Top Performer Retention Plan',
    kpi7: 'new_hire_error_rate',
    kpi30: 'turnover_rate',
    proof7: ['onboarding_checklist', 'first_week_scorecard'],
    proof30: ['30_60_90_plan', 'retention_actions'],
    impact7: 7,
    impact30: 8
  }
];

export const actions: ActionDefinition[] = packs.flatMap((pack) => {
  const normalized = pack.code.replace(/-/g, '_');
  const line_type = ['all'];

  const sevenDay: ActionDefinition = {
    action_id: `ACT_FMCG_${normalized}_7`,
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
    action_id: `ACT_FMCG_${normalized}_30`,
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
