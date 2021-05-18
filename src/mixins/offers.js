// import moment from "moment";

export const actions = {
  methods: {
    editItem(item) {
      this.editedIndex = this.offers.indexOf(item);
      console.log(this.editedIndex);
      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem);
      const startDate = this.editedItem.startDate;
      const endDate = this.editedItem.endDate;
      this.active = this.editedItem.status;
      this.dates = [startDate, endDate];
      console.log(this.dates);
      // this.editedItem.startDate = startDate;
      // this.editedItem.endDate = endDate;
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
