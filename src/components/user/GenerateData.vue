<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-text-field
        v-model="username"
        label="Usename"
        disabled
        outlined
        hint="El usuario se genera automaticamente"
        persistent-hint
        dense
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field
        v-model="password"
        label="Contraseña"
        disabled
        outlined
        hint="La contraseña se genera automaticamente"
        persistent-hint
        dense
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
</style>