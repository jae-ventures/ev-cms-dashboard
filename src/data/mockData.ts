import { SiteData } from '../types';

export const chargeUpCafeData: SiteData = {
  siteName: "ChargeUp Cafe -- Warner Robins, GA",
  initialInvestment: 142960,
  totalStalls: 6,
  peakCapacity: 2400,
  projectedIRR: 29,
  monthlyData: [
    { month: 1, revenue: 7971, costs: 7149, profit: 822, kWhDispensed: 15403 },
    { month: 2, revenue: 6800, costs: 6243, profit: 557, kWhDispensed: 13141 },
    { month: 3, revenue: 6596, costs: 6124, profit: 472, kWhDispensed: 12745 },
    { month: 4, revenue: 5994, costs: 12507, profit: -6513, kWhDispensed: 11583 },
    { month: 5, revenue: 9271, costs: 8423, profit: 848, kWhDispensed: 17915 },
    { month: 6, revenue: 11421, costs: 9744, profit: 1677, kWhDispensed: 22070 },
    { month: 7, revenue: 11992, costs: 11533, profit: 459, kWhDispensed: 23174 },
    { month: 8, revenue: 12592, costs: 10212, profit: 2380, kWhDispensed: 24332 },
    { month: 9, revenue: 13222, costs: 10060, profit: 3162, kWhDispensed: 25549 },
    { month: 10, revenue: 13883, costs: 9874, profit: 4009, kWhDispensed: 26826 },
    { month: 11, revenue: 14577, costs: 9941, profit: 4636, kWhDispensed: 28168 },
    { month: 12, revenue: 15306, costs: 10301, profit: 5004, kWhDispensed: 29576 },
  ]
};