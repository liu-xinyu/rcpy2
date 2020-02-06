import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login.vue'
import home from '@/components/home'
import welcome from '@/components/welcome'
import user from '@/components/common/user'
import base from '@/components/common/base'
import addDepartment from '@/components/common/addDepartment'
import files from '@/components/common/files'
import files3 from '@/components/common/files3'
import files2 from '@/components/common/files2'
import first1 from '@/components/common/first1'
import kcxz from '@/components/common/kcxz'
import newsList from '@/components/common/newsList'
import newsList2 from '@/components/common/newsList2'
import plan from '@/components/common/plan'
import role from '@/components/common/role'
import showzgtoadmin from '@/components/common/showzgtoadmin'
import showzgtoyx from '@/components/common/showzgtoyx'
import uploadfiles from '@/components/common/uploadfiles'
import departmentUser from '@/components/common/departmentUser'
import zyzg  from '@/components/common/zyzg'


Vue.use(Router)

const router= new Router({
  routes: [
    {path:'/',redirect:'/login '},
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path:'/home',
      component:home,
      redirect:'welcome',
      children:[
        { 
        path:'/welcome',
        component:welcome
        },
        {
          path:'/user',
          component:user
        },
        {
          path:'/base',
          component:base
        },
        {
          path:'/addDepartment',
          component:addDepartment 
        },
        {
          path:'/files2',
          component:files2 
        },
        {
          path:'/files3',
          component:files3  
        },
        {
          path:'/first1',
          component:first1 
        },
        {
          path:'/kcxz',
          component:kcxz  
        },
        {
          path:'/newsList',
          component:newsList  
        },
        {
          path:'/newsList2',
          component:newsList2 
        },
        {
          path:'/plan',
          component:plan 
        },
        {
          path:'/role',
          component:role  
        },
        {
          path:'/showzgtoadmin',
          component:showzgtoadmin  
        },
        {
          path:'/showzgtoyx',
          component:showzgtoyx   
        },
        {
          path:'/uploadfiles',
          component:uploadfiles   
        },
        {
          path:'/departmentUser',
          component:departmentUser   
        },
        {
          path:'/zyzg',
          component:zyzg    
        },
        {
          path:'/files',
          component:files    
        }
      ]
    }
  ]
})

// router.beforeEach((to,from,next)=>{
//   if(to.path==='/login') return next()

//   const tokenStr=window.sessionStorage.getItem('token')
//   console.log(tokenStr)
//   if(!tokenStr) return next('/login')
//   next()
// })
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next();
//   } else {
//     let token = localStorage.getItem('Authorization');
//     console.log(token)
//     if (token === 'null' || token === '') {
//       next('/login');
//     } else {
//       next();
//     }
//   }
// });

export default router
