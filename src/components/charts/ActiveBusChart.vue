<template>
    <DoughnutChartGenerator
    id="my-chart-id"
    :options="chartOptions"
    :data="chartDataSet"
    :key="counter"
    :style="chartStyle"
    />
</template>

<script>
import { Doughnut as DoughnutChartGenerator } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  ArcElement
} from "chart.js";

import {whereGetCount} from '../../assets/firebase/firebase'
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  ArcElement
);

export default {
  name: "LineChart",
  components: {
    DoughnutChartGenerator,
  },
  chartStyle: {
  },
  data() {
    return {
      counter: 0,
      chartData1: {
        labels: ['Available', 'Not available'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651'],
            data: []
          }
        ]
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
    async getActiveBusChartData(value) {
      await whereGetCount(
          'bus',
          'available',
          "==",
          value,
          (count)  => {
            this.chartData1.datasets[0].data.push(count)
            this.counter++
          },
          () => {}
        );
    }
  },
  async mounted() {
    await this.getActiveBusChartData('yes');
    await this.getActiveBusChartData('no');
  },
};
</script>