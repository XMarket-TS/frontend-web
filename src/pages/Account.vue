<template>
  <v-container>
    {{ user }}
  </v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState(["user"]),
  },
  beforeCreate() {
    this.$store.dispatch("tryAutoLogin");
  },
};
</script>

<style>
</style>