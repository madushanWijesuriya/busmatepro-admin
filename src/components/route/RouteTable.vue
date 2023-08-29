<template>
  <v-data-table
    loading-text="Loading... Please wait"
    :headers="headers"
    :items="getDessertList"
    :items-per-page="5"
    class="elevation-1"
  >
    <template v-slot:[`item.id`]="{ item }">
      <RouterUpdateModel
        :ref="'refAssignModel' + item.id"
        :modelName="data.assign_route.formName"
        :modelInputs="data.assign_route.formInputs"
        :docName="data.assign_route.docName"
        :successMsg="data.assign_route.successMsg"
        :errorMsg="data.assign_route.errorMsg"
        :type="'assign'"
        :id="item.id"
        :docItem="item"
        @refreshTable="refreshTable"
      />

      <v-btn
        color="black"
        dark
        @click="assignRoute('refAssignModel' + item.id)"
      >
        Assign Holts
      </v-btn>
      <!-- <div style="margin-top: 20px">
        <v-btn
          x-small
          color="primary"
          dark
          @click="editBus('refUpdateModel' + item.id)"
        >
          Edit
        </v-btn>
      </div> -->
    </template>
  </v-data-table>
</template>
<script>
import RouterUpdateModel from "./RouterUpdateModel.vue";
import { getDocumentById } from "../../assets/firebase/firebase";
export default {
  components: { RouterUpdateModel },
  props: [
    "desserts",
    "headers",
    "isLoading",
    "columns",
    "data",
    "successDelMsg",
    "errorDelMsg",
  ],
  data: () => ({
    route: "",
    dessertList: null,
  }),
  computed: {
    getDessertList() {
      return this.desserts.map((q) => {
        return {
          ...q,
          end: setTimeout(() => {
            this.getHoltName(q.end);
          }, 1000),
          start: setTimeout(() => {
            this.getHoltName(q.start);
          }, 1000),
        };
      });
    },
  },
  methods: {
    async getHoltName(id) {
      let name = null;
      await getDocumentById(
        "busHolts",
        id,
        (data) => {
          name = data.data().holt_name;
        },
        (e) => {
          console.log(e);
        }
      );
      return name;
    },
    setColor(status) {
      if (status == "yes") return "warning";
      else return "green";
    },
    assignRoute(refAssignModel) {
      this.$refs[refAssignModel].openModel();
    },
    editBus(refUpdateModel) {
      this.$refs[refUpdateModel].openModel();
    },
    deleteItem(id) {
      console.log(id);
    },
    refreshTable() {
      this.$emit("refreshTable");
    },
    checkColumns(columns) {
      return columns.includes(columns);
    },
  },

  mounted() {
    console.log(this.getDessertList, "this.desserts");
    this.route = this.$route.name;
  },
};
</script>
