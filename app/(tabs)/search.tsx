// app/search.tsx
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, useWindowDimensions, Animated } from 'react-native';
import { useTheme } from '@/src/context/Theme/ThemeContext';
import TitleSection from '@/src/components/ui/TitleSection';
import apiClient from '@/src/api/client';
import { IRECIPE } from '@/src/types/recipe';
import Items from '@/src/components/ui/Items';
import SkeletonCard from '@/src/components/loading/skeleton';
import { convertFormattedRecipe } from '@/src/utils/constant';

const Search = () => {
  const { theme } = useTheme();
  const [menus, setMenus] = React.useState<IRECIPE[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchText, setSearchText] = React.useState('');
  const [moodRecipes, setMoodRecipes] = React.useState<IRECIPE[]>([]);

  const { width } = useWindowDimensions();
  const cardWidth = width * 0.44;

  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const bounceTimeout = React.useRef<NodeJS.Timeout | number | null>(null);

  const fetchSearch = async (text: string) => {
    try {
      const data = await apiClient('/search', { q: text });
      if (data && Array.isArray(data.recipes)) {
        const formatted = convertFormattedRecipe(data.recipes, theme);
        setMenus(formatted);
      }
    } catch (error) {
      console.error('Failed to load recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedBounce = (text: string) => {
    if (bounceTimeout.current) clearTimeout(bounceTimeout.current);
    bounceTimeout.current = setTimeout(() => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.03,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
      ]).start();
      fetchSearch(text);
    }, 300) as unknown as number;
    setSearchText(text);
  };

  React.useEffect(() => {
    return () => {
      if (bounceTimeout.current) clearTimeout(bounceTimeout.current);
    };
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiClient('/', { limit: 50 });
        const recipes = data.recipes.map((r: any) => convertFormattedRecipe([r], theme)[0]);
        const cozy = recipes.find((r: any) => r.cuisine === 'Italian' && r.mealType?.includes('Dinner')) || recipes[0];
        const energize = recipes.find((r: any) => r.mealType?.includes('Breakfast') && r.cuisine === 'Smoothie') || recipes[1];
        const comfort = recipes.find((r: any) => r.cuisine === 'Asian' && r.mealType?.includes('Dinner')) || recipes[2];
        setMoodRecipes([cozy, energize, comfort]);
        const initial = recipes.slice(0, 6);
        setMenus(initial);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [theme]);

  const moodCards = [
    { title: 'Feeling Cozy?', subtitle: 'Warm up with Italian comfort', recipe: moodRecipes[0] },
    { title: 'Need Energy?', subtitle: 'Fuel your day right', recipe: moodRecipes[1] },
    { title: 'Craving Comfort?', subtitle: 'Satisfy with bold flavors', recipe: moodRecipes[2] },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={styles.container}>
        <Animated.View style={[styles.searchBarWrapper, { transform: [{ scale: scaleAnim }] }]}>
          <View style={[styles.searchBar, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search recipes"
              placeholderTextColor={theme.colors.textHint}
              value={searchText}
              onChangeText={(text) => debouncedBounce(text)}
            />
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="filter" size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {
          !searchText && (
            <View>
              <TitleSection title='For Your Mood' buttonTitle='See All' paddingHorizontal={0} onPress={() => { }} />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.moodScroll}
              >
                {moodRecipes.length > 0 ? moodCards.map((card, index) => (
                  <View
                    key={index}
                    style={styles.moodCard}
                  >
                    <View style={styles.moodImageContainer}>
                      <View style={[styles.moodImageOverlay, { backgroundColor: card.recipe?.color || theme.colors.primary }]} />
                      <Text style={{
                        ...styles.moodTitle,
                        color: theme.colors.text
                      }}>{card.title}</Text>
                      <Text style={styles.moodSubtitle}>{card.subtitle}</Text>
                      <Text style={styles.moodRecipe}>{card.recipe?.name}</Text>
                    </View>
                  </View>
                )) : Array.from({ length: 3 }).map((_, i) => (
                  <View key={i} style={[styles.moodCard, { backgroundColor: theme.colors.surface }]}>
                    <View style={styles.moodImageContainer}>
                      <View style={[styles.moodImageOverlay, { backgroundColor: `${theme.colors.primary}20` }]} />
                      <Text style={[{
                        ...styles.moodTitle,
                        color: theme.colors.text
                      }, { color: theme.colors.textHint }]}>Loading...</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          )
        }

        <TitleSection title='Popular Recipes' buttonTitle='See All' paddingHorizontal={0} onPress={() => { }} />
        <ScrollView style={{ minHeight: 300 }}>
          {loading ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} cardWidth={cardWidth} />
              ))}
            </View>
          ) : menus.length > 0 ? (
            <Items entries={menus} isLoading={false} cardWidth={cardWidth} />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color={theme.colors.textHint} />
              <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
                No recipes found
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: 20,
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchBarWrapper: {
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    marginLeft: 10,
    padding: 5,
  },
  moodScroll: {
    height: 150,
    marginBottom: 28,
  },
  moodCard: {
    width: 200,
    borderRadius: 20,
    marginRight: 16,
    overflow: 'hidden',
  },
  moodImageContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  moodImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.85,
  },
  moodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  moodSubtitle: {
    fontSize: 13,
    opacity: 0.9,
    marginBottom: 8,
  },
  moodRecipe: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 12,
    fontFamily: 'Inter_400Regular',
  },
});

export default Search;
