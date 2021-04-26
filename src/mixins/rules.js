export const rules = {
  mounted() {
    console.log("Added rules on mixin");
  },
  data: () => ({
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
      descriptionRules: (v) => !!v || "La descripcion no debe estar vacio",
    },
  }),
};
