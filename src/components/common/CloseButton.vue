<template>
  <v-btn color="blue darken-1" text @click="passDialog">{{
    closeButtonName
  }}</v-btn>
</template>
<script>
export default {
  name: "closeBtn",
  props: ["closeButtonName"],
  methods: {
    passDialog() {
      const dialog = false;
      this.$emit("closeModel", dialog);
    },
  },
  created() {
    console.log(this.closeButtonName);
  },
};
</script>
