<template>
  <v-data-table
    loading-text="Loading... Please wait"
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"
  >
    <template
      v-if="columns.includes('action')"
      v-slot:[`item.action`]="{ item }"
    >
      <!-- route assign -->
      <BusHoltUpdateModel
        :ref="'refUpdateModel' + item.id"
        :modelName="data.update.formName"
        :modelInputs="data.update.formInputs"
        :docName="'busHolts'"
        :successMsg="'Successfully Updated'"
        :errorMsg="'Failed to update'"
        :id="item.id"
        :docItem="item"
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

      <div style="margin-top: 20px">
        <v-btn
          x-small
          color="primary"
          dark
          @click="editBus('refUpdateModel' + item.id)"
        >
          Edit
        </v-btn>
      </div>
    </template>
    <template v-slot:[`item.review`]="{ item }">
      <RatingCol
        :item="item"
        @showReviews="showReviews('refReviewModel' + item.id, item.id)"
      />
    </template>
  </v-data-table>
</template>
<script>
import BusHoltUpdateModel from "./BusHoltUpdateModel.vue";
import ConfirmAlert from "../common/ConfirmAlert.vue";
import RatingCol from "../common/RatingCol.vue";

export default {
  components: { BusHoltUpdateModel , ConfirmAlert, RatingCol },
  props: [
    "desserts",
    "headers",
    "isLoading",
    "columns",
    "successDelMsg",
    "errorDelMsg",
  ],
  data: () => ({
    route: "",
    data: {
      assign_route: {
        successMsg: "Success",
        errorMsg: "Error",
        docName: "busHolts",
        formName: "Assign a Route",
        formInputs: [
          {
            type: "select",
            label: "Routes",
            name: "route_id",
            required: true,
            options: [],
            place_holder: "Select Status",
            rules: [(value) => !!value || "Required."],
          },
        ],
      },
      update: {
        successMsg: "Successfully Update",
        errorMsg: "Error",
        docName: "busHolts",
        formName: "Update Bus",
        formInputs: [
          
        ],
      },
    }
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
    showReviews(refReviewModel, id) {
      this.$refs[refReviewModel].openModel(id);
    },
  },

  mounted() {
    this.route = this.$route.name;
    console.log(this.desserts);
  },
};
</script>
