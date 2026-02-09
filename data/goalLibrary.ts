
export const UNIVERSAL_GOALS = [
  "Increase Profit",
  "Scale Revenue",
  "Fix Operations",
  "Reduce Risk",
  "Improve Cash Flow",
  "Increase Customers",
  "Retain Customers",
  "Improve Team Performance"
];

export const CATEGORIZED_GOALS: Record<string, string[]> = {
  "Money & Financial Health": [
    "Improve Cash Flow",
    "Stabilize Monthly Income",
    "Increase Margins",
    "Cut Waste & Leakage",
    "Reduce Debt Pressure",
    "Improve Financial Reporting",
    "Raise Prices Confidently",
    "Prepare for Investment"
  ],
  "Sales, Marketing & Growth": [
    "Increase Customers",
    "Improve Conversion",
    "Improve Follow-Up System",
    "Build a Predictable Sales Pipeline",
    "Launch a New Offer / Product",
    "Enter a New Market",
    "Improve Brand Trust",
    "Improve Customer Experience",
    "Grow Online Sales",
    "Increase Referrals"
  ],
  "Operations & Execution": [
    "Reduce Delays",
    "Standardize Delivery",
    "Build SOPs / Playbooks",
    "Reduce Rework & Errors",
    "Improve Time Management",
    "Improve Tooling / Automation",
    "Improve Inventory Control",
    "Improve Project Delivery"
  ],
  "Product / Service Improvement": [
    "Improve Quality",
    "Innovate Faster",
    "Differentiate from Competitors",
    "Improve Packaging",
    "Reduce Over-Reliance on One Client",
    "Reduce Complaints",
    "Improve Onboarding"
  ],
  "Risk & Protection": [
    "Strengthen Contracts & Terms",
    "Improve Cybersecurity",
    "Improve Data Privacy",
    "Reduce Fraud / Theft",
    "Improve Tax Compliance",
    "Improve Insurance",
    "Reduce Legal Exposure",
    "Improve Internal Controls"
  ],
  "People & Leadership": [
    "Reduce Team Bottlenecks",
    "Improve Accountability",
    "Fix Communication",
    "Improve Hiring",
    "Reduce Staff Turnover",
    "Improve Manager Effectiveness",
    "Create Psychological Safety"
  ]
};

export const INDUSTRY_GOALS: Record<string, string[]> = {
  agriculture: [
    "Reduce Post-Harvest Loss",
    "Improve Yield / Productivity",
    "Improve Buyer Contracts",
    "Improve Input Cost Control",
    "Improve Storage Efficiency"
  ],
  retail: [
    "Reduce Stock-outs",
    "Reduce Spoilage / Expiry Loss",
    "Reduce Shrinkage / Theft",
    "Improve Supplier Terms",
    "Improve Basket Size"
  ],
  hospitality: [
    "Improve Reviews & Ratings",
    "Reduce Food Waste",
    "Improve Occupancy",
    "Reduce Cancellations",
    "Improve Service Speed"
  ],
  health: [
    "Reduce Patient Wait Time",
    "Improve Compliance Standards",
    "Improve Stock Availability",
    "Improve Client Retention",
    "Improve Incident Response"
  ],
  education: [
    "Improve Learning Outcomes",
    "Increase Enrollment",
    "Improve Fee Collection Rate",
    "Improve Teacher Performance",
    "Improve Parent Engagement"
  ],
  construction: [
    "Reduce Project Delays",
    "Reduce Rework Costs",
    "Improve Variation Control",
    "Improve Cash Collection",
    "Reduce Disputes"
  ],
  finance: [
    "Reduce Portfolio Risk",
    "Improve Collection Rate",
    "Reduce Fraud Risk",
    "Improve Compliance Readiness",
    "Improve Turnaround Time"
  ],
  tech: [
    "Reduce Scope Creep",
    "Improve On-Time Delivery",
    "Increase Recurring Revenue",
    "Improve Support Response",
    "Improve Release Quality"
  ],
  // Fallbacks for mapped industries
  manufacturing: ["Reduce Rework & Errors", "Standardize Delivery", "Improve Inventory Control"],
  transport: ["Reduce Delays", "Improve Cash Flow", "Reduce Risk"],
  media: ["Improve Follow-Up System", "Increase Customers", "Improve Project Delivery"],
  services: ["Reduce Scope Creep", "Improve Conversion", "Retain Customers"]
};

// Maps goal keywords to specific pillars for weighting logic
export const getGoalPillars = (goal: string): string[] => {
  const g = goal.toLowerCase();
  const pillars: string[] = [];

  if (g.includes("profit") || g.includes("margin") || g.includes("cash") || g.includes("finance") || g.includes("debt") || g.includes("investment") || g.includes("collection") || g.includes("fee")) {
    pillars.push("Fuel");
  }
  if (g.includes("sales") || g.includes("revenue") || g.includes("lead") || g.includes("customer") || g.includes("market") || g.includes("brand") || g.includes("conversion") || g.includes("referral") || g.includes("enrollment")) {
    pillars.push("Voice");
  }
  if (g.includes("operation") || g.includes("delivery") || g.includes("delay") || g.includes("sop") || g.includes("rework") || g.includes("time") || g.includes("efficiency") || g.includes("project") || g.includes("inventory") || g.includes("stock")) {
    pillars.push("Engine");
  }
  if (g.includes("quality") || g.includes("product") || g.includes("innovat") || g.includes("complaint") || g.includes("outcome") || g.includes("yield") || g.includes("review")) {
    pillars.push("Pulse");
  }
  if (g.includes("risk") || g.includes("contract") || g.includes("compliance") || g.includes("fraud") || g.includes("security") || g.includes("legal") || g.includes("theft") || g.includes("dispute")) {
    pillars.push("Shield");
  }
  if (g.includes("team") || g.includes("hir") || g.includes("manager") || g.includes("culture") || g.includes("staff") || g.includes("turnover") || g.includes("parent") || g.includes("teacher")) {
    pillars.push("Tribe");
    pillars.push("Brain");
  }
  
  // Fallback for "Fix Operations" explicitly
  if (goal === "Fix Operations") pillars.push("Engine", "Tribe");
  
  return [...new Set(pillars)];
};
