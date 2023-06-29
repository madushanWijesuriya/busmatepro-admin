<template>
  <v-container>
    <v-row v-for="input in formInput" :key="input.name">
      <v-col>
        <FormInput ref="refFormInput" :input="input" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
      <AddButton ref="refAddButton" @AddClick="register" :name="regBtnName" />
    </v-col>
    </v-row>
  </v-container>
</template>
<script>
import FormInput from "../common/FormInput.vue";
import AddButton from "../common/AddButton.vue";
import { firebaseRegister } from "../../assets/firebase/auth";
import route from "../../router/router";

export default {
  components: { FormInput, AddButton },
  data: () => ({
    payload: {},
    regBtnName: "Register",
    formInput: [
      {
        isLogin: true,
        type: "text",
        label: "Email",
        name: "email",
        required: true,
        place_holder: "Email",
        rules: [
          (value) => !!value || "Required.",
          (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
        ],
      },
      {
        isLogin: true,
        type: "password",
        label: "Password",
        name: "password",
        required: true,
        place_holder: "Password",
        rules: [
          (value) => !!value || "Required.",
          (value) => (value || "").length >= 8 || "Min 8 characters",
        ],
      },
      {
        isLogin: true,
        type: "password",
        label: "Confirm Password",
        name: "password_confirm",
        required: true,
        place_holder: "Password",
        rules: [
          (value) => !!value || "Required.",
          (value) => (value || "").length >= 8 || "Min 8 characters",
        ],
      },
    ],
  }),
  methods: {
    async register() {
      await this.$refs.refFormInput.forEach((input) => {
        this.payload[input._props.input.name] = input.model.value;
      });

      if(this.payload.password_confirm === this.payload.password){
        await firebaseRegister( this.payload.email, this.payload.password,
          response => {
            if (response) {
              route.push("/buses");
            }
          },
          error => {
            if (error.code == 'auth/user-not-found') {
              this.$toast.error('User not found')
            }
          }
        );
      } else {
        this.$toast.error('Invalid password')
      }
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
