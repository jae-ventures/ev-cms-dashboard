import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import all screens
import { DashboardScreen } from './src/screens/DashboardScreen';
import { ROIScreen } from './src/screens/ROIScreen';
import { ChargersScreen } from './src/screens/ChargersScreen';
import { AnalyticsScreen } from './src/screens/AnalyticsScreen';
import { useResponsive } from './src/hooks/useResponsive';
import { theme } from './src/styles/theme';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Dashboard Flow (includes detail screens)
const DashboardStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="DashboardMain" 
        component={DashboardScreen}
        options={{ 
          title: 'EV Charging Dashboard',
          headerShown: false // We'll show header in tab/drawer navigator
        }}
      />
      <Stack.Screen 
        name="ROIDetail" 
        component={ROIScreen}
        options={{ 
          title: 'Return on Investment Analysis',
          presentation: 'card'
        }}
      />
    </Stack.Navigator>
  );
}

// Stack Navigator for Chargers Flow
const ChargersStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="ChargersMain" 
        component={ChargersScreen}
        options={{ 
          title: 'Charger Performance',
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

// Stack Navigator for Analytics Flow
const AnalyticsStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="AnalyticsMain" 
        component={AnalyticsScreen}
        options={{ 
          title: 'Cost Analytics',
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

// Tab Navigator for Mobile
const TabNavigator: React.FC = () => {
  const { isTablet } = useResponsive();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'speedometer' : 'speedometer-outline';
          } else if (route.name === 'Chargers') {
            iconName = focused ? 'battery-charging' : 'battery-charging-outline';
          } else if (route.name === 'Analytics') {
            iconName = focused ? 'analytics' : 'analytics-outline';
          } else {
            iconName = 'circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: theme.colors.primary,
          height: isTablet ? 70 : 60,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardStack}
        options={{ title: 'EV Charging Dashboard' }}
      />
      <Tab.Screen 
        name="Chargers" 
        component={ChargersStack}
        options={{ title: 'Charger Performance' }}
      />
      <Tab.Screen 
        name="Analytics" 
        component={AnalyticsStack}
        options={{ title: 'Cost Analytics' }}
      />
    </Tab.Navigator>
  );
}

// Drawer Navigator for Tablet/Desktop
const DrawerNavigator: React.FC = () => {
  const { isDesktop } = useResponsive();
  
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: theme.layout.sidebarWidth,
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
          height: isDesktop ? 80 : 70,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.textSecondary,
      }}
    >
      <Drawer.Screen 
        name="Dashboard" 
        component={DashboardStack}
        options={{ 
          title: 'EV Charging Dashboard',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="speedometer-outline" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name="Chargers" 
        component={ChargersStack}
        options={{ 
          title: 'Charger Performance',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="battery-charging-outline" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name="Analytics" 
        component={AnalyticsStack}
        options={{ 
          title: 'Cost Analytics',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="analytics-outline" size={size} color={color} />
          )
        }}
      />
    </Drawer.Navigator>
  );
}

const AppContent: React.FC = () => {
  const { isPhone, isTablet, isDesktop, isLarge } = useResponsive();
  
  // Phone uses tab navigation, all others use drawer navigation
  const useDrawerNav = isTablet || isDesktop || isLarge;

  return (
    <NavigationContainer>
      {useDrawerNav ? <DrawerNavigator /> : <TabNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}