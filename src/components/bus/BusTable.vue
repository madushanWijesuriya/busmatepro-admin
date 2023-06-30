<template>
  <v-data-table
    loading-text="Loading... Please wait"
    :headers="headers"
    :items="desserts"
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
      <ShowReview :ref="'refReviewModel' + item.id" />
      <!-- route assign -->
      <BusUpdateModel
        :ref="'refUpdateModel' + item.id"
        :modelName="data.update.formName"
        :modelInputs="data.update.formInputs"
        :docName="data.update.docName"
        :successMsg="data.update.successMsg"
        :errorMsg="data.update.errorMsg"
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

      <div style="margin-top: 20px">
        <v-btn
          v-if="item.available == 'no'"
          color="black"
          dark
          x-small
          @click="assignRoute('refAssignModel' + item.id)"
        >
          Assign Route
        </v-btn>
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
import CreateModel from "../common/CreateModel.vue";
import BusUpdateModel from "./BusUpdateModel.vue";
import ConfirmAlert from "../common/ConfirmAlert.vue";
import ShowReview from "../common/ShowReview.vue";
import RatingCol from "../common/RatingCol.vue";

export default {
  components: { BusUpdateModel ,CreateModel, ConfirmAlert, ShowReview, RatingCol },
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
        docName: "bus",
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
        docName: "bus",
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
