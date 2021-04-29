<template>
  <v-container>
    <br />
    <v-card>
      <v-row>
        <v-col cols="12">
          <v-card-title>Sucursales</v-card-title>
          <branches-table></branches-table>
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
  },
};
</script>
