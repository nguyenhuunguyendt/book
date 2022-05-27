<template>
  <div class="book-body">
    <Header />
    <div class="container m-5 mx-auto">
      <div class="row main">
        <div class="col-lg-6 col-12 my-5 rcol">
          <h3 class="product text-center">CHI TIẾT SÁCH</h3>
          <div class="image text-center">
            <img :src="book.image" class="img-detail" />
          </div>
          <p class="text-center my-3">
            Người sử dụng có quyền truy cập và khai thác nguồn tài nguyên thông
            tin của Thư viện theo chính sách và hướng dẫn của Thư viện để phục
            vụ cho mục đích nghiên cứu, giảng dạy, học tập và giải trí lành
            mạnh;
          </p>
        </div>
        <div class="col-lg-6 col-12 my-5 scol">
          <div class="row r3">
            <h3 class="book-name">{{ book.name }}</h3>
          </div>

          <div class="item-text-book">Tác giả : {{ book.author }}</div>
          <div class="item-text-book">
            Năm xuất bản : {{ book ? book.year : "" }}
          </div>
          <div class="item-text-book">
            Số lượng hiện tại: {{ book.quantity }}
          </div>
          <div class="item-text-book">Thể loại: {{ book.type }}</div>
          <div class="item-text-book">
            <button
              type="submit"
              class="btn btn-primary"
              @click="handleBorrow(book.id)"
              v-if="!status"
            >
              MƯỢN SÁCH
            </button>
            <button v-if="status === 'S2'" class="btn s2-book">
              ĐANG MƯỢN
            </button>
            <button v-if="status === 'S1'" class="btn s1-book">
              CHỜ XÁC NHẬN
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup>
import Header from "./Header.vue";
import { onMounted, ref, computed } from "vue";
import Footer from "./Footer.vue";
import { createToast } from "mosha-vue-toastify";
import { useRouter } from "vue-router";
import axios from "../config/axios";
const status = ref("");
const router = useRouter();
import { useStore } from "vuex";
const store = useStore();
const userInfo = computed(() => store.state.userInfo);
let book = ref({
  name: "",
  author: "",
  tyepe: "",
  year: "",
  quantity: "",
  image: "",
});

onMounted(async () => {
  try {
    const id = router.currentRoute.value.params.id;
    const response = await axios.get(`/api/book/${id}`);
    if (response.code === 200 && response.book) {
      book.value = response.book;
      console.log(book.value);
    }
    if (!userInfo.value) return;
    const data = await axios.get(`/api/store/get-by-bookId/${id}`);
    if (data && data.code === 200 && data.data) {
      status.value = data.data.status;
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
    if (response.code === 600) {
      createToast("kiểm tra lại token", { type: "warning" });
    }
    const data = await axios.get(`/api/store/get-by-bookId/${id}`);
    if (data && data.code === 200 && data.data) {
      status.value = data.data.status;
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
</script>
<style lang="scss" scoped>
.book-body {
  .img-detail {
    width: 397px;
    height: 300px;
    border-radius: 5px;
    object-fit: cover;
  }
  background: #e3e5e7;
  .item-text-book {
    margin: 21px 0;
    text-transform: uppercase;
  }
}
body {
  background: #000;
  font-family: Arial, Helvetica, sans-serif;
}
.container {
  background: #fff !important;
  border: none;
  border-radius: 20px;
}

.scol {
  padding-left: 60px;
}
.row.r2 {
  margin-bottom: 20px;
}
.row.r2:after {
  content: ".";
  font-size: 0;
  display: block;
  height: 1px;
  width: 77%;
  background: #a9abae3d;
}

div.col-2 {
  cursor: pointer;
}

.far {
  color: #adb5bd;
}

.btn.btn-primary {
  border: none;
  border-radius: 40px;
  width: 40%;
  margin: 60px 0;
}

.btn.s2-book {
  color: white;
  border: none;
  border-radius: 40px;
  width: 40%;
  margin: 60px 0;
  background: #12b512;
}

.btn.s1-book {
  color: white;
  background: #ff424f;
  border: none;
  border-radius: 40px;
  width: 40%;
  margin: 60px 0;
}
.book-name {
  text-transform: uppercase;
}
@media screen and (max-width: 1200px) {
  .rcol {
    width: 100%;
  }
  .scol {
    width: 100%;
  }
}
@media screen and (max-width: 768px) {
  .container {
    width: 95%;
  }
  .row.r2:after {
    width: 95%;
  }
}
</style>
