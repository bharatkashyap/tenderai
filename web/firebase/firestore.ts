import initialize from "./config";
import { Tender } from "../types";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { randomUUID } from "crypto";

const converter = {
  toFirestore: (data: Tender) => data,
  fromFirestore: (snap: any) => snap.data(),
};

// Function to retrieve a document from a Firestore collection
export async function getDocuments(collectionId: string) {
  const firebase_app = await initialize();
  const db = getFirestore(firebase_app);

  try {
    /// Query a reference to the collection
    const snapshot = await getDocs(
      collection(db, collectionId).withConverter(converter)
    );
    return snapshot.docs.map((doc) => ({
      Description: doc.data().Description,
      Cost: doc.data().Cost,
      ...doc.data(),
    }));
  } catch (e) {
    throw new Error(
      `Error retrieving documents from collection ${collectionId}: ${e}`
    );
  }
}

export async function addOrUpdateDocument(
  collectionId: string,
  data: Tender,
  documentId?: string
) {
  const firebase_app = await initialize();
  const db = getFirestore(firebase_app);
  if (!documentId) {
    documentId = randomUUID().toString();
  }

  try {
    const result = await setDoc(doc(db, collectionId, documentId), data, {
      merge: true, // Merge the new data with existing document data
    });
    return result;
  } catch (e) {
    throw new Error(
      `Error retrieving documents from collection ${collectionId}: ${e}`
    );
  }
}
