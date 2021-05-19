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

      <v-bottom-sheet v-model="sheet" inset persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-if="disabled" v-bind="attrs" v-on="on" :loading="loading">
            Deshabilitar
          </v-btn>
          <v-btn v-else v-bind="attrs" v-on="on" :loading="loading">
            Habilitar
          </v-btn>
        </template>
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
import axios from "axios";
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: true,
    },
    branchId: {
      type: Number,
      default: -1,
    },
    status,
  },
  data: () => ({
    sheet: false,
    toggle_exclusive: 2,
    loading: false,
  }),
  methods: {
    confirmDialog() {
      this.sheet = !this.sheet;
      console.log(this.branchId);
      this.loading = true;
      axios
        .put(
          "branchOffice/branch/" + this.branchId + "/" + (this.disabled ? 1 : 0)
        )
        .then(() => {
          this.$emit("changed", null);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    switching(event) {
      console.log(event);
    },
  },
};
</script>

<style>
</style>