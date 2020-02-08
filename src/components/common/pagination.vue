<template name="component-name">
  <div class="page">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="page.pageCount"
      :page-size="page.pageSize"
      :hide-on-single-page="page.pageValue"
      @current-change="CurrentPageChange"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  props: ["page"],
  data() {
    return {
      newPage: null
    }
  },
  methods: {
    CurrentPageChange(newPage) {
      this.newPage = newPage
    }
  },
  watch: {
    newPage() {
      this.$emit("func", this.newPage)
    }
  }
}
</script>

<style scoped>
.page {
  position: absolute;
  background-color: rgb(226, 226, 226);
  bottom: 0;
  z-index: 100;
}
</style>