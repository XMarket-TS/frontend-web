<template>
  <div class="home">
    <v-btn @click="logout">logout</v-btn>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/admin/login");
      });
    },
  },
};
</script>
