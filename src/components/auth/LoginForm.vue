<template>
  <v-container>
    <v-row v-for="input in formInput" :key="input.name">
      <v-col>
        <FormInput ref="refFormInput" :input="input" />
      </v-col>
    </v-row>
    <div>
      <AddButton ref="refAddButton" @AddClick="login" :name="submitBtnName" />
    </div>
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
    async login() {
      await this.$refs.refFormInput.forEach((input) => {
        this.payload[input._props.input.name] = input.model.value;
      });
      const user = await firebaseLogin(
        this.payload.email,
        this.payload.password
      );
      if (user && this.$store.state.user) {
        route.push("/buses");
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
