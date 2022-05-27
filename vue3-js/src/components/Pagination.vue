<template>
  <div v-if="pages.length > 0" class="paging justify-content-center">
    <div class="prev-page">
      <button @click="handleGetPageBook('prev')">Prev</button>
    </div>
    <div class="number-page">
      <div class="item-page" v-for="page in pages" :key="page">
        <button
          @click="handleGetPageBook({ page })"
          :class="currentPage === page ? `btn-primary` : ``"
        >
          {{ page }}
        </button>
      </div>
    </div>
    <div class="next-page">
      <button @click="handleGetPageBook('next')">Next</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch, onMounted } from "vue";
const props = defineProps({
  totalPage: Number,
  currentPage: Number,
});

const currentPage = ref(props.currentPage ? props.currentPage : 1);
const pages = ref([]);
const totalPage = ref(props.totalPage);
watch(
  [() => props.totalPage, () => props.currentPage],
  ([newTotalPage, newCurrentPage]) => {
    totalPage.value = newTotalPage;
    currentPage.value = newCurrentPage;
    pages.value = Array.from({ length: newTotalPage }, (_, i) => i + 1);
  }
);

const emit = defineEmits(["handleGetPageBook"]);

onMounted(() => {
  pages.value = Array.from({ length: props.totalPage }, (_, i) => i + 1);
});

const handleGetPageBook = (opts) => {
  try {
    if (opts === "next") {
      currentPage.value = ++currentPage.value;
      if (currentPage.value > totalPage.value) {
        currentPage.value = totalPage.value;
        return;
      }
    }
    if (opts === "prev") {
      currentPage.value = --currentPage.value;
      if (currentPage.value < 1) {
        currentPage.value = 1;
        return;
      }
    }
    if (opts.page) {
      currentPage.value = opts.page;
    }
    emit("handleGetPageBook", currentPage.value);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped lang="scss">
.paging {
  // height: 30px;

  .number-page {
    display: flex;
    gap: 3px;
    .item-page {
      button {
        width: 30px;
      }
    }
  }
  display: flex;
  .prev-page {
    margin: 0px 20px;
  }
  .next-page {
    margin: 0px 20px;
  }
  button {
    outline: #007bff;
    cursor: pointer;
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 2px;
  }
}
</style>
