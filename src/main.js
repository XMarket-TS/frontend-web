import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";
// axios.defaults.baseURL = 'https://intense-springs-55547.herokuapp.com/';
// axios.defaults.headers.common['Authorization'] = 'fasfdsa'
axios.defaults.headers.get["Accepts"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

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
