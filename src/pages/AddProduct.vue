<template>
  <v-container>
    <v-card class="mx-auto" elevation="15">
      <v-card-title>Agregar nuevo producto</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="5">
            <Gallery :images="images" :heightCarousel="300"></Gallery>
            <br />
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8">
                <v-file-input
                  :rules="rules"
                  accept="image/png, image/jpeg, image/jpg, image/jfif"
                  prepend-inner-icon="mdi-camera"
                  label="Imagen del producto"
                  color="accent"
                  multiple
                  truncate-length="15"
                  dense
                  outlined
                ></v-file-input>
              </v-col>
              <v-col cols="12" sm="4">
                <v-btn color="accent">Subir</v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="7">
            <v-card width="95%" flat>
              <v-row no-gutters>
                <v-col cols="12" sm="7">
                  <v-text-field
                    label="Title"
                    placeholder="Ej."
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col sm="1"></v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    label="Stock"
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
                    suffix="Bs."
                    label="Precio"
                    type="number"
                    placeholder="Ej."
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col sm="1"> </v-col>
                <v-col sm="7">
                  <v-select
                    v-model="categories"
                    :items="category"
                    label="Categoria"
                    hint="Solo 2 categorias"
                    persistent-hint
                    multiple
                    outlined
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Descripcion"
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
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-subtitle> </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" to="/products" large>Cancelar</v-btn>
        <v-spacer></v-spacer>
        <!-- <v-btn color="primary">Guardar</v-btn> -->
        <AddDialog @confirmed="verifyData()"></AddDialog>
        <v-spacer></v-spacer>
      </v-card-actions>
      <br />
    </v-card>
    <!-- <v-text-field
      append-icon="mdi-sale"
      label="Descuento"
      type="number"
      v-model="discount"
      placeholder="1 - 100"
      outlined
      dense
    ></v-text-field> -->
    <!--  -->
  </v-container>
</template>

<script>
import Gallery from "../components/products/Gallery.vue";
import AddDialog from "../components/products/AddDialog.vue";
export default {
  components: { Gallery, AddDialog },
  data: () => ({
    category: [],
    images: [
      "https://picsum.photos/1920/1080?random",
      "https://picsum.photos/1920/1080?random",
      "https://picsum.photos/1920/1080?random",
    ],
    categories: [],
    discount: null,
    withDiscount: false,
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Photo size should be less than 2 MB!",
    ],
  }),
  watch: {
    categories(value) {
      //   console.log(value);
      if (value.length > 2) {
        value.splice(-1, 1);
      }
    },
    discount(value) {
      if (value > 100) {
        value = 100;
      }
    },
  },
  mounted() {
    this.category = ["foo", "bar", "fizz", "buzz"];
  },
  methods: {
    verifyData() {
      this.$router.push("/products");
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
</style>