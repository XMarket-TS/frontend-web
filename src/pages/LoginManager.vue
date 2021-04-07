<template>
  <v-container>
    <CardLogin
      :loading="loading"
      @dataVerified="login($event)"
      :title="'Iniciar sesion como Market'"
    ></CardLogin>
    <br />
    <v-card max-width="80%" class="mx-auto" color="transparent" flat>
      <v-card-actions>
        <v-spacer></v-spacer>
        Inicia sesion como administrador:
        <v-btn color="primary" to="/admin/login" text>
          Redirigir Administrador
        </v-btn>
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
      this.$store
        .dispatch("loginManager", data)
        .then(() => this.$router.push("/products"))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
</style>