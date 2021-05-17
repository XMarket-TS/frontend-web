<template>
  <v-container>
    <!-- <v-col cols="12">
      <confirm-dialog></confirm-dialog>
    </v-col> -->
    <v-expansion-panels inset>
      <v-expansion-panel>
        <v-toolbar color="primary">
          <v-toolbar-title class="white--text flex text-xs-center">
            Sucursales
          </v-toolbar-title>
        </v-toolbar>
      </v-expansion-panel>
      <v-expansion-panel v-for="(branch, i) in branchs" :key="i">
        <!-- :color="i % 2 == 0 ? 'primary' : 'secondary'" -->
        <v-expansion-panel-header>
          <v-row no-gutters>
            <v-col cols="12" md="1">
              <v-icon color="primary">mdi-map-marker</v-icon>
            </v-col>
            <v-col cols="12" md="4">
              <h2>
                {{ branch.name }}
              </h2>
            </v-col>
            <v-col
              cols="12"
              md="7"
              class="grey--text text-truncate hidden-sm-and-down"
            >
              <h3>
                {{ branch.zone }}
              </h3>
              <h4>
                <span style="font-weight: normal"> {{ branch.address }}</span>
              </h4>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <Branch
            :branchId="branch.branchOfficeId"
            :managerId="branch.managerId"
            :image="branch.image"
            :phone="branch.phone"
            :status="branch.status"
            @changed="changed"
          ></Branch>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import axios from "axios";
import Branch from "./Branch.vue";
export default {
  components: { Branch },
  data: () => ({
    branchs: [],
  }),
  mounted() {
    axios.get("/branchOffice/list/all").then((response) => {
      console.log(response);
      this.branchs = response.data;
    });
  },
  methods: {
    changed() {
      this.$emit("changed", null);
    },
  },
};
</script>

<style>
</style>