import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.scss'//清除默认样式
import ElementUI from 'element-ui'//导入element框架
import 'element-ui/lib/theme-chalk/index.css'//导入element样式
import './assets/iconfont/iconfont'//导入iconfont
Vue.use(ElementUI)//使用element
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
