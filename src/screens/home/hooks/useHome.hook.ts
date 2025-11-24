// hooks/useHome.hook.ts
import apiClient from "@/src/api/client";
import { useTheme } from "@/src/context/Theme/ThemeContext";
import { IRECIPE } from "@/src/types/recipe";
import { convertFormattedRecipe } from "@/src/utils/constant";
import { useCallback, useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";

const useHomeHooks = () => {
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.44;
  const { theme } = useTheme();

  const [lunchMenus, setLunchMenus] = useState<IRECIPE[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;

  const fetchRecipes = useCallback(async (initial = false, currentSkip = 0) => {
    try {
      if (initial) setLoading(true);
      else setLoadingMore(true);

      const data = await apiClient('/', { skip: currentSkip, limit });
      
      if (data && Array.isArray(data.recipes)) {
        const formatted = convertFormattedRecipe(data.recipes, theme);
        
        if (initial) {
          setLunchMenus(formatted);
        } else {
          setLunchMenus(prev => [...prev, ...formatted]);
        }

        if (data.recipes.length < limit) {
          setHasMore(false);
        }
      } else {
        if (initial) setLunchMenus([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to load recipes:', error);
      if (initial) setLunchMenus([]);
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [theme]);

  useEffect(() => {
    fetchRecipes(true, 0);
  }, [fetchRecipes, theme]);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      const newSkip = skip + limit;
      setSkip(newSkip);
      fetchRecipes(false, newSkip);
    }
  };

  return {
    lunchMenus,
    loading,
    loadingMore,
    hasMore,
    loadMore,
    cardWidth,
    theme,
  };
};

export default useHomeHooks;
