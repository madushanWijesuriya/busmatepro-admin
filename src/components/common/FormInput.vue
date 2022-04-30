<template>
  <div>
    <label for="checkbox">{{ input.label }} </label
    ><span :style="styleObject">{{ input.required ? "*" : "" }}</span>
    <v-text-field
      v-if="input.type === 'text'"
      type="text"
      :required="input.required ? true : false"
      :placeholder="input.place_holder ? input.place_holder : null"
    ></v-text-field>
    <v-text-field
      v-if="input.type === 'number'"
      type="number"
      :required="input.required ? true : false"
      :placeholder="input.place_holder ? input.place_holder : null"
    ></v-text-field>
    <v-select
      v-if="input.type === 'select'"
      :items="input.options"
      :required="input.required ? true : false"
      :placeholder="input.place_holder ? input.place_holder : null"
    ></v-select>
  </div>
</template>
<script>
export default {
  props: {
    input: Object,
  },
  data() {
    return {
      styleObject: {
        color: "red",
      },
    };
  },
  created() {
    console.log(this.input.options);
  },
};
</script>
