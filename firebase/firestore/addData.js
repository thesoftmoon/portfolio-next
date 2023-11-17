import firebase_app from "../config";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function addData(collectionName, data) {
    let result = null;
    let error = null;

    try {
        const colRef = collection(db, collectionName);
        result = await addDoc(colRef, data);
    } catch (e) {
        error = e;
    }

    return { result, error };
}