<template name="component-name">
  <div>
    <el-form ref="homePageRef" :model="zyList" :rules="homePageRules">
      <el-form-item label="英文名称 :" label-width="80px">
        <el-input placeholder="请合理输入" v-model="zyList.ywmc"></el-input>
      </el-form-item>
      <el-form-item label="培养目标 :" :inline="true" label-width="80px">
        <el-input
          placeholder="请参考教育部编印的《普通高等学校本科专业目录和专业介绍》，并根据学习定位，结合学科专业自身发展特点，字数控制在150-200字。"
          maxlength="200"
          show-word-limit
          v-model="zyList.description1"
          type="textarea"
        ></el-input>
      </el-form-item>
      <el-form-item label="基本要求 :" :inline="true" label-width="80px">
        <el-input
          placeholder="根据专业培养目标，参考教育部编印的《普通高等学校本科专业目录和专业介绍》。字数控制在300-500字。"
          v-model="zyList.description2"
          maxlength="500"
          show-word-limit
          type="textarea"
        ></el-input>
      </el-form-item>
      <el-form-item label="主干学科 :" :inline="true" label-width="80px">
        <el-input placeholder="请输入内容" v-model="zyList.description3"></el-input>
      </el-form-item>
      <el-form-item label="主要课程 :" :inline="true" label-width="80px">
        <el-input
          placeholder="根据专业培养目标，参考教育部编印的《普通高等学校本科专业目录和专业介绍》，并结合学校定位，列出专业基础或专业核心课程，门数控制在10门以内。"
          v-model="zyList.description4"
        ></el-input>
      </el-form-item>
      <el-form-item label="学制 修业年限及授予学位 :" :inline="true" label-width="120px">
        <el-input
          placeholder="本专业学制    年，弹性修业年限   -  年，符合授予学士学位规定，授予          学学士学位。"
          v-model="zyList.description5"
        ></el-input>
      </el-form-item>
      <el-form-item label="毕业学分要求:" :inline="true" label-width="100px">
        <el-input
          placeholder="本专业须修满培养方案中规定课程      学分（其中平台     学分，模块   学分 ，课程群   学分），方准毕业。"
          v-model="zyList.description6"
        ></el-input>
      </el-form-item>
      <el-form-item label="主要实践性教学环节" :inline="true" label-width="140px">
        <el-input placeholder="实践性教学环节主要包括：" v-model="zyList.description7"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" size="medium" @click="submit()">提交</el-button>
    <el-button type="primary" size="medium">更改</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
      homePageRules: {
        ywmc: [{ required: true, message: "请输入英文名称", trigger: "blur" }],
        description1: [
          { required: true, message: "请输入150-200的文字", trigger: "blur" },
          { min: 150, max: 300, message: "长度在 150 到 200 个字符", trigger: "blur" }
        ],
        
        description2: [
          { required: true, message: "请输入300~500的文字", trigger: "blur" },
          { min: 300, max: 500, message: "长度在 300 到 500 个字符", trigger: "blur" }
        ],
        description3: [
          { required: true, message: "请输入文字", trigger: "blur" }
          
        ],
        description4: [
          { required: true, message: "请输入文字", trigger: "blur" },
        ],
        description5: [
          { required: true, message: "请输入文字", trigger: "blur" },
        ],
        description6: [
          { required: true, message: "请输入文字", trigger: "blur" },
        ],
        description7: [
          { required: true, message: "请输入文字", trigger: "blur" },
        ],
      }
    }
  },
  methods: {
    submit() {
      console.log(1)
      this.axios
        .post(
          "rcpy/myController?operation=saveCategoryData",
          this.$qs.stringify(this.zyList)
        )
        .then(
          res => {
            console.log(res)
            if (res.data !== 1) return this.$message.error("保存失败")
          },
          err => {
            alert("已经提交过相关信息，如果想修改，请点击修改按钮")
          }
        )
    }
  }
}
</script>

<style>
</style>