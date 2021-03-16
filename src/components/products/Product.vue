<template>
  <v-card class="mx-auto" outlined elevation="5" shaped>
    <!-- delimiter-icon="mdi-minus" -->
    <v-carousel :cycle="cycle" height="250px" show-arrows-on-hover>
      <!--  -->
      <!-- <template v-slot:prev="{ on, attrs }">
        <v-btn color="success" v-bind="attrs" v-on="on">Previous</v-btn>
      </template>
      <template v-slot:next="{ on, attrs }">
        <v-btn color="info" v-bind="attrs" v-on="on">Next</v-btn>
      </template> -->
      <!--  -->
      <v-carousel-item v-for="(image, i) in images" :key="i">
        <v-sheet color="white" height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <v-img contain :src="image" height="100%"></v-img>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
      <v-chip v-if="discount > 0.0" color="accent">
        {{ -discount * 100 }}
        <v-icon>mdi-sale</v-icon>
      </v-chip>
    </v-card-title>
    <v-card-subtitle>
      Bs. {{ discount > 0 ? price * (1 - discount) : price | roundPrice }}
      <v-spacer></v-spacer>
    </v-card-subtitle>

    <v-card-actions>
      <!-- <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn> -->

      <v-spacer></v-spacer>
      <v-btn @click="show = !show" color="info" text> More </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text v-text="description"> </v-card-text>
        <v-container>
          <v-row justify="center" align="center">
            <v-spacer></v-spacer>
            <v-btn color="primary" icon><v-icon>mdi-lead-pencil</v-icon></v-btn>
            <v-spacer></v-spacer>
            <v-btn color="secondary" icon><v-icon>mdi-delete</v-icon></v-btn>
            <v-spacer></v-spacer>
          </v-row>
        </v-container>
        <br />
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
// import s
export default {
  props: {
    id: {
      type: String,
      default: "-1",
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
    images: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    show: false,
    cycle: false,
  }),
};
</script>

<style>
</style>