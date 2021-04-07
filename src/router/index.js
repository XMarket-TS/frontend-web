import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/store.js";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/Home.vue"),
    meta: {
      requiresAuth: true,
      type: "Admin",
    },
  },
  {
    path: "/admin/login",
    name: "LoginAdmin",
    component: () => import("../pages/LoginAdmin.vue"),
  },
  {
    path: "/market/login",
    name: "LoginManager",
    component: () => import("../pages/LoginManager.vue"),
  },
  {
    path: "/products",
    name: "Inventory",
    component: () => import("../pages/Inventory.vue"),
    meta: {
      requiresAuth: true,
      type: "Market",
    },
  },
  {
    path: "/product/add",
    name: "AddProduct",
    component: () => import("../pages/AddProduct.vue"),
    meta: {
      requiresAuth: true,
      type: "Market",
    },
  },
  {
    path: "/add-new/manager",
    name: "NewMarket",
    component: () => import("../pages/AddMarket.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../pages/About.vue"),
  },
  {
    // path: ":notFound(.*)",
    path: "*",
    name: "PageNotFound",
    component: () => import("../pages/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  // scrollBehavior(_, _2, savedPosition) {
  //   // console.log(to, from, savedPosition)
  //   if (savedPosition) {
  //     return savedPosition;
  //   }
  //   return {
  //     left: 0,
  //     top: 0,
  //   }; // Go to the start page on change view
  // },
});

/// Navigation guards
router.beforeEach((to, from, next) => {
  console.log(to, from);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // console.log(store.getters.isLoggedIn);
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    console.log(from.meta.type);
    if (from.meta.type == "Market") {
      next({ name: "LoginManager" });
    }
    next({ name: "LoginAdmin" });
    // console.log(to, from);
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
