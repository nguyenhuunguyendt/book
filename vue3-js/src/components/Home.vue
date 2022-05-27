<template>
  <div class="book-container">
    <div class="container">
      <div class="book-search row">
        <div class="col-6">
          <label for="">Tên sách</label>
          <input v-model.trim="book.name" type="text" class="form-control" />
        </div>
        <div class="col-6">
          <label for="">Tác giả</label>
          <input type="text" class="form-control" v-model.trim="book.author" />
        </div>

        <div class="col-6">
          <label for="">Thể loại</label>
          <input type="text" class="form-control" v-model.trim="book.type" />
        </div>
        <div class="col-6">
          <label for="">Năm xuất bản</label>
          <input type="number" class="form-control" v-model.trim="book.year" />
        </div>
        <button class="btn btn-primary" @click="() => handleSearchBook()">
          Tìm kiếm
        </button>
      </div>
      <div class="row book-list-body">
        <BookItem v-for="book in books" :key="book.id" :book="book" />

        <div v-if="books.length === 0" class="no-find-book">
          Không tìm thấy sách
        </div>
      </div>
      <Pagination
        @handleGetPageBook="(page) => (currentPage = page)"
        :totalPage="totalPage"
        :currentPage="currentPage"
      />
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import BookItem from "./BookItem.vue";
import Pagination from "./Pagination.vue";
import router from "../router";
import axios from "../config/axios";
let books = ref([]);
const currentPage = ref(1);
const totalPage = ref();
const book = reactive({
  name: "",
  author: "",
  type: "",
  year: "",
});

onMounted(async () => {
  try {
    const data = await axios.get(`/api/book/?page=${currentPage.value}`);
    if (data && data.code === 200 && data.books) {
      books.value = data.books;
      totalPage.value = data.totalPage;
    }
  } catch (error) {
    console.log(error);
  }
});

const handleSearchBook = async (page = 1) => {
  try {
    const response = await axios.get(
      `/api/book?name=${book.name}&author=${book.author}&type=${book.type}&year=${book.year}&page=${page}`
    );
    if (response && response.code === 200 && response.books) {
      books.value = response.books;
      totalPage.value = response.totalPage;
      currentPage.value = page;
    }
  } catch (error) {
    console.log(error);
  }
};
watch(currentPage, async (newCurrentPage) => {
  await handleSearchBook(newCurrentPage);
});
</script>

<style lang="scss">
.book-container {
  background: #e3e5e7;
  .no-find-book {
    margin: 15px;
  }
  .book-list-body {
    min-height: 800px;
  }
  .book-search {
    background: white;
    margin: 0 0 15px 0;
    padding: 23px;
    border: 1px solid #babbae;
    border-radius: 10px;

    button {
      padding: 5px;
      outline: none;
      margin: 10px 0 15px 16px;
    }
  }
  &-item {
    button {
      border: none;
      background-color: #007bff;
      color: white;
    }
    img {
      cursor: pointer;
    }
    .card-body {
      background-color: #e9ecef;
      padding: 10px;
    }
    &-text {
      text-transform: capitalize;
    }
  }
}
</style>
