<template>
  <div class="overview">
    <div class="row book-search">
      <div class="col-6">
        <input
          type="text"
          class="form-control"
          placeholder="Tìm email người dùng"
          v-model.trim="emailQuery"
        />
      </div>
      <button class="btn" @click="handleSearchUser">Tìm kiếm</button>
    </div>

    <div class="overview-body p-10 bg-surface-secondary">
      <table class="table table-hover table-nowrap">
        <thead class="table-light">
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Xác minh email</th>
            <th>Admin</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>
              <router-link :to="{ name: 'StoreUser', params: { id: user.id } }">
                {{ user.email }}
              </router-link>
            </td>
            <td :class="user.isVerify === 0 ? 'no-verify' : 'yes-verify'">
              {{ user.isVerify === 0 ? "chưa xác minh" : "đã xác minh" }}
            </td>
            <td>{{ user.isAdmin === 0 ? "No" : "Yes" }}</td>
            <td>
              <button
                v-if="user.isActive === 0"
                class="no-Active btn"
                @click="handleActive(user.id)"
              >
                Active
              </button>
              <div class="yes-Active" v-else>Đã active</div>
            </td>
            <td>
              <button class="btn btn-primary">
                <router-link
                  :to="{
                    path: `/system/manage-user/reset-password/${user.id}`,
                  }"
                >
                  Reset pass
                </router-link>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="overview-bt"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "../../../config/axios";
import { createToast } from "mosha-vue-toastify";
const users = ref([]);
const emailQuery = ref("");
onMounted(async () => {
  try {
    const response = await axios.get("/api/system/get-all-user");
    if (response.code === 200 && response.users) {
      console.log(response);
      users.value = response.users;
    }
  } catch (error) {
    console.log(error);
  }
});

const handleActive = async (id) => {
  try {
    const response = await axios.put(`/api/system/active-account/${id}`);
    if (response.code === 200 && response.userUpdated) {
      createToast(response.message, { type: "success" });
    }
    if (response.code === 300) {
      createToast(response.message, { type: "warning" });
    }
    await handleSearchUser();
  } catch (error) {
    console.log(error);
  }
};
const handleSearchUser = async () => {
  try {
    const response = await axios.get(
      `/api/system/get-all-user?email=${emailQuery.value}`
    );
    emailQuery.value = "";
    if (response.code === 200 && response.users) {
      users.value = response.users;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
.overview {
  .overview-body {
    .no-Active {
      color: white;
      background-color: #ff424f;
    }
    .yes-Active {
      padding: 6px;
      text-align: center;
      border-radius: 3px;
      background: #0ec70e;
      color: white;
    }
    .yes-verify {
      color: green;
    }
    .no-verify {
      color: #ff424f;
    }
  }
  .overview-bt {
    position: absolute;
    bottom: 10px;
    left: 341px;
  }
  .book-search {
    margin: 10px 0;
  }
}
</style>
