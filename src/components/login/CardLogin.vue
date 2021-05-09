<template>
  <v-card elevation="7" max-width="80%" class="mx-auto" :loading="loading">
    <br />
    <v-card
      class="mx-auto rounded-card"
      max-height="200px"
      flat
      max-width="400px"
    >
      <v-img
        contain
        max-height="200px"
        position="center"
        src="../../assets/logo_market.png"
      ></v-img>
    </v-card>

    <v-card-text class="text-center">
      <v-card-title class="justify-center">{{ title }}</v-card-title>
      <p>Inicie sesión con su nombre de usuario y contraseña</p>
      <v-row align="center" justify="center">
        <v-col cols="12" lg="6" md="8">
          <v-alert text v-model="fail" type="error" dismissible>
            El usuario o la contraseña es incorrecta
          </v-alert>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12" lg="6" md="8">
          <v-alert text v-model="notAccess" type="error" dismissible>
            Su cuenta fue suspendida
          </v-alert>
        </v-col>
      </v-row>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-row>
          <v-col cols="12" lg="3" md="2"></v-col>
          <v-col cols="12" lg="6" md="8">
            <v-text-field
              hide-details
              outlined
              :rules="[rules.userRequired]"
              label="Nombre de usuario"
              type="text"
              width="400px"
              v-model="username"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="2"></v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="3" md="2"></v-col>
          <v-col cols="12" lg="6" md="8">
            <v-text-field
              outlined
              label="Contraseña"
              :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
              :rules="[rules.passwordRequired]"
              :type="show ? 'text' : 'password'"
              name="input-10-1"
              v-model="password"
              @click:append="show = !show"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="2"></v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <!-- <v-btn color="secondary" text>Olvidaste tu contraseña? </v-btn> -->
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="verifyData">
        <v-icon left>mdi-login-variant</v-icon>
        Iniciar sesion
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    loading: { type: Boolean, default: false },
    title: { type: String, default: "No title" },
    fail: { type: Boolean, default: false },
    notAccess: { type: Boolean, default: false },
  },
  data: () => ({
    valid: false,
    password: null,
    username: null,
    show: false,
    rules: {
      passwordRequired: (value) =>
        !!value || "La contraseña no puede estar vacia",
      userRequired: (value) =>
        !!value || "El nombre de usuario no puede estar vacio",
      // min: (v) => v.length >= 8 || "Min 8 characters",
    },
  }),
  methods: {
    verifyData() {
      this.$refs.form.validate();
      console.log(this.valid);
      if ((this.password == null, this.username == null)) return;
      if (!this.valid) return;
      this.$emit("dataVerified", {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>
.rounded-card {
  border-radius: 60px;
}
</style>