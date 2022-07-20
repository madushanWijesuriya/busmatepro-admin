<template>
  <v-data-table
    loading-text="Loading... Please wait"
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"
  >
    <template v-slot:[`item.id`]="{ item }">
      <CreateModel
        :ref="'refAssignModel' + item.id"
        :modelName="data.assign_route.formName"
        :modelInputs="data.assign_route.formInputs"
        :docName="data.assign_route.docName"
        :successMsg="data.assign_route.successMsg"
        :errorMsg="data.assign_route.errorMsg"
        :type="'assign'"
        :id="item.id"
        @refreshTable="refreshTable"
      />

      <v-btn
        color="black"
        dark
        @click="assignRoute('refAssignModel' + item.id)"
      >
        Assign Holts
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import CreateModel from "../common/CreateModel.vue";
export default {
  components: { CreateModel },
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
  }),
  methods: {
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
    this.route = this.$route.name;
  },
};
</script>
