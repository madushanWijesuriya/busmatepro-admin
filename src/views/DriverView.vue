<template>
  <v-container>
    <v-row justify="right">
      <v-col>
        <v-btn color="primary" dark @click="addRec"> Add New Driver </v-btn>
        <DriverCreate ref="refCreateDriver" />
      </v-col>
    </v-row>
    <br />
  </v-container>
</template>
<script>
import DriverCreate from "../components/driver/DriverCreate.vue";

export default {
  components: { DriverCreate },
  data: () => ({
    dialog: false,
  }),
  methods: {
    addRec() {
      this.$refs.refCreateBus.openModel();
    },
  },
};
</script>
