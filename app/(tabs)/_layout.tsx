// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

const TabLayout = () => {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#FF6B35',
          tabBarInactiveTintColor: '#FFA97A',
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarShowLabel: true,
          tabBarItemStyle: styles.tabBarItem,
          tabBarIconStyle: styles.tabBarIcon,
          tabBarBackground: () => (
            <View style={styles.tabBarBackground} />
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Plan",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="journal"
          options={{
            title: "Log",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="clipboard" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="recipe"
          options={{
            title: "Meals",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="restaurant" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  tabBarBackground: {
    flex: 1,
    backgroundColor: '#FFEDD5',
    borderRadius: 32,
    marginHorizontal: 16,
    marginBottom: 70,
  },
  tabBar: {
    borderTopWidth: 0,
    backgroundColor: '#FFEDD5',
    height: 64,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 16,
    marginBottom: 70,
    borderRadius: 32,
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarIcon: {
    marginBottom: 4,
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'capitalize',
  },
});
