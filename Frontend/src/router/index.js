import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/userViews/HomeView.vue";
import Login from "../views/Login.vue"
import RegisterView from "../views/RegisterView.vue"
import ReservasView from "../views/userViews/ReservasView.vue"
import EditarPerfilViewVue from "../views/EditarPerfilView.vue";
import HomeAdmin from "../views/adminViews/HomeAdmin.vue"
import PaymentView from "../views/userViews/PaymentView.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/reservations",
      name: "reservations",
      component: ReservasView,
    },
    {
      path: "/editProfile",
      name: "editProfile",
      component: EditarPerfilViewVue,
    },
    {
      path: "/admin",
      name: "admin",
      component: HomeAdmin
    },
    {
      path:"/payment",
      name:"payment",
      component: PaymentView
    },
  ],
});

export default router;
