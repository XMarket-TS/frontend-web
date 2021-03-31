<template>
  <v-app-bar app color="primary" dark absolute>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="../assets/logo_market.png"
        transition="scale-transition"
        width="100"
      />
    </div>

    <v-spacer></v-spacer>

    <v-btn to="/product/add" text>
      <v-icon>mdi-open-in-new</v-icon>
      Agregar producto
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style>
</style>