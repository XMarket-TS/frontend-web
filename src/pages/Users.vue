<template>
  <v-container>
    <loader-users v-if="users.length == 0"></loader-users>
    <v-row align="center" justify="center" v-else>
      <v-col cols="12">
        <v-card>
          <v-card-title> Lista de usuarios </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="message"
              :append-outer-icon="message ? 'mdi-magnify' : ''"
              filled
              color="primary"
              clear-icon="mdi-close-circle"
              clearable
              label="Buscar"
              type="text"
              dense
              outlined
              hide-details
              @click:append="toggleMarker"
              @click:append-outer="sendMessage(message)"
              @click:clear="clearMessage"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="4"
        md="4"
        v-for="(user, index) in users"
        :key="index"
      >
        <User :user="user"></User>
      </v-col>
      <v-col cols="12">
        <v-pagination
          v-model="currentpage"
          :length="pages"
          :total-visible="7"
          next-icon="mdi-menu-right"
          prev-icon="mdi-menu-left"
          @input="handlePageChange"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import User from "@/components/user/User.vue";
import LoaderUsers from "../components/user/LoaderUsers.vue";
export default {
  components: { User, LoaderUsers },
  data: () => ({
    message: "",
    marker: true,
    iconIndex: 0,
    users: [],
    pages: null,
    currentpage: 1,
  }),
  mounted() {
    this.fetchUsers();
  },
  methods: {
    handlePageChange(value) {
      this.currentpage = value;
      this.loading = true;
      this.fetchUsers();
    },
    toggleMarker() {
      this.marker = !this.marker;
    },
    sendMessage() {
      this.loading = true;
      this.currentpage = 1;
      this.fetchUsers();
      this.iconIndex = 0;
    },
    clearMessage() {
      this.loading = true;
      this.message = null;
      this.fetchUsers();
    },
    fetchUsers() {
      const params = {
        search: this.message,
        page: this.currentpage,
        size: 20,
      };
      axios
        .get("user/list", { params })
        .then((response) => {
          console.log(response);
          this.pages = response.data.pages;
          this.currentpage = response.data.pageNum;
          this.users = response.data.list;
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