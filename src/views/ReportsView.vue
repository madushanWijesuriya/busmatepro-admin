<template>
  <v-card>
    <v-toolbar color="purple" dark flat>
      <template v-slot:extension>
        <v-tabs v-model="tabs" centered>
          <v-tab v-for="n in reportName" :key="n">{{ n }} </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-card flat>
          <BusReport />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <ReviewReport />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <PassangerReport />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import BusReport from "../components/reports/BusReport.vue";
import PassangerReport from "../components/reports/PassangerReport.vue";
import ReviewReport from "../components/reports/ReviewReport.vue";

export default {
  components: { BusReport, PassangerReport, ReviewReport },

  data: () => ({
    reportName: [
      "Monthly Bus Report",
      "Monthly Passanger Report",
      "Monthly Review Report",
    ],
    tabs: null,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  }),
};
</script>
