// app/search.tsx
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Image, View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, useWindowDimensions } from 'react-native';
import { useTheme } from '@/src/context/Theme/ThemeContext';
import TitleSection from '@/src/components/ui/TitleSection';
import apiClient from '@/src/api/client';
import { IRECIPE } from '@/src/types/recipe';
import Items from '@/src/components/ui/Items';
import SkeletonCard from '@/src/components/loading/skeleton';

const Search = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [menus, setMenus] = React.useState<IRECIPE[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [categoryLoading, setCategoryLoading] = React.useState(true);

  const { width } = useWindowDimensions();
  const cardWidth = width * 0.44;

  const [categories, setCategories] = React.useState([
    { label: 'Salad', icon: 'https://vjcooks.com/wp-content/uploads/2022/05/VJcooks_KidsPastaSalad_8-360x480.jpg' },
    { label: 'Pizza', icon: 'https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg' },
    { label: 'Burger', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLmLX7X-iZavaUWZaZLzcnvugr3uMWD5OmQLDgY1OfMcQ5c7nv65fDG5PVdA4OODE4Y-qD_IGFZv08gliJuV5PsaunOov-og8pSiAx0VOzAg' },
    { label: 'Steak', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_LmXCg5oPfWo_URI2uI5ChWCogQKhCxuWMZvFX_SiOA1BDeP-yWSqAp8lZx30VuYWvSJWZJk4XH4sp7hY23C19vZu6tk7CEtjlTeLHhNk&s=10' },
    { label: 'Sea Food', icon: 'https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/77ef47b2-c289-46be-8660-74f4c93a8676_c76e6ac4-da09-422f-bc5b-33d378849430_Go-Biz_20190323_005453.jpeg?auto=format' },
    { label: 'Dessert', icon: 'https://img.freepik.com/free-photo/chocolate-cake-isolated-white-background_144627-20941.jpg' },
    { label: 'Smoothie', icon: 'https://img.freepik.com/free-photo/glass-smoothie-with-fruits-strawberries-blueberries_144627-20945.jpg' },
  ]);

  const getDataTags = async () => {
    try {
      setCategoryLoading(true);
      const data: string[] = await apiClient('/tags');
      const allTags: string[] = data.splice(10, 17);
      const uniqueTags = [...new Set(allTags)].slice(0, 7);

      setCategories((prev) =>
        prev.map((item, index) => ({
          ...item,
          label: uniqueTags[index] ?? item.label,
        }))
      );
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    } finally {
      setCategoryLoading(false);
    }
  };

  React.useEffect(() => {
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
          setMenus(formatted);
        }
      } catch (error) {
        console.error('Failed to load recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [theme]);


  React.useEffect(() => {
    getDataTags();
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={styles.container}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search recipes"
            placeholderTextColor={theme.colors.textHint}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>


        <TitleSection title='Recipe' buttonTitle='See All' paddingHorizontal={0} onPress={() => { }} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          { categoryLoading ? <SkeletonCard cardWidth={80} />  : categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryItem,
                {
                  backgroundColor: activeCategory === index ? theme.colors.primaryLight : theme.colors.surface,
                  borderColor: activeCategory === index ? theme.colors.primary : theme.colors.border,
                },
              ]}
              onPress={() => setActiveCategory(index)}
            >
              <Image source={{ uri: item.icon }} style={styles.categoryIcon} />
              <Text
                style={[
                  styles.categoryLabel,
                  {
                    color: activeCategory === index ? '#ffff' : theme.colors.textSecondary,
                    fontFamily: activeCategory === index ? theme.fonts.bold : theme.fonts.regular,
                  },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView>
          <Items entries={menus} isLoading={loading} cardWidth={cardWidth} />
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
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
  categoryScroll: {
    marginBottom: 24,
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 30,
    marginHorizontal: 6,
    borderRadius: 14,
    minWidth: 88,
    // height: 88,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  recipeCard: {
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  recipeInfo: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    marginBottom: 5,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  timeText: {
    fontSize: 13,
  },
  recipeImageContainer: {
    position: 'relative',
  },
  recipeImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  heartButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    borderRadius: 10,
    padding: 2,
  },
  seeRecipeButtonFull: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
  },
  seeRecipeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  chatIconWrapper: {
    borderRadius: 10,
    padding: 4,
  },
});

export default Search;
