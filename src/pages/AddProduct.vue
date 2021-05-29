<template>
  <v-container>
    <v-card class="mx-auto" elevation="7">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Agregar nuevo producto</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="text-center">
        <v-row>
          <v-col cols="12" sm="5">
            <UploadImages
              :images="product.imagesUrl"
              @successUploaded="addImage($event)"
            />
          </v-col>
          <v-col cols="12" sm="7">
            <v-card width="95%" flat>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-row no-gutters>
                  <v-col cols="12" sm="7">
                    <v-text-field
                      v-model="product.name"
                      label="Nombre"
                      :rules="nameRules"
                      placeholder="Ej."
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col sm="1"></v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model.number="product.stock"
                      label="Stock"
                      :rules="stockRules"
                      suffix="u."
                      type="number"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col sm="4">
                    <v-text-field
                      v-model.number="product.price"
                      suffix="Bs."
                      label="Precio"
                      :rules="priceRules"
                      type="number"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col sm="1"></v-col>
                  <v-col sm="7">
                    <v-select
                      v-model="product.category"
                      :items="categories"
                      label="Categoria"
                      :rules="categoryRules"
                      outlined
                      dense
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="product.description"
                      label="Descripcion"
                      :rules="descriptionRules"
                      auto-grow
                      outlined
                      rows="3"
                      dense
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-form>
              <v-card-subtitle class="red--text">
                {{ errorsText }}
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-subtitle></v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" to="/products" large>Cancelar</v-btn>
        <!-- <v-btn color="primary" @click="retrieveData">Print</v-btn> -->
        <v-spacer></v-spacer>
        <AddDialog
          @confirmed="verifyData($event)"
          :name="product.name"
          :price="product.price"
          :discount="discount / 100"
          :description="product.description"
          :category="product.category"
          :imagesUrl="product.imagesUrl"
          @emitValidate="validateForm"
        />
        <v-spacer></v-spacer>
      </v-card-actions>
      <br />
    </v-card>
    <!--  -->
    <!--  -->
  </v-container>
</template>

<script>
import AddDialog from "../components/products/AddDialog.vue";
import UploadImages from "../components/products/UploadImages.vue";
import axios from "axios";

export default {
  components: {
    AddDialog,
    UploadImages,
  },
  data: () => ({
    categories: [],
    valid: false,
    nameRules: [
      (v) => !!v || "El nombre del producto es requerido",
      // (v) => v.length >= 10 || "Name must be less than 10 characters",
    ],
    stockRules: [(v) => !!v || "El stock es requerido"],
    priceRules: [(v) => !!v || "El precio no debe estar vacio"],
    categoryRules: [(v) => !!v || "Selecciones una categoria"],
    descriptionRules: [(v) => !!v || "La descripcion no debe estar vacio"],
    product: {
      name: "",
      stock: null,
      price: null,
      category: "",
      description: "",
      imagesUrl: [],
    },
    discount: 0,
    withDiscount: false,
    dates: ["2021-03-21", "2021-03-20"],
    errors: [],
    categoriesComplete: [],
  }),
  computed: {
    errorsText() {
      return this.errors.join(", ");
    },
  },
  watch: {
    discount(value) {
      if (value > 100) {
        value = 100;
      }
    },
  },
  mounted() {
    axios
      .get("category/list")
      .then((res) => {
        const datas = res.data;
        const data = [];
        this.categoriesComplete = res;
        for (let key in datas) {
          const user = datas[key].category;
          data.push(user);
        }
        // console.log(data);
        this.categories = data;
      })
      .catch((error) => {
        console.warn(error);
        this.categories = ["No hay categorias"];
      })
      .finally(() => {});
  },
  methods: {
    verifyData() {
      this.$refs.form.validate();
      console.log(this.valid);
      if (!this.valid) return;

      const imagesURLs = [];
      for (let key in this.product.imagesUrl) {
        const url = this.product.imagesUrl[key];
        imagesURLs.push({ photo: url });
      }
      const formData = {
        name: this.product.name,
        price: this.product.price,
        description: this.product.description,
        unit: this.product.stock,
        category: this.product.category,
        imagesUrl: imagesURLs,
      };
      console.log(formData);
      axios
        .post("/admin/" + 1 + "/branchOffice/" + 1 + "/product", formData)
        .then((res) => {
          console.log(res);
          this.$router.push("/products");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validateForm() {
      this.$refs.form.validate();
    },
    addImage(value) {
      // console.log(value);
      this.product.imagesUrl.push(value);
    },
    retrieveData() {
      console.log(this.product);
      if (this.withDiscount) {
        console.log(this.discount, this.dates);
      }
      console.log(this.valid);
    },
  },
};
</script>

<style>
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.slide-enter-active {
  animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active {
  animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>
