<template name="component-name">
  <div>
    <!-- 表格 -->
    <fieldset style="border:1px #e2e2e2 solid">
      <legend>文章列表</legend>
      <el-table
        :data="newsList"
        border
        style="width: 100%"
        :header-cell-style="{background:'#f5f7fa',color:'#000'}"
      >
        <el-table-column prop="dname" label="院系" width="180"></el-table-column>
        <el-table-column prop="zwmc" label="专业名称" width="190"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="check(scope.row.type,scope.row.uid)">
              <i class="iconfont icon-xing" v-show="scope.row.type==1"></i>
              {{scope.row.type==2?'已审核':'未审核'}}
            </el-button>
            <el-tag
              effect="dark"
              type="success"
              @click="dialogVisible = true;checkHomePage(scope.row.zwmc)"
            >查看首页</el-tag>
            <el-tag
              effect="dark"
              type="success"
              @click="dialogPlanVisible=true;planPage(scope.row.zwmc)"
            >查看计划安排表</el-tag>
            <el-tag
              effect="dark"
              type="danger"
              @click="loadMajorPlan(scope.row.zwmc,scope.row.dname,'Jh')"
            >下载专业计划安排表</el-tag>
            <el-tag
              effect="dark"
              type="danger"
              @click="loadMajorPlan(scope.row.zwmc,scope.row.dname,'Hz')"
            >下载学分学时汇总表</el-tag>
            <el-tag
              effect="dark"
              type="danger"
              @click="loadMajorPlan(scope.row.zwmc,scope.row.dname,'Py')"
            >下载专业培养方案</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </fieldset>
    <!-- 院系文章 分页 -->
    <pagination :page="page" @func="show"></pagination>
    <!-- 2 查看首页 对话框-->
    <el-dialog
      title="首页信息"
      :visible.sync="dialogVisible"
      width="50%"
      top="2vh"
      @close="homeArticleClosed()"
    >
      <el-form label-width="80px" :model="homedescription">
        <el-form-item label="专业英文..">
          <el-input placeholder="请合理输入" v-model="homedescription.ywmc"></el-input>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input
            type="textarea"
            placeholder="请参考教育部编印的《普通高等学校本科专业目录和专业介绍》，并根据学习定位，结合学科专业自身发展特点，字数控制在150-200字。"
            v-model="homedescription.description1"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input
            type="textarea"
            placeholder="根据专业培养目标，参考教育部编印的《普通高等学校本科专业目录和专业介绍》。字数控制在300-500字。"
            v-model="homedescription.description2"
          ></el-input>
        </el-form-item>
        <el-form-item label="主干学科:">
          <el-input placeholder="请输入内容" v-model="homedescription.description3"></el-input>
        </el-form-item>
        <el-form-item label="主干课程:">
          <el-input
            v-model="homedescription.description4"
            placeholder="根据专业培养目标，参考教育部编印的《普通高等学校本科专业目录和专业介绍》，并结合学校定位，列出专业基础或专业核心课程，门数控制在10门以内。"
          ></el-input>
        </el-form-item>
        <el-form-item label="学制 修业:">
          <el-input
            placeholder="本专业学制    年，弹性修业年限   -  年，符合授予学士学位规定，授予          学学士学位。"
            v-model="homedescription.description5"
          ></el-input>
        </el-form-item>
        <el-form-item label="毕业学分">
          <el-input
            placeholder="本专业须修满培养方案中规定课程      学分（其中平台     学分，模块   学分 ，课程群   学分），方准毕业。"
            v-model="homedescription.description6"
          ></el-input>
        </el-form-item>
        <el-form-item label="主要实践:">
          <el-input placeholder="实践性教学环节主要包括：" v-model="homedescription.description7"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 3 查看计划安排表 -->
    <el-dialog
      title="文章信息"
      :visible.sync="dialogPlanVisible"
      width="90%"
      top="3vh"
      @close="planDialogClose()"
    >
      <fieldset style="border:1px #e2e2e2 solid">
        <legend>人才培养方案计划安排表</legend>
        <el-table :data="planObject" border style="width: 100%" height="400px">
          <el-table-column prop="number" label="编号" width="40px"></el-table-column>
          <el-table-column prop="kid" label="课程编号" width="90px"></el-table-column>
          <el-table-column prop="zwmc" label="中文名称" width="140px"></el-table-column>
          <el-table-column prop="ywmc" label="英文名称" width="330px"></el-table-column>
          <el-table-column label="课程类别">
            <el-table-column prop="lba" label="选项A" width="30px"></el-table-column>
            <el-table-column prop="lbb" label="选项B" width="60px"></el-table-column>
            <el-table-column prop="lbc" label="选项C" width="30px"></el-table-column>
          </el-table-column>
          <el-table-column prop="xf" label="学分" width="40px"></el-table-column>
          <el-table-column prop="sk" label="授课学时" width="50px"></el-table-column>
          <el-table-column prop="sj" label="实验上机" width="50px"></el-table-column>
          <el-table-column prop="zxs" label="总学时" width="45px"></el-table-column>
          <el-table-column prop="xq" label="学期" width="30px"></el-table-column>
          <el-table-column prop="kcxz" label="课程性质" width="60px"></el-table-column>
          <el-table-column prop="bz" label="备注"></el-table-column>
        </el-table>
      </fieldset>
      <!-- 3 计划安排表的分页  :hide-on-single-page="planPaginationValue"-->
      <el-pagination
        v-if="currentPageNumber"
        background
        layout="prev, pager, next"
        :page-size="50"
        :total="planCount"
        @current-change="planHandleCurrentChange"
      ></el-pagination>
    </el-dialog>
  </div>
