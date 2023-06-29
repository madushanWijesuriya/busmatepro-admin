<template>
  <RouterCreateModel
    ref="refCreateModel"
    :docName="'busRoutes'"
    :successMsg="'Added successfuly'"
    :errorMsg="'Failed to save'"
    @get-all-routes="getAllRoutes"
    :holtsOption="holtsOption"
  />
</template>
<script>
import RouterCreateModel from "./RouterCreateModel.vue";

export default {
  components: {
    RouterCreateModel,
  },
  props: {
    cities: null,
    holtsOption: null,
  },
  data: () => ({
    formAction: {},
  }),
  methods: {
    getAllRoutes() {
      this.$emit('get-routes-list')
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
