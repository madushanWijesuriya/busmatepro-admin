<template>
  <v-container>
    <v-row justify="right">
      <v-col>
        <v-btn color="primary" dark @click="addBus"> Add New Bus </v-btn>
        <BusCreate ref="refCreateBus" />
      </v-col>
    </v-row>
    <br />
    <DataTable :headers="headers" :desserts="desserts" />
  </v-container>
</template>
<script>
import BusCreate from "../components/bus/BusCreate.vue";
import DataTable from "../components/common/DataTable.vue";
import { getAllDocuments } from "../assets/firebase/firebase";

export default {
  components: { BusCreate, DataTable },
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
        text: "Bus Registration",
        align: "start",
        sortable: false,
        value: "bus_no",
      },
      { text: "Available", value: "available" },
      { text: "Available Seats", value: "available_seats" },
    ],
    desserts: [],
  }),
  methods: {
    addBus() {
      this.$refs.refCreateBus.openModel();
    },
    getBuses() {
      getAllDocuments(
        "bus",
        (buses) => {
          this.desserts = buses;
        },
        (e) => {
          console.log(e);
        }
      );
    },
  },
  async created() {
    let x = await this.getBuses();
    console.log(x, "s");
  },
};
</script>
