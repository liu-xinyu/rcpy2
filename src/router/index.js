import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login.vue'  //登录组件
import home from '@/components/home'  //
import welcome from '@/components/welcome'
import user from '@/components/common/user'
import base from '@/components/common/base'
import addDepartment from '@/components/common/addDepartment'
import files from '@/components/common/files'
import files3 from '@/components/common/files3'
import files2 from '@/components/common/files2'
import projectHomePage from '@/components/common/projectHomePage'  //方案首页
import kcxz from '@/components/common/kcxz' //课程性质
import newsList from '@/components/common/newsList'
import zyList from '@/components/common/zyList'
import plan from '@/components/common/plan'
import role from '@/components/common/role'  //角色管理
import showzgtoadmin from '@/components/common/showzgtoadmin'
import showzgtoyx from '@/components/common/showzgtoyx'
import uploadfiles from '@/components/common/uploadfiles'
import departmentUser from '@/components/common/departmentUser'
import zyzg from '@/components/common/zyzg'
import Error from '@/components/common/Error'



Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: { name: "login" } },
    {
      path: '/login',
      name: "login",
      component: login
    },
    {
      path: '*',
      component: Error
    },
    {
      path: '/home',
      component: home,
      redirect: 'welcome',
      children: [

        {
          path: '/welcome',
          component: welcome
        },
        {
          path: '/user',
          component: user
        },
        {
          path: '/base',
          component: base
        },
        {
          path: '/addDepartment',
          component: addDepartment
        },
        {
          path: '/files2',
          component: files2
        },
        {
          path: '/files3',
          component: files3
        },
        {
          path: '/projectHomePage',
          component: projectHomePage
        },
        {
          path: '/kcxz',
          component: kcxz
        },
        {
          path: '/newsList',
          component: newsList
        },
        {
          path: '/zyList',
          component: zyList
        },
        {
          path: '/plan',
          component: plan
        },
        {
          path: '/role',
          component: role
        },
        {
          path: '/showzgtoadmin',
          component: showzgtoadmin
        },
        {
          path: '/showzgtoyx',
          component: showzgtoyx
        },
        {
          path: '/uploadfiles',
          component: uploadfiles
        },
        {
          path: '/departmentUser',
          component: departmentUser
        },
        {
          path: '/zyzg',
          component: zyzg
        },
        {
          path: '/files',
          component: files
        }
      ]
    }
  ]
})
router.beforeEach((to,from,next)=>{
  // console.log(to);
  // console.log(from);
  if(to.path!=='/login'){
    // console.log("我要去"+to.path);
    sessionStorage.getItem('id')=="1"?next():router.push({name: 'login'}) 
  }
  next()
})

export default router
