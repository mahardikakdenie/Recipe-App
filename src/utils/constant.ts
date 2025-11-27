import Constants from 'expo-constants';
import { Theme } from '../context/Theme/ThemeContext';

export const API_BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl as string;
export const API_BASE_RESTAURANT_URL= Constants?.expoConfig?.extra?.apiBaseRestaurantUrl as string;

export const convertFormattedRecipe = (datas: any[], theme: Theme) => {
    return datas.map((item: any) => ({
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
};

export const convertFormattedObject = (item: any, theme: Theme) => ({
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
});
