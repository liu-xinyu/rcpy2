<template name="component-name">
  <div>
    <fieldset class="tableBox" style="border:1px #e2e2e2 solid">
      <legend>角色管理</legend>
      <el-table
        :data="tableRoleData"
        border
        style="width: 100%"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      >
        <el-table-column prop="name" label="角色"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 操作按钮 -->
            <el-button
              type="primary"
              @click="kai();saveRid(scope.row.rid,scope.row.name);showright()"
            >角色及权限分配</el-button>
          </template>
        </el-table-column>
      </el-table>
    </fieldset>

    <!--弹出来的要修改的权限信息  -->
    <el-dialog title="修改角色" :visible.sync="dialogVisible" width="40%" @open="dialogOpen()" @closed="dialogClose">
      <!-- 切换按钮 --><span class="rightsText">权限:</span>
      <div class="checkList" >
        <el-checkbox v-model="list[1]" label="方案首页" border></el-checkbox>
        <el-checkbox v-model="list[4]" label="计划安排表" border></el-checkbox>
        <el-checkbox v-model="list[5]" label="人才培养方案矩阵图" border></el-checkbox>
        <el-checkbox v-model="list[6]" label="专业矩阵" border></el-checkbox>
        <el-checkbox v-model="list[7]" label="院系矩阵文件" border></el-checkbox>
        <el-checkbox v-model="list[8]" label="矩阵文件" border></el-checkbox>
        <el-checkbox v-model="list[9]" label="专业列表" border></el-checkbox>
        <el-checkbox v-model="list[10]" label="角色管理" border></el-checkbox>
        <el-checkbox v-model="list[11]" label="院系文章" border></el-checkbox>
        <el-checkbox v-model="list[12]" label="基础数据" border></el-checkbox>
        <el-checkbox v-model="list[13]" label="专业用户管理" border></el-checkbox>
        <el-checkbox v-model="list[14]" label="院系用户管理" border></el-checkbox>
        <el-checkbox v-model="list[15]" label="添加院系" border></el-checkbox>
        <el-checkbox v-model="list[16]" label="职业资格填报" border></el-checkbox>
        <el-checkbox v-model="list[17]" label="职业资格列表" border></el-checkbox>
        <el-checkbox v-model="list[18]" label="职业资格报表" border></el-checkbox>
        <el-checkbox v-model="list[19]" label="课程性质" border></el-checkbox>


      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="guan();UpdateRole()">保存更改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableRoleData: [],
      rid:0,
      name:name,
      dialogVisible: false,
      list2:[],
      // 显示权限按钮的开关
      list: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    }
  },
  methods: {
    // 点保存更改按钮   关闭对话框
    guan(){
         this.dialogVisible = false;
        this.list.forEach((element,i)=>{
            this.list[i]=false;
        })
    },
    kai(){
        setTimeout(()=>{
            this.dialogVisible = true;
        },500)
        
    },
    //   角色列表获取函数
    async getRolelist() {
      const res = await this.axios.get(
        "rcpy/myController?operation=listAllRole"
      )
     //  console.log(res) //{data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
      if (res.status !== 200) {
        return this.$message.error("角色获取失败")
      }
      this.tableRoleData = res.data.list //绑定数据 渲染列表
    },
    // 弹出框的要求
    async saveRid(id,name) {
      this.rid=id;
      this.name=name;
      console.log(id,name)
      const res = await this.axios.post(
        "rcpy/myController?operation=saveRid",
        this.$qs.stringify({
          rid: id
        })
      )
      console.log(res)
      if (res.status !== 200) {
        return this.$message.error("点击按钮 角色获取失败")
      }
    },
    // 弹出框后的数据请求 知道哪些应该被选中
    async showright() {
      const res = await this.axios.get(
        "rcpy/myController?operation=preRoleMessage"
      )
      console.log(res);
      this.list2=res.data;
      res.data.forEach((element,index) => {
          this.list[element]=true;
          //console.log(element);
        //   console.log(this.list)
      });
    },
    // 打开对话框 发生的事件
    dialogOpen(){
      console.log('打开了')
    },
    // 关闭对话框发生的事件 让对话框关闭 并让list中每个值都为false
    dialogClose(){
      console.log("关闭了");
      this.dialogVisible = false;
        this.list.forEach((element,i)=>{
            this.list[i]=false;
        })
    },
    // 点击 保存更改 保存数据
    UpdateRole(){
      console.log(this.rid); 
      console.log(this.list);
      console.log(this.list2);

      this.list.forEach((element,index)=>{
        console.log(element,index)
        if(element==true){
          this.list2.push(index);
          console.log(index)
        }
      })        
      this.axios.post('rcpy/myController?operation=toUpdateRole',this.$qs.stringify({
        value:this.list2,
        name:this.name,
        rid:this.rid
      })).then(data=>{
        console.log(data);
        console.log(this.list2,this.name,this.rid)
      })
    }
  },
  created() {
    this.getRolelist()
  }
}
</script>

<style>
.el-dialog__body {
    padding: 5px 20px;
    color: black;
}
.checkList{
    /* background-color: yellow; */
    padding-left: 10%;
}
.rightsText{
    /* background-color: red; */
    font-weight: bold;

    font-size: 16px;
}
.el-checkbox.is-bordered+.el-checkbox.is-bordered {
    margin-bottom: 10px;
    margin-left: 0px;
}
</style>