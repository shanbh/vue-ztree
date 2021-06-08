// 导入组件
import distZtree from './src/dist-ztree.vue'

// 为组件提供 install 安装方法，供按需引入
distZtree.install = function (Vue) {
    Vue.component(distZtree.name, distZtree)
}

// 默认导出组件
export default distZtree
