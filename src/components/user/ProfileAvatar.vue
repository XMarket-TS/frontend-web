<template>
  <!-- <v-container fluid style="height: 300px"> -->
  <v-menu bottom min-width="200px" rounded offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon x-large v-on="on">
        <v-avatar color="brown" size="48">
          <v-img v-if="user.userPhoto" :src="user.userPhoto" alt="John" />
          <span class="white--text headline" v-else>
            {{ user.initials }}
          </span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <v-avatar color="brown">
            <v-img v-if="user.userPhoto" :src="user.userPhoto" alt="John" />
            <span class="white--text headline" v-else>
              {{ user.initials }}
            </span>
          </v-avatar>
          <h3>{{ user.name + " " + user.surname }}</h3>
          <p class="caption mt-1">
            {{ user.email }}
          </p>

          <v-btn depressed text> Cuenta </v-btn>
          <br />
          <v-btn depressed text @click="logout"> Cerrar Sesion </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
  <!-- </v-container> -->
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return { initials: "SD" };
      },
    },
  },
  data: () => ({}),

  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$emit("logout", false);
        this.$router.push("/market/login");
      });
    },
  },
};
</script>