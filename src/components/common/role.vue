<template name="component-name">
  <div>
    <fieldset class="tableBox" style="border:1px #e2e2e2 solid">
      <legend>角色管理</legend>
      <el-table
        :data="tableRoleData"
        border
        style="width: 100%"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      >
        <el-table-column prop="name" label="日期"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="primary" @click="dialogVisible = true">角色及权限分配</el-button>
          </template>
        </el-table-column>
      </el-table>
    </fieldset>
    
    <!--弹出来的要修改的权限信息  -->
    <el-dialog title="修改角色" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
       
        <el-button type="primary" @click="dialogVisible = false">保存更改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableRoleData: [],
      dialogVisible:false
    }
  },
  methods: {
    async getRolelist() {
      const res = await this.axios.get(
        "rcpy/myController?operation=listAllRole"
      )
      console.log(res)
      this.tableRoleData = res.data.list
    }
  },
  created() {
    this.getRolelist()
  }
}
</script>

<style>
</style>