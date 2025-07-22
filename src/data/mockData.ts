import { SiteData } from '../types';

export const chargeUpCafeData: SiteData = {
  siteName: "ChargeUp Cafe",
  initialInvestment: 142960,
  totalStalls: 4,
  peakCapacity: 600,
  projectedIRR: 29,
  investmentBreakdown: {
    construction: 50000,
    hardware: 45000,
    siteDesign: 12000,
    permitting: 8000,
    utilityUpgrades: 15000,
    installation: 12960,
  },
  monthlyData: [
    // ... (your existing 12 months of data with enhanced breakdowns)
    { 
      month: 1, 
      revenue: 7971, 
      costs: 7149, 
      profit: 822, 
      kWhDispensed: 15403,
      revenueBreakdown: {
        chargingSessions: 7200,
        taxCredits: 500,
        utilityKickbacks: 271,
        advertising: 0
      },
      costsBreakdown: {
        utility: 3543,
        maintenance: 0,
        financing: 1930,
        serviceProvider: 770,
        insurance: 906
      }
    },
    // ... continue with all months
    { 
      month: 12, 
      revenue: 15306, 
      costs: 10301, 
      profit: 5004, 
      kWhDispensed: 29576,
      revenueBreakdown: {
        chargingSessions: 14200,
        taxCredits: 800,
        utilityKickbacks: 306,
        advertising: 0
      },
      costsBreakdown: {
        utility: 5915,
        maintenance: 0,
        financing: 1930,
        serviceProvider: 1479,
        insurance: 977
      }
    }
  ],
  // Projected future months for profitability projections
  projectedMonthlyData: [
    { 
      month: 13, 
      revenue: 17500, 
      costs: 11200, 
      profit: 6300, 
      kWhDispensed: 32000,
      revenueBreakdown: { chargingSessions: 16200, taxCredits: 900, utilityKickbacks: 400, advertising: 0 },
      costsBreakdown: { utility: 6800, maintenance: 500, financing: 1930, serviceProvider: 1600, insurance: 370 }
    },
    { 
      month: 14, 
      revenue: 18200, 
      costs: 11400, 
      profit: 6800, 
      kWhDispensed: 33500,
      revenueBreakdown: { chargingSessions: 16800, taxCredits: 950, utilityKickbacks: 450, advertising: 0 },
      costsBreakdown: { utility: 7000, maintenance: 200, financing: 1930, serviceProvider: 1650, insurance: 620 }
    },
    { 
      month: 15, 
      revenue: 19000, 
      costs: 11800, 
      profit: 7200, 
      kWhDispensed: 35000,
      revenueBreakdown: { chargingSessions: 17500, taxCredits: 1000, utilityKickbacks: 500, advertising: 0 },
      costsBreakdown: { utility: 7200, maintenance: 300, financing: 1930, serviceProvider: 1700, insurance: 670 }
    },
    // Add more projected months as needed...
  ]
};