import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { ChargersScreen } from './src/screens/ChargersScreen';
import { AnalyticsScreen } from './src/screens/AnalyticsScreen';
import { theme } from './src/styles/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
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
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen 
            name="Dashboard" 
            component={DashboardScreen}
            options={{ title: 'EV Charging Dashboard' }}
          />
          <Tab.Screen 
            name="Chargers" 
            component={ChargersScreen}
            options={{ title: 'Charger Performance' }}
          />
          <Tab.Screen 
            name="Analytics" 
            component={AnalyticsScreen}
            options={{ title: 'Deep Analytics' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
