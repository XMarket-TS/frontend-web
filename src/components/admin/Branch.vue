<template>
  <div>
    <v-card>
      <v-img
        :src="image"
        max-height="180px"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      >
        <v-card-title>Teléfono: {{ phone }}</v-card-title>
      </v-img>
      <v-card-actions>
        <v-spacer></v-spacer>
        <confirm-dialog></confirm-dialog>
      </v-card-actions>
      <v-row>
        <v-col cols="12" md="3">
          <v-avatar class="profile" color="grey" size="164" tile>
            <v-img :src="manager.userPhoto"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="12" md="9">
          <v-row>
            <v-col cols="12">
              <v-card-title class="justify-center">Administrador</v-card-title>
            </v-col>
            <v-col cols="12">
              <v-card-text class="text-center">
                {{ manager.name }}
                <br />
                {{ manager.isAvailable }}
              </v-card-text>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import ConfirmDialog from "../ConfirmDialog.vue";
export default {
  components: {
    ConfirmDialog,
  },
  props: {
    branchId: {
      type: Number,
      default: -1,
    },
    managerId: {
      type: Number,
      default: -1,
    },
    image: {
      type: String,
      default: "",
    },
    phone: {
      type: Number,
      default: -1,
    },
  },
  data: () => ({
    manager: {},
  }),
  mounted() {
    if (this.managerId > 0) {
      axios.get("manager/info/" + this.managerId).then((response) => {
        this.manager = response.data;
      });
    }
  },
};
</script>

<style>
</style>