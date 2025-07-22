import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import { SiteData } from '../../types';

interface ROISummaryQuadrantProps {
  siteData: SiteData;
}

interface ActionItem {
  id: string;
  title: string;
  impact: 'High' | 'Medium' | 'Low';
  effort: 'Low' | 'Medium' | 'High';
  description: string;
  estimatedValue: string;
  category: 'Revenue' | 'Cost' | 'Efficiency';
}

export const ROISummaryQuadrant: React.FC<ROISummaryQuadrantProps> = ({ siteData }) => {
  const [selectedTab, setSelectedTab] = useState<'summary' | 'actions'>('summary');

  // Calculate key insights
  const totalRevenue = siteData.monthlyData.reduce((sum, month) => sum + month.revenue, 0);
  const totalCosts = siteData.monthlyData.reduce((sum, month) => sum + month.costs, 0);
  const netPosition = totalRevenue - totalCosts - siteData.initialInvestment;
  const avgMonthlyProfit = siteData.monthlyData.reduce((sum, month) => sum + month.profit, 0) / 12;
  
  // Identify problem areas
  const avgUtilityCost = siteData.monthlyData.reduce((sum, month) => 
    sum + month.costsBreakdown.utility, 0) / 12;
  const avgRevenue = totalRevenue / 12;
  
  // Generate AI insights
  const insights = generateAIInsights(siteData, netPosition, avgMonthlyProfit, avgUtilityCost, avgRevenue);
  
  // Generate action items
  const actionItems = generateActionItems(siteData);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI ROI Analysis</Text>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'summary' && styles.activeTab]}
          onPress={() => setSelectedTab('summary')}
        >
          <Text style={[styles.tabText, selectedTab === 'summary' && styles.activeTabText]}>
            Summary
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'actions' && styles.activeTab]}
          onPress={() => setSelectedTab('actions')}
        >
          <Text style={[styles.tabText, selectedTab === 'actions' && styles.activeTabText]}>
            Actions
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content based on selected tab */}
      {selectedTab === 'summary' ? (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Overall Status */}
          <View style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <Ionicons 
                name={netPosition > 0 ? "checkmark-circle" : "warning"} 
                size={24} 
                color={netPosition > 0 ? theme.colors.success : theme.colors.warning} 
              />
              <Text style={styles.statusTitle}>
                {netPosition > 0 ? 'Profitable Site' : 'Path to Profitability'}
              </Text>
            </View>
            <Text style={styles.statusDescription}>
              {netPosition > 0 
                ? `Your site has generated $${Math.abs(netPosition).toLocaleString()} in net profit.`
                : `Your site needs $${Math.abs(netPosition).toLocaleString()} more to reach profitability.`
              }
            </Text>
          </View>

          {/* Key Insights */}
          <View style={styles.insightsContainer}>
            <Text style={styles.sectionTitle}>Key Insights</Text>
            {insights.map((insight, index) => (
              <View key={index} style={styles.insightItem}>
                <View style={styles.insightHeader}>
                  <Ionicons 
                    name={insight.type === 'positive' ? 'trending-up' : insight.type === 'negative' ? 'trending-down' : 'information-circle'} 
                    size={16} 
                    color={insight.type === 'positive' ? theme.colors.success : insight.type === 'negative' ? theme.colors.danger : theme.colors.primary} 
                  />
                  <Text style={styles.insightTitle}>{insight.title}</Text>
                </View>
                <Text style={styles.insightDescription}>{insight.description}</Text>
              </View>
            ))}
          </View>

          {/* AI Generated Report Button */}
          <TouchableOpacity style={styles.reportButton}>
            <Ionicons name="document-text" size={20} color="#fff" />
            <Text style={styles.reportButtonText}>Generate Full Report</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Action Items */}
          <Text style={styles.sectionTitle}>Recommended Actions</Text>
          {actionItems.map((action) => (
            <TouchableOpacity key={action.id} style={styles.actionCard}>
              <View style={styles.actionHeader}>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <View style={styles.actionTags}>
                  <View style={[styles.tag, getImpactColor(action.impact)]}>
                    <Text style={styles.tagText}>{action.impact} Impact</Text>
                  </View>
                  <View style={[styles.tag, getEffortColor(action.effort)]}>
                    <Text style={styles.tagText}>{action.effort} Effort</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.actionDescription}>{action.description}</Text>
              <View style={styles.actionFooter}>
                <Text style={styles.actionValue}>Est. Value: {action.estimatedValue}</Text>
                <Ionicons name="chevron-forward" size={16} color={theme.colors.textSecondary} />
              </View>
            </TouchableOpacity>
          ))}

          {/* AI Planning Button */}
          <TouchableOpacity style={styles.planButton}>
            <Ionicons name="bulb" size={20} color="#fff" />
            <Text style={styles.planButtonText}>Make a Plan with AI</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

// Helper functions
function generateAIInsights(siteData: SiteData, netPosition: number, avgMonthlyProfit: number, avgUtilityCost: number, avgRevenue: number) {
  const insights = [];

  // Profitability insight
  if (avgMonthlyProfit > 0) {
    insights.push({
      type: 'positive' as const,
      title: 'Positive Monthly Trend',
      description: `Average monthly profit of $${avgMonthlyProfit.toLocaleString()} indicates strong operational performance.`
    });
  } else {
    insights.push({
      type: 'negative' as const,
      title: 'Monthly Losses',
      description: `Average monthly loss of $${Math.abs(avgMonthlyProfit).toLocaleString()} requires immediate attention to operational efficiency.`
    });
  }

  // Utility cost insight
  const utilityCostRatio = avgUtilityCost / avgRevenue;
  if (utilityCostRatio > 0.5) {
    insights.push({
      type: 'negative' as const,
      title: 'High Energy Costs',
      description: `Energy costs represent ${(utilityCostRatio * 100).toFixed(1)}% of revenue. Consider time-of-use optimization or renewable energy sources.`
    });
  }

  // Revenue growth insight
  const recentMonths = siteData.monthlyData.slice(-3);
  const earlyMonths = siteData.monthlyData.slice(0, 3);
  const recentAvg = recentMonths.reduce((sum, m) => sum + m.revenue, 0) / 3;
  const earlyAvg = earlyMonths.reduce((sum, m) => sum + m.revenue, 0) / 3;
  const growthRate = ((recentAvg - earlyAvg) / earlyAvg) * 100;

  if (growthRate > 20) {
    insights.push({
      type: 'positive' as const,
      title: 'Strong Revenue Growth',
      description: `Revenue has grown ${growthRate.toFixed(1)}% from early months, indicating increasing adoption.`
    });
  } else if (growthRate < 5) {
    insights.push({
      type: 'warning' as const,
      title: 'Limited Growth',
      description: `Revenue growth of ${growthRate.toFixed(1)}% suggests need for marketing or pricing optimization.`
    });
  }

  return insights;
}

function generateActionItems(siteData: SiteData): ActionItem[] {
  return [
    {
      id: '1',
      title: 'Optimize Peak Hour Pricing',
      impact: 'High',
      effort: 'Low',
      description: 'Implement dynamic pricing during peak demand hours to increase revenue per kWh.',
      estimatedValue: '+$2,500/month',
      category: 'Revenue'
    },
    {
      id: '2',
      title: 'Energy Rate Negotiation',
      impact: 'Medium',
      effort: 'Medium',
      description: 'Negotiate better commercial electricity rates or consider time-of-use rate optimization.',
      estimatedValue: '-$800/month',
      category: 'Cost'
    },
    {
      id: '3',
      title: 'Preventive Maintenance Schedule',
      impact: 'Medium',
      effort: 'Low',
      description: 'Implement regular maintenance to reduce downtime and emergency repair costs.',
      estimatedValue: '+$1,200/month',
      category: 'Efficiency'
    },
    {
      id: '4',
      title: 'Marketing Campaign',
      impact: 'High',
      effort: 'High',
      description: 'Launch targeted marketing to increase utilization during off-peak hours.',
      estimatedValue: '+$3,000/month',
      category: 'Revenue'
    }
  ];
}

function getImpactColor(impact: string) {
  switch (impact) {
    case 'High': return { backgroundColor: theme.colors.success };
    case 'Medium': return { backgroundColor: theme.colors.warning };
    case 'Low': return { backgroundColor: theme.colors.textSecondary };
    default: return { backgroundColor: theme.colors.textSecondary };
  }
}

function getEffortColor(effort: string) {
  switch (effort) {
    case 'Low': return { backgroundColor: theme.colors.success };
    case 'Medium': return { backgroundColor: theme.colors.warning };
    case 'High': return { backgroundColor: theme.colors.danger };
    default: return { backgroundColor: theme.colors.textSecondary };
  }
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    flex: 1,
  },
  title: {
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius,
    padding: 4,
    marginBottom: theme.spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderRadius: theme.borderRadius - 2,
  },
  activeTab: {
    backgroundColor: theme.colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: theme.fontSize.small,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  activeTabText: {
    color: theme.colors.primary,
  },
  content: {
    flex: 1,
  },
  statusCard: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius,
    marginBottom: theme.spacing.md,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  statusTitle: {
    fontSize: theme.fontSize.medium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  statusDescription: {
    fontSize: theme.fontSize.small,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  insightsContainer: {
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.medium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  insightItem: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius,
    marginBottom: theme.spacing.sm,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  insightTitle: {
    fontSize: theme.fontSize.small,
    fontWeight: '600',
    color: theme.colors.text,
    marginLeft: theme.spacing.xs,
  },
  insightDescription: {
    fontSize: theme.fontSize.small,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
  reportButton: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius,
    marginTop: theme.spacing.md,
  },
  reportButtonText: {
    color: '#fff',
    fontSize: theme.fontSize.medium,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },
  actionCard: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius,
    marginBottom: theme.spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  actionTitle: {
    fontSize: theme.fontSize.small,
    fontWeight: 'bold',
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  actionTags: {
    flexDirection: 'row',
  },
  tag: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: theme.spacing.xs,
  },
  tagText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  actionDescription: {
    fontSize: theme.fontSize.small,
    color: theme.colors.textSecondary,
    lineHeight: 18,
    marginBottom: theme.spacing.sm,
  },
  actionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionValue: {
    fontSize: theme.fontSize.small,
    color: theme.colors.success,
    fontWeight: '600',
  },
  planButton: {
    backgroundColor: theme.colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius,
    marginTop: theme.spacing.md,
  },
  planButtonText: {
    color: '#fff',
    fontSize: theme.fontSize.medium,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },
});