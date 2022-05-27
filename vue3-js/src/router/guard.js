import store from "../store/index";
const guestGuard = (routes) => {
  return routes.map((route) => {
    return {
      ...route,
      beforeEnter: (to, from, next) => {
        if (store.state.userInfo && store.state.userInfo.isAdmin === 1) {
          next({ path: "/system/manage-book" });
        }
        if (store.state.userInfo && store.state.userInfo.isAdmin === 0) {
          next({ path: "/" });
        } else {
          next();
        }
      },
    };
  });
};

export { guestGuard };
