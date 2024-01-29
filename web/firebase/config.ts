import { initializeApp, getApps } from "firebase/app";

async function initialize() {
  // Your web app's Firebase configuration
  if (
    !process.env.FIREBASE_API_KEY ||
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_AUTH_DOMAIN ||
    !process.env.FIREBASE_STORAGE_BUCKET ||
    !process.env.FIREBASE_MESSAGING_SENDER_ID ||
    !process.env.FIREBASE_APP_ID
  )
    throw new Error("Firebase credentials not provided in .env.local");

  const firebaseCredential = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

  try {
    return getApps().length === 0
      ? initializeApp(firebaseCredential)
      : getApps()[0];
  } catch (error) {
    throw new Error(`Firebase initialization error: ` + error);
  }
}

export default initialize;
