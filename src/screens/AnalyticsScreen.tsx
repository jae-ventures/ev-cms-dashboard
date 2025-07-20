import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export const AnalyticsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Analytics Screen - Coming in Day 2!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  text: {
    fontSize: theme.fontSize.large,
    color: theme.colors.text,
  },
});