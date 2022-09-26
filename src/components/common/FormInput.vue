<template>
  <div>
    <label for="checkbox">{{ input.label }} </label
    ><span v-if="!input.isLogin" :style="styleObject">{{
      input.required ? "*" : ""
    }}</span>
    <v-text-field
      v-if="input.type === 'text'"
      v-model="model.value"
      :value="value ? value[input.name] : null"
      type="text"
      :required="input.required ? true : false"
      :placeholder="input.place_holder ? input.place_holder : null"
      :rules="input.rules ? input.rules : null"
    ></v-text-field>
    <v-text-field
      v-if="input.type === 'password'"
      v-model="model.value"
      :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="input.rules ? input.rules : null"
      :placeholder="input.place_holder ? input.place_holder : null"
      type="password"
      :required="input.required ? true : false"
      :name="input.name"
      :label="input.lable"
      :hint="input.hint"
      counter
      @click:append="passwordShow = !passwordShow"
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
      :multiple="input.multiple ? input.multiple : false"
    ></v-select>
  </div>
</template>
<script>
export default {
  props: {
    input: Object,
    value: null,
  },
  data() {
    return {
      passwordShow: false,
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
  created() {
    this.item = this.value;
    this.model.value = this.item[this.input.name]
      ? this.item[this.input.name]
      : null;
  },
  mounted() {
    console.log(this.value);
  },
};
</script>
