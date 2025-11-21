// app/(tabs)/index.tsx
import Items from '@/src/components/ui/Items';
import apiClient from '../../src/api/client';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions, ImageBackground } from 'react-native';
import { IRECIPE } from '@/src/types/recipe';
import { LinearGradient } from 'expo-linear-gradient';
import AppBar from '@/src/components/ui/appbar/appbar';
import SummaryCards from '@/src/components/ui/summaryCard/Card';

const Index = () => {
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.44;

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [lunchMenus, setLunchMenus] = useState<IRECIPE[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await apiClient('/', { limit: 6 });
        if (data && Array.isArray(data.recipes)) {
          const formatted = data.recipes.map((item: any) => ({
            id: item.id || Math.random(),
            name: item.name || 'Untitled Recipe',
            image: item.image || 'https://via.placeholder.com/150',
            rating: item.rating || 0,
            prepTimeMinutes: item.prepTimeMinutes || 0,
            cookTimeMinutes: item.cookTimeMinutes || 0,
            servings: item.servings || 1,
            cuisine: item.cuisine || 'Unknown',
            saved: item.saved ?? false,
            color: item.color || '#A8E6CF',
            difficulty: item.difficulty,
          }));
          setLunchMenus(formatted);
        }
      } catch (error) {
        console.error('Failed to load recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);


  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <AppBar />
      <SummaryCards />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recommendations</Text>
        <TouchableOpacity onPress={() => console.log('See All pressed')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recommendationsScroll}
      >
        {lunchMenus.slice(0, 5).map((entry: IRECIPE) => (
          <TouchableOpacity key={entry.id} style={styles.recommendationCard}>
            <ImageBackground
              source={{ uri: entry.image }}
              style={styles.recommendationImage}
              imageStyle={{ borderRadius: 16 }}
            >
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.6)']}
                style={styles.recommendationOverlay}
              />
              <View style={styles.recommendationContent}>
                <Text style={styles.recommendationTitle} numberOfLines={1}>
                  {entry.name}
                </Text>
                <View style={styles.recommendationMeta}>
                  <Ionicons name="time-outline" size={12} color="#FFF" />
                  <Text style={styles.recommendationText}>
                    {entry.prepTimeMinutes + (typeof entry.cookTimeMinutes === 'number' ? entry.cookTimeMinutes : 0)} min
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Lunch or Dinner</Text>
        <TouchableOpacity onPress={() => console.log('See All pressed')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuList}>
        <Items isLoading={loading} entries={lunchMenus} cardWidth={cardWidth} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#F8FBF8',
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 100,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    marginVertical: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    color: '#1B5E20',
  },
  seeAllText: {
    fontSize: 14,
    color: '#66BB6A',
    fontFamily: 'Inter_600SemiBold',
  },
  recommendationsScroll: {
    paddingHorizontal: 20,
    gap: 16,
    paddingBottom: 10,
  },
  recommendationCard: {
    width: 160,
  },
  recommendationImage: {
    width: '100%',
    height: 180,
    justifyContent: 'flex-end',
    borderRadius: 16,
  },
  recommendationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    borderRadius: 16,
  },
  recommendationContent: {
    padding: 12,
  },
  recommendationTitle: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowRadius: 2,
  },
  recommendationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  recommendationText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#FFFFFF',
    opacity: 0.95,
  },
  menuList: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
});

export default Index;
