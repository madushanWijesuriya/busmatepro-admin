<template>
  <v-container>
    <v-row justify="right">
      <v-col>
        <v-btn color="primary" dark @click="addRec"> Add New Route </v-btn>
        <RouteCreate ref="refCreateBus" :cities="items" />
      </v-col>
    </v-row>
    <br />
    <RouteTable :headers="headers" :desserts="desserts" :data="data" />
  </v-container>
</template>
<script>
import RouteCreate from "../components/route/RouteCreate.vue";
import RouteTable from "../components/route/RouteTable.vue";

import { getAllDocuments } from "../assets/firebase/firebase";

export default {
  components: { RouteCreate, RouteTable },
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
        value: "name",
      },
      {
        text: "Start",
        align: "start",
        sortable: false,
        value: "start",
      },
      {
        text: "End",
        align: "start",
        sortable: false,
        value: "end",
      },
    ],
    desserts: [],
    items: [],
    data: {
      assign_route: {
        successMsg: "Success",
        errorMsg: "Error",
        docName: "bus routs",
        formName: "Assign a Holts",
        formInputs: [
          {
            type: "select",
            multiple: true,
            label: "Bus Holts",
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
  methods: {
    getHolts() {
      getAllDocuments(
        "bus holts",
        (routes) => {
          routes.map((x) =>
            this.data.assign_route.formInputs[0].options.push({
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
        "bus routs",
        (item) => {
          this.desserts = item;
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
    console.log(this.data);
  },
};
</script>
