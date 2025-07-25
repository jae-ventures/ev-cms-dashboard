import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { QuadrantContainer } from '../components/QuadrantContainer';
import { ROIQuadrant } from '../components/quadrants/ROIQuadrant';
import { CostAnalyticsQuadrant } from '../components/quadrants/CostAnalyticsQuadrant';
import { ActionStepsQuadrant } from '../components/quadrants/ActionStepsQuadrant';
import { ChargerPerformanceQuadrant } from '../components/quadrants/ChargerPerformanceQuadrant';
import { chargeUpCafeData } from '../data/mockData';
import { useResponsive } from '../hooks/useResponsive';
import { theme } from '../styles/theme';

export const DashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { isTablet } = useResponsive();

  const navigateToDetail = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={[
        styles.quadrantsContainer,
        isTablet && styles.quadrantsTablet
      ]}>
        {/* ROI Quadrant */}
        <QuadrantContainer
          title="Return on Investment"
          onPress={() => navigateToDetail('ROIDetail')}
        >
          <ROIQuadrant siteData={chargeUpCafeData} />
        </QuadrantContainer>

        {/* Cost Analytics Quadrant */}
        <QuadrantContainer
          title="Cost Performance & Analytics"
          onPress={() => navigateToDetail('Analytics')}
        >
          <CostAnalyticsQuadrant />
        </QuadrantContainer>

        {/* Action Steps Quadrant */}
        <QuadrantContainer
          title="Action Steps"
          onPress={() => navigateToDetail('ActionSteps')}
        >
          <ActionStepsQuadrant />
        </QuadrantContainer>

        {/* Charger Performance Quadrant */}
        <QuadrantContainer
          title="Charger Performance"
          onPress={() => navigateToDetail('Chargers')}
        >
          <ChargerPerformanceQuadrant />
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