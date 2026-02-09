
import { PillarScores, KPI } from "../types";

export interface GoalTemplate {
  id: string;
  name: string;
  pillarWeights: PillarScores; // Relative weights 0-100
  starterTaskIds: string[];
  defaultKPIs: KPI[];
  matchKeywords: string[]; // Goals that map to this template
}

export const GOAL_TEMPLATES: Record<string, GoalTemplate> = {
  G1: {
    id: 'G1',
    name: 'Cash Flow Stabilizer',
    pillarWeights: { money: 30, operations: 15, risk: 15, market: 12, leadership: 10, innovation: 8, people: 10 },
    starterTaskIds: ['FUEL_04', 'FUEL_01', 'FUEL_02', 'FUEL_03', 'FUEL_05', 'FUEL_07', 'FUEL_06', 'FUEL_09', 'ENG_08', 'SHIELD_05'],
    defaultKPIs: [
      { id: 'days_cash', name: 'Days cash on hand', pillar: ['money'], frequency: 'weekly' },
      { id: 'overdue', name: 'Overdue invoices amount', pillar: ['money'], frequency: 'weekly' },
      { id: 'collection', name: 'Collection rate %', pillar: ['money'], frequency: 'monthly' }
    ],
    matchKeywords: ['Cash Flow', 'Monthly Income', 'Debt', 'Collections']
  },
  G2: {
    id: 'G2',
    name: 'Profit & Margin Builder',
    pillarWeights: { money: 26, innovation: 16, market: 14, operations: 14, risk: 10, leadership: 10, people: 10 },
    starterTaskIds: ['FUEL_05', 'FUEL_06', 'PULSE_06', 'VOICE_07', 'ENG_05', 'FUEL_07', 'PULSE_05', 'VOICE_06', 'ENG_09', 'FUEL_08'],
    defaultKPIs: [
      { id: 'gross_margin', name: 'Gross Margin %', pillar: ['money'], frequency: 'monthly' },
      { id: 'net_profit', name: 'Net Profit %', pillar: ['money'], frequency: 'monthly' },
      { id: 'discount_rate', name: 'Avg Discount %', pillar: ['money'], frequency: 'weekly' }
    ],
    matchKeywords: ['Profit', 'Margin', 'Prices', 'Cost']
  },
  G3: {
    id: 'G3',
    name: 'Sales Pipeline Growth',
    pillarWeights: { market: 30, innovation: 16, operations: 14, money: 12, leadership: 10, people: 10, risk: 8 },
    starterTaskIds: ['VOICE_02', 'VOICE_03', 'VOICE_01', 'VOICE_04', 'VOICE_05', 'VOICE_07', 'VOICE_06', 'VOICE_09', 'PULSE_06', 'ENG_01'],
    defaultKPIs: [
      { id: 'leads', name: 'New Leads / Week', pillar: ['market'], frequency: 'weekly' },
      { id: 'conversion', name: 'Lead-to-Deal %', pillar: ['market'], frequency: 'monthly' },
      { id: 'response', name: 'Avg Response Time', pillar: ['market'], frequency: 'weekly' }
    ],
    matchKeywords: ['Revenue', 'Customers', 'Leads', 'Sales', 'Growth']
  },
  G4: {
    id: 'G4',
    name: 'Operations Speed & Consistency',
    pillarWeights: { operations: 30, people: 18, leadership: 14, risk: 12, money: 10, innovation: 8, market: 8 },
    starterTaskIds: ['ENG_01', 'ENG_02', 'ENG_07', 'ENG_03', 'TRIBE_01', 'TRIBE_02', 'ENG_06', 'ENG_04', 'BRAIN_03', 'ENG_09'],
    defaultKPIs: [
      { id: 'ontime', name: 'On-Time Delivery %', pillar: ['operations'], frequency: 'weekly' },
      { id: 'cycle_time', name: 'Avg Cycle Time', pillar: ['operations'], frequency: 'weekly' },
      { id: 'rework', name: 'Rework Count', pillar: ['operations'], frequency: 'weekly' }
    ],
    matchKeywords: ['Operations', 'Speed', 'Consistency', 'Delays', 'SOPs']
  },
  G5: {
    id: 'G5',
    name: 'Product Quality & Upgrade',
    pillarWeights: { innovation: 30, market: 18, operations: 14, money: 12, leadership: 10, people: 10, risk: 6 },
    starterTaskIds: ['PULSE_01', 'PULSE_02', 'PULSE_03', 'PULSE_06', 'PULSE_10', 'VOICE_10', 'VOICE_08', 'PULSE_05', 'PULSE_09', 'VOICE_05'],
    defaultKPIs: [
      { id: 'nps', name: 'NPS / Satisfaction', pillar: ['innovation'], frequency: 'monthly' },
      { id: 'returns', name: 'Return / Refund Rate', pillar: ['innovation', 'money'], frequency: 'weekly' },
      { id: 'churn', name: 'Churn Rate', pillar: ['innovation'], frequency: 'monthly' }
    ],
    matchKeywords: ['Quality', 'Product', 'Service', 'Innovation', 'Feedback']
  },
  G6: {
    id: 'G6',
    name: 'Risk & Compliance Fortress',
    pillarWeights: { risk: 32, money: 14, leadership: 14, operations: 12, people: 10, market: 10, innovation: 8 },
    starterTaskIds: ['SHIELD_01', 'SHIELD_03', 'SHIELD_04', 'SHIELD_05', 'SHIELD_09', 'SHIELD_08', 'FUEL_08', 'SHIELD_07', 'ENG_01', 'BRAIN_02'],
    defaultKPIs: [
      { id: 'risk_score', name: 'Risk Exposure Score', pillar: ['risk'], frequency: 'monthly' },
      { id: 'compliance', name: 'Compliance Check %', pillar: ['risk'], frequency: 'monthly' },
      { id: 'incidents', name: 'Security Incidents', pillar: ['risk'], frequency: 'weekly' }
    ],
    matchKeywords: ['Risk', 'Compliance', 'Legal', 'Security', 'Fraud']
  },
  G7: {
    id: 'G7',
    name: 'Team Performance System',
    pillarWeights: { leadership: 24, people: 22, operations: 16, market: 10, money: 10, risk: 10, innovation: 8 },
    starterTaskIds: ['BRAIN_01', 'BRAIN_02', 'TRIBE_09', 'TRIBE_01', 'BRAIN_06', 'TRIBE_03', 'TRIBE_05', 'BRAIN_04', 'ENG_02', 'TRIBE_07'],
    defaultKPIs: [
      { id: 'kpi_clarity', name: 'Roles with Clear KPIs %', pillar: ['leadership'], frequency: 'monthly' },
      { id: 'meeting_load', name: 'Meeting Hours / Week', pillar: ['people'], frequency: 'weekly' },
      { id: 'turnover', name: 'Staff Turnover Rate', pillar: ['people'], frequency: 'quarterly' }
    ],
    matchKeywords: ['Team', 'Performance', 'Accountability', 'Culture', 'Leadership']
  },
  G8: {
    id: 'G8',
    name: 'Hiring & Onboarding',
    pillarWeights: { leadership: 28, people: 18, operations: 18, risk: 12, money: 10, market: 8, innovation: 6 },
    starterTaskIds: ['BRAIN_05', 'BRAIN_07', 'ENG_04', 'BRAIN_02', 'TRIBE_09', 'ENG_02', 'SHIELD_04', 'TRIBE_03', 'BRAIN_03', 'VOICE_10'],
    defaultKPIs: [
      { id: 'ramp_time', name: 'New Hire Ramp Time', pillar: ['operations', 'leadership'], frequency: 'monthly' },
      { id: 'hiring_quality', name: '90-Day Retention %', pillar: ['leadership'], frequency: 'quarterly' },
      { id: 'applications', name: 'Qualified Candidates', pillar: ['leadership'], frequency: 'weekly' }
    ],
    matchKeywords: ['Hiring', 'Recruiting', 'Onboarding', 'Staffing']
  },
  G9: {
    id: 'G9',
    name: 'Waste & Leakage Crusher',
    pillarWeights: { money: 22, operations: 20, innovation: 18, risk: 14, leadership: 10, people: 10, market: 6 },
    starterTaskIds: ['FUEL_07', 'ENG_09', 'PULSE_02', 'ENG_07', 'FUEL_05', 'ENG_06', 'SHIELD_05', 'PULSE_05', 'ENG_01', 'FUEL_08'],
    defaultKPIs: [
      { id: 'waste_cost', name: 'Waste/Shrinkage Cost', pillar: ['money'], frequency: 'weekly' },
      { id: 'rework_rate', name: 'Rework Rate %', pillar: ['operations'], frequency: 'weekly' },
      { id: 'zombie_spend', name: 'Recurring Costs Cut', pillar: ['money'], frequency: 'monthly' }
    ],
    matchKeywords: ['Waste', 'Leakage', 'Efficiency', 'Cost Cutting']
  },
  G10: {
    id: 'G10',
    name: 'Investment Readiness',
    pillarWeights: { money: 22, risk: 20, leadership: 16, operations: 14, market: 10, people: 10, innovation: 8 },
    starterTaskIds: ['FUEL_03', 'FUEL_08', 'FUEL_04', 'SHIELD_07', 'SHIELD_04', 'SHIELD_05', 'ENG_08', 'BRAIN_02', 'ENG_01', 'VOICE_05'],
    defaultKPIs: [
      { id: 'close_speed', name: 'Monthly Close (Days)', pillar: ['money'], frequency: 'monthly' },
      { id: 'burn_rate', name: 'Monthly Burn Rate', pillar: ['money'], frequency: 'monthly' },
      { id: 'compliance_score', name: 'Compliance Score', pillar: ['risk'], frequency: 'quarterly' }
    ],
    matchKeywords: ['Investment', 'Loan', 'Funding', 'Audit', 'Reporting']
  },
  G11: {
    id: 'G11',
    name: 'Market Expansion',
    pillarWeights: { market: 22, operations: 20, leadership: 14, money: 14, innovation: 14, risk: 10, people: 6 },
    starterTaskIds: ['VOICE_04', 'VOICE_07', 'VOICE_03', 'VOICE_09', 'PULSE_03', 'ENG_05', 'ENG_01', 'FUEL_04', 'SHIELD_04', 'BRAIN_01'],
    defaultKPIs: [
      { id: 'new_market_leads', name: 'New Market Leads', pillar: ['market'], frequency: 'weekly' },
      { id: 'cac', name: 'CAC (New Market)', pillar: ['market', 'money'], frequency: 'monthly' },
      { id: 'capacity', name: 'Capacity Utilization', pillar: ['operations'], frequency: 'weekly' }
    ],
    matchKeywords: ['Expansion', 'New Market', 'Launch', 'Scale']
  }
};

export const resolveGoalTemplate = (goals: string[]): GoalTemplate => {
  if (!goals || goals.length === 0) return GOAL_TEMPLATES.G1; // Default

  // Simple keyword matching
  const goalStr = goals.join(' ').toLowerCase();

  for (const key in GOAL_TEMPLATES) {
    const template = GOAL_TEMPLATES[key];
    if (template.matchKeywords.some(kw => goalStr.includes(kw.toLowerCase()))) {
      return template;
    }
  }

  return GOAL_TEMPLATES.G1; // Fallback
};
