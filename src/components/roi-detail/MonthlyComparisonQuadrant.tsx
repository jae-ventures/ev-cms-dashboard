import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { theme } from '../../styles/theme';
import { SiteData } from '../../types';

interface MonthlyComparisonQuadrantProps {
  siteData: SiteData;
}

export const MonthlyComparisonQuadrant: React.FC<MonthlyComparisonQuadrantProps> = ({ siteData }) => {
  const { width } = Dimensions.get('window');
  const chartWidth = Math.min(width - theme.spacing.lg * 2, 500);

  // Prepare data for grouped bar chart
  const chartData = {
    labels: siteData.monthlyData.map((_, index) => `M${index + 1}`),
    datasets: [
      {
        data: siteData.monthlyData.map(month => month.costs),
        color: () => theme.colors.danger,
        strokeWidth: 2
      },
      {
        data: siteData.monthlyData.map(month => month.revenue),
        color: () => theme.colors.success,
        strokeWidth: 2
      }
    ],
    legend: ['Operational Costs', 'Revenue']
  };

  // Calculate profitable months
  const profitableMonths = siteData.monthlyData.filter(month => month.profit > 0).length;
  const avgMonthlyProfit = siteData.monthlyData.reduce((sum, month) => sum + month.profit, 0) / 12;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Performance</Text>
      
      {/* Key Metrics */}
      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={[styles.metricValue, { color: theme.colors.success }]}>
            {profitableMonths}/12
          </Text>
          <Text style={styles.metricLabel}>Profitable Months</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={[
            styles.metricValue, 
            { color: avgMonthlyProfit > 0 ? theme.colors.success : theme.colors.danger }
          ]}>
            ${Math.abs(avgMonthlyProfit).toLocaleString()}
          </Text>
          <Text style={styles.metricLabel}>
            Avg Monthly {avgMonthlyProfit > 0 ? 'Profit' : 'Loss'}
          </Text>
        </View>
      </View>

      {/* Monthly Bar Chart */}
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          width={chartWidth}
          height={250}
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
            propsForLabels: {
              fontSize: 10,
            }
          }}
          style={styles.chart}
          yAxisLabel="$"
          yAxisSuffix=""
          fromZero
          showBarTops={false}
        />
      </View>

      {/* Monthly Details */}
      <View style={styles.monthlyDetails}>
        <Text style={styles.detailsTitle}>Recent Performance:</Text>
        {siteData.monthlyData.slice(-3).map((month, index) => (
          <View key={month.month} style={styles.monthRow}>
            <Text style={styles.monthLabel}>Month {month.month}:</Text>
            <Text style={[
              styles.monthValue,
              { color: month.profit > 0 ? theme.colors.success : theme.colors.danger }
            ]}>
              {month.profit > 0 ? '+' : ''}${month.profit.toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

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
  monthlyDetails: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius,
  },
  detailsTitle: {
    fontSize: theme.fontSize.medium,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  monthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  monthLabel: {
    fontSize: theme.fontSize.small,
    color: theme.colors.text,
  },
  monthValue: {
    fontSize: theme.fontSize.small,
    fontWeight: '600',
  },
});