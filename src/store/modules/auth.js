//store/modules/auth.js

// import axios from "axios";
const state = {
  user: null,
};

const mutations = {
  logout(state) {
    state.user = undefined;
  },
  login(state, user) {
    state.user = user;
  },
};
const actions = {
  loginUser({ commit }, userData) {
    commit("login", userData);
  },
  logoutUser({ commit }) {
    commit("logout");
  },
};
const getters = {
  isAuthenticated: (state) => (state.user ? true : false),
  StateUser: (state) => state.user,
};
export default {
  state,
  getters,
  actions,
  mutations,
};
