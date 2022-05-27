<template>
  <ul class="list-user-des">
    <li class="manage-book">
      Quản lý sách
      <ul class="sub-mn-book">
        <li class="item-book">
          <router-link :to="{ path: '/user/manage-book-borrow' }">
            Sách đang mượn</router-link
          >
        </li>
        <li class="item-book">
          <router-link :to="{ path: '/user/manage-book-history' }">
            Lịch sử mượn</router-link
          >
        </li>
      </ul>
    </li>
    <li>
      <router-link :to="{ path: '/user/change-password' }"
        >Đổi mật khẩu</router-link
      >
    </li>
    <li @click="handleLogout">Đăng xuất</li>
  </ul>
</template>
<script setup>
import axios from "../config/axios";
import { useRouter } from "vue-router";
import { useLoading } from "vue-loading-overlay";
const $loading = useLoading();

const router = useRouter();
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
<style lang="scss" scoped>
.list-user-des {
  position: relative;
  .manage-book {
    &:hover {
      padding-bottom: 0;
      .sub-mn-book {
        display: block;
      }
    }
  }
  .sub-mn-book {
    display: none;
    font-size: 15px;
    padding-left: 26px;

    .item-book {
      padding: 10px;
      &:hover {
        color: #007bff;
      }
    }
  }
  list-style: none;
  padding-left: unset;
  li {
    // color: #555555;
    cursor: pointer;
    padding: 16px;
    display: block;
    border-bottom: 1px solid #f1f1f1;
    &:hover {
      color: #007bff;
    }
  }
}
</style>
