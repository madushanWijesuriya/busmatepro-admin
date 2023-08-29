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
      { text: "Created Date", value: "created_at" },
      { text: "Updated Date", value: "updated_at" },

    ],
    desserts: [],
    columns: ["action", "id", "holt_name", "created_at", "updated_at"],

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
          this.desserts = item.map(element => {
            return {
              ...element,
              created_at: element.created_at ? new Date(element.created_at.toDate()).toDateString() : "-",
              updated_at: element.updated_at ? new Date(element.updated_at.toDate()).toDateString() : "-",
            }
          });
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
