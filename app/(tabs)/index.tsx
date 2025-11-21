// app/(tabs)/index.tsx
import Items from '@/src/components/ui/Items';
import apiClient from '../../src/api/client';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions, ImageBackground } from 'react-native';
import { IRECIPE } from '@/src/types/recipe';
import { LinearGradient } from 'expo-linear-gradient';
import SummaryCards from '@/src/components/ui/summaryCard/Card';
import SkeletonCard from '@/src/components/loading/skeleton';
import { useTheme } from '@/src/context/Theme/ThemeContext';

const Index = () => {
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.44;
  const { theme } = useTheme();

  const [fontsLoaded] = useFonts({
    Inter_400Regular: theme.fonts.regular,
    Inter_600SemiBold: theme.fonts.medium,
    Inter_700Bold: theme.fonts.bold,
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
            color: item.color || theme.colors.surface,
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
  }, [theme]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView
      style={[styles.pageContainer, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <SummaryCards />

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.fonts.bold }]}>
          Recommendations
        </Text>
        <TouchableOpacity onPress={() => console.log('See All pressed')}>
          <Text style={[styles.seeAllText, { color: theme.colors.primaryLight, fontFamily: theme.fonts.medium }]}>
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recommendationsScroll}
      >
        {!loading && lunchMenus.length > 0 ? (
          lunchMenus.slice(0, 5).map((entry: IRECIPE) => (
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
                  <Text
                    style={[
                      styles.recommendationTitle,
                      { color: '#FFFFFF', fontFamily: theme.fonts.bold },
                    ]}
                    numberOfLines={1}
                  >
                    {entry.name}
                  </Text>
                  <View style={styles.recommendationMeta}>
                    <Ionicons name="time-outline" size={12} color="#FFF" />
                    <Text
                      style={[
                        styles.recommendationText,
                        { color: '#FFFFFF', fontFamily: theme.fonts.regular },
                      ]}
                    >
                      {entry.prepTimeMinutes + (typeof entry.cookTimeMinutes === 'number' ? entry.cookTimeMinutes : 0)} min
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))
        ) : (
          Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} cardWidth={cardWidth} />
          ))
        )}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.fonts.bold }]}>
          Lunch or Dinner
        </Text>
        <TouchableOpacity onPress={() => console.log('See All pressed')}>
          <Text style={[styles.seeAllText, { color: theme.colors.primaryLight, fontFamily: theme.fonts.medium }]}>
            See All
          </Text>
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
  },
  scrollContent: {
    paddingTop: 30,
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
  },
  seeAllText: {
    fontSize: 14,
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
    opacity: 0.95,
  },
  menuList: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
});

export default Index;
