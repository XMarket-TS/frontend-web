import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.filter("roundPrice", function(value) {
  if (!value) return "0.00";
  value = value.toFixed(2).toString();
  return value;
});
new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
