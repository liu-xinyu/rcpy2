<template>
  <el-container class="home-container home">
    <!-- 头部区域 -->
    <el-header>
      <div class="font">人才培养方案</div>
      <!-- 头部右侧用户名部分 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          <span ref="userid"></span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span style="display:block;" @click="dialogPwdVisible=true">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item style="display:block">
            <span style="display:block;text-align:center" @click="loginAction()" type="info">退 出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <!-- 修改密码的对话框 -->
    <el-dialog title="修改密码" :visible.sync="dialogPwdVisible" width="40%" id="home" @close="changePasswordClosed()">
      <el-form :model="formPwd" ref="changePwdRef" :rules="changePwdRules">
        <el-form-item label="原密码" label-width="70px" prop="oldpwd">
          <el-input v-model="formPwd.oldpwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="70px" prop="newpwd">
          <el-input v-model="formPwd.newpwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确定新密码" label-width="100px" prop="confirmpwd">
          <el-input v-model="formPwd.confirmpwd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPwdVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePassword();">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px':'200px'">
        <!-- 侧边栏区域 -->
        <div class="collapse" @click="isCollapseF">|||</div>
        <el-menu
          background-color="#393d49"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="$route.path"
        >
          <el-menu-item :index="'/'+item.href" v-for="item in menuList" :key="item.mid">
            <!-- index接收字符串形式所以加个空字符串 转换成字符串 -->
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-container>
        <el-main :style="{height:scrollerHeight}">
          <!-- <el-main> -->
          <router-view :login="loginId"></router-view>
        </el-main>
        <el-footer style="height:30px">2020 七点工作室</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  data() {
    return {
      menuList: [],
      // 左侧的列表折叠
      isCollapse: false,
      loginId: null,
      // 修改密码的表单数据存储
      formPwd: {
        oldpwd: null,
        newpwd: null,
        confirmpwd: null
      },
      // 修改对话框的显示隐藏
      dialogPwdVisible: false,
      // 修改密码的校验规则
      changePwdRules: {
        oldpwd: [
          { required: true, message: "请输入原始密码", trigger: "blur" }
        ],
        newpwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, message: "长度至少是6个字符", trigger: "blur" }
        ],
        confirmpwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, message: "长度至少是6个字符", trigger: "blur" }
        ]
      }
    }
  },
  created() {
    this.getMenuList() //绑定左侧的菜单（获取数据）
  },
  mounted() {
    this.getUser() //为了加载用户名 （右上角）
  },
  computed: {
    // 控制main的高度
    scrollerHeight: function() {
      return document.body.clientHeight - 90 + "px"
    }
  },

  methods: {
    ...mapActions(['loginAction']),
   
    // 修改密码
    changePassword() {
      this.$refs.changePwdRef.validate(valid => {
        if (!valid) return
        console.log(valid)
        // console.log("修改密码")
        this.axios
          .post(
            "/rcpy/loginServlet?operation=changePassword",
            this.$qs.stringify(this.formPwd)
          )
          .then(res => {
            if (this.formPwd.newpwd !== this.formPwd.confirmpwd)
              return alert("两次密码输入不同 请重新输入")
            console.log(res)
            if (res.data !== 1)
              return alert("修改密码失败 确定原始密码输入正确")
            this.$message.success("修改密码成功")
            this.formPwd.oldpwd=this.formPwd.newpwd=this.formPwd.confirmpwd=null
            this.dialogPwdVisible = false
          })
      })
    },
    // 修改的对话框的关闭事件
    changePasswordClosed(){
      this.$refs.changePwdRef.resetFields()
    },
    //    获取左侧菜单
    async getMenuList() {
      var res = await this.axios.post("/rcpy/menuServlet?operation=forwardMenu")
      //console.log(data);//获取的左侧菜单数据
      this.menuList = res.data
    },
    // 右上角的用户名
    async getUser() {
      var { data } = await this.axios.get(
        "/rcpy/loginServlet?operation=userMessage"
      )
      console.log(data)
      this.loginId = data.uid
      this.$refs.userid.innerHTML = data.zwmc //赋值
      console.log("等级为 " + this.loginId)
    },
    // 左侧的折叠栏
    isCollapseF() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
  overflow-x: hidden;
}
.el-header {
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  border-bottom: 3px #009688 solid;
}

.el-aside {
  background-color: #393d49;
}
.el-main {
  background-color: white;
  padding: 10px;
}
.iconfont {
  margin-right: 10px;
}
.el-menu {
  border-right: solid 0px #e6e6e6;
}
.el-menu-item {
  height: 42px;
  line-height: 42px;
}
.collapse {
  background-color: #009688;
  height: 30px;
  text-align: center;
  line-height: 30px;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-footer {
  background-color: rgb(226, 226, 226);
  display: block;
  line-height: 30px;
  text-align: center;
  z-index: 1;
}

</style>