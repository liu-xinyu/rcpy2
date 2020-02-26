<template>
  <div id="app" @click="clicked">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: "app",
  data() {
    return {
      lTime: new Date().getTime(), // 最后一次点击的时间
      cTime: new Date().getTime(), //当前时间
      tOut: 30 * 60 * 1000 ,
      //30分钟30 * 60 * 1000 一秒钟 1000
    }
  },
  mounted() {
    window.setInterval(this.tTime, 60000)
  },
  methods: {
    clicked() {
      this.lTime = new Date().getTime() //当界面被点击更新点击时间
    },
    tTime() {
      this.cTime = new Date().getTime()
      if (Math.abs(this.cTime - this.lTime) > this.tOut) {
        if (sessionStorage.getItem("id") !== "1") {
          // 未登录状态
          this.lTime = new Date().getTime()
        } else {
          this.loginAction()
          this.$alert("登录超时，请重新登录", "提示", {
            confirmButtonText: "确定"
          })
        }
      }
    },
    // 退出登录点击事件
    ...mapActions(["loginAction"])
  }
}
</script>


<style>
html,
body,
#app {
  height: 100%;
  padding: 0;
  margin: 0;
  /* background: url(./assets/11.jpg) */
}
</style>
