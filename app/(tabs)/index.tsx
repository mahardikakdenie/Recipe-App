import apiClient from '../../src/api/client';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity, ScrollView } from 'react-native';

const SkeletonCard = () => (
  <View style={styles.skeletonCard}>
    <View style={styles.skeletonImage} />
    <View style={styles.skeletonContent}>
      <View style={[styles.skeletonLine, { width: '70%', height: 18, marginBottom: 8 }]} />
      <View style={[styles.skeletonLine, { width: '50%', height: 14, marginBottom: 6 }]} />
      <View style={[styles.skeletonLine, { width: '40%', height: 12 }]} />
      <View style={styles.skeletonMetaRow}>
        <View style={[styles.skeletonMetaItem, { width: 60 }]} />
        <View style={[styles.skeletonMetaItem, { width: 50 }]} />
        <View style={[styles.skeletonMetaItem, { width: 45 }]} />
      </View>
    </View>
  </View>
);

const Index = () => {
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
        const data = await apiClient('/', { limit: 5 });
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

  const savedCount = lunchMenus.filter(item => item.saved).length;

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.headerTitle}>Meal Plan</Text>
          <AntDesign name="fire" size={22} color="#FF6B35" />
        </View>

        <View style={styles.saveIconContainer}>
          <Ionicons name="bookmark" size={24} color="#2D2D2D" />
          {savedCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{savedCount}</Text>
            </View>
          )}
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

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Lunch or Dinner</Text>
        <TouchableOpacity onPress={() => console.log('See All pressed')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuList}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : lunchMenus.map((item) => (
              <View key={item.id} style={[styles.menuCard, { backgroundColor: item.color }]}>
                <Image source={{ uri: item.image }} style={styles.menuImage} resizeMode="cover" />
                <View style={styles.menuContent}>
                  <View style={styles.menuActions}>
                    <Pressable>
                      <Ionicons
                        name={item.saved ? 'heart' : 'heart-outline'}
                        color={item.saved ? '#FF6B35' : '#888888'}
                        size={22}
                      />
                    </Pressable>
                    <Pressable style={styles.addButton}>
                      <Ionicons name="add" color="#2D2D2D" size={18} />
                    </Pressable>
                  </View>
                  <Text style={styles.menuTitle} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                      <Ionicons name="time" size={12} color="#555" />
                      <Text style={styles.metaText}>
                        {item.prepTimeMinutes + item.cookTimeMinutes} min
                      </Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="person" size={12} color="#555" />
                      <Text style={styles.metaText}>{item.servings} pax</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="star" size={12} color="#FFD700" />
                      <Text style={styles.metaText}>{item.rating.toFixed(1)}</Text>
                    </View>
                  </View>
                  <View style={styles.cuisineTag}>
                    <Text style={styles.cuisineText}>{item.cuisine}</Text>
                  </View>
                </View>
              </View>
            ))}
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
    paddingBottom: 50,
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
    backgroundColor: '#E0E0E0',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  cuisineText: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
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
});

export default Index;
