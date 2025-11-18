import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity, ScrollView } from 'react-native';

const Index = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const savedCount = 3;

  const lunchMenus = [
    { name: 'Grilled Salmon Bowl', image: "https://vjcooks.com/wp-content/uploads/2025/05/VJcooks_GrilledHoneySoySalmonBowls_2.jpg", description: 'Fresh salmon with quinoa and greens.', color: '#FFE0E6', saved: true },
    { name: 'Chicken Teriyaki', image: 'https://www.recipetineats.com/tachyon/2014/07/Teriyaki-Chicken-1.jpg?resize=680%2C936&zoom=0.95', description: 'Tender chicken glazed in sweet teriyaki sauce.', color: '#E0F0FF', saved: true },
    { name: 'Vegetable Stir Fry', image: 'https://www.recipetineats.com/tachyon/2020/01/Vegetable-Stir-Fry_9.jpg?resize=900%2C1260&zoom=0.72', description: 'Colorful veggies in a light soy-ginger sauce.', color: '#E6F9E0', saved: false },
    { name: 'Beef Tacos', image: 'https://www.recipetineats.com/tachyon/2018/11/Beef-Tacos_2.jpg?resize=900%2C1125&zoom=0.72', description: 'Spiced beef with fresh salsa and avocado.', color: '#FFF0E0', saved: true },
  ];

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.headerTitle}>
            Meal Plan
          </Text>
          <AntDesign name="fire" size={22} color="#FF6B35" />
        </View>

        <View style={styles.saveIconContainer}>
          <Ionicons name="bookmark" size={24} color="#2D2D2D" />
          {savedCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{savedCount}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.mainCard}>
        <View style={styles.cardContent}>
          <View style={styles.badgeHighlight}>
            <Text style={styles.badgeTextSmall}>✨ Discover More</Text>
          </View>
          <Text style={styles.cardTitle}>Explore Tasty Recipes</Text>
          <Text style={styles.cardSubtitle}>
            Discover delicious meals crafted just for you.
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              pressed && { opacity: 0.9 },
            ]}
          >
            <Text style={styles.actionButtonText}>Explore Recipes</Text>
          </Pressable>
        </View>
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.freepik.com/512/9173/9173213.png?ga=GA1.1.887243274.1762007492',
            }}
            style={styles.chefImage}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Lunch or Dinner</Text>
        <TouchableOpacity onPress={() => console.log('See All pressed')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuList}>
        {lunchMenus.map((item, index) => (
          <View key={index} style={[styles.menuCard, { backgroundColor: item.color }]}>
            <Image
              source={{ uri: item.image }}
              style={styles.menuImage}
              resizeMode="cover"
            />
            <View style={styles.menuContent}>
              <View style={styles.menuActions}>
                <Pressable>
                  <Ionicons
                    name={item.saved ? 'heart' : 'heart-outline'}
                    color={item.saved ? '#FF6B35' : '#888888'}
                    size={22}
                  />
                </Pressable>
                <Pressable style={styles.addButton}>
                  <Ionicons name="add" color="#2D2D2D" size={18} />
                </Pressable>
              </View>
              <Text style={styles.menuTitle}>{item.name}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 28,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Inter_700Bold',
    color: '#222222',
  },
  saveIconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
  },
  mainCard: {
    backgroundColor: '#FFD166',
    borderRadius: 24,
    marginHorizontal: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    marginRight: 16,
  },
  badgeHighlight: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF9E44',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeTextSmall: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
    marginTop: 8,
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#EF476F',
    paddingVertical: 13,
    paddingHorizontal: 28,
    borderRadius: 30,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
  imageWrapper: {
    alignItems: 'flex-end',
  },
  chefImage: {
    width: 100,
    height: 100,
    borderRadius: 24,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    marginVertical: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    color: '#222222',
  },
  seeAllText: {
    fontSize: 14,
    color: '#EF476F',
    fontFamily: 'Inter_600SemiBold',
  },
  menuList: {
    paddingHorizontal: 20,
  },
  menuCard: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  menuImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
    justifyContent: 'center',
  },
  menuActions: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    gap: 10,
  },
  addButton: {
    backgroundColor: '#FFFFFF',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 17,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: '#555555',
  },
});

export default Index;
