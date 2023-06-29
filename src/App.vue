<template>
  <v-app>
    <div v-if="isLoggedIn">
      <v-navigation-drawer v-model="drawer" app>
        <SideBar />
      </v-navigation-drawer>
      <v-app-bar app> </v-app-bar>

      <v-main>
        <div class="container">
          <router-view />
        </div>
      </v-main>
      <MainFooter />
    </div>
    <div v-else><router-view /></div>
  </v-app>
</template>

<script>
import SideBar from "./components/common/SideBar.vue";
import MainFooter from "./components/common/MainFooter.vue";
export default {
  name: "App",
  components: { SideBar, MainFooter },
  data: () => ({
    // isLogged: false,
    drawer: null,
  }),
  computed: {
    isLoggedIn: function () {
      console.log(this.$store.getters.StateUser);
      // this.$store.dispatch("loginUser", null);
      // console.log(this.$store.getters.isAuthenticated);
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>
