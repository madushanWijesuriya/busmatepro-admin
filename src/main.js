import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/router";
import firebase from "../config/firebase-config";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  firebase,
  render: (h) => h(App),
}).$mount("#app");
