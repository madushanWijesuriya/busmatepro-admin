<template>
  <div>
    <v-btn
      :color="!color ? color : 'blue darken-1'"
      text
      @click="$emit('refreshTable'), $emit('AddClick')"
      :disabled="!isLoading ? false : true"
      :style="{ color: bgColor}"
    >
      <LoadingSpinner :isLoading="isLoading" />

      {{ name }}
    </v-btn>
  </div>
</template>
<script>
import LoadingSpinner from "./LoadingSpinner.vue";

export default {
  components: { LoadingSpinner },
  data: () => ({
    isLoading: false,
  }),
  props: {
    name: null,
    color: null,
    bgColor: null
  },
  methods: {
    checkLoading(isLoading) {
      this.isLoading = isLoading;
    },
  },
};
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
