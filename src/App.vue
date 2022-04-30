<template>
  <v-app>
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
  </v-app>
</template>

<script>
import SideBar from "./components/common/SideBar.vue";
import MainFooter from "./components/common/MainFooter.vue";
export default {
  name: "App",
  components: { SideBar, MainFooter },
  data: () => ({
    drawer: null,
  }),
};
</script>
