# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an EV Charging Site Dashboard built with React Native and Expo. It provides a comprehensive management interface for EV charging sites with ROI analysis, cost analytics, charger performance metrics, and action steps.

## Development Commands

- `npm start` - Start Expo development server
- `npm run android` - Start on Android emulator/device
- `npm run ios` - Start on iOS simulator/device  
- `npm run web` - Start web development server

## Architecture & Structure

### Navigation Architecture
- **Responsive Design**: Uses bottom tabs on mobile, drawer navigation on tablet/desktop
- **Stack-based**: Each main section (Dashboard, Chargers, Analytics) has its own stack navigator
- **Breakpoint Logic**: Switches navigation pattern at 768px width (`theme.breakpoints.tablet`)

### Core Components
- **QuadrantContainer**: Reusable container for dashboard sections with optional navigation
- **Quadrant Components**: Specialized widgets in `src/components/quadrants/` for different data visualizations
- **MetricCard**: Displays key metrics with customizable formatting

### Data Layer
- **Mock Data**: Located in `src/data/mockData.ts` with realistic EV charging site financials
- **Type Definitions**: Comprehensive TypeScript interfaces in `src/types/index.ts`
- **SiteData Interface**: Contains monthly revenue/cost breakdowns, investment details, and projections

### Styling System
- **Dynamic Responsive Theme**: `src/hooks/useResponsive.ts` and `src/hooks/useTheme.ts` for dynamic responsive values
- **Color Palette**: Green primary (#2E8B57) theme appropriate for EV/sustainability
- **Layout Constants**: Max width (1200px), sidebar width (250px), responsive header heights
- **Theme Structure**: Responsive values defined as objects with phone/tablet/desktop variants

### Screen Structure
- **DashboardScreen**: Main overview with 4 quadrants (ROI, Cost Analytics, Action Steps, Charger Performance)
- **ROIScreen**: Detailed ROI analysis and projections
- **ChargersScreen**: Charger performance metrics
- **AnalyticsScreen**: Cost performance and analytics

## Key Patterns

### Dynamic Responsive Design
Components use responsive hooks that update on window resize:
```typescript
const { width, isTablet, isDesktop } = useResponsive();
const theme = useTheme(); // Returns responsive values based on current screen size
```

### Responsive Hooks
- **useResponsive()**: Returns current dimensions and breakpoint booleans
- **useTheme()**: Returns theme object with calculated responsive values for current screen size

### Data Structure
All financial data follows the `MonthlyData` interface with detailed revenue/cost breakdowns:
- Revenue sources: charging sessions, tax credits, utility kickbacks
- Cost categories: utility, maintenance, financing, service provider, insurance

### Navigation Integration
Stack navigators wrap each main section to enable detail screens while maintaining proper header/tab structure.