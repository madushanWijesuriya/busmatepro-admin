<template>
  <CreateModel ref="refCreateModel" :modelName="modelName" />
</template>
<script>
import CreateModel from "../common/CreateModel.vue";
export default {
  components: {
    CreateModel,
  },
  data: () => ({
    modelName: "Add New Bus",
  }),
  methods: {
    openModel() {
      this.$refs.refCreateModel.openModel();
    },
    closeModel() {
      this.$refs.refCreateModel.closeModel();
    },
  },
};
</script>
