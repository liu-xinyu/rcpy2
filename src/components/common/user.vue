<template>
  <div class="main">
    <!-- 卡片 -->
    <div class="card">
      <el-button type="primary" @click="dialogVisible = true;getDepartments()">
        <i class="iconfont icon-add"></i> 添加专业用户
      </el-button>
    </div>
    <!-- 显示表格 -->
    <fieldset class="tableBox" style="border:1px #e2e2e2 solid">
      <legend>专业用户列表</legend>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
       >
        <el-table-column prop="number" label="编号" width="50"></el-table-column>
        <el-table-column prop="zwmc" label="专业名称"></el-table-column>
        <el-table-column prop="ywmc" label="专业英文名称" width="260px"></el-table-column>
        <el-table-column prop="zydm" label="专业代码"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="name" label="所属院系"></el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="showEditDialog(scope.row.uid)"
            >修改</el-button>&nbsp;
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="removeUserById(scope.row.uid)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </fieldset>
    <!-- 分页 1 2 3 4 5 -->
    

    <pagination :page="page" @func="show"></pagination>

    <!-- 添加用户的对话框 -->
    <el-dialog title="添加专业用户" :visible.sync="dialogVisible" width="35%" @close="addDialogClosed" top="12vh">
      <!-- 添加用户的主体区域 -->
      <el-form :model="addForm" ref="addFormRef" label-width="100px" :rules="addFormRules">
        <el-form-item label="院系">
          <el-select v-model="addForm.did" placeholder="请选择账号类型" ref="liu" prop="did">
            <el-option v-for="item in departments" :key="item.did" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业代码" prop="zydm">
          <el-input v-model="addForm.zydm" placeholder="请输入专业代码"></el-input>
        </el-form-item>
        <el-form-item label="专业中文名称" prop="zwmc" label-width="110px">
          <el-input v-model="addForm.zwmc" placeholder="请输入专业的英文名称"></el-input>
        </el-form-item>
        <el-form-item label="专业英文名称" prop="ywmc" label-width="110px">
          <el-input v-model="addForm.ywmc" placeholder="请输入专业英文名称"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <!-- 添加用户的底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户的对话框  -->
    <el-dialog title="修改用户" :visible.sync="EditDialogVisible" width="40%" top="12vh">
      <el-form :model="editForm" ref="ruleForm" label-width="100px">
        <el-form-item label="院系">
          <el-select ref="editSelect" v-model="editForm.name" @change="change()">
            <el-option
              ref="xinyu"
              v-for="item in editFormDepartments"
              :key="item.did"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业代码:">
          <el-input v-model="editForm.zydm"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="专业中文名称:">
          <el-input v-model="editForm.zwmc"></el-input>
        </el-form-item>
        <el-form-item label="专业英文名称:">
          <el-input v-model="editForm.ywmc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditDialogVisible = false;editFormSave()">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import pagination from "./pagination"

export default {
  data() {
    return {
      props: ["login"],
      //用于分页 传给服务器的当前的页数 与 一页显示多少条数据
      index: {
        pageIndex: 1, //当前的页数
        pageSize: 10 //每次向服务器发送请求的个数  分页大小
      },
      // 用于存储表格数据的数据
      tableData: [],
      count: 0,
      // 分页 页数
      page: {
        pageCount: null, //   第几页
        pageValue: null,
        pageSize: 10
      },
      dialogVisible: false,
      EditDialogVisible: false,
      // 获取添加专业用的中的各个input的值
      addForm: {
        did: null, //院系
        zydm: null, //专业代码
        zwmc: null, //专业名称
        ywmc: null, //专业英语名称
        password: null //密码
      },
      // 添加专业用户的输入规则
      addFormRules: {
        did: [
          //院系
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 15, message: "请输入3到15个字符串", trigger: "blur" }
        ],
        zydm: [
          //专业代码
          { required: true, message: "请输入专业代码", trigger: "blur" },
          { min: 6, max: 15, message: "请输入6到15个数字", trigger: "blur" }
        ],
        zwmc: [
          //专业名称
          { required: true, message: "请输入专业名称", trigger: "blur" },
          { min: 3, max: 15, message: "请输入3到15个字符串", trigger: "blur" }
        ],
        ywmc: [
          //专业英语名称
          { required: true, message: "请输入专业英语名称", trigger: "blur" }
        ],
        password: [
          //密码
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      },
      departments: [],
      // 用于修改用户对话框的数据显示
      editForm: {},
      // 修改对话框的院系 得到所有的院系
      editFormDepartments: [],
      curPage:null
    }
  },
  components: {
    pagination
  },
  methods: {
    // 获取信息，得到后渲染表格 信息
    async getUserList() {
      // console.log(this.login )
      const res = await this.axios.get(
        "/rcpy/zyUserManageServlet?operation=listAllZyUser",
        {
          params: this.index
        }
      )
      const { data } = res
      console.log(res) // 一页的数据 服务器传过来的总数据 有状态和所需要展示的列表数据
      //console.log(data) 含有总数据条数
      this.page.pageCount = data.count //获取总信息数
      this.page.pageValue = data.count > 5 ? false : true
      // console.log(data.list) //展示的列表数据
      this.tableData = data.list //获取表格信息
      //console.log(this.tableData)
    },
    // 子组件 分页
    show(msg) {
      this.curPage=msg
      this.index.pageIndex = msg
      this.getUserList()
    },
    // 获取添加专业用户中的院系信息
    async getDepartments() {
      const res = await this.axios.post(
        "/rcpy/publicServlet?operation=selectAllDepartment"
      )
      const { data, status } = res
      if (status !== 200) return this.$message.error("网络错误！")
      console.log(data)
      this.departments = data
    },
    // 监听添加用户窗口的关闭
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    //点击按钮  添加用户
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        console.log(this.addForm)
        // 可以发起添加用户的网络请求
        console.log(this.$refs.liu.value)
        var boo = this.departments.find(item => {
          return item.name == this.$refs.liu.value
        })
        this.addForm.did = boo.did

        console.log(this.addForm.did)
        console.log(this.addForm)
        const res = await this.axios.post(
          "/rcpy/zyUserManageServlet?operation=addZyUser",
          this.$qs.stringify(this.addForm)
        )
        const { data, status } = res
        console.log(res.status)
        if (res.status != 200) {
          this.$message.error("添加失败")
        }

        this.dialogVisible = false
        this.getDepartments()
        this.$message.success("添加成功")
      })
    },

    //用于展示用户的 修改对话框 showEditDialog
    async showEditDialog(id) {
      //    得到所选中的专业名称的id
      console.log(id + "修改对话框")
      this.EditDialogVisible = true
      const res = await this.axios.post(
        "/rcpy/zyUserManageServlet?operation=saveZyUserUid",
        this.$qs.stringify({
          id: id
        })
      )
      //console.log(res);
      if (res.status !== 200) {
        alert("错误")
        return
      }
      //  得到所选中的id的信息 并绑定展示
      const res2 = await this.axios.post(
        "/rcpy/zyUserManageServlet?operation=findZyUserMessageByUid"
      )
      console.log(res2.data)
      this.editForm = res2.data
      //console.log("editForm")
      //console.log(this.editForm)
      // 修改对话框中 获取所有的院系 并绑定 展示数据
      const res3 = await this.axios.post(
        "/rcpy/publicServlet?operation=selectAllDepartment"
      )
      //console.log(res3) 获取所有的院系信息
      if (res.status !== 200) {
        alert("修改用户的获取院系信息失败")
        return
      }

      this.editFormDepartments = res3.data
      //console.log(res3.data);
    },
    // 当院系发生改变时 触发的事件
    change() {
      //console.log(this.editForm.name);//获得修改的院系名称
      this.editFormDepartments.forEach((item, index) => {
        if (item.name === this.editForm.name) {
          this.editForm.did = item.did
          // console.log(item,index)//得到当前改变后的数组一项和索引值
        }
        //console.log(item,index) //得到每个遍历的对象
      })
      // console.log(this.editForm);//得到修改后的editForm的对象
    },
    // 修改中的保存按钮  触发事件 发送保存请求并传递修改后的数据
    async editFormSave() {
      //console.log(this.editForm); //修改好的数据

      const res = await this.axios.post(
        //
        "/rcpy/zyUserManageServlet?operation=updateZyUserByUid",
        this.$qs.stringify({
          uid: this.editForm.uid, //各个专业的id
          zydm: this.editForm.zydm, //专业代码
          password: this.editForm.password,
          zwmc: this.editForm.zwmc, //中文名称
          ywmc: this.editForm.ywmc, //英文名称
          did: this.editForm.did //专业所属院系的id
        })
      )
      //  console.log(res);//得到响应结果 {data:1...} data为1 则修改成功
      if (res.data !== 1) {
        return this.$message.error("修改用户失败")
      }
      // 刷新数据列表
      this.getUserList()
      // 提示修改成功
      this.$message.success("更新用户成功")
    },
    // 根据id删除用户
    removeUserById(uid) {
      // console.log(uid)
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(data => {
          console.log(data)
          this.$message({
            type: "success",
            message: "删除成功!"
          })
          return this.axios.post(
            "/rcpy/zyUserManageServlet?operation=delZyUser",
            this.$qs.stringify({
              id: uid
            })
          )
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
        .then(data => {
          console.log(data)
           const totalPage=Math.ceil((this.page.pageCount - 1) / this.page.pageSize)
          this.curPage= this.curPage > totalPage ? totalPage : this.curPage
          this.index.pageIndex = this.curPage

          this.getUserList()
        })
    }
  },
  created() {
    this.getUserList()
  }
}
</script>

<style scoped>
.main {
  height: 100%;
}

/* 面包屑导航 */
.el-breadcrumb {
  font-size: 16px;
  margin-bottom: 10px;
}
.el-card__body {
  border-left: 10px #009688 solid;
  padding: 0px;
  background: #ededed;
}
.el-card {
  padding: 0px;
}
.el-card {
  margin-bottom: 10px;
}
.el-message-box__header {
  background-color: #ededed;
  cursor: move;
}
td {
  text-align: center;
}
.el-table,
.hidden-columns {
  color: black;
}
.el-pagination {
  /* margin-top: 10px; */
  position: fixed;
  bottom: 0;
}
.el-pager li {
  font-size: 18px;
}
.el-table td {
  padding: 4px 1px;
}
.el-table .cell {
  padding-right: 1px;
}
.el-form-item__label {
  padding: 0 0px 0 0;
}

.el-dialog__header {
  /* 拖拽部分 */
  background-color: yellow;
  cursor: move;
}

/* 修改对话框 */

.el-form-item__label {
  text-align: center;
}

.iconfont {
  margin-right: 2px;
  font-size: 12px;
}
.card {
  padding: 13px;
  background-color: rgba(122, 122, 122, 0.133);
  border-left: 5px green solid;
}
</style>