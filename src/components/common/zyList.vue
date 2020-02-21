// 专业列表
<template name="component-name">
  <div></div>
</template>
<script>
export default {
  data() {
    return {
      zyParams: {
        pageIndex: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    // zyList() {
    //   this.axios.post(
    //     "rcpy/myController?operation=showtoyx",
    //     this.$qs.stringify(this.zyParams)
    //   ).then(res=>{
    //       console.log(res)
    //   })
    // }
  },
  created() {
    // this.zyList()
  }
}
</script>

<style>
</style>