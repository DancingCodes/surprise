import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import uView from '@/uni_modules/uview-ui'
import '@/utils/request/index.js'

Vue.config.productionTip = false
Vue.use(uView)

App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
