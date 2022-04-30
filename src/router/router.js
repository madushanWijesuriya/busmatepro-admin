import Vue from "vue";
import VueRouter from "vue-router";
import BusView from "../views/BusView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/buses",
    name: "Bus",
    component: BusView,
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
