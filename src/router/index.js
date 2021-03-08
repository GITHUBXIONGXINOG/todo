import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/LoginView/LoginView'
import HomeView from '../views/HomeView/HomeView'
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
    component: HomeView
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
router.beforeEach((to,from,next)=>{
  if (to.path === '/login' || to.path === '/regist' ) {
   next() 
  } else {
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})
export default router
