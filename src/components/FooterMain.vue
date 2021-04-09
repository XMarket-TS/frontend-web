<template>
  <v-footer color="primary" padless>
    <v-card flat tile width="100%" class="text-center">
      <v-img
        gradient="to top right, rgb(245, 167, 144), rgb(255, 75, 20)"
        height="120px"
      >
        <div v-if="user.personId">
          <v-btn
            v-for="link in links"
            :key="link"
            color="white"
            text
            rounded
            class="my-2"
          >
            {{ link }}
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
    links: ["Home", "Services", "Contact Us"],
  }),
  computed: {
    ...mapState(["user"]),
  },
};
</script>