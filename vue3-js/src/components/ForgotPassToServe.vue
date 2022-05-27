<template>
  <form @submit.prevent="handleSubmit" class="form-signin">
    <h1 class="h3 mb-3 font-weight-normal">
      Thư viện Đại học Kinh Doanh và Công nghệ
    </h1>
    <input
      v-model="pass"
      type="password"
      id="inputEmail"
      class="form-control"
      placeholder="Mật khẩu mới"
      required
      autofocus
    />
    <button class="btn btn-lg btn-primary btn-block" type="submit">
      Xác nhận
    </button>
  </form>
</template>
<script setup>
import { reactive, ref } from "vue";
import axios from "../config/axios";
import { useLoading } from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { useRouter } from "vue-router";
import { createToast } from "mosha-vue-toastify";

const $loading = useLoading();
const router = useRouter();
const pass = ref("");
const handleSubmit = async () => {
  try {
    const id = router.currentRoute.value.params.id;
    const token = router.currentRoute.value.params.token;
    console.log(id, token);
    const response = await axios.put(
      `/api/user/reset-password-email/${id}/${token}`,
      { passwordNew: pass.value }
    );
    console.log(response);
    if (response.code === 200) {
      createToast(response.message, { type: "success" });
    }
    if (response.code === 300) {
      createToast(response.message, { type: "warning" });
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
.form-signin {
  min-height: 359px;
  .btn-lg {
    margin-top: 30px;
  }
  p {
    cursor: pointer;
  }
  .forgot-pass {
    margin-top: 10px;
  }
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
  text-align: center;
  background-color: #f3f1ee;
  border-radius: 5px;
  .message-login {
    color: #d20e0e;
    text-align: left;
    margin: 5px 0;
  }
  .checkbox {
    font-weight: 400;
  }
  .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  input[type="text"] {
    margin-bottom: 11px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .form-control:focus {
    z-index: 2;
  }
}
</style>
