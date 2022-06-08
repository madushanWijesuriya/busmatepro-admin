import Vue from "vue";
import VueRouter from "vue-router";
import BusView from "../views/BusView.vue";
import BusHoltView from "../views/BusHoltView.vue";
import RouteView from "../views/RouteView";
Vue.use(VueRouter);

const routes = [
  {
    path: "/buses",
    name: "Bus",
    component: BusView,
  },
  {
    path: "/bus-holts",
    name: "BusHolt",
    component: BusHoltView,
  },
  {
    path: "/routes",
    name: "Route",
    component: RouteView,
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
