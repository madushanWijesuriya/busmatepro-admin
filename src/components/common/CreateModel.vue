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
              <FormInput
                ref="refFormInput"
                :modelValue="input.value"
                :input="input"
                :value="docItem"
              />
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
            v-if="type == 'update'"
            ref="refAddButton"
            @AddClick="updateBus"
            :name="SaveBtnName"
          />
          <AddButton
            v-else-if="type == 'assign'"
            ref="refAddButton"
            @AddClick="assignHolts"
            :name="SaveBtnName"
          />
          <AddButton
            v-else
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
import {
  addDocument,
  updateDocuments,
  whereDoc,
} from "../../assets/firebase/firebase";
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
    id: null,
    type: null,
    docItem: null,
    additionalPayload: null,
  },
  methods: {
    async checkIfExists(payload, docName) {
      let searchKey = null;
      let value = null;
      let message = "";
      if (docName == "bus") {
        searchKey = "bus_no";
        value = payload.bus_no;
        message = "Bus number must be unique!";
      }
      await whereDoc(
        docName,
        searchKey,
        "==",
        value,
        (data) => {
          if (!data.length > 0) message = null;
        },
        (e) => {
          console.log(e);
        }
      );
      return message;
    },
    checkValidation(payload, type) {
      if (type == "userProfile") {
        if (!payload.first_name) {
          return "First Name is required";
        } else if (payload.first_name.length > 10) {
          return "First name can only has 10 characters";
        } else if (!payload.last_name) {
          return "Last Name is required";
        } else if (payload.last_name.length > 10) {
          return "Last name can only has 10 characters";
        } else if (!payload.mobile_number) {
          return "Mobile number is required";
        } else if (payload.mobile_number.length != 10) {
          return "Invalid mobile number. Pelase enter a valid number";
        }
      }
    },
    openModel() {
      this.dialog = true;
    },
    closeModel() {
      this.dialog = false;
    },
    getDialog(dialog) {
      this.dialog = dialog;
      if (this.type != "update") this.resetAllInputs();
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
    decoratePayload(payload) {
      return { ...payload, ...this.additionalPayload };
    },
    makePayload() {
      //make payload
      this.$refs.refFormInput.forEach((input) => {
        this.payload[input._props.input.name] = input.model.value;
      });
      return this.payload;
    },
    async createBus() {
      this.isLoading = true;
      this.$refs.refAddButton.checkLoading(this.isLoading);

      //make payload
      this.payload = await this.makePayload();
      this.payload = await this.decoratePayload(this.payload);
      let response = this.checkValidation(this.payload, this.docName);
      if (response) {
        this.$toast.error(response);
        this.isLoading = false;
        this.$refs.refAddButton.checkLoading(this.isLoading);
      } else {
        let message = await this.checkIfExists(this.payload, this.docName);

        if (!message) {
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
        } else {
          this.$toast.error(message);
          this.isLoading = false;
          this.$refs.refAddButton.checkLoading(this.isLoading);
        }

        this.closeModel();
        this.resetAllInputs();
      }
      //save on firebase
    },

    async assignHolts() {
      this.isLoading = true;
      this.$refs.refAddButton.checkLoading(this.isLoading);

      //make payload
      this.payload = await this.makePayload();

      console.log(this.payload);
    },

    async updateBus() {
      this.isLoading = true;
      this.$refs.refAddButton.checkLoading(this.isLoading);

      //make payload
      await this.$refs.refFormInput.forEach((input) => {
        this.payload[input._props.input.name] = input.model.value;
      });
      //save on firebase
      await updateDocuments(
        this.payload,
        this.docName,
        this.id,
        () => {
          this.isLoading = false;
          this.$refs.refAddButton.checkLoading(this.isLoading);
          this.$toast.success(this.successMsg);
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
          this.$refs.refAddButton.checkLoading(this.isLoading);
          console.log(error);
          this.$toast.error(this.errorMsg);
        }
      );
      this.closeModel();
      this.$emit("refreshTable");
    },
  },
  mounted() {},
};
</script>
