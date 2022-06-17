import Vue from "vue";
import VueRouter from "vue-router";
import BusView from "../views/BusView.vue";
import LoginView from "../views/LoginView.vue";
import BusHoltView from "../views/BusHoltView.vue";
import RouteView from "../views/RouteView";
import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/buses",
    name: "Bus",
    meta: { requiresAuth: true },
    component: BusView,
  },
  {
    path: "/",
    name: "Bus",
    meta: { requiresAuth: true },
    component: BusView,
  },
  {
    path: "/bus-holts",
    name: "BusHolt",
    meta: { requiresAuth: true },
    component: BusHoltView,
  },
  {
    path: "/routes",
    name: "Route",
    meta: { requiresAuth: true },
    component: RouteView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/logout",
    name: "Logout",
    component: null,
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const userLoggedIn = store.state.user.user;
  const isRequiredAuth = to.meta.requiresAuth;

  if (to.name === "Login" && userLoggedIn) {
    next({ name: "/" });
  } else if (isRequiredAuth && from.name === "Login") {
    next();
  } else if (isRequiredAuth && userLoggedIn) {
    next();
  } else if (!isRequiredAuth) {
    next();
  } else if (isRequiredAuth && !userLoggedIn) {
    next({
      name: "Login",
    });
  }
});

export default router;
