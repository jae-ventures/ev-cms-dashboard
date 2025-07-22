import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useResponsive } from '../../hooks/useResponsive';
import { theme } from '../../styles/theme';
import { SiteData } from '../../types';

interface ROIQuadrantProps {
  siteData: SiteData;
  isDetailed?: boolean;
}

export const ROIQuadrant: React.FC<ROIQuadrantProps> = ({ 
  siteData, 
  isDetailed = false 
}) => {
  const { width, isTablet } = useResponsive();
  
  // Calculate metrics
  const totalRevenue = siteData.monthlyData.reduce((sum, month) => sum + month.revenue, 0);
  const totalCosts = siteData.monthlyData.reduce((sum, month) => sum + month.costs, 0);
  const netPosition = totalRevenue - totalCosts;
  const profitabilityGap = siteData.initialInvestment + netPosition;
  
  // Chart dimensions
  const chartWidth = isDetailed 
    ? Math.min(width - theme.spacing.lg * 2, 600)
    : isTablet ? 280 : 220;
  const chartHeight = isDetailed ? 300 : 160;

  // Prepare chart data - Investment vs Current Position vs Profitability Target
  const chartData = {
    labels: ['Investment', 'Current Revenue', 'Break-even Target'],
    datasets: [
      {
        data: [
          siteData.initialInvestment,
          Math.max(0, totalRevenue),
          siteData.initialInvestment // Break-even line
        ],
        colors: [
          () => theme.colors.danger,     // Investment (red)
          () => totalRevenue >= siteData.initialInvestment ? theme.colors.success : theme.colors.warning, // Revenue
          () => theme.colors.primary,    // Target (blue)
        ]
      }
    ]
  };

  const monthsToBreakeven = () => {
    const avgMonthlyProfit = siteData.monthlyData
      .slice(-3) // Last 3 months
      .reduce((sum, month) => sum + month.profit, 0) / 3;
    
    if (avgMonthlyProfit <= 0) return 'TBD';
    
    const remaining = Math.abs(profitabilityGap);
    const months = Math.ceil(remaining / avgMonthlyProfit);
    return months > 60 ? '60+' : months.toString();
  };

  return (
    <View style={styles.container}>
      {/* Key Metrics Row */}
      {isDetailed && (
        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>
              ${siteData.initialInvestment.toLocaleString()}
            </Text>
            <Text style={styles.metricLabel}>Initial Investment</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[
              styles.metricValue,
              { color: netPosition >= 0 ? theme.colors.success : theme.colors.danger }
            ]}>
              ${Math.abs(netPosition).toLocaleString()}
            </Text>
            <Text style={styles.metricLabel}>
              {netPosition >= 0 ? 'Net Profit' : 'Net Loss'}
            </Text>
          </View>
        </View>
      )}

      {/* Progress Chart */}
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          width={chartWidth}
          height={chartHeight}
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
            propsForVerticalLabels: {
              fontSize: isDetailed ? 12 : 10,
            },
            propsForHorizontalLabels: {
              fontSize: isDetailed ? 12 : 10,
            }
          }}
          style={styles.chart}
          showValuesOnTopOfBars={isDetailed}
          fromZero
          withCustomBarColorFromData
        />
      </View>

      {/* Status Summary */}
      <View style={styles.statusContainer}>
        <View style={styles.statusRow}>
          <View style={[
            styles.statusDot, 
            { backgroundColor: profitabilityGap <= 0 ? theme.colors.success : theme.colors.warning }
          ]} />
          <Text style={styles.statusText}>
            {profitabilityGap <= 0 
              ? 'Profitable!' 
              : `${monthsToBreakeven()} months to break-even`
            }
          </Text>
        </View>
        
        {!isDetailed && (
          <Text style={styles.tapHint}>Tap to explore →</Text>
        )}
      </View>
      
      {/* Profitability Line Indicator */}
      {isDetailed && (
        <View style={styles.profitabilityLine}>
          <View style={styles.dashedLine} />
          <Text style={styles.lineLabel}>Profitability Threshold</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.md,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  metricLabel: {
    fontSize: theme.fontSize.small,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  chartContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  chart: {
    borderRadius: theme.borderRadius,
  },
  statusContainer: {
    marginTop: theme.spacing.sm,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: theme.spacing.xs,
  },
  statusText: {
    fontSize: theme.fontSize.small,
    color: theme.colors.text,
    fontWeight: '600',
  },
  tapHint: {
    fontSize: theme.fontSize.small,
    color: theme.colors.textSecondary,
    textAlign: 'right',
    fontStyle: 'italic',
  },
  profitabilityLine: {
    marginTop: theme.spacing.sm,
    alignItems: 'center',
  },
  dashedLine: {
    width: '80%',
    height: 2,
    backgroundColor: theme.colors.primary,
    opacity: 0.6,
  },
  lineLabel: {
    fontSize: theme.fontSize.small,
    color: theme.colors.primary,
    marginTop: theme.spacing.xs,
    fontWeight: '600',
  },
});