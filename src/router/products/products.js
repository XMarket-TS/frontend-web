export const products = [
  {
    path: "/products",
    name: "Inventory",
    component: () => import("@/pages/Inventory.vue"),
    meta: {
      requiresAuth: true,
      type: "Market",
    },
  },
  {
    path: "/product/edit/:productId",
    name: "Product",
    component: () => import("@/pages/ProductInfo.vue"),
    meta: {
      requiresAuth: true,
      type: "Market",
    },
    props: true,
  },
  {
    path: "/product/offer/:productId/view",
    name: "Offer",
    component: () => import("@/pages/Offers.vue"),
    meta: {
      requiresAuth: true,
      type: "Market",
    },
    props: true,
  },
  {
    path: "/product/add",
    name: "AddProduct",
    component: () => import("@/pages/AddProduct.vue"),
    meta: {
      requiresAuth: true,
      type: "Market",
    },
  },
];
