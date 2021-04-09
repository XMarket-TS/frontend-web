<template>
  <v-container>
    <v-card class="mx-auto" elevation="7">
      <v-card-title>Agregar nuevo Administrador de Market</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="text-center">
        <v-row>
          <v-col cols="12" sm="8">
            <v-card width="95%" flat>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="person.name"
                      label="Nombre"
                      :rules="[rules.required]"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="person.surname"
                      label="Apellido"
                      :rules="[rules.required]"
                      outlined
                      dense
                    ></v-text-field>
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
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="person.gender"
                      :items="genders"
                      label="Genero"
                      :rules="[rules.gender]"
                      outlined
                      dense
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-select
                      v-model="person.market"
                      :items="markets"
                      label="Sucursal"
                      :rules="[rules.market]"
                      outlined
                      dense
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="person.description"
                      label="Descripcion"
                      :rules="descriptionRules"
                      auto-grow
                      outlined
                      rows="3"
                      dense
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-form>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="person.username"
                    label="Usename"
                    disabled
                    outlined
                    hint="El usuario se genera automaticamente"
                    persistent-hint
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="person.password"
                    label="Contraseña"
                    disabled
                    outlined
                    hint="La contraseña se genera automaticamente"
                    persistent-hint
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-subtitle class="red--text">
                {{ errorsText }}
              </v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <UploadImage
              :image="person.imageUrl"
              @successUploaded="addImage($event)"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-subtitle> </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" to="/products" large>Cancelar</v-btn>
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
    <!--  -->
    <!--  -->
  </v-container>
</template>

<script>
import AddDialog from "../components/market/AddDialog.vue";
import UploadImage from "../components/market/UploadImage.vue";
import axios from "axios";
export default {
  components: {
    AddDialog,
    UploadImage,
  },
  data: () => ({
    genders: ["Masculino", "Femenino", "No Binario"],
    markets: [],
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
    },
    nameRules: [(v) => !!v || "El nombre del producto es requerido"],
    stockRules: [(v) => !!v || "El stock es requerido"],
    priceRules: [(v) => !!v || "El precio no debe estar vacio"],

    descriptionRules: [(v) => !!v || "La descripcion no debe estar vacio"],
    person: {
      name: "",
      surname: "",
      gender: "",
      number: "",
      email: "",
      description: "",
      imageUrl:
        "https://res.cloudinary.com/fulano/image/upload/v1617116017/profileimage_kptkl6.jpg",
      username: "",
      password: "",
    },
    discount: 0,
    withDiscount: false,
    dates: ["2021-03-21", "2021-03-20"],
    errors: [],
    categoriesComplete: [],
  }),
  computed: {
    errorsText() {
      return this.errors.join(", ");
    },
  },
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
  mounted() {
    axios
      .get("branchOffice/list")
      .then((res) => {
        const datas = res.data;
        const data = [];
        this.categoriesComplete = res;
        for (let key in datas) {
          const user = datas[key].name;
          data.push(user);
        }
        // console.log(data);
        this.markets = data;
      })
      .catch((error) => {
        console.warn(error);
      })
      .finally(() => {});
  },
  methods: {
    verifyData() {
      this.validateForm();
      console.log(this.valid);
      if (!this.valid) return;

      const imagesURLs = [];
      for (let key in this.person.imagesUrl) {
        const url = this.person.imagesUrl[key];
        imagesURLs.push({ photo: url });
      }
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
