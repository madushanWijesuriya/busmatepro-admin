<template>
  <v-container>
    <v-row v-for="input in formInput" :key="input.name">
      <v-col>
        <FormInput ref="refFormInput" :input="input" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
      <AddButton ref="refAddButton" @AddClick="login" :name="submitBtnName" />
    </v-col>
    <v-col>
      <!-- <AddButton :bgColor="'blue'" ref="refAddButton" @AddClick="register" :name="regBtnName" /> -->
    </v-col>
    </v-row>
  </v-container>
</template>
<script>
import FormInput from "../common/FormInput.vue";
import AddButton from "../common/AddButton.vue";
import { firebaseLogin } from "../../assets/firebase/auth";
import route from "../../router/router";

export default {
  components: { FormInput, AddButton },
  data: () => ({
    payload: {},
    submitBtnName: "Login",
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
    ],
  }),
  methods: {
    async register () {
      route.push('/register')
    },
    async login() {
      await this.$refs.refFormInput.forEach((input) => {
        this.payload[input._props.input.name] = input.model.value;
      });

      console.log(this.payload.email,
        this.payload.password);
      await firebaseLogin(
        this.payload.email,
        this.payload.password,
        response => {
          if (response) {
            route.push("/buses");
          }
        },
        error => {
          if (error.code == 'auth/user-not-found') {
            this.$toast.error('User not found')
          } else if (error.code == 'auth/wrong-password') {
            this.$toast.error('Wrong Password')
          }
        }
      );
      
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
