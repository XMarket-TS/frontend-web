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
          Esta seguro de guardar el producto?
        </v-toolbar>

        <!-- <v-card-text>
          <div class="text-h2 pa-12">Hello world!</div>
        </v-card-text> -->
        <v-card-text>
          <Product
            :images="imagesUrl"
            :title="name"
            :price="price"
            :discount="discount"
            :description="description"
            :category="category"
          ></Product>
        </v-card-text>
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
import Product from "./Product.vue";

export default {
  components: {
    Product,
  },
  props: {
    name: {
      type: String,
      default: "NO_TITLE",
    },
    price: {
      type: Number,
      default: 0.0,
    },
    discount: {
      type: Number,
      default: 0.0,
    },
    description: {
      type: String,
      default: "NO_DESCRIPTION",
    },
    category: {
      type: String,
      default: "NO_CATEGORY",
    },
    imagesUrl: {
      type: Array,
      default: () => [],
    },
  },
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