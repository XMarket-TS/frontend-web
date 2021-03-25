<template>
  <v-app>
    <NavBar></NavBar>
    <v-main>
      <transition name="slide" mode="out-in">
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
<style scoped>
.slide-enter-active {
  animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active {
  animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>