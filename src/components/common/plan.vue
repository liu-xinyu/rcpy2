<template name="component-name">
  <div>
    <!-- 添加课程信息 查看学分学时明细 导出计划安排表信息 -->
    <div class="card">
      <el-button type="success" @click="addCourse()">
        <i class="iconfont icon-add"></i> 添加课程信息
      </el-button>
      <el-button type="success" @click="ckCourse()">
        <i class="iconfont icon-add"></i> 查看学时学分明细
      </el-button>
      <el-button type="danger" @click="dcCourse()">
        <i class="iconfont icon-add"></i>导出专业计划安排表信息
      </el-button>
    </div>
    <!-- 表格 -->
    <fieldset style="border:1px solid #e2e2e2;padding:20px 10px">
      <legend style="font-size:20px">人才培养方案计划安排表</legend>
      <el-table
        :data="tableDataPlan"
        border
        style="width: 100%"
        :header-cell-style="{background:'#f5f7fa',color:'#000'}"
      >
        <el-table-column prop="number" label="编号" width="30"></el-table-column>
        <el-table-column prop="kid" label="课程编号" width="100"></el-table-column>
        <el-table-column prop="zwmc" label="中文名称" width="120"></el-table-column>
        <el-table-column prop="ywmc" label="英文名称" width="120"></el-table-column>
        <el-table-column label="课程类别">
          <el-table-column prop="lba" label="选项A" width="35"></el-table-column>
          <el-table-column prop="lbb" label="选项B" width="35"></el-table-column>
          <el-table-column prop="lbc" label="选项C" width="70"></el-table-column>
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
      top="9vh"
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
        <el-form-item label="课程性质" label-width="100px">
          <el-input v-model="xiugai.kcxz" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  label="学期" label-width="100px">
          <el-select v-model="xiugai.xq">
            <el-option v-for="item in xq" :key="item" :value="item" :label="item">
            </el-option>
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
      top="9vh"
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
        <el-form-item  label="学  期" label-width="110px" prop="xq">
          <el-select v-model="addCourseList.xq">
            <el-option v-for="item in addxn" :key="item" :value="item">

            </el-option>
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
      xq:null,
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
      // value: "",
      // 控制模块下 专业方向下面的输入框
      addinputValue: false,
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
      addxn:null
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
        .get("rcpy/courseServlet?operation=selectZyCourseMessage", {
          params: this.planParams
        })
        .then(res => {
          if (res.status !== 200) return alert("网络错误")
          this.tableDataPlan = res.data.list
          console.log(res)
          this.page.pageCount = res.data.count
          this.page.pageCount > 50
            ? (this.page.pageValue = false)
            : (this.page.pageValue = true) //判断分页的显示隐藏
        })
    },
    // 子组件 分页
    show(msg) {
      this.planParams.pageIndex = msg
      this.planList()
    },
    // 修改按钮 两个请求
    update(id) {
      this.plandialogVisible = true
      this.axios
        .post(
          "rcpy/courseServlet?operation=savaCourseId",
          this.$qs.stringify({
            courseId: id
          })
        )
        .then(res => {
          // console.log(res)
          return this.axios.post(
            "rcpy/courseServlet?operation=findCourseMessageByCourseId"
          )
        })
        .then(res => {
          // console.log(res)
          if (res.data.lbb === "专业方向") {
            this.editinputValue = true
          }

          // 获取到修改对话框中 数据显示部分
          this.xiugai = res.data
          if(res.data.lba==='课程群')
          {
            this.xiugai.lbb='课程群'
          }
          this.xq=res.data.xn*2
          // console.log(this.xq);
          
        })
    },
    // 保存
    save() {
      this.axios
        .post(
          "rcpy/courseServlet?operation=updateCourseMessage",
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
            this.addCourseList.bz=''
          },
          err => {
            this.$message.error("修改失败" + err)
          }
        )
    },
    // 删除按钮
    del(id) {
      this.axios
        .post(
          "rcpy/courseServlet?operation=delZyCourseMessage",
          this.$qs.stringify({
            id: id
          })
        )
        .then(res => {
          
          if (res.data === 1) this.$message.success("删除成功")
          if (res.data === 0) return this.$message.error("删除失败")
          if (res.data === 2)
            return this.$message.warning("课程已审核，不可删除")

          this.planList()
        })
      // console.log(id)
    },
    // 修改按钮中 课程类别中的专业方向下新的按钮是否显示的控制 当课程性质不为专业方向时 lbc为空
    addchange(val) {
      // console.log(val)
      if (val == "专业方向") {
        this.addinputValue = true
      } else {
        this.addinputValue = false
      }
    },
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
        this.addCourseList.bz=''
      } else if (ref == "editRef") {
        this.$refs.editRef.resetFields()
        this.editinputValue = false
      }
    },
    // 添加新的课程信息
    addCourse() {
      this.coursedialogVisible = true
      // 获取课程性质 信息
      this.axios.post("rcpy/kcxzServlet?operation=selectAllKcxz").then(res => {
        if (res.status !== 200) return alert("获取课程性质错误")
        this.kcxzAry = res.data
        return this.axios.post('rcpy/courseServlet?operation=findZyJcsjXq')
      }).then(res=>{
        // console.log(res);
        // 添加课程信息中的学期获取
        this.addxn=res.data
      })
    },
    // 添加新的课程信息 中的 保存按钮
    saveAddCourse() {
      this.$refs.addRef.validate(valid => {
        // console.log(valid)
        if (!valid) return
        this.axios
          .post(
            "rcpy/courseServlet?operation=addCourseMessage",
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
    }
  },
  created() {
    this.planList()
  }
}
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