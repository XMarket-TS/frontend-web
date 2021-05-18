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
          <v-chip :color="item.status === 1 ? 'green' : 'red'" dark>
            {{ item.status == 1 ? "Activo" : "Inactivo" }}
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
                      <v-col cols="12" sm="8" md="8">
                        <v-text-field
                            v-model.number="editedItem.percentage"
                            label="Porcentaje"
                            append-icon="mdi-sale"
                            type="number"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-switch
                            v-model="active"
                            color="primary"
                            label="Activo"
                        ></v-switch>
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
                    Cancelar
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                >Are you sure you want to delete this item?
                </v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel
                  </v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK
                  </v-btn
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
          <v-icon small @click="deleteItem(item)"> mdi-delete</v-icon>
        </template>
        <template v-slot:no-data> El producto no contiene ofertas</template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
import {actions} from "@/mixins/offers";

export default {
  props: {
    productId: {
      type: String,
      default: "-1",
    },
  },
  mixins: [actions],
  data: () => ({
    active: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Oferta",
        align: "start",
        sortable: false,
        value: "name",
      },
      {text: "Desde", value: "startDate"},
      {text: "Hasta", value: "endDate"},
      {text: "% Porcentaje", value: "percentage"},
      {text: "Estado", value: "status"},
      {text: "Acciones", value: "actions", sortable: false},
    ],
    offers: [],
    editedIndex: -1,
    editedItem: {
      startDate: "",
      endDate: "",
      percentage: 0,
      status: 0,
    },
    defaultItem: {
      startDate: "",
      endDate: "",
      percentage: 0,
      status: 0,
    },
    dates: [],
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

  methods: {
    deleteItemConfirm() {
      // console.log(this.offers[this.editedIndex]);
      axios
          .delete("offer/delete/" + this.offers[this.editedIndex].offerId)
          .then(() => {
            this.offers.splice(this.editedIndex, 1);
          })
          .catch((e) => {
            console.error(e);
          });
      this.closeDelete();
    },

    save() {
      if (this.editedIndex > -1) {
        console.log("edit");
        console.log(this.editedItem);
        axios.put("offer/update", this.editedItem).then((res) => {
          console.log(res);
          this.offers[this.editedIndex] = this.editedItem;
        });
      } else {
        console.log("create");
        this.editedItem.startDate = this.dates[0];
        this.editedItem.endDate = this.dates[1];
        this.editedItem.status = this.active ? 1 : 0;
        this.editedItem.productId = this.productId;
        console.log(this.editedItem);
        axios.post("offer/new", this.editedItem).then((res) => {
          console.log(res);
          this.editedItem.startDate = moment(
              this.dates[0],
              "YYYY-MM-DD"
          ).format("DD - MM - YYYY");
          this.editedItem.endDate = moment(this.dates[1], "YYYY-MM-DD").format(
              "DD - MM - YYYY"
          );
          this.editedItem.status = this.active ? "Activo" : "Inactivo";
          console.log(this.editedItem);
          this.offers.push(this.editedItem);
        });
      }
      this.close();
    },
  },
  mounted() {
    axios.get("offer/product/" + this.productId).then((result) => {
      // console.log(result);
      const data = result.data;
      const offers = [];
      for (let res in data) {
        let offer = data[res];
        var start = new Date(offer.startDate);
        var end = new Date(offer.endDate);
        offers.push({
          offerId: offer.offerId,
          productId: offer.productId,
          // name: parseInt(res) + 1,
          startDate: moment(start).format("DD - MM - YYYY"),
          endDate: moment(end).format("DD - MM - YYYY"),
          percentage: offer.percentage,
          status: offer.status,
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