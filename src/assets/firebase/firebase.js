import { collection, addDoc } from "firebase/firestore";
import db from "../../../config/firebase-config";

export const addDocument = async (
  data,
  doc,
  successCallback,
  errorCallback
) => {
  try {
    const docRef = await addDoc(collection(db, doc), data);
    successCallback(docRef);
  } catch (e) {
    errorCallback(e);
  }
};
