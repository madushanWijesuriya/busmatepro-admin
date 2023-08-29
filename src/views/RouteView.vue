<template>
  <v-container>
    <v-row justify="right">
      <v-col>
        <v-btn color="primary" dark @click="addRec"> Add New Route </v-btn>
        <RouteCreate
          ref="refCreateBus"
          :cities="items"
          :holtsOption="holtList"
          @get-routes-list="getBuseRoutes"
        />
      </v-col>
    </v-row>
    <br />
    <RouteTable :headers="headers" :desserts="dessertsList" :data="data" />
  </v-container>
</template>
<script>
import RouteCreate from "../components/route/RouteCreate.vue";
import RouteTable from "../components/route/RouteTable.vue";

import { getAllDocuments } from "../assets/firebase/firebase";

export default {
  components: { RouteCreate, RouteTable },
  data: () => ({
    holts: [],
    dialog: false,
    headers: [
      {
        text: "Action",
        align: "start",
        sortable: false,
        value: "id",
      },
      {
        text: "Route Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Created Date", value: "created_at" },
      { text: "Updated Date", value: "updated_at" },

    ],
    desserts: [],
    items: [],
    data: {
      assign_route: {
        successMsg: "Success",
        errorMsg: "Error",
        docName: "busRoutes",
        formName: "Assign a Holts",
        formInputs: [
          {
            type: "select",
            multiple: true,
            label: "busHolts",
            name: "holts",
            required: true,
            options: [],
            place_holder: "Select Status",
            rules: [(value) => !!value || "Required."],
          },
        ],
      },
    },
  }),
  computed: {
    dessertsList(){
      return this.desserts
    },
    holtList() {
      return this.holts;
    },
  },
  methods: {
    getHolts() {
      getAllDocuments(
        "busHolts",
        (routes) => {
          routes.map((x) =>
            this.holts.push({
              state: x.holt_name,
              abbr: x.id,
            })
          );
        },
        (e) => {
          console.log(e);
        }
      );
    },
    addRec() {
      this.$refs.refCreateBus.openModel();
    },
    getBuseRoutes() {
      getAllDocuments(
        "busRoutes",
        (item) => {
          this.desserts = item.map(element => {
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
  },
  async created() {
    await this.getBuseRoutes();
    await this.getHolts();
  },
};
</script>
