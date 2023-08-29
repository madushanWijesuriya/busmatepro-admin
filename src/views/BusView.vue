<template>
  <v-container>
    <v-row justify="right">
      <v-col>
        <v-btn color="primary" dark @click="addBus"> Add New Bus </v-btn>
        <BusCreate ref="refCreateBus" @get-bus-list="getBuses"/>
      </v-col>
    </v-row>
    <br />
    <BusTable
      :headers="headers"
      :desserts="dessertsList"
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
      { text: "Review", value: "review" },
      { text: "Created Date", value: "created_at" },
      { text: "Updated Date", value: "updated_at" },

    ],
    desserts: [],
    columns: ["id", "bus_no", "available", "available_seats", "review","created_at", "updated_at"],
    data: {
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
          this.desserts = buses.map(element => {
            return {
              ...element,
              created_at: element.created_at ? new Date(element.created_at.toDate()).toDateString() : "-",
              updated_at: element.updated_at ? new Date(element.updated_at.toDate()).toDateString() : "-",
            }
          });
          
        },
        (e) => {
          console.log(e);
        }
      );
    },

    getRoutes() {
      getAllDocuments(
        "busRoutes",
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
  computed: {
    dessertsList() {
      return this.desserts;
    }
  },
};
</script>
