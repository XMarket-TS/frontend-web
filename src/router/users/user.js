export const user = [
  {
    path: "/home",
    name: "Home",
    component: () => import("@/pages/Home.vue"),
    meta: {
      requiresAuth: true,
      type: "Admin",
    },
  },
  {
    path: "/admin/login",
    name: "LoginAdmin",
    component: () => import("@/pages/LoginAdmin.vue"),
  },
  {
    path: "/market/login",
    name: "LoginManager",
    component: () => import("@/pages/LoginManager.vue"),
  },
  {
    path: "/add-new/market",
    name: "NewMarket",
    component: () => import("@/pages/AddMarket.vue"),
    meta: {
      requiresAuth: true,
      type: "Admin",
    },
  },
  {
    path: "/add-new/manager",
    name: "NewManager",
    component: () => import("@/pages/AddManager.vue"),
    meta: {
      requiresAuth: true,
      type: "Admin",
    },
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("@/pages/Account.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/users/list",
    name: "Users",
    component: () => import("@/pages/Users.vue"),
    meta: {
      requiresAuth: true,
      type: "Admin",
    },
  },
];
