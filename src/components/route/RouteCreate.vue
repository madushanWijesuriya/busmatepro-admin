<template>
  <CreateModel
    ref="refCreateModel"
    :modelName="formName"
    :modelInputs="formInputs"
    :docName="'busRoutes'"
    :successMsg="'New busRoutes is added successfuly'"
    :errorMsg="'Cannot add new busRoutes'"
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
    holtsOption: null,
  },
  data: () => ({
    formAction: {},
    formName: "Add New busRoutes",
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
    console.log(this.holtsOption, "this.holtsOption");
    this.formInputs[1].options = this.holtsOption;
    this.formInputs[2].options = this.holtsOption;
    // await this.formInputs.forEach((x) => {
    //   if (x.is_cities) {
    //     x.options = this.cities;
    //   }
    // });
    console.log(this.formInputs);
  },
};
</script>
