<template>
  <v-container>
    <v-row justify="right">
      <v-col>
        <v-btn color="primary" dark @click="addRec"> Add Bus holt</v-btn>
        <BusHoltCreate ref="refCreateBus" />
      </v-col>
    </v-row>
    <br />
    <DataTable :headers="headers" :desserts="desserts" />
  </v-container>
</template>
<script>
import BusHoltCreate from "../components/bus-holt/BusHoltCreate.vue";
import DataTable from "../components/common/DataTable.vue";
import { getAllDocuments } from "../assets/firebase/firebase";

export default {
  components: { BusHoltCreate, DataTable },
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
      {
        text: "Action",
        align: "center",
        sortable: false,
        value: "action",
        actions: [
          {
            name: "view_on_map",
            column: "location",
            text: "View on Map",
          },
        ],
      },
    ],
    desserts: [],
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
          this.desserts.map((q) => {
            return {
              ...q,
              view_on_map: true,
            };
          });
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
