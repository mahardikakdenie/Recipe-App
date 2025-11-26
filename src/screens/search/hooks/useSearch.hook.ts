import apiClient from "@/src/api/client";
import { useTheme } from "@/src/context/Theme/ThemeContext";
import { IRECIPE } from "@/src/types/recipe";
import { convertFormattedRecipe } from "@/src/utils/constant";
import React from "react";
import { Animated, useWindowDimensions } from "react-native";

const useSearchHooks = () => {
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

    return {
        theme,
        menus,
        setMenus,
        loading,
        setLoading,
        searchText,
        setSearchText,
        cardWidth,
        moodRecipes,
        setMoodRecipes,
        scaleAnim,
        debouncedBounce,
        moodCards,
    };
};

export default useSearchHooks;
