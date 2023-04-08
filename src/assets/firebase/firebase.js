import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import db from "../../../config/firebase-config";

export const whereDoc = async (
  doc,
  col,
  operator,
  value,
  successCallback,
  errorCallback
) => {
  try {
    let data = [];
    const citiesRef = collection(db, doc);
    const q = query(citiesRef, where(col, operator, value));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push({ id: doc.id, ...doc.data() });
    });
    successCallback(data);
  } catch (e) {
    errorCallback(e);
  }
};
export const whereDateBetween = async (
  doc,
  dateOne,
  dateTwo,
  successCallback,
  errorCallback
) => {
  try {
    let start = new Date(dateOne);
    start.setHours(0, 0, 0, 0);

    let end = new Date(dateTwo);
    end.setHours(23, 59, 59, 999);

    let data = [];
    const citiesRef = collection(db, doc);
    const q = query(
      citiesRef,
      where("created_at", ">=", start),
      where("created_at", "<=", end)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push({ id: doc.id, ...doc.data() });
    });
    successCallback(data);
  } catch (e) {
    errorCallback(e);
  }
};
export const addDocument = async (
  data,
  doc,
  successCallback,
  errorCallback
) => {
  try {
    const docRef = await addDoc(collection(db, doc), {
      ...data,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
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

export const updateDocuments = async (
  data,
  docu,
  docId,
  successCallback,
  errorCallback
) => {
  try {
    const washingtonRef = doc(db, docu, docId);

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      ...data,
      updated_at: serverTimestamp(),
    });
    successCallback(true);
  } catch (e) {
    // console.log(e);
    errorCallback(e);
  }
};

export const deleteDocuments = async (
  docu,
  docId,
  successCallback,
  errorCallback
) => {
  try {
    console.log(docu, docId);
    await deleteDoc(doc(db, docu, docId));
    successCallback();
  } catch (error) {
    console.log(error);
    errorCallback(error);
  }
};

export const getDocumentById = async (docu, docId) => {
  const docRef = doc(db, docu, docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};
