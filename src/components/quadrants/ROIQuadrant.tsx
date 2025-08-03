import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useResponsive } from '../../hooks/useResponsive';
import { theme } from '../../styles/theme';
import { SiteData } from '../../types';

interface ROIQuadrantProps {
  siteData: SiteData;
  isDetailed?: boolean;
  availableWidth?: number;
  availableHeight?: number;
}

export const ROIQuadrant: React.FC<ROIQuadrantProps> = ({ 
  siteData, 
  isDetailed = false,
  availableWidth = 300,
  availableHeight = 250
}) => {
  const { width, isTablet } = useResponsive();
  
  // Month name mapping utility
  const getMonthName = (monthNumber: number, abbreviated = false): string => {
    const fullNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const shortNames = ['J', 'F', 'M', 'A', 'M', 'J', 
                       'J', 'A', 'S', 'O', 'N', 'D'];
    
    const index = ((monthNumber - 1) % 12);
    return abbreviated ? shortNames[index] : fullNames[index];
  };

  // Determine current month context (latest actual data vs projected)
  const currentMonthIndex = siteData.monthlyData.length - 1; // Last month of actual data
  const totalHistoricalMonths = siteData.monthlyData.length;
  const totalProjectedMonths = siteData.projectedMonthlyData?.length || 0;

  // Smart data windowing based on available chart width
  const getOptimalDataWindow = (availableWidth: number) => {
    const baseCharWidth = 35; // Approximate width needed per month label
    const maxMonths = Math.floor(availableWidth / baseCharWidth);
    
    if (maxMonths >= 6) return { history: 3, future: 2 }; // 6 total months
    if (maxMonths >= 4) return { history: 2, future: 1 }; // 4 total months  
    return { history: 1, future: 1 }; // 3 total months minimum
  };

  // Calculate which months to display (using available width initially)
  const preliminaryDataWindow = getOptimalDataWindow(availableWidth);
  
  // Determine start and end indices for data slicing
  const startHistoryIndex = Math.max(0, currentMonthIndex - preliminaryDataWindow.history + 1);
  const endHistoryIndex = currentMonthIndex + 1; // Include current month
  const futureMonthsToShow = Math.min(preliminaryDataWindow.future, totalProjectedMonths);
  
  // Build windowed dataset with proper month names
  const windowedHistoricalData = siteData.monthlyData.slice(startHistoryIndex, endHistoryIndex);
  const windowedProjectedData = (siteData.projectedMonthlyData || []).slice(0, futureMonthsToShow);
  
  // Calculate cumulative metrics over windowed time period
  let runningRevenue = 0;
  let runningProfit = 0;
  
  // Calculate cumulative up to the window start
  for (let i = 0; i < startHistoryIndex; i++) {
    runningRevenue += siteData.monthlyData[i].revenue;
    runningProfit += siteData.monthlyData[i].profit;
  }
  
  const cumulativeData = { revenue: [], profit: [], labels: [] };
  
  // Add historical data within window
  windowedHistoricalData.forEach((month, index) => {
    runningRevenue += month.revenue;
    runningProfit += month.profit;
    
    cumulativeData.revenue.push(runningRevenue);
    cumulativeData.profit.push(runningProfit);
    
    const shouldAbbreviate = availableWidth < 250; // Use abbreviated labels for very small charts
    cumulativeData.labels.push(getMonthName(month.month, shouldAbbreviate));
  });

  // Add projected data within window
  windowedProjectedData.forEach((month, index) => {
    runningRevenue += month.revenue;
    runningProfit += month.profit;
    
    cumulativeData.revenue.push(runningRevenue);
    cumulativeData.profit.push(runningProfit);
    
    const shouldAbbreviate = availableWidth < 250;
    const monthLabel = getMonthName(month.month, shouldAbbreviate);
    // Add visual indicator for projected months
    cumulativeData.labels.push(isDetailed ? `${monthLabel}*` : monthLabel);
  });

  const currentProfit = cumulativeData.profit[cumulativeData.profit.length - 1] || 0;
  const totalRevenue = cumulativeData.revenue[cumulativeData.revenue.length - 1] || 0;
  const profitabilityGap = siteData.initialInvestment - currentProfit;
  const isBreakEven = currentProfit >= siteData.initialInvestment;
  
  // Calculate space needed for non-chart elements
  const statusHeight = theme.fontSize.small + theme.spacing.sm + theme.spacing.xs; // status text + margins
  const tapHintHeight = !isDetailed ? theme.fontSize.small + theme.spacing.xs : 0;
  const legendHeight = isDetailed ? theme.fontSize.small + theme.spacing.sm + theme.spacing.xs : 0;
  const metricsHeight = isDetailed ? theme.fontSize.large + theme.fontSize.small + theme.spacing.md + theme.spacing.xs : 0;
  const profitabilityLineHeight = isDetailed ? theme.fontSize.small + theme.spacing.sm + theme.spacing.xs + 2 : 0;
  
  const reservedHeight = statusHeight + tapHintHeight + legendHeight + metricsHeight + profitabilityLineHeight;
  
  // Calculate available space for chart with minimum constraints and margins
  const chartMarginBuffer = 20; // Extra space to prevent cutoff
  const yAxisLabelWidth = 40; // Space needed for Y-axis labels
  
  const minChartHeight = 120;
  const maxChartHeight = isDetailed ? 400 : 240;
  const calculatedChartHeight = Math.max(minChartHeight, Math.min(maxChartHeight, availableHeight - reservedHeight - chartMarginBuffer));
  
  const minChartWidth = 200;
  const maxChartWidth = isDetailed ? 700 : 500;
  const calculatedChartWidth = Math.max(minChartWidth, Math.min(maxChartWidth, availableWidth - theme.spacing.sm - yAxisLabelWidth));
  
  const chartWidth = calculatedChartWidth;
  const chartHeight = calculatedChartHeight;

  // Prepare line chart data with brighter colors
  const chartData = {
    labels: cumulativeData.labels,
    datasets: [
      {
        data: cumulativeData.revenue,
        color: (opacity = 1) => `rgba(0, 200, 83, ${opacity})`, // Bright green for revenue
        strokeWidth: 3,
      },
      {
        data: cumulativeData.profit,
        color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`, // Bright blue for profit
        strokeWidth: 3,
      },
      // ROI breakeven line (horizontal line at investment amount)
      {
        data: new Array(cumulativeData.labels.length).fill(siteData.initialInvestment),
        color: (opacity = 1) => `rgba(255, 59, 48, ${opacity})`, // Bright red dotted line
        strokeWidth: 2,
        strokeDashArray: [5, 5],
      }
    ]
  };

  const monthsToBreakeven = () => {
    if (isBreakEven) return 'Achieved';
    
    const avgMonthlyProfit = siteData.monthlyData
      .slice(-3) // Last 3 months
      .reduce((sum, month) => sum + month.profit, 0) / 3;
    
    if (avgMonthlyProfit <= 0) return 'TBD';
    
    const remaining = profitabilityGap;
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
              ${totalRevenue.toLocaleString()}
            </Text>
            <Text style={styles.metricLabel}>Total Revenue</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[
              styles.metricValue,
              { color: isBreakEven ? theme.colors.success : theme.colors.warning }
            ]}>
              ${currentProfit.toLocaleString()}
            </Text>
            <Text style={styles.metricLabel}>
              {isBreakEven ? 'Profit (Above ROI)' : 'Cumulative Profit'}
            </Text>
          </View>
        </View>
      )}

      {/* Progress Chart */}
      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={chartWidth}
          height={chartHeight}
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: theme.colors.surface,
            backgroundGradientFrom: theme.colors.surface,
            backgroundGradientTo: theme.colors.surface,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 200, 83, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
            style: {
              borderRadius: theme.borderRadius,
            },
            propsForVerticalLabels: {
              fontSize: Math.max(8, isDetailed ? 12 : chartHeight < 180 ? 8 : 10),
            },
            propsForHorizontalLabels: {
              fontSize: Math.max(8, isDetailed ? 12 : chartHeight < 180 ? 8 : 10),
            },
            formatYLabel: (value) => `$${(parseFloat(value) / 1000).toFixed(0)}k`,
            paddingTop: 20,
            paddingRight: 20,
          }}
          style={styles.chart}
          bezier={false}
          withDots={isDetailed}
          withShadow={false}
          withVerticalLabels={true}
          withHorizontalLabels={true}
          fromZero={true}
          segments={Math.ceil(siteData.initialInvestment / 10000)}
        />
      </View>

      {/* Chart Legend */}
      {isDetailed && (
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: 'rgba(0, 200, 83, 1)' }]} />
            <Text style={styles.legendText}>Revenue</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: 'rgba(0, 123, 255, 1)' }]} />
            <Text style={styles.legendText}>Profit</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendLine, { backgroundColor: 'rgba(255, 59, 48, 1)' }]} />
            <Text style={styles.legendText}>ROI Target</Text>
          </View>
        </View>
      )}

      {/* Status Summary */}
      <View style={styles.statusContainer}>
        <View style={styles.statusRow}>
          <View style={[
            styles.statusDot, 
            { backgroundColor: isBreakEven ? theme.colors.success : theme.colors.warning }
          ]} />
          <Text style={styles.statusText}>
            {isBreakEven 
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
    height: '100%',
    flexDirection: 'column',
    overflow: 'hidden',
    minHeight: 200,
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
    marginVertical: theme.spacing.sm,
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'center',
    minHeight: 120,
  },
  chart: {
    borderRadius: theme.borderRadius,
  },
  statusContainer: {
    marginTop: 'auto',
    paddingTop: theme.spacing.sm,
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
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: theme.spacing.xs,
  },
  legendLine: {
    width: 12,
    height: 2,
    marginRight: theme.spacing.xs,
  },
  legendText: {
    fontSize: theme.fontSize.small,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
});