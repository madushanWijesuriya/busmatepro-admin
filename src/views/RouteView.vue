<template>
  <v-container>
    <v-row justify="right">
      <v-col>
        <v-btn color="primary" dark @click="addRec"> Add New Route </v-btn>
        <RouteCreate ref="refCreateBus" :cities="items" />
      </v-col>
    </v-row>
    <br />
    <DataTable :headers="headers" :desserts="desserts" />
  </v-container>
</template>
<script>
import RouteCreate from "../components/route/RouteCreate.vue";
import DataTable from "../components/common/DataTable.vue";
import { getAllDocuments } from "../assets/firebase/firebase";

export default {
  components: { RouteCreate, DataTable },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Id",
        align: "start",
        sortable: false,
        value: "id",
      },
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "holt_name",
      },
    ],
    desserts: [],
    items: [],
  }),
  methods: {
    addRec() {
      this.$refs.refCreateBus.openModel();
    },
    getBuseHolts() {
      getAllDocuments(
        "bus holts",
        (item) => {
          this.desserts = item;
          item.map((x) => this.items.push({ state: x.holt_name, abbr: x.id }));
        },
        (e) => {
          console.log(e);
        }
      );
    },
  },
  async created() {
    await this.getBuseHolts();
  },
};
</script>
