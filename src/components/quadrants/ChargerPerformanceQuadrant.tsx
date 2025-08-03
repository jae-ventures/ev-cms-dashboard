import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';

interface ChargerPerformanceQuadrantProps {
  availableWidth?: number;
  availableHeight?: number;
}

export const ChargerPerformanceQuadrant: React.FC<ChargerPerformanceQuadrantProps> = ({
  availableWidth = 300,
  availableHeight = 250
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="battery-charging" size={48} color={theme.colors.secondary} />
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
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.md,
    overflow: 'hidden',
  },
  iconContainer: {
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: 24,
  },
  comingSoon: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius,
  },
  comingSoonText: {
    color: '#fff',
    fontSize: theme.fontSize.medium,
    fontWeight: '600',
  },
});