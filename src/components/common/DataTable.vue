<template>
  <div v-if="route == 'Bus'">
    <v-data-table
      loading-text="Loading... Please wait"
      :headers="headers"
      :items="rows"
      :items-per-page="5"
      class="elevation-1"
    >
      <template
        v-if="route == 'Bus' && checkColumns('available')"
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
        <!-- route assign -->
        <CreateModel
          :ref="'refUpdateModel' + item.id"
          :modelName="data.update.formName"
          :modelInputs="data.update.formInputs"
          :docName="data.update.docName"
          :successMsg="data.update.successMsg"
          :errorMsg="data.update.errorMsg"
          :type="'update'"
          :id="item.id"
          :docItem="item"
          @refreshTable="refreshTable"
        />
        <!-- route assign -->
        <!-- edit bus -->
        <CreateModel
          :ref="'refAssignModel' + item.id"
          :modelName="data.assign_route.formName"
          :modelInputs="data.assign_route.formInputs"
          :docName="data.assign_route.docName"
          :successMsg="data.assign_route.successMsg"
          :errorMsg="data.assign_route.errorMsg"
          :type="'update'"
          :id="item.id"
          @refreshTable="refreshTable"
        />

        <!-- edit bus -->
        <div v-if="item.available != 'no' && item.available != 'yes'">
          <ConfirmAlert
            :id="item.id"
            :docName="data.assign_route.docName"
            :successDelMsg="successDelMsg"
            @refreshTable="refreshTable"
          />
        </div>
        <v-btn
          v-if="item.available == 'no'"
          color="black"
          dark
          @click="assignRoute('refAssignModel' + item.id)"
        >
          Assign Route
        </v-btn>
        <v-btn
          color="primary"
          dark
          @click="editBus('refUpdateModel' + item.id)"
        >
          Edit
        </v-btn>
      </template>
    </v-data-table>
  </div>
  <div v-else-if="route == 'BusHolt'">
    <BusHoltTable
      loading-text="Loading... Please wait"
      :headers="headers"
      :items="rows"
      :page="5"
      class="elevation-1"
    />
  </div>
  <div v-else>
    <v-data-table
      loading-text="Loading... Please wait"
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>
<script>
import CreateModel from "./CreateModel.vue";
import ConfirmAlert from "./ConfirmAlert.vue";
import BusHoltTable from "../bus-holt/BusHoltTable.vue";
export default {
  components: { CreateModel, ConfirmAlert, BusHoltTable },
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
  computed: {
    rows() {
      return this.desserts;
    },
  },
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
      console.log(this.columns);
      return this.columns.includes(column);
    },
  },

  mounted() {
    this.route = this.$route.name;
    console.log(this.desserts);
  },
};
</script>
