// app/recipe/[id]/index.tsx
import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  // Animated,
  Dimensions,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import apiClient from '@/src/api/client';
import { IDetailRecipe } from '@/src/types/recipe';
import { useTheme } from '@/src/context/Theme/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';

// ✅ Aktifkan LayoutAnimation untuk Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');

const RecipeDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const [recipe, setRecipe] = React.useState<IDetailRecipe | null>(null);
  const { theme } = useTheme();
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  React.useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const resp = await apiClient(`/${id}`);
        if (resp) {
          setRecipe(resp);
        }
      } catch (error) {
        console.log('Error fetching recipe:', error);
      }
    };
    fetchRecipe();
  }, [id]);

  const toggleAccordion = (index: number) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSave = () => {};

  if (!recipe) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.mediaContainer}>
          <View style={[styles.skeleton, { width, height: 320 }]} />
        </View>
        <View style={styles.infoCardContainer}>
          {[...Array(4)].map((_, i) => (
            <View key={i} style={[styles.skeleton, styles.skeletonInfoCard]} />
          ))}
        </View>
        <View style={styles.section}>
          <View style={[styles.skeleton, styles.skeletonSectionTitle]} />
          <View style={[styles.skeleton, styles.skeletonDescription]} />
        </View>
        <View style={styles.section}>
          <View style={[styles.skeleton, styles.skeletonSectionTitle]} />
          {[...Array(6)].map((_, i) => (
            <View key={i} style={[styles.skeleton, styles.skeletonIngredient]} />
          ))}
        </View>
      </SafeAreaView>
    );
  }

  const mediaItems = [
    { type: 'image', uri: recipe.image },
    { type: 'video', id: 'XdD_o3YeMXg' },
  ];

  const accordionContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas omnis blanditiis illo magni corrupti, commodi culpa hic dignissimos voluptates, possimus aliquam optio, repudiandae molestias. Sapiente, vitae architecto minima, quos facilis saepe minus ducimus accusamus, unde officia consectetur aperiam quaerat aliquam ipsa deserunt beatae reprehenderit aliquid! Molestias necessitatibus minus quis doloribus, eos voluptatibus ducimus aliquam voluptates nihil cumque a aperiam veritatis saepe earum odio aut minima repudiandae!";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mediaContainer}>
          {mediaItems.map((item, index) => (
            <View
              key={index}
              style={[
                styles.mediaItem,
                {
                  opacity: activeMediaIndex === index ? 1 : 0,
                  zIndex: activeMediaIndex === index ? 1 : 0,
                },
              ]}
            >
              {item.type === 'image' ? (
                <Image source={{ uri: item.uri }} style={styles.mediaImage} resizeMode="cover" />
              ) : (
                <View style={styles.videoWrapper}>
                  <YoutubePlayer
                    height={320}
                    width={width}
                    videoId={item.id}
                    play={false}
                    initialPlayerParams={{
                      controls: true,
                      modestbranding: true,
                      rel: false,
                      fs: false,
                    }}
                    webViewStyle={{ borderRadius: 0 }}
                  />
                </View>
              )}
            </View>
          ))}
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.65)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.overlay}
          />
          <View style={styles.headerTopBar}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.iconButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
            >
              <AntDesign name="arrow-left" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              style={[styles.iconButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
            >
              <Ionicons name="heart-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerContent}>
            <Text style={[styles.recipeTitle, { color: theme.colors.textSecondary }]}>
              {recipe.name}
            </Text>
          </View>
          <View style={styles.mediaIndicator}>
            {mediaItems.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.indicatorDot,
                  {
                    backgroundColor: activeMediaIndex === i ? theme.colors.primary : '#27262660',
                    width: activeMediaIndex === i ? 16 : 60,
                    borderRadius: activeMediaIndex === i ? 8 : 3,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setActiveMediaIndex(prev => (prev > 0 ? prev - 1 : mediaItems.length - 1))}
          >
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setActiveMediaIndex(prev => (prev < mediaItems.length - 1 ? prev + 1 : 0))}
          >
            <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoCardContainer}>
          {[
            { icon: 'clock-circle', label: `${recipe.prepTimeMinutes + (recipe.cookTimeMinutes || 0)} min` },
            { icon: null, label: recipe.difficulty || 'Medium' },
            { icon: 'fire', label: `${recipe.caloriesPerServing || 'N/A'} cal` },
            { icon: 'star', label: `${recipe.rating || '4.5'}`, color: theme.colors.primary },
          ].map((item, idx) => (
            <View
              key={idx}
              style={[styles.infoCard, { backgroundColor: theme.colors.surface }]}
            >
              {item.icon && (
                <AntDesign
                  name={item.icon as any}
                  size={14}
                  color={item.color || theme.colors.text}
                  style={styles.infoIcon}
                />
              )}
              <Text style={[styles.infoCardText, { color: theme.colors.text }]}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Description
          </Text>
          <Text style={[styles.description, { color: theme.colors.text }]}>
            {recipe.instructions?.join('\n\n') || 'No instructions available.'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Ingredients
          </Text>
          {recipe.ingredients?.map((item, index) => (
            <View key={index} style={styles.ingredientWrapper}>
              <TouchableOpacity
                style={[
                  styles.ingredientItem,
                  {
                    backgroundColor: theme.colors.surface,
                    borderBottomLeftRadius: expandedIndex === index ? 0 : 12,
                    borderBottomRightRadius: expandedIndex === index ? 0 : 12,
                  },
                ]}
                onPress={() => toggleAccordion(index)}
              >
                <View style={[styles.ingredientIcon, { backgroundColor: theme.colors.primary + '20' }]}>
                  <AntDesign name="bars" size={16} color={theme.colors.primary} />
                </View>
                <Text style={[styles.ingredientName, { color: theme.colors.text }]}>{item}</Text>
                <Ionicons
                  name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={theme.colors.textHint}
                />
              </TouchableOpacity>
              {expandedIndex === index && (
                <View
                  style={[
                    styles.accordionContent,
                    { backgroundColor: theme.colors.surface },
                  ]}
                >
                  <Text style={[styles.accordionText, { color: theme.colors.textSecondary }]}>
                    {accordionContent}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipeDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mediaContainer: {
    height: 320,
    position: 'relative',
  },
  mediaItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  videoWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 999999999,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // zIndex: 9,
  },
  headerTopBar: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 100,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    position: 'absolute',
    bottom: 28,
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  recipeTitle: {
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    fontFamily: 'Inter_700Bold',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  mediaIndicator: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    zIndex: 100,
  },
  indicatorDot: {
    height: 6,
  },
  controls: {
    position: 'absolute',
    top: 160,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 100,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 24,
    marginTop: 20,
    gap: 12,
  },
  infoCard: {
    flex: 1,
    minWidth: width / 2.4,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  infoIcon: {
    marginRight: 4,
  },
  infoCardText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter_400Regular',
    paddingHorizontal: 20,
  },
  ingredientWrapper: {
    marginBottom: 10,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  ingredientIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  ingredientName: {
    fontSize: 15,
    flex: 1,
    fontFamily: 'Inter_400Regular',
  },
  accordionContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  accordionText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
  },
  skeleton: {
    backgroundColor: '#00000020',
  },
  skeletonInfoCard: {
    flex: 1,
    minWidth: width / 2.4,
    height: 50,
    borderRadius: 14,
  },
  skeletonSectionTitle: {
    height: 24,
    width: 160,
    marginBottom: 16,
    borderRadius: 6,
  },
  skeletonDescription: {
    height: 20,
    width: '100%',
    marginBottom: 12,
    borderRadius: 6,
  },
  skeletonIngredient: {
    height: 20,
    width: '90%',
    marginBottom: 12,
    borderRadius: 6,
    marginLeft: 50,
  },
});
