import { v4 } from "uuid";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebase_app from "../config";

const storage = getStorage(firebase_app);

export default async function addImage(imageFolder, file){

    let result = null;
    let error = null;

    try{
        const imageName = `${v4()}`;
        const imageRef = ref(storage, `${imageFolder}/${imageName}`);

        //Upload img
        const snapshot = await uploadBytesResumable(imageRef, file);

        // get img url
        const imageUrl = await getDownloadURL(snapshot.ref);

        result = imageUrl;
    } catch (e){
        error = e;
    }

    return {result, error};


}