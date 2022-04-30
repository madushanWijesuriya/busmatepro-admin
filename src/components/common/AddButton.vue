<template>
  <v-btn color="blue darken-1" text @click="dialog = false">
    {{ name }}
  </v-btn>
</template>
<script>
export default {
  props: {
    name: null,
    dialog: false,
  },
};
</script>
