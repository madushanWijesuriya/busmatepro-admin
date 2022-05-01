import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyB3UqJwcAZT0fQxHGBoSJrXQeLtlWvyQlI",
  authDomain: "busmatesl.firebaseapp.com",
  databaseURL: "https://busmatesl-default-rtdb.firebaseio.com",
  projectId: "busmatesl",
  storageBucket: "busmatesl.appspot.com",
  messagingSenderId: "647756630737",
  appId: "1:647756630737:web:9390d5967e4fc0f14213f0",
  measurementId: "G-3T19EBY70G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export default getFirestore(app);
