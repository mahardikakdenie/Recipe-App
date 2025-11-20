import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground, useWindowDimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const Journal = () => {
  const journalEntries = [
    {
      id: 1,
      mealType: 'Breakfast',
      recipe: {
        id: 101,
        name: 'Avocado Toast with Egg',
        image: 'https://cdn.dummyjson.com/recipe-images/15.webp',
        time: '15 min',
        rating: 4.7,
      },
      date: 'Today, 08:30 AM',
    },
    {
      id: 2,
      mealType: 'Lunch',
      recipe: {
        id: 102,
        name: 'Grilled Chicken Bowl',
        image: 'https://cdn.dummyjson.com/recipe-images/22.webp',
        time: '25 min',
        rating: 4.5,
      },
      date: 'Today, 01:15 PM',
    },
    {
      id: 3,
      mealType: 'Lunch',
      recipe: {
        id: 102,
        name: 'Grilled Chicken Bowl',
        image: 'https://cdn.dummyjson.com/recipe-images/23.webp',
        time: '25 min',
        rating: 4.5,
      },
      date: 'Today, 01:15 PM',
    },
    {
      id: 4,
      mealType: 'Lunch',
      recipe: {
        id: 102,
        name: 'Grilled Chicken Bowl',
        image: 'https://cdn.dummyjson.com/recipe-images/24.webp',
        time: '25 min',
        rating: 4.5,
      },
      date: 'Today, 01:15 PM',
    },
  ];

  const { width } = useWindowDimensions();
  const cardWidth = width * 0.44; // 90% layar

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.profileSection}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={20} color="#666" />
              </View>
              <View>
                <Text style={styles.greeting}>Hello</Text>
                <Text style={styles.name}>Tahira</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#2D2D2D" />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>My Food Journal</Text>
          <Text style={styles.subtitle}>Track what you eat and cook every day</Text>

          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 10,
          }}>
            {
              journalEntries.map((entry) => (
                <View key={entry.id} style={{
                  position: "relative"
                }}>
                  <ImageBackground
                    source={{ uri: entry.recipe.image }}
                    style={{ width: cardWidth, height: cardWidth, borderRadius: 16 }}
                    imageStyle={{ borderRadius: 16 }}
                  >
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.6)']}
                      style={styles.overlay}
                    />
                    <View style={styles.cardContent}>
                      <Text style={styles.cardTitle} numberOfLines={2}>
                        {entry.recipe.name}
                      </Text>
                      <View style={styles.cardMeta}>
                        <Ionicons name="time-outline" size={14} color="#FFF" />
                        <Text style={styles.cardMetaText}>{entry.recipe.time}</Text>
                        <Ionicons name="star-outline" size={14} color="#FFF" />
                        <Text style={styles.cardMetaText}>{entry.recipe.rating}</Text>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              ))
            }
          </View>

          <Text style={styles.sectionTitle}>Learn & Explore</Text>

          <View style={styles.ctaGrid}>
            <TouchableOpacity style={[styles.ctaCard, { backgroundColor: '#E6F4FE' }]}>
              <View style={styles.ctaIconCircle}>
                <Ionicons name="information-circle" size={24} color="#1E88E5" />
              </View>
              <Text style={styles.ctaTitle}>What is Protein?</Text>
              <Text style={styles.ctaSubtitle}>Understand why it fuels your body</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.ctaCard, { backgroundColor: '#FFF0F5' }]}>
              <View style={styles.ctaIconCircle}>
                <Ionicons name="fast-food" size={24} color="#E91E63" />
              </View>
              <Text style={styles.ctaTitle}>High-Protein Recipes</Text>
              <Text style={styles.ctaSubtitle}>Delicious meals rich in protein</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.ctaCard, { backgroundColor: '#F1F8E9' }]}>
              <View style={styles.ctaIconCircle}>
                <Ionicons name="bar-chart" size={24} color="#7CB342" />
              </View>
              <Text style={styles.ctaTitle}>Track Your Intake</Text>
              <Text style={styles.ctaSubtitle}>See how much youre getting daily</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Journal;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: '#777',
    fontFamily: 'Inter_400Regular',
  },
  name: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#222',
  },
  iconButton: {
    padding: 6,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Inter_700Bold',
    color: '#222',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    marginBottom: 28,
  },
  entryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    flexDirection: 'row',
    gap: 14,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
  },
  mealTag: {
    backgroundColor: '#FFD166',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    alignSelf: 'flex-start',
  },
  mealTagText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#1A1A1A',
  },
  entryContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryDate: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#888',
    marginBottom: 4,
  },
  recipeName: {
    fontSize: 17,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
    marginBottom: 6,
    maxWidth: '70%',
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#666',
  },
  entryImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: '#222',
    marginVertical: 24,
    marginHorizontal: 4,
  },
  ctaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  ctaCard: {
    width: '48%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  ctaIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  ctaTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 6,
  },
  ctaSubtitle: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    borderRadius: 16,
  },

  cardContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },

  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
    marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  cardMetaText: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: '#FFFFFF',
    opacity: 0.9,
  },
});
