<template>
  <div>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12">
        <Gallery :images="images" :heightCarousel="350"></Gallery>
        <br />
      </v-col>

      <v-col cols="12">
        <v-file-input
          :rules="rules"
          accept="image/jpeg, image/jpg"
          prepend-icon="mdi-camera"
          label="Imagen del producto"
          color="accent"
          truncate-length="15"
          dense
          outlined
          @change="handleFileChange($event)"
        ></v-file-input>
      </v-col>
      <v-col cols="12">
        <v-btn color="accent">
          <v-icon left> mdi-cloud-upload-outline </v-icon>
          Subir
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Gallery from "./Gallery.vue";
export default {
  components: {
    Gallery,
  },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Photo size should be less than 2 MB!",
    ],
    cloudName: "fulano",
    preset: "ik1apwhk",
    tags: "browser-upload",
    results: null,
    errors: [],
    file: null,
    progress: 0,
    showProgress: false,
    options: {
      text: {
        shadowColor: "black",
        fontSize: 14,
        fontFamily: "Helvetica",
        dynamicPosition: true,
      },
      progress: {
        color: "#E8C401",
        backgroundColor: "#000000",
      },
      layout: {
        height: 35,
        width: 140,
        type: "line",
        progressPadding: 0,
        verticalTextAlign: 63,
      },
    },
    fileContents: null,
    formData: null,
  }),
  methods: {
    prepareFormData: function () {
      this.formData = new FormData();
      this.formData.append("upload_preset", this.preset);
      this.formData.append("tags", this.tags); // Optional - add tag for image admin in Cloudinary
      this.formData.append("file", this.fileContents);
      console.log(this.formData);
    },
    handleFileChange(event) {
      console.log("handlefilechange", event);
      //returns an array of files even though multiple not used
      this.file = event;
      this.filesSelected = event.length;
    },
  },
  mounted() {},
};
</script>

<style>
</style>