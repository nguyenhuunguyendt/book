<template>
  <div class="container">
    <h3 class="store-header" @click="handleRefresh">THÔNG TIN MƯỢN SÁCH</h3>
    <div class="row store-info">
      <div class="col-11 row">
        <div class="col-3">
          <label for="">ID</label>
          <input v-model.trim="idStore" type="text" class="form-control" />
        </div>
        <div class="col-3">
          <label for="">Trạng thái</label>
          <select
            v-model="status"
            class="custom-select my-1 mr-sm-2"
            id="inlineFormCustomSelectPref"
          >
            <option value="">Choose</option>
            <option value="S1">Chờ xác nhận</option>
            <option value="S2">Đang mượn</option>
            <option value="S3">Đã trả</option>
          </select>
        </div>
        <div class="col-3">
          <label for="">Tên sách</label>

          <input v-model.trim="nameBook" type="text" class="form-control" />
        </div>
        <div class="col-3">
          <label for="">Email</label>

          <input v-model.trim="email" type="text" class="form-control" />
        </div>
        <button class="btn check btn-primary" @click="handleSearch">
          Tìm kiếm
        </button>
      </div>
    </div>
    <table id="TableManageUser">
      <tbody>
        <tr>
          <th>Id</th>
          <th>Email người dùng</th>
          <th>Tên Sách</th>
          <th>ID sách</th>
          <th>Năm xuất bản</th>
          <th>Số lượng sách</th>
          <th>Ngày mượn</th>
          <th>Ngày trả</th>
          <th>Trạng thái</th>
          <th>Action</th>
        </tr>
        <tr v-for="item in stores" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.bookId }}</td>
          <td>{{ item.year }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ convertDay(item.dateBorrow) }}</td>
          <td>{{ convertDay(item.dateGive) }}</td>
          <td v-if="item.status === 'S1'">Chờ xác nhận</td>
          <td v-if="item.status === 'S2'">Đang mượn</td>
          <td v-if="item.status === 'S3'">Đã trả</td>
          <td class="td-action">
            <div v-if="item.status === 'S1'" class="action-btn">
              <button class="btn btn-primary" @click="handleConfirm(item.id)">
                Xác nhận
              </button>
              <button class="btn btn-cancel" @click="handleCancel(item.id)">
                Hủy
              </button>
            </div>

            <button
              v-if="item.status === 'S2'"
              @click="handleGiveBook(item.id)"
              class="btn btn-primary"
            >
              Nhận lại sách
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <div class="manage-book-pagination"></div>
    </div>
  </div>
</template>

<script setup>
import { createToast } from "mosha-vue-toastify";
import { onMounted, ref } from "vue";
import { useLoading } from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import moment from "moment";
const $loading = useLoading();
const idStore = ref([]);
const stores = ref([]);
const status = ref("");
const nameBook = ref("");
const email = ref("");
import axios from "../../config/axios";
const convertDay = (value) => {
  if (!value) return "";
  let dateString = moment.unix(value).format("MM/DD/YYYY");
  return dateString;
};
onMounted(async () => {
  try {
    const response = await axios.get("/api/system/store/history");
    if (response.code === 200) {
      stores.value = response.data;
    }
  } catch (error) {
    console.log(error);
  }
});
const handleSearch = async () => {
  try {
    const response = await axios.get(
      `/api/system/store/history?id=${idStore.value}&status=${status.value}&nameBook=${nameBook.value}&email=${email.value}`
    );
    if (response.code === 200 && response.data) {
      stores.value = response.data;
    }
    idStore.value = "";
    status.value = "";
    nameBook.value = "";
    email.value = "";
  } catch (error) {
    console.log(error);
  }
};
const handleGiveBook = async (id) => {
  try {
    const response = await axios.put(`/api/system/approve-give-book/${id}`);
    if (response.code === 200) {
      if (response.secondsDelay > 0) {
        console.log(response);
        const hourDelay = response.secondsDelay / 60 / 60;
        const money = Math.ceil(hourDelay * 5000);
        createToast(
          `vượt quá số thời gian mượn ,số tiền nộp phạt là ${money} VNĐ`,
          { type: "warning", position: "top-center", duration: 0 }
        );
      } else {
        createToast(response.message, { type: "success" });
      }
    }
    if (response.code === 300) {
      createToast(response.message, { type: "warning" });
    }
    await handleRefresh();
  } catch (error) {
    console.log(error);
  }
};
const handleRefresh = async () => {
  try {
    const response = await axios.get("/api/system/store/history");
    if (response.code === 200) {
      stores.value = response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
const handleCancel = async (id) => {
  try {
    const response = await axios.delete(`/api/system/cancel-borrow-book/${id}`);
    if (response.code === 200) {
      createToast(response.message, { type: "success" });
    }
    if (response.code === 300) {
      createToast(response.message, { type: "warning" });
    }
    await handleRefresh();
  } catch (error) {
    console.log(error);
  }
};

const handleConfirm = async (id) => {
  try {
    const loader = $loading.show({
      color: "#00ab00",
      backgroundColor: "#4b4b4b",
    });
    const response = await axios.put(`/api/system/approve-borrow-book/${id}`);
    loader.hide();
    if (response.code === 200) {
      createToast(response.message, { type: "success" });
    }
    if (response.code === 300) {
      createToast(response.message, { type: "warning" });
    }
    await handleRefresh();
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped lang="scss">
.store-info {
  padding: 15px;
}
.btn.check {
  margin: 15px;
}
#TableManageUser {
  .btn-cancel {
    background: #ff424f;
    color: white;
  }
  .action-btn {
    display: flex;
  }
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  img {
    width: 102px;
    height: 60px;
  }

  .td-action {
    button {
      margin: 10px;
    }
  }
}

#TableManageUser td,
#TableManageUser th {
  border: 1px solid #ddd;
  padding: 8px;
}

#TableManageUser tr:nth-child(even) {
  background-color: #f2f2f2;
}

#TableManageUser th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #7e7d78;
  color: white;
}
.btn-crud-book {
  margin: 10px 0;
}
.cancel-btn.btn {
  background: #ff424f;
  border: none;
  margin-left: 15px;
}
.store-header {
  cursor: pointer;
  text-align: center;
  padding: 15px 0;
}
</style>
