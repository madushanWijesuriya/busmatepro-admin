<template>
  <v-card class="mx-auto" max-width="300" tile>
    <v-list shaped>
      <v-subheader>REPORTS</v-subheader>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    selectedItem: 1,
    items: [
      { text: "Buses", icon: "mdi-bus", link: "/buses", name: "Buses" },
      { text: "Routes", icon: "mdi-bus", link: "/routes", name: "Routes" },
      { text: "Holts", icon: "mdi-bus", link: "/holts", name: "Holts" },
    ],
  }),
};
</script>
