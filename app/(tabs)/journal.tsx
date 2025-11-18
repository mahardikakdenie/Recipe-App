import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Image, View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

type JournalProps = object;

const Journal = (props: JournalProps) => {
  const recipes = [
    { id: 1, title: 'Aegean Breeze Salad', time: '20 minutes', image: 'https://vjcooks.com/wp-content/uploads/2022/05/VJcooks_KidsPastaSalad_8-360x480.jpg' },
    { id: 2, title: 'Margherita Pizza', time: '25 minutes', image: 'https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg' },
    { id: 3, title: 'Spicy Burger', time: '15 minutes', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLmLX7X-iZavaUWZaZLzcnvugr3uMWD5OmQLDgY1OfMcQ5c7nv65fDG5PVdA4OODE4Y-qD_IGFZv08gliJuV5PsaunOov-og8pSiAx0VOzAg' },
    { id: 4, title: 'Grilled Steak', time: '30 minutes', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_LmXCg5oPfWo_URI2uI5ChWCogQKhCxuWMZvFX_SiOA1BDeP-yWSqAp8lZx30VuYWvSJWZJk4XH4sp7hY23C19vZu6tk7CEtjlTeLHhNk&s=10' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image
              style={styles.avatar}
              source={{ uri: 'https://cdn-icons-png.freepik.com/512/9173/9173213.png?ga=GA1.1.887243274.1762007492' }}
              resizeMode="cover"
            />
            <View>
              <Text style={styles.greeting}>Hello</Text>
              <Text style={styles.name}>Emily Ava</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Explore New Recipes</Text>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search recipes"
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {[
            { label: 'Salad', icon: 'https://vjcooks.com/wp-content/uploads/2022/05/VJcooks_KidsPastaSalad_8-360x480.jpg' },
            { label: 'Pizza', icon: 'https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg' },
            { label: 'Burger', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLmLX7X-iZavaUWZaZLzcnvugr3uMWD5OmQLDgY1OfMcQ5c7nv65fDG5PVdA4OODE4Y-qD_IGFZv08gliJuV5PsaunOov-og8pSiAx0VOzAg' },
            { label: 'Steak', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_LmXCg5oPfWo_URI2uI5ChWCogQKhCxuWMZvFX_SiOA1BDeP-yWSqAp8lZx30VuYWvSJWZJk4XH4sp7hY23C19vZu6tk7CEtjlTeLHhNk&s=10' },
            { label: 'Sea Food', icon: 'https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/77ef47b2-c289-46be-8660-74f4c93a8676_c76e6ac4-da09-422f-bc5b-33d378849430_Go-Biz_20190323_005453.jpeg?auto=format' },
            { label: 'Dessert', icon: 'https://img.freepik.com/free-photo/chocolate-cake-isolated-white-background_144627-20941.jpg' },
            { label: 'Smoothie', icon: 'https://img.freepik.com/free-photo/glass-smoothie-with-fruits-strawberries-blueberries_144627-20945.jpg' },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.categoryItem}>
              <Image source={{ uri: item.icon }} style={styles.categoryIcon} />
              <Text style={styles.categoryLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {recipes.map((recipe) => (
            <TouchableOpacity key={recipe.id} style={styles.recipeCard}>
              <View style={styles.recipeInfo}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <View style={styles.timeRow}>
                  <Ionicons name="time" size={16} color="#666" />
                  <Text style={styles.timeText}>{recipe.time}</Text>
                </View>
              </View>
              <View style={styles.recipeImageContainer}>
                <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
                <TouchableOpacity style={styles.heartButton}>
                  <Ionicons name="heart-outline" size={24} color="#FFF" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.seeRecipeButtonFull}>
            <Text style={styles.seeRecipeButtonText}>See Recipe</Text>
            <View style={styles.chatIconWrapper}>
              <Ionicons name="chatbubble-ellipses" size={24} color="#FFF" />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Journal;

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: 60,
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    fontSize: 12,
    color: '#888',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
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
    marginBottom: 30,
  },
  categoryItem: {
    alignItems: 'center',
    padding: 5,
    marginHorizontal: 5,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  categoryLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  recipeCard: {
    backgroundColor: '#FFF0F5',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  timeText: {
    fontSize: 13,
    color: '#666',
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
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 10,
    padding: 2,
  },
  seeRecipeButtonFull: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  seeRecipeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  chatIconWrapper: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 4,
  },
  iconButton: {
    padding: 5,
  },
});
