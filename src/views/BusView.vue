<template>
  <v-container>
    <v-row justify="right">
      <v-col>
        <v-btn color="primary" dark @click="addBus"> Add New Bus </v-btn>
        <BusCreate ref="refCreateBus" />
      </v-col>
    </v-row>
    <br />
    <BusTable
      :headers="headers"
      :desserts="desserts"
      :columns="columns"
      :data="data"
      :successDelMsg="successDelMsg"
      @refreshTable="refreshTable"
    />
    <!-- <DataTable
      :headers="headers"
      :desserts="desserts"
      :columns="columns"
      :data="data"
      :successDelMsg="successDelMsg"
      @refreshTable="refreshTable"
    /> -->
  </v-container>
</template>
<script>
import BusCreate from "../components/bus/BusCreate.vue";
import BusTable from "../components/bus/BusTable.vue";

// import DataTable from "../components/common/DataTable.vue";
import { getAllDocuments } from "../assets/firebase/firebase";

export default {
  components: { BusCreate, BusTable },
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
      assign_route: {
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
      update: {
        successMsg: "Successfully Update",
        errorMsg: "Error",
        docName: "bus",
        formName: "Update Bus",
        formInputs: [
          {
            type: "text",
            label: "Bus Number",
            name: "bus_no",
            required: true,
            place_holder: "Enter Bus Registration Number",
            rules: [
              (value) => !!value || "Required.",
              (value) => (value || "").length <= 20 || "Max 20 characters",
              // (value) => {
              //   const pattern =
              //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              //   return pattern.test(value) || "Invalid e-mail.";
              // },
            ],
          },
          {
            type: "number",
            label: "No of Seats",
            name: "available_seats",
            required: true,
            place_holder: "Enter Number of Available Seats",
            rules: [
              (value) => !!value || "Required.",
              (value) => (value || "").length <= 2 || "Invalid Number",
              (value) =>
                Number.isInteger(Number(value)) ||
                "The value must be an integer number",
            ],
          },
          {
            type: "select",
            label: "Status",
            name: "available",
            required: true,
            options: ["yes", "no"],
            place_holder: "Select Status",
            rules: [(value) => !!value || "Required."],
          },
        ],
      },
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
            this.data.assign_route.formInputs[0].options.push({
              state: x.name,
              abbr: x.id,
            })
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
