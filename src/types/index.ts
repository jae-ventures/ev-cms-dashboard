export interface MonthlyData {
  month: number;
  revenue: number;
  costs: number;
  profit: number;
  kWhDispensed: number;
  // Detailed breakdowns
  revenueBreakdown: {
    chargingSessions: number;
    taxCredits: number;
    utilityKickbacks: number;
    advertising?: number;
  };
  costsBreakdown: {
    utility: number;
    maintenance: number;
    financing: number;
    serviceProvider: number;
    insurance?: number;
  };
}

export interface InvestmentBreakdown {
  construction: number;
  hardware: number;
  siteDesign: number;
  permitting: number;
  utilityUpgrades: number;
  installation: number;
  other?: number;
}

export interface SiteData {
  siteName: string;
  initialInvestment: number;
  investmentBreakdown: InvestmentBreakdown;
  monthlyData: MonthlyData[];
  projectedIRR: number;
  totalStalls: number;
  peakCapacity: number;
  // Profitability projections
  projectedMonthlyData?: MonthlyData[]; // Future months
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
  prefix?: string;
  suffix?: string;
}

export interface QuadrantProps {
  title: string;
  onPress?: () => void;
  children: React.ReactNode;
  isExpandable?: boolean;
}

// ROI Detail specific types
export interface ProfitabilityProjection {
  actualData: MonthlyData[];
  projectedData: MonthlyData[];
  breakEvenMonth: number;
}