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
                <span style="color: red;" v-if="!input.valid && input.required">{{ input.validateMessage }}</span>
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
              :disable="isInvalidForm"
            />
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  <script>
  import AddButton from "../common/AddButton.vue";
  import CloseButton from "../common/CloseButton.vue";
  import FormInput from "../common/FormInput.vue";
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
      modelName: "Add New Bus Holt",
      modelInputs: [
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
        valid: true,
        validateMessage: 'This field is required'
      },
      {
        notCol: true,
        type: "text",
        label: "Latitude",
        name: "lat",
        required: true,
        place_holder: "Enter bus holt latitude",
        rules: [
          (value) => !!value || "Required.",
          (value) => (value || "").length <= 20 || "Max 20 characters",
          // (value) => {
          //   const pattern =
          //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          //   return pattern.test(value) || "Invalid e-mail.";
          // },
        ],
        valid: true,
        validateMessage: 'This field is required'
      },
      {
        notCol: true,
        type: "text",
        label: "langtitude",
        name: "lan",
        required: true,
        place_holder: "Enter bus holt langtitude",
        rules: [
          (value) => !!value || "Required.",
          (value) => (value || "").length <= 20 || "Max 20 characters",
          // (value) => {
          //   const pattern =
          //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          //   return pattern.test(value) || "Invalid e-mail.";
          // },
        ],
        valid: true,
        validateMessage: 'This field is required'
      },
      {
        type: "select",
        label: "Status",
        name: "available",
        required: true,
        options: ["yes", "no"],
        place_holder: "Select Status",
        rules: [(value) => !!value || "Required."],
        valid: true,
        validateMessage: 'This field is required'
      },
      ],
    }),
    props: {
      modelActions: null,
      docName: null,
      successMsg: null,
      errorMsg: null,
      id: null,
      type: null,
      docItem: null,
      additionalPayload: null,
    },
    computed: {
        isInvalidForm() {
            return this.modelInputs.filter(q => q.valid == false).length > 0
        }
    },
    methods: {
      async checkIfExists(payload, docName) {
        let value = null 
        await whereDoc(
          docName,
          'holt_name',
          "==",
          payload.holt_name,
          (data) => {
            value = data;
          },
          () => {}
        );
        return value
      },
      checkValidation(payload) {
        this.modelInputs[0].valid = true
        this.modelInputs[1].valid = true
        if(payload.holt_name == null ||  payload.holt_name == '') {
            this.modelInputs[0].validateMessage = 'This field is required'
            this.modelInputs[0].valid = false
        }
        if(payload.available == null ||  payload.available == '')
            this.modelInputs[1].valid = false   
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
        return { ...payload, ...this.additionalPayload, location: `{"lat": ${this.payload.lat}", "lng": ${this.payload.lan}}` };
      },
      makePayload() {
        //make payload
        this.$refs.refFormInput.forEach((input) => {
          if(!input.notCol)
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
        this.checkValidation(this.payload);
        if(this.isInvalidForm) {
            this.isLoading = false;
            this.$refs.refAddButton.checkLoading(this.isLoading);
        } else {

            let message = await this.checkIfExists(this.payload, this.docName);
            console.log(message, 'message');
            if(!message.length > 0) {
                await addDocument(this.payload, this.docName, 
                (response) => {
                    console.log(response, 'response');
                    this.isLoading = false;
                    this.$refs.refAddButton.checkLoading(this.isLoading);
                    this.$toast.success(this.successMsg);
                    this.$emit('get-all-drivers')
                },
                (error) => {
                    this.isLoading = false;
                    this.$refs.refAddButton.checkLoading(this.isLoading);
                    console.log(error);
                    this.$toast.error(this.errorMsg);
                });
                this.closeModel();
                this.resetAllInputs();
            } else {
                this.isLoading = false;
                this.$refs.refAddButton.checkLoading(this.isLoading);
                this.modelInputs[0].valid = false
                this.modelInputs[0].validateMessage = 'name is already used'
                this.$toast.error('Bus Holt already exists');
            }
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
  
















