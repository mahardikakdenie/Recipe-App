// src/lib/firebase.ts
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// import Constants from 'expo-constants';



// const config = Constants.expoConfig?.extra

// const firebaseConfig: FirebaseOptions = {
//   apiKey: config?.firebaseApiKey,
//   authDomain: config?.firebaseAuthDomain,
//   projectId: config?.firebaseProjectId,
//   storageBucket: config?.firebaseStorageBucket,
//   messagingSenderId: config?.firebaseMessagingSenderId,
//   appId: config?.firebaseAppId,
// };

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBI4IsO1gKFsQnKhXxMeTDrRF6SEH9Ax_g",
  authDomain: "recipe-app-e38c4.firebaseapp.com",
  projectId: "recipe-app-e38c4",
  storageBucket: "recipe-app-e38c4.firebasestorage.app",
  messagingSenderId: "128133782018",
  appId: "1:128133782018:web:20fd3118951259b506251b",
  measurementId: "G-GY5Q1K7BBX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
