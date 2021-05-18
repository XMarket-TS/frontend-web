<template>
  <div class="example">
    <apexchart
      height="350"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <!-- <div>
       <button @click="updateChart">Update!</button>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "BarExample",
  data: () => ({
    chartOptions: {
      xaxis: {
        categories: [],
      },
      
    },
    series: [
      {
        name: "series-1",
        data: [],
      },
    ],
  }),
  beforeCreate() {
    axios.get("/sales/total/branch").then((res) => {
      // console.log(res);
      const data = res.data;
      const branchs = [];
      const totals = [];
      for (let res in data) {
        let d = data[res];
        // console.log(d);
        branchs.push(d.branchName);
        totals.push(d.sale);
      }
      this.chartOptions.xaxis.categories = branchs;
      this.series[0].data = totals;
      // console.log(this.chartOptions.xaxis.categories);
      // console.log(this.series[0].data);
    });
  },
  methods: {
    updateChart() {
      const max = 90;
      const min = 20;
      const newData = this.series[0].data.map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      });
      const colors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];
      // Make sure to update the whole options config and not just a single property to allow the Vue watch catch the change.
      this.chartOptions = {
        colors: [colors[Math.floor(Math.random() * colors.length)]],
      };
      // In the same way, update the series option
      this.series = [
        {
          data: newData,
        },
      ];
    },
  },
};
</script>