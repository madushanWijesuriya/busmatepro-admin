import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";

import store from "../../store";
// import axios from "axios";
// import router from "../../router/router";

export const LogOut = async ({ commit }) => {
  let user = null;
  firebaseSignOut();
  commit("logout", user);
};

export const firebaseSignOut = async () => {
  const auth = getAuth();
  console.log();
  signOut(auth)
    .then(() => {
      console.log('logged out');
    })
    .catch((error) => {
      console.log(error);
      // An error happened.
    });
}

export const firebaseLogin = async (email, password, successCallback,
  errorCallback) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in'
      store.dispatch("loginUser", userCredential.user);
      successCallback(userCredential);
    })
    .catch((error) => {
      errorCallback(error);
    });
};

export const firebaseRegister = async (email, password, successCallback,
  errorCallback) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      store.dispatch("loginUser", userCredential.user);
      successCallback(userCredential);
    })
    .catch((error) => {
      errorCallback(error);
    });
}
// export const Register = async ({ dispatch }, form) => {
//   await axios.post("register", form);
//   let UserForm = new FormData();
//   UserForm.append("username", form.username);
//   UserForm.append("password", form.password);
//   await dispatch("LogIn", UserForm);
// };

// export const LogIn = async ({ commit }, User) => {
//   await axios.post("login", User);
//   await commit("setUser", User.get("username"));
// };
