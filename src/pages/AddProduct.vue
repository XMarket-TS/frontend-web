<template>
  <v-container>
    <v-card class="mx-auto" width="95%" elevation="15">
      <v-card-title>Agregar nuevo producto</v-card-title>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" sm="5">
          <v-row>
            <v-col> <Gallery :heightCarousel="350"></Gallery></v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-card width="90%" flat>
              <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Avatar"
              ></v-file-input>
            </v-card>
          </v-row>
        </v-col>
        <v-col cols="12" sm="7">
          <br />
          <v-card width="95%" flat>
            <v-text-field
              label="Title"
              placeholder="Ej."
              outlined
              height="90%"
              dense
            ></v-text-field>
            <v-row>
              <v-col sm="4">
                <v-text-field
                  prefix="$"
                  label="Price"
                  placeholder="Ej."
                  outlined
                  height="90%"
                  dense
                ></v-text-field>
              </v-col>
              <v-col sm="4">
                <v-text-field
                  append-icon="mdi-sale"
                  label="Discount"
                  v-model="discount"
                  placeholder="1 - 100"
                  outlined
                  height="90%"
                  dense
                ></v-text-field>
              </v-col>
              <v-col sm="4">
                <v-select
                  v-model="categories"
                  :items="category"
                  label="Category"
                  hint="Only 2 categories"
                  persistent-hint
                  multiple
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col sm="12">
                <v-textarea
                  label="Description"
                  auto-grow
                  outlined
                  rows="3"
                  row-height="25"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary">Cancel</v-btn>
        <v-btn color="primary">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import Gallery from "../components/products/Gallery.vue";
export default {
  components: { Gallery },
  data: () => ({
    category: ["foo", "bar", "fizz", "buzz"],
    images: [],
    categories: [],
    discount: null,
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
  },
};
</script>

<style>
</style>