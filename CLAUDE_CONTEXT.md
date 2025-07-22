# EV Charging Dashboard - Claude Code Context

## PROJECT OVERVIEW
**Goal**: Build a professional dashboard app that helps EV charging site owners understand their cost of ownership and make data-driven operational decisions.

**Client Context**: PlugIn ChargeUp provides comprehensive operations and maintenance services for EV charging sites. They need a dashboard that integrates with EV Charging Management Systems and energy APIs to show live data about utilization and costs.

**Target Users**: Property owners with EV charging stations who want to:
- Track revenue, costs, and profit for 1-X charging sites
- Understand their road to profitability (ROI analysis)
- Get AI-powered recommendations for improving site operations
- Monitor individual charger performance and utilization

## TECHNICAL REQUIREMENTS
- **Framework**: Expo React Native with TypeScript
- **Responsive Design**: Must work well on mobile, tablet, and desktop browsers
- **Navigation**: Bottom tabs (mobile) / Drawer navigation (tablet+)
- **Charts**: Using react-native-chart-kit for data visualization
- **Design**: Professional dashboard with quadrant-based layout

## CURRENT PROJECT STRUCTURE
```
EVChargingDashboard/
├── App.tsx (responsive navigation with stacks)
├── src/
│   ├── components/
│   │   ├── QuadrantContainer.tsx (reusable quadrant wrapper)
│   │   ├── MetricCard.tsx (metric display cards)
│   │   ├── quadrants/ (main dashboard quadrants)
│   │   │   ├── ROIQuadrant.tsx (summary ROI for main dashboard)
│   │   │   ├── CostAnalyticsQuadrant.tsx (placeholder)
│   │   │   ├── ActionStepsQuadrant.tsx (placeholder)
│   │   │   └── ChargerPerformanceQuadrant.tsx (placeholder)
│   │   └── roi-detail/ (detailed ROI analysis quadrants)
│   │       ├── BalanceSheetQuadrant.tsx (investment vs revenue breakdown)
│   │       ├── MonthlyComparisonQuadrant.tsx (monthly ops costs vs revenue)
│   │       ├── ProfitabilityProjectionQuadrant.tsx (path to profitability)
│   │       └── ROISummaryQuadrant.tsx (AI insights & actions)
│   ├── screens/
│   │   ├── DashboardScreen.tsx (main 4-quadrant dashboard)
│   │   ├── ROIScreen.tsx (detailed ROI analysis - COMPLETED)
│   │   ├── ChargersScreen.tsx (detailed charger management)
│   │   └── AnalyticsScreen.tsx (detailed cost analytics)
│   ├── data/mockData.ts (BJ's Medford MA sample data)
│   ├── types/index.ts (TypeScript interfaces)
│   └── styles/theme.ts (responsive design system)
```

## DASHBOARD DESIGN PHILOSOPHY
**Main Dashboard**: 4 tappable quadrants in a 2x2 grid (mobile: stacked, tablet+: grid)

1. **ROI Quadrant**: Quick profitability overview with bar chart comparing investment vs revenue
2. **Cost Analytics Quadrant**: Cost breakdown (energy, maintenance, etc.) + carbon intensity + "Get Report" AI tool
3. **Action Steps Quadrant**: TODO-style recommendations + "Make a Plan" AI tool  
4. **Charger Performance Quadrant**: Individual charger cards with utilization, energy delivered, issues

**Detail Screens**: Each quadrant expands to show deeper analysis with multiple sub-quadrants

## CURRENT STATUS
**Day 1 COMPLETED**: 
- ✅ Project setup with responsive navigation
- ✅ ROI quadrant (summary) for main dashboard  
- ✅ Complete ROIScreen with 4 detailed quadrants:
  - Balance Sheet (investment/revenue breakdown)
  - Monthly Comparison (monthly costs vs revenue)
  - Profitability Projections (actual vs projected timeline)
  - AI Summary & Actions (insights + recommendations)

**NEXT PRIORITIES**:
- Day 2: Cost Analytics quadrant for main dashboard + detailed analytics screen
- Day 3: Charger Performance quadrant + individual charger monitoring
- Day 4: Action Steps quadrant + AI planning tools
- Day 5: Integration polish + demo preparation

## DATA CONTEXT
Using real financial data from "ChargeUp Cafe" charging site:
- $142,960 initial investment
- 4 charging stalls, 600kW peak capacity
- 12 months of operational data with detailed cost/revenue breakdowns
- Currently trending toward profitability but not yet break-even

## DEVELOPMENT PREFERENCES
- Component-driven architecture with reusable quadrants
- TypeScript for type safety
- Responsive design with breakpoints (768px tablet, 1024px desktop)
- Professional UI with proper shadows, spacing, and visual hierarchy
- Mock AI features (reports, recommendations) with realistic placeholder content

## CODING STYLE
- Use descriptive variable names but keep them concise
- Prefer functional components with hooks
- Organize imports cleanly
- Use the established theme system for consistent styling
- Create reusable components when patterns emerge

## INSTRUCTIONS FOR CLAUDE CODE
When helping with this project:
1. Consider the responsive design requirements
2. Maintain consistency with existing components and patterns
3. Use the established data structures and mock data
4. Keep the professional dashboard aesthetic
5. Think about how features would work in a real production environment

## KEY FEATURES TO IMPLEMENT
- **Cost Performance/Analytics**: Show operational costs (energy, maintenance) and carbon intensity
- **Individual Charger Performance**: Monitor utilization, energy delivered, issues per charger
- **Action Steps**: AI-powered recommendations with priority and impact ratings
- **AI Tools**: "Get Report" and "Make a Plan" features for actionable insights

This is a 5-day evening project building a prototype for PlugIn ChargeUp's EV charging operations dashboard. Focus on creating a professional, data-driven interface that helps charging site owners optimize their operations and profitability.