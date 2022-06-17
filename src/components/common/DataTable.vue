<template>
  <v-data-table
    loading-text="Loading... Please wait"
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"
  >
    <template v-slot:[`item.available`]="{ item }">
      <v-chip :color="setColor(item.available)" dark>
        {{ item.available }}
      </v-chip>
    </template>
  </v-data-table>
</template>
<script>
export default {
  props: ["desserts", "headers", "isLoading"],
  data() {
    return {};
  },
  methods: {
    setColor(status) {
      if (status == "yes") return "red";
      else return "green";
    },
  },
};
</script>
