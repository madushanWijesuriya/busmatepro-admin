import Vuex from "vuex";
import Vue from "vue";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";

// Load Vuex
Vue.use(Vuex);
// Create store
export default new Vuex.Store({
  state: {
    status: "",
    user: null,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user: auth,
  },
  plugins: [createPersistedState()],
});
