<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>
<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Year",
          align: "center",
          sortable: false,
          value: "year",
        },
        {
          text: "Month",
          align: "center",
          sortable: false,
          value: "month",
        },
        { text: "Count", align: "center", value: "count" },
      ],
      desserts: [
        {
          year: "2023",
          month: 159,
          count: 6.0,
        },
        {
          year: "2022",
          month: 159,
          count: 6.0,
        },
        {
          year: "2021",
          month: 159,
          count: 6.0,
        },
        {
          year: "2020",
          month: 159,
          count: 6.0,
        },
        {
          year: "2019",
          month: 159,
          count: 6.0,
        },
        {
          year: "2018",
          month: 159,
          count: 6.0,
        },
        {
          year: "2017",
          month: 159,
          count: 6.0,
        },
        {
          year: "2016",
          month: 159,
          count: 6.0,
        },
        {
          year: "2015",
          month: 159,
          count: 6.0,
        },
        {
          year: "2014",
          month: 159,
          count: 6.0,
        },
      ],
    };
  },
};
</script>
