import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import filter from './filter'
import './directive'
//import SysDictSelect from '@components/SysDictSelect.vue'
//import SysDictRadioGroup from '@components/SysDictRadioGroup.vue'
import {
  Col, Button,
  Form, FormItem, Input, InputNumber, Select, Option, DatePicker, RadioGroup, Radio, Checkbox, CheckboxGroup, CheckboxButton, Upload,
  Table, TableColumn, Pagination, Tag, Tree,
  Menu, MenuItem, Submenu, Tabs, TabPane,
  Dialog, Scrollbar, Backtop,
  Loading, Message, MessageBox, Notification
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@css/bootstrap.nonAdaptive.min.css'
import '@css/font-awesome.min.css'
import '@css/bootstrap-extend.css'

Vue.config.productionTip = false

//Vue.component('sys-dict-select', SysDictSelect)
//Vue.component('sys-dict-radio-group', SysDictRadioGroup)

// Basic
Vue.use(Col)
Vue.use(Button)
// Form
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(CheckboxButton)
Vue.use(Upload)
// Data
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Tag)
Vue.use(Tree)
// Navigation
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Tabs)
Vue.use(TabPane)
// Others
Vue.use(Dialog)
Vue.use(Scrollbar)
Vue.use(Backtop)


// 全局注册对象，使用this.$x调用
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification

// 全局设置过滤器
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
