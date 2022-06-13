<template>
  <v-row justify="center">
    <v-col cols="4" md="4">
      <v-row>
        <v-col> </v-col>
        <v-col
          ><v-img max-height="200" max-width="200" :src="'login.png'"></v-img
        ></v-col>
        <v-col> </v-col>
      </v-row>

      <v-card elevation="2">
        <div :style="{}">
          <LoginForm />
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import LoginForm from "../components/auth/LoginForm.vue";
export default {
  data: () => ({}),
  components: { LoginForm },
};
</script>
