import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import uView from '@/uni_modules/uview-ui'
import '@/utils/request/index.js'
App.mpType = 'app'
Vue.config.productionTip = false
Vue.use(uView)

const app = new Vue({
  ...App
})
app.$mount()
