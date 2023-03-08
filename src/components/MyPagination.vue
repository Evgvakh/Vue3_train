<template>
  <div class="page__wrapper">
    <div
      v-for="pageNum in pageData.totalPages"
      :key="pageNum"
      :pageNum="pageNum"
      @click="changePageNum(pageNum)"
      class="page"
      :class="{
        'current-page': pageData.page === pageNum,
      }"
    >
      {{ pageNum }}
    </div>    
  </div>
</template>

<script>
export default {
  props: {
    pageData: {
      type: Object,
    },
  },

  data() {},

  methods: {
    changePageNum(num) {
      this.$emit("newPage", num);      
    },
  },
};
</script>

<style scoped></style>
