import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "Home" },
    component: () => import("../views/layouts/MainLayout.vue"),
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("../views/pages/home/Home.vue"),
        meta: {
          title: "Home"
        }
      },
      {
        path: "prepare",
        name: "Prepare",
        component: () => import("../views/pages/prepare/Prepare"),
        meta: {
          title: "Prepare"
        }
      },
      {
        path: "learn",
        name: "Learn",
        component: () => import("../views/pages/learn/Learn"),
        meta: {
          title: "Learn"
        }
      },
      {
        path: "history",
        name: "History",
        component: () => import("../views/pages/history/History.vue"),
        meta: {
          title: "History"
        }
      },
      {
        path: "option",
        name: "Option",
        component: () => import("../views/pages/option/Option"),
        meta: {
          title: "Option"
        }
      }
    ]
  },
  {
    path: "/forbidden",
    name: "Forbidden",
    component: () => import("../views/pages/error/Page403"),
    meta: {
      title: "Forbidden"
    }
  },
  {
    path: "/not-found",
    name: "NotFound",
    component: () => import("../views/pages/error/Page404"),
    meta: {
      title: "Not Found"
    }
  },
  {
    path: "*",
    redirect: { name: "NotFound" }
  }
];

const router = new VueRouter({
  routes
});

export default router;
