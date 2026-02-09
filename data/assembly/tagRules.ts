import { SignalTag } from '../../types';

export type AssemblyTagSeverity = 'Watch' | 'Critical';

export interface AssemblyAutoTag {
  tag_id: string;
  severity: AssemblyTagSeverity;
  trigger_signals: SignalTag[];
  why_it_matters: string;
  report_behavior: string;
  fix_mode_behavior: string;
  marketplace_match: string[];
}

interface AssemblyTagRule {
  tag_id: string;
  related_signals: SignalTag[];
  critical_signals?: SignalTag[];
  watch_min_matches?: number;
  critical_min_matches?: number;
  why_it_matters: string;
  report_behavior: string;
  fix_mode_behavior: string;
  marketplace_match: string[];
}

const RULES: AssemblyTagRule[] = [
  {
    tag_id: 'REWORK_TAX',
    related_signals: ['quality_built_late', 'yield_bleed', 'waste_not_costed'],
    critical_signals: ['quality_built_late'],
    why_it_matters: 'Capacity is being converted into rework instead of sellable units.',
    report_behavior: 'Emphasize Capacity Theft and repeat-defect narrative.',
    fix_mode_behavior: 'Prioritize FPY containment, defect Pareto, and stage-gate checks.',
    marketplace_match: ['Lean/Quality Engineer']
  },
  {
    tag_id: 'ESCAPE_RISK',
    related_signals: ['quality_built_late', 'complaint_handling_gap', 'traceability_gap'],
    critical_signals: ['traceability_gap', 'quality_built_late'],
    why_it_matters: 'Field escapes can rapidly convert into warranty and trust collapse.',
    report_behavior: 'Use Trust Tax framing and incident growth scenario.',
    fix_mode_behavior: 'Add containment, return-theme closure, and test-gate reinforcement.',
    marketplace_match: ['Quality Systems Consultant']
  },
  {
    tag_id: 'TEST_BOTTLENECK',
    related_signals: ['measurement_blindspot', 'quality_built_late', 'no_product_testing_rhythm'],
    why_it_matters: 'Testing is acting as a rework funnel instead of prevention layer.',
    report_behavior: 'Highlight cycle-time drag and retest inflation.',
    fix_mode_behavior: 'Run calibration blitz and redesign early test coverage.',
    marketplace_match: ['Test Engineering Specialist']
  },
  {
    tag_id: 'ESD_EXPOSURE',
    related_signals: ['hygiene_drift', 'traceability_gap', 'data_security_gap'],
    critical_signals: ['hygiene_drift'],
    why_it_matters: 'Intermittent failure exposure rises when ESD discipline drifts.',
    report_behavior: 'Emphasize latent failure risk and audit exposure.',
    fix_mode_behavior: 'Deploy ESD audit cadence with logged enforcement.',
    marketplace_match: ['ESD/Compliance Expert']
  },
  {
    tag_id: 'VARIANT_EXPLOSION',
    related_signals: ['sku_complexity_tax', 'changeover_black_hole', 'cross_function_breakdown', 'quality_definition_gap'],
    critical_signals: ['sku_complexity_tax'],
    why_it_matters: 'Complexity is growing faster than process control.',
    report_behavior: 'Apply Margin Erosion framing focused on changeover tax.',
    fix_mode_behavior: 'Launch SKU rationalization and modular standardization sprint.',
    marketplace_match: ['Operations Strategy Consultant']
  },
  {
    tag_id: 'PLANNING_BREAKDOWN',
    related_signals: ['planning_gap', 'purchase_panic', 'inventory_blindspot', 'supplier_variance_risk'],
    critical_signals: ['planning_gap'],
    why_it_matters: 'Rescue spending is replacing stable production planning.',
    report_behavior: 'Stress cash bleed from line stops and premium freight.',
    fix_mode_behavior: 'Build kitting discipline, shortage board, and supplier SLA controls.',
    marketplace_match: ['Supply Chain Consultant']
  },
  {
    tag_id: 'TRACEABILITY_GAP',
    related_signals: ['traceability_gap', 'contract_gap', 'disaster_recovery_gap'],
    critical_signals: ['traceability_gap'],
    why_it_matters: 'Containment speed collapses when lot-level history is incomplete.',
    report_behavior: 'Use Risk Exposure framing and recall narrative.',
    fix_mode_behavior: 'Install minimum viable traceability and drill-based validation.',
    marketplace_match: ['QMS/Traceability Specialist']
  },
  {
    tag_id: 'ECO_CHAOS',
    related_signals: ['cross_function_breakdown', 'sku_complexity_tax', 'no_variance_review'],
    why_it_matters: 'Uncontrolled change creates scrap, confusion, and dead stock.',
    report_behavior: 'Highlight change-induced instability and margin leakage.',
    fix_mode_behavior: 'Enforce ECO gates, communication templates, and pilot release rules.',
    marketplace_match: ['Engineering Change Consultant']
  },
  {
    tag_id: 'MARGIN_MELTDOWN',
    related_signals: ['pricing_margin_blindspot', 'waste_not_costed', 'costing_gap'],
    critical_signals: ['pricing_margin_blindspot', 'costing_gap'],
    why_it_matters: 'Revenue activity is not converting into protected contribution margin.',
    report_behavior: 'Use Margin Erosion and Busy-but-Broke narrative.',
    fix_mode_behavior: 'Generate margin bridge and quote guardrails.',
    marketplace_match: ['Finance Ops Consultant']
  },
  {
    tag_id: 'CASH_LOCKED_IN_STOCK',
    related_signals: ['inventory_blindspot', 'supplier_variance_risk', 'payment_delay_chokehold'],
    critical_signals: ['payment_delay_chokehold'],
    why_it_matters: 'Cash is trapped in inventory and receivables while operations stay exposed.',
    report_behavior: 'Use Cash Trap framing with working-capital focus.',
    fix_mode_behavior: 'Run inventory aging cleanup and DSO control routine.',
    marketplace_match: ['Inventory & Cost Control']
  },
  {
    tag_id: 'EXPEDITE_ADDICTION',
    related_signals: ['purchase_panic', 'planning_gap', 'decision_bottleneck'],
    why_it_matters: 'Urgency spending is masking process instability.',
    report_behavior: 'Highlight premium-freight leakage trend.',
    fix_mode_behavior: 'Add reason-code enforcement and planning recovery actions.',
    marketplace_match: ['Supply Chain Consultant']
  },
  {
    tag_id: 'QUOTE_LOSING_MONEY',
    related_signals: ['costing_gap', 'pricing_margin_blindspot', 'sku_complexity_tax'],
    critical_signals: ['costing_gap'],
    why_it_matters: 'Commercial wins are not screened for real complexity cost.',
    report_behavior: 'Emphasize unit economics gap at RFQ stage.',
    fix_mode_behavior: 'Implement quote checklist and pricing tier approvals.',
    marketplace_match: ['Pricing/Quoting Expert']
  },
  {
    tag_id: 'AR_COLLECTION_RISK',
    related_signals: ['payment_delay_chokehold', 'channel_dependency'],
    critical_signals: ['payment_delay_chokehold'],
    why_it_matters: 'Cash stress rises when collections lag behind delivery.',
    report_behavior: 'Frame as cash conversion instability.',
    fix_mode_behavior: 'Deploy receivable cadence and escalation policy.',
    marketplace_match: ['Finance Ops Consultant']
  },
  {
    tag_id: 'OTIF_AT_RISK',
    related_signals: ['planning_gap', 'bottleneck_bounce', 'spec_drift_discount'],
    critical_signals: ['planning_gap'],
    why_it_matters: 'Delivery reliability drops when flow and requirements are unstable.',
    report_behavior: 'Use Trust Tax framing on schedule misses.',
    fix_mode_behavior: 'Prioritize schedule adherence and bottleneck stabilization.',
    marketplace_match: ['Operations Improvement Specialist']
  },
  {
    tag_id: 'SPEC_DISPUTE_ZONE',
    related_signals: ['spec_drift_discount', 'contract_gap', 'cross_function_breakdown'],
    critical_signals: ['spec_drift_discount', 'contract_gap'],
    why_it_matters: 'Unclear acceptance boundaries convert into costly dispute loops.',
    report_behavior: 'Focus on acceptance criteria and revision control risk.',
    fix_mode_behavior: 'Install CTQ sign-off and change control discipline.',
    marketplace_match: ['Contract/Quality Specialist']
  },
  {
    tag_id: 'CUSTOMER_ESCALATION_LOOP',
    related_signals: ['complaint_handling_gap', 'weak_onboarding', 'no_market_feedback_loop'],
    why_it_matters: 'Escalations consume leadership and engineering bandwidth repeatedly.',
    report_behavior: 'Highlight recurring escalation and support load story.',
    fix_mode_behavior: 'Deploy triage SLA and recurrence-kill closure process.',
    marketplace_match: ['Customer Operations Consultant']
  },
  {
    tag_id: 'COMMODITY_PRESSURE',
    related_signals: ['pricing_positioning_gap', 'weak_proof_pack', 'channel_dependency'],
    why_it_matters: 'Weak differentiation forces price-led negotiations.',
    report_behavior: 'Emphasize trust proof gap and margin compression.',
    fix_mode_behavior: 'Build proof-pack assets and value-positioning standard.',
    marketplace_match: ['Marketing/Positioning Consultant']
  },
  {
    tag_id: 'FIRE_FIGHTING_CULTURE',
    related_signals: ['no_kpi_ownership', 'no_meeting_to_action', 'no_variance_review', 'decision_bottleneck'],
    critical_signals: ['no_kpi_ownership', 'no_meeting_to_action'],
    why_it_matters: 'Without cadence and closure, recurring losses become structural.',
    report_behavior: 'Use Capacity Theft framing on repeated operational fire drills.',
    fix_mode_behavior: 'Install daily board, weekly closure, and owner discipline.',
    marketplace_match: ['Leadership/Ops Coach']
  },
  {
    tag_id: 'DECISION_BOTTLENECK',
    related_signals: ['decision_bottleneck', 'role_clarity_gap'],
    critical_signals: ['decision_bottleneck'],
    why_it_matters: 'Slow approvals convert solvable issues into delivery risk.',
    report_behavior: 'Stress decision latency impact on OTIF and containment.',
    fix_mode_behavior: 'Introduce delegation matrix and backup owners.',
    marketplace_match: ['Leadership Coach']
  },
  {
    tag_id: 'SHIFT_VARIANCE',
    related_signals: ['weak_shift_handover', 'training_gap', 'role_clarity_gap', 'hero_operator_dependence'],
    critical_signals: ['weak_shift_handover', 'training_gap'],
    why_it_matters: 'Output quality changes by shift, not by standard.',
    report_behavior: 'Use Talent Drain framing with day/night gap evidence.',
    fix_mode_behavior: 'Deploy handover routine and station certification.',
    marketplace_match: ['Training/Ops Specialist']
  },
  {
    tag_id: 'BURNOUT_DEFECT_LOOP',
    related_signals: ['hero_operator_dependence', 'weak_shift_handover', 'fear_index'],
    why_it_matters: 'Fatigue and overload amplify defect and turnover risk.',
    report_behavior: 'Highlight human-capacity constraints behind quality drift.',
    fix_mode_behavior: 'Add overtime controls and critical-role coverage plan.',
    marketplace_match: ['HR/Ops Coach']
  },
  {
    tag_id: 'TRIBAL_KNOWLEDGE_RISK',
    related_signals: ['hero_operator_dependence', 'training_gap', 'no_standard_work'],
    critical_signals: ['hero_operator_dependence'],
    why_it_matters: 'Key knowledge concentration creates fragile execution.',
    report_behavior: 'Emphasize single-point failure and scaling risk.',
    fix_mode_behavior: 'Capture setup SOPs and cross-train backups.',
    marketplace_match: ['Systems Builder']
  },
  {
    tag_id: 'FEAR_BASED_EXECUTION',
    related_signals: ['fear_index', 'blame_culture', 'low_psych_safety'],
    critical_signals: ['fear_index', 'low_psych_safety'],
    why_it_matters: 'Late reporting increases escape probability and containment cost.',
    report_behavior: 'Use Risk Exposure framing on hidden issue dynamics.',
    fix_mode_behavior: 'Install safe reporting and manager coaching routines.',
    marketplace_match: ['HR + Leadership Coach']
  },
  {
    tag_id: 'AUDIT_PANIC_MODE',
    related_signals: ['compliance_blocker_risk', 'traceability_gap', 'disaster_recovery_gap'],
    critical_signals: ['compliance_blocker_risk'],
    why_it_matters: 'Compliance gaps can block contracts and trigger escalation.',
    report_behavior: 'Stress readiness gaps and audit closure urgency.',
    fix_mode_behavior: 'Run audit readiness sprint with evidence tracker.',
    marketplace_match: ['Compliance/QMS Consultant']
  },
  {
    tag_id: 'COUNTERFEIT_COMPONENT_RISK',
    related_signals: ['supplier_variance_risk', 'traceability_gap'],
    critical_signals: ['supplier_variance_risk'],
    why_it_matters: 'Unverified sourcing can trigger catastrophic reliability failures.',
    report_behavior: 'Emphasize incoming quality and provenance controls.',
    fix_mode_behavior: 'Enforce approved supplier list and lot authentication checks.',
    marketplace_match: ['Supply Chain/Compliance Consultant']
  },
  {
    tag_id: 'SECURITY_FIRMWARE_RISK',
    related_signals: ['data_security_gap', 'traceability_gap', 'contract_gap'],
    critical_signals: ['data_security_gap'],
    why_it_matters: 'Version and access weakness can create safety, legal, and trust shock.',
    report_behavior: 'Use Risk Exposure framing around firmware governance.',
    fix_mode_behavior: 'Lock firmware release, access control, and verification path.',
    marketplace_match: ['Cybersecurity/Embedded Specialist']
  }
];

