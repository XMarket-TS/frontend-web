import Vue from "vue";
import VueRouter from "vue-router";
// import store from "../store/store.js";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/admin/login",
    // beforeEnter(to, from, next) {
    //   // Can verify if the user are authenticated
    //   console.log("before user enter");
    //   console.log(to, from);
    //   next();
    // },
    // component: () => import("../pages/Home.vue"),
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
    // beforeEnter(_, _2, next) {
    //   if (store.state.idToken) {
    //     next();
    //   } else {
    //     next("/admin/login");
    //   }
    // },
  },
  {
    path: "/product/add",
    name: "AddProduct",
    component: () => import("../pages/AddProduct.vue"),
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
// router.beforeEach((to, from, next) => {
// console.log('Global beforeEach')
// console.log(to, from);
// next() // or next(true)
// next(false) // to cancel routing

//  === Restrict navigation == Used for authentication
// if (to.name === 'team-members') {
//   next();
// } else {
//   next({
//     name: 'team-members',
//     params: {
//       id: 't2'
//     }
//   })
// }
//  ==== Auth example == look needsAuth value as meta in teams path
// if (to.meta.needsAuth) {
//   console.log("Needs Auth!")
//   next(); // can denegate access
// } else {
//   next();
// }

// if (store.state.idToken) {
//   next();
// } else {
//   next("/admin/login");
// }
// });

// router.afterEach((to, from) => {
//   // sending analytics data
//   console.log('Global afterEach')
//   console.log(to, from)
// })

export default router;
