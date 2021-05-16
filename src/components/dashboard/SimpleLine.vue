<template>
  <JSCharting :options="options" class="simpleLine"></JSCharting>
</template>

<script>
import JSCharting from "jscharting-vue";
export default {
  components: {
    JSCharting,
  },
  data: () => ({
    options: {
      legend_visible: false,
      title_label_text: "Ventas generales por dia",
      yAxis: [
        { id: "mainY", formatString: "c" },
        {
          id: "secondY",
          scale_syncWith: "mainY",
          orientation: "opposite",
          line_color: "#e2e2e2",
          defaultTick: {
            enabled: false,
            gridLine_visible: false,
          },
        },
      ],
      xAxis: {
        crosshair_enabled: true,
        scale: { type: "time" },
      },
      defaultSeries: {
        type: "spline",
        defaultPoint_marker_visible: false,
      },
      series: [
        {
          name: "Purchases",
          points: [
            ["1/1/2020", 29.9],
            ["2/1/2020", 97.5],
            ["3/1/2020", 110.4],
            ["4/1/2020", 129.2],
            ["5/1/2020", 144.0],
            ["6/1/2020", 176.0],
            ["7/1/2020", 182.0],
            ["8/1/2020", 186.0],
            ["9/1/2020", 181.0],
            ["10/1/2020", 178.0],
            ["11/1/2020", 184.0],
            ["12/1/2020", 176.0],
          ],
        },
      ],
    },
  }),
};
</script>

<style>
</style>