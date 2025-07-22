import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { theme } from '../../styles/theme';
import { SiteData } from '../../types';

interface ProfitabilityProjectionQuadrantProps {
  siteData: SiteData;
}

export const ProfitabilityProjectionQuadrant: React.FC<ProfitabilityProjectionQuadrantProps> = ({ 
  siteData 
}) => {
  const { width } = Dimensions.get('window');
  const chartWidth = Math.min(width - theme.spacing.lg * 2, 500);

  // Calculate cumulative profit for actual data
  const actualCumulative = siteData.monthlyData.reduce((acc, curr, index) => {
    const cumulative = index === 0 ? curr.profit : acc[index - 1] + curr.profit;
    acc.push(cumulative - siteData.initialInvestment); // Subtract initial investment
    return acc;
  }, [] as number[]);

  // Generate projected data if not provided
  const projectedData = siteData.projectedMonthlyData || generateProjectedData(siteData);
  
  // Calculate cumulative profit for projected data
  const projectedCumulative = projectedData.reduce((acc, curr, index) => {
    const lastActual = actualCumulative[actualCumulative.length - 1];
    const cumulative = index === 0 ? lastActual + curr.profit : acc[index - 1] + curr.profit;
    acc.push(cumulative);
    return acc;
  }, [] as number[]);

  // Combine actual and projected for chart
  const allLabels = [
    ...siteData.monthlyData.map((_, i) => `M${i + 1}`),
    ...projectedData.slice(0, 12).map((_, i) => `M${i + 13}`)
  ];

  const allData = [...actualCumulative, ...projectedCumulative.slice(0, 12)];
  const actualDataPoints = actualCumulative.length;

  // Find break-even point
  const breakEvenIndex = allData.findIndex(value => value > 0);
  const breakEvenMonth = breakEvenIndex !== -1 ? breakEvenIndex + 1 : null;

  // Calculate key metrics
  const currentPosition = actualCumulative[actualCumulative.length - 1];
  const projectedBreakEven = breakEvenMonth ? `Month ${breakEvenMonth}` : 'Beyond 24 months';
  const monthsToBreakEven = breakEvenMonth ? Math.max(0, breakEvenIndex + 1 - actualDataPoints) : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Path to Profitability</Text>

      {/* Key Metrics */}
      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={[
            styles.metricValue,
            { color: currentPosition > 0 ? theme.colors.success : theme.colors.danger }
          ]}>
            ${Math.abs(currentPosition).toLocaleString()}
          </Text>
          <Text style={styles.metricLabel}>
            Current {currentPosition > 0 ? 'Profit' : 'Loss'}
          </Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={[styles.metricValue, { color: theme.colors.primary }]}>
            {projectedBreakEven}
          </Text>
          <Text style={styles.metricLabel}>Break-even Target</Text>
        </View>
      </View>

      {/* Projection Chart */}
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: allLabels.filter((_, i) => i % 2 === 0), // Show every other label to avoid crowding
            datasets: [
              {
                data: allData.filter((_, i) => i % 2 === 0),
                color: (opacity = 1) => `rgba(46, 139, 87, ${opacity})`,
                strokeWidth: 3,
                strokeDashArray: allData.map((_, i) => 
                  i >= actualDataPoints / 2 ? [5, 5] : []
                ).filter((_, i) => i % 2 === 0) // Dashed line for projections
              }
            ]
          }}
          width={chartWidth}
          height={220}
          chartConfig={{
            backgroundColor: theme.colors.surface,
            backgroundGradientFrom: theme.colors.surface,
            backgroundGradientTo: theme.colors.surface,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(46, 139, 87, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
            style: {
              borderRadius: theme.borderRadius,
            },
            propsForDots: {
              r: '3',
              strokeWidth: '2',
              stroke: theme.colors.primary
            },
            propsForLabels: {
              fontSize: 10,
            }
          }}
          style={styles.chart}
          bezier
          yAxisLabel="$"
          yAxisSuffix=""
        />
      </View>

      {/* Break-even Line */}
      {breakEvenMonth && (
        <View style={styles.breakEvenIndicator}>
          <View style={styles.breakEvenLine} />
          <Text style={styles.breakEvenText}>Break-even Point</Text>
        </View>
      )}

      {/* Projection Details */}
      <View style={styles.projectionDetails}>
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendLine, { backgroundColor: theme.colors.primary }]} />
            <Text style={styles.legendText}>Actual Performance</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendLine, styles.dashedLine]} />
            <Text style={styles.legendText}>Projected Performance</Text>
          </View>
        </View>
        
        {monthsToBreakEven !== null && monthsToBreakEven > 0 && (
          <Text style={styles.projectionNote}>
            Projected to reach profitability in {monthsToBreakEven} more months
          </Text>
        )}
      </View>
    </View>
  );
};

// Helper function to generate projected data
function generateProjectedData(siteData: SiteData) {
  const lastThreeMonths = siteData.monthlyData.slice(-3);
  const avgGrowthRate = calculateAverageGrowthRate(lastThreeMonths);
  const seasonalFactors = [1.0, 0.9, 0.8, 0.9, 1.1, 1.2, 1.3, 1.3, 1.2, 1.1, 1.0, 0.9]; // Seasonal adjustments
  
  return Array.from({ length: 24 }, (_, index) => {
    const baseRevenue = lastThreeMonths[2].revenue;
    const baseCosts = lastThreeMonths[2].costs;
    const monthIndex = index % 12;
    const yearMultiplier = Math.floor(index / 12) + 1;
    
    const projectedRevenue = baseRevenue * 
      Math.pow(1 + avgGrowthRate, index + 1) * 
      seasonalFactors[monthIndex] * 
      yearMultiplier;
    
    const projectedCosts = baseCosts * 
      Math.pow(1.02, index + 1) * // 2% cost inflation
      seasonalFactors[monthIndex] * 0.8; // Costs don't scale as much
    
    return {
      month: siteData.monthlyData.length + index + 1,
      revenue: Math.round(projectedRevenue),
      costs: Math.round(projectedCosts),
      profit: Math.round(projectedRevenue - projectedCosts),
      kWhDispensed: Math.round((projectedRevenue / 0.45) * 1.1), // Estimated kWh
      revenueBreakdown: {
        chargingSessions: Math.round(projectedRevenue * 0.9),
        taxCredits: Math.round(projectedRevenue * 0.05),
        utilityKickbacks: Math.round(projectedRevenue * 0.05),
        advertising: 0
      },
      costsBreakdown: {
        utility: Math.round(projectedCosts * 0.6),
        maintenance: Math.round(projectedCosts * 0.1),
        financing: 1930, // Fixed
        serviceProvider: Math.round(projectedCosts * 0.2),
        insurance: Math.round(projectedCosts * 0.1)
      }
    };
  });
}

function calculateAverageGrowthRate(months: any[]) {
  if (months.length < 2) return 0.05; // Default 5% growth
  
  const growthRates = [];
  for (let i = 1; i < months.length; i++) {
    const rate = (months[i].revenue - months[i-1].revenue) / months[i-1].revenue;
    growthRates.push(rate);
  }
  
  return growthRates.reduce((sum, rate) => sum + rate, 0) / growthRates.length;
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.lg,
  },
  metricCard: {
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius,
    minWidth: 120,
  },
  metricValue: {
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  metricLabel: {
    fontSize: theme.fontSize.small,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  chart: {
    borderRadius: theme.borderRadius,
  },
  breakEvenIndicator: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  breakEvenLine: {
    width: '60%',
    height: 2,
    backgroundColor: theme.colors.success,
    marginBottom: theme.spacing.xs,
  },
  breakEvenText: {
    fontSize: theme.fontSize.small,
    color: theme.colors.success,
    fontWeight: '600',
  },
  projectionDetails: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendLine: {
    width: 20,
    height: 3,
    marginRight: theme.spacing.xs,
  },
  dashedLine: {
    backgroundColor: theme.colors.primary,
    opacity: 0.6,
  },
  legendText: {
    fontSize: theme.fontSize.small,
    color: theme.colors.text,
  },
  projectionNote: {
    fontSize: theme.fontSize.small,
    color: theme.colors.primary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: theme.spacing.xs,
  },
});