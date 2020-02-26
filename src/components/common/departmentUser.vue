<!-- 院系用户管理  -->
<template name="component-name">
  <div class="div1">
   
    <!-- 卡片 -->
        <div class="card">
      <el-button type="primary" @click="addUser();addDialogVisible = true">
        <i class="iconfont icon-add"></i> 添加院系用户
      </el-button>
        </div>
    <!-- 表格 展示数据 -->
    <fieldset style="border:1px solid #e2e2e2;padding:10px 15px">
      <legend style="font-size:20px">院系用户列表</legend>
      <el-table
        border
        style="width:99%"
        :data="yUserData"
        :header-cell-style="{background:'#f5f7fa',color:'#000'}"
      >
        <el-table-column prop="number" label="编号" width="100"></el-table-column>
        <el-table-column prop="zwmc" label="院系名称" width="300"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <!-- 操作按钮 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="editBase(scope.row.uid)">修改</el-button>
            <el-button type="danger" size="small" @click="delBase(scope.row.uid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </fieldset>
    <!-- 分页 -->
    <pagination :page="page" @func="show"></pagination>
    <!-- 修改按钮 的弹出框 -->
    <el-dialog title="院系用户信息" :visible.sync="baseDialogVisible" width="40%">
      <el-form ref="editForm">
        <el-form-item label="院系中文名称" label-width="100px">
          <el-input v-model="yname" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="baseDialogVisible = false;baseSave()">保 存</el-button>
      </span>
    </el-dialog>
    <!--添加基本数据  所对应的对话框 -->
    <el-dialog title="添加院系用户" :visible.sync="addDialogVisible" width="40%" @close="addBaseClose()">
      <el-form ref="baseForm" :rules="addBaseRules" :model="addBaseForm" label-width="130px">
        <el-form-item label="院系中文名称 :" prop="zwmc">
          <el-select placeholder="请选择院系名称" v-model="addBaseForm.zwmc">
            <el-option v-for="item in basezy" :key="item.did" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="院系英文名称.. :" prop="ywmc">
          <el-input v-model="addBaseForm.ywmc" placeholder="请合理输入"></el-input>
        </el-form-item>
        <el-form-item label="密码 :" prop="password">
          <el-input v-model="addBaseForm.password" placeholder="请合理输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" center>
        <el-button @click="addBaseSave1()" type="primary">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import pagination from "./pagination"
export default {
  data() {
    return {
      // 用来展示表格数据的数组
      yUserData: [],
      // 发送给服务器的参数，第几页 几条数据
      baseParams: {
        pageIndex: 1,
        pageSize: 10
      },
      page: {
        pageCount: null, //   用来分页页数的绑定 几页
        pageValue: false //   分页效果的显示隐藏
      },
      //   修改的对话框 false对话框隐藏
      baseDialogVisible: false,
      //  修改对话框 所显示的数据 以及点击修改保存按钮所要传递的参数
      id: null,
      yname: null,
      password: null,
      //   添加用户的对话框 显示隐藏
      addDialogVisible: false,
      //   添加基本数据的院系名称显示
      basezy: [],
      //   添加用户时 点击保存的参数
      addBaseForm: {
        zwmc: "", //院系名称
        ywmc: "",
        password: ""
      },
      // 添加用户的校验规则
      addBaseRules: {
        zwmc: [{ required: true, message: "选择院系", trigger: "blur" }],
        ywmc: [{ required: true, message: "请填入数字", trigger: "blur" }],
        password: [{ required: true, message: "请填写学年", trigger: "blur" }]
      },
      curPage:null
    }
  },
  components: {
    //   分页组件
    pagination
  },
  methods: {
    //   页面加载 数据请求 绑定表格 院系用户信息获取
    baseList() {
      this.axios
        .get("/rcpy/yxUserManageServlet?operation=listAllYxUser", {
          params: this.baseParams
        })
        .then(res => {
          // console.log(res) 表格数据绑定
          if (res.status !== 200) return this.$message.error("数据绑定错误")
          this.yUserData = res.data.list //绑定数据
          this.page.pageCount = res.data.count
          this.page.pageCount > 10
            ? (this.page.pageValue = false)
            : (this.pagr.pageValue = true) //判断分页的显示隐藏
        })
    },
    show(msg) {
      this.curPage=msg
      this.baseParams.pageIndex = msg
      this.baseList()
    },
    // 修改按钮
    editBase(id) {
      this.baseDialogVisible = true
      this.id = id
      // 将id传给后台 后台根据id查询用户信息 防止页面数据错误（一切来自用户的信息都是不可信的 ）
      this.axios.post(
        "/rcpy/yxUserManageServlet?operation=saveYxUserUid",
        this.$qs.stringify({
          id: id
        })
      )
      // 后台保存了所要修改的院系的id 返回对应id的信息
      this.axios
        .post("/rcpy/yxUserManageServlet?operation=findYxUserMessageByUid")
        .then(data => {
          console.log(data)
          this.yname = data.data.zwmc
          this.password = data.data.password
        })
    },
    // 修改按钮中的保存按钮 将院系id 和中文名称 密码作为参数传递
    baseSave() {
      this.axios
        .post(
          "/rcpy/yxUserManageServlet?operation=updateYxUserByUid",
          this.$qs.stringify({
            uid: this.id,
            zwmc: this.yname,
            password: this.password
          })
        )
        .then(res => {
          console.log(res)
          if (res.data !== 1) return this.$message.error("修改密码错误")
          this.$message.success("修改密码成功")
          this.baseList()
        })
    },
    // 删除按钮
    delBase(id) {
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
            "/rcpy/yxUserManageServlet?operation=delYxUser",
            this.$qs.stringify({
              id: id
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
          this.baseParams.pageIndex = this.curPage

          this.baseList()
        })
    },
    // 添加用户 所要显示的所有院系
    addUser() {
      this.axios
        .post("/rcpy/publicServlet?operation=selectAllDepartment")
        .then(data => {
          // console.log(data)
          this.basezy = data.data
          console.log(this.basezy)
        })
    },
    //添加院系用户 点击提交按钮
    addBaseSave1() {
      this.$refs.baseForm.validate(valid => {
        // console.log(valid)
        if (!valid) {
          this.addDialogVisible = true
          return
        }
        this.axios
          .post(
            "/rcpy/yxUserManageServlet?operation=addYxUser",
            this.$qs.stringify({
              zwmc: this.addBaseForm.zwmc,
              ywmc: this.addBaseForm.ywmc,
              password: this.addBaseForm.password
            })
          )
          .then(res => {
            // console.log(res) 添加用户中保存按钮 点击后的返回值
            if(res.data!==1) return this.$message.error('添加院系用户失败')
            this.$message.success('添加院系用户成功')
            this.baseList()
            this.addDialogVisible = false
          })
      })
    },
    // 添加院系对话框关闭的时候 把对话框里的数据清空
    addBaseClose() {
      this.addBaseForm.zwmc = this.addBaseForm.ywmc = this.addBaseForm.password = null
    }
  },
  created() {
    this.baseList()
  }
}
</script>

<style scoped>
.el-breadcrumb {
  font-size: 16px;
  margin-bottom: 10px;
}
/* 改变表格中的字体颜色 */
.el-table,
.hidden-columns {
  color: black;
}

/* 修改对话框 */
.el-form {
  text-align: center;
  padding-right: 20px;
}
.el-dialog__body {
  padding-bottom: 0;
}
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