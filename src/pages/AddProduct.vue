<template>
  <v-container>
    <v-card class="mx-auto" elevation="15">
      <v-card-title>Agregar nuevo producto</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="text-center">
        <v-row>
          <v-col cols="12" sm="5">
            <UploadImages :images="images" />
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
                    persistent-hint
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
                <transition name="slide" mode="out-in">
                  <v-col cols="12" v-if="withDiscount">
                    <v-row>
                      <v-col cols="12" sm="4">
                        <v-text-field
                          append-icon="mdi-sale"
                          label="Descuento"
                          type="number"
                          v-model="discount"
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
                          elevation="5"
                          first-day-of-week="1"
                          full-width
                        ></v-date-picker>
                      </v-col>
                    </v-row>
                  </v-col>
                </transition>
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
        <AddDialog @confirmed="verifyData()" />
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
export default {
  components: {
    AddDialog,
    UploadImages,
  },
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
    dates: ["2021-03-15", "2021-03-20"],
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
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
