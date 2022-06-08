<template>
  <CreateModel
    ref="refCreateModel"
    :modelName="formName"
    :modelInputs="formInputs"
    :docName="'bus routs'"
    :successMsg="'New bus routes is added successfuly'"
    :errorMsg="'Cannot add new bus routes'"
  />
</template>
<script>
import CreateModel from "../common/CreateModel.vue";

export default {
  components: {
    CreateModel,
  },
  props: {
    cities: null,
  },
  data: () => ({
    formAction: {},
    formName: "Add New Bus Routes",
    formInputs: [
      {
        type: "text",
        label: "Route Name",
        name: "name",
        required: true,
        place_holder: "Enter route name",
        rules: [
          (value) => !!value || "Required.",
          (value) => (value || "").length <= 40 || "Max 40 characters",
          // (value) => {
          //   const pattern =
          //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          //   return pattern.test(value) || "Invalid e-mail.";
          // },
        ],
      },
      {
        is_cities: true,
        type: "select",
        label: "Start Holt",
        name: "start",
        required: true,
        options: null,
        place_holder: "Please enter start holt of route",
        rules: [(value) => !!value || "Required."],
      },
      {
        is_cities: true,
        type: "select",
        label: "End Holt",
        name: "end",
        required: true,
        options: null,
        place_holder: "Please enter last holt of route",
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
  async created() {
    await this.formInputs.forEach((x) => {
      if (x.is_cities) {
        x.options = this.cities;
      }
    });
  },
};
</script>
