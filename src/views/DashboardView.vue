<template>
  <div>
    <h1>Daily driver register count chart</h1>

    <div class="d-flex justify-center mb-6 bg-surface-variant">
      <LineChartGenerator
        id="my-chart-id"
        :options="chartOptions"
        :data="chartDataSet"
        :key="counter"
      />
    </div>
  </div>
</template>

<script>
import { Line as LineChartGenerator } from "vue-chartjs";
import axios from "axios";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  name: "LineChart",
  components: {
    LineChartGenerator,
  },
  data() {
    return {
      counter: 0,
      chartData1: {
        labels: [],
        datasets: [],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
  computed: {
    chartDataSet() {
      return this.chartData1;
    },
  },
  methods: {
    getDailyDrivers() {
      axios
        .get("http://127.0.0.1:8000/api/getDailyDrivers")
        .then((response) => {
          this.chartData1.labels = response.data.labels;
          this.chartData1.datasets[0] = {
            data: response.data.data,
            label: "Drivers Count",
            backgroundColor: "#f87979",
          };
          this.counter++;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getDailyDrivers();
    console.log(this.chartData1, "this.chartData1");
  },
};
</script>
