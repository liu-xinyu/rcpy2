<template>
  <div class="div1">
  
    <!-- 卡片 -->
    <div class="card">
      <el-button type="primary" @click="addUser();addDialogVisible = true">
        <i class="iconfont icon-add"></i> 添加专业用户
      </el-button>
    </div>
      <pagination :page="page" @func="show"></pagination>
    <!-- 表格 展示数据 -->
    <fieldset style="border:1px solid #e2e2e2;padding:10px 15px">
      <legend style="font-size:20px">基本数据表</legend>
      <el-table
        border
        style="width:99%"
        :data="basedata"
        :header-cell-style="{background:'#f5f7fa',color:'#000'}"
      >
        <el-table-column prop="number" label="编号" width="100"></el-table-column>
        <el-table-column prop="zy" label="专业名称" width="300"></el-table-column>
        <el-table-column prop="zxszh" label="周和学时转换"></el-table-column>
        <el-table-column prop="xn" label="学制"></el-table-column>
        <!-- 操作按钮 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="editBase(scope.row.id);">修改</el-button>
            <el-button type="danger" size="small" @click="delBase(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </fieldset>
    <!-- 分页 -->

    <!-- 修改按钮 的弹出框 -->
    <el-dialog
      title="修改基本数据"
      :visible.sync="baseDialogVisible"
      width="20%"
      @close="baseEditClosed()"
     >
      <el-form :model="baseObject" ref="editForm">
        <el-form-item label="周和学时" label-width="70px">
          <el-input v-model="baseObject.studyHours"></el-input>
        </el-form-item>
        <el-form-item label="学年" label-width="70px">
          <el-input v-model="baseObject.schoolYear"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="baseDialogVisible = false;baseSave()">保 存</el-button>
      </span>
    </el-dialog>
    <!--添加基本数据  所对应的对话框 -->
    <el-dialog title="添加基本数据" :visible.sync="addDialogVisible" width="30%" @close="addBaseClose()">
      <el-form ref="baseForm" :rules="addBaseRules" :model="addBaseForm" label-width="100px">
        <el-form-item label="专业名称 :" prop="yxmc">
          <el-select placeholder="请选择院系名称" v-model="addBaseForm.yxmc">
            <el-option v-for="item in basezy" :key="item.zwmc" :value="item.zwmc"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="周和学时.. :" prop="zxszh">
          <el-input v-model="addBaseForm.zxszh" placeholder="请合理输入"></el-input>
        </el-form-item>
        <el-form-item label="学年 :" prop="xn">
          <el-input v-model="addBaseForm.xn" placeholder="请合理输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" center>
        <el-button @click="addBaseSave()" type="primary">提 交</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>
<script>
import pagination from "./pagination"
export default {
  data() {
    return {
      // 用来展示数据的数组
      basedata: [],
      // 发送给服务器的参数，第几页 几条数据
      baseParams: {
        pageIndex: 1,
        pageSize: 10
      },
      page: {
        pageCount: null, //   第几页 用来分页页数的绑定
        pageValue: null, //修改的对话框 false对话框隐藏
        pageSize: 10
      },
      baseDialogVisible: false,
      //   修改对话框
      baseObject: {
        studyHours: null,
        schoolYear: null
      },
      id: null,
      zy: null,
      //   添加用户的对话框 显示隐藏
      addDialogVisible: false,
      //   添加院系用户名称显示 [{},{}...] input
      basezy: [],
      // 添加院系的对话框
      addBaseForm: {
        yxmc: null,
        zxszh: null,
        xn: null
      },
      // 用来验证表单的
      addBaseRules: {
        yxmc: [{ required: true, message: "选择院系", trigger: "blur" }],
        zxszh: [{ required: true, message: "请填入数字", trigger: "blur" }],
        xn: [{ required: true, message: "请填写学年", trigger: "blur" }]
      },
      curPage:null
    }
  },
  components: {
    pagination
  },
  methods: {
    //   页面加载 数据请求 绑定表格
    baseList() {
      this.axios
        .get("/rcpy/basicDataManageServlet?operation=selectBasicDateMessage", {
          params: this.baseParams
        })
        .then(res => {
          // console.log(res)
          if (res.status !== 200) return this.$message.error("数据绑定错误")
          this.basedata = res.data.list //绑定数据
          this.page.pageCount = res.data.count
          this.page.pageCount > 10
            ? (this.page.pageValue = false)
            : (this.page.pageValue = true) //判断分页的显示隐藏
        })
    },

    // 子组件 分页
    show(msg) {
      this.curPage=msg

      this.baseParams.pageIndex = msg
      this.baseList()
    },
    // 修改按钮
    editBase(id) {
      //传过去的是id
      
      this.baseDialogVisible = true// 修改对话框
      this.id = id
      // 将此行的id作为参数发起请求 再次发起请求得到此行的修改数据
      this.axios
        .post(
          "/rcpy/basicDataManageServlet?operation=saveBasicId",
          this.$qs.stringify({
            id: id
          })
        )
        .then(data => {
          //   第二次请求 得到对话框中的 周和时长 学年
          return this.axios.post(
            "/rcpy/basicDataManageServlet?operation=findBasicDataManageById"
          )
        })
        .then(data => {
          this.zy = data.data.zy
          this.baseObject.studyHours = data.data.zxszh
          this.baseObject.schoolYear = data.data.xn
        })
    },
    // 修改按钮中的保存按钮
    baseSave() {
      this.axios.post(
        "/rcpy/basicDataManageServlet?operation=updateBasicDataManage",
        this.$qs.stringify({
          id: this.id,
          zy: this.zy,
          zxszh: this.baseObject.studyHours,
          xn: this.baseObject.schoolYear
        })
      )
      this.baseList()
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
            "/rcpy/basicDataManageServlet?operation=delBasicDateMessageById",
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
    // 添加用户
    addUser() {
      this.axios
        .post("/rcpy/basicDataManageServlet?operation=findAllZyName")
        .then(data => {
          this.basezy = data.data //获取到所有的专业名称
        })
    },
    // 监听修改用户对话框的关闭事件
    baseEditClosed() {
      //   this.$refs.baseForm.resetFields()
    },
    // 点击提交按钮 --添加用户
    addBaseSave() {
      this.$refs.baseForm.validate(valid => {
        //console.log(valid) 点击提交按钮 检测input中都输入了文字
        if (!valid) {
          this.addDialogVisible = true
          return
        }
        // 将填写的信息 作为参数发起请求
        this.axios
          .post(
            "/rcpy/basicDataManageServlet?operation=addBasicDataManage",
            this.$qs.stringify({
              zy: this.addBaseForm.yxmc,
              zxszh: this.addBaseForm.zxszh,
              xn: this.addBaseForm.xn
            })
          )
          .then(res => {
            if(res.data!==1) return this.$message.error('添加失败')
            this.$message.success('添加成功')
            this.baseList()
            this.addDialogVisible = false
          })
      })
    },
    // 添加基本数据对话框关闭的时候 把对话框里的数据清空
    addBaseClose() {
      this.addBaseForm.yxmc = this.addBaseForm.zxszh = this.addBaseForm.xn = null
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
  background-color: red;
}
/* 表格颜色 */
.el-table,
.hidden-columns {
  color: black;
}
.el-table td,
.el-table th {
  padding: 5px 0;
  text-align: center;
}

/* 修改对话框 */
.el-form {
  text-align: center;
  padding-right: 20px;
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