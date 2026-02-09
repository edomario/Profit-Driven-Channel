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
    code: 'OPS-P1',
    pillar: 'Operations',
    signal_tags: ['inventory_accuracy_gap', 'stockout_tax', 'restock_delay', 'slow_mover_attachment'],
    title7: 'Top-30 Fast Movers + Daily Stock Truth Count',
    title30: 'ABC Cycle Counts + Reorder Triggers (Top-50 SKUs)',
    kpi7: 'stockout_rate_top30',
    kpi30: 'inventory_accuracy',
    proof7: ['top30_fast_movers', 'daily_count_sheet', 'labeled_zone_photos'],
    proof30: ['abc_count_plan', 'variance_log', 'min_max_rules'],
    impact7: 9,
    impact30: 10
  },
  {
    code: 'OPS-P2',
    pillar: 'Operations',
    signal_tags: ['dispatch_delivery_instability', 'contract_gap'],
    title7: 'Dispatch Pick List + Load Check + POD Discipline',
    title30: 'Route Cost Visibility + Delivery SOP by Product Type',
    kpi7: 'delivery_accuracy',
    kpi30: 'fuel_cost_per_order',
    proof7: ['pick_list_samples', 'pod_samples', 'wrong_item_log'],
    proof30: ['route_cost_tracker', 'delivery_sop', 'dispute_log'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'OPS-P3',
    pillar: 'Operations',
    signal_tags: ['returns_damage_blindspot', 'safe_handling_gap'],
    title7: 'Breakage/Returns Quarantine + Cause Logging',
    title30: 'Supplier Defect Loop + Handling/Stacking Standards',
    kpi7: 'breakage_rate',
    kpi30: 'returns_rate',
    proof7: ['quarantine_photo', 'breakage_returns_log'],
    proof30: ['supplier_defect_scorecard', 'handling_training_log'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'OPS-P4',
    pillar: 'Operations',
    signal_tags: ['receiving_slippage', 'supplier_doc_gap'],
    title7: 'Receiving Checklist (SKU/size/qty/condition) + Evidence Capture',
    title30: 'Supplier Receiving Accuracy Scorecard + Correction Cadence',
    kpi7: 'receiving_error_rate',
    kpi30: 'supplier_otif',
    proof7: ['receiving_checklists', 'receiving_photos'],
    proof30: ['supplier_scorecard', 'supplier_correction_notes'],
    impact7: 7,
    impact30: 8
  },
  {
    code: 'OPS-P5',
    pillar: 'Operations',
    signal_tags: ['kpi_cadence_gap', 'no_variance_review'],
    title7: 'Open/Close Routine + Exception Log',
    title30: 'Routine Compliance Tracker + Shift Handover Discipline',
    kpi7: 'open_close_compliance',
    kpi30: 'incident_repeat_rate',
    proof7: ['open_close_sheet', 'exception_log'],
    proof30: ['compliance_tracker', 'handover_log'],
    impact7: 7,
    impact30: 8
  },

  // MONEY
  {
    code: 'MNY-P1',
    pillar: 'Money',
    signal_tags: ['pricing_margin_blindspot', 'category_margin_blindspot', 'pricing_inconsistency', 'supplier_terms_weak'],
    title7: 'Category Margin Map + Top-50 Price Book',
    title30: 'Weekly Margin Leak Review + Price Update Cadence',
    kpi7: 'gross_margin_by_category',
    kpi30: 'net_margin_estimate',
    proof7: ['margin_map_sheet', 'price_book'],
    proof30: ['margin_leak_log', 'price_update_log'],
    impact7: 9,
    impact30: 10
  },
  {
    code: 'MNY-P2',
    pillar: 'Money',
    signal_tags: ['discounting_leak', 'pricing_inconsistency'],
    title7: 'Discount Guardrails + Approval Limits',
    title30: 'Discount Drift Audit + Scripted Value-Based Selling',
    kpi7: 'discount_rate',
    kpi30: 'price_variance',
    proof7: ['discount_policy', 'approval_log'],
    proof30: ['discount_drift_report', 'sales_script_brief'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'MNY-P3',
    pillar: 'Money',
    signal_tags: ['cash_recon_gap'],
    title7: 'Daily Cash + Momo + Bank Reconciliation',
    title30: 'Cash Audit Spot Checks + Refund SOP',
    kpi7: 'daily_recon_variance',
    kpi30: 'cash_exception_count',
    proof7: ['daily_reconciliation_sheets', 'variance_log'],
    proof30: ['audit_notes', 'refund_sop'],
    impact7: 9,
    impact30: 9
  },
  {
    code: 'MNY-P4',
    pillar: 'Money',
    signal_tags: ['credit_terms_risk', 'payment_delay_chokehold', 'payment_terms_risk'],
    title7: 'Credit Tiers + AR Aging + Collections Cadence',
    title30: 'Credit Cutoff Enforcement + Collections Escalation Ladder',
    kpi7: 'ar_overdue_percent',
    kpi30: 'dso',
    proof7: ['credit_policy', 'ar_aging_sheet', 'collections_log'],
    proof30: ['cutoff_rule_evidence', 'escalation_log'],
    impact7: 9,
    impact30: 10
  },
  {
    code: 'MNY-P5',
    pillar: 'Money',
    signal_tags: ['category_margin_blindspot', 'dispatch_delivery_instability'],
    title7: 'Delivery Cost per Order Visibility',
    title30: 'Delivery Cost Recovery Through Pricing/Minimum-Order Rules',
    kpi7: 'delivery_cost_per_order',
    kpi30: 'order_margin_after_delivery',
    proof7: ['delivery_cost_sheet', 'sample_orders'],
    proof30: ['pricing_adjustment_rules', 'margin_after_delivery_report'],
    impact7: 7,
    impact30: 8
  },

  // MARKET
  {
    code: 'MKT-P1',
    pillar: 'Market',
    signal_tags: ['followup_gap', 'segment_blindspot'],
    title7: 'Contractor Register + Quote Follow-up Engine',
    title30: 'Contractor Tier Program + Quote Conversion Cadence',
    kpi7: 'quote_to_sale_conversion',
    kpi30: 'repeat_revenue_percent',
    proof7: ['contractor_register', 'quote_log', 'followup_templates'],
    proof30: ['contractor_tier_doc', 'conversion_report'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'MKT-P2',
    pillar: 'Market',
    signal_tags: ['followup_gap', 'value_story_gap'],
    title7: 'Repeat Buyer and Referral Routine',
    title30: 'Segmented Follow-up Calendar + Repeat Trigger Rules',
    kpi7: 'repeat_customer_rate',
    kpi30: 'referral_rate',
    proof7: ['followup_log', 'referral_ask_script'],
    proof30: ['followup_calendar', 'repeat_trigger_sheet'],
    impact7: 7,
    impact30: 8
  },
  {
    code: 'MKT-P3',
    pillar: 'Market',
    signal_tags: ['bundle_engine_missing', 'offer_measurement_gap'],
    title7: 'Project Kits (roof/plumbing/painting) + Offer Test',
    title30: 'Standard Project Quote Templates + Bundle Optimization',
    kpi7: 'bundle_adoption_rate',
    kpi30: 'average_order_value',
    proof7: ['project_kit_list', 'test_results_week1'],
    proof30: ['quote_templates', 'bundle_performance_report'],
    impact7: 8,
    impact30: 8
  },

  // LEADERSHIP
  {
    code: 'LDR-P1',
    pillar: 'Leadership',
    signal_tags: ['kpi_cadence_gap', 'no_kpi_ownership'],
    title7: 'KPI Wall + Daily 10-minute Standup',
    title30: 'Weekly Root-Cause Closure on Top 3 Leaks',
    kpi7: 'kpi_update_compliance',
    kpi30: 'repeat_leak_rate',
    proof7: ['kpi_wall_photo', 'standup_notes'],
    proof30: ['root_cause_actions', 'closure_evidence'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'LDR-P2',
    pillar: 'Leadership',
    signal_tags: ['decision_bottleneck', 'approval_bottleneck', 'policy_vagueness'],
    title7: 'Delegation Limits for Discount/Credit/Refund Decisions',
    title30: 'Approval Matrix + Decision Latency Tracker',
    kpi7: 'decision_latency',
    kpi30: 'approval_backlog',
    proof7: ['delegation_rules', 'decision_examples'],
    proof30: ['approval_matrix', 'latency_report'],
    impact7: 8,
    impact30: 8
  },
  {
    code: 'LDR-P3',
    pillar: 'Leadership',
    signal_tags: ['training_planning_gap', 'accountability_soft', 'no_variance_review'],
    title7: 'Role Scorecards + Weekly Coaching Start',
    title30: 'Performance Cadence + Role Ownership Audit',
    kpi7: 'scorecard_coverage',
    kpi30: 'task_closure_rate',
    proof7: ['role_scorecards', 'coaching_notes'],
    proof30: ['coaching_calendar', 'ownership_audit'],
    impact7: 7,
    impact30: 8
  },

  // INNOVATION
  {
    code: 'INN-P1',
    pillar: 'Innovation',
    signal_tags: ['no_testing_rhythm', 'bundle_engine_missing'],
    title7: 'Run One Measured Offer Experiment',
    title30: 'Monthly Experiment Pipeline + Win/Loss Library',
    kpi7: 'experiments_run',
    kpi30: 'experiment_win_rate',
    proof7: ['experiment_sheet', 'baseline_vs_result'],
    proof30: ['experiment_pipeline', 'win_loss_library'],
    impact7: 6,
    impact30: 8
  },
  {
    code: 'INN-P2',
    pillar: 'Innovation',
    signal_tags: ['offer_measurement_gap', 'no_market_feedback_loop', 'training_planning_gap'],
    title7: 'Automation Lite (templates, labels, quote format)',
    title30: 'Workflow Standardization with Training and Adoption Tracking',
    kpi7: 'template_adoption',
    kpi30: 'workflow_error_rate',
    proof7: ['templates_pack', 'usage_log_week1'],
    proof30: ['workflow_sop_pack', 'adoption_report'],
    impact7: 7,
    impact30: 8
  },

  // RISK
  {
    code: 'RSK-P1',
    pillar: 'Risk',
    signal_tags: ['supplier_doc_gap', 'supplier_selection_undisciplined'],
    title7: 'Counterfeit and Supplier Firewall',
    title30: 'Supplier Verification Scorecards + Defect Response SOP',
    kpi7: 'counterfeit_incidents',
    kpi30: 'supplier_defect_rate',
    proof7: ['approved_supplier_list', 'verification_checklist'],
    proof30: ['supplier_scorecards', 'defect_response_sop'],
    impact7: 9,
    impact30: 9
  },
  {
    code: 'RSK-P2',
    pillar: 'Risk',
    signal_tags: ['shrinkage_leak', 'inventory_accuracy_gap'],
    title7: 'Yard Shrinkage Controls (access + high-risk counts)',
    title30: 'Shrinkage Dashboard + Weekly Variance Reviews',
    kpi7: 'shrinkage_percent',
    kpi30: 'inventory_accuracy',
    proof7: ['access_rules', 'high_risk_count_log'],
    proof30: ['shrinkage_dashboard', 'variance_review_notes'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'RSK-P3',
    pillar: 'Risk',
    signal_tags: ['contract_gap', 'policy_vagueness'],
    title7: 'Dispute Defense: Terms + POD + Returns SOP',
    title30: 'Dispute Trend Elimination Loop',
    kpi7: 'dispute_rate',
    kpi30: 'return_dispute_rate',
    proof7: ['written_terms', 'pod_samples', 'returns_sop'],
    proof30: ['dispute_log', 'closure_actions'],
    impact7: 8,
    impact30: 8
  },
  {
    code: 'RSK-P4',
    pillar: 'Risk',
    signal_tags: ['safe_handling_gap', 'no_variance_review'],
    title7: 'Safety Basics (PPE/stacking/handling) + Incident Log',
    title30: 'Safety Audit Rhythm + Corrective Action Tracker',
    kpi7: 'safety_incidents',
    kpi30: 'safety_audit_pass_rate',
    proof7: ['safety_rules', 'incident_log'],
    proof30: ['audit_results', 'corrective_actions'],
    impact7: 7,
    impact30: 8
  },

  // PEOPLE
  {
    code: 'PPL-P1',
    pillar: 'People',
    signal_tags: ['incentive_misalignment', 'accountability_soft'],
    title7: 'Profit-Aligned Incentives (margin + low errors + low disputes)',
    title30: 'Incentive Outcome Review by Staff',
    kpi7: 'incentive_alignment_score',
    kpi30: 'returns_by_staff',
    proof7: ['incentive_rules', 'staff_brief'],
    proof30: ['staff_outcome_report', 'incentive_review_notes'],
    impact7: 8,
    impact30: 9
  },
  {
    code: 'PPL-P2',
    pillar: 'People',
    signal_tags: ['onboarding_gap', 'training_gap', 'service_inconsistency'],
    title7: 'Onboarding Checklist + Role Certification Start',
    title30: 'Weekly Training Cadence + Coverage Matrix',
    kpi7: 'onboarding_completion',
    kpi30: 'performance_variance_by_shift',
    proof7: ['onboarding_checklist', 'initial_skill_checks'],
    proof30: ['training_log', 'coverage_matrix'],
    impact7: 8,
    impact30: 9
  }
];

export const actions: ActionDefinition[] = packs.flatMap((pack) => {
  const normalized = pack.code.replace(/-/g, '_');
  const line_type = ['all'];

  const sevenDay: ActionDefinition = {
    action_id: `ACT_HARDWARE_${normalized}_7`,
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
    action_id: `ACT_HARDWARE_${normalized}_30`,
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
