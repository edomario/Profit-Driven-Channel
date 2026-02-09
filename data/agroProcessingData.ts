import { BusinessProfile, DeepScanScores } from "../types";

export interface ManagerMirrorQuestion {
    question: string;
    focus: string; // e.g. "Yield", "Downtime"
}

export interface InspectionItem {
    item: string;
    desc?: string;
}

export interface ProofItem {
    item: string;
    desc?: string;
}

export interface AgroIndex {
    id: string; // 'A', 'B', etc.
    title: string; // 'Yield Bleed'
    meaning: string;
    silentCost: string;
    signals: string[];
    mirrorQuestions: string[];
    inspectionItems: InspectionItem[];
    proofItems: ProofItem[];
    pillar: string; // Mapped pillar
    detectedCost?: string; // Calculated dynamically
}

export const AGRO_INDICES: AgroIndex[] = [
    {
        id: 'A',
        title: 'Yield Bleed',
        meaning: "Your inputs are not turning into sellable output at the expected rate.",
        silentCost: "It doesn’t look like theft — it looks like “normal loss.”",
        signals: [
            "Batch yields vary wildly week to week",
            "Scrap/rework is “normal” but not costed",
            "Moisture/grade intake isn’t controlled",
            "Output doesn’t reconcile cleanly with raw usage"
        ],
        mirrorQuestions: [
            "If yield drops by 3% this week, who notices first — and within how many hours?",
            "Do we know the top 3 yield loss points (spillage, trimming, residue, filtration loss, moisture drift) — or do we just “feel” them?",
            "Are we rewarding supervisors for output volume while ignoring yield quality?",
            "When yield drops, do we ask “who messed up?” or “which step failed?”",
            "Are raw materials being accepted because we need volume — even if they destroy yield?",
            "Do operators know the yield target for this exact SKU, or only general targets?",
            "Do we have “invisible giveaways” (underweight, dilution, overfill) that look like generosity but are actually margin loss?",
            "Is rework tracked as a cost — or treated like “extra effort”?",
            "Do we learn from batch failures or repeat them with new excuses?"
        ],
        inspectionItems: [
            { item: "3 completed mass balance sheets (input → output → waste)" },
            { item: "1 production walk: physically mark loss points on the line" },
            { item: "Yield target posted on the floor for top 3 SKUs" }
        ],
        proofItems: [
            { item: "Batch yield log + variance reasons + owner signatures" },
            { item: "“Loss point map” photo + fixes completed photo" }
        ],
        pillar: 'Fuel'
    },
    {
        id: 'B',
        title: 'Downtime Drain',
        meaning: "Production time is leaking through stops, breakdowns, waiting, and slow changeovers.",
        silentCost: "You pay wages while output is paused.",
        signals: [
            "“Machine issues” is the default explanation",
            "No downtime minutes log",
            "Maintenance is reactive, not preventative",
            "Changeovers take “as long as they take”"
        ],
        mirrorQuestions: [
            "Do we know downtime in minutes/day, or only as a story?",
            "What is our top recurring downtime cause — and why is it still alive?",
            "Are we under-investing in maintenance while bleeding money daily in output loss?",
            "Do operators stop the line early to avoid blame for defects? (hidden fear tax)",
            "Is the schedule chaotic because planning is weak — causing constant stoppage and switching?",
            "Do we have one “hero technician” who keeps things alive — meaning the system is fragile?",
            "Are spare parts available before breakdowns — or after breakdowns?",
            "Are changeovers standardized — or dependent on whoever is on shift?"
        ],
        inspectionItems: [
            { item: "A real downtime log (cause + minutes + owner)" },
            { item: "A “stop code list” (10 codes max) so causes aren’t vague" },
            { item: "A basic PM calendar and compliance % for last 2 weeks" }
        ],
        proofItems: [
            { item: "Downtime board photo + 7 days of logs" },
            { item: "PM checklist uploads with timestamps" }
        ],
        pillar: 'Engine'
    },
    {
        id: 'C',
        title: 'Underweight Giveaway',
        meaning: "You’re selling less product than you think (or giving away free grams/ml).",
        silentCost: "At scale, this becomes a profit hemorrhage.",
        signals: [
            "Complaints or deductions about weight",
            "No check-weigh routine",
            "Pack variance depends on operator",
            "Scales not calibrated regularly"
        ],
        mirrorQuestions: [
            "Are we protecting customers from underweight — but also protecting the business from overfill giveaways?",
            "Is the pack spec enforced daily or only when complaints hit?",
            "Do we calibrate scales on a schedule — or only when someone suspects a problem?",
            "Are packers incentivized to go fast, causing uncontrolled variance?",
            "Do we treat weight variance as “small” because it’s not visible as cash?"
        ],
        inspectionItems: [
            { item: "20 random pack audits/day for 7 days" },
            { item: "Calibration logs" },
            { item: "Variance chart (min/avg/max)" }
        ],
        proofItems: [
            { item: "Check-weigh sheets + calibration photo + SOP posted" }
        ],
        pillar: 'Fuel' // Margin loss via giveaway
    },
    {
        id: 'D',
        title: 'Rework Loop',
        meaning: "You’re doing the same work twice because quality is built late.",
        silentCost: "You burn labor + energy + time, and you still risk reputation.",
        signals: [],
        mirrorQuestions: [
            "Do we inspect at the end because we don’t trust the process?",
            "What is the #1 reason for rework — and why is it still repeating?",
            "Are we hiding rework because it makes the shift “look bad”?",
            "Are supervisors praised for “saving the batch” instead of preventing failure?"
        ],
        inspectionItems: [
            { item: "Rework causes list (top 5) + daily count" },
            { item: "Where rework starts in the process (not where it’s discovered)" }
        ],
        proofItems: [
            { item: "Rework log + corrective action log + before/after trend" }
        ],
        pillar: 'Engine' // Efficiency/Process
    },
    {
        id: 'E',
        title: 'Buyer Power Trap',
        meaning: "Buyers control your price because consistency, proof, or alternatives are weak.",
        silentCost: "Even high volume becomes a margin mirage.",
        signals: [],
        mirrorQuestions: [
            "Can we walk away from our biggest buyer for 30 days and survive?",
            "Do we have proof-based selling (spec sheets, logs, traceability), or relationship selling only?",
            "Do we accept deductions because we can’t prove our quality?",
            "Are we delivering consistency, or delivering surprises?"
        ],
        inspectionItems: [
            { item: "Customer concentration %" },
            { item: "Deductions/returns log and causes" },
            { item: "On-time delivery %" }
        ],
        proofItems: [
            { item: "Buyer terms pack + spec sheet + delivery performance dashboard" }
        ],
        pillar: 'Voice'
    },
    {
        id: 'F',
        title: 'Hygiene Drift',
        meaning: "Food safety discipline is inconsistent across shifts.",
        silentCost: "One incident can wipe trust, contracts, and licensing.",
        signals: [],
        mirrorQuestions: [
            "Is hygiene enforced when busy — or skipped “to keep production moving”?",
            "Do staff fear reporting contamination risks?",
            "Are cleaning and verification logged, or assumed?",
            "Is quality a system or a personality?"
        ],
        inspectionItems: [
            { item: "Hygiene checklist completion %" },
            { item: "Pest control log" },
            { item: "Water quality checks where applicable" }
        ],
        proofItems: [
            { item: "Signed cleaning verifications + audit readiness score" }
        ],
        pillar: 'Risk'
    },
    {
        id: 'G',
        title: 'Payment Delay Chokehold',
        meaning: "You sell but money doesn’t return in time.",
        silentCost: "You finance your buyer’s business and starve your own.",
        signals: [],
        mirrorQuestions: [
            "Do we track DSO (days sales outstanding) weekly — or only when broke?",
            "Do we keep producing for chronic late payers because we fear losing volume?",
            "Are payment terms negotiated upfront or begged for later?"
        ],
        inspectionItems: [
            { item: "Aging report" },
            { item: "Top 10 debtors" },
            { item: "“stop ship” policy existence" }
        ],
        proofItems: [
            { item: "Collection log + revised terms + enforcement evidence" }
        ],
        pillar: 'Fuel' // Cash flow
    },
    {
        id: 'H',
        title: 'Inventory Blind Spot',
        meaning: "Raw, packaging, and finished goods aren’t reconciled tightly.",
        silentCost: "shrinkage, spoilage, and “small losses” compound.",
        signals: [],
        mirrorQuestions: [
            "Is inventory a guess or a number?",
            "Do variances trigger investigation or are they accepted as normal?",
            "Are we leaking through spoilage and miscounts rather than theft?"
        ],
        inspectionItems: [
            { item: "Weekly stock count variances" },
            { item: "FIFO compliance" },
            { item: "Packaging count reconciliation vs output" }
        ],
        proofItems: [
            { item: "Stock count sheets + variance explanations + corrective actions" }
        ],
        pillar: 'Fuel' // Asset management/Cost
    }
];

