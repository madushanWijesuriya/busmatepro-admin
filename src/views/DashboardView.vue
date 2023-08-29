<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col
        
        cols="12"
        sm="4"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
        <h3 class="text-center">Daily driver registration</h3>

        <div class="d-flex justify-center mb-6 bg-surface-variant chart-container">
          <BusRegistrationChart/>
        </div>
        </v-card>
      </v-col>
      <v-col
        
        cols="12"
        sm="4"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
        <h3 class="text-center">Active buses</h3>
        <div class="chart-container">
          <ActiveBusChart/>
        </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BusRegistrationChart from '../components/charts/BusRegistrationChart';
import ActiveBusChart from '../components/charts/ActiveBusChart';

export default {
  name: "LineChart",
  components: {
    BusRegistrationChart,
    ActiveBusChart
  },
  data() {
    return {
      
    };
  },
  computed: {
    
  },
  methods: {
 
  },
  mounted() {
    
  },
};
</script>

<style>
.chart-container{
  height: 220px;
}
</style>
