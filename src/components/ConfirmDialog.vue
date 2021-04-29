<template>
  <v-container>
    <div class="text-center">
      <v-bottom-sheet v-model="sheet" inset persistent>
        <template v-slot:activator="{ on }">
          <v-switch color="orange" v-on="on">
            Open dialog
          </v-switch>
        </template>
        <v-sheet class="text-center" height="200px">
          <v-btn class="mt-6" color="primary" @click="confirmDialog()">
            Confirmar
          </v-btn>

          <v-btn class="mt-6" text color="error" @click="sheet = !sheet">
            Cancelar
          </v-btn>
          <div class="my-3" v-text="text"></div>
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </v-container>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "Are you sure?",
    },
  },
  data: () => ({
    sheet: false,
  }),
  methods: {
    confirmDialog() {
      this.sheet = !this.sheet;

    },
  },
};
</script>

<style>
</style>