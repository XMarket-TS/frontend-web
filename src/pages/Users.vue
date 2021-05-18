<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-title> Lista de usuarios</v-card-title>
        </v-card>
      </v-col>
      <v-col
          cols="12"
          sm="6"
          md="6"
          v-for="(user, index) in users"
          :key="index"
      >
        <User :user="user"></User>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import User from "@/components/user/User.vue";

export default {
  components: {User},
  data: () => ({
    users: [],
  }),
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios
          .get("user/list")
          .then((response) => {
            console.log(response);
            this.users = response.data;
          })
          .catch((error) => {
            console.error(error + "Can't do this");
          });
    },
  },
};
</script>

<style scoped>
</style>