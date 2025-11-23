// app/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/src/context/Theme/ThemeContext';
import { post } from '@/src/api/supabase';
import { saveToken, saveUser } from '@/src/utils/storage';
import { useAuth } from '@/src/context/Auth/AuthContext';

const AuthScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { setUser, user } = useAuth();

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
        const resp = await post('https://kanban-api-w839.onrender.com/auth/login', {
          email,
          password,
        });
        console.log("resp : ", resp);
        console.log("🚀 ~ handleAuth ~ password:", password)
        
        const token = resp.access_token;
        await saveToken(token);
        const user = resp.user
        setUser(user);
        await saveUser(user);
        console.log("Res p:", resp);
        

        router.replace('/(tabs)');
      } else {
        // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // const user = userCredential.user;

        // await user.sendEmailVerification();
        Alert.alert(
          'Verification Sent',
          `A verification link has been sent to ${email}. Please check your inbox and verify your account before logging in.`
        );
        setIsLogin(true);
      }
    } catch (error: any) {
      let message = 'Authentication failed. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        message = 'This email is already registered.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password must be at least 6 characters.';
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        message = 'Invalid email or password.';
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Too many attempts. Try again later.';
      }
      Alert.alert(isLogin ? 'Login Failed' : 'Sign Up Failed', message);
    } finally {
      setLoading(false);
    }
  };

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

        {!user && <View style={styles.form}>
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
              autoComplete="email"
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
              autoComplete="password"
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
                autoComplete="password"
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
              {isLogin ? "Don’t have an account? " : "Already have an account? "}
            </Text>
            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
              <Text style={[styles.toggleLink, { color: theme.colors.primaryLight, fontFamily: theme.fonts.medium }]}>
                {isLogin ? 'Sign Up' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
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
});

export default AuthScreen;
