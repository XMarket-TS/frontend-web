<template>
  <v-container>
    <v-card class="mx-auto" elevation="7">
      <v-card-title>Agregar una nueva sucursal</v-card-title>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-card-title class="justify-center">
          Datos del adminitrador
        </v-card-title>
      </v-col>
      <v-card-text class="text-center">
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-row>
            <v-col cols="12" sm="8">
              <GenerateData></GenerateData>
              <v-row>
                <v-col cols="12" sm="5">
                  <v-text-field
                    v-model="person.name"
                    label="Nombre"
                    :rules="[rules.required]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="person.surname"
                    label="Apellido"
                    :rules="[rules.required]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-select
                    v-model="person.gender"
                    :items="genders"
                    label="Genero"
                    :rules="[rules.gender]"
                    outlined
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="7">
                  <v-text-field
                    v-model.number="person.email"
                    label="Email"
                    :rules="rules.email"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="5">
                  <v-text-field
                    v-model.number="person.number"
                    label="Celular"
                    :rules="[rules.cellphone]"
                    type="number"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="person.description"
                    label="Descripcion"
                    :rules="[rules.descriptionRules]"
                    auto-grow
                    outlined
                    rows="3"
                    dense
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="4">
              <UploadImage
                :image="person.imageUrl"
                @successUploaded="addImage($event)"
                :errors="errors"
              />
            </v-col>

            <v-col cols="12">
              <v-divider></v-divider>
              <v-card-title class="justify-center">
                Datos de la sucursal
              </v-card-title>
            </v-col>

            <v-col cols="12" sm="8">
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

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="market.zone"
                    label="Zona"
                    :rules="[rules.required]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="market.address"
                    label="Direccion"
                    :rules="[rules.required]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" sm="4" md="4">
              <UploadImage
                :image="market.imageUrl"
                @successUploaded="addImage($event)"
                :errors="errors"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" to="/" large>Cancelar</v-btn>
        <!-- <v-btn color="primary" @click="retrieveData">Print</v-btn> -->
        <v-spacer></v-spacer>
        <AddDialog
          @confirmed="verifyData($event)"
          :name="person.name"
          :price="person.price"
          :discount="discount / 100"
          :description="person.description"
          :category="person.category"
          :imagesUrl="person.imagesUrl"
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
import axios from "axios";
import GenerateData from "../components/user/GenerateData.vue";
export default {
  components: {
    AddDialog,
    UploadImage,
    GenerateData,
  },
  data: () => ({
    genders: ["Masculino", "Femenino", "No Binario"],
    valid: false,
    rules: {
      required: (value) => !!value || "Este campo no puede estar vacia",
      cellphone: (value) => !!value || "Es necesario un numero",
      email: [
        (v) => !!v || "E-mail es requerido",
        (v) => /.+@.+\..+/.test(v) || "Debe ser un e-mail valido",
      ],
      market: (v) => !!v || "Selecciones una sucursal",
      gender: (v) => !!v || "Selecciones el genero",
      nameRules: (v) => !!v || "El nombre del producto es requerido",
      stockRules: (v) => !!v || "El stock es requerido",
      priceRules: (v) => !!v || "El precio no debe estar vacio",
      descriptionRules: (v) => !!v || "La descripcion no debe estar vacio",
    },
    person: {
      name: "",
      surname: "",
      gender: "",
      number: "",
      email: "",
      description: "",
      imageUrl: null,
      username: "",
      password: "",
    },
    market: {
      imageUrl:
        "https://res.cloudinary.com/fulano/image/upload/v1619385679/market_kdklwe.jpg",
    },
    oldMarket: false,
    discount: 0,
    withDiscount: false,
    dates: ["2021-03-21", "2021-03-20"],
    errors: [],
  }),
  watch: {
    person: {
      handler(value) {
        try {
          let email = value.email.split("@");
          console.log(email);
          this.person.username =
            email[0].toLowerCase() + "-" + value.surname.toLowerCase();
          this.person.password = value.username;
        } catch (ex) {
          console.warn(ex);
        }
      },
      deep: true,
    },
    discount(value) {
      if (value > 100) {
        value = 100;
      }
    },
  },
  methods: {
    verifyData() {
      this.validateForm();
      console.log(this.valid);
      if (!this.valid) return;
      const formData = {
        name: this.person.name,
        surname: this.person.surname,
        userPhoto: this.person.imageUrl,
        gender: this.person.gender,
        email: this.person.email,
        description: this.person.description,
        cellphone: this.person.number,
        username: this.person.username,
        password: this.person.password,
      };
      console.log(formData);
      axios
        .post("/manager/register/new", formData)
        .then((res) => {
          console.log(res);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validateForm() {
      this.$refs.form.validate();
    },
    addImage(value) {
      console.log(value);
      this.person.imageUrl = value;
      console.log(this.person);
      this.errors = [];
    },
    retrieveData() {
      console.log(this.person);
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
