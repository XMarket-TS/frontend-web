<template>
  <v-col cols="12">
    <v-alert text v-model="alertDialog" type="success" dismissible>
      <slot></slot>
    </v-alert>
  </v-col>
</template>

<script>
export default {
  props: {
    alertType: {
      type: String,
      default: "success",
    },
  },
  data: () => ({
    alertDialog: false,
  }),
};
</script>

<style>
</style>