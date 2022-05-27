<template>
  <div class="book-borrow">
    <div class="row book-search">
      <div class="col-6">
        <input
          v-model.trim="BookName"
          type="text"
          class="form-control"
          placeholder="Tìm tên sách"
        />
      </div>
      <button class="btn" @click="() => handleGetPageBook()">Tìm kiếm</button>
    </div>
    <div class="book-borrow-body p-10 bg-surface-secondary">
      <table class="table table-hover table-nowrap">
        <thead class="table-light">
          <tr>
            <th>Tên sách</th>
            <th>Mã sách</th>
            <th>Tác giả</th>
            <th>Thể loại</th>
            <th>Năm xuất bản</th>
            <th>Ngày mượn</th>
            <th>Ngày trả</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in arrBorrow" :key="item.id">
            <td class="book-name">
              <img class="img-book" :src="item.image" alt="" />
              <p class="name-book-text">{{ item.name }}</p>
            </td>
            <td>
              <span>{{ item.id }}</span>
            </td>
            <td>{{ item.author }}</td>
            <td>
              {{ item.type }}
            </td>
            <td>
              {{ item.year }}
            </td>
            <td>{{ convertDay(item.dateBorrow) }}</td>

            <td>{{ convertDay(item.dateGive) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="book-borrow-bt">
        <Pagination
          :totalPage="totalPage"
          :currentPage="currentPage"
          @handleGetPageBook="(page) => (currentPage = page)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "../../config/axios";
import moment from "moment";

import Pagination from "../Pagination.vue";
const arrBorrow = ref([]);
const currentPage = ref(1);
const totalPage = ref();
const BookName = ref("");
const convertDay = (value) => {
  if (!value) return "";
  let dateString = moment.unix(value).format("MM/DD/YYYY");
  return dateString;
};
onMounted(async () => {
  try {
    const response = await axios.get(`/api/store/book-borrow`);
    if (response && response.code === 200 && response.borrows) {
      console.log(response);
      arrBorrow.value = response.borrows;
      totalPage.value = response.totalPage;
    }
  } catch (error) {
    console.log(error);
  }
});

watch(currentPage, async (newCurrentPage) => {
  await handleGetPageBook(newCurrentPage);
});

const handleGetPageBook = async (page = 1) => {
  const response = await axios.get(
    `/api/store/book-borrow?page=${page}&name=${BookName.value}`
  );
  if (response && response.code === 200 && response.borrows) {
    console.log(response);
    arrBorrow.value = response.borrows;
    totalPage.value = response.totalPage;
    currentPage.value = page;
  }
};
</script>

<style lang="scss" scoped>
.book-borrow {
  td {
    width: 135px;
  }
  .book-borrow-bt {
    position: absolute;
    bottom: 10px;
    left: 341px;
  }
  .book-search {
    margin: 10px 0;
  }
  .book-name {
    .img-book {
      display: block;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      cursor: pointer;
    }
    p {
      padding-top: 10px;
    }
  }
}
</style>
