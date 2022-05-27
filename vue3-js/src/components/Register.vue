<template>
  <form @submit.prevent="handleSubmit" class="form-signin">
    <h1 class="h3 mb-3 font-weight-normal">
      Thư viện Đại học Kinh Doanh và Công nghệ
    </h1>
    <input
      v-model="user.email"
      type="email"
      id="inputEmail"
      class="form-control"
      placeholder="Email đăng kí"
      required
      autofocus
    />
    <input
      v-model="user.password"
      type="password"
      id="inputPassword"
      class="form-control"
      placeholder="Mật khẩu"
      required
    />
    <p v-if="message" class="message-login">{{ message }}</p>
    <p v-if="messageSuccess" class="message-login-success">
      {{ messageSuccess }}
    </p>
    <button class="btn btn-lg btn-primary btn-block" type="submit">
      Đăng kí
    </button>
    <p class="login" @click="redirectLogin">Đăng nhập</p>
    <p>
      <router-link :to="{ path: 'forgot-pass' }"> Quên mật khẩu ? </router-link>
    </p>
  </form>
</template>
<script setup>
import { reactive, ref } from "vue";
import axios from "../config/axios";
import { useLoading } from "vue-loading-overlay";
import { useRouter } from "vue-router";
const $loading = useLoading();
const router = useRouter();
const message = ref("");
const messageSuccess = ref("");
const user = reactive({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  message.value = "";
  messageSuccess.value = "";

  try {
    const loader = $loading.show({
      color: "#00ab00",
      backgroundColor: "#4b4b4b",
    });
    const reponse = await axios.post("/api/user/register", {
      email: user.email,
      password: user.password,
    });
    setTimeout(() => {
      loader.hide();
      if (reponse && reponse.message && reponse.code === 300) {
        message.value = reponse.message;
      }
      if (reponse && reponse.code === 200 && reponse.inserted) {
        messageSuccess.value = "Đăng ký thành công";
      }
    }, 2000);
  } catch (error) {
    loader.hide();
    console.log(error);
  }
};
const redirectLogin = () => {
  router.push({ path: "/login" });
};
</script>
<style lang="scss" scoped>
.form-signin {
  .login {
    margin-top: 10px;
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
  }
  .message-login-success {
    color: green;
    text-align: left;
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
