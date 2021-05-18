<template>
  <div>
    <v-card-title>Productos vendidos por mes</v-card-title>
    <apexchart
      width="500"
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
export default {
  name: "BarExample",
  data: function () {
    return {
      chartOptions: {
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        xaxis: {
          categories: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ],
        },
      },
      series: [
        {
          name: "series-1",
          data: [
            1883,
            3272,
            2115,
            3183,
            3345,
            2415,
            2283,
            2077,
            2658,
            1934,
            2200,
            2793,
          ],
        },
      ],
    };
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