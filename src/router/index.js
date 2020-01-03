import Vue from "vue";
import VueRouter from "vue-router";
import login from "../components/login";
import register from "../components/register";
import forgotpassword from "../components/forgotpassword";
import resetpwd from "../components/resetpwd";
import VueMaterial from 'vue-material'
import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(VueMaterial)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: login
  },
  {
    path:"/register",
    name:"register",
    component:register
  },
  {
    path:"/forgotpassword",
    name:"forgotpassword",
    component:forgotpassword
  },
  {
    path:"/resetpwd",
    name:"resetpwd",
    component:resetpwd
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
