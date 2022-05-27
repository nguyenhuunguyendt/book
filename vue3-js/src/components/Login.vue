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
      placeholder="Email "
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
    <p v-if="waitTime" class="message-login">{{ waitTime }}</p>
    <p v-if="numberWrong" class="message-login">{{ numberWrong }}</p>
    <button class="btn btn-lg btn-primary btn-block" type="submit">
      Đăng nhập
    </button>
    <router-link class="linkforgot" :to="{ path: 'forgot-pass' }">
      Quên mật khẩu ?
    </router-link>
    <p>
      <router-link :to="{ path: 'register' }">Đăng ký</router-link>
    </p>
  </form>
</template>
<script setup>
import { reactive, ref } from "vue";
import axios from "../config/axios";
import { useLoading } from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { useRouter } from "vue-router";

const $loading = useLoading();
const router = useRouter();
const waitTime = ref("");
const message = ref("");
const numberWrong = ref("");
const user = reactive({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  try {
    const loader = $loading.show({
      color: "#00ab00",
      backgroundColor: "#4b4b4b",
    });

    const data = await axios.post("/api/user/login", {
      email: user.email,
      password: user.password,
    });
    setTimeout(() => {
      loader.hide();
      if ((data && data.code === 400) || (data.code === 300 && data.message)) {
        message.value = data.message;
        if (data.waitTime) {
          waitTime.value = `Thời gian chờ : ${Math.ceil(
            data.waitTime / 60
          )} phút`;
        } else {
          waitTime.value = "";
        }
        if (data.numberWrong) {
          numberWrong.value = `Số lần sai : ${data.numberWrong}`;
        } else {
          numberWrong.value = "";
        }
      }
      if (data && data.code === 200) {
        message.value = "";
        router.push({ path: "/system/manage-book" });
      }
    }, 1000);
  } catch (error) {
    loader.hide();
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
.form-signin {
  .linkforgot {
    padding: 10px 0;
  }
  p {
    padding: 10px 0;
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
