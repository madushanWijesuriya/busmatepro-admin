<template>
  <v-container>
    <v-row justify="right">
      <v-col>
        <v-btn color="primary" dark @click="addRec"> Add Bus holt</v-btn>
        <BusHoltCreate ref="refCreateBus" @get-busHolt-list="getBuseHolts"/>
      </v-col>
    </v-row>
    <br />
    <BusHoltTable
      :headers="headers"
      :desserts="dessertsList"
      :columns="columns"
      :data="data"
      :successDelMsg="successDelMsg"
      @refreshTable="refreshTable"
    />
  </v-container>
</template>
<script>
import BusHoltCreate from "../components/bus-holt/BusHoltCreate.vue";
import { getAllDocuments } from "../assets/firebase/firebase";
import BusHoltTable from "@/components/bus-holt/BusHoltTable.vue";

export default {
  components: { BusHoltCreate, BusHoltTable },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Action",
        align: "start",
        sortable: false,
        value: "action",
      },
      {
        text: "Id",
        align: "start",
        sortable: false,
        value: "id",
      },
      {
        text: "Holt Name",
        align: "start",
        sortable: false,
        value: "holt_name",
      },
    ],
    desserts: [],
    columns: ["action", "id", "holt_name"],

  }),
  methods: {
    async refreshTable() {
      await this.getBuseHolts();
    },
    addRec() {
      this.$refs.refCreateBus.openModel();
    },
    getBuseHolts() {
      getAllDocuments(
        "busHolts",
        (item) => {
          this.desserts = item;
          // this.desserts.map((q) => {
          //   return {
          //     ...q,
          //     view_on_map: true,
          //   };
          // });
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
  computed: {
    dessertsList() {
      return this.desserts
    }
  }
};
</script>
