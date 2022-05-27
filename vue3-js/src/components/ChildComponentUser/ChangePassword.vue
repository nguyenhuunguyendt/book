<template>
  <div class="change-password">
    <div class="password-title">
      <h4>Đổi mật khẩu</h4>
      <p>
        Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
      </p>
    </div>
    <div class="password-body row flex-column align-items-center">
      <div class="col-6">
        <label for="">Mật khẩu hiện tại</label>
        <input
          v-model="password.passwordOld"
          type="password"
          class="form-control"
        />
        <p v-if="messagePassWrong" class="message-wrong">
          {{ messagePassWrong }}
        </p>
        <span class="forgot-pass" @click="handleForgotPass">
          Quên mật khẩu ?</span
        >
      </div>
      <div class="col-6">
        <label for="">Mật khẩu mới</label>
        <input
          v-model="password.passwordNew"
          type="password"
          class="form-control"
        />
        <p v-if="message" class="message-change-pass">{{ message }}</p>
      </div>
      <div class="col-6">
        <label for="">Xác nhận mật khẩu </label>
        <input
          v-model="password.passwordConfirm"
          type="password"
          class="form-control"
        />
      </div>
      <button class="btn btn-primary" @click="handleChangePass">
        Xác nhận
      </button>
    </div>
  </div>
</template>
<script setup>
import configLoader from "../../config/loader";
import { ref, reactive, computed } from "vue";
import axios from "../../config/axios";
import { useLoading } from "vue-loading-overlay";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import { useStore } from "vuex";

const store = useStore();
const userInfo = computed(() => store.state.userInfo);

const $loading = useLoading();
const message = ref("");
const messagePassWrong = ref("");
const password = reactive({
  passwordOld: "",
  passwordNew: "",
  passwordConfirm: "",
});

const handleForgotPass = async () => {
  try {
    const isSend = confirm("Xác nhận gửi mail reset mật khẩu");
    if (!isSend) return;
    if (!userInfo.value.email) {
      return alert("Không có địa chỉ email");
    }
    const loader = $loading.show({
      color: "#00ab00",
      backgroundColor: "#4b4b4b",
    });
    const response = await axios.post("/api/user/forgot-password", {
      email: userInfo.value.email,
    });
    if (response.code === 200) {
      createToast(response.message, { type: "success" });
    }
    if (response.code === 300) {
      createToast(response.message, { type: "warning" });
    }
    loader.hide();
  } catch (error) {
    console.log(error);
  }
};

const handleChangePass = async () => {
  try {
    message.value = "";
    messagePassWrong.value = "";
    if (password.passwordNew !== password.passwordConfirm) {
      message.value = "Mật khẩu mới và mật khẩu xác nhận không giống nhau";
      return;
    }
    if (password.passwordNew.length < 5) {
      message.value = "Độ dài mật khẩu phải lớn hơn 5";
      return;
    }
    const loader = $loading.show(configLoader);
    const response = await axios.put("/api/user/change-password", {
      passwordOld: password.passwordOld,
      passwordNew: password.passwordNew,
    });
    setTimeout(() => {
      loader.hide();
      if (response.code === 200 && response.userUpdated) {
        createToast("Thay đổi mật khẩu thành công", {
          type: "success",
        });
      }
      if (response.code === 400 && response.message) {
        createToast(response.message, {
          type: "info",
          toastBackgroundColor: "#ff424f",
        });
      }
    }, 1500);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
.change-password {
  color: #333;
  .password-body {
    .message-change-pass {
      text-align: left;
      color: #ff424f;
    }
    .forgot-pass {
      cursor: pointer;
      position: absolute;
      top: 36px;
      right: -138px;
    }
    margin-top: 20px;
    margin-bottom: 20px;
    button {
      margin-top: 20px;
    }
  }
  .password-title {
    padding: 29px;
    border-bottom: 0.0625rem solid #efefef;
  }
}
</style>
