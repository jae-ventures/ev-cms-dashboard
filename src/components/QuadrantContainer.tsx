import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useResponsive } from '../hooks/useResponsive';
import { theme } from '../styles/theme';
import { QuadrantProps } from '../types';

export const QuadrantContainer: React.FC<QuadrantProps> = ({
  title,
  onPress,
  children,
  isExpandable = true
}) => {
  const { width, isTablet, isDesktop } = useResponsive();

  const quadrantWidth = isDesktop 
    ? (width - theme.spacing.lg * 3) / 2 
    : isTablet 
    ? (width - theme.spacing.md * 3) / 2 
    : width - theme.spacing.md * 2;

  const quadrantHeight = isDesktop ? 350 : isTablet ? 300 : 250;

  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      style={[
        styles.quadrant,
        { 
          width: quadrantWidth, 
          height: quadrantHeight,
          marginBottom: theme.spacing.md,
          marginRight: isTablet ? theme.spacing.md : 0,
        }
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {isExpandable && onPress && (
          <Ionicons 
            name="chevron-forward" 
            size={20} 
            color={theme.colors.textSecondary} 
          />
        )}
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  quadrant: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius,
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    paddingBottom: theme.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.fontSize.medium,
    fontWeight: 'bold',
    color: theme.colors.text,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});