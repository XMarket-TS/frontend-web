<template>
  <v-container>
    <br />
    <v-card class="mx-auto" flat color="transparent">
      <v-row>
        <v-col cols="12">
          <v-expansion-panels accordion>
            <v-expansion-panel>
              <v-alert text v-model="successChanged" type="success" dismissible>
                El cambio fue correcto
              </v-alert>
            </v-expansion-panel>
          </v-expansion-panels>

          <branches-table @changed="successChange"></branches-table>
        </v-col>
      </v-row>
    </v-card>
    <v-col cols="12"></v-col>
  </v-container>
</template>

<script>
// import axios from 'axios';
import { mapState } from "vuex";
import BranchesTable from "../components/admin/BranchesTable.vue";
export default {
  name: "Home",
  data: () => ({
    successChanged: false,
  }),
  components: {
    BranchesTable,
  },
  computed: { ...mapState(["user"]) },
  mounted() {
    console.log(this.user);
  },
  methods: {
    newMarket() {
      this.$router.push({ name: "NewMarket" });
    },
    newManager() {
      this.$router.push({ name: "NewManager" });
    },
    successChange() {
      this.successChanged = true;
    },
  },
};
</script>
