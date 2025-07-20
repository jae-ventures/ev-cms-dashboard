export interface MonthlyData {
  month: number;
  revenue: number;
  costs: number;
  profit: number;
  kWhDispensed: number;
}

export interface SiteData {
  siteName: string;
  initialInvestment: number;
  monthlyData: MonthlyData[];
  projectedIRR: number;
  totalStalls: number;
  peakCapacity: number;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
  prefix?: string;
  suffix?: string;
}