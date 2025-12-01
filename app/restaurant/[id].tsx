// app/restaurant/[id]/index.tsx
import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useTheme } from '@/src/context/Theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import apiClient from '@/src/api/client';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface IRecipe {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  mealType: string[];
  difficulty: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  caloriesPerServing: number;
  rating: number;
  reviewCount: number;
  ingredients: string[];
  instructions: string[];
  tags: string[];
}

const RestaurantDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = React.useState<'profile' | 'menu'>('profile');
  const [recipe, setRecipe] = React.useState<IRecipe | null>(null);
  const [menuRecipes, setMenuRecipes] = React.useState<IRecipe[]>([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  React.useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const resp = await apiClient(`/${id}`);
        setRecipe(resp);
        const data = await apiClient('/', { limit: 50 });
        const allRecipes = data.recipes;
        const menu = allRecipes.filter((r: IRecipe) => r.cuisine === resp.cuisine);
        setMenuRecipes(menu);
      } catch (error) {
        console.log('Error:', error);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.skeleton, { width: '100%', height: 240 }]} />
        <View style={[styles.skeleton, { width: 200, height: 30, marginTop: 24 }]} />
      </SafeAreaView>
    );
  }

  const restaurantName = `${recipe.cuisine} Kitchen`;
  const cardWidth = (width - 64) / 2;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={[styles.heroContent, { backgroundColor: theme.colors.primary }]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.avatarContainer}>
              <View style={[styles.avatar, { backgroundColor: theme.colors.surface }]}>
                <Ionicons name="restaurant-outline" size={28} color={theme.colors.primary} />
              </View>
            </View>
            <Text style={[styles.heroTitle, { color: '#FFFFFF' }]}>{restaurantName}</Text>
            <Text style={[styles.heroSubtitle, { color: '#FFFFFF' }]}>{recipe.cuisine} Cuisine</Text>
          </View>
        </View>

        <View style={[styles.tabContainer, { backgroundColor: theme.colors.surface }]}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'profile' && { backgroundColor: theme.colors.primary }]}
            onPress={() => setActiveTab('profile')}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: activeTab === 'profile' ? '#FFFFFF' : theme.colors.textSecondary,
                  fontFamily: activeTab === 'profile' ? theme.fonts.bold : theme.fonts.regular,
                },
              ]}
            >
              Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'menu' && { backgroundColor: theme.colors.primary }]}
            onPress={() => setActiveTab('menu')}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: activeTab === 'menu' ? '#FFFFFF' : theme.colors.textSecondary,
                  fontFamily: activeTab === 'menu' ? theme.fonts.bold : theme.fonts.regular,
                },
              ]}
            >
              Menu ({menuRecipes.length})
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'profile' ? (
          <View style={[styles.infoCard, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={18} color={theme.colors.text} />
              <Text style={[styles.infoText, { color: theme.colors.text }]} numberOfLines={2}>
                {recipe.cuisine} District • Inspired by authentic {recipe.cuisine} flavors
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="pricetag-outline" size={18} color={theme.colors.text} />
              <Text style={[styles.infoText, { color: theme.colors.text }]}>
                Type: {recipe.cuisine}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="car-outline" size={18} color={theme.colors.text} />
              <Text style={[styles.infoText, { color: theme.colors.text }]}>
                Parking: Available
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="star" size={18} color={theme.colors.primary} />
              <Text style={[styles.infoText, { color: theme.colors.text }]}>
                Rating: {recipe.rating} • {recipe.reviewCount} reviews
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.menuSection}>
            <View style={styles.menuGrid}>
              {menuRecipes.map((item) => (
                <View
                  key={item.id}
                  style={[styles.menuItem, { width: cardWidth, backgroundColor: theme.colors.surface }]}
                >
                  <Image source={{ uri: item.image }} style={styles.menuItemImage} resizeMode="cover" />
                  <View style={styles.menuItemContent}>
                    <Text style={[styles.menuItemName, { color: theme.colors.text }]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.menuItemPrice, { color: theme.colors.primary }]}>
                      ${(item.caloriesPerServing / 10).toFixed(0)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    // height: 240,
    justifyContent: 'flex-end',
  },
  heroContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    lineHeight: 28,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    opacity: 0.9,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: -12,
    borderRadius: 16,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  tabText: {
    fontSize: 15,
  },
  infoCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    marginTop: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 8,
  },
  infoText: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    flex: 1,
  },
  menuSection: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  menuItem: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  menuItemImage: {
    width: '100%',
    height: 120,
  },
  menuItemContent: {
    padding: 14,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  menuItemName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  menuItemPrice: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  skeleton: {
    backgroundColor: '#00000020',
    borderRadius: 8,
    marginHorizontal: 20,
  },
});

export default RestaurantDetail;
