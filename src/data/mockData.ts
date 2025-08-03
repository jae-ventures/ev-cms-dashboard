import { SiteData } from '../types';

export const chargeUpCafeData: SiteData = {
  siteName: "ChargeUp Cafe",
  initialInvestment: 150000,
  totalStalls: 4,
  peakCapacity: 600,
  projectedIRR: 32,
  investmentBreakdown: {
    construction: 55000,
    hardware: 48000,
    siteDesign: 12000,
    permitting: 9000,
    utilityUpgrades: 18000,
    installation: 8000,
  },
  monthlyData: [
    // Realistic EV charging site growth progression over 18 months
    { month: 1, revenue: 3200, costs: 4500, profit: -1300, kWhDispensed: 8500, revenueBreakdown: { chargingSessions: 2800, taxCredits: 250, utilityKickbacks: 150, advertising: 0 }, costsBreakdown: { utility: 1800, maintenance: 200, financing: 2000, serviceProvider: 300, insurance: 200 } },
    { month: 2, revenue: 4100, costs: 4300, profit: -200, kWhDispensed: 10200, revenueBreakdown: { chargingSessions: 3600, taxCredits: 300, utilityKickbacks: 200, advertising: 0 }, costsBreakdown: { utility: 2100, maintenance: 150, financing: 2000, serviceProvider: 350, insurance: 200 } },
    { month: 3, revenue: 5300, costs: 4600, profit: 700, kWhDispensed: 12800, revenueBreakdown: { chargingSessions: 4700, taxCredits: 350, utilityKickbacks: 250, advertising: 0 }, costsBreakdown: { utility: 2400, maintenance: 100, financing: 2000, serviceProvider: 400, insurance: 200 } },
    { month: 4, revenue: 6800, costs: 4900, profit: 1900, kWhDispensed: 15500, revenueBreakdown: { chargingSessions: 6000, taxCredits: 450, utilityKickbacks: 350, advertising: 0 }, costsBreakdown: { utility: 2800, maintenance: 250, financing: 2000, serviceProvider: 550, insurance: 200 } },
    { month: 5, revenue: 8200, costs: 5200, profit: 3000, kWhDispensed: 18200, revenueBreakdown: { chargingSessions: 7200, taxCredits: 550, utilityKickbacks: 450, advertising: 0 }, costsBreakdown: { utility: 3200, maintenance: 200, financing: 2000, serviceProvider: 600, insurance: 200 } },
    { month: 6, revenue: 9800, costs: 5600, profit: 4200, kWhDispensed: 21000, revenueBreakdown: { chargingSessions: 8600, taxCredits: 650, utilityKickbacks: 550, advertising: 0 }, costsBreakdown: { utility: 3600, maintenance: 300, financing: 2000, serviceProvider: 700, insurance: 200 } },
    { month: 7, revenue: 11500, costs: 6000, profit: 5500, kWhDispensed: 24500, revenueBreakdown: { chargingSessions: 10100, taxCredits: 750, utilityKickbacks: 650, advertising: 0 }, costsBreakdown: { utility: 4000, maintenance: 150, financing: 2000, serviceProvider: 750, insurance: 200 } },
    { month: 8, revenue: 13200, costs: 6300, profit: 6900, kWhDispensed: 27800, revenueBreakdown: { chargingSessions: 11600, taxCredits: 850, utilityKickbacks: 750, advertising: 0 }, costsBreakdown: { utility: 4400, maintenance: 400, financing: 2000, serviceProvider: 800, insurance: 200 } },
    { month: 9, revenue: 14800, costs: 6700, profit: 8100, kWhDispensed: 31000, revenueBreakdown: { chargingSessions: 13000, taxCredits: 950, utilityKickbacks: 850, advertising: 0 }, costsBreakdown: { utility: 4800, maintenance: 300, financing: 2000, serviceProvider: 900, insurance: 200 } },
    { month: 10, revenue: 16200, costs: 7100, profit: 9100, kWhDispensed: 33800, revenueBreakdown: { chargingSessions: 14200, taxCredits: 1050, utilityKickbacks: 950, advertising: 0 }, costsBreakdown: { utility: 5200, maintenance: 200, financing: 2000, serviceProvider: 950, insurance: 200 } },
    { month: 11, revenue: 17800, costs: 7400, profit: 10400, kWhDispensed: 36500, revenueBreakdown: { chargingSessions: 15600, taxCredits: 1150, utilityKickbacks: 1050, advertising: 0 }, costsBreakdown: { utility: 5600, maintenance: 350, financing: 2000, serviceProvider: 1000, insurance: 200 } },
    { month: 12, revenue: 19200, costs: 7800, profit: 11400, kWhDispensed: 39000, revenueBreakdown: { chargingSessions: 16800, taxCredits: 1250, utilityKickbacks: 1150, advertising: 0 }, costsBreakdown: { utility: 6000, maintenance: 250, financing: 2000, serviceProvider: 1100, insurance: 200 } },
    { month: 13, revenue: 20500, costs: 8100, profit: 12400, kWhDispensed: 41200, revenueBreakdown: { chargingSessions: 17900, taxCredits: 1350, utilityKickbacks: 1250, advertising: 0 }, costsBreakdown: { utility: 6300, maintenance: 400, financing: 2000, serviceProvider: 1150, insurance: 200 } },
    { month: 14, revenue: 21800, costs: 8400, profit: 13400, kWhDispensed: 43500, revenueBreakdown: { chargingSessions: 19000, taxCredits: 1450, utilityKickbacks: 1350, advertising: 0 }, costsBreakdown: { utility: 6600, maintenance: 300, financing: 2000, serviceProvider: 1200, insurance: 200 } },
    { month: 15, revenue: 23000, costs: 8700, profit: 14300, kWhDispensed: 45800, revenueBreakdown: { chargingSessions: 20000, taxCredits: 1550, utilityKickbacks: 1450, advertising: 0 }, costsBreakdown: { utility: 6900, maintenance: 200, financing: 2000, serviceProvider: 1250, insurance: 200 } },
    { month: 16, revenue: 24200, costs: 9000, profit: 15200, kWhDispensed: 48000, revenueBreakdown: { chargingSessions: 21000, taxCredits: 1650, utilityKickbacks: 1550, advertising: 0 }, costsBreakdown: { utility: 7200, maintenance: 350, financing: 2000, serviceProvider: 1300, insurance: 200 } },
    { month: 17, revenue: 25300, costs: 9300, profit: 16000, kWhDispensed: 50200, revenueBreakdown: { chargingSessions: 21900, taxCredits: 1750, utilityKickbacks: 1650, advertising: 0 }, costsBreakdown: { utility: 7500, maintenance: 250, financing: 2000, serviceProvider: 1350, insurance: 200 } },
    { month: 18, revenue: 26400, costs: 9600, profit: 16800, kWhDispensed: 52500, revenueBreakdown: { chargingSessions: 22800, taxCredits: 1850, utilityKickbacks: 1750, advertising: 0 }, costsBreakdown: { utility: 7800, maintenance: 400, financing: 2000, serviceProvider: 1400, insurance: 200 } }
  ],
  // Projected future months for continued growth trajectory
  projectedMonthlyData: [
    { month: 19, revenue: 27400, costs: 9900, profit: 17500, kWhDispensed: 54800, revenueBreakdown: { chargingSessions: 23600, taxCredits: 1950, utilityKickbacks: 1850, advertising: 0 }, costsBreakdown: { utility: 8100, maintenance: 300, financing: 2000, serviceProvider: 1450, insurance: 200 } },
    { month: 20, revenue: 28300, costs: 10200, profit: 18100, kWhDispensed: 57000, revenueBreakdown: { chargingSessions: 24300, taxCredits: 2050, utilityKickbacks: 1950, advertising: 0 }, costsBreakdown: { utility: 8400, maintenance: 350, financing: 2000, serviceProvider: 1500, insurance: 200 } },
    { month: 21, revenue: 29200, costs: 10500, profit: 18700, kWhDispensed: 59200, revenueBreakdown: { chargingSessions: 25000, taxCredits: 2150, utilityKickbacks: 2050, advertising: 0 }, costsBreakdown: { utility: 8700, maintenance: 250, financing: 2000, serviceProvider: 1550, insurance: 200 } },
    { month: 22, revenue: 30000, costs: 10800, profit: 19200, kWhDispensed: 61500, revenueBreakdown: { chargingSessions: 25600, taxCredits: 2250, utilityKickbacks: 2150, advertising: 0 }, costsBreakdown: { utility: 9000, maintenance: 400, financing: 2000, serviceProvider: 1600, insurance: 200 } },
    { month: 23, revenue: 30800, costs: 11100, profit: 19700, kWhDispensed: 63800, revenueBreakdown: { chargingSessions: 26200, taxCredits: 2350, utilityKickbacks: 2250, advertising: 0 }, costsBreakdown: { utility: 9300, maintenance: 300, financing: 2000, serviceProvider: 1650, insurance: 200 } },
    { month: 24, revenue: 31500, costs: 11400, profit: 20100, kWhDispensed: 66000, revenueBreakdown: { chargingSessions: 26700, taxCredits: 2450, utilityKickbacks: 2350, advertising: 0 }, costsBreakdown: { utility: 9600, maintenance: 200, financing: 2000, serviceProvider: 1700, insurance: 200 } }
  ]
};