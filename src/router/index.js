import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/LoginView/LoginView'
import HomeView from '../views/HomeView/HomeView'
import store from '../store/index'
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
        redirect: 'myday'
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
/* router.beforeEach((to,from,next)=>{

  if (to.path === '/login' || to.path === '/regist' ) {
   next() 
  } else {
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
}) */

// router.beforeEach((to, from, next) => {
//   //如果cookie存在
//   if (store.state.userInfo.length&&document.cookie) {
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


export default router
