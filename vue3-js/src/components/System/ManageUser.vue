<template>
  <div class="manage-user">
    <div class="container">
      <h3 class="header">QUẢN LÝ NGƯỜI DÙNG</h3>
      <div class="user-body row">
        <div class="col-2">
          <ul class="list-user-des">
            <li class="manage-book">
              <router-link :to="{ path: '/system/manage-user/overview' }"
                >Tổng quan người dùng</router-link
              >
            </li>
          </ul>
        </div>
        <div class="col-10 child-user-component">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { createToast } from "mosha-vue-toastify";

import { onMounted, ref } from "vue";
import axios from "../../config/axios";
</script>

<style scoped lang="scss">
.manage-user {
  .header {
    padding: 15px;
  }
  .user-body {
    .col-2 {
      min-height: 790px;
    }
    padding-top: 15px;

    .col-10 {
      padding: unset;
    }
    .child-user-component {
      min-height: 790px;
      background-color: white;
      border-radius: 3px;
    }
  }
  background: #e3e5e7;

  h3 {
    text-align: center;
    margin: 0 15px 0;
  }
  .list-user-des {
    position: relative;

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
}
</style>
