import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import store from "./store";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://gabbyblog.herokuapp.com/";

Vue.config.productionTip = false;

const options = {
  // You can set your default options here
};

Vue.use(Toast, options);
new Vue({
  store,
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
