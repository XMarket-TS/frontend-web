<template>
  <v-dialog transition="dialog-top-transition" max-width="40%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on" large>Guardar</v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>
          Esta seguro de guardar el producto?
        </v-toolbar>
      
        <!-- <v-card-text>
          <div class="text-h2 pa-12">Hello world!</div>
        </v-card-text> -->
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
  data: () => ({
    uploadingData: false,
  }),
  methods: {
    confirmed(dialog) {
      this.uploadingData = true;
      setInterval(() => {
        this.uploadingData = false;
        dialog.value = false;
        this.$emit("confirmed", "");
      }, 3000);
    },
  },
};
</script>

<style>
</style>