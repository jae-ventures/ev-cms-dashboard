import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { theme } from '../styles/theme';
import { SiteData } from '../types';
import { MetricCard } from './MetricCard';

interface ROIComponentProps {
  siteData: SiteData;
}

export const ROIComponent: React.FC<ROIComponentProps> = ({ siteData }) => {
  const screenWidth = Dimensions.get('window').width;
  
  // Calculate cumulative profit for ROI calculation
  const cumulativeProfits = siteData.monthlyData.reduce((acc, curr, index) => {
    const cumulative = index === 0 ? curr.profit : acc[index - 1] + curr.profit;
    acc.push(cumulative);
    return acc;
  }, [] as number[]);

  // Calculate key metrics
  const totalRevenue = siteData.monthlyData.reduce((sum, month) => sum + month.revenue, 0);
  const totalCosts = siteData.monthlyData.reduce((sum, month) => sum + month.costs, 0);
  const totalProfit = totalRevenue - totalCosts;
  const currentROI = ((totalProfit - siteData.initialInvestment) / siteData.initialInvestment) * 100;

  // Find break-even month
  const breakEvenMonth = cumulativeProfits.findIndex(profit => 
    profit - siteData.initialInvestment > 0
  ) + 1;

  const chartData = {
    labels: siteData.monthlyData.map((_, index) => `M${index + 1}`),
    datasets: [
      {
        data: cumulativeProfits.map(profit => profit - siteData.initialInvestment),
        color: (opacity = 1) => `rgba(46, 139, 87, ${opacity})`,
        strokeWidth: 3
      }
    ]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Return on Investment</Text>
      
      {/* Key Metrics Row */}
      <View style={styles.metricsRow}>
        <View style={styles.metricColumn}>
          <MetricCard
            title="Initial Investment"
            value={siteData.initialInvestment}
            prefix="$"
            color={theme.colors.danger}
          />
        </View>
        <View style={styles.metricColumn}>
          <MetricCard
            title="Total Profit YTD"
            value={totalProfit}
            prefix="$"
            color={totalProfit > 0 ? theme.colors.success : theme.colors.danger}
          />
        </View>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricColumn}>
          <MetricCard
            title="Current ROI"
            value={currentROI.toFixed(1)}
            suffix="%"
            color={currentROI > 0 ? theme.colors.success : theme.colors.danger}
          />
        </View>
        <View style={styles.metricColumn}>
          <MetricCard
            title="Break-even"
            value={breakEvenMonth > 0 ? `Month ${breakEvenMonth}` : 'TBD'}
            color={theme.colors.primary}
          />
        </View>
      </View>

      {/* ROI Chart */}
      <Text style={styles.chartTitle}>Cumulative Profit vs Investment</Text>
      <LineChart
        data={chartData}
        width={screenWidth - theme.spacing.md * 2}
        height={220}
        chartConfig={{
          backgroundColor: theme.colors.surface,
          backgroundGradientFrom: theme.colors.surface,
          backgroundGradientTo: theme.colors.surface,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(46, 139, 87, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
          style: {
            borderRadius: theme.borderRadius
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: theme.colors.primary
          }
        }}
        style={styles.chart}
        bezier
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.xlarge,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  metricsRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  metricColumn: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  chartTitle: {
    fontSize: theme.fontSize.medium,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  chart: {
    borderRadius: theme.borderRadius,
    marginBottom: theme.spacing.md,
  }
});