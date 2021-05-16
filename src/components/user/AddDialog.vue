<template>
  <v-dialog transition="dialog-top-transition" max-width="50%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        v-bind="attrs"
        v-on="on"
        large
        @click="emitValidate"
        >Guardar</v-btn
      >
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title> Esta seguro de guardar los datos? </v-toolbar-title>
        </v-toolbar>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="dialog.value = false">Cancelar</v-btn>
          <v-btn
            color="primary"
            :loading="uploadingData"
            @click="confirmed(dialog)"
            >Confirmar</v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: {},
  data: () => ({
    uploadingData: false,
  }),

  methods: {
    confirmed(dialog) {
      dialog.value = false;
      this.$emit("confirmed", "");
    },
    emitValidate() {
      this.$emit("emitValidate", true);
    },
  },
};
</script>

<style>
</style>