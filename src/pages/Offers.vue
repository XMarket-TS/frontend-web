<template>
  <v-container>
    <v-card class="mx-auto">
      <v-data-table
        :headers="headers"
        :items="offers"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="item.status === 'Activo' ? 'green' : 'red'" dark>
            {{ item.status }}
          </v-chip>
        </template>

        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              <v-btn color="primary" icon to="/products/">
                <v-icon>mdi-keyboard-backspace</v-icon>
              </v-btn>
              Historial de Ofertas
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nueva oferta
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="justify-center">
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.percentage"
                          label="Porcentaje"
                          append-icon="mdi-sale"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-date-picker
                          v-model="dates"
                          range
                          no-title
                          scrollable
                          color="success"
                          elevation="3"
                          first-day-of-week="1"
                          full-width
                        ></v-date-picker>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data> El producto no contiene ofertas </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  props: {
    productId: {
      type: String,
      default: "-1",
    },
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Offerta",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Desde", value: "startDate" },
      { text: "Hasta", value: "endDate" },
      { text: "% Porcentaje", value: "percentage" },
      { text: "Estado", value: "status" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    offers: [],
    editedIndex: -1,
    editedItem: {
      startDate: "",
      endDate: "",
      percentage: 0,
      status: "Inactive",
    },
    defaultItem: {
      startDate: "",
      endDate: "",
      percentage: 0,
      status: "Inactive",
    },
    dates: ["20-03-2021", "21-03-2021"],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva oferta" : "Editar oferta";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.offers = [
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.offers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.offers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.offers.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.offers[this.editedIndex], this.editedItem);
      } else {
        this.offers.push(this.editedItem);
      }
      this.close();
    },
  },
  mounted() {
    axios.get("product/offers/" + this.productId).then((result) => {
      // console.log(result);
      const data = result.data;
      const offers = [];
      for (let res in data) {
        let offer = data[res];
        var start = new Date(offer.startDate);
        var end = new Date(offer.endDate);
        offers.push({
          name: parseInt(res) + 1,
          startDate: moment(start).format("DD - MMM - YYYY"),
          endDate: moment(end).format("DD - MMM - YYYY"),
          percentage: offer.percentage,
          status: offer.status == 1 ? "Activo" : "Inactivo",
        });
      }
      // console.log(offers);
      this.offers = offers;
    });
  },
};
</script>

<style>
</style>