const DEFAULT_WATCH_MIN = 2;
const DEFAULT_CRITICAL_MIN = 3;
const STRONG_SCORE_THRESHOLD = 3;

const asSignalSet = (scores: Array<{ tag: SignalTag; score: number }>) =>
  new Set(scores.filter((s) => s.score > 0).map((s) => s.tag));

const isStrong = (tag: SignalTag, scores: Array<{ tag: SignalTag; score: number }>) =>
  (scores.find((s) => s.tag === tag)?.score || 0) >= STRONG_SCORE_THRESHOLD;

export const deriveAssemblyAutoTags = (
  signalScores: Array<{ tag: SignalTag; score: number; count: number }>
): AssemblyAutoTag[] => {
  const present = asSignalSet(signalScores);
  const active: AssemblyAutoTag[] = [];

  RULES.forEach((rule) => {
    const matches = rule.related_signals.filter((s) => present.has(s));
    const watchMin = rule.watch_min_matches || DEFAULT_WATCH_MIN;
    const criticalMin = rule.critical_min_matches || DEFAULT_CRITICAL_MIN;
    const criticalSignalHit = (rule.critical_signals || []).some((s) => present.has(s));
    const strongSingle = rule.related_signals.some((s) => isStrong(s, signalScores));

    let severity: AssemblyTagSeverity | null = null;

    if (matches.length >= criticalMin || criticalSignalHit) {
      severity = 'Critical';
    } else if (matches.length >= watchMin || strongSingle) {
      severity = 'Watch';
    }

    if (!severity) return;

    active.push({
      tag_id: rule.tag_id,
      severity,
      trigger_signals: matches,
      why_it_matters: rule.why_it_matters,
      report_behavior: rule.report_behavior,
      fix_mode_behavior: rule.fix_mode_behavior,
      marketplace_match: rule.marketplace_match
    });
  });

  return active.sort((a, b) => {
    if (a.severity !== b.severity) return a.severity === 'Critical' ? -1 : 1;
    return b.trigger_signals.length - a.trigger_signals.length;
  });
};
