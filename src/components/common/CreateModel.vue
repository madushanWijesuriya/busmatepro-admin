<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ modelName }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="6"
              sm="6"
              md="6"
              v-for="input in formInputs"
              :key="input.name"
            >
              <FormInput ref="refFormInput" :input="input" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <small
                ><span :style="styleObject">*</span>indicates required
                field</small
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <CloseButton
          @closeModel="getDialog($event)"
          :closeButtonName="closeBtnName"
        />
        <v-btn color="blue darken-1" text @click="dialog = false"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import CloseButton from "./CloseButton.vue";
import FormInput from "./FormInput.vue";
export default {
  components: {
    CloseButton,
    FormInput,
  },
  data: () => ({
    drawer: null,
    dialog: false,
    closeBtnName: "Close",
    SaveBtnName: "Save",

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
    styleObject: {
      color: "red",
    },
  }),
  props: {
    modelName: null,
    modelInputs: {},
    modelActions: {},
  },
  methods: {
    openModel() {
      this.dialog = true;
    },
    closeModel() {
      this.dialog = false;
    },
    getDialog(dialog) {
      this.dialog = dialog;
      this.resetAllInputs();
    },
    resetAllInputs() {
      this.$refs.refFormInput.forEach((input) => {
        //clear all inputs
        input.resetInput();
      });
    },
  },
};
</script>
