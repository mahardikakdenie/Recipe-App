import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RecipeScreen = () => {
  const categories = [
    'All',
    'Salad',
    'Pizza',
    'Burger',
    'Steak',
    'Sea Food',
    'Dessert',
    'Smoothie',
  ];

  const recipes = [
    {
      id: 1,
      title: 'Grilled Salmon Bowl',
      time: '20 mins',
      image: 'https://vjcooks.com/wp-content/uploads/2025/05/VJcooks_GrilledHoneySoySalmonBowls_2.jpg',
      saved: true,
    },
    {
      id: 2,
      title: 'Margherita Pizza',
      time: '25 mins',
      image: 'https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg',
      saved: false,
    },
    {
      id: 3,
      title: 'Veggie Stir Fry',
      time: '15 mins',
      image: 'https://www.recipetineats.com/tachyon/2020/01/Vegetable-Stir-Fry_9.jpg?resize=600%2C840',
      saved: true,
    },
    {
      id: 4,
      title: 'Beef Tacos',
      time: '30 mins',
      image: 'https://www.recipetineats.com/tachyon/2018/11/Beef-Tacos_2.jpg?resize=600%2C750',
      saved: false,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.headerTitle}>Meals</Text>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          placeholderTextColor="#888"
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              index === 0 && styles.categoryButtonActive,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                index === 0 && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.recipeList}>
        {recipes.map((recipe) => (
          <View key={recipe.id} style={styles.recipeCard}>
            <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeTitle}>{recipe.title}</Text>
              <View style={styles.timeRow}>
                <Ionicons name="time" size={14} color="#666" />
                <Text style={styles.timeText}>{recipe.time}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.saveButton}>
              <Ionicons
                name={recipe.saved ? 'heart' : 'heart-outline'}
                size={20}
                color={recipe.saved ? '#FF6B35' : '#888'}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.seeAllButton}>
        <Text style={styles.seeAllText}>See All Recipes</Text>
        <Ionicons name="arrow-forward" size={18} color="#EF476F" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#222',
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  categoryScroll: {
    marginBottom: 24,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#FFF',
  },
  categoryButtonActive: {
    backgroundColor: '#FFD166',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#555',
  },
  categoryTextActive: {
    color: '#1A1A1A',
  },
  recipeList: {
    marginBottom: 24,
  },
  recipeCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recipeImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#666',
  },
  saveButton: {
    padding: 6,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFF0E6',
    borderRadius: 16,
  },
  seeAllText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#EF476F',
  },
});
