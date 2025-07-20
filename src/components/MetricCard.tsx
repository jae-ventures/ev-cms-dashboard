import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';
import { MetricCardProps } from '../types';

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  color = theme.colors.primary,
  prefix = '',
  suffix = ''
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value, { color }]}>
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius,
    marginBottom: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: theme.fontSize.small,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    fontWeight: '600'
  },
  value: {
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSize.small,
    color: theme.colors.textSecondary,
  }
});