<template>
  <v-container>
    <br />
    <v-card class="mx-auto">
      <v-card-text class="text-center">
        <v-row align="center" justify="center">
          <v-col cols="12" md="4">
            <v-avatar color="grey" size="250">
              <v-img :src="user.userPhoto"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="12" md="8">
            <v-card-text>
              <strong>Nombre</strong> <br />
              {{ user.name }} {{ user.surname }} <br /><br />
              <strong>Email</strong> <br />
              {{ user.email }} <br /><br />
              <strong>Descripcion</strong> <br />
              {{ user.description }} <br /><br />
              <strong>Celular</strong> <br />
              {{ user.cellphone }} <br /><br />
              <strong>Genero</strong> <br />
              {{ user.gender }}
            </v-card-text>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
  },
  beforeCreate() {
    this.$store.dispatch("tryAutoLogin");
  },
};
</script>

<style>
</style>