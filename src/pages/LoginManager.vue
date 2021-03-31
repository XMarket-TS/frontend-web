<template>
  <v-container>
    <CardLogin
      :loading="loading"
      @dataVerified="login($event)"
      :title="'Iniciar sesion como Market'"
    ></CardLogin>
    <br />
    <v-card max-width="80%" class="mx-auto" color="transparent" flat>
      <v-card-title class="justify-center">
        Inicia sesion como administrador
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" to="/admin/login">Redirigir Administrador</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
    <br />
  </v-container>
</template>

<script>
import CardLogin from "@/components/login/CardLogin.vue";
export default {
  components: {
    CardLogin,
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    login(data) {
      console.log(data);
      this.loading = true;
      setInterval(() => {
        this.loading = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
</style>