<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-alert text v-model="successUpload" type="success" dismissible>
          Producto agregado correctamente
        </v-alert>
        <v-alert text v-model="dialogDelete" type="success" dismissible>
          Producto eliminado correctamente
        </v-alert>
      </v-col>
      <v-col v-for="(product, i) in prods" :key="i" cols="12" sm="3">
        <Product
          :id="product.id"
          :images="product.images"
          :title="product.title"
          :price="product.price"
          :discount="product.discount"
          :description="product.description"
          @deleteProduct="filterProduct($event)"
        ></Product>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import products from "../external/products.json";
import Product from "../components/products/Product";
export default {
  components: {
    Product,
  },
  data: () => ({
    prods: null,
    dialogDelete: false,
    successUpload: false,
  }),

  beforeMount() {
    this.prods = products;
  },
  methods: {
    filterProduct(val) {
      // console.log(val);
      // axios
      this.prods = this.prods.filter((value) => {
        // console.log(value);
        if (value.id !== val) return value;
      });
      this.confirmDelete();
    },
    confirmDelete() {
      this.dialogDelete = true;
    },
  },
};
</script>

<style>
</style>