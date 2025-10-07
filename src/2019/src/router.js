import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/achievement",
      name: "achievement",
      component: () => import("./views/achievement.vue"),
    },
    {
      path: "/message",
      name: "message",
      component: () => import("./views/message.vue"),
    },
    {
      path: "/sample",
      name: "sample",
      component: () => import("./views/sample.vue"),
    },
  ],
});
