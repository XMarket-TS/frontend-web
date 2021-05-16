import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

// import router from "../router/index.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: null,
    user: {},
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, data) {
      state.status = "success";
      state.token = data.personId;
      state.user = data;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = null;
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "/admin/login",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            // console.log(resp);
            const token = resp.data.personId;
            localStorage.setItem("token", token);
            localStorage.setItem("type", "Admin");
            // Add the following line:
            // axios.defaults.headers.common["Authorization"] = token;
            resp.data.type = "admin";
            commit("auth_success", resp.data);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    loginManager({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "/manager/login",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            // console.log(resp);
            const token = resp.data.personId;
            localStorage.setItem("token", token);
            localStorage.setItem("type", "Market");
            // Add the following line:
            // axios.defaults.headers.common["Authorization"] = token;
            resp.data.type = "manager";
            commit("auth_success", resp.data);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "/register",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            // Add the following line:
            // axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("type");
        resolve();
      });
    },
    tryAutoLogin({ commit }) {
      return new Promise((resolve, reject) => {
        const token = localStorage.getItem("token");
        const type = localStorage.getItem("type");
        if (!token || !type) {
          // reject(1);
          return;
        }
        if (type == "manager") {
          axios
            .get("/manager/login/" + token)
            .then((resp) => {
              const user = resp.data;
              // axios.defaults.headers.common["Authorization"] = token;
              commit("auth_success", user);
              resolve(resp);
            })
            .catch((err) => reject(err));
        } else {
          axios
            .get("/admin/login/" + token)
            .then((resp) => {
              const user = resp.data;
              commit("auth_success", user);
              resolve(resp);
            })
            .catch((err) => reject(err));
        }
      });
    },
  },
  getters: {
    isLoggedIn: (state) => {
      if (state.token || localStorage.getItem("token")) return true;
      else return false;
    },
    authStatus: (state) => state.status,
    getUser: (state) => state.user,
  },
});
