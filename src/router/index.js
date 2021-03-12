import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/LoginView/LoginView'
import HomeView from '../views/HomeView/HomeView'
import store from '../store/index'
import reqLoginStatus from '../utils/api/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/home'
  },
  {
    path: '/home',
    name: "Home",
    component: HomeView,
    children: [
      {
        path: '/',
        redirect: 'mytasks'
      },
      {
        path: 'tasks',
        name: 'Tasks',
        component: () => import('../views/Tasks/Tasks.vue')
      },
      {
        path: 'myday',
        name: 'Myday',
        component: () => import('../views/Myday/Myday.vue')
      },
      {
        path: 'important',
        name: 'Important',
        component: () => import('../views/Important/Important.vue')
      },
      {
        path: 'mytasks',
        name: 'MyTasks',
        component: () => import('../views/Tasks/MyTasks.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/regist',
    name: 'Regist',
    component: () => import('../views/RegistView/RegistView')
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // console.log('路由守卫');
  store.dispatch('getLoginStatus')
  // console.log(store.state.loginStatus);
  let userInfo = JSON.parse(localStorage.getItem('userInfo'))
  console.log(userInfo);
  //如果查询到登录状态
  if (userInfo && userInfo.loginStatus) {
     //dispath 调用action的异步方法,存储用户信息
    store.dispatch('recordUser',userInfo)
    if (to.path === '/login' || to.path === '/regist') {
      next('/home')
    }  else{
      next()
    }
  } else {
      if (to.path === '/login' || to.path === '/regist') {
        next()
      } else if((to.path === '/home/mytasks')){
        if(from.path==='/login'){
          next()
        }else{
        next('/login')
        }
      } else {
        next('/login')
      }
  }


  // console.log('loginStatus',store.state.loginStatus);
})

// router.beforeEach((to, from, next) => {
//   console.log(document.cookie);
//   //如果cookie存在
//   if (document.cookie) {
//   // if (document.cookie) {
//     if (to.path === '/login' || to.path === '/regist') {
//       next('/home')
//     }
//     next()
//   } else {//cookie不存在
//     if (to.path === '/login' || to.path === '/regist') {
//       next()
//     } else {
//       next('/login')
//     }
//   }

// })

// router.beforeEach((to, from, next) => {

// })

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
