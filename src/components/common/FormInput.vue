<template>
  <div>
    <label for="checkbox">{{ input.label }} </label
    ><span :style="styleObject">{{ input.required ? "*" : "" }}</span>
    <v-text-field
      v-if="input.type === 'text'"
      v-model="model.value"
      type="text"
      :required="input.required ? true : false"
      :placeholder="input.place_holder ? input.place_holder : null"
      :rules="input.rules ? input.rules : null"
    ></v-text-field>
    <v-text-field
      v-if="input.type === 'number'"
      v-model="model.value"
      type="number"
      :required="input.required ? true : false"
      :placeholder="input.place_holder ? input.place_holder : null"
      :rules="input.rules ? input.rules : null"
    ></v-text-field>
    <v-select
      v-if="input.type === 'select'"
      v-model="model.value"
      :items="input.options"
      item-text="state"
      item-value="abbr"
      :required="input.required ? true : false"
      :placeholder="input.place_holder ? input.place_holder : null"
      :rules="input.rules ? input.rules : null"
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
      model: {
        value: null,
      },
    };
  },
  methods: {
    resetInput() {
      this.model.value = null;
    },
  },
};
</script>
