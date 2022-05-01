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
              v-for="input in modelInputs"
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
        <div>
          <v-btn
            color="blue darken-1"
            text
            @click="createBus"
            :disabled="!isLoading ? false : true"
          >
            Save
            <LoadingSpinner :isLoading="isLoading" />
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import LoadingSpinner from "./LoadingSpinner.vue";
import CloseButton from "./CloseButton.vue";
import FormInput from "./FormInput.vue";
import { addDocument } from "../../assets/firebase/firebase";
export default {
  components: {
    LoadingSpinner,
    CloseButton,
    FormInput,
  },
  data: () => ({
    isLoading: false,
    drawer: null,
    dialog: false,
    closeBtnName: "Close",
    SaveBtnName: "Save",
    styleObject: {
      color: "red",
    },
    payload: {},
  }),
  props: {
    modelName: null,
    modelInputs: null,
    modelActions: null,
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
    async createBus() {
      this.isLoading = true;

      await this.$refs.refFormInput.forEach((input) => {
        this.payload[input._props.input.name] = input.model.value;
      });

      await addDocument(
        this.payload,
        "bus",
        () => {
          this.isLoading = false;
          this.$toast.success("New Bus is added successfuly");
        },
        (error) => {
          this.isLoading = false;

          console.log(error);
          this.$toast.error("Cannot Add new bus");
        }
      );
      this.closeModel();
    },
  },
};
</script>
