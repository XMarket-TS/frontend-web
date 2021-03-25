<template>
  <v-card max-width="90%" class="mx-auto" flat>
    <v-card-text>
      <v-row dense>
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
            :id="product.productId"
            :images="product.imagesUrl"
            :title="product.name"
            :price="product.price"
            :discount="product.discount"
            :description="product.description"
            :category="product.category"
            :buttons="true"
            @deleteProduct="filterProduct($event)"
          ></Product>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
import products from "../external/products.json";
import Product from "../components/products/Product";
export default {
  name: "Inventory",
  components: {
    Product,
  },
  data: () => ({
    prods: null,
    dialogDelete: false,
    successUpload: false,
  }),
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
  mounted() {
    this.prods = products;
    axios
      .get("user/1/branchOffice/1/product")
      .then((res) => {
        console.log(res);
        // const data = res.data;
        // const users = [];
        // for (let key in data) {
        //   const user = data[key];
        //   user.id = key;
        //   users.push(user);
        // }
        // console.log(users);
        // this.email = users[0].email;
      })
      .catch((error) => console.warn(error));
  },
};
</script>

<style>
</style>