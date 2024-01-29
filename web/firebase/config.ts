import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { promises as fs } from "fs";

async function initialize() {
  // Your web app's Firebase configuration
  if (!process.env.FIREBASE_CREDENTIAL_PATH)
    throw new Error("Firebase credentials not provided in .env.local");

  const firebaseCredentialPath =
    process.cwd() + process.env.FIREBASE_CREDENTIAL_PATH;

  try {
    const firebaseCredential = JSON.parse(
      await fs.readFile(firebaseCredentialPath, "utf-8")
    );
    return getApps().length === 0
      ? initializeApp(firebaseCredential)
      : getApps()[0];
  } catch (error) {
    throw new Error(`Firebase initialization error: ` + error);
  }
}

export default initialize;
