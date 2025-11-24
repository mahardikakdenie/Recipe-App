// app/journal.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView, useWindowDimensions } from 'react-native';
import { useTheme } from '@/src/context/Theme/ThemeContext';
import Item from '@/src/components/ui/Item';
import { IRECIPE } from '@/src/types/recipe';

const Journal = () => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.44;

  const journalEntries: IRECIPE[] = [
    {
      id: 1,
      name: 'Avocado Toast with Egg',
      image: 'https://cdn.dummyjson.com/recipe-images/15.webp',
      rating: 4.7,
      prepTimeMinutes: 10,
      cookTimeMinutes: 15,
      servings: 2,
      cuisine: 'Breakfast',
      saved: true,
      color: theme.colors.surface,
      difficulty: 'Easy',
    },
    {
      id: 2,
      name: 'Grilled Chicken Bowl',
      image: 'https://cdn.dummyjson.com/recipe-images/22.webp',
      rating: 4.5,
      prepTimeMinutes: 15,
      cookTimeMinutes: 25,
      servings: 2,
      cuisine: 'Healthy',
      saved: false,
      color: theme.colors.surface,
      difficulty: 'Medium',
    },
    {
      id: 3,
      name: 'Mushroom Risotto',
      image: 'https://cdn.dummyjson.com/recipe-images/33.webp',
      rating: 4.8,
      prepTimeMinutes: 10,
      cookTimeMinutes: 35,
      servings: 3,
      cuisine: 'Italian',
      saved: true,
      color: theme.colors.surface,
      difficulty: 'Medium',
    },
    {
      id: 4,
      name: 'Berry Yogurt Parfait',
      image: 'https://cdn.dummyjson.com/recipe-images/42.webp',
      rating: 4.6,
      prepTimeMinutes: 5,
      cookTimeMinutes: 0,
      servings: 1,
      cuisine: 'Snack',
      saved: false,
      color: theme.colors.surface,
      difficulty: 'Easy',
    },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: theme.colors.text, fontFamily: theme.fonts.bold }]}>
          My Food Journal
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>
          Track what you eat and cook every day
        </Text>

        <View style={styles.gridContainer}>
          {journalEntries.map((entry) => (
            <Item key={entry.id} entry={entry} cardWidth={cardWidth} />
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.fonts.bold }]}>
          Learn & Explore
        </Text>

        <View style={styles.ctaGrid}>
          <TouchableOpacity style={[styles.ctaCard, { backgroundColor: theme.colors.surface }]}>
            <View style={[styles.ctaIconCircle, { backgroundColor: '#FFFFFF' }]}>
              <Ionicons name="information-circle" size={24} color={theme.colors.primary} />
            </View>
            <Text style={[styles.ctaTitle, { color: theme.colors.text, fontFamily: theme.fonts.bold }]}>
              What is Protein?
            </Text>
            <Text style={[styles.ctaSubtitle, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>
              Understand why it fuels your body
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.ctaCard, { backgroundColor: theme.colors.surface }]}>
            <View style={[styles.ctaIconCircle, { backgroundColor: '#FFFFFF' }]}>
              <Ionicons name="fast-food" size={24} color={theme.colors.primary} />
            </View>
            <Text style={[styles.ctaTitle, { color: theme.colors.text, fontFamily: theme.fonts.bold }]}>
              High-Protein Recipes
            </Text>
            <Text style={[styles.ctaSubtitle, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>
              Delicious meals rich in protein
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.ctaCard, { backgroundColor: theme.colors.surface }]}>
            <View style={[styles.ctaIconCircle, { backgroundColor: '#FFFFFF' }]}>
              <Ionicons name="bar-chart" size={24} color={theme.colors.primary} />
            </View>
            <Text style={[styles.ctaTitle, { color: theme.colors.text, fontFamily: theme.fonts.bold }]}>
              Track Your Intake
            </Text>
            <Text style={[styles.ctaSubtitle, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>
              See how much youre getting daily
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 200,
  },
  title: {
    fontSize: 26,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 28,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 20,
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
  },
  ctaIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  ctaTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 6,
  },
  ctaSubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default Journal;
