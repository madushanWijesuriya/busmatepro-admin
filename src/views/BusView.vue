<template>
  <v-container>
    <v-row justify="right">
      <v-col>
        <v-btn color="primary" dark @click="addBus"> Add New Bus </v-btn>
        <BusCreate ref="refCreateBus" />
      </v-col>
    </v-row>
    <br />
    <DataTable
      :headers="headers"
      :desserts="desserts"
      :columns="columns"
      :data="data"
      :successDelMsg="successDelMsg"
      @refreshTable="refreshTable"
    />
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
    successDelMsg: "Remove Bus Successfully",
    headers: [
      {
        text: "Action",
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
    columns: ["id", "bus_no", "available", "available_seats"],
    data: {
      successMsg: "Success",
      errorMsg: "Error",
      docName: "bus",
      formName: "Assign a Route",
      formInputs: [
        {
          type: "select",
          label: "Routes",
          name: "route_id",
          required: true,
          options: [],
          place_holder: "Select Status",
          rules: [(value) => !!value || "Required."],
        },
      ],
    },
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
    getRoutes() {
      getAllDocuments(
        "bus routs",
        (routes) => {
          routes.map((x) =>
            this.data.formInputs[0].options.push({ state: x.name, abbr: x.id })
          );
        },
        (e) => {
          console.log(e);
        }
      );
    },
    async refreshTable() {
      await this.getBuses();
    },
  },
  async created() {
    await this.getBuses();
    await this.getRoutes();
  },
};
</script>
