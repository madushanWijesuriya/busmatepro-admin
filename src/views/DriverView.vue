<template>
  <v-container>
    <v-row justify="right">
      <v-col>
        <v-btn color="primary" dark @click="addRec"> Add New Driver </v-btn>
        <DriverCreate ref="refCreateDriver" :busesOptions="busesOptions" @get-drivers-list="getDrivers"/>
      </v-col>
    </v-row>
    <br />
    <DriverTable :headers="headers" :items="dessertsList" :data="data" />
  </v-container>
</template>
<script>
import DriverCreate from "../components/driver/DriverCreate.vue";
import DriverTable from "../components/driver/DriverTable.vue";
import { whereDoc, getAllDocuments } from "../assets/firebase/firebase";

export default {
  components: { DriverCreate, DriverTable },
  data: () => ({
    dialog: false,
    desserts: [],
    headers: [
      {
        text: "Action",
        align: "center",
        sortable: false,
        value: "id",
      },
      {
        text: "Name",
        align: "center",
        sortable: false,
        value: "name",
      },
      {
        text: "Mobile No",
        align: "center",
        sortable: false,
        value: "mobile_number",
      },
    ],
    data: {
      update: {
        successMsg: "Successfully Update",
        errorMsg: "Error",
        docName: "userProfile",
        formName: "Update Driver",
        formInputs: [
          {
            type: "text",
            label: "First Name",
            name: "first_name",
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
            type: "text",
            label: "Last Name",
            name: "last_name",
            required: true,
            place_holder: "Enter Last Name",
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
            type: "text",
            label: "Phone Number",
            name: "mobile_number",
            required: true,
            place_holder: "Enter Driver Phone Number",
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
            type: "select",
            label: "Bus",
            name: "bus_id",
            required: true,
            options: [],
            place_holder: "Select Bus",
            rules: [(value) => !!value || "Required."],
          },
        ],
      },
    },
    busesOptions: []
  }),

  mounted() {
    this.getDrivers();
    this.getBuses();
  },
  computed: {
    dessertsList() {
      return this.desserts;
    },
  },
  methods: {
    addRec() {
      this.$refs.refCreateDriver.openModel();
    },
    getBuses() {
      getAllDocuments(
        "bus",
        (buses) => {
          buses.map((x) =>
          this.busesOptions.push({
              state: x.bus_no,
              abbr: x.id,
            })
          );
        },
        (e) => {
          console.log(e);
        }
      );
    },
    async getDrivers() {
      await whereDoc(
        "userProfile",
        "type",
        "==",
        "driver",
        (item) => {
          this.desserts = item;
          this.desserts = this.desserts.map((q) => {
            return {
              ...q,
              id: q.id,
              mobile_number: q.mobile_number ? q.mobile_number : "-",
              created_at: q.created_at ? q.created_at : "-",
              name: q.first_name + " " + q.last_name,
            };
          });
        },
        (e) => {
          console.log(e);
        }
      );
    },
  },
};
</script>
