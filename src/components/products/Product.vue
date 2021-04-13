<template>
  <v-card class="mx-auto" outlined elevation="3">
    <!-- delimiter-icon="mdi-minus" -->
    <Gallery :images="images" :clyde="true" :heightCarousel="290"></Gallery>
    <v-divider></v-divider>
    <v-card-title class="headline font-weight-bold pb-0">
      {{ title }}
      <v-spacer></v-spacer>
      <v-chip v-if="discount > 0" color="accent">
        - {{ discount }}
        <v-icon>mdi-sale</v-icon>
      </v-chip>
    </v-card-title>
    <v-card-title class="pb-0">
      Bs. {{ discount > 0 ? price * (1 - discount/100) : price | roundPrice }}
      <v-spacer></v-spacer>
      <div v-if="discount > 0" class="text-decoration-line-through">
        Bs. {{ price | roundPrice }}
      </div>
    </v-card-title>
    <v-card-title class="justify-center">
      <v-chip close-icon="mdi-close-outline" color="blue" label link outlined>
        {{ category }}
      </v-chip>
    </v-card-title>
    <!-- <v-card-actions> -->
    <!-- <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn> -->
    <!-- <v-spacer></v-spacer> -->
    <!-- <v-btn @click="show = !show" color="info" text> More </v-btn> -->
    <!-- </v-card-actions> -->

    <!-- <v-expand-transition>
      <div v-show="show"> -->
    <v-divider></v-divider>
    <v-card-text v-text="description"> </v-card-text>
    <v-container>
      <v-row justify="center" align="center" v-if="buttons">
        <v-spacer></v-spacer>
        <v-btn color="primary" icon @click="editProduct()"
          ><v-icon>mdi-lead-pencil</v-icon></v-btn
        >
        <v-spacer></v-spacer>
        <!-- <v-btn color="secondary" icon @click="confirmDelete(id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn> -->
        <DeleteDialog :id="id" @confirmDeleteProduct="confirmDelete($event)" />
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
    <br />
    <!-- </div>
    </v-expand-transition> -->
  </v-card>
</template>

<script>
import DeleteDialog from "./DeleteDialog.vue";
import Gallery from "./Gallery";
export default {
  props: {
    id: {
      type: Number,
      default: -1,
    },
    title: {
      type: String,
      default: "NO_TITLE",
    },
    price: {
      type: Number,
      default: 0.0,
    },
    discount: {
      type: Number,
      default: 0.0,
    },
    description: {
      type: String,
      default: "NO_DESCRIPTION",
    },
    category: {
      type: String,
      default: "NO_CATEGORY",
    },
    images: {
      type: Array,
      default: () => [],
    },
    buttons: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    show: false,
  }),
  components: {
    Gallery,
    DeleteDialog,
  },
  methods: {
    confirmDelete(id) {
      // console.log(id);
      if (id != -1) this.$emit("deleteProduct", id);
      // else throw new ErrorEvent
    },
    editProduct() {
      this.$emit("editProduct", this.id);
    },
  },
};
</script>

<style>
</style>