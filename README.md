# dist-ztree

基于ztree的二次封装，其中包括dist-ztree与dist-combobox-ztree两个组件

# Install

```
yarn add dist-ztree  or  npm install dist-ztree
```

# Introduction of zTree (简介)

dist-ztree:

```
<dist-ztree
              :setting="setting"
              :search-show="true"
              :search-key="'NAME'"
              v-model="selectedNodes"
              :tree-id="treeId"
              :tree-data="data"></dist-ztree>
    </div>
```

dist-combobox-ztree

```
<dist-combobox-ztree
              ref="comboboxZtree"
              :setting="setting1"
              :search-show="true"
              :search-key="'NAME'"
              v-model="selectedNodes1"
              :tree-id="comboboxZtreeId"
              :tree-data="data">

        <input v-model="selectedNodesShow" placeholder="请选择" readonly @click.stop="inputFocus($event)">

      </dist-combobox-ztree>
```

See [Configuration Reference](https://cli.vuejs.org/config/).
