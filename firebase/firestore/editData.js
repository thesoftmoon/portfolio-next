import firebase_app from "../config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function editData(collectionName, docId, newData) {
    let result = null;
    let error = null;

    try {
        const docRef = doc(db, collectionName, docId);
        result = await updateDoc(docRef, newData);
    } catch (e) {
        error = e;
    }

    return { result, error };
}