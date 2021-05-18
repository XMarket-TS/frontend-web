<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card class="mx-auto" max-width="60%">
          <v-card-title>
            <v-img
              contain
              max-height="200px"
              position="center"
              src="../assets/logo_market.png"
            ></v-img>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-card>
          <v-card-title>
            Iniciar sesion como '<strong>Administrador</strong>'
          </v-card-title>
          <v-card-text>
            Como Administrador podras realizar las siguientes acciones:
            <ul>
              <li>Agregar nuevas sucursales</li>
              <li>Agregar nuevos encargados de markets</li>
              <li>Obtener un tablero de ventas y productos mas vendidos</li>
              <li>Inhabilitar o habilitar sucursales</li>
              <li>Inhabilitar o habilitar usuarios</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" to="/admin/login"> Administrador </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-card>
          <v-card-title>
            Iniciar sesion como '<strong>Market</strong>'
          </v-card-title>
          <v-card-text>
            Como Market podras realizar las siguientes acciones:
            <ul>
              <li>Ver todos los productos de la sucursal asignada</li>
              <li>Agregar nuevos productos</li>
              <li>Editar o eliminar la informacion de los productos</li>
              <li>Agregar nuevas ofertas</li>
              <li>Eliminar ofertas</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" to="/market/login"> Market </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>