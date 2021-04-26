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
    meta: {
      type: "Market",
    },
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
    path: "/product/edit/:productId",
    name: "Product",
    component: () => import("../pages/ProductInfo.vue"),
    meta: {
      requiresAuth: true,
      type: "Market",
    },
    props: true,
  },
  {
    path: "/product/offer/:productId/view",
    name: "Offer",
    component: () => import("../pages/Offers.vue"),
    meta: {
      requiresAuth: true,
      type: "Market",
    },
    props: true,
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
    path: "/add-new/market",
    name: "NewMarket",
    component: () => import("../pages/AddMarket.vue"),
  },
  {
    path: "/add-new/manager",
    name: "NewManager",
    component: () => import("../pages/AddManager.vue"),
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
  // console.log(to, from);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log("TO: ", to.meta.type);
    console.log("FROM: ", from.meta.type ? from.meta.type : "Type not set :C");
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    if (from.meta.type == "Market") {
      next({ name: "LoginManager" });
      return;
    }
    next({ name: "LoginAdmin" });
    // console.log(to, from);
    return;
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
