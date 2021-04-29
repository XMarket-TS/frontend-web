<template>
  <v-footer color="primary" padless>
    <v-card flat tile width="100%" class="text-center">
      <v-img
        gradient="to top right, rgb(245, 167, 144), rgb(255, 75, 20)"
        height="120px"
      >
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
        <v-col class="py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>XMarket</strong>
        </v-col>
      </v-img>
    </v-card>
  </v-footer>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    links: [],
  }),
  mounted() {
    const type = localStorage.getItem("type");
    console.log(type);
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
          to: "/add/product",
          icon: "mdi-office-building-outline",
        },
      ];
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
