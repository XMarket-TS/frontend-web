import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/store.js";
import { products } from "./products/products";
import { user } from "./users/user";
Vue.use(VueRouter);

const routes = [
  ...products,
  ...user,
  {
    path: "/about",
    name: "About",
    component: () => import("../pages/About.vue"),
  },
  {
    // path: ":notFound(.*)",
    path: "*",
    name: "NotFound",
    component: () => import("../pages/NotFound.vue"),
  },
  {
    path: "/",
    name: "InfoPage",
    component: () => import("@/pages/InfoPage.vue"),
    beforeEnter(to, from, next) {
      console.log(to, from);
      if (store.getters.isLoggedIn) {
        const type = localStorage.getItem("type");
        if (type == "Market") {
          next({ name: "Inventory" });
        } else {
          next({ name: "Home" });
        }
      }
      next();
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(_, _2, savedPosition) {
    // console.log(to, from, savedPosition)
    if (savedPosition) {
      return savedPosition;
    }
    return {
      left: 0,
      top: 0,
    }; // Go to the start page on change view
  },
});

/// Navigation guards
router.beforeEach((to, from, next) => {
  const type = localStorage.getItem("type");
  // if (to.path == "/home" && type == "Market") {
  //   next({ name: "Inventory" });
  // }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log(to, from);
    store
      .dispatch("tryAutoLogin")
      .then(() => {
        console.log("TO: ", to.meta.type);
        console.log(
          "FROM: ",
          from.meta.type ? from.meta.type : "Type not set :C"
        );

        if (!type || !store.getters.isLoggedIn) {
          next({ name: "LoginAdmin" });
          return;
        } else if (to.meta.type == type) {
          next();
          return;
        } else if (from.name == "LoginAdmin" || from.name == "LoginManager") {
          next();
          return;
        } else {
          next({ name: "NotFound" });
        }
      })
      .catch((e) => {
        console.log(e);
        next({ name: "NotFound" });
      });
  } else {
    next();
  }
});

// router.afterEach((to, from) => {
//   // sending analytics data
//   console.log('Global afterEach')
//   console.log(to, from)
// })

export default router;
