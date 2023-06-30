<template>
  <BusCreateModel
    ref="refCreateModel"
    :modelName="formName"
    :docName="'bus'"
    :successMsg="'Added successfuly'"
    :errorMsg="'Failed to save'"
    @get-all-buses="getBuses"
  />
</template>
<script>
import BusCreateModel from "../bus/BusCreateModel.vue";

export default {
  components: {
    BusCreateModel,
  },
  data: () => ({
    formAction: {},
  }),
  methods: {
    getBuses () {
      this.$emit('get-bus-list')
    },
    openModel() {
      this.$refs.refCreateModel.openModel();
    },
    closeModel() {
      this.$refs.refCreateModel.closeModel();
    },
  },
};
</script>
