<template>
  <div>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12">
        <v-img :src="image" max-height="200px" contain> </v-img>
        <br />
      </v-col>
      <v-col cols="12">
        <v-file-input
          :rules="rules"
          accept="image/jpeg,image/jpg"  
          prepend-icon="mdi-camera"
          label="Imagen del market"
          color="accent"
          truncate-length="15"
          dense
          outlined
          @change="handleFileChange($event)"
        ></v-file-input>
      </v-col>
      <v-col cols="12">
        <v-btn color="tertiary" :disabled="uploadingImage" @click="upload">
          <v-icon left> mdi-cloud-upload-outline </v-icon>
          Subir
        </v-btn>
      </v-col>

      <v-col cols="12">
        <br />
        <v-progress-circular
          v-show="showProgress"
          :rotate="360"
          :size="75"
          :width="15"
          v-model="progress"
          color="primary"
          buffer-value="0"
        >
          {{ progress + "%" }}
        </v-progress-circular>
        <br />
      </v-col>
    </v-row>
  </div>
</template>

<script>

import axios from "axios";

export default {
  components: {},
  props: {
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/fulano/image/upload/v1617116017/profileimage_kptkl6.jpg",
    },
  },
  data: () => ({
    results: null,
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Photo size should be less than 2 MB!",
    ],
    cloudName: "fulano",
    preset: "ik1apwhk",
    tags: "browser-upload",
    errors: [],
    file: null,
    progress: 0,
    showProgress: false,
    fileContents: null,
    formData: null,
    uploadingImage: false,
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
      this.file = event;
      console.log("handlefilechange", this.file);
    },
    // function to handle form submit
    upload() {
      if (this.preset.length < 1 || this.cloudName.length < 1) {
        this.errors.push("cloud name and preset not set");
        return;
      } else if (this.file == null) {
        this.errorImage = "Not File selected";
        return;
      }
      // clear errors
      else {
        this.errors = [];
      }

      // console.log(this.file.name);

      let reader = new FileReader();
      // attach listener to be called when data from file
      reader.addEventListener(
        "load",
        function () {
          this.fileContents = reader.result;
          this.prepareFormData();
          let requestObj = {
            url: `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`,
            method: "POST",
            data: this.formData,
            onUploadProgress: function (progressEvent) {
              // console.log("progress", progressEvent);
              this.progress = Math.round(
                (progressEvent.loaded * 100.0) / progressEvent.total
              );
              // console.log(this.progress);
              //bind "this" to access vue state during callback
            }.bind(this),
          };
          //show progress bar at beginning of post
          this.showProgress = true;
          axios(requestObj)
            .then((response) => {
              this.results = response.data;
              // console.log(this.results);
              // console.log("public_id", this.results.public_id);
              //   this.images.push(this.results.secure_url);
              this.$emit("successUploaded", this.results.secure_url);
            })
            .catch((error) => {
              this.errors.push(error);
              console.log(this.error);
            })
            .finally(() => {
              setTimeout(
                function () {
                  this.progress = 0;
                  this.showProgress = false;
                  this.file = null;
                }.bind(this),
                1000
              );
            });
        }.bind(this),
        false
      );
      // call for file read if there is a file
      if (this.file && this.file.name) {
        reader.readAsDataURL(this.file);
      }
    },
  },
  mounted() {},
};
</script>

<style>
</style>
