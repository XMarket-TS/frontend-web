<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <div class="home">
          <v-btn @click="newMarket">Agregar nueva Sucursal</v-btn>

          <br />
          <v-btn @click="newManager">Agregar nuevo Manager</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import axios from 'axios';
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {},
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
