<template name="component-name">
  <div>
    <el-form ref="homePageRef" :model="zyList" :rules="homePageRules">
      <el-form-item label="英文名称 :" label-width="90px" prop="ywmc">
        <el-input placeholder="请合理输入" v-model="zyList.ywmc"></el-input>
      </el-form-item>
      <el-form-item label="培养目标 :" label-width="90px" prop="description1">
        <el-input
          autosize
          placeholder="请参考教育部编印的《普通高等学校本科专业目录和专业介绍》，并根据学习定位，结合学科专业自身发展特点，字数控制在150-200字。"
          maxlength="200"
          show-word-limit
          v-model="zyList.description1"
          type="textarea"
        ></el-input>
      </el-form-item>
      <el-form-item label="基本要求 :" label-width="90px" prop="description2">
        <el-input
          placeholder="根据专业培养目标，参考教育部编印的《普通高等学校本科专业目录和专业介绍》。字数控制在300-500字。"
          v-model="zyList.description2"
          maxlength="500"
          autosize
          show-word-limit
          type="textarea"
        ></el-input>
      </el-form-item>
      <el-form-item label="主干学科 :" :inline="true" label-width="90px" prop="description3">
        <el-input placeholder="请输入内容" v-model="zyList.description3"></el-input>
      </el-form-item>
      <el-form-item label="主要课程 :" :inline="true" label-width="90px" prop="description4">
        <el-input
          placeholder="根据专业培养目标，参考教育部编印的《普通高等学校本科专业目录和专业介绍》，并结合学校定位，列出专业基础或专业核心课程，门数控制在10门以内。"
          v-model="zyList.description4"
        ></el-input>
      </el-form-item>
      <el-form-item label="学制 修业年限及授予学位 :" :inline="true" label-width="200px" prop="description5">
        <el-input
          placeholder="本专业学制    年，弹性修业年限   -  年，符合授予学士学位规定，授予          学学士学位。"
          v-model="zyList.description5"
        ></el-input>
      </el-form-item>
      <el-form-item label="毕业学分要求:" :inline="true" label-width="110px" prop="description6">
        <el-input
          placeholder="本专业须修满培养方案中规定课程      学分（其中平台     学分，模块   学分 ，课程群   学分），方准毕业。"
          v-model="zyList.description6"
        ></el-input>
      </el-form-item>
      <el-form-item label="主要实践性教学环节" :inline="true" label-width="150px" prop="description7">
        <el-input placeholder="实践性教学环节主要包括：" v-model="zyList.description7"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" v-if="btnValue===0" size="medium" @click="submit()">提交</el-button>
    <el-button
      type="primary"
      v-else-if="btnValue===1"
      size="medium"
      @click="updateBtn();xiudialogFormVisible = true"
    >更改</el-button>
    <!-- 修改的对话框 -->
    <el-dialog title="修改首页信息" :visible.sync="xiudialogFormVisible" top="1vh" width="60%">
      <el-form :model="dialogValue" ref="saveRef" :rules="homePageRules">
        <el-form-item label="英文名称" label-width="80px" class="lineheight" prop="ywmc">
          <el-input v-model="dialogValue.ywmc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="培养目标" label-width="80px" class="lineheight" prop="description1">
          <el-input
            maxlength="200"
            show-word-limit
            type="textarea"

            v-model="dialogValue.description1"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="基本要求" label-width="80px" prop="description2">
          <el-input
            maxlength="500"
            show-word-limit
            type="textarea"
            v-model="dialogValue.description2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="主干学科" label-width="80px" prop="description3">
          <el-input v-model="dialogValue.description3" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="主要课程" label-width="80px" prop="description4">
          <el-input v-model="dialogValue.description4" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学制修业年限及授予学位" label-width="180px" prop="description5">
          <el-input v-model="dialogValue.description5" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="毕业学分要求" label-width="110px" prop="description6">
          <el-input v-model="dialogValue.description6" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="主要实践性教学环节" label-width="150px" prop="description7">
          <el-input v-model="dialogValue.description7" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveBtn()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 一开始的显示
      zyList: {
        ywmc: "",
        description1: "",
        description2: "",
        description3: "",
        description4: "",
        description5: "",
        description6: "",
        description7: ""
      },
      // 对话框的显示
      dialogValue: {},
      btnValue: 1,
      // 校验规则
      homePageRules: {
        ywmc: [{ required: true, message: "请输入英文名称", trigger: "blur" }],
        description1: [
          { required: true, message: "请输入150-200的文字", trigger: "blur" },
          {
            min: 150,
            max: 300,
            message: "长度在 150 到 200 个字符",
            trigger: "blur"
          }
        ],

        description2: [
          { required: true, message: "请输入300~500的文字", trigger: "blur" },
          {
            min: 300,
            max: 500,
            message: "长度在 300 到 500 个字符",
            trigger: "blur"
          }
        ],
        description3: [
          { required: true, message: "请输入文字", trigger: "blur" }
        ],
        description4: [
          { required: true, message: "请输入文字", trigger: "blur" }
        ],
        description5: [
          { required: true, message: "请输入文字", trigger: "blur" }
        ],
        description6: [
          { required: true, message: "请输入文字", trigger: "blur" }
        ],
        description7: [
          { required: true, message: "请输入文字", trigger: "blur" }
        ]
      },
      xiudialogFormVisible: false
    }
  },
  methods: {
    submit() {
      //没有数据的 点击提交按钮
      this.$refs.homePageRef.validate(valid => {
        if (!valid) return
        // console.log(valid)
        this.axios
          .post(
            "rcpy/fangAnServlet?operation=saveFangAnMessage",
            this.$qs.stringify(this.zyList)
          )
          .then(
            res => {
              console.log(res)
              if (res.data !== 1) return this.$message.error("保存失败")
              this.$message.success("保存成功")
              
              this.btnvis() 
            },
            err => {
              console.log(err)
              // alert("已经提交过相关信息，如果想修改，请点击修改按钮")
            }
          )
      })
    },
    // 控制显示提交还是修改按钮 如果有数据就显示数据
    btnvis() {
      this.axios
        .post("rcpy/fangAnServlet?operation=findFangAnMessage")
        .then(res => {
          // console.log(res)
          // console.log(res.data)
          this.btnValue = res.data === 0 ? 0 : 1
          if (res.data == 0) return
          this.zyList = res.data
        })
    },
    //有数据的 更改按钮
    updateBtn() {
      // console.log("更新")
      this.axios
        .post("rcpy/fangAnServlet?operation=findFangAnMessage")
        .then(res => {
          // console.log(res)
          this.dialogValue = res.data
        })
    },
    // 保存按钮
    saveBtn() {
      this.$refs.saveRef.validate(valid => {
        if (!valid) return
        this.axios
          .post(
            "rcpy/fangAnServlet?operation=updateFangAnMessage",
            this.$qs.stringify({
              zwmc: this.dialogValue.zwmc,
              ywmc: this.dialogValue.ywmc,
              description1: this.dialogValue.description1,
              description2: this.dialogValue.description2,
              description3: this.dialogValue.description3,
              description4: this.dialogValue.description4,
              description5: this.dialogValue.description5,
              description6: this.dialogValue.description6,
              description7: this.dialogValue.description7
            })
          )
          .then(res => {
            // console.log(res)
            if (res.data !== 1) return this.$message.error("保存错误")
            this.$message.success("保存成功")
            this.btnvis()
          })
        this.xiudialogFormVisible = false
      })
    }
  },
  created() {
    this.btnvis()
  }
}
</script>

<style>
.el-form-item__label.lineheight {
  line-height: 14px;
}
.el-dialog__body {
  padding: 5px 20px;
}
</style>
// 有信息展示信息 展示更改按钮
// 没有信息 展示提交按钮