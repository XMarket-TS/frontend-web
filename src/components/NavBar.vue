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
    <ProfileAvatar :user="user" v-if="user.personId"></ProfileAvatar>
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
  components: {
    ProfileAvatar,
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    // console.log(this.user);
  },
};
</script>

<style>
</style>