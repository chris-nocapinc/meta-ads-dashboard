/**
 * Real performance data for Captions (iOS app by NoCap Inc)
 * AppsFlyer data: 90 days (Jan 10 - Apr 9, 2026)
 * Generated from actual campaign performance tracking
 */

// ============================================================================
// INTERFACES
// ============================================================================

export interface MediaSourceData {
  mediaSource: string;
  spend: number;
  installs: number;
  cpi: number;
}

export interface Campaign {
  id: string;
  name: string;
  spend: number;
  installs: number;
  cpi: number;
}

export interface CreativeTest {
  adsetId: string;
  name: string;
  spend: number;
  installs: number;
  cpi: number;
  ctr: number;
}

export interface GeoData {
  geo: string;
  metaSpend: number;
  googleSpend: number;
  asaSpend: number;
  totalSpend: number;
  installs: number;
  effectiveCpi: number;
}

export interface DailyTrend {
  date: string;
  channel: string;
  spend: number;
  installs: number;
  cpi: number;
}

export interface PipelineItem {
  status: string;
  count: number;
  items: string[];
}

export interface ConceptPerformance {
  conceptCode: string;
  conceptName: string;
  totalSpend: number;
  totalInstalls: number;
  averageCpi: number;
  activeCreatives: number;
}

export interface CreatorPerformance {
  creatorName: string;
  totalSpend: number;
  totalInstalls: number;
  averageCpi: number;
  creativesUsed: number;
}

// ============================================================================
// MEDIA SOURCE OVERVIEW (90 days: Jan 10 - Apr 9, 2026)
// ============================================================================

export const mediaSourceData: MediaSourceData[] = [
  {
    mediaSource: "Facebook Ads",
    spend: 2806807,
    installs: 187530,
    cpi: 14.97,
  },
  {
    mediaSource: "TikTok (tiktokglobal_int)",
    spend: 637163,
    installs: 26739,
    cpi: 23.83,
  },
  {
    mediaSource: "Apple Search Ads (ASA)",
    spend: 153714,
    installs: 54533,
    cpi: 2.82,
  },
  {
    mediaSource: "Google Ads (googleadwords_int)",
    spend: 99834,
    installs: 4940,
    cpi: 20.21,
  },
  {
    mediaSource: "Reddit",
    spend: 20850,
    installs: 134,
    cpi: 155.6,
  },
  {
    mediaSource: "Moloco",
    spend: 7547,
    installs: 228,
    cpi: 33.1,
  },
  {
    mediaSource: "Organic",
    spend: 0,
    installs: 445881,
    cpi: 0,
  },
];

// ============================================================================
// TOP META CAMPAIGNS (by spend)
// ============================================================================

export const metaCampaigns: Campaign[] = [
  {
    id: "ios_en_us_evergreen",
    name: "ios_en,us (US English evergreen)",
    spend: 1261980,
    installs: 33751,
    cpi: 37.39,
  },
  {
    id: "ios_pt_br_evergreen",
    name: "ios_pt (Brazil PT)",
    spend: 423508,
    installs: 90674,
    cpi: 4.67,
  },
  {
    id: "ios_en_uk_ca_au",
    name: "ios_en,uk,ca,au",
    spend: 211677,
    installs: 12408,
    cpi: 17.06,
  },
  {
    id: "ios_es",
    name: "ios_es (Spanish)",
    spend: 146628,
    installs: 19258,
    cpi: 7.61,
  },
  {
    id: "ios_de_aem",
    name: "ios_de,aem (German)",
    spend: 110509,
    installs: 3837,
    cpi: 28.8,
  },
];

// ============================================================================
// META CREATIVE TESTS (Adset-level performance)
// ============================================================================

export const metaCreativeTests: CreativeTest[] = [
  {
    adsetId: "en_us_ever_max",
    name: "en_us_ever_max (US evergreen)",
    spend: 1260000,
    installs: 33751,
    cpi: 37.39,
    ctr: 0.53,
  },
  {
    adsetId: "pt_br_ever_max",
    name: "pt_br_ever_max (BR evergreen)",
    spend: 423000,
    installs: 90674,
    cpi: 4.67,
    ctr: 0.34,
  },
];

// ============================================================================
// TIKTOK CAMPAIGNS
// ============================================================================

export const tiktokCampaigns: Campaign[] = [
  {
    id: "tiktok_ios_us_feb_launch",
    name: "ios_us (Feb launch)",
    spend: 298828,
    installs: 13977,
    cpi: 21.38,
  },
  {
    id: "tiktok_ios_us_july_legacy",
    name: "ios_us (July legacy)",
    spend: 122164,
    installs: 4131,
    cpi: 29.57,
  },
];

// ============================================================================
// GOOGLE CAMPAIGNS
// ============================================================================

export const googleCampaigns: Campaign[] = [
  {
    id: "google_ios_en_feb27",
    name: "ios_en (Feb 27)",
    spend: 33163,
    installs: 1537,
    cpi: 21.58,
  },
  {
    id: "google_ios_he",
    name: "ios_he (Hebrew)",
    spend: 30857,
    installs: 2574,
    cpi: 11.99,
  },
];

// ============================================================================
// GEO PERFORMANCE
// ============================================================================

export const geoPerformance: GeoData[] = [
  {
    geo: "United States",
    metaSpend: 1748209,
    googleSpend: 59959,
    asaSpend: 43032,
    totalSpend: 1851200,
    installs: 126845,
    effectiveCpi: 14.6,
  },
  {
    geo: "Brazil",
    metaSpend: 475232,
    googleSpend: 0,
    asaSpend: 20604,
    totalSpend: 495836,
    installs: 102817,
    effectiveCpi: 4.82,
  },
];

// ============================================================================
// DAILY TRENDS
// ============================================================================

export const dailyTrends: DailyTrend[] = [
  {
    date: "2026-01-13",
    channel: "Meta",
    spend: 380000,
    installs: 25400,
    cpi: 14.96,
  },
  {
    date: "2026-01-13",
    channel: "TikTok",
    spend: 45000,
    installs: 1800,
    cpi: 25.0,
  },
];

export const summaryStats = {
  totalSpend: 3725915,
  totalInstalls: 719825,
  totalWithOrganic: 1165706,
  overallCpi: 5.18,
  topMediaSource: "Facebook Ads",
  topGeo: "Brazil",
  bestCreativeTest: "1259-Joshua-UGCTestimonial",
  bestConcept: "Vid22.1 (IntroStyles)",
  analysisWindow: "Jan 10 - Apr 9, 2026",
  daysAnalyzed: 90,
};
