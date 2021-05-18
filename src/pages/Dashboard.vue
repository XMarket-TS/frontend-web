<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <simple-line :options="options"></simple-line>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" sm="6">
        <v-card>
          <v-card-text>
            <SalesColumn></SalesColumn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" sm="6">
        <v-card>
          <v-card-text>
            <PointLine></PointLine>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" sm="6">
        <v-card>
          <v-card-text>
            <circular-color-bar></circular-color-bar>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" sm="6">
        <v-card>
          <v-card-text>
            <live-data></live-data>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <master-detail></master-detail>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <TotalColumns></TotalColumns>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SimpleLine from "@/components/dashboard/SimpleLine.vue";
import PointLine from "@/components/dashboard/PointLine.vue";
import CircularColorBar from "@/components/dashboard/CircularColorBar.vue";
import LiveData from "@/components/dashboard/LiveData.vue";
import MasterDetail from "@/components/dashboard/MasterDetail.vue";
import TotalColumns from "@/components/dashboard/TotalColumns.vue";
import SalesColumn from "@/components/dashboard/SalesColumn.vue";
import axios from "axios";

export default {
  components: {
    SimpleLine,
    PointLine,
    CircularColorBar,
    LiveData,
    MasterDetail,
    TotalColumns,
    SalesColumn,
  },
  data: () => ({
    options: {
      legend: {
        position: "inside top right",
      },
      title_label_text: "Ventas generales por dia",
      yAxis: [
        { id: "mainY", formatString: "c" },
        {
          id: "secondY",
          scale_syncWith: "mainY",
          orientation: "opposite",
          line_color: "#e2e2e2",
        },
      ],
      defaultSeries: {
        type: "spline",
        defaultPoint_marker_visible: false,
      },
      series: [
        {
          name: "Purchases",
          points: [],
        },
      ],
    },
  }),
  mounted() {
    axios.get("sales/daily/products").then((res) => {
      this.options.series[0].points = [];
      const data = res.data;
      for (let res in data) {
        let d = data[res];
        this.options.series[0].points.push([d.buyDate, d.amount]);
      }
    });
  },
};
</script>

<style>
.simpleLine {
  height: 400px;
}
</style>