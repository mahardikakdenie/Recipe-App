// app/chef.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { useTheme } from '@/src/context/Theme/ThemeContext';
import { useNavigation } from 'expo-router';

const ChefPage = () => {
    const { theme } = useTheme();
    const { width } = useWindowDimensions();
    const cardWidth = (width - 60) / 2;
    const navigation = useNavigation();


    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const restaurants = [
        {
            id: 1,
            name: 'La Trattoria',
            cuisine: 'Italian',
            rating: 4.8,
            image: 'https://cdn.dummyjson.com/recipe-images/1.webp',
        },
        {
            id: 2,
            name: 'Sakura Sushi',
            cuisine: 'Japanese',
            rating: 4.9,
            image: 'https://cdn.dummyjson.com/recipe-images/16.webp',
        },
        {
            id: 3,
            name: 'Spice Garden',
            cuisine: 'Indian',
            rating: 4.7,
            image: 'https://cdn.dummyjson.com/recipe-images/11.webp',
        },
        {
            id: 4,
            name: 'Green Leaf Bistro',
            cuisine: 'Mediterranean',
            rating: 4.6,
            image: 'https://cdn.dummyjson.com/recipe-images/6.webp',
        },
        {
            id: 5,
            name: 'El Mariachi',
            cuisine: 'Mexican',
            rating: 4.8,
            image: 'https://cdn.dummyjson.com/recipe-images/5.webp',
        },
        {
            id: 6,
            name: 'Seoul Kitchen',
            cuisine: 'Korean',
            rating: 4.9,
            image: 'https://cdn.dummyjson.com/recipe-images/18.webp',
        },
    ];

    return (
        <ScrollView
            contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}
            showsVerticalScrollIndicator={false}
        >
            <Text style={[styles.title, { color: theme.colors.text, fontFamily: theme.fonts.bold }]}>
                Popular Restaurants
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>
                Discover top-rated dining spots near you
            </Text>

            <View style={styles.grid}>
                {restaurants.map((restaurant) => (
                    <TouchableOpacity key={restaurant.id} style={[styles.card, { width: cardWidth, backgroundColor: theme.colors.surface }]}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
                            <View style={[styles.ratingBadge, { backgroundColor: theme.colors.primary }]}>
                                <Ionicons name="star" size={12} color="#FFFFFF" />
                                <Text style={[styles.ratingText, { color: '#FFFFFF' }]}>{restaurant.rating}</Text>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <Text style={[styles.name, { color: theme.colors.text, fontFamily: theme.fonts.bold }]} numberOfLines={1}>
                                {restaurant.name}
                            </Text>
                            <Text style={[styles.cuisine, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]} numberOfLines={1}>
                                {restaurant.cuisine}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 80,
    },
    title: {
        fontSize: 28,
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 15,
        marginBottom: 24,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 20,
    },
    card: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
        height: 140,
    },
    restaurantImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    ratingBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    ratingText: {
        fontSize: 12,
        fontFamily: 'Inter_600SemiBold',
    },
    info: {
        padding: 14,
    },
    name: {
        fontSize: 16,
        marginBottom: 4,
    },
    cuisine: {
        fontSize: 13,
    },
});

export default ChefPage;
