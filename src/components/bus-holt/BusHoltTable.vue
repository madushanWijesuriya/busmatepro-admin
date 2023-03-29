<template>
  <v-data-table
    loading-text="loading-text"
    :headers="headers"
    :items="items"
    :items-per-page="page"
    class="elevation-1"
  >
    <template v-if="true" v-slot:[`item.action`]="{ item }">
      <v-btn @click="viewOnMap(item)"> View on Map </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  components: {},
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
    console.log(this.items);
  },
};
</script>
