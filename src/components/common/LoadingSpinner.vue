<template>
  <v-progress-circular
    v-if="isLoading"
    indeterminate
    color="primary"
  ></v-progress-circular>
</template>
<script>
export default {
  data: () => ({}),
  props: ["isLoading"],
};
</script>
