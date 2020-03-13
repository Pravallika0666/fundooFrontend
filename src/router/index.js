import Vue from "vue";
import VueRouter from "vue-router";
import login from "../components/login";
import register from "../components/register";
import forgotpassword from "../components/forgotpassword";
import resetpwd from "../components/resetpwd";
import dashboard from "../components/dashboard";
import note from "../components/note";
import archive from "../components/archive";
import trash from "../components/trash"
import VueMaterial from 'vue-material';
import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(require("vue-moment"));
Vue.use(VueMaterial)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/",
    name: "register",
    component: register
  },
  {
    path: "/forgotpassword",
    name: "forgotpassword",
    component: forgotpassword
  },
  {
    path: "/resetpwd",
    name: "resetpwd",
    component: resetpwd
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token") === null || localStorage.getItem("token") === "" || localStorage.getItem("token") === undefined) {
        next('/')
      } else {
        next(true)
      }
    },
    children: [
      {
        path: '/',
        redirect: 'note',
        pathMatch: 'full'
      },
      {
        path: 'note',
        component: note
      },
      {
        path: 'archive',
        component: archive
      },
      {
        path: 'trash',
        component: trash
      }
    ]
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});


export default router;
