import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
// import { useConfigStore } from "@/stores/config";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/Default.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboards"],
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/Auth.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () => import("@/views/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
    ],
  },
  //   {
  //     path: "/",
  //     component: () => import("@/layouts/SystemLayout.vue"),
  //     children: [
  //       {
  //         // the 404 route, when none of the above matches
  //         path: "/404",
  //         name: "404",
  //         component: () => import("@/views/crafted/authentication/Error404.vue"),
  //         meta: {
  //           pageTitle: "Error 404",
  //         },
  //       },
  //       {
  //         path: "/500",
  //         name: "500",
  //         component: () => import("@/views/crafted/authentication/Error500.vue"),
  //         meta: {
  //           pageTitle: "Error 500",
  //         },
  //       },
  //     ],
  //   },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    // If the route has a hash, scroll to the section with the specified ID; otherwise, scroll toc the top of the page.
    if (to.hash) {
      return {
        el: to.hash,
        top: 80,
        behavior: "smooth",
      };
    } else {
      return {
        top: 0,
        left: 0,
        behavior: "smooth",
      };
    }
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  authStore.verifyAuth();

  if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next({ name: "sign-in" });
    }
  } else {
    next();
  }
});

export default router;