const calculateAgroCosts = (profile: BusinessProfile, indexId: string): string => {
    // Default fallback if no data
    const currency = "USD";

    // Parse Capacity (very rough heuristic)
    let dailyVolume = 1000; // default 1 ton/1000 units
    if (profile.capacity) {
        const num = parseInt(profile.capacity.replace(/[^0-9]/g, ''));
        if (!isNaN(num)) dailyVolume = num;
        if (profile.capacity.toLowerCase().includes('ton')) dailyVolume = num * 1000;
    }

    const shifts = profile.shiftsPerDay || 1;
    const days = profile.daysPerWeek || 6;

    switch (indexId) {
        case 'A': // Yield Bleed
            // Rule: 3% of volume * $0.50 margin * weeks
            return `$${(dailyVolume * 0.03 * 0.5 * days * 4).toLocaleString()} / month`;

        case 'B': // Downtime Drain
            // Rule: 1 hour/shift * $50/hr * shifts * days
            return `$${(1 * 50 * shifts * days * 4).toLocaleString()} / month`;

        case 'C': // Underweight Giveaway
            // Rule: 2% overshoot * volume * price
            return `$${(dailyVolume * 0.02 * 1.5 * days * 4).toLocaleString()} / month`;

        case 'E': // Buyer Power
            return "margin -15%";

        case 'G': // Payment Delay
            return "Cashflow -30 days";

        default:
            return "Unknown";
    }
};

export const getTopIndices = (reportScores: Record<string, number>, profile?: BusinessProfile): AgroIndex[] => {
    // Logic: Map indices to their pillars.
    // Return indices associated with the lowest scoring pillars.

    const normalizePillar = (pillar: string): string => {
        const key = pillar.toLowerCase();
        if (key === 'engine' || key === 'operations') return 'operations';
        if (key === 'fuel' || key === 'money') return 'money';
        if (key === 'voice' || key === 'market') return 'market';
        if (key === 'brain' || key === 'leadership') return 'leadership';
        if (key === 'pulse' || key === 'innovation') return 'innovation';
        if (key === 'shield' || key === 'risk') return 'risk';
        if (key === 'tribe' || key === 'people') return 'people';
        return key;
    };

    const sortedPillars = Object.entries(reportScores)
        .sort(([, a], [, b]) => a - b) // Ascending score (lowest first)
        .map(([p]) => normalizePillar(p)); // ['money', 'operations', ...]

    const top3Pillars = Array.from(new Set(sortedPillars)).slice(0, 3);

    // Filter indices that match the top 3 critical pillars
    let relevantIndices = AGRO_INDICES.filter(idx => top3Pillars.includes(normalizePillar(idx.pillar)));

    // Clone and inject costs if profile exists
    if (profile) {
        relevantIndices = relevantIndices.map(idx => ({
            ...idx,
            detectedCost: calculateAgroCosts(profile, idx.id)
        }));
    }

    return relevantIndices.slice(0, 3);
};

export const calculateDeepScanScores = (profile: BusinessProfile): DeepScanScores => {
    // Default low/med scores
    let mech = 30;
    let mgmt = 40;
    let comm = 30;

    // Adjust based on Profile
    if (profile.operatingModel === 'Semi-Automated') mech = 60;
    if (profile.operatingModel === 'Fully Automated') mech = 90;

    if (profile.complianceLevel === 'basic') mgmt = 60;
    if (profile.complianceLevel === 'audit-ready') mgmt = 90;

    if (profile.salesChannels?.includes('Export')) comm += 30;
    if (profile.salesChannels?.includes('Modern Retail')) comm += 20;

    return {
        pillars: {
            mechanization: Math.min(100, mech),
            management: Math.min(100, mgmt),
            commercial: Math.min(100, comm)
        },
        confidence: {
            mechanization: profile.operatingModel ? 'High' : 'Low',
            management: profile.complianceLevel ? 'High' : 'Low',
            commercial: profile.salesChannels?.length ? 'Med' : 'Low'
        }
    };
};
