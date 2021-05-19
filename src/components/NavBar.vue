<template>
  <v-app-bar
    app
    color="primary"
    dark
    absolute
    src="https://picsum.photos/1920/1080?random"
  >
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="../assets/logo_market.png"
        transition="scale-transition"
        width="100"
      />
    </div>
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgb(245, 167, 144), rgb(255, 75, 20)"
      ></v-img>
    </template>
    <v-spacer></v-spacer>
    <div v-if="user.personId">
      <v-btn
        v-for="(link, i) in links"
        :key="i"
        color="white"
        text
        rounded
        class="my-2"
        :to="link.to"
      >
        <v-icon>
          {{ link.icon }}
        </v-icon>
        <span> {{ link.text }}</span>
      </v-btn>
    </div>
    <v-col v-else></v-col>
    <v-spacer></v-spacer>
    <ProfileAvatar
      :user="user"
      v-if="user.personId"
      @logout="closeSesion"
    ></ProfileAvatar>
    <!-- <v-btn to="/product/add" text>
      <v-icon>mdi-open-in-new</v-icon>
      Agregar producto
    </v-btn> -->
  </v-app-bar>
</template>

<script>
import ProfileAvatar from "./user/ProfileAvatar.vue";
import { mapState } from "vuex";

export default {
  data: () => ({
    links: [],
  }),
  components: {
    ProfileAvatar,
  },
  watch: {
    user() {},
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    // console.log(this.getUser);
    // this.user = this.getUser;
  },
  methods: {
    closeSesion() {
      this.user.personId = null;
    },
  },
  mounted() {
    const type = localStorage.getItem("type");
    // console.log(type);
    if (type == "Admin")
      this.links = [
        {
          text: "Inicio",
          to: "/",
          icon: "mdi-home-assistant",
        },
        {
          text: "Agregar Sucursal",
          to: "/add-new/market",
          icon: "mdi-office-building-outline",
        },
        {
          text: "Agregar administrador",
          to: "/add-new/manager",
          icon: "mdi-human-edit",
        },
        {
          text: "Usuarios",
          to: "/users/list",
          icon: "mdi-human-edit",
        },
        {
          text: "Ventas",
          to: "/sales/dashboard",
          icon: "mdi-human-edit",
        },
      ];
    else if (type == "Market")
      this.links = [
        {
          text: "Inicio",
          to: "/products",
          icon: "mdi-home-assistant",
        },
        {
          text: "Agregar Producto",
          to: "/product/add",
          icon: "mdi-office-building-outline",
        },
      ];
    else this.links = [];
  },
};
</script>

<style>
</style>