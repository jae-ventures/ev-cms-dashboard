import { useResponsive, getResponsiveValue } from './useResponsive';
import { theme } from '../styles/theme';

export const useTheme = () => {
  const responsiveData = useResponsive();
  const { width } = responsiveData;

  const getSpacing = (size: keyof typeof theme.spacing): number => {
    const values = theme.spacing[size];
    return getResponsiveValue(width, values.phone, values.tablet, values.desktop);
  };

  const getFontSize = (size: keyof typeof theme.fontSize): number => {
    const values = theme.fontSize[size];
    return getResponsiveValue(width, values.phone, values.tablet, values.desktop);
  };

  const getBorderRadius = (): number => {
    const values = theme.borderRadius;
    return getResponsiveValue(width, values.phone, values.tablet, values.desktop);
  };

  const getHeaderHeight = (): number => {
    const values = theme.layout.headerHeight;
    return getResponsiveValue(width, values.phone, values.tablet, values.desktop);
  };

  return {
    ...theme,
    responsive: responsiveData,
    spacing: {
      xs: getSpacing('xs'),
      sm: getSpacing('sm'),
      md: getSpacing('md'),
      lg: getSpacing('lg'),
      xl: getSpacing('xl'),
    },
    fontSize: {
      small: getFontSize('small'),
      medium: getFontSize('medium'),
      large: getFontSize('large'),
      xlarge: getFontSize('xlarge'),
    },
    borderRadius: getBorderRadius(),
    layout: {
      ...theme.layout,
      headerHeight: getHeaderHeight(),
    },
  };
};