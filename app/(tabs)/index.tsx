import Items from '@/src/screen/ui/Items';
import apiClient from '../../src/api/client';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity, ScrollView, useWindowDimensions, ImageBackground } from 'react-native';
import { IRECIPE } from '@/src/types/recipe';
import { LinearGradient } from 'expo-linear-gradient';

const Index = () => {
  const { width } = useWindowDimensions();
  const cardWidth: number = width * 0.44;

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [lunchMenus, setLunchMenus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await apiClient('/', { limit: 6 });
        if (data && Array.isArray(data.recipes)) {
          setLunchMenus(data.recipes.map((item: any) => ({
            id: item.id || Math.random(),
            name: item.name || 'Untitled Recipe',
            image: item.image || 'https://via.placeholder.com/150',
            rating: item.rating || 0,
            prepTimeMinutes: item.prepTimeMinutes || 0,
            cookTimeMinutes: item.cookTimeMinutes || 0,
            servings: item.servings || 1,
            cuisine: item.cuisine || 'Unknown',
            saved: item.saved ?? false,
            color: item.color || '#FFFFFF',
            difficulty: item.difficulty,
          })));
        }
      } catch (error) {
        console.error('Failed to load recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const savedCount = 10;

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.headerProfile}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={20} color="#666" />
          </View>
          <View>
            <Text style={styles.greeting}>Hello</Text>
            <Text style={styles.name}>Tahira</Text>
          </View>
        </View>
        <View style={styles.iconButton}>
          <View style={{
            backgroundColor: "#ffff",
            borderColor: 'green',
            borderWidth: 2,
            borderRadius: 50,
          }}>
            <Ionicons name="notifications-outline" size={28} color="green" />
          </View>
          <View style={styles.saveIconContainer}>
            <Ionicons name="bookmark" size={28} color="#53df41ff" />
            {savedCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{savedCount}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={styles.mainCard}>
        <View style={styles.cardContent}>
          <View style={styles.badgeHighlight}>
            <Text style={styles.badgeTextSmall}>✨ Discover More</Text>
          </View>
          <Text style={styles.cardTitle}>Explore Tasty Recipes</Text>
          <Text style={styles.cardSubtitle}>
            Discover delicious meals crafted just for you.
          </Text>
          <Pressable style={({ pressed }) => [styles.actionButton, pressed && { opacity: 0.9 }]}>
            <Text style={styles.actionButtonText}>Explore Recipes</Text>
          </Pressable>
        </View>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: 'https://cdn-icons-png.freepik.com/512/9173/9173213.png?ga=GA1.1.887243274.1762007492' }}
            style={styles.chefImage}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Recommendations */}
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
                colors={['transparent', 'rgba(0,0,0,0.7)']}
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
    backgroundColor: '#FFF9F0',
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 28,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Inter_700Bold',
    color: '#222222',
  },
  saveIconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
  },
  mainCard: {
    backgroundColor: '#FFD166',
    borderRadius: 24,
    marginHorizontal: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    marginRight: 16,
  },
  badgeHighlight: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF9E44',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeTextSmall: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
    marginTop: 8,
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#EF476F',
    paddingVertical: 13,
    paddingHorizontal: 28,
    borderRadius: 30,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
  imageWrapper: {
    alignItems: 'flex-end',
  },
  chefImage: {
    width: 100,
    height: 100,
    borderRadius: 24,
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
    color: '#222222',
  },
  seeAllText: {
    fontSize: 14,
    color: '#EF476F',
    fontFamily: 'Inter_600SemiBold',
  },
  menuList: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  menuCard: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  menuImage: {
    width: 84,
    height: 84,
    borderRadius: 16,
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
    justifyContent: 'center',
  },
  menuActions: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    gap: 10,
  },
  addButton: {
    backgroundColor: '#FFFFFF',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 17,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
    marginBottom: 6,
    maxWidth: '85%',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#666',
  },
  cuisineTag: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  cuisineText: {
    fontSize: 11,
    backgroundColor: '#E0E0E0',
    fontFamily: 'Inter_600SemiBold',
    padding: 5,
    borderRadius: 10,
    color: '#444',
  },
  skeletonCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
  },
  skeletonImage: {
    width: 84,
    height: 84,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    marginRight: 16,
  },
  skeletonContent: {
    flex: 1,
    justifyContent: 'center',
  },
  skeletonLine: {
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 4,
  },
  skeletonMetaRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  skeletonMetaItem: {
    height: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
  },
  categoryScroll: {
    marginBottom: 30,
  },
  categoryItem: {
    alignItems: 'center',
    padding: 5,
    marginHorizontal: 5,
  },
  categoryIcon: {
    // width: 80,
    // height: 80,
    borderRadius: 20,
    marginBottom: 5,
  },
  categoryLabel: {
    fontSize: 12,
    textAlign: 'center',
  },

  horizontalScroll: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 40,
  },
  imageContainer: {
    // width: '100%',
    // height: 200,
    justifyContent: 'flex-end',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    borderRadius: 16,
  },
  textContainer: {
    padding: 14,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
    marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowRadius: 2,
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
    textShadowColor: 'rgba(0,0,0,0.35)',
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
    opacity: 0.9,
  },
  headerProfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: '#777',
    fontFamily: 'Inter_400Regular',
  },
  name: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#222',
  },
  iconButton: {
    padding: 6,
    flexDirection: 'row',
    fontSize: 10,
    gap: 10,
  },
});

export default Index;
