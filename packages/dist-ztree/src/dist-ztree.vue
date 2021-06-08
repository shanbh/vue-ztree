<template>
    <div>
        <input type="text"
               :id="ref"
               class="form-control"
               autocomplete="off"
               placeholder="请输入搜索条件"
               v-if="searchShow"/>
        <ul :id="id" class="ztree"></ul>
        <ul :id="searchTreeId" class="ztree" style="display: none"></ul>
    </div>
</template>

<script>
    if (!window.jQuery) {
        window.jQuery = $;
    }
    import * as $ from "jquery/dist/jquery";
    require("../../lib/js/jquery.ztree.all");
    import '../../lib/css/zTreeStyle/zTreeStyle.css'
    export default {
        name: "dist-ztree",
        props: {
            setting: {
                type: Object,
                default: () => {}
            },
            treeData: {
                type: Array,
                default: () => []
            },
            treeId: [String, Number],
            searchShow: {
                type: Boolean,
                default: () => false
            },
            searchKey: {
                type: String,
                default: () => ''
            },
            checkedNodes: {
                type: Array,
                default: () => []
            }
        },
        model: {
            prop: 'checkedNodes',
            event: 'setCheckedNodesValue'
        },
        data() {
            return {
                id: '',
                ref: `inputSearch${Math.round(Math.random()*10000)}`,
                searchTreeId: `searchTree-${Math.round(Math.random()*10000)}`,
                zTreeObj: null,
                ztreeSetting: {
                    view: {
                        showIcon: false         // default to hide icon
                    },
                    callback: { }
                },
                zTreeData: [],
                sourceTreeData: [],

            }
        },
        components: {},
        created() {
        },
        mounted() {
            if (this.treeId) {
                this.id = this.treeId
            }else {
                this.id = `zTree${Math.round(Math.random()*100000)}`
            }
        },
        computed: {},
        methods: {
            init () {
                if(this.zTreeObj){
                    this.zTreeObj.destroy();
                }
                //如果设置显示搜索框,初始化搜索框绑定响应事件
                if (this.searchShow) {
                    const el = $(`#${this.ref}`)
                    el.bind('propertyChange', this.searchNode).bind('input', this.searchNode)
                }

                //如果check是开启状态,检查onClick和onCheck方法有没有设置,没有设置的话,采用默认设置
                if (this.setting.check && this.setting.check.enable) {
                    if (!this.setting.callback) {
                        this.setting.callback = {};
                    }

                    if (typeof(this.setting.callback.onClick) !== 'function') {
                        this.setting.callback.onClick = this.onClick;
                    }

                    if (typeof(this.setting.callback.onCheck) !== 'function') {
                        this.setting.callback.onCheck = this.onCheck;
                    }
                }

                this.$nextTick(() => {
                    this.zTreeObj = $.fn.zTree.init($(`#${this.id}`), Object.assign({}, this.ztreeSetting, this.setting), this.zTreeData);
                    this.$emit('onCreated', this.zTreeObj)
                })
            },
            searchNode (e) {
                const value = $.trim(e.target.value)
                const keyType = this.searchKey
                if (value == '') {
                    setTimeout(() => {
                        $(`#${this.searchTreeId}`).css('display','none')
                        $(`#${this.id}`).css('display','block')
                    })
                    return
                }
                const nodes = this.zTreeObj.getNodesByFilter((node) => {
                    const parentNode = this.zTreeObj.getNodeByTId(node.parentTId)
                    if (parentNode) {
                        return parentNode[keyType].indexOf(value) === -1 && node[keyType].indexOf(value) !== -1
                    } else {
                        return node[keyType].indexOf(value) !== -1
                    }
                })
                $.fn.zTree.init($(`#${this.searchTreeId}`), Object.assign({}, this.ztreeSetting, this.setting), nodes)
                $(`#${this.searchTreeId}`).css('display', 'block')
                $(`#${this.id}`).css('display', 'none')
            },
            onClick (e, treeId, treeNode) {
                let checked = treeNode.checked
                this.zTreeObj.checkNode(treeNode, !checked, true)
                this.onCheck(e, treeId, treeNode)


            },
            onCheck (e, treeId, treeNode) {
                if (this.setting.check.chkStyle === 'radio') {
                    this.$emit('setCheckedNodesValue', [treeNode])
                }else {
                    let nodes = this.zTreeObj.getCheckedNodes(true),
                        selectedNodes = []
                    selectedNodes = nodes.filter( item => !item.isParent)
                    this.$emit('setCheckedNodesValue', selectedNodes)
                }
            }
        },
        watch: {
            treeData (val) {
                debugger
                this.zTreeData = val
                this.init()
            }
        }
    }
</script>

<style  >
/*@import "~@ztree/ztree_v3/css/zTreeStyle/zTreeStyle.css";*/
/*.ztree li ul.line{ background:url(../../img/line_conn.gif) 0 0 repeat-y;}*/
/*.ztree li span.button{background-image:url("../../img/zTreeStandard.png"); *background-image:url("../../img/zTreeStandard.gif")}*/
/*.ztree li span.button.ico_loading{background:url(../../img/loading.gif) no-repeat scroll 0 0 transparent;}*/
/*span.tmpzTreeMove_arrow{background-image:url("../../img/zTreeStandard.png"); *background-image:url("../../img/zTreeStandard.gif")}*/
    input{
        box-sizing: border-box;
        margin: 0;
        font-variant: tabular-nums;
        list-style: none;
        font-feature-settings: "tnum";
        position: relative;
        display: inline-block;
        width: 100%;
        height: 32px;
        padding: 4px 11px;
        color: rgba(0,0,0,.65);
        font-size: 14px;
        line-height: 1.5;
        background-color: #fff;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        transition: all .3s;
    }
.ztree li a.curSelectedNode{
    background-color: white;
    border: none;
    opacity: 1;
    padding-top: 1px;
}

</style>
