<template>
  <div class="reset-password">
    <div class="col-6">
      <label for=""
        >Nhập mật khẩu mới cho người dùng id :
        {{ router.currentRoute.value.params.id }}</label
      >
      <input
        v-model.trim="pass"
        type="password"
        class="form-control"
        placeholder="Mật khẩu mới"
      />
      <button class="btn btn-primary" @click="handleResetPass">Xác nhận</button>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "../../../config/axios";
import { createToast } from "mosha-vue-toastify";

const router = useRouter();
const pass = ref();
const handleResetPass = async () => {
  try {
    const id = router.currentRoute.value.params.id;
    const response = await axios.put(`/api/system/reset-password/${id}`, {
      passwordNew: pass.value,
    });
    if (response.code === 200 && response.userUpdated) {
      createToast(response.message, { type: "success" });
    }
    if (response.code === 300) {
      createToast(response.message, { type: "warning" });
    }
    router.push({ path: "/system/manage-user/overview" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
.reset-password {
  width: 600px;
  margin: 0 auto;
  .col-6 {
    margin: 30px auto;
    button {
      margin: 15px 0;
    }
  }
}
</style>
