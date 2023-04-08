<template>
  <CreateModel
    ref="refCreateModel"
    :modelName="formName"
    :modelInputs="formInputs"
    :docName="'bus holts'"
    :successMsg="'New bus holt is added successfuly'"
    :errorMsg="'Cannot add new bus holt'"
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
    formName: "Add New Bus Holt",
    formInputs: [
      {
        type: "text",
        label: "Bus Holt Name",
        name: "holt_name",
        required: true,
        place_holder: "Enter bus holt name",
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
