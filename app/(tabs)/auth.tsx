// app/login.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/src/context/Theme/ThemeContext';
import { post } from '@/src/api/supabase';
import { saveToken, saveUser } from '@/src/utils/storage';
import { useAuth } from '@/src/context/Auth/AuthContext';
import { API_BASE_BE } from '@/src/utils/constant';

const dummyRecipes = [
  {
    id: 1,
    name: 'Classic Margherita Pizza',
    image: 'https://cdn.dummyjson.com/recipe-images/1.webp',
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    rating: 4.6,
  },
  {
    id: 3,
    name: 'Chocolate Chip Cookies',
    image: 'https://cdn.dummyjson.com/recipe-images/3.webp',
    prepTimeMinutes: 15,
    cookTimeMinutes: 10,
    rating: 4.9,
  },
  {
    id: 6,
    name: 'Quinoa Salad with Avocado',
    image: 'https://cdn.dummyjson.com/recipe-images/6.webp',
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    rating: 4.4,
  },
];

const dummyBookmarks = [
  {
    id: 2,
    name: 'Vegetarian Stir-Fry',
    image: 'https://cdn.dummyjson.com/recipe-images/2.webp',
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Chicken Alfredo Pasta',
    image: 'https://cdn.dummyjson.com/recipe-images/4.webp',
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    rating: 4.9,
  },
];

const RecipeItem = ({ item, theme }: { item: any; theme: any }) => (
  <View style={[styles.recipeCard, { backgroundColor: theme.colors.surface }]}>
    <View style={styles.recipeImageContainer}>
      <View style={[styles.recipeImagePlaceholder, { backgroundColor: theme.colors.primaryLight }]}>
        <Ionicons name="fast-food" size={24} color={theme.colors.primaryDark} />
      </View>
    </View>
    <View style={styles.recipeInfo}>
      <Text style={[styles.recipeName, { color: theme.colors.text }]} numberOfLines={1}>
        {item.name}
      </Text>
      <View style={styles.recipeMeta}>
        <Ionicons name="time-outline" size={12} color={theme.colors.textHint} />
        <Text style={[styles.metaText, { color: theme.colors.textHint }]}>
          {item.prepTimeMinutes + item.cookTimeMinutes} min
        </Text>
        <Ionicons name="star" size={12} color={theme.colors.primary} />
        <Text style={[styles.metaText, { color: theme.colors.textHint }]}>
          {item.rating}
        </Text>
      </View>
    </View>
  </View>
);

const AuthScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { user, setUser, logout } = useAuth();

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const resp = await post(`${API_BASE_BE}/api/auth/login`, {
          email,
          password,
        });
        const token = resp.data.access_token;
        const userData = resp.data.user;
        await saveToken(token);
        await saveUser(userData);
        setUser(userData);
      } else {
        Alert.alert('Verification Sent', `A verification link has been sent to ${email}.`);
        setIsLogin(true);
      }
    } catch (error: any) {
      let message = 'Authentication failed. Please try again.';
      if (error.message?.includes('Invalid credentials')) {
        message = 'Invalid email or password.';
      }
      Alert.alert(isLogin ? 'Login Failed' : 'Sign Up Failed', message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/auth');
  };

  const [activeTab, setActiveTab] = useState('recipes');
  if (user) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.profileHeader}>
          <View style={[styles.avatarContainer, { backgroundColor: theme.colors.surface }]}>
            <Ionicons name="person" size={48} color={theme.colors.text} />
          </View>
          <Text style={[styles.profileName, { color: theme.colors.text, fontFamily: theme.fonts.bold }]}>
            {user.email}
          </Text>
          <Text style={[styles.profileEmail, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>
            Member since 2024
          </Text>
        </View>

        <View style={[styles.tabContainer, { backgroundColor: theme.colors.surface }]}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'recipes' && { backgroundColor: theme.colors.primary }]}
            onPress={() => setActiveTab('recipes')}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: activeTab === 'recipes' ? '#FFFFFF' : theme.colors.textSecondary,
                  fontFamily: activeTab === 'recipes' ? theme.fonts.bold : theme.fonts.medium,
                },
              ]}
            >
              My Recipes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'bookmarks' && { backgroundColor: theme.colors.primary }]}
            onPress={() => setActiveTab('bookmarks')}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: activeTab === 'bookmarks' ? '#FFFFFF' : theme.colors.textSecondary,
                  fontFamily: activeTab === 'bookmarks' ? theme.fonts.bold : theme.fonts.medium,
                },
              ]}
            >
              Bookmarks
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabContent}>
          {activeTab === 'recipes' ? (
            <FlatList
              data={dummyRecipes}
              renderItem={({ item }) => <RecipeItem item={item} theme={theme} />}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              contentContainerStyle={styles.listContent}
            />
          ) : (
            <FlatList
              data={dummyBookmarks}
              renderItem={({ item }) => <RecipeItem item={item} theme={theme} />}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.colors.surface }]}
            onPress={() => router.push('/(tabs)/search')}
          >
            <Ionicons name="settings-outline" size={20} color={theme.colors.text} />
            <Text style={[styles.actionText, { color: theme.colors.text, fontFamily: theme.fonts.medium }]}>
              Settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.colors.surface }]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color="#EF5350" />
            <Text style={[styles.logoutText, { color: '#EF5350', fontFamily: theme.fonts.medium }]}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.inner}>
        <View style={styles.logoContainer}>
          <View style={[styles.logo, { backgroundColor: theme.colors.primary }]}>
            <Ionicons name="leaf" size={32} color="#FFFFFF" />
          </View>
          <Text style={[styles.title, { color: theme.colors.text, fontFamily: theme.fonts.bold }]}>
            Flavorful
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </Text>
        </View>

        <View style={styles.form}>
          <View style={[styles.inputGroup, { borderColor: theme.colors.border }]}>
            <Ionicons name="mail-outline" size={20} color={theme.colors.textSecondary} />
            <TextInput
              style={[styles.input, { color: theme.colors.text, fontFamily: theme.fonts.regular }]}
              placeholder="Email"
              placeholderTextColor={theme.colors.textHint}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={[styles.inputGroup, { borderColor: theme.colors.border }]}>
            <Ionicons name="lock-closed-outline" size={20} color={theme.colors.textSecondary} />
            <TextInput
              style={[styles.input, { color: theme.colors.text, fontFamily: theme.fonts.regular }]}
              placeholder="Password"
              placeholderTextColor={theme.colors.textHint}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {!isLogin && (
            <View style={[styles.inputGroup, { borderColor: theme.colors.border }]}>
              <Ionicons name="lock-closed-outline" size={20} color={theme.colors.textSecondary} />
              <TextInput
                style={[styles.input, { color: theme.colors.text, fontFamily: theme.fonts.regular }]}
                placeholder="Confirm Password"
                placeholderTextColor={theme.colors.textHint}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
          )}

          {isLogin && (
            <TouchableOpacity
              style={[styles.forgotButton, { alignSelf: 'flex-end' }]}
              onPress={() => Alert.alert('Info', 'Password recovery not implemented yet')}
            >
              <Text style={[styles.forgotText, { color: theme.colors.primaryLight, fontFamily: theme.fonts.medium }]}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.loginButton,
              {
                backgroundColor: loading ? theme.colors.textHint : theme.colors.primary,
                opacity: loading ? 0.7 : 1,
              },
            ]}
            onPress={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <Ionicons name="sync-outline" size={20} color="#FFFFFF" />
            ) : (
              <Text style={[styles.loginText, { color: '#FFFFFF', fontFamily: theme.fonts.bold }]}>
                {isLogin ? 'Sign In' : 'Sign Up'}
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.toggleContainer}>
            <Text style={[styles.toggleText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.regular }]}>
              {isLogin ? 'Don’t have an account? ' : 'Already have an account? '}
            </Text>
            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
              <Text style={[styles.toggleLink, { color: theme.colors.primaryLight, fontFamily: theme.fonts.medium }]}>
                {isLogin ? 'Sign Up' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    marginTop: 24,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  forgotButton: {
    marginBottom: 24,
  },
  forgotText: {
    fontSize: 14,
  },
  loginButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 30,
    marginBottom: 24,
  },
  loginText: {
    fontSize: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  toggleText: {
    fontSize: 14,
  },
  toggleLink: {
    fontSize: 14,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    marginBottom: 6,
  },
  profileEmail: {
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  tabText: {
    fontSize: 16,
  },
  tabContent: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  recipeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  recipeImageContainer: {
    marginRight: 16,
  },
  recipeImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeInfo: {
    flex: 1,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  recipeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 12,
  },
  section: {
    marginBottom: 32,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 12,
    gap: 12,
  },
  actionText: {
    fontSize: 16,
  },
  logoutText: {
    fontSize: 16,
  },
});

export default AuthScreen;
