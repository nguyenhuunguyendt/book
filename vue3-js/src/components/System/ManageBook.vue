<template>
  <div class="container">
    <h3 class="crud-book-header">QUẢN LÝ SÁCH</h3>
    <div class="crud-book row">
      <div className="col-4">
        <label htmlFor=""> Tên </label>
        <input v-model.trim="book.name" className="form-control" type="Text" />
      </div>
      <div className="col-4">
        <label htmlFor=""> Tác giả </label>
        <input
          v-model.trim="book.author"
          className="form-control"
          type="Text"
        />
      </div>
      <div className="col-4">
        <label htmlFor=""> Thể loại </label>
        <input v-model.trim="book.type" className="form-control" type="text" />
      </div>
      <div className="col-4">
        <label htmlFor=""> Năm </label>
        <input
          v-model.trim="book.year"
          className="form-control"
          type="Number"
        />
      </div>
      <div className="col-4">
        <label htmlFor=""> Số lượng </label>
        <input
          v-model.trim="book.quantity"
          className="form-control"
          type="Number"
        />
      </div>
      <div className="col-4">
        <label htmlFor=""> Ảnh bìa </label>
        <input
          className="form-control"
          @change="changeFile"
          type="file"
          ref="image"
        />
      </div>
    </div>
    <div class="row">
      <div class="iport-file col-3 justify-content-end">
        <label for="">Import File Csv</label>
        <input
          ref="input"
          @change="changeImport"
          class="form-control"
          type="file"
        />
      </div>
    </div>
    <button
      v-if="typeAction === 'CREATE'"
      class="btn-crud-book btn btn-primary"
      @click="handleCreateBook"
    >
      Thêm
    </button>
    <div v-if="typeAction === 'IMPORT'">
      <button class="btn-crud-book btn btn-primary" @click="handleImportFile">
        Thêm
      </button>
      <button class="cancel-btn btn" @click="handleCanceImport">Hủy</button>
    </div>
    <button
      v-if="typeAction === 'UPDATE'"
      class="btn-crud-book btn btn-primary"
      @click="handleUpdateBook"
    >
      Cập nhật
    </button>
    <button
      v-if="typeAction === 'UPDATE'"
      class="cancel-btn btn-crud-book btn btn-primary"
      @click="cancelUpdate"
    >
      Hủy
    </button>
    <table id="TableManageUser">
      <tbody>
        <tr>
          <th>Id</th>
          <th>Tên</th>
          <th>Tác giả</th>
          <th>Thể loại</th>
          <th>Năm</th>
          <th>Số lượng</th>
          <th>Ảnh bìa</th>
          <th>Action</th>
        </tr>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.id }}</td>
          <td>{{ book.name }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.type }}</td>
          <td>{{ book.year }}</td>
          <td>{{ book.quantity }}</td>
          <td>
            <img :src="book.image" alt="" />
          </td>
          <td class="td-action">
            <button class="btn btn-primary" @click="handleDeleteBook(book.id)">
              Xóa
            </button>
            <button class="btn btn-primary" @click="handlefil(book)">
              Sửa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <div class="manage-book-pagination">
        <Pagination
          :totalPage="totalPage"
          @handleGetPageBook="handleGetPageBook"
          :currentPage="currentPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { createToast } from "mosha-vue-toastify";
import Papa from "papaparse";
import Pagination from "../../components/Pagination.vue";
import { onMounted, ref } from "vue";
import axios from "../../config/axios";
import checkValue from "../../utils/checkValue.js";
const books = ref([]);
const totalPage = ref();
const currentPage = ref(1);
const typeAction = ref("CREATE");
const input = ref(null);
const image = ref(null);
const idBook = ref();
const csv = ref({
  file: null,
  content: [],
  parsed: false,
});

