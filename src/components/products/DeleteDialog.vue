<template>
  <v-dialog transition="dialog-top-transition" max-width="40%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="secondary" icon v-bind="attrs" v-on="on" large>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="delete" dark>
          ¿Esta seguro que desea eliminar el producto?
        </v-toolbar>

        <!-- <v-card-text>
          <div class="text-h2 pa-12">Hello world!</div>
        </v-card-text> -->

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="dialog.value = false">Cancelar</v-btn>
          <v-btn color="primary" :loading="confDel" @click="confirmed(dialog)">
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: -1,
    },
  },
  data: () => ({
    confDel: false,
  }),
  methods: {
    confirmed(dialog) {
      this.confDel = true;
      // setInterval(() => {
      this.confDel = false;
      dialog.value = false;
      this.$emit("confirmDeleteProduct", this.id);
      // }, 3000);
    },
  },
};
</script>

<style>
</style>