<template>
  <v-card class="mx-auto">
    <v-card-title class="justify-center">
      <v-avatar color="grey" size="120">
        <v-img :src="user.photo"></v-img>
      </v-avatar>
    </v-card-title>

    <v-card-text class="text-center">
      <p class="display-1 text--primary">
        {{ user.name + " " + user.surname }}
      </p>
      {{ user.email }}
    </v-card-text>
    <v-card-actions>
      <v-btn text color="primary" @click="reveal = true" v-if="status == 1">
        Deshabilitar
      </v-btn>
      <v-btn text color="primary" @click="reveal = true" v-else>
        Habilitar
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%"
      >
        <v-card-text class="pb-0">
          <p class="display-1 text--primary">Esta seguro?</p>
          <p>
            late 16th century (as a noun denoting a place where alms were
            distributed): from medieval Latin eleemosynarius, from late Latin
            eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’
          </p>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn text color="primary" @click="reveal = false"> Cancelar </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="changeStatus()"> Confirmar </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    reveal: false,
    status: 0,
  }),
  mounted() {
    this.status = this.user.status;
  },
  methods: {
    changeStatus() {
      axios
        .put("user/status/" + this.user.userId)
        .then((res) => {
          console.log(res);
          this.status = res.data.status;
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.reveal = false;
        });
    },
  },
};
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>