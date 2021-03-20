<template>
  <v-carousel
    :cycle="cycle"
    :height="heightCarousel"
    show-arrows-on-hover
    hide-delimiter-background
  >
    <!-- <template v-slot:prev="{ on, attrs }">
        <v-btn color="success" v-bind="attrs" v-on="on">Previous</v-btn>
      </template>
      <template v-slot:next="{ on, attrs }">
        <v-btn color="info" v-bind="attrs" v-on="on">Next</v-btn>
      </template> -->
    <v-carousel-item v-for="(image, i) in images" :key="i">
      <v-sheet color="backimg" height="100%" tile>
        <!-- <v-row class="fill-height" align="center" justify="center"> -->
        <v-img :src="image" height="100%"></v-img>
        <!-- </v-row> -->
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    heightCarousel: {
      type: Number,
      default: 250,
    },
    images: {
      type: Array,
      default: () => [],
    },
    cycle: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>