<template name="component-name">
  <div>
    <!-- 添加课程信息 查看学分学时明细 导出计划安排表信息 -->
    <div class="card">
      <el-button type="success" @click="addCourse()">
        <i class="iconfont icon-add"></i> 添加课程信息
      </el-button>
      <el-button type="success" @click="checkxs()">
        <i class="iconfont icon-add"></i> 查看学时学分明细
      </el-button>
      <el-button type="danger" @click="exportplan()">
        <i class="iconfont icon-add"></i>导出专业计划安排表信息
      </el-button>
    </div>
    <!-- 表格 -->
    <fieldset style="border:1px solid #e2e2e2;padding:20px 5px">
      <legend style="font-size:20px">人才培养方案计划安排表</legend>
      <el-table
        :data="tableDataPlan"
        border
        style="width: 99%"
        :header-cell-style="{background:'#f5f7fa',color:'#000'}"
      >
        <el-table-column prop="number" label="编号" width="40"></el-table-column>
        <el-table-column prop="kid" label="课程编号" width="100"></el-table-column>
        <el-table-column prop="zwmc" label="中文名称" width="120"></el-table-column>
        <el-table-column prop="ywmc" label="英文名称" width="120"></el-table-column>
        <el-table-column label="课程类别">
          <el-table-column prop="lba" label="选项A" width="35"></el-table-column>
          <el-table-column prop="lbb" label="选项B" width="35"></el-table-column>
          <el-table-column prop="lbc" label="选项C" width="50"></el-table-column>
        </el-table-column>
        <el-table-column prop="xf" label="学分" width="50"></el-table-column>
        <el-table-column prop="sk" label="授课学时" width="40"></el-table-column>
        <el-table-column prop="sj" label="实验上机" width="40"></el-table-column>
        <el-table-column prop="zxs" label="总学时" width="40"></el-table-column>
        <el-table-column prop="xq" label="学期" width="35"></el-table-column>
        <el-table-column prop="kcxz" label="课程性质" width="50"></el-table-column>
        <el-table-column prop="bz" label="备注"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="update(scope.row.id)">修改</el-button>
            <el-button type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </fieldset>
    <!-- 分页 -->
    <!-- 子组件分页  子组件传父组件 @func="show"-->
    <!-- 父组件plan.vue 传递信息给子组件 :page="page" -->
    <pagination :page="page" @func="show"></pagination>
    <!-- 修改的对话框 -->
    <el-dialog
      title="修改课程信息"
      :visible.sync="plandialogVisible"
      width="40%"
      top="10vh"
      @close="editDialogClosed('editRef')"
    >
      <el-form :model="xiugai" ref="editRef">
        <el-form-item label="课程中文名称" label-width="100px">
          <el-input v-model="xiugai.zwmc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程英文名称" label-width="100px">
          <el-input v-model="xiugai.ywmc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程编号" label-width="100px">
          <el-input v-model="xiugai.kid" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 下拉框 -->
        <el-form-item label="课程类别" label-width="100px">
          <el-select v-model="xiugai.lbb" placeholder="请选择" @change="editchange(xiugai.lbb)">
            <el-option-group v-for="group in options" :key="group.label" :label="group.label">
              <el-option v-for="item in group.options" :key="item.value" :value="item.value"></el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item v-if="editinputValue" label="专业方向" label-width="100px">
          <el-input v-model="xiugai.lbc"></el-input>
        </el-form-item>
        <el-form-item label="课程性质" label-width="110px" prop="kcxz">
          <el-select v-model="xiugai.kcxz" placeholder="请选择">
            <el-option v-for="item in kcxzAry" :key="item.id" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学期" label-width="100px">
          <el-select v-model="xiugai.xq">
            <el-option v-for="item in xq" :key="item" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学分" label-width="100px">
          <el-input v-model="xiugai.xf" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="授课" label-width="100px">
          <el-input v-model="xiugai.sk" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="实验上机" label-width="100px">
          <el-input v-model="xiugai.sj" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="总学时" label-width="100px">
          <el-input v-model="xiugai.zxs" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="100px">
          <el-input type="textarea" v-model="xiugai.bz" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save()">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 添加对话框 -->
    <el-dialog
      title="添加课程信息"
      :visible.sync="coursedialogVisible"
      width="40%"
      top="10vh"
      @close="editDialogClosed('addRef')"
    >
      <el-form :model="addCourseList" ref="addRef" :rules="addCourseRules">
        <el-form-item label="课程中文名称" label-width="110px" prop="zwmc">
          <el-input v-model="addCourseList.zwmc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程英文名称" label-width="110px" prop="ywmc">
          <el-input v-model="addCourseList.ywmc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程编号" label-width="110px" prop="kid">
          <el-input v-model="addCourseList.kid" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 下拉框 -->
        <el-form-item label="课程类别" label-width="110px" prop="kclb">
          <el-select
            v-model="addCourseList.kclb"
            placeholder="请选择"
            @change="addchange(addCourseList.kclb)"
          >
            <el-option-group v-for="group in options" :key="group.label" :label="group.label">
              <el-option v-for="item in group.options" :key="item.value" :value="item.value"></el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item v-if="addinputValue" label="专业方向" label-width="110px" prop="lbc">
          <el-input v-model="addCourseList.lbc"></el-input>
        </el-form-item>
        <el-form-item label="课程性质" label-width="110px" prop="kcxz">
          <el-select v-model="addCourseList.kcxz" placeholder="请选择">
            <el-option v-for="item in kcxzAry" :key="item.id" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学  期" label-width="110px" prop="xq">
          <el-select v-model="addCourseList.xq">
            <el-option v-for="item in addxn" :key="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学  分" label-width="110px" prop="xf">
          <el-input v-model="addCourseList.xf" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="授  课" label-width="110px" prop="sk">
          <el-input v-model="addCourseList.sk" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="实验上机" label-width="110px" prop="sj">
          <el-input v-model="addCourseList.sj" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="总学时" label-width="110px" prop="zxs">
          <el-input v-model="addCourseList.zxs" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备  注" label-width="110px">
          <el-input type="textarea" v-model="addCourseList.bz" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveAddCourse()">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import pagination from "./pagination"
export default {
  data() {
    return {
      // 传参 几页 多少条信息
      planParams: {
        pageIndex: 1,
        pageSize: 50
      },
      // 表格数据
      tableDataPlan: [],
      // 分页
      page: {
        pageCount: null, //   第几页 用来分页页数的绑定
        pageValue: null, //修改的对话框 false对话框隐藏
        pageSize: 50
      },
      // 修改对话框的显示隐藏
      plandialogVisible: false,
      // 修改对话框的数据
      xiugai: {},
      // 修改中 学期  根据学年*2得到
      xq: null,
      // 课程类别的数据显示 固定的
      options: [
        {
          options: [
            {
              value: "课程群"
            }
          ]
        },

        {
          label: "模块",
          options: [
            {
              value: "专业共享"
            },
            {
              value: "专业方向"
            },
            {
              value: "实践教学"
            }
          ]
        },
        {
          label: "平台",
          options: [
            {
              value: "公共基础平台"
            },
            {
              value: "学科基础平台"
            }
          ]
        }
      ],
      // 控制模块下 专业方向下面的输入框
      addinputValue: false,
      // 修改 --模块专业方向下的输入框 显示隐藏控制
      editinputValue: false,
      // 添加课程信息
      addCourseList: {
        zwmc: null,
        ywmc: null,
        kid: null,
        kclb: null,
        lbc: null,
        kcxz: null,
        xq: null,
        xf: null,
        sk: null,
        sj: null,
        zxs: null,
        bz: null
      },
      // 添加课程信息的对话框 的显示
      coursedialogVisible: false,
      // 课程性质数组的获取
      kcxzAry: [],
      // 添加课程的验证
      addCourseRules: {
        zwmc: [{ required: true, message: "请输入中文名称", trigger: "blur" }],
        ywmc: [{ required: true, message: "请输入英文名称", trigger: "blur" }],
        lbc: [{ required: true, message: "请输入英文名称", trigger: "blur" }],
        kid: [{ required: true, message: "请输入中文编号", trigger: "blur" }],
        kcxz: [{ required: true, message: "请选择课程性质", trigger: "blur" }],
        xq: [{ required: true, message: "请输入学期", trigger: "blur" }],
        xf: [{ required: true, message: "请输入学分", trigger: "blur" }],
        sk: [{ required: true, message: "请输入", trigger: "blur" }],
        zxs: [{ required: true, message: "请输入", trigger: "blur" }],
        kclb: [{ required: true, message: "请输入", trigger: "blur" }],
        sj: [{ required: true, message: "请输入", trigger: "blur" }]
      },
      // 添加课程信息中的 学年信息获取
      addxn: null,
      curPage:null
    }
  },
  // 引用分页子组件
  components: {
    pagination
  },
 
  methods: {
    // 获取表格信息
    planList() {
      this.axios
        .get("/rcpy/courseServlet?operation=selectZyCourseMessage", {
          params: this.planParams
        })
        .then(
          res => {
            if (res.status !== 200) return alert("网络错误")
            this.tableDataPlan = res.data.list
            // console.log(res)
            this.page.pageCount = res.data.count
            this.page.pageCount > 50
              ? (this.page.pageValue = false)
              : (this.page.pageValue = true) //判断分页的显示隐藏
          },
          err => {
            alert("错误" + err)
          }
        )
    },
    // 子组件 分页
    show(msg) {
      this.curPage=msg
      this.planParams.pageIndex = msg
      this.planList()
    },
    // 修改按钮 两个请求 步骤一：查询所有课程性质，post，没有参数 getAllKcxz()
    //  步骤二：根据后台存的课程id查询课程信息，post,  步骤三：页面的数据，保存到后台，修改保存课程信息，post
    update(id) {
      this.plandialogVisible = true //控制修改对话框的显示
      this.axios
        .post(
          "/rcpy/courseServlet?operation=savaCourseId", //1.将id传过去 后台得到该课程的id
          this.$qs.stringify({
            courseId: id
          })
        )
        .then(res => {
          // console.log(res)
          return this.axios.post(
            "/rcpy/courseServlet?operation=findCourseMessageByCourseId" //2.根据存储的id 返回该课程的信息
          )
        })
        .then(res => {
          // console.log(res)
          if (res.data.lbb === "专业方向") {
            this.editinputValue = true
          }
          this.xiugai = res.data // 3.从后台 获取到修改对话框中 数据显示部分
          if (res.data.lba === "课程群") {
            //4.解决lba为课程群 课程类别select中不显示的问题
            this.xiugai.lbb = "课程群"
          }
          this.xq = res.data.xn * 2 //5.从后台获取的信息中得到学年 学期=学年*2  从而得到学期的下拉框数据显示
          // console.log(this.xq);
        })
    },
    //修改对话框中的 保存按钮
    save() {
      this.axios
        .post(
          "/rcpy/courseServlet?operation=updateCourseMessage",
          this.$qs.stringify({
            id: this.xiugai.id,
            kid: this.xiugai.kid,
            zwmc: this.xiugai.zwmc,
            ywmc: this.xiugai.ywmc,
            kclb: this.xiugai.lbb,
            lbc: this.xiugai.lbc,
            kcxz: this.xiugai.kcxz,
            xq: this.xiugai.xq,
            xf: this.xiugai.xf,
            sk: this.xiugai.sk,
            sj: this.xiugai.sj,
            zxs: this.xiugai.zxs,
            bz: this.xiugai.bz
          })
        )
        .then(
          res => {
            // console.log(res)
            if (res.data !== 1) return this.$message.error("修改失败")
            this.$message.success("修改成功")
            this.plandialogVisible = false
            this.planList()
            this.addCourseList.bz = ""
          },
          err => {
            this.$message.error("修改失败" + err)
          }
        )
    },
    // 删除按钮
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return this.axios.post(
            "/rcpy/courseServlet?operation=delZyCourseMessage",
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
        .then(res => {
          if (res.data === 1) this.$message.success("删除成功")
          if (res.data === 0) return this.$message.error("删除失败")
          if (res.data === 2)
            return this.$message.warning("课程已审核，不可删除")
          const totalPage=Math.ceil((this.page.pageCount - 1) / this.page.pageSize)
          this.curPage= this.curPage > totalPage ? totalPage : this.curPage
          this.planParams.pageIndex = this.curPage

          this.planList()
        })
    },
    // 添加按钮中 课程类别中的专业方向下新的按钮是否显示的控制 当课程性质不为专业方向时 lbc为空
    addchange(val) {
      // console.log(val)
      if (val == "专业方向") {
        this.addinputValue = true
      } else {
        this.addinputValue = false
      }
    },
    // 修改按钮中  课程类别中的专业方向下输入框是否显示的控制 当课程性质不为专业方向时 lbc为空
    editchange(val) {
      // console.log(val)
      if (val == "专业方向") {
        this.editinputValue = true
      } else {
        this.editinputValue = false
        this.xiugai.lbc = ""
      }
    },
    // 修改按钮的重置操作 当点击修改按钮 把课程类别改成专业方向时 关闭按钮再次打开 会出现专属专业方向的输入框 所以要监听对画框的关闭 将控制输入框的值改成false
    editDialogClosed(ref) {
      // console.log("关闭")
      if (ref == "addRef") {
        this.$refs.addRef.resetFields()
        this.addinputValue = false
        this.addCourseList.bz = ""
      } else if (ref == "editRef") {
        this.$refs.editRef.resetFields()
        this.editinputValue = false
      }
    },
    // 添加新的课程信息
    addCourse() {
      this.coursedialogVisible = true
      // 获取课程性质 信息
      this.axios
        .post("/rcpy/courseServlet?operation=findZyJcsjXq")
        .then(res => {
          // 添加课程信息中的学期获取
          this.addxn = res.data
        })
    },
    // 查询所有的课程性质
    getAllKcxz() {
      this.axios.post("/rcpy/kcxzServlet?operation=selectAllKcxz").then(res => {
        if (res.status !== 200) return alert("获取课程性质错误")
        this.kcxzAry = res.data
      })
    },
    // 添加新的课程信息 中的 保存按钮
    saveAddCourse() {
      this.$refs.addRef.validate(valid => {
        // console.log(valid)
        if (!valid) return
        this.axios
          .post(
            "/rcpy/courseServlet?operation=addCourseMessage",
            this.$qs.stringify(this.addCourseList)
          )
          .then(res => {
            if (res.data !== 1) return alert("添加失败")
            this.$message.success("添加成功")
            // console.log(res)
            this.planList()
            this.coursedialogVisible = false
          })
      })
    },

    // 查看学时学分
    checkxs() {
      this.axios.post("/rcpy/tableServlet?operation=copyZyHz").then(
        res => {
          console.log(res)
          if (res.data.flag !== "1") return this.$message.error("查看失败")

          window.location.href =
            "/rcpy/tableServlet?operation=downLoadFile&filePath=" +
            res.data.filePath +
            "&fileName=" +
            res.data.fileName
        },
        err => {
          alert("查看失败 ！错误" + err)
        }
      )
    },
    // 导出专业计划表
    exportplan() {
      this.axios.post("/rcpy/tableServlet?operation=copyZyJh").then(
        res => {
          console.log(res)
          if (res.data.flag !== "1") return this.$message.error("导出失败")
          window.location.href =
            "/rcpy/tableServlet?operation=downLoadFile&filePath=" +
            res.data.filePath +
            "&fileName=" +
            res.data.fileName
        },
        err => {
          this.$message.error("网络出错了" + error)
        }
      )
    }
  },
  created() {
    this.planList()
    this.getAllKcxz()
  }
}
</script>

<style scoped>
.iconfont {
  margin-right: 2px;
  font-size: 12px;
}
.card {
  padding: 13px;
  background-color: rgba(122, 122, 122, 0.133);

  border-left: 5px green solid;
  margin-bottom: 20px;
}
.el-table,
.hidden-columns {
  color: black;
}
.el-dialog__body {
  height: 50vh;
  overflow: auto;
}
</style>
