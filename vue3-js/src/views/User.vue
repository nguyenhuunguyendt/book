<template>
  <div class="user">
    <Header />
    <div class="container">
      <div class="user-body row">
        <div class="col-2">
          <User />
        </div>
        <div class="col-10 child-user-component">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import ChangePassword from "../components/ChildComponentUser/ChangePassword.vue";
import User from "../components/User.vue";
</script>
<style scoped lang="scss">
.user {
  background-color: #e3e5e7;
  .user-body {
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
}
</style>
