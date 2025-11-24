import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import apiClient from '@/src/api/client';
import { IDetailRecipe } from '@/src/types/recipe';
import { useTheme } from '@/src/context/Theme/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const RecipeDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const [recipe, setRecipe] = React.useState<IDetailRecipe | null>(null);
  const { theme } = useTheme();

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

  const handleSave = () => {};

  if (!recipe) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.headerImageContainer}>
          <View style={[styles.skeleton, { width: '100%', height: 320, borderRadius: 0 }]} />
          <View style={[styles.skeleton, styles.skeletonTitle]} />
        </View>

        <View style={styles.infoCardContainer}>
          {[...Array(4)].map((_, i) => (
            <View
              key={i}
              style={[styles.skeleton, styles.skeletonInfoCard]}
            />
          ))}
        </View>

        <View style={styles.section}>
          <View style={[styles.skeleton, styles.skeletonSectionTitle]} />
          <View style={[styles.skeleton, styles.skeletonDescription]} />
          <View style={[styles.skeleton, styles.skeletonDescription]} />
        </View>

        <View style={styles.section}>
          <View style={[styles.skeleton, styles.skeletonSectionTitle]} />
          {[...Array(6)].map((_, i) => (
            <View key={i} style={[styles.skeleton, styles.skeletonIngredient]} />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <View style={[styles.skeleton, styles.skeletonButton]} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerImageContainer}>
          <Image
            source={{ uri: recipe.image }}
            style={styles.headerImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.2)', 'transparent', theme.colors.background]}
            style={styles.overlay}
          />
          <View style={styles.headerTopBar}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.iconButton, { backgroundColor: 'rgba(255,255,255,0.15)' }]}
            >
              <AntDesign name="arrow-left" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              style={[styles.iconButton, { backgroundColor: 'rgba(255,255,255,0.15)' }]}
            >
              <Ionicons name="heart-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerContent}>
            <Text style={[styles.recipeTitle, { color: theme.colors.text }]}>
              {recipe.name}
            </Text>
          </View>
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
            <View
              key={index}
              style={[
                styles.ingredientItem,
                {
                  backgroundColor: theme.colors.surface,
                  marginBottom: 10,
                },
              ]}
            >
              <View style={[styles.ingredientIcon, { backgroundColor: theme.colors.primary + '20' }]}>
                <AntDesign name="bars" size={16} color={theme.colors.primary} />
              </View>
              <Text style={[styles.ingredientName, { color: theme.colors.text }]}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.watchButton, { backgroundColor: theme.colors.primary }]}
            activeOpacity={0.85}
          >
            <AntDesign name="play-circle" size={20} color="#fff" />
            <Text style={styles.watchButtonText}>Watch Video</Text>
          </TouchableOpacity>
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
  headerImageContainer: {
    height: 320,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerTopBar: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
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
    bottom: 24,
    left: 20,
    right: 20,
  },
  recipeTitle: {
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 32,
    fontFamily: 'sans-serif-medium',
  },
  infoCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginTop: -24,
    marginBottom: 24,
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
    fontWeight: '500',
    fontFamily: 'sans-serif-medium',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    fontFamily: 'sans-serif-medium',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'sans-serif',
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
    fontFamily: 'sans-serif',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 12,
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 20,
    gap: 10,
  },
  watchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'sans-serif-medium',
  },

  // Skeleton styles
  skeleton: {
    backgroundColor: '#00000020',
  },
  skeletonTitle: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    height: 32,
    borderRadius: 6,
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
  skeletonButton: {
    width: 200,
    height: 50,
    borderRadius: 20,
  },
});
