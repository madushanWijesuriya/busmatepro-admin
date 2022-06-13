import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import store from "../../store";
// import axios from "axios";
// import router from "../../router/router";

export const LogOut = async ({ commit }) => {
  let user = null;
  firebaseSignOut();
  commit("logout", user);
};

async function firebaseSignOut() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      console.log(error);
      // An error happened.
    });
}

export const firebaseLogin = async (email, password) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in'
      store.dispatch("loginUser", userCredential.user);
      return userCredential.user;

      // ...
    })
    .catch((error) => {
      return { code: error.code, message: error.message };
    });
  return true;
};

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
