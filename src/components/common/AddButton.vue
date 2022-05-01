<template>
  <div>
    <v-btn color="blue darken-1" text @click="sendPayload">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      {{ name }}
    </v-btn>
  </div>
</template>
<script>
export default {
  props: {
    name: null,
    payload: null,
  },
  methods: {
    sendPayload() {
      this.$emit("passPayload", this.payload);
    },
  },
};
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
