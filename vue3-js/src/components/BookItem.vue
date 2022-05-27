<template>
  <div class="col-md-3 book-container-item">
    <div class="card mb-4 box-shadow">
      <router-link :to="{ name: 'DetailBook', params: { id: book.id } }">
        <img class="card-img-top" :src="book.image" alt="Card image cap" />
      </router-link>
      <div class="card-body">
        <p class="book-container-item-text card-text">
          {{ book.name }}
        </p>
        <div class="d-flex justify-content-between align-items-center book-fl">
          <div class="btn-group">
            <button v-if="status === 'S2'" class="btn s2-book">
              Đang mượn
            </button>
            <button v-if="status === 'S1'" class="btn s1-book">
              Chờ xác nhận
            </button>
            <button
              v-if="!status"
              type="button"
              class="btn"
              @click="handleBorrow(book.id)"
            >
              Mượn sách
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "../config/axios";
import { createToast } from "mosha-vue-toastify";
import { defineProps, onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const router = useRouter();

const status = ref("");
const store = useStore();
const userInfo = computed(() => store.state.userInfo);
const props = defineProps({
  book: Object,
});
onMounted(async () => {
  try {
    if (!userInfo.value) return;
    const response = await axios.get(
      `/api/store/get-by-bookId/${props.book.id}`
    );
    if (response && response.code === 200 && response.data) {
      status.value = response.data.status;
    }
  } catch (error) {
    console.log(error);
  }
});

const handleBorrow = async (id) => {
  try {
    if (!userInfo.value) {
      router.push({ path: "/login" });
      return;
    }
    const response = await axios.post("/api/store/", { bookId: id });
    if (response.code === 200) {
      createToast(response.message, { type: "success" });
    }
    if (response.code === 300) {
      createToast(response.message, { type: "warning" });
    }
    if (response.code === 401) {
      createToast("kiểm tra lại token", { type: "warning" });
    }
    const data = await axios.get(`/api/store/get-by-bookId/${props.book.id}`);
    if (data && data.code === 200 && data.data) {
      status.value = data.data.status;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
<style scoped lang="scss">
.card-body {
  .s2-book {
    background: #12b512;
  }
  .s1-book {
    background: #ff424f;
  }
  .book-fl {
    margin: 10px;
  }
}
.card-img-top {
  width: 253;
  height: 142px;
  object-fit: cover;
}
</style>
