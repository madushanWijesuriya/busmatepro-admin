<template>
  <DriverCreateModel
    ref="refCreateModel"
    :modelName="formName"
    :modelInputs="formInputs"
    :docName="'userProfile'"
    :successMsg="'Added successfuly'"
    :errorMsg="'Failed to save'"
    :additionalPayload="{ type: 'driver' }"
    :busesOptions="busesOptions"
    @get-all-drivers="getAllDrivers"

  />
</template>
<script>
import DriverCreateModel from "./DriverCreateModel.vue";

export default {
  components: {
    DriverCreateModel,
  },
  data: () => ({
    formAction: {},
  }),
  props: {
    busesOptions: []
  },
  methods: {
    getAllDrivers() {
      this.$emit('get-drivers-list')
    },
    openModel() {
      this.$refs.refCreateModel.openModel();
    },
    closeModel() {
      this.$refs.refCreateModel.closeModel();
    },
  },
  async created() {
  },
};
</script>
