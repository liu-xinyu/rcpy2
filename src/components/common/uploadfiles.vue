<template name="component-name">
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="/rcpy/fileServlet?operation=uploadRcpyJuZhenPdf"
      multiple
      :auto-upload="false"
      :limit="3"
      :on-exceed="handleExceed"
      :on-preview="handlePreview"
      :before-upload="beforeAvatarUpload"
      accept=".pdf, .PDF"
      :on-success="handleAvatarSuccess"
      :on-change="onchange"
      :disabled="disValue"
      :on-remove="remove"
    >
      <el-button slot="trigger" size="big" type="primary" :disabled="disValue">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="big" type="success" @click="submitUpload">上传到服务器</el-button>
      <p style="color:red" v-show="disValue">
        <i style="font-size:20px" class="el-icon-alarm-clock"></i> &nbsp;&nbsp;&nbsp;文件上传不可超过三个，现在已经上传三个文件了
      </p>
      <div v-show="!disValue">只能上传pdf文件，且不超过20MB</div>
    </el-upload>
    <br />
    <!-- 上传文件 的表格 -->
    <!-- <el-table :data="data" border>
      <el-table-column prop="name" label="文件名称"></el-table-column>
      <el-table-column label="状态" prop="status"></el-table-column>
      <el-table-column label="上传时间" prop="time"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="danger" :on-remove="remove">删除</el-button>
        </template>
      </el-table-column>
    </el-table> -->
    <!-- 三个表格 -->
    <fieldset style="border:1px #e2e2e2 solid">
      <legend>上传矩阵图</legend>
      <h1>上传时请按照如下列表要求，依次上传三个pdf文件</h1>
      (1)培养目标与毕业要求的对应关系矩阵 
      <el-table :data="table1" border style="width: 98%">
        <el-table-column prop="name" label="本专业毕业要求"></el-table-column>
        <el-table-column prop="target" label="本专业培养目标">
          <el-table-column prop="t1" label="目标1"></el-table-column>
          <el-table-column prop="t2" label="目标2"></el-table-column>
          <el-table-column prop="t3" label="目标3"></el-table-column>
          <el-table-column prop="t4" label="目标4"></el-table-column>
          <el-table-column prop="t5" label="目标5"></el-table-column>
          <el-table-column prop="t6" label="..."></el-table-column>
        </el-table-column>
        
      </el-table>
      (2)课程体系对毕业要求的支撑关系矩阵
      <el-table :data="table2" border style="width: 98%">
        <el-table-column prop="name" label="要求、课程"></el-table-column>
        
          <el-table-column prop="t1" label="目标1"></el-table-column>
          <el-table-column prop="t2" label="目标2"></el-table-column>
          <el-table-column prop="t3" label="目标3"></el-table-column>
          <el-table-column prop="t4" label="目标4"></el-table-column>
          <el-table-column prop="t5" label="目标5"></el-table-column>
          <el-table-column prop="t6" label="..."></el-table-column>
       
        
      </el-table>
      (3)课程设置对知识要求支撑关系
      <el-table :data="table3" border style="width: 98%">
        <el-table-column prop="name" label="知识要求\课程名称">
          
        </el-table-column>
          <el-table-column prop="t1" label="如：人文社科"></el-table-column>
          <el-table-column prop="t2" label="体育知识"></el-table-column>
          <el-table-column prop="t3" label="专业基础知识"></el-table-column>
          <el-table-column prop="t4" label="专业知识"></el-table-column>
          <el-table-column prop="t5" label="创新实践知识"></el-table-column>
          <el-table-column prop="t6" label="..."></el-table-column>
        
      </el-table>
    </fieldset>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      disValue: false,
      table1:[
        {name:'毕业要求1',t1:'',t2:"√",t3:"√",t4:"",t5:"",t6:"",},
        {name:'毕业要求2',t1:'',t2:"√",t3:"√",t4:"",t5:"",t6:"",},
        {name:'毕业要求3',t1:'',t2:"",t3:"√",t4:"",t5:"",t6:"",},
        {name:'毕业要求4',t1:'',t2:"",t3:"",t4:"",t5:"√",t6:"",},
        {name:'毕业要求5',t1:'',t2:"",t3:"",t4:"√",t5:"",t6:"",},
        {name:'毕业要求6',t1:'√',t2:"",t3:"",t4:"",t5:"",t6:"",},
        {name:'....',t1:'',t2:"",t3:"",t4:"",t5:"",t6:"",},
      ],
       table2:[
        {name:'课程1',t1:'√',t2:"",t3:"",t4:"",t5:"",t6:"",},
        {name:'课程2',t1:'',t2:"√",t3:"",t4:"",t5:"√",t6:"",},
        {name:'课程3',t1:'',t2:"",t3:"√",t4:"",t5:"",t6:"",},
        {name:'课程4',t1:'',t2:"",t3:"",t4:"",t5:"",t6:"",},
        {name:'课程5',t1:'',t2:"√",t3:"",t4:"√",t5:"",t6:"",},
        {name:'课程6',t1:'√',t2:"",t3:"√",t4:"√",t5:"",t6:"",},
        {name:'....',t1:'',t2:"",t3:"",t4:"",t5:"",t6:"",},
      ],
       table3:[
        {name:'课程1',t1:'√',t2:"",t3:"",t4:"",t5:"√",t6:"",},
        {name:'课程2',t1:'',t2:"",t3:"√",t4:"√",t5:"",t6:"",},
        {name:'课程3',t1:'',t2:"",t3:"√",t4:"",t5:"",t6:"",},
        {name:'课程4',t1:'',t2:"√",t3:"",t4:"",t5:"",t6:"",},
        {name:'课程5',t1:'',t2:"",t3:"√",t4:"",t5:"",t6:"",},
        {name:'课程6',t1:'',t2:"",t3:"",t4:"√",t5:"√",t6:"",},
        {name:'....',t1:'',t2:"",t3:"",t4:"",t5:"",t6:"",},
      ]
    }
  },
  methods: {
    //   上传
    submitUpload() {
      this.$refs.upload.submit()
      setTimeout(this.fileCount, 100)
    },
    // 数量限制
    handleExceed(files, fileList) {
      console.log(files)
      console.log(fileList)

      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    // 点击文件时触发
    handlePreview(file) {
      console.log(file)
    },
    // 点击上传  的格式确定 限制文件的格式 限制文件的大小
    beforeAvatarUpload(file) {
      console.log(file)
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1)
      const extension = testmsg === "pdf"
      const isLt2M = file.size / 1024 / 1024 > 20 ? false : true //文件超过20MB
      if (!extension) {
        this.$message({
          message: "上传文件只能是pdf格式!",
          type: "warning"
        })
      }
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过20M",
          type: "warning"
        })
      }
      return extension && isLt2M
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      console.log("上传成功")
      console.log(res, file)
    },
    // 上传状态改变时
    onchange(file, filelist) {
      // console.log(file)
      // console.log(filelist)
      this.data = []
      filelist.forEach((element, index) => {
        this.data.push({
          name: element.name,
          status: element.status,
          time: new Date().toString(),
          uid: element.uid
        })
      })
      
    },
    // 按钮删除
    deluid(id) {
      console.log(id)
      this.data.forEach((element, index) => {
        if (element.uid == id) {
          this.data.splice(index, 1)
        }
      })
    },
    //
    remove(file, filelist) {
      console.log(file)
      console.log(filelist)
    },
    fileCount() {
      this.axios.post("/rcpy/fileServlet?operation=getZyPdfFiles").then(res => {
        console.log(res.data.list.length + "文件数量")
       
        res.data.list.length > 2
          ? (this.disValue = true)
          : (this.disValue = false)
        console.log(this.disValue)
      })
    }
  },
  created() {
    this.fileCount()
  }
}
</script>

<style>
</style>