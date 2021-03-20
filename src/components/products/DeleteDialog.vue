<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="350px">
      <v-card>
        <v-card-title class="headline">
          Estas seguro de operation el producto?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn color="primary" text @click="dialog = false">
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>