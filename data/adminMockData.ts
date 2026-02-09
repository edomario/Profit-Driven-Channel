
import { UserAdminView, PricingRule, AuditLogEntry, ContentSnippet } from "../types";

export const MOCK_ADMIN_USERS: UserAdminView[] = [
  { 
    id: 'u_1', name: 'Alice Founder', email: 'alice@start.com', role: 'student', 
    status: 'approved', joinedAt: '2023-10-01', lastLoginAt: '2023-10-25', ltv: 297, riskScore: 10,
    company: 'AliceCo', tier: 'pro', avatar: 'https://ui-avatars.com/api/?name=Alice'
  },
  { 
    id: 'u_2', name: 'Bob Builder', email: 'bob@build.com', role: 'student', 
    status: 'suspended', joinedAt: '2023-09-15', lastLoginAt: '2023-10-10', ltv: 0, riskScore: 85,
    company: 'BuildIt', tier: 'free', avatar: 'https://ui-avatars.com/api/?name=Bob'
  },
  { 
    id: 'u_3', name: 'Carol Coach', email: 'carol@coach.com', role: 'consultant', 
    status: 'approved', joinedAt: '2023-08-20', lastLoginAt: '2023-10-26', ltv: 1500, riskScore: 5,
    company: 'Growth Partners', tier: 'elite', avatar: 'https://ui-avatars.com/api/?name=Carol'
  }
];

export const MOCK_PRICING_RULES: PricingRule[] = [
  { id: 'pr_1', tier: 1, product: 'quick_scan', amount: 0, currency: 'USD', isActive: true, regionGroup: 'Global' },
  { id: 'pr_2', tier: 1, product: 'bundle', amount: 97, currency: 'USD', isActive: true, regionGroup: 'NAFTA/EU' },
  { id: 'pr_3', tier: 3, product: 'bundle', amount: 49, currency: 'USD', isActive: true, regionGroup: 'Africa/India' },
  { id: 'pr_4', tier: 1, product: 'subscription', amount: 49, currency: 'USD', isActive: true, regionGroup: 'Global' },
  { id: 'pr_5', tier: 1, product: 'partner_credits', amount: 1.50, currency: 'USD', isActive: true, regionGroup: 'Global' },
];

export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  { id: 'log_1', actorId: 'admin_1', actorName: 'Super Admin', actorRole: 'admin', action: 'Update Pricing', targetResource: 'pricing_rule', targetId: 'pr_2', timestamp: '2023-10-26 10:00:00', changes: { oldAmount: 89, newAmount: 97 } },
  { id: 'log_2', actorId: 'system', actorName: 'System', actorRole: 'system', action: 'Flag High Risk', targetResource: 'user', targetId: 'u_2', timestamp: '2023-10-25 14:30:00', changes: {}, metadata: { reason: 'payment_fraud_signal' } },
  { id: 'log_3', actorId: 'u_3', actorName: 'Carol Coach', actorRole: 'consultant', action: 'Unlock Lead', targetResource: 'lead', targetId: 'l_101', timestamp: '2023-10-24 09:15:00', changes: {}, metadata: { cost: 5 } }
];

export const MOCK_CONTENT_SNIPPETS: ContentSnippet[] = [
  { id: 'snip_1', pillar: 'Engine', band: 'Silent Killer', tilt: 'A-Lean', textKey: 'snippet.engine.killer.a', content: 'You are personally ensuring things work. If you are absent, revenue drops hard.', lastUpdated: '2023-10-01' },
  { id: 'snip_2', pillar: 'Fuel', band: 'Stable', tilt: 'B-Lean', textKey: 'snippet.fuel.stable.b', content: 'You protect cash and avoid waste. Over-caution can slow growth.', lastUpdated: '2023-09-15' },
];
