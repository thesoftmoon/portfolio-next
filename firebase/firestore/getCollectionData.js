import firebase_app from "../config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getCollectionData(collectionName) {
  const collectionRef = collection(db, collectionName);
  
  let result = null;
  let error = null;

  try {
    const querySnapshot = await getDocs(collectionRef);
    result = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    error = e;
  }

  return { result, error };
}