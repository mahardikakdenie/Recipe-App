// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

const tabsConfig = [
  { name: 'index', title: 'Discover', icon: 'compass' },
  { name: 'chef', title: 'Restaurant', icon: 'restaurant' },
  { name: 'search', title: 'Search', icon: 'search' },
  { name: 'journal', title: 'Journal', icon: 'clipboard' },
  { name: 'auth', title: 'Profile', icon: 'people-circle' },
] as const;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {tabsConfig.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <View style={[styles.tabItem, focused && styles.activeTab, focused && tab.title === 'Discover' && {
                marginLeft: 20
              }]}>
                <Ionicons
                  name={tab.icon as any}
                  size={24}
                  color={focused ? '#00C853' : '#757575'}
                />
                {focused && (
                  <Text style={styles.tabLabel}>{tab.title}</Text>
                )}
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 0,
    shadowOpacity: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 32,
    height: 48,
    minWidth: 100,
  },
  activeTab: {
    backgroundColor: '#E8F5E9',
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#00C853',
    fontWeight: "bold",
  },
});
