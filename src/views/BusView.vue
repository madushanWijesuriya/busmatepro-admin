<template>
  <v-row justify="left">
    <v-btn color="primary" dark @click="addBus"> Open Dialog </v-btn>
    <BusCreate ref="refCreateBus" />
  </v-row>
</template>
<script>
import BusCreate from "../components/bus/BusCreate.vue";
export default {
  components: { BusCreate },
  data: () => ({
    dialog: false,
  }),
  methods: {
    addBus() {
      this.$refs.refCreateBus.openModel();
    },
  },
  created() {},
};
</script>
