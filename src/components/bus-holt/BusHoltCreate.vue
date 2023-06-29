<template>
  <BusHoltCreateModel
    ref="refCreateModel"
    :modelName="formName"
    :modelInputs="formInputs"
    :docName="'busHolts'"
    :successMsg="'Added successfuly'"
    :errorMsg="'Failed to save'"
    @get-all-busholts="getBusHolts"
  />
</template>
<script>
import BusHoltCreateModel from "./BusHoltCreateModel.vue";

export default {
  components: {
    BusHoltCreateModel,
  },
  data: () => ({
    formAction: {},
    
  }),
  methods: {
    getBusHolts () {
      this.$emit('get-busHolt-list')
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
