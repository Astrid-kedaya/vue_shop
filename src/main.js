import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式
import "./assets/css/global.css";
import TreeTable from 'vue-table-with-tree-grid'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

// 加载进度条的包
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


import axios from 'axios'
import { start } from 'nprogress'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
// 在 request 拦截器中展示进度条
axios.interceptors.request.use(config => {
  // 展示进度条
  NProgress.start()
  // 除了登录页面，其他都需token，这个操作实现每次请求前,自动加token
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // console.log(config);
  // 必须return
  return config
})

// 在 response 拦截器中隐藏进度条
axios.interceptors.response.use(config => {
  // 隐藏进度条
  NProgress.done()
  return config
})

// 挂载axios
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)
// 将富文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor)

// 日期格式化
Vue.filter('dateFormat', function (originVal) {
  // 获取的时间戳是秒为单位，转化时是毫秒，所以*1000
  const dt = new Date(originVal * 1000)
  const y = dt.getFullYear()
  // 先变成字符串，然后padstart，不足2位用0填充
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + 1 + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
