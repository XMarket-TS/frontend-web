<template>
  <v-container>
    <v-row>
      <v-col v-for="(product, i) in prods" :key="i" cols="12" sm="3">
        <Product
          :id="product.id"
          :images="product.images"
          :title="product.title"
          :price="product.price"
          :discount="product.discount"
          :description="product.description"
          @deleteProduct="deleteProduct($event)"
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
  }),

  beforeMount() {
    this.prods = products;
  },
  methods: {
    deleteProduct(val) {
      // console.log(val);
      // axios
      this.prods = this.prods.filter((value) => {
        // console.log(value);
        if (value.id !== val) return value;
      });
    },
  },
};
</script>

<style>
</style>