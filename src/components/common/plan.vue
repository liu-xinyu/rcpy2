<template name="component-name">
  <div>
    <div class="card">
      <el-button type="success" @click="addCourse()">
        <i class="iconfont icon-add"></i> 添加课程信息
      </el-button>
      <el-button type="success" @click="addCourse()">
        <i class="iconfont icon-add"></i> 查看学时学分明细
      </el-button>
      <el-button type="danger" @click="addCourse()">
        <i class="iconfont icon-add"></i>
 导出专业计划安排表信息
      </el-button>
    </div>
  </div>
</template>
<script>
export default {}
</script>

<style>
.iconfont {
  margin-right: 2px;
  font-size: 12px;
}
.card {
  padding: 13px;
  background-color: rgba(122, 122, 122, 0.133);
  width: 97%;
  border-left: 5px green solid;
}
</style>