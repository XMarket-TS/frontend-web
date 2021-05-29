<template>
  <v-container>
    <v-card class="mx-auto">
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Agregar nuevo administrador</v-toolbar-title>
      </v-toolbar>
      <br />
      <v-card-text class="text-center">
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-row>
            <v-col cols="12" sm="8">
              <GenerateData
                :password="person.password"
                :username="person.username"
              ></GenerateData>
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
              <ProfileImage
                :image="person.imageUrl"
                @successUploaded="addImage($event)"
              />
            </v-col>
          </v-row>
        </v-form>
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
import AddDialog from "../components/user/AddDialog.vue";
import ProfileImage from "../components/user/ProfileImage.vue";
import GenerateData from "../components/user/GenerateData.vue";
import axios from "axios";
import { rules } from "../mixins/rules";

export default {
  components: {
    AddDialog,
    ProfileImage,
    GenerateData,
  },
  mixins: [rules],
  data: () => ({
    genders: ["Masculino", "Femenino", "No Binario"],
    valid: false,

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
  },
  methods: {
    verifyData() {
      this.validateForm();
      console.log(this.valid);
      if (!this.valid) return;
      const formData = {
        name: this.person.name,
        surname: this.person.surname,
        username: this.person.username,
        userPhoto: this.person.imageUrl,
        gender: this.person.gender,
        email: this.person.email,
        description: this.person.description,
        cellphone: this.person.number,
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
  },
};
</script>

<style>
</style>