</template>
<script>
import pagination from "./pagination"
export default {
  data() {
    return {
      newsList: [], //信息的展示
      //   控制分页的显示
      page: {           //父组件给子组件的信息
        pageCount: null, //   第几页 用来分页页数的绑定
        pageValue: null, //修改的对话框 false对话框隐藏
        pageSize: 10
      },
      pageParams: {
        pageIndex: 1,
        pageSize: 10
      },
      // 2查看首页的对话框的显示隐藏
      dialogVisible: false,
      // 2 查看首页的显示信息
      homedescription: {},
      // 3.查看计划表的对话框的显示隐藏
      dialogPlanVisible: false,
      // 3. 计划安排表中 发送请求所需要的参数
      planParameter: {
        pageIndex: 1,
        pageSize: 50
      },
      // 3.查看计划表 用来在对话框里展示数据的对象存储
      planObject: [],
      // 3.查看计划安排表 分页的count
      planCount: null,
     
      // 3.查看计划表 必须有一个name
      planName: null,
      // 3.分页器的高亮问题
      currentPageNumber: false
    }
  },
  components: {
    pagination
  },
  methods: {
    // 显示数据的代码  拿到数据并且展示出来 绑定数据
    getNewsList() {
      this.axios
        .post(
          "/rcpy/departmentArticleServlet?operation=findPassUser",
          this.$qs.stringify(this.pageParams)
        )
        .then(data => {
          console.log(data)
          this.newsList = data.data.list
          // console.log(this.count)
          this.page.pageCount=data.data.count
           this.page.pageCount > 10
            ? (this.page.pageValue = false)
            : (this.page.pageValue = true) //判断分页的显示隐藏
        })
      
      
    },
    // 子组件 分页
    show(msg) {
      this.pageParams.pageIndex = msg
      this.getNewsList()
    },
    // 院系文章的分页 切换
    essayHandleCurrentChange(newdata) {
      console.log(newdata)
      this.pageParams.pageIndex = newdata
      this.getNewsList()
    },
    // 1.判断是否审核
    check(type, uid) {
      console.log(type, uid)
      type === 1 ? (type = 2) : (type = 1)
      console.log(type, uid)
      this.axios
        .post(
          "/rcpy/publicServlet?operation=changeType",
          this.$qs.stringify({
            type: type,
            uid: uid
          })
        )
        .then(data => {
          console.log(data)
          if (type === 1) {
            // 取消通过
            this.$message.success("取消审核通过成功")
          } else if (type === 2) {
            this.$message.success("审核成功!")
          }
          this.getNewsList()
        })
    },
    // 2查看首页
    async checkHomePage(name) {
      console.log(name)
      const res = await this.axios.post(
        "/rcpy/publicServlet?operation=saveZyUserZWMC",
        this.$qs.stringify({
          zwmc: name
        })
      )
      console.log(res)
      const res2 = await this.axios.post(
        "/rcpy/publicServlet?operation=showRcpyFirstPageMessage"
      )
      if (res2.data == null) return
      this.homedescription = res2.data
      //没有数据的话 控制台会 报错
      console.log(res2)
    },
    // 2.1 查看首页关闭的时候 显示的信息归位空 否则影响下一个数据的显示
    homeArticleClosed() {
      this.homedescription = {}
    },
    // 3 计划安排表
    planPage(name) {
      this.planPaginationValue = false

      //console.log(name)
      this.planName = name
      const res = this.axios
        .post(
          "/rcpy/publicServlet?operation=saveZyUserZWMC",
          this.$qs.stringify({
            zwmc: name
          })
        )
        .then(data => {
          //console.log(data)
        })

      this.axios
        .get("/rcpy/publicServlet?operation=showRcpyPlanMessage", {
          params: this.planParameter
        })
        .then(res => {
          console.log(res)
          this.planObject = res.data.list
          this.planCount = res.data.count
          console.log(this.planCount)
          if (this.planCount > 50) {
            this.currentPageNumber = true
          } else {
            this.currentPageNumber = false
          }
        })
    },
    // 3. 计划安排表 分页的点击切换 显示数据
    planHandleCurrentChange(newdata) {
      //console.log(newdata);
      this.planParameter.pageIndex = newdata
      this.planPage(this.planName)
    },
    // 3. 查看计划表 对话框结束的
    planDialogClose() {
      this.planParameter.pageIndex = 1
      this.currentPageNumber = false
      console.log("关闭")
    },
    // 4，下载专业计划安排表
    loadMajorPlan(zwmc, dname, name) {
      this.axios
        .post(
          `/rcpy/tableServlet?operation=copy${name}`,
          this.$qs.stringify({
            zwmc: zwmc,
            dname: dname
          })
        )
        .then(res => {
          console.log(res);
          if(res.data.flag==="2") return alert(res.data.errInfo)
          if (res.data.flag === "0") {
            this.$message.error("出现错误")
          } else if (res.data.flag === "1") {
            window.location.href =
              "/rcpy/tableServlet?operation=downLoadFile&filePath=" +res.data.filePath +"&fileName=" +
              res.data.fileName
          }
        })
        .catch(error => {
          this.$message.error("服务器出错请联系管理员 错误代码" + error)
        })
    }
    // 5.下载学分学时汇总表
    // 6.下载专业培养方案
  },
  created() {
    this.getNewsList()
  }
}
</script>

<style scoped>
.el-table,
.hidden-columns {
  color: black;
}
.el-tag {
  padding: 0 4px;
  cursor: pointer;
  margin: 0 5px;
}
.iconfont {
  margin-right: 0px;
}
.el-form-item label,
.el-textarea__inner,
.el-input__inner {
  color: black;
}
.el-dialog__header {
  background: #f8f8f8;
  font-size: 10px;
}
.el-dialog__body {
  padding: 5px;
}
.el-table .cell {
  padding-right: 0px;
}
</style>