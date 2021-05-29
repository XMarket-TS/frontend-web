<template>
  <v-container>
    <v-card class="mx-auto" elevation="7">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Agregar una nueva sucursal</v-toolbar-title>
      </v-toolbar>
      <br />
      <v-card-text class="text-center justify-center">
        <v-row>
          <v-col cols="12" sm="8">
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-row>
                <v-col cols="12" md="8">
                  <v-text-field
                    v-model="market.name"
                    label="Nombre"
                    :rules="[rules.required]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model.number="market.number"
                    label="Celular"
                    :rules="[rules.cellphone]"
                    type="number"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="5" md="5">
                  <v-autocomplete
                    v-model="market.zone"
                    :items="zones"
                    label="Zona"
                    :rules="[rules.required]"
                    allow-overflow
                    hide-no-data
                    outlined
                    single-line
                    dense
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="7" md="7">
                  <v-text-field
                    v-model="market.address"
                    label="Direccion"
                    :rules="[rules.required]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="8" md="8">
                  <v-select
                    v-model="market.manager"
                    :items="allManagers ? listManagers : availableManagers"
                    label="Administrador"
                    dense
                    outlined
                    hide-details
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="2" md="4">
                  <v-switch
                    v-model="allManagers"
                    label="Todos los administradores"
                  ></v-switch>
                </v-col>
              </v-row>
            </v-form>
          </v-col>

          <v-col cols="12" sm="4" md="4">
            <UploadImage
              :image="market.imageUrl"
              @successUploaded="addImage($event)"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" to="/" large>Cancelar</v-btn>
        <!-- <v-btn color="primary" @click="retrieveData">Print</v-btn> -->
        <v-spacer></v-spacer>
        <AddDialog
          @confirmed="verifyData($event)"
          @emitValidate="validateForm"
        />
        <v-spacer></v-spacer>
      </v-card-actions>
      <br />
    </v-card>
  </v-container>
</template>

<script>
import AddDialog from "../components/market/AddDialog.vue";
import UploadImage from "../components/market/UploadImage.vue";
import { rules } from "../mixins/rules";
import axios from "axios";

export default {
  components: {
    AddDialog,
    UploadImage,
  },
  mixins: [rules],
  data: () => ({
    allManagers: false,
    managers: [],
    zones: [],
    valid: false,
    market: {
      name: "",
      number: "",
      zone: "",
      imageUrl: "",
      address: "",
    },
  }),
  mounted() {
    axios
      .get("branchOffice/zones/")
      .then((res) => {
        this.zones = res.data;
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get("manager/list")
      .then((res) => {
        this.managers = res.data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  computed: {
    listManagers() {
      const manager = [];
      this.managers.forEach((item) => {
        // console.log(item);
        manager.push(item.name);
      });
      return manager;
    },
    availableManagers() {
      const manager = [];
      this.managers.forEach((item) => {
        // console.log(item, index);
        if (item.isAvailable == 1) manager.push(item.name);
      });
      return manager;
    },
  },
  methods: {
    verifyData() {
      this.validateForm();
      console.log(this.valid);
      if (!this.valid) return;
      const formData = {
        name: this.market.name,
        phone: this.market.number,
        zone: this.market.zone,
        image: this.market.imageUrl,
        address: this.market.address,
      };
      console.log(formData);
      // axios
      //   .post("/manager/register/new", formData)
      //   .then((res) => {
      //     console.log(res);
      //     this.$router.push("/");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },
    validateForm() {
      this.$refs.form.validate();
    },
    addImage(value) {
      console.log(value);
      this.market.imageUrl = value;
      console.log(this.market);
    },
    retrieveData() {
      console.log(this.market);
      if (this.withDiscount) {
        console.log(this.discount, this.dates);
      }
      console.log(this.valid);
    },
  },
};
</script>

<style>
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
