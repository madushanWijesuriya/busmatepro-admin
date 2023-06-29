<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title> {{ isInvalidForm }}
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
    // getAllDocuments,
    addDocument,
    updateDocuments,
    whereDoc,
    getAllDocuments
  } from "../../assets/firebase/firebase";
  export default {
    components: {
      AddButton,
      CloseButton,
      FormInput,
    },
    data: () => ({
      errors: null,
      holts: [],
      isLoading: false,
      drawer: null,
      dialog: false,
      closeBtnName: "Close",
      SaveBtnName: "Save",
      styleObject: {
        color: "red",
      },
      payload: {},
      modelName: "Add New Bus",
      modelInputs: [
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
        valid: true,
        validateMessage: 'This field is required'
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
        valid: true,
          validateMessage: 'This field is required'
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
      holtsOption: null
    },
    computed: {
        isInvalidForm() {
            return this.modelInputs.filter(q => q.valid == false).length > 0
        }
    },
    methods: {
    async getHolts() {
        await getAllDocuments(
            "busHolts",
            (routes) => {
                routes.map((x) =>
                this.holts.push({
                    state: x.holt_name,
                    abbr: x.id,
                })
                );
            },
            (e) => {
                console.log(e);
            }
        )
    },
      async checkIfExists(payload, docName) {
        let value = null 
        await whereDoc(
          docName,
          'name',
          "==",
          payload.name,
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
        this.modelInputs[2].valid = true
        if(payload.name == null ||  payload.name == '')
            this.modelInputs[0].valid = false
            this.modelInputs[0].validateMessage = 'This field is required'
        if(payload.start == null ||  payload.start == '')
            this.modelInputs[1].valid = false
        if(payload.end == null ||  payload.end == '')
            this.modelInputs[2].valid = false   
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
                    this.$emit('get-all-routes')
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
                this.modelInputs[0].validateMessage = 'This name is already used'
                this.$toast.error('Route already exists');

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
    mounted () {
        this.modelInputs[1].options = this.holtsOption
        this.modelInputs[2].options = this.holtsOption

    }
  };
  </script>
  