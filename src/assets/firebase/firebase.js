import { collection, addDoc, getDocs } from "firebase/firestore";
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

export const getAllDocuments = async (doc, successCallback, errorCallback) => {
  try {
    let data = [];
    const querySnapshot = await getDocs(collection(db, doc));
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    successCallback(data);
  } catch (e) {
    // console.log(e);
    errorCallback(e);
  }
};

