import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, useWindowDimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const ChefPage = () => {
    const { width } = useWindowDimensions();
    const isTablet = width >= 768;
    const cardWidth = isTablet ? (width - 60) / 2 : width - 40;

    const chefs = [
        {
            id: 1,
            name: 'Marco Rossi',
            specialty: 'Italian Cuisine',
            rating: 4.9,
            recipes: 42,
            image: 'https://cdn.dummyjson.com/recipe-images/1.webp',
        },
        {
            id: 2,
            name: 'Aisha Tan',
            specialty: 'Asian Fusion',
            rating: 4.8,
            recipes: 36,
            image: 'https://cdn.dummyjson.com/recipe-images/15.webp',
        },
        {
            id: 3,
            name: 'James Carter',
            specialty: 'Grill & BBQ',
            rating: 4.7,
            recipes: 28,
            image: 'https://cdn.dummyjson.com/recipe-images/22.webp',
        },
        {
            id: 4,
            name: 'Lina Morales',
            specialty: 'Vegan Delights',
            rating: 4.9,
            recipes: 51,
            image: 'https://cdn.dummyjson.com/recipe-images/33.webp',
        },
    ];

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>Master Chefs</Text>
                    <Text style={styles.subtitle}>Learn from the best culinary experts</Text>

                    <View style={styles.grid}>
                        {chefs.map((chef) => (
                            <TouchableOpacity key={chef.id} style={[styles.card, { width: cardWidth }]}>
                                <View style={styles.imageContainer}>
                                    <Image source={{ uri: chef.image }} style={styles.chefImage} />
                                    <View style={styles.chefIcon}>
                                        <Ionicons name="heart-circle-sharp" size={18} color="#FFF" />
                                    </View>
                                </View>
                                <View style={styles.info}>
                                    <Text style={styles.name} numberOfLines={1}>
                                        {chef.name}
                                    </Text>
                                    <Text style={styles.specialty} numberOfLines={1}>
                                        {chef.specialty}
                                    </Text>
                                    <View style={styles.stats}>
                                        <View style={styles.rating}>
                                            <Ionicons name="star" size={14} color="#FFD700" />
                                            <Text style={styles.ratingText}>{chef.rating}</Text>
                                        </View>
                                        <Text style={styles.recipes}>{chef.recipes} recipes</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default ChefPage;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF9F0',
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 80,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Inter_700Bold',
        color: '#222',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 15,
        fontFamily: 'Inter_400Regular',
        color: '#666',
        marginBottom: 30,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
    },
    imageContainer: {
        position: 'relative',
        height: 160,
    },
    chefImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    chefIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#FF6B35',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        padding: 16,
    },
    name: {
        fontSize: 18,
        fontFamily: 'Inter_700Bold',
        color: '#222',
        marginBottom: 4,
    },
    specialty: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: '#666',
        marginBottom: 10,
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
        color: '#222',
    },
    recipes: {
        fontSize: 13,
        fontFamily: 'Inter_400Regular',
        color: '#888',
    },
});
