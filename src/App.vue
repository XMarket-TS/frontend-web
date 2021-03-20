<template>
  <v-app>
    <NavBar></NavBar>
    <v-main>
      <transition>
        <router-view />
      </transition>
    </v-main>
    <footer-main></footer-main>
  </v-app>
</template>

<script>
import FooterMain from "./components/FooterMain.vue";
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
    FooterMain,
  },
  data: () => ({
    //
  }),
};
</script>
