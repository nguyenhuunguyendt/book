<template>
  <div class="container-fluid px-0 navigation-header-admin">
    <nav class="navbar navbar-expand-lg navbar-dark bg-black py-0 px-0">
      <button
        class="navbar-toggler mr-3"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" :to="{ path: '/' }">
              Home
            </router-link>
          </li>
          <li class="nav-item active">
            <router-link
              class="nav-link"
              :to="{ path: '/system/manage-user/overview' }"
            >
              Quản lý người dùng
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ path: '/system/manage-book' }">
              Quản lý sách
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ path: '/system/store' }"
              >Thông tin mượn sách</router-link
            >
          </li>
          <button class="btn-logout" @click="handleLogout">Đăng xuất</button>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script setup>
import axios from "../../config/axios";
import { useRouter } from "vue-router";
const router = useRouter();
import { useLoading } from "vue-loading-overlay";
const $loading = useLoading();

const handleLogout = async () => {
  try {
    const check = confirm("Bạn muốn đăng xuất");
    if (check) {
      const loader = $loading.show({
        color: "#00ab00",
        backgroundColor: "#4b4b4b",
      });

      await axios.post("/api/user/logout");
      setTimeout(() => {
        loader.hide();
        router.push({ name: "login" });
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
<style scoped lang="scss">
.navigation-header-admin {
  .btn-logout {
    cursor: pointer;
    outline: none;
    position: absolute;
    top: 14px;
    right: 14px;
  }

  .bg-black {
    background-color: #7e7d78;
  }

  .navbar-brand {
    padding: 11px 20px;
  }

  .navbar-nav {
    width: 100%;
  }

  .nav-link {
    color: inherit !important;
  }

  .nav-item {
    padding: 6px 20px;
    color: black;
  }

  .nav-item:hover {
    background-color: #fff;
    color: #000 !important;
  }

  .right {
    margin-left: auto;
  }

  .navbar-collapse.collapse.in {
    display: block !important;
  }

  @media (max-width: 992px) {
    .right {
      margin-left: 0;
    }

    .nav-item {
      width: 100%;
    }
  }
}
</style>
