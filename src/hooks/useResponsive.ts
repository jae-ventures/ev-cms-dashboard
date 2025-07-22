import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { breakpoints } from '../styles/theme';

export interface ResponsiveValue {
  width: number;
  height: number;
  isPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLarge: boolean;
}

export const useResponsive = (): ResponsiveValue => {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get('window');
    return { width, height };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
    });

    return () => subscription?.remove();
  }, []);

  const { width, height } = dimensions;

  return {
    width,
    height,
    isPhone: width < breakpoints.tablet,
    isTablet: width >= breakpoints.tablet && width < breakpoints.desktop,
    isDesktop: width >= breakpoints.desktop && width < breakpoints.large,
    isLarge: width >= breakpoints.large,
  };
};

export const getResponsiveValue = (
  width: number,
  phone: number,
  tablet?: number,
  desktop?: number,
  large?: number
): number => {
  if (width >= breakpoints.large) return large || desktop || tablet || phone;
  if (width >= breakpoints.desktop) return desktop || tablet || phone;
  if (width >= breakpoints.tablet) return tablet || phone;
  return phone;
};