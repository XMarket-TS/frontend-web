<template>
  <v-container>
    <v-card class="mx-auto">
      <v-col cols="12">
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              append-icon="mdi-sale"
              label="Descuento"
              type="number"
              max="100"
              min="0"
              v-model.number="discount"
              placeholder="1 - 100"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="8">
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
      </v-col>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>