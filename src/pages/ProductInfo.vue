<template>
  <v-container>
    <v-card class="mx-auto" elevation="7">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Editar el producto</v-toolbar-title>
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
                      v-model.number="product.unit"
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
                      v-model="product.category.category"
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

              <v-row align="center" justify="center">
                <v-col cols="12">
                  <div align="center">
                    <v-img
                      :src="
                        'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' +
                        product.qrHash
                      "
                      max-height="200px"
                      max-width="200px"
                      contain
                    >
                    </v-img>

                    <v-card-text> texto QR: {{ product.qrHash }} </v-card-text>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-subtitle></v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" to="/products" large>Cancelar</v-btn>
        <!-- <v-btn color="primary" @click="retrieveData">Print</v-btn> -->
        <v-spacer></v-spacer>
        <AddDialog
          @confirmed="verifyData($event)"
          :name="product.name"
          :price="product.price"
          :description="product.description"
          :category="product.category.category"
          :imagesUrl="product.imagesUrl"
          @emitValidate="validateForm"
        />
        <v-spacer></v-spacer>
      </v-card-actions>
      <br />
    </v-card>
  </v-container>
</template>

<script>
import AddDialog from "@/components/products/AddDialog.vue";
import UploadImages from "@/components/products/UploadImages.vue";
import axios from "axios";
import { mapState } from "vuex";

export default {
  components: {
    AddDialog,
    UploadImages,
  },
  props: {
    productId: {
      type: String,
      default: "-1",
    },
  },
  computed: {
    ...mapState(["user"]),
    errorsText() {
      return this.errors.join(", ");
    },
  },
  data: () => ({
    valid: false,
    nameRules: [
      (v) => !!v || "El nombre del producto es requerido",
      // (v) => v.length >= 10 || "Name must be less than 10 characters",
    ],
    stockRules: [(v) => !!v || "El stock es requerido"],
    priceRules: [(v) => !!v || "El precio no debe estar vacio"],
    categoryRules: [(v) => !!v || "Selecciones una categoria"],
    descriptionRules: [(v) => !!v || "La descripcion no debe estar vacio"],
    categories: [],
    product: {
      category: "",
      qrHash: "",
    },
    errors: [],
    qrImage: null,
  }),
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
    validateForm() {
      this.$refs.form.validate();
    },
    verifyData() {
      this.$refs.form.validate();
      console.log(this.valid);
      if (!this.valid) return;

      const formData = {
        name: this.product.name,
        price: this.product.price,
        description: this.product.description,
        unit: this.product.unit,
        category: this.product.category.category,
        imagesUrl: this.product.imagesUrl,
      };
      console.log(formData);
      axios
        .put(
          "/manager/" + this.user.personId + "/product/" + this.productId,
          formData
        )
        .then((res) => {
          console.log(res);
          this.$router.push("/products");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addImage(value) {
      // console.log(value);
      this.product.imagesUrl.push(value);
    },
  },

  created() {
    // console.log(this.productId);
    axios.get("product/" + this.productId).then((res) => {
      console.log(res);
      this.product = res.data;
      // axios
      //   .post(
      //     "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
      //       this.product.qrHash
      //   )
      //   .then((res) => {
      //     console.log(res);
      //     this.qrImage = res.data;
      //   });
    });
  },
};
</script>

<style>
</style>