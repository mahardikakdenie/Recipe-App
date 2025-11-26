# Flavorful 🌿  
A modern, clean, and responsive recipe discovery app built with **React Native (Expo)**.

![Flavorful App Preview](https://via.placeholder.com/400x800/f8fbf8/1b5e20?text=Flavorful+App)  
*(Ganti dengan screenshot nyata saat deploy)*

---

## ✨ Features

- **Auth System**: Email/password + Google SSO (Firebase & Supabase ready)
- **Recipe Discovery**: Browse, search, and save recipes from [dummyjson.com](https://dummyjson.com/recipes)
- **Personalized Mood-Based Recommendations**: "Feeling cozy? Try this..."
- **Food Journal**: Track what you cook & eat daily
- **Responsive Grid**: Always 2-column layout on any device
- **Modern UI**: Clean, green-themed, Material Design without shadows
- **Offline Support**: Persistent auth & loading states
- **TypeScript + Expo Router** for scalable architecture

---

## 🛠 Tech Stack

- **Framework**: [Expo](https://expo.dev/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Language**: TypeScript
- **Styling**: `StyleSheet` + custom `ThemeContext`
- **State**: React Hooks + custom contexts (`AuthContext`, `ThemeContext`)
- **Auth**: Firebase Authentication (Email/Google) + Supabase fallback
- **API**: [dummyjson.com/recipes](https://dummyjson.com/recipes) (50+ real recipes)
- **UI Components**: Custom cards, skeletons, animated search
- **Fonts**: Inter (via `@expo-google-fonts/inter`)
- **Icons**: `@expo/vector-icons`

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- Expo CLI: `npm install -g @expo/cli`

### Installation
```bash
git clone https://github.com/your-username/flavorful-app.git
cd flavorful-app
npm install
