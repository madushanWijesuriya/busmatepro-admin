import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.config.productionTip = false;

const options = {
  // You can set your default options here
};

Vue.use(Toast, options);
new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
