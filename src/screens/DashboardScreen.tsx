import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ROIComponent } from '../components/ROIComponent';
import { chargeUpCafeData } from '../data/mockData';
import { theme } from '../styles/theme';

export const DashboardScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <ROIComponent siteData={chargeUpCafeData} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});