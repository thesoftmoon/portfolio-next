import firebase_app from "../config";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function deleteData(collectionName, docId) {
    let result = null;
    let error = null;

    try {
        const docRef = doc(db, collectionName, docId);
        await deleteDoc(docRef);
        result = "Elemento eliminado con exito";
    } catch (e) {
        error = e;
    }

    return { result, error };
}