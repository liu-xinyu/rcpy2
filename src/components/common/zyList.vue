// 专业列表
<template name="component-name">
  <div>
    <fieldset style="border:1px solid #e2e2e2">
      <legend style="font-size:20px">文件预览</legend>
      <el-table :data="zyListData" border style="width: 99%">
        <el-table-column prop="zwmc" label="专业名称" width="400"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="switchBtn(scope.row.type,scope.row.uid)">
              <i
                style="font-size:10px;margin-right:2px"
                class="iconfont icon-xing"
                v-show="scope.row.type==0"
              ></i>
              {{scope.row.type==1?'已审核':'未审核'}}
            </el-button>
            <el-button type="success" size="small" @click="lookFirst(scope.row.zwmc)">查看首页</el-button>
            <el-button
              type="success"
              size="small"
              @click="dialogPlanVisible=true;planPage(scope.row.zwmc)"
            >查看计划安排表</el-button>
          </template>
        </el-table-column>
      </el-table>
    </fieldset>
    <!-- 查看首页的对话框 -->
    <el-dialog
      title="首页信息"
      :visible.sync="dialogFirstVisible"
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
    <!-- 查看计划表的对话框 -->
    <el-dialog title="首页信息" :visible.sync="dialogPlanVisible" top="2vh" width="90%" @close="planClosed()">
      <fieldset style="border:1px #e2e2e2 solid">
        <legend>人才培养方案计划安排表</legend>
        <el-table :data="planObject" border style="width: 100%" height="450px">
          <el-table-column prop="number" label="编号" width="40"></el-table-column>
          <el-table-column prop="kid" label="课程编号"></el-table-column>
          <el-table-column prop="zwmc" label="中文名称"></el-table-column>
          <el-table-column prop="ywmc" label="英文名称"></el-table-column>
          <el-table-column label="课程类别">
            <el-table-column prop="lba" label="选项A"></el-table-column>
            <el-table-column prop="lbb" label="选项B"></el-table-column>
            <el-table-column prop="lbc" label="选项C"></el-table-column>
          </el-table-column>
          <el-table-column prop="xf" label="学分"></el-table-column>
          <el-table-column prop="sk" label="授课学时"></el-table-column>
          <el-table-column prop="sj" label="实验上机"></el-table-column>
          <el-table-column prop="zxs" label="总学时"></el-table-column>
          <el-table-column prop="xq" label="学期"></el-table-column>
          <el-table-column prop="kcxz" label="课程性质"></el-table-column>
          <el-table-column prop="bz" label="备注"></el-table-column>
        </el-table>
        <!-- 3 计划安排表的分页  :hide-on-single-page="planPaginationValue"-->
      <el-pagination
        v-if="currentPageNumber"
        background
        layout="prev, pager, next"
        :page-size="50"
        :total="planCount"
        @current-change="planHandleCurrentChange"
      ></el-pagination>
      </fieldset>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      zyParams: {
        pageIndex: 1,
        pageSize: 10
      },
      shenhe: null,
      zyListData: [],
      dialogFirstVisible: false,
      homedescription: {
        ywmc: "",
        description1: "",
        description2: "",
        description3: "",
        description4: "",
        description5: "",
        description6: "",
        description7: ""
      },
      // 3.查看计划表的对话框的显示隐藏
      dialogPlanVisible: false,
      // 3.查看计划表 用来在对话框里展示数据的对象存储
      planObject: [],
      // 3,
      planParams: {
        pageIndex: 1,
        pageSize: 50
      },
      planObject: [],
      planCount:null,
      planName:null,
      currentPageNumber:false
    }
  },
  methods: {
    zyList() {
      this.axios
        .post(
          "/rcpy/zyArticleServlet?operation=showYxXiaAllZy",
          this.$qs.stringify(this.zyParams)
        )
        .then(res => {
          console.log(res)
          this.zyListData = res.data.list
          
        })
    },
    // 1.审核与未审核的点击
    switchBtn(type, id) {
      type = type == 1 ? 0 : 1
      if (type == 1) {
        this.$message.success("审核通过 ^_^ ！！！！")
      } else if (type == 0) {
        this.$message.success("取消审核")
      }
      this.axios
        .post(
          "/rcpy/publicServlet?operation=changeType",
          this.$qs.stringify({
            type: type,
            uid: id
          })
        )
        .then(res => {
          this.zyList()
        })
    },
    // 2.查看首页的对话框 关闭
    homeArticleClosed() {
      this.homedescription = {}
    },
    // 2.数据显示
    async lookFirst(name) {
      this.dialogFirstVisible = true
      const res = await this.axios.post(
        "/rcpy/publicServlet?operation=saveZyUserZWMC",
        this.$qs.stringify({
          zwmc: name
        })
      )
      const res2 = await this.axios.post(
        "/rcpy/publicServlet?operation=showRcpyFirstPageMessage"
      )
      if (res2.data == "") return
      this.homedescription = res2.data
      console.log(res2)

      //没有数据的话 控制台会 报错
    },
    // 3.
    planPage(name) {
      this.planName=name
      console.log(name)
      this.axios
        .post(
          "/rcpy/publicServlet?operation=saveZyUserZWMC",
          this.$qs.stringify({
            zwmc: name
          })
        )
        .then(res => {
          console.log(res)
          if (res.status !== 200) return alert("网络错误")
        })
      this.axios
        .get("/rcpy/publicServlet?operation=showRcpyPlanMessage", {
          params: this.planParams
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
      this.planParams.pageIndex = newdata
      this.planPage(this.planName)
    },
    planClosed(){
      this.planParams.pageIndex = 1
      this.currentPageNumber = false
      console.log("关闭")
    }
  },
  created() {
    this.zyList()
  }
}
</script>

<style>
</style>