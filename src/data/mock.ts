// ============================================================================
// Type Definitions
// ============================================================================

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'analyst' | 'viewer';
}

export interface Experiment {
  id: number;
  title: string;
  status: 'Backlog' | 'Active' | 'Results' | 'Archived';
  priority: 'high' | 'medium' | 'low';
  category: string;
  hypothesis: string;
  variableTested: string;
  testStructure: string;
  controlDescription: string;
  treatmentDescription: string;
  primaryKpi: string;
  secondaryKpis: string[];
  estimatedBudget: number;
  estimatedRuntime: number;
  decisionMatrix: {
    ifAWins: string;
    ifBWins: string;
    ifInconclusive: string;
  };
  expectedImpact: string;
  risks: string;
  confidenceScore: number;
  confidenceRationale: string;
  whyItMatters: string;
  outcome: 'winner' | 'loser' | 'inconclusive' | null;
  keyLearning: string | null;
  startDate: string | null;
  endDate: string | null;
  notionUrl: string | null;
  assignee: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Variant {
  experimentId: number;
  name: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  cpa: number;
  ctr: number;
  cpm: number;
}

export interface PerformanceData {
  ecpi: number;
  roas: number;
  cpm: number;
  linkCtr: number;
  installs: number;
  costPerPurchase: number;
  purchases: number;
  spend: number;
  impressions: number;
  frequency: number;
  priorEcpi: number;
  priorRoas: number;
  priorCpm: number;
  priorLinkCtr: number;
  priorInstalls: number;
  priorCostPerPurchase: number;
  dailyTrend: {
    date: string;
    spend: number;
    installs: number;
    cpm: number;
    ecpi: number;
    roas: number;
    costPerPurchase: number;
    purchases: number;
  }[];
  syncedAt: string;
  isLive: boolean;
  source: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused';
  spend: number;
  installs: number;
  ecpi: number;
  roas: number;
  revenue: number;
  purchases: number;
  costPerPurchase: number;
  impressions: number;
  cpm: number;
  ctr: number;
  priorEcpi: number;
  priorRoas: number;
}

export interface Issue {
  type: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  recommendation: string;
}

export interface WeeklyBrief {
  id: number;
  weekStart: string;
  weekEnd: string;
  status: 'draft' | 'approved' | 'archived';
  rawMarkdown: string;
  detectedIssues: Issue[];
  recommendedTests: number[];
  notionUrl: string | null;
  createdAt: string;
}

export interface Learning {
  id: number;
  experimentId: number | null;
  category: string;
  summary: string;
  impact: string;
  confidence: 'high' | 'medium' | 'low';
  createdAt: string;
}

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'analyst' | 'viewer';
  joinedAt: string;
  avatar?: string;
}

export interface TeamActivity {
  id: number;
  type: string;
  description: string;
  user: string;
  createdAt: string;
}

// Mock data continued - this is a large file with sample experiments and performance data
// See the full file in the repository for complete content

export const currentUser: User = {
  id: 1,
  name: 'Chris',
  email: 'chris@nocapinc.com',
  role: 'admin',
};

export const experiments: Experiment[] = [{
  id: 101,
  title: 'CBO vs ABO: Budget Allocation Strategy',
  status: 'Backlog',
  priority: 'high',
  category: 'Budget Structure',
  hypothesis: 'Campaign Budget Optimization (CBO) will deliver lower cost per install compared to Ad Set Budget Optimization (ABO)',
  variableTested: 'Budget allocation method',
  testStructure: '50/50 split',
  controlDescription: 'Traditional ABO',
  treatmentDescription: 'Campaign Budget Optimization',
  primaryKpi: 'ECPI',
  secondaryKpis: ['ROAS', 'CPA'],
  estimatedBudget: 3500,
  estimatedRuntime: 14,
  decisionMatrix: {
    ifAWins: 'Scale all to CBO',
    ifBWins: 'Maintain ABO',
    ifInconclusive: 'Expand test size'
  },
  expectedImpact: '10-15% reduction in ECPI',
  risks: 'Loss of granular control',
  confidenceScore: 87,
  confidenceRationale: 'Strong historical data',
  whyItMatters: 'Direct impact on cost efficiency',
  outcome: null,
  keyLearning: null,
  startDate: null,
  endDate: null,
  notionUrl: null,
  assignee: 'Sarah Chen',
  createdAt: '2026-03-22T09:15:00Z',
  updatedAt: '2026-04-01T14:30:00Z',
}];

export const performanceData: PerformanceData = {
  spend: 1039590,
  installs: 34590,
  ecpi: 30.06,
  roas: 0.12,
  cpm: 18.47,
  linkCtr: 1.19,
  costPerPurchase: 421.23,
  purchases: 2468,
  impressions: 56240000,
  frequency: 3.2,
  priorEcpi: 29.48,
  priorRoas: 0.14,
  priorCpm: 17.82,
  priorLinkCtr: 1.34,
  priorInstalls: 35680,
  priorCostPerPurchase: 398.50,
  dailyTrend: [],
  syncedAt: '2026-04-08T14:23:45Z',
  isLive: true,
  source: 'Meta Ads Manager + AppsFlyer',
};
