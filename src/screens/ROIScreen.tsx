import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { QuadrantContainer } from '../components/QuadrantContainer';
import { BalanceSheetQuadrant } from '../components/roi-detail/BalanceSheetQuadrant';
import { MonthlyComparisonQuadrant } from '../components/roi-detail/MonthlyComparisonQuadrant';
import { ProfitabilityProjectionQuadrant } from '../components/roi-detail/ProfitabilityProjectionQuadrant';
import { ROISummaryQuadrant } from '../components/roi-detail/ROISummaryQuadrant';
import { chargeUpCafeData } from '../data/mockData';
import { useResponsive } from '../hooks/useResponsive';
import { theme } from '../styles/theme';

export const ROIScreen: React.FC = () => {
  const { isTablet } = useResponsive();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={[
        styles.quadrantsContainer,
        isTablet && styles.quadrantsTablet
      ]}>
        {/* Balance Sheet Quadrant */}
        <QuadrantContainer
          title="Balance Sheet Analysis"
          isExpandable={false}
        >
          <BalanceSheetQuadrant siteData={chargeUpCafeData} />
        </QuadrantContainer>

        {/* Monthly Comparison Quadrant */}
        <QuadrantContainer
          title="Monthly Operations"
          isExpandable={false}
        >
          <MonthlyComparisonQuadrant siteData={chargeUpCafeData} />
        </QuadrantContainer>

        {/* Profitability Projections Quadrant */}
        <QuadrantContainer
          title="Profitability Projections"
          isExpandable={false}
        >
          <ProfitabilityProjectionQuadrant siteData={chargeUpCafeData} />
        </QuadrantContainer>

       {/* ROI Summary Quadrant */}
       <QuadrantContainer
         title="AI ROI Summary & Actions"
         isExpandable={false}
       >
         <ROISummaryQuadrant siteData={chargeUpCafeData} />
       </QuadrantContainer>
     </View>
   </ScrollView>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: theme.colors.background,
 },
 contentContainer: {
   padding: theme.spacing.md,
   maxWidth: theme.layout.maxWidth,
   alignSelf: 'center',
   width: '100%',
 },
 quadrantsContainer: {
   flexDirection: 'column',
   alignItems: 'center',
 },
 quadrantsTablet: {
   flexDirection: 'row',
   flexWrap: 'wrap',
   justifyContent: 'space-between',
   alignItems: 'flex-start',
 },
});