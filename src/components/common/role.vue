<template name="component-name">
  <div>
    <fieldset class="tableBox" style="border:1px #e2e2e2 solid">
      <legend>角色管理</legend>
      <el-table
        :data="tableRoleData"
        border
        style="width: 100%"
        :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
      >
        <el-table-column prop="name" label="角色"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 操作按钮 -->
            <el-button
              type="primary"
              @click="kai();saveRid(scope.row.rid,scope.row.name);showright()"
            >角色及权限分配</el-button>
          </template>
        </el-table-column>
      </el-table>
    </fieldset>

    <!--弹出来的要修改的权限信息  -->
    <el-dialog
      title="修改角色"
      :visible.sync="dialogVisible"
      width="40%"
      @open="dialogOpen()"
      @close="close()"
      @closed="dialogClosed"
      top="1vh"
    >
      <!-- 切换按钮 -->
      <span class="rightsText">权限:</span>
      <div class="checkList">
        <el-checkbox v-model="list[4]" label="方案首页4" border @click="xinyu(4)"></el-checkbox>
        <el-checkbox v-model="list[5]" label="计划安排表5" border @click="xinyu(5)"></el-checkbox>
        <el-checkbox v-model="list[14]" label="人才培养方案矩阵图14" border @click="xinyu(14)"></el-checkbox>
        <el-checkbox v-model="list[15]" label="专业矩阵15" border @click="xinyu(15)"></el-checkbox>
        <el-checkbox v-model="list[1]" label="院系矩阵文件1" border @click="xinyu(1)"></el-checkbox>
        <el-checkbox v-model="list[13]" label="矩阵文件13" border @click="xinyu(13)"></el-checkbox>
        <el-checkbox v-model="list[6]" label="专业列表6" border @click="xinyu(6)"></el-checkbox>
        <el-checkbox v-model="list[7]" label="角色管理7" border @click="xinyu(7)" disabled></el-checkbox>
        <el-checkbox v-model="list[8]" label="院系文章8" border @click="xinyu(8)"></el-checkbox>
        <el-checkbox v-model="list[9]" label="基础数据9" border @click="xinyu(9)"></el-checkbox>
        <el-checkbox v-model="list[10]" label="专业用户管理10" border @click="xinyu(10)"></el-checkbox>
        <el-checkbox v-model="list[11]" label="院系用户管理11" border @click="xinyu(11)"></el-checkbox>
        <el-checkbox v-model="list[12]" label="添加院系12" border @click="xinyu(12)"></el-checkbox>
        <el-checkbox v-model="list[16]" label="职业资格填报16" border @click="xinyu(16)"></el-checkbox>
        <el-checkbox v-model="list[17]" label="职业资格列表17" border @click="xinyu(17)"></el-checkbox>
        <el-checkbox v-model="list[18]" label="职业资格报表18" border @click="xinyu(18)"></el-checkbox>
        <el-checkbox v-model="list[19]" label="课程性质19" border @click="xinyu(19)"></el-checkbox>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="guan();UpdateRole()">保存更改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableRoleData: [],
      rid: 0,
      name: name,
      dialogVisible: false,
      list2: [],
      // 显示权限按钮的开关
      list: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    }
  },
  methods: {
    // 点保存更改按钮   关闭对话框
    guan() {
      this.dialogVisible = false
    },
    kai() {
      setTimeout(() => {
        this.dialogVisible = true
      }, 500)
    },
    xinyu(index) {
      this.list[index] = !this.list[index]
    },
    //角色列表获取函数
    async getRolelist() {
      const res = await this.axios.get("/rcpy/roleServlet?operation=listAllRole")
      //  console.log(res) //{data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
      if (res.status !== 200) {
        return this.$message.error("角色获取失败")
      }
      this.tableRoleData = res.data.list //绑定数据 渲染列表
    },
    //角色及权限分配 点击查询当前角色权限第一步：将当前选中的角色rid存在后台
    async saveRid(id, name) {
      this.rid = id
      this.name = name
      console.log(id, name + "弹出框的要求")
      const res = await this.axios.post(
        "/rcpy/roleServlet?operation=saveRid",
        this.$qs.stringify({
          rid: id
        })
      )
      // console.log(res);
      if (res.status !== 200) {
        return this.$message.error("点击按钮 角色获取失败")
      }
    },
    // 弹出框后的数据请求 知道哪些应该被选中
    async showright() {
      const res = await this.axios.get(
        "/rcpy/roleServlet?operation=findRolePrivilegeMessage"
      )
      console.log(res)
      res.data.forEach((element, index) => {
        this.list[element] = true
      })
    },
    // 打开对话框 发生的事件
    dialogOpen() {
      console.log("打开了")
    },
    // 关闭对话框发生的事件 让对话框关闭 并让list中每个值都为false 延迟使每个值为false
    dialogClosed() {
      console.log("dialogClosed")
      this.dialogVisible = false
      setTimeout(() => {
        this.list.forEach((element, i) => {
          this.list[i] = false
        })
        // console.log(this.list)
      }, 100)
    },
    close() {
      console.log("close")
    },
    // 点击 保存更改 1.发送请求保存数据 2.关闭对话框
    async UpdateRole() {
      // console.log(this.rid);
      //console.log("点击保存关闭按钮")

      this.list.forEach((element, index) => {
        if (element == true) {
          this.list2.push(index)
        }
      })

      this.list2 = [...new Set(this.list2)]
      const res2 = await this.axios.post(
        "/rcpy/roleServlet?operation=updateRolePrivilege",
        this.$qs.stringify(
          {
            value: this.list2,
            name: this.name,
            rid: this.rid
          },
          {
            arrayFormat: "repeat"
          }
        )
      )
      console.log(res2.data)
      if (res2.data === true) {
        this.$message.success("修改角色权限成功")
        this.list2 = []
        this.$router.go(0)
        return
      }
      this.$message.error("修改失败")
      //console.log(this.list2.toString(), this.name, this.rid)
    }
  },
  created() {
    this.getRolelist()
  }
}
</script>

<style scoped>
.el-table,
.hidden-columns {
  color: black;
}
.el-dialog__body {
  padding: 0px 10px;
  color: black;
}
.checkList {
  padding-left: 10px;
}
.rightsText {
  font-weight: bold;
  font-size: 16px;
}
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-bottom: 10px;
  margin-left: 0px;
}

</style>