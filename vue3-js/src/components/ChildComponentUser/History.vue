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
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in arrBorrow" :key="item.id">
            <td class="book-name">
              {{ item.name }}
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
            <td data-label="" class="text-end" v-if="item.status === 'S1'">
              <div class="confirm-book">đợi xác nhận</div>
            </td>
            <td data-label="" class="text-end" v-if="item.status === 'S2'">
              <div class="borrow-book">Đang mượn</div>
            </td>
            <td class="text-end" v-if="item.status === 'S3'">
              <div class="give-book">Đã trả</div>
            </td>
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
import moment from "moment";
const convertDay = (value) => {
  if (!value) return "chưa có";
  let dateString = moment.unix(value).format("MM/DD/YYYY");
  return dateString;
};
import { onMounted, ref, watch } from "vue";
import axios from "../../config/axios";
import Pagination from "../Pagination.vue";
const arrBorrow = ref([]);
const currentPage = ref(1);
const totalPage = ref();
const BookName = ref("");
onMounted(async () => {
  try {
    const response = await axios.get(`/api/store/history`);
    if (response && response.code === 200 && response.data) {
      arrBorrow.value = response.data;
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
    `/api/store/history?page=${page}&name=${BookName.value}`
  );
  if (response && response.code === 200 && response.data) {
    arrBorrow.value = response.data;
    totalPage.value = response.totalPage;
    currentPage.value = page;
  }
};
</script>

<style lang="scss" scoped>
.book-borrow {
  .confirm-book {
    padding: 10px;
    background: #ff424f;
    color: white;
    border-radius: 4px;
  }
  .borrow-book {
    padding: 10px;
    background: #08af08;
    color: white;
    border-radius: 4px;
  }
  .give-book {
    padding: 10px;
    background: #14b9d5;
    color: white;
    border-radius: 4px;
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