const book = ref({
  name: "",
  author: "",
  type: "",
  quantity: "",
  year: "",
  file: "",
});
const data = ref();
onMounted(async () => {
  try {
    const response = await axios.get("/api/book/");
    if (response && response.code === 200 && response.books) {
      books.value = response.books;
      totalPage.value = response.totalPage;
    }
  } catch (error) {
    console.log(error);
  }
});
const handleCanceImport = () => {
  try {
    csv.value.file = null;
    input.value.value = "";
    typeAction.value = "CREATE";
  } catch (error) {
    console.log(error);
  }
};
const parseFile = () => {
  try {
    Papa.parse(csv.value.file, {
      header: true,
      skipEmptyLines: true,
      complete: async function (results) {
        if (results.data) {
          const response = await axios.post("/api/system/import-file-csv", {
            books: results.data,
          });
          if (response.code === 200) {
            createToast(response.message, { type: "success" });
          }
        }
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const changeImport = (e) => {
  try {
    csv.value.file = event.target.files[0];
    if (csv.value.file) {
      book.value = {
        name: "",
        author: "",
        type: "",
        quantity: "",
        year: "",
        file: "",
      };
      image.value.value = "";
      typeAction.value = "IMPORT";
    }
  } catch (error) {
    console.log(error);
  }
};
const handleImportFile = async () => {
  try {
    if (csv.value.file) {
      parseFile();
    }
    input.value.value = "";

    typeAction.value = "CREATE";
    await handleGetPageBook(1);
  } catch (error) {
    console.log(error);
  }
};
const changeFile = (e) => {
  book.value.file = e.target.files[0];
};

const handleGetPageBook = async (page) => {
  try {
    const response = await axios.get(`/api/book?page=${page}`);
    if (response && response.code === 200 && response.books) {
      books.value = response.books;
      currentPage.value = response.page;
      totalPage.value = response.totalPage;
    }
  } catch (error) {
    console.log(error);
  }
};
const handleCreateBook = async () => {
  try {
    const err = checkValue(book.value);
    if (err) return;
    const formData = new FormData();
    formData.append("file", book.value.file);
    const resFileSrc = await axios.post("/api/system/upload-file", formData);
    const response = await axios.post("/api/system/create-book", {
      name: book.value.name,
      author: book.value.author,
      year: book.value.year,
      quantity: book.value.quantity,
      type: book.value.type,
      image: resFileSrc.fileSrc ? resFileSrc.fileSrc : "",
    });
    if (response.code === 200) {
      createToast(response.message, { type: "success" });
    }
    if (response.code === 300) {
      createToast(response.message, { type: "warning" });
    }
    book.value = {
      name: "",
      author: "",
      type: "",
      quantity: "",
      year: "",
      file: "",
    };
    image.value.value = "";
    await handleGetPageBook(1);
  } catch (error) {
    console.log(error);
  }
};

const handleDeleteBook = async (id) => {
  try {
    const response = await axios.delete(`/api/system/delete-book/${id}`);
    if (response.code === 200) {
      createToast(response.message, { type: "success" });
      await handleGetPageBook(1);
    }
    if (response.code === 300) {
      createToast(response.message, { type: "warning" });
      await handleGetPageBook(1);
    }
  } catch (error) {
    console.log(error);
  }
};
const handlefil = async (bookItem) => {
  typeAction.value = "UPDATE";
  try {
    idBook.value = bookItem.id;
    book.value = {
      name: bookItem.name,
      author: bookItem.author,
      type: bookItem.type,
      quantity: bookItem.quantity,
      year: bookItem.year,
      file: "",
    };
  } catch (error) {
    console.log(error);
  }
};

const handleUpdateBook = async () => {
  try {
    let response;
    if (book.value.file) {
      const formData = new FormData();
      formData.append("file", book.value.file);
      const resFileSrc = await axios.post("/api/system/upload-file", formData);
      response = await axios.put(`/api/system/update-book/${idBook.value}`, {
        ...book.value,
        image: resFileSrc.fileSrc && resFileSrc.fileSrc,
      });
    } else {
      response = await axios.put(`/api/system/update-book/${idBook.value}`, {
        ...book.value,
      });
    }
    if (response.code === 200) {
      createToast(response.message, { type: "success" });
    }
    if (response.code === 300) {
      createToast(response.message, { type: "warning" });
    }
    book.value = {
      name: "",
      author: "",
      type: "",
      quantity: "",
      year: "",
      file: "",
    };
    image.value.value = "";
    await handleGetPageBook(1);
  } catch (error) {
    console.log(error);
  }
};

const cancelUpdate = () => {
  typeAction.value = "CREATE";
  book.value = {
    name: "",
    author: "",
    type: "",
    quantity: "",
    year: "",
    file: "",
  };
};
</script>

<style scoped lang="scss">
.iport-file {
  align-self: flex-end;
  width: 250px;
}
.manage-book-pagination {
  margin: 10px 0 20px 0;
}
#TableManageUser {
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
  color: white;
}
.crud-book-header {
  text-align: center;
  margin: 15px 0;
}
</style>
