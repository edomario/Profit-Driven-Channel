
export type GeoMode = 'local_required' | 'local_preferred' | 'global_ok';

export interface ExpertiseTag {
  id: string;
  label: string;
  category: string; // Broad category like 'Legal', 'Marketing'
  geoMode: GeoMode;
}

export const EXPERTISE_TAXONOMY: Record<string, ExpertiseTag[]> = {
  'Legal & Compliance': [
    { id: 'contracts_drafting', label: 'Contracts Drafting & Review', category: 'Legal', geoMode: 'local_required' },
    { id: 'debt_recovery', label: 'Debt Recovery & Collections', category: 'Legal', geoMode: 'local_required' },
    { id: 'company_registration', label: 'Company Registration & Governance', category: 'Legal', geoMode: 'local_required' },
    { id: 'employment_law', label: 'Employment / Labor Law', category: 'Legal', geoMode: 'local_required' },
    { id: 'tax_compliance', label: 'Tax Compliance Support', category: 'Legal', geoMode: 'local_required' },
    { id: 'regulatory_compliance', label: 'Sector Compliance & Licensing', category: 'Legal', geoMode: 'local_required' },
    { id: 'ip_trademarks', label: 'Trademarks & IP Protection', category: 'Legal', geoMode: 'local_preferred' },
    { id: 'litigation_support', label: 'Disputes & Litigation', category: 'Legal', geoMode: 'local_required' }
  ],
  'Cybersecurity & IT': [
    { id: 'security_audit', label: 'Security Audit & Hardening', category: 'IT', geoMode: 'global_ok' },
    { id: 'backup_recovery', label: 'Backups & Disaster Recovery', category: 'IT', geoMode: 'global_ok' },
    { id: 'access_control', label: 'Access Controls Setup', category: 'IT', geoMode: 'global_ok' }
  ],
  'Finance & Accounting': [
    { id: 'bookkeeping_setup', label: 'Bookkeeping Setup', category: 'Finance', geoMode: 'local_preferred' },
    { id: 'monthly_reporting', label: 'Monthly P&L / Reporting', category: 'Finance', geoMode: 'global_ok' },
    { id: 'cashflow_forecasting', label: 'Cash Flow Forecasting', category: 'Finance', geoMode: 'global_ok' },
    { id: 'pricing_strategy', label: 'Pricing Strategy', category: 'Finance', geoMode: 'global_ok' },
    { id: 'tax_filing', label: 'Tax Filing Support', category: 'Finance', geoMode: 'local_required' },
    { id: 'cfo_advisory', label: 'Fractional CFO Advisory', category: 'Finance', geoMode: 'global_ok' }
  ],
  'Marketing & Growth': [
    { id: 'marketing_strategy', label: 'Marketing Strategy', category: 'Marketing', geoMode: 'global_ok' },
    { id: 'performance_ads', label: 'Paid Ads (Meta/Google)', category: 'Marketing', geoMode: 'global_ok' },
    { id: 'content_systems', label: 'Content Systems', category: 'Marketing', geoMode: 'global_ok' },
    { id: 'copywriting', label: 'Copywriting', category: 'Marketing', geoMode: 'global_ok' },
    { id: 'funnel_building', label: 'Funnel Building', category: 'Marketing', geoMode: 'global_ok' },
    { id: 'crm_setup', label: 'CRM Setup', category: 'Marketing', geoMode: 'global_ok' }
  ],
  'Operations': [
    { id: 'sop_documentation', label: 'SOPs & Playbooks', category: 'Operations', geoMode: 'global_ok' },
    { id: 'process_optimization', label: 'Process Optimization', category: 'Operations', geoMode: 'global_ok' },
    { id: 'inventory_tracking', label: 'Inventory Systems', category: 'Operations', geoMode: 'global_ok' },
    { id: 'supply_chain', label: 'Supply Chain Mgmt', category: 'Operations', geoMode: 'global_ok' }
  ],
  'Product': [
    { id: 'product_strategy', label: 'Product Strategy', category: 'Product', geoMode: 'global_ok' },
    { id: 'customer_feedback', label: 'Customer Feedback Systems', category: 'Product', geoMode: 'global_ok' },
    { id: 'qa_testing', label: 'QA & Testing', category: 'Product', geoMode: 'global_ok' }
  ],
  'People & Culture': [
    { id: 'hiring_system', label: 'Hiring Systems', category: 'HR', geoMode: 'global_ok' },
    { id: 'manager_coaching', label: 'Manager Coaching', category: 'HR', geoMode: 'global_ok' },
    { id: 'hr_compliance', label: 'HR Compliance', category: 'HR', geoMode: 'local_required' },
    { id: 'org_design', label: 'Org Structure Design', category: 'HR', geoMode: 'global_ok' }
  ]
};

// Maps 7 Pillars to relevant Taxonomy Categories
export const PILLAR_CATEGORY_MAP: Record<string, string[]> = {
  'Shield': ['Legal & Compliance', 'Cybersecurity & IT'],
  'Fuel': ['Finance & Accounting', 'Legal & Compliance'], // Tax often falls in both
  'Voice': ['Marketing & Growth'],
  'Engine': ['Operations'],
  'Pulse': ['Product'],
  'Brain': ['People & Culture'],
  'Tribe': ['People & Culture']
};

export const INDUSTRY_TAGS = [
  'Retail / FMCG', 'Hospitality', 'Logistics', 'Real Estate', 
  'Healthcare', 'Education', 'Agriculture', 'Manufacturing', 
  'Professional Services', 'Ecommerce', 'SaaS'
];
