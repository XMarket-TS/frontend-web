<template>
  <v-container>
    <br />
    <CardLogin :loading="loading" @dataVerified="login($event)"></CardLogin>
  </v-container>
</template>

<script>
import CardLogin from "../components/login/CardLogin.vue";
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