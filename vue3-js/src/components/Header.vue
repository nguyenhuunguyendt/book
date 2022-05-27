<template>
  <div class="header">
    <div class="container">
      <div class="row align-items-center">
        <div class="header-logo col-6">
          <router-link :to="{ path: '/' }">
            <img src="../assets/logo.svg" alt="book" @click="redirectToHome" />
          </router-link>
        </div>

        <div
          v-if="userInfo"
          class="header-search align-items-center col-6 row justify-content-end"
        >
          <div class="email-user">Xin chào {{ userInfo.email }} !</div>
          <router-link :to="{ path: '/user/change-password' }">
            <img class="avatar-img" src="../assets/useravatar.png" alt="" />
          </router-link>
        </div>
        <div v-else class="btn log-in">
          <router-link :to="{ path: '/login' }">
            <button class="btn" @click="handleLogout">Đăng nhập</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import axios from "../config/axios";

const store = useStore();
const userInfo = computed(() => store.state.userInfo);
</script>

<style scoped lang="scss">
.log-in {
  position: absolute;
  top: 6px;
  right: 16px;
}
.header {
  .logout {
    margin-left: 21px;
  }
  .container {
    position: relative;
  }
  .email-user {
    margin: 20px 10px 0 0;
    color: wheat;
  }
  .list-description {
    display: inline-block;
    list-style: none;
    padding: unset;
    background: #eef1e7;
    padding: 10px;
    border-radius: 4px;
    position: absolute;
    top: 46px;
    right: -106px;
    margin: unset;
    z-index: 10;

    li {
      padding: 10px;
      cursor: pointer;
      border-bottom: 1px solid #babbae;
    }
  }
  background: #7e7d78;
  &-logo {
    height: 60px;
    img {
      height: 100%;
      cursor: pointer;
    }
  }

  &-search {
    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
}
.avatar-img:hover .list-description {
  display: block;
}
</style>
