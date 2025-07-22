import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
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
  const { width } = Dimensions.get('window');
  const isLargeScreen = width >= 768;

  return (
    <View style={[
      styles.card, 
      isLargeScreen && styles.cardLarge
    ]}>
      <Text style={[
        styles.title,
        isLargeScreen && styles.titleLarge
      ]}>{title}</Text>
      <Text style={[
        styles.value, 
        { color },
        isLargeScreen && styles.valueLarge
      ]}>
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </Text>
      {subtitle && (
        <Text style={[
          styles.subtitle,
          isLargeScreen && styles.subtitleLarge
        ]}>{subtitle}</Text>
      )}
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
    minHeight: 100,
  },
  cardLarge: {
    padding: theme.spacing.lg,
    minHeight: 120,
    minWidth: 200,
  },
  title: {
    fontSize: theme.fontSize.small,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    fontWeight: '600'
  },
  titleLarge: {
    fontSize: theme.fontSize.medium,
  },
  value: {
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  valueLarge: {
    fontSize: theme.fontSize.xlarge,
  },
  subtitle: {
    fontSize: theme.fontSize.small,
    color: theme.colors.textSecondary,
  },
  subtitleLarge: {
    fontSize: theme.fontSize.medium,
  }
});