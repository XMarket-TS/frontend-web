<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <div class="home">
          <v-btn @click="newManager">Add new Manager</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    newManager() {
      this.$router.push({ name: "NewMarket" });
    },
  },
};
</script>
