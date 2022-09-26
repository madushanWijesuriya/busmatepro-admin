<template>
  <CreateModel
    ref="refCreateModel"
    :modelName="formName"
    :modelInputs="formInputs"
    :docName="'userProfile'"
    :successMsg="'New Driver is added successfuly'"
    :errorMsg="'Cannot Add new bus'"
  />
</template>
<script>
import CreateModel from "../common/CreateModel.vue";
import { getAllDocuments } from "../../assets/firebase/firebase";

export default {
  components: {
    CreateModel,
  },
  data: () => ({
    formAction: {},
    formName: "Add New Driver",
    formInputs: [
      {
        type: "text",
        label: "First Name",
        name: "first_name",
        required: true,
        place_holder: "Enter First Name",
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
        type: "text",
        label: "Last Name",
        name: "last_name",
        required: true,
        place_holder: "Enter Last Name",
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
        type: "text",
        label: "Phone Number",
        name: "mobile_number",
        required: true,
        place_holder: "Enter Driver Phone Number",
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
        label: "Bus",
        name: "bus_id",
        required: true,
        options: [],
        place_holder: "Select Bus",
        rules: [(value) => !!value || "Required."],
      },
    ],
  }),
  methods: {
    getBuses() {
      getAllDocuments(
        "bus",
        (buses) => {
          buses.map((x) =>
            this.formInputs[3].options.push({
              state: x.bus_no,
              abbr: x.id,
            })
          );
        },
        (e) => {
          console.log(e);
        }
      );
    },
    openModel() {
      this.$refs.refCreateModel.openModel();
    },
    closeModel() {
      this.$refs.refCreateModel.closeModel();
    },
  },
  async created() {
    await this.getBuses();
  },
};
</script>
