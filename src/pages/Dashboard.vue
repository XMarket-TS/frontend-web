<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" sm="6">
        <v-card>
          <v-card-text>
            <simple-line></simple-line>
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
            <chart-data-grid></chart-data-grid>
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
            <circular-gauge></circular-gauge>
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
      <v-col cols="12" md="6" sm="6">
        <v-card>
          <v-card-text>
            <master-detail></master-detail>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SimpleLine from "@/components/dashboard/SimpleLine.vue";
import PointLine from "@/components/dashboard/PointLine.vue";
import ChartDataGrid from "@/components/dashboard/ChartDataGrid.vue";
import CircularColorBar from "@/components/dashboard/CircularColorBar.vue";
import CircularGauge from "@/components/dashboard/CircularGauge.vue";
import LiveData from "@/components/dashboard/LiveData.vue";
import MasterDetail from "@/components/dashboard/MasterDetail.vue";

export default {
  components: {
    SimpleLine,
    PointLine,
    ChartDataGrid,
    CircularColorBar,
    CircularGauge,
    LiveData,
    MasterDetail,
  },

  MasterDetaildata() {
    return {};
  },
};
</script>

<style>
.simpleLine {
  height: 400px;
}
</style>