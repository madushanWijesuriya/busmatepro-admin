<template>
  <v-data-table
    loading-text="loading-text"
    :headers="headers"
    :items="items"
    :items-per-page="page"
    class="elevation-1"
  >
    <template v-slot:[`item.id`]="{ item }">
      <UpdateModel
        :ref="'refUpdateModel' + item.id"
        :modelName="data.update.formName"
        :modelInputs="data.update.formInputs"
        :docName="data.update.docName"
        :successMsg="data.update.successMsg"
        :errorMsg="data.update.errorMsg"
        :type="'update'"
        :id="item.id"
        :busOptions="busOptions"
        :docItem="item"
        @refreshTable="refreshTable"
      />
      <div style="margin-top: 20px">
        <v-btn
          x-small
          color="primary"
          dark
          @click="editDriver('refUpdateModel' + item.id)"
        >
          Edit
        </v-btn>
      </div>
    </template>
  </v-data-table>
</template>
<script>
import UpdateModel from "../common/UpdateModel.vue";
import { getAllDocuments } from "../../assets/firebase/firebase";
export default {
  components: { UpdateModel },
  props: [
    "items",
    "headers",
    "isLoading",
    "page",
    "data",
    "successDelMsg",
    "errorDelMsg",
  ],
  data: () => ({
    route: "",
    busOptions: [],
  }),
  methods: {
    getBuses() {
      getAllDocuments(
        "bus",
        (buses) => {
          buses.map((x) =>
            this.busOptions.push({
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
    setColor(status) {
      if (status == "yes") return "warning";
      else return "green";
    },
    editDriver(refUpdateModel) {
      this.$refs[refUpdateModel].openModel();
    },
    deleteItem(id) {
      console.log(id);
    },
    refreshTable() {
      this.$emit("refreshTable");
    },
    checkColumns(column) {
      return this.headers.filter((q) => q.value === column) > 0;
    },
    viewOnMap(row) {
      console.log(
        row,
        JSON.parse(row.location).lat,
        JSON.parse(row.location).lng
      );
    },
  },

  mounted() {
    this.route = this.$route.name;
    this.getBuses();
  },
};
</script>
