import moment from "moment";

export const actions = {
  methods: {
    editItem(item) {
      this.editedIndex = this.offers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem);
      const startDate = moment(
        this.editedItem.startDate,
        "DD - MM - YYYY"
      ).format("YYYY-MM-DD");
      const endDate = moment(this.editedItem.endDate, "DD - MM - YYYY").format(
        "YYYY-MM-DD"
      );
      this.active = this.editedItem.status;
      this.dates = [startDate, endDate];
      this.editedItem.startDate = startDate;
      this.editedItem.endDate = endDate;
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.offers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
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
  },
};
