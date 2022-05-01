<template>
  <CreateModel
    ref="refCreateModel"
    :modelName="formName"
    :modelInputs="formInputs"
  />
</template>
<script>
import CreateModel from "../common/CreateModel.vue";

export default {
  components: {
    CreateModel,
  },
  data: () => ({
    formAction: {},
    formName: "Add New Bus",
    formInputs: [
      {
        type: "text",
        label: "Bus Number",
        name: "bus_no",
        required: true,
        place_holder: "Enter Bus Registration Number",
      },
      {
        type: "number",
        label: "No of Seats",
        name: "available_seats",
        required: true,
        place_holder: "Enter Number of Available Seats",
      },
      {
        type: "select",
        label: "Status",
        name: "available",
        required: true,
        options: ["yes", "no"],
        place_holder: "Select Status",
      },
    ],
  }),
  methods: {
    openModel() {
      this.$refs.refCreateModel.openModel();
    },
    closeModel() {
      this.$refs.refCreateModel.closeModel();
    },
  },
};
</script>
