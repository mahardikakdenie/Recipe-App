// HomeScreen.tsx
import SkeletonCard from '@/src/components/loading/skeleton';
import * as React from 'react';
import { Text, View, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import useHomeHooks from './hooks/useHome.hook';
import SummaryCards from '@/src/components/ui/summaryCard/Card';
import TitleSection from '@/src/components/ui/TitleSection';
import styles from './styles/home.styles';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { IRECIPE } from '@/src/types/recipe';
import Items from '@/src/components/ui/Items';

type HomeScreenProps = object;

const HomeScreen = (props: HomeScreenProps) => {
  const { lunchMenus, theme, loading, loadingMore, hasMore, loadMore, cardWidth } = useHomeHooks();

  return (
    <ScrollView
      style={[styles.pageContainer, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.scrollContent}
      onScroll={({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const isNearBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;
        if (isNearBottom && !loadingMore && hasMore) {
          loadMore();
        }
      }}
      scrollEventThrottle={400}
    >
      <SummaryCards />

      <TitleSection title='Recommendation' buttonTitle='See All' onPress={() => { }} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recommendationsScroll}
      >
        {!loading && lunchMenus.length > 0 ? (
          lunchMenus.slice(0, 5).map((entry: IRECIPE) => (
            <TouchableOpacity key={entry.id} style={styles.recommendationCard}>
              <ImageBackground
                source={{ uri: entry.image }}
                style={styles.recommendationImage}
                imageStyle={{ borderRadius: 16 }}
              >
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.6)']}
                  style={styles.recommendationOverlay}
                />
                <View style={styles.recommendationContent}>
                  <Text
                    style={[
                      styles.recommendationTitle,
                      { color: '#FFFFFF', fontFamily: theme.fonts.bold },
                    ]}
                    numberOfLines={1}
                  >
                    {entry.name}
                  </Text>
                  <View style={styles.recommendationMeta}>
                    <Ionicons name="time-outline" size={12} color="#FFF" />
                    <Text
                      style={[
                        styles.recommendationText,
                        { color: '#FFFFFF', fontFamily: theme.fonts.regular },
                      ]}
                    >
                      {entry.prepTimeMinutes + (typeof entry.cookTimeMinutes === 'number' ? entry.cookTimeMinutes : 0)} min
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))
        ) : (
          Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} cardWidth={cardWidth} />
          ))
        )}
      </ScrollView>

      <TitleSection title='Lunch or Dinner' buttonTitle='See All' onPress={() => { }} />

      <View style={styles.menuList}>
        <Items isLoading={loading} entries={lunchMenus} cardWidth={cardWidth} />
      </View>

      {loadingMore && (
        <View style={styles.loadingMore}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}
    </ScrollView>
  );
};

export default HomeScreen;
