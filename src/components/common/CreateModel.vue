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
          <AddButton
            ref="refAddButton"
            @AddClick="createBus"
            :name="SaveBtnName"
          />
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import AddButton from "./AddButton.vue";
import CloseButton from "./CloseButton.vue";
import FormInput from "./FormInput.vue";
import { addDocument } from "../../assets/firebase/firebase";
export default {
  components: {
    AddButton,
    CloseButton,
    FormInput,
  },
  data: () => ({
    errors: null,
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
    docName: null,
    successMsg: null,
    errorMsg: null,
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
    payloadValidate(payload) {
      this.$refs.refAddButton.checkValidation(payload);
    },
    async createBus() {
      this.isLoading = true;
      this.$refs.refAddButton.checkLoading(this.isLoading);
      //make payload
      await this.$refs.refFormInput.forEach((input) => {
        this.payload[input._props.input.name] = input.model.value;
      });

      //save on firebase
      await addDocument(
        this.payload,
        this.docName,
        () => {
          this.isLoading = false;
          this.$refs.refAddButton.checkLoading(this.isLoading);
          this.$toast.success(this.successMsg);
        },
        (error) => {
          this.isLoading = false;
          this.$refs.refAddButton.checkLoading(this.isLoading);
          console.log(error);
          this.$toast.error(this.errorMsg);
        }
      );
      this.closeModel();
      this.resetAllInputs();
    },
  },
};
</script>
