<template>
  <div class="zTree-demo">
<!--    <div>-->
<!--      <span>dist-ztree</span>-->
<!--      <dist-ztree-->
<!--              :setting="setting"-->
<!--              :search-show="true"-->
<!--              :search-key="'NAME'"-->
<!--              v-model="selectedNodes"-->
<!--              :tree-id="treeId"-->
<!--              :tree-data="data"></dist-ztree>-->
<!--    </div>-->
    <div style="margin-left: 50px">
      <span>dist-combobox-ztree</span>
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
    </div>
  </div>
</template>

<script>
  const treeData = require('../mock/list.json')

  export default {
    name: 'HelloWorld',
    data () {
      return {
        setting: {
          check: {
            enable: false,
            chkboxType: { 'y' : 'ps', 'N' : 'ps' }
          },
          data: {
            key: {
              name: 'name'
            },
            simpleData: {
              enable: true
            }
          },
          callback: {
          }
        },
        setting1: {
          check: {
              enable: true,
              chkStyle: "radio",
              radioType: "all"
          },
          data: {
            key: {
              name: 'fullName'
            },
            simpleData: {
              enable: false
            }
          },
          callback: {
          }
        },
        treeId: Math.round(Math.random() * 1000),
        comboboxZtreeId: Math.round(Math.random() * 1000),
        data:[],
        selectedNodes: [],
        selectedNodesShow: '',
        selectedNodes1: []
      }
    },
    mounted() {
      const treeData1 = treeData.result
      this.formatTreeData(treeData1)
      setTimeout(() => {
        this.data = treeData1
      },1000)

    },
    methods: {
      inputFocus (e) {
        const params = {
          treeId: this.comboboxZtreeId
        }
        this.$refs['comboboxZtree'].treeShow(params)
        e.stopPropagation();
      },
      formatTreeData(data) {
        data.forEach(item => {
          item.iconSkin = 'icon-folder'
          if (item.children) {
            item.open = true
            this.formatTreeData(item.children)
          }
        })
      }
    },
    watch: {
      selectedNodes (val) {
        console.log(val)
      },
      selectedNodes1 (val) {
        console.log(val)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .zTree-demo{
    display: flex;
    text-align: center;
  }
</style>
