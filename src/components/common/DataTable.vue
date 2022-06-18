<template>
  <v-data-table
    loading-text="Loading... Please wait"
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"
  >
    <template
      v-if="columns.includes('available') && route == 'Bus'"
      v-slot:[`item.available`]="{ item }"
    >
      <v-chip :color="setColor(item.available)">
        {{ item.available }}
      </v-chip>
    </template>
    <template
      v-if="columns.includes('id') && route == 'Bus'"
      v-slot:[`item.id`]="{ item }"
    >
      <CreateModel
        ref="refCreateModel"
        :modelName="data.formName"
        :modelInputs="data.formInputs"
        :docName="data.docName"
        :successMsg="data.successMsg"
        :errorMsg="data.errorMsg"
        :type="'update'"
        :bus_id="item.id"
      />

      <div v-if="item.available != 'no' && item.available != 'yes'">
        <ConfirmAlert
          :id="item.id"
          :docName="data.docName"
          :successDelMsg="successDelMsg"
          @refreshTable="refreshTable"
        />
      </div>
      <v-btn
        v-if="item.available == 'no'"
        color="black"
        dark
        @click="assignRoute"
      >
        Assign Route
      </v-btn>

      <!-- <v-btn
        v-if="item.available == 'no'"
        color="warning"
        dark
        @click="assignRoute"
      >
        Assign Route
      </v-btn> -->
    </template>
  </v-data-table>
</template>
<script>
import CreateModel from "./CreateModel.vue";
import ConfirmAlert from "./ConfirmAlert.vue";
export default {
  components: { CreateModel, ConfirmAlert },
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
    assignRoute() {
      this.$refs.refCreateModel.openModel();
    },
    deleteItem(id) {
      console.log(id);
    },
    refreshTable() {
      this.$emit("refreshTable");
    },
  },

  mounted() {
    this.route = this.$route.name;
  },
};
</script>
