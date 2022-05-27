import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/Login.vue";
import HomeView from "../views/Home.vue";
import DetailBook from "../views/DetailBook.vue";
import RegisterView from "../views/Register.vue";
import axios from "../config/axios";
import store from "../store/index";
import { authGuard, guestGuard } from "./guard";
import User from "../views/User.vue";
import ChangePassword from "../components/ChildComponentUser/ChangePassword.vue";
import BookBorrow from "../components/ChildComponentUser/BookBorrow.vue";
import ManageBook from "../components/System/ManageBook.vue";
import ManageUser from "../components/System/ManageUser";
import System from "../views/System.vue";
import OveriewUser from "../components/System/ManageUserChild/OveriewUser.vue";
import ResetPass from "../components/System/ManageUserChild/ResetPass.vue";
import StoreInfo from "../components/System/StoreInfo.vue";
import History from "../components/ChildComponentUser/History.vue";
import StoreUser from "../components/System/ManageUserChild/StoreUser.vue";
import ForgotPass from "../views/ForgotPass.vue";
import ForgotPassToServe from "../views/ForgotPassToServe.vue";
import PageNotFound from "../views/PageNotFound.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/book/:id",
    name: "DetailBook",
    component: DetailBook,
  },
  {
    path: "/forgot-pass",
    name: "Forgot",
    component: ForgotPass,
  },
  {
    path: "/forgot-pass/:id/:token",
    name: "ForgotPasstoServe",
    component: ForgotPassToServe,
  },
  {
    path: "/user",
    name: "User",
    component: User,
    beforeEnter: (to, from, next) => {
      if (store.state.userInfo) {
        next();
      } else {
        next({ path: "/" });
      }
    },
    children: [
      {
        path: "change-password",
        component: ChangePassword,
      },
      {
        path: "manage-book-borrow",
        component: BookBorrow,
      },
      {
        path: "manage-book-history",
        component: History,
      },
    ],
  },
  {
    path: "/system",
    name: "System",
    component: System,
    beforeEnter: (to, from, next) => {
      if (!store.state.userInfo) {
        next({ name: "login" });
      }
      if (store.state.userInfo.isAdmin === 0) {
        next({ path: "/" });
      }
      if (store.state.userInfo.isAdmin === 1) {
        next();
      }
    },
    children: [
      {
        path: "manage-user",
        component: ManageUser,
        children: [
          {
            path: "overview",
            component: OveriewUser,
          },
          {
            path: "reset-password/:id",
            component: ResetPass,
          },
          {
            path: "store/:id",
            name: "StoreUser",
            component: StoreUser,
          },
        ],
      },
      {
        path: "manage-book",
        component: ManageBook,
      },
      {
        path: "store",
        component: StoreInfo,
      },
    ],
  },
  ...guestGuard([
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
  ]),
  { path: "/:pathMatch(.*)*", name: "NotFound", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const response = await axios.get("/api/user/auth");
  if ((response && response.code === 200, response.user)) {
    store.commit("setUserInfo", response.user);
  } else {
    store.commit("setUserInfo", null);
  }
  next();
});

export default router;
