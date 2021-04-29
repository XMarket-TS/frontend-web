<template>
  <v-container>
    <div>
      <!-- <v-switch
        color="primary"
        class="white--text"
        @change="switching($event)"
        label="$on"
        style="position: relative"
      >
      </v-switch> -->
      <v-btn-toggle v-model="toggle_exclusive" color="primary" dense>
        <v-btn :value="1" text>
          <v-icon>mdi-format-align-left</v-icon>
        </v-btn>
      </v-btn-toggle>
      <v-bottom-sheet v-model="sheet" inset persistent>
        <v-sheet class="text-center" height="200px">
          <v-btn class="mt-6" color="primary" @click="confirmDialog()">
            Confirmar
          </v-btn>

          <v-btn class="mt-6" text color="error" @click="sheet = !sheet">
            Cancelar
          </v-btn>
          <div class="my-3" v-text="text"></div>
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </v-container>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "Are you sure?",
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    sheet: false,
    toggle_exclusive: 2,
  }),
  methods: {
    confirmDialog() {
      this.sheet = !this.sheet;
    },
    switching(event) {
      console.log(event);
    },
  },
};
</script>

<style>
</style>