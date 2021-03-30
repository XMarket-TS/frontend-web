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
          <v-alert text v-model="dialogError" type="error" dismissible>
            Error al obtener los datos
          </v-alert>
        </v-col>
        <v-col v-for="(product, i) in prods" :key="i" cols="12" md="3" sm="4">
          <Product
            :category="product.category"
            :description="product.description"
            :images="[product.firstImage]"
            :title="product.name"
            :discount="product.percentage"
            :price="product.price"
            :buttons="true"
            :id="product.productId"
            @deleteProduct="filterProduct($event)"
          ></Product>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
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
    dialogError: false,
  }),
  methods: {
    filterProduct(val) {
      console.log(val);
      // axios
      axios
        .delete("product/" + val)
        .then((result) => {
          console.log(result, "then");
          if (result.status == 200) {
            this.prods = this.prods.filter((value) => {
              if (value.productId !== val) return value;
            });
            this.confirmDelete();
          } else if (result.status == 500) {
            this.dialogError = true;
          }
        })
        .catch((error) => {
          console.log(error, "catch");
          this.dialogError = true;
        });
    },
    confirmDelete() {
      this.dialogDelete = true;
    },
  },
  mounted() {
    axios
      .get("user/" + 1 + "/branchOffice/" + 1 + "/product")
      .then((res) => {
        // console.log(res);
        if (!res.status) {
          // Notify, there isnt data
          return;
        }
        const data = res.data;
        const prods = [];
        for (let key in data) {
          const user = data[key];
          prods.push(user);
        }
        console.log(prods);
        this.prods = prods;
        // this.email = users[0].email;
      })
      .catch((error) => console.error(error));
  },
};
</script>

<style>
</style>