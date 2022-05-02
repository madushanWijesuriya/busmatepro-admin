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
        rules: [
          (value) => !!value || "Required.",
          (value) => (value || "").length <= 20 || "Max 20 characters",
          // (value) => {
          //   const pattern =
          //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          //   return pattern.test(value) || "Invalid e-mail.";
          // },
        ],
      },
      {
        type: "number",
        label: "No of Seats",
        name: "available_seats",
        required: true,
        place_holder: "Enter Number of Available Seats",
        rules: [
          (value) => !!value || "Required.",
          (value) => (value || "").length <= 2 || "Invalid Number",
          (value) =>
            Number.isInteger(Number(value)) ||
            "The value must be an integer number",
        ],
      },
      {
        type: "select",
        label: "Status",
        name: "available",
        required: true,
        options: ["yes", "no"],
        place_holder: "Select Status",
        rules: [(value) => !!value || "Required."],
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
