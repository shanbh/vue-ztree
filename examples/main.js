import Vue from 'vue'
import App from './App.vue'
import distZtree from '../packages/index'
import distComboboxZtree from '../packages/index'

// import distZtree from 'dist-ztree/packages'
// import distComboboxZtree from 'dist-ztree/packages'




Vue.use(distZtree)
Vue.use(distComboboxZtree)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
