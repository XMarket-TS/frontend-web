<template>
  <v-container>
    <v-card class="mx-auto" elevation="8">
      <v-card-text class="text-end">
        <v-row>
          <v-col cols="12" md="9" sm="9">
            <v-text-field
              v-model="message"
              :append-outer-icon="message ? 'mdi-magnify' : ''"
              filled
              color="primary"
              clear-icon="mdi-close-circle"
              clearable
              label="Buscar"
              type="text"
              dense
              outlined
              hide-details
              @click:append="toggleMarker"
              @click:append-outer="sendMessage(message)"
              @click:clear="clearMessage"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="3">
            <v-btn color="primary" to="/product/add"> Nuevo producto </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <br />
    <v-card class="mx-auto" flat color="transparent">
      <v-row v-if="loading">
        <v-col cols="12">
          <LoaderProducts></LoaderProducts>
        </v-col>
      </v-row>
      <v-row dense v-else>
        <v-col cols="12">
          <v-alert text v-model="successUpload" type="success" dismissible>
            Producto agregado correctamente
          </v-alert>
          <v-alert v-model="dialogDelete" type="success" dismissible>
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
            @editProduct="redirectToProduct($event)"
            @deleteProduct="filterProduct($event)"
            @addOffer="createOffer($event)"
          ></Product>
        </v-col>
        <v-col cols="12">
          <v-pagination
            v-model="currentpage"
            :length="pages"
            :total-visible="7"
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left"
            @input="handlePageChange"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>


<script>
import axios from "axios";
import Product from "@/components/products/Product";
import LoaderProducts from "@/components/products/LoaderProducts";
import { mapState } from "vuex";

export default {
  name: "Inventory",
  components: {
    Product,
    LoaderProducts,
  },
  computed: { ...mapState(["user"]) },
  data: () => ({
    message: null,
    marker: true,
    iconIndex: 0,
    prods: null,
    dialogDelete: false,
    successUpload: false,
    dialogError: false,
    loading: true,
    pages: null,
    currentpage: 1,
  }),
  methods: {
    toggleMarker() {
      this.marker = !this.marker;
    },
    sendMessage() {
      this.loading = true;
      this.currentpage = 1;
      this.getAll();
      this.resetIcon();
    },
    clearMessage() {
      this.loading = true;
      this.message = null;
      this.getAll();
    },
    resetIcon() {
      this.iconIndex = 0;
    },
    filterProduct(val) {
      // console.log(val);
      axios
        .delete("product/" + val + "/delete")
        .then((result) => {
          console.log(result, "then");
          if (result.status === 200) {
            this.prods = this.prods.filter((value) => {
              if (value.productId !== val) return value;
            });
            this.confirmDelete();
          } else if (result.status === 500) {
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
    redirectToProduct(value) {
      // console.log(value);
      if (value > 0) {
        this.$router.push("product/edit/" + value);
      } else {
        this.$router.push({ name: "NotFound" });
      }
    },
    createOffer(value) {
      console.log(value);
      if (value > 0) {
        // this.$$router.pop();
        this.$router.push("product/offer/" + value + "/view");
      } else {
        this.$router.push({ name: "NotFound" });
      }
    },
    handlePageChange(value) {
      this.currentpage = value;
      this.loading = true;
      this.getAll();
    },
    getAll() {
      const params = {
        search: this.message,
        page: this.currentpage,
        size: 12,
      };
      axios
        .get("manager/" + this.user.personId + "/products", { params })
        .then((res) => {
          console.log(res);
          if (!res.status) {
            // Notify, there isnt data
            return;
          }
          const data = res.data.list;
          this.pages = res.data.pages;
          this.currentpage = res.data.pageNum;
          const prods = [];
          for (let key in data) {
            const user = data[key];
            prods.push(user);
          }
          // console.log(prods);
          this.prods = prods;
          // this.email = users[0].email;
        })
        .catch((error) => {
          console.error(error.response);
          this.$router.push({ name: "NotFound" });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getAll();
  },
};
</script>

<style>
</style>
