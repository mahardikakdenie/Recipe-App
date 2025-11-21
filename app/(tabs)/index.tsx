// app/(tabs)/index.tsx
import Items from '@/src/components/ui/Items';
import apiClient from '../../src/api/client';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity, ScrollView, useWindowDimensions, ImageBackground } from 'react-native';
import { IRECIPE } from '@/src/types/recipe';
import { LinearGradient } from 'expo-linear-gradient';

const summaryCards = [
  {
    id: '1',
    badge: '✨ Discover More',
    title: 'Explore Tasty Recipes',
    subtitle: 'Discover delicious meals crafted just for you.',
    buttonText: 'Explore Recipes',
    image: 'https://cdn-icons-png.freepik.com/512/9173/9173213.png?ga=GA1.1.887243274.1762007492',
  },
  {
    id: '2',
    badge: '🔥 Popular This Week',
    title: 'Quick & Easy Dinners',
    subtitle: 'Ready in under 30 minutes — perfect for busy days.',
    buttonText: 'View Recipes',
    image: 'https://cdn-icons-png.freepik.com/512/3135/3135715.png',
  },
  {
    id: '3',
    badge: '🌿 Healthy Picks',
    title: 'Nourish Your Body',
    subtitle: 'Fresh, balanced meals for a healthier lifestyle.',
    buttonText: 'See Healthy Options',
    image: 'https://cdn-icons-png.freepik.com/512/6331/6331224.png',
  },
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good Morning';
  if (hour >= 12 && hour < 19) return 'Good Afternoon';
  if (hour < 19) return 'Good Evening';
  return 'Good Night';
};

const getCurrentDate = () => {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

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
  const [activeIndex, setActiveIndex] = useState(0);
  const greeting = getGreeting();
  const currentDate = getCurrentDate();

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

  const savedCount = lunchMenus.filter(item => item.saved).length;

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
            <Ionicons name="person" size={20} color="#2E7D32" />
          </View>
          <View>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.name}>Tahira</Text>
            <Text style={styles.dateText}>{currentDate}</Text>
          </View>
        </View>
        <View style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={28} color="#1B5E20" />
          <View style={styles.saveIconContainer}>
            <Ionicons name="bookmark" size={28} color="#1B5E20" />
            {savedCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{savedCount}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
        onScroll={(e) => {
          const x = e.nativeEvent.contentOffset.x;
          const index = Math.round(x / (width * 0.9));
          setActiveIndex(index);
        }}
        scrollEventThrottle={16}
      >
        {summaryCards.map((card) => (
          <View key={card.id} style={[styles.mainCard, { width: width * 0.9 }]}>
            <View style={styles.cardContent}>
              <View style={styles.badgeHighlight}>
                <Text style={styles.badgeTextSmall}>{card.badge}</Text>
              </View>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
              <Pressable style={({ pressed }) => [styles.actionButton, pressed && { opacity: 0.9 }]}>
                <Text style={styles.actionButtonText}>{card.buttonText}</Text>
              </Pressable>
            </View>
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: card.image }}
                style={styles.chefImage}
                resizeMode="contain"
              />
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.dotsContainer}>
        {summaryCards.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === activeIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

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
    backgroundColor: '#C8E6C9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: '#388E3C',
    fontFamily: 'Inter_400Regular',
    fontWeight: '700'
  },
  name: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#1B5E20',
  },
  dateText: {
    fontSize: 14,
    color: '#66BB6A',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
    fontWeight: '800'
  },
  iconButton: {
    flexDirection: 'row',
    gap: 12,
  },
  saveIconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#4CAF50',
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
  carouselContainer: {
    gap: 10,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  mainCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  cardContent: {
    flex: 1,
    marginRight: 16,
  },
  badgeHighlight: {
    alignSelf: 'flex-start',
    backgroundColor: '#4CAF50',
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
    color: '#1B5E20',
    marginTop: 8,
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#388E3C',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#66BB6A',
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
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: '#4CAF50',
  },
  inactiveDot: {
    backgroundColor: '#A5D6A7',
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
