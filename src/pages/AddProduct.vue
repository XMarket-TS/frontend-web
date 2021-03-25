<template>
  <v-container>
    <v-card class="mx-auto" elevation="15">
      <v-card-title>Agregar nuevo producto</v-card-title>
      <v-divider></v-divider>
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
                  <v-col sm="1"> </v-col>
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
                  <v-col cols="12">
                    <v-checkbox
                      v-model="withDiscount"
                      label="Descuento"
                      dense
                    ></v-checkbox>
                  </v-col>
                  <transition name="slide" mode="out-in">
                    <v-col cols="12" v-if="withDiscount">
                      <v-row>
                        <v-col cols="12" sm="4">
                          <v-text-field
                            append-icon="mdi-sale"
                            label="Descuento"
                            type="number"
                            max="100"
                            min="0"
                            v-model.number="discount"
                            placeholder="1 - 100"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="8">
                          <v-date-picker
                            v-model="dates"
                            range
                            no-title
                            scrollable
                            color="success"
                            elevation="3"
                            first-day-of-week="1"
                            full-width
                          ></v-date-picker>
                        </v-col>
                      </v-row>
                    </v-col>
                  </transition>
                </v-row>
              </v-form>
              <v-card-subtitle class="red--text">
                {{ errorsText }}
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-subtitle> </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" to="/products" large>Cancelar</v-btn>
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
      (v) => !!v || "El nombre es requerido",
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
      imagesUrl: ["https://picsum.photos/1920/1080?random"],
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
    this.categories = ["foo", "bar", "fizz", "buzz"];
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
        console.log(data);
        this.categories = data;
        // this.email = users[0].email;
      })
      .catch((error) => console.warn(error));
  },
  methods: {
    verifyData() {
      this.$refs.form.validate();
      console.log(this.valid);
      if (this.valid) this.$router.push("/products");
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
