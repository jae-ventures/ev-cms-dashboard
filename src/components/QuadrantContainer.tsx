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
  const { width, isPhone, isTablet, isDesktop, isLarge } = useResponsive();

  // Calculate sizing based on breakpoints
  const useGridLayout = isTablet || isDesktop || isLarge;
  
  // Calculate width based on screen size and layout
  // Account for container padding and gap between items
  const containerPadding = theme.spacing.md * 2; // Left + right padding
  const gapSpace = useGridLayout ? theme.spacing.md : 0; // Gap between grid items
  const availableWidth = width - containerPadding - gapSpace;
  
  const quadrantWidth = useGridLayout
    ? isLarge 
      ? Math.min(550, availableWidth * 0.48)  // Large: max 550px or 48% of available width
      : isDesktop 
        ? Math.min(500, availableWidth * 0.47)  // Desktop: max 500px or 47% of available width  
        : Math.min(450, availableWidth * 0.46)  // Tablet: max 450px or 46% of available width
    : availableWidth;                          // Phone: full available width

  const quadrantHeight = isLarge ? 500 : isDesktop ? 450 : isTablet ? 400 : 350;

  const Wrapper = onPress ? TouchableOpacity : View;

  // Calculate available space for content
  const headerHeight = theme.fontSize.medium + theme.spacing.sm + theme.spacing.xs + 1; // title + margins + border
  const containerPaddingVertical = theme.spacing.md * 2; // top + bottom padding
  const availableContentHeight = quadrantHeight - headerHeight - containerPaddingVertical;
  const availableContentWidth = quadrantWidth - (theme.spacing.md * 2); // left + right padding

  return (
    <Wrapper
      style={[
        styles.quadrant,
        { 
          width: quadrantWidth, 
          height: quadrantHeight,
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
      <View style={[styles.content, { height: availableContentHeight }]}>
        {React.cloneElement(children as React.ReactElement, {
          availableWidth: availableContentWidth,
          availableHeight: availableContentHeight,
        })}
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
    overflow: 'hidden',
  },
});