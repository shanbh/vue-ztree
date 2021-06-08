// 导入组件
import distComboboxZtree from './src/dist-combobox-ztree'

// 为组件提供 install 安装方法，供按需引入
distComboboxZtree.install = function (Vue) {
    Vue.component(distComboboxZtree.name, distComboboxZtree)
}

// 默认导出组件
export default distComboboxZtree
