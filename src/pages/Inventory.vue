<template>
  <v-container>
    <v-row>
      <v-col v-for="(product, i) in prods" :key="i" cols="12" sm="3">
        <Product
          :images="product.images"
          :title="product.title"
          :price="product.price"
          :discount="product.discount"
          :description="product.description"
        ></Product>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import products from "../external/products.json";
import Product from "../components/products/Product";
export default {
  data: () => ({
    prods: products,
  }),

  components: {
    Product,
  },
};
</script>

<style>
</style>