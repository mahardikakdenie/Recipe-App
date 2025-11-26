import * as React from 'react';
import { Animated, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles/search.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import TitleSection from '@/src/components/ui/TitleSection';
import useSearchHooks from './hooks/useSearch.hook';
import SkeletonCard from '@/src/components/loading/skeleton';
import Items from '@/src/components/ui/Items';

type SearchViewsProps = object;

const SearchViews = (props: SearchViewsProps) => {
    const {
        theme,
        menus,
        loading,
        searchText,
        cardWidth,
        moodRecipes,
        scaleAnim,
        debouncedBounce,
        moodCards,
    } = useSearchHooks();
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={styles.container}>
        <Animated.View style={[styles.searchBarWrapper, { transform: [{ scale: scaleAnim }] }]}>
          <View style={[styles.searchBar, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search recipes"
              placeholderTextColor={theme.colors.textHint}
              value={searchText}
              onChangeText={(text) => debouncedBounce(text)}
            />
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="filter" size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {
          !searchText && (
            <View>
              <TitleSection title='For Your Mood' buttonTitle='See All' paddingHorizontal={0} onPress={() => { }} />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.moodScroll}
              >
                {moodRecipes.length > 0 ? moodCards.map((card, index) => (
                  <View
                    key={index}
                    style={styles.moodCard}
                  >
                    <View style={styles.moodImageContainer}>
                      <View style={[styles.moodImageOverlay, { backgroundColor: card.recipe?.color || theme.colors.primary }]} />
                      <Text style={{
                        ...styles.moodTitle,
                        color: theme.colors.text
                      }}>{card.title}</Text>
                      <Text style={styles.moodSubtitle}>{card.subtitle}</Text>
                      <Text style={styles.moodRecipe}>{card.recipe?.name}</Text>
                    </View>
                  </View>
                )) : Array.from({ length: 3 }).map((_, i) => (
                  <View key={i} style={[styles.moodCard, { backgroundColor: theme.colors.surface }]}>
                    <View style={styles.moodImageContainer}>
                      <View style={[styles.moodImageOverlay, { backgroundColor: `${theme.colors.primary}20` }]} />
                      <Text style={[{
                        ...styles.moodTitle,
                        color: theme.colors.text
                      }, { color: theme.colors.textHint }]}>Loading...</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          )
        }

        <TitleSection title='Popular Recipes' buttonTitle='See All' paddingHorizontal={0} onPress={() => { }} />
        <ScrollView style={{ minHeight: 300 }}>
          {loading ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} cardWidth={cardWidth} />
              ))}
            </View>
          ) : menus.length > 0 ? (
            <Items entries={menus} isLoading={false} cardWidth={cardWidth} />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color={theme.colors.textHint} />
              <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
                No recipes found
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchViews;
