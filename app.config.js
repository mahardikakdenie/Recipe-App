const dotenv = require('dotenv');
dotenv.config();

const IS_DEV = process.env.NODE_ENV !== 'production';

// 🔴 GANTI INI DENGAN WEB CLIENT ID ANDA DARI FIREBASE CONSOLE
const GOOGLE_WEB_CLIENT_ID = '76981298414-203ntgi3m3pngi9jvaad215pc1ro4goa.apps.googleusercontent.com';

export default {
  expo: {
    name: 'tutorial-app',
    slug: 'tutorial-app',
    owner: "dikamahar",
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'tutorialapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,

    // ✅ Konfigurasi wajib untuk EAS Update
    updates: {
      url: 'https://u.expo.dev/fd824864-3e15-4010-9961-d1b03756f548',
    },
    runtimeVersion: {
      policy: 'appVersion',
    },

    ios: {
      supportsTablet: true,
      bundleIdentifier: process.env.EXPO_FIREBASE_IOS_BUNDLE_ID || 'com.example.weatherApp',
    },
    android: {
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/images/android-icon-foreground.png',
        backgroundImage: './assets/images/android-icon-background.png',
        monochromeImage: './assets/images/android-icon-monochrome.png',
      },
      package: 'com.example.recipeApp',
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      displayName: "Recipe App",
    },
    web: {
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
          dark: {
            backgroundColor: '#000000',
          },
        },
      ],
      'expo-font',
      "expo-secure-store"
      // ❌ Dihapus sementara karena tidak kompatibel dengan Expo Go:
      // ["@react-native-google-signin/google-signin", { ... }]
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      apiBaseUrl: IS_DEV
        ? process.env.API_BASE_URL_DEV || 'http://10.0.2.2:8000/api'
        : process.env.API_BASE_URL_PROD || 'https://api.yourdomain.com',

      // Firebase Config
      apiSupabaseUrl: process.env.API_BASE || '',
      firebaseApiKey: process.env.EXPO_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.EXPO_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.EXPO_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.EXPO_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.EXPO_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.EXPO_FIREBASE_APP_ID,

      // Firebase Client IDs untuk Google Sign-In
      webClientId: GOOGLE_WEB_CLIENT_ID,
      expoClientId: GOOGLE_WEB_CLIENT_ID,
      androidClientId: process.env.EXPO_FIREBASE_ANDROID_APP_ID,
      iosClientId: process.env.EXPO_FIREBASE_IOS_APP_ID,
      eas: {
        projectId: 'fd824864-3e15-4010-9961-d1b03756f548',
      },
    },
  },
};
