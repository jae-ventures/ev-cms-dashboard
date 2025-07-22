import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { StackedBarChart } from 'react-native-chart-kit';
import { theme } from '../../styles/theme';
import { SiteData } from '../../types';

interface BalanceSheetQuadrantProps {
  siteData: SiteData;
}

export const BalanceSheetQuadrant: React.FC<BalanceSheetQuadrantProps> = ({ siteData }) => {
  const { width } = Dimensions.get('window');
  const chartWidth = Math.min(width - theme.spacing.lg * 2, 400);

  // Calculate total revenue
  const totalRevenue = siteData.monthlyData.reduce((sum, month) => sum + month.revenue, 0);

  // Prepare investment breakdown data
  const investmentData = Object.values(siteData.investmentBreakdown);
  const investmentLabels = Object.keys(siteData.investmentBreakdown).map(key => 
    key.charAt(0).toUpperCase() + key.slice(1)
  );

  // Prepare revenue breakdown data (aggregate all months)
  const revenueBreakdown = siteData.monthlyData.reduce((acc, month) => {
    acc.chargingSessions += month.revenueBreakdown.chargingSessions;
    acc.taxCredits += month.revenueBreakdown.taxCredits;
    acc.utilityKickbacks += month.revenueBreakdown.utilityKickbacks;
    acc.advertising += month.revenueBreakdown.advertising || 0;
    return acc;
  }, { chargingSessions: 0, taxCredits: 0, utilityKickbacks: 0, advertising: 0 });

  const revenueData = Object.values(revenueBreakdown);
  const revenueLabels = ['Charging', 'Tax Credits', 'Utility', 'Ads'];

  const chartData = {
    labels: ['Investment', 'Revenue YTD'],
    legend: [...investmentLabels, ...revenueLabels],
    data: [
      investmentData,
      revenueData
    ],
    barColors: [
      // Investment colors (reds/oranges)
      '#DC143C', '#FF6347', '#FF7F50', '#FFA500', '#FFD700', '#FFFF00',
      // Revenue colors (greens/blues)
      '#32CD32', '#00FA9A', '#00CED1', '#1E90FF'
    ]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Investment vs Revenue Breakdown</Text>
      
      {/* Summary Cards */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>
            ${siteData.initialInvestment.toLocaleString()}
          </Text>
          <Text style={styles.summaryLabel}>Total Investment</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={[styles.summaryValue, { color: theme.colors.success }]}>
            ${totalRevenue.toLocaleString()}
          </Text>
          <Text style={styles.summaryLabel}>Revenue YTD</Text>
        </View>
      </View>

      {/* Stacked Bar Chart */}
      <View style={styles.chartContainer}>
        <StackedBarChart
          data={chartData}
          width={chartWidth}
          height={220}
          chartConfig={{
            backgroundColor: theme.colors.surface,
            backgroundGradientFrom: theme.colors.surface,
            backgroundGradientTo: theme.colors.surface,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
            style: {
              borderRadius: theme.borderRadius,
            }
          }}
          style={styles.chart}
        />
      </View>

      {/* Legend */}
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Investment Breakdown:</Text>
        {investmentLabels.map((label, index) => (
          <View key={label} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: chartData.barColors[index] }]} />
            <Text style={styles.legendText}>
              {label}: ${investmentData[index].toLocaleString()}
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.lg,
  },
  summaryCard: {
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius,
    minWidth: 120,
  },
  summaryValue: {
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
    color: theme.colors.danger,
    marginBottom: theme.spacing.xs,
  },
  summaryLabel: {
    fontSize: theme.fontSize.small,
    color: theme.colors.textSecondary,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  chart: {
    borderRadius: theme.borderRadius,
  },
  legendContainer: {
    marginTop: theme.spacing.md,
  },
  legendTitle: {
    fontSize: theme.fontSize.medium,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: theme.spacing.sm,
  },
  legendText: {
    fontSize: theme.fontSize.small,
    color: theme.colors.text,
  },
});