import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';

interface ActionStepsQuadrantProps {
  availableWidth?: number;
  availableHeight?: number;
}

export const ActionStepsQuadrant: React.FC<ActionStepsQuadrantProps> = ({
  availableWidth = 300,
  availableHeight = 250
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="checkmark-circle" size={32} color={theme.colors.success} />
      </View>
      <Text style={styles.title}>Action Steps</Text>
      <Text style={styles.subtitle}>
        AI-powered recommendations and actionable tasks
      </Text>
      <View style={styles.comingSoon}>
        <Text style={styles.comingSoonText}>Coming in Day 4</Text>
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
    backgroundColor: theme.colors.success,
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