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
            <span>修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span type="info" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
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
export default {
  data() {
    return {
      menuList: [],
      // 左侧的列表折叠
      isCollapse: false,
      loginId: null
    }
  },
  created() {
    this.getMenuList() //绑定左侧的菜单（获取数据）
  },
  mounted() {
    this.getUser() //为了加载用户名 （右上角）
    console.log(document.body.clientWidth)
  },
  computed: {
    // 控制main的高度
    scrollerHeight: function() {
      return document.body.clientHeight - 90 + "px"
    }
    // ,
    // scrollerWidth: function() {
    //   console.log(document.body.clientWidth)
    //   return document.body.clientWidth - 200 + "px"
    // }
  },

  methods: {
    //    退出按钮
    logout() {
      this.$router.push("/login")
    },
    //    获取左侧菜单
    async getMenuList() {
      var res = await this.axios.post(
        "/rcpy/myController?operation=forwardMenu"
      )
      //console.log(data);//获取的左侧菜单数据
      this.menuList = res.data
    },
    //    用户名
    async getUser() {
      var { data } = await this.axios.get("/rcpy/myController?operation=toUser")
      console.log(data)
      this.loginId = data.uid
      this.$refs.userid.innerHTML = data.zwmc //赋值
      console.log(this.loginId)
    },
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
  /* height: 559px; */
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
  background-color:rgb(226, 226, 226);
  display: block;
  /* position: absolute; */
  line-height: 30px;
 text-align: center;
 z-index: 1;
}
</style>