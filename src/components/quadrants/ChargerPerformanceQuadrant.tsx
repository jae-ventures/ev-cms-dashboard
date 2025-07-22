import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';

export const ChargerPerformanceQuadrant: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="battery-charging" size={32} color={theme.colors.secondary} />
      </View>
      <Text style={styles.title}>Charger Performance</Text>
      <Text style={styles.subtitle}>
        Individual charger monitoring and utilization tracking
      </Text>
      <View style={styles.comingSoon}>
        <Text style={styles.comingSoonText}>Coming in Day 3</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  iconContainer: {
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.medium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSize.small,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  comingSoon: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius,
  },
  comingSoonText: {
    color: '#fff',
    fontSize: theme.fontSize.small,
    fontWeight: '600',
  },
});