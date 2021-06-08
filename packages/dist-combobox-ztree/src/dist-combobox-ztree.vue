<template>
    <div>
        <slot></slot>
        <div class="combobox-ztree" v-show="zTreeVisible" @click.stop>
            <div class="combobox-ztree-body">
                <dist-ztree
                        :setting="setting"
                        :search-show="true"
                        :search-key="'NAME'"
                        v-model="selectedNodes"
                        :tree-id="treeId"
                        :tree-data="treeData"></dist-ztree>
<!--                <div class="combobox-ztree-control">-->
<!--                    <button>确定</button>-->
<!--                    <button>清空</button>-->
<!--                </div>-->

            </div>
        </div>

    </div>

</template>

<script>
    import * as $ from "jquery/dist/jquery";
    if (!window.jQuery) {
        window.jQuery = $;
    }
    import distZtree from '../../dist-ztree'
    export default {
        name: "dist-combobox-ztree",
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
            checkedNodes1: {
                type: Array,
                default: () => []
            }
        },
        model: {
            prop: 'checkedNodes1',
            event: 'setComboboxTreeValue'
        },
        data() {
            return {
                selectedNodes: [],
                zTreeVisible: false
            }
        },
        components: {
            distZtree
        },
        created() {
        },
        mounted() {
            document.body.addEventListener('click',this.bodyClick,false)

        },
        computed: {},
        methods: {
            treeShow(data) {
                if (data.treeId === this.treeId) {
                    this.zTreeVisible = !this.zTreeVisible
                    if (!this.zTreeVisible) return
                    this.setScroll()
                }else {
                    this.zTreeVisible = false
                }
            },
            setScroll () {
                const el = document.getElementById(this.treeId)
                const elParent = el.parentElement.parentElement.parentElement.parentElement
                const H = document.documentElement.clientHeight
                const elTopH = this.getTop(elParent);//class=dist-combobox-ztree-component元素至顶部的高度
                const elParentH = elParent.clientHeight;//class=dist-combobox-ztree-component元素的高度
                const elBrowserTopH = H-elParentH-elTopH;//ztree的可视高度
                const elParentW = elParent.clientWidth;//class=dist-combobox-ztree-component元素的宽度
                const treeRootEl = el.parentElement.parentElement
                treeRootEl.style.maxHeight=elBrowserTopH + 'px '
                treeRootEl.style.width = elParentW +'px'
                treeRootEl.style.position= 'fixed'
                // treeRootEl.style.overflowY = 'auto'

                let ztreeH = elBrowserTopH
                if (this.autoHide) {
                    ztreeH -= 45
                }
                if(this.searchShow){
                    ztreeH -= 35
                }
                el.style.maxHeight = ztreeH + 'px'
            },
            getTop (e) {
                let offset=e.offsetTop;
                if(e.offsetParent!=null) offset+= this.getTop(e.offsetParent);
                return offset;
            },
            bodyClick () {
                setTimeout( () => {
                    this.zTreeVisible = false;
                });
            }
        },
        watch: {
            selectedNodes () {
                this.$emit('setComboboxTreeValue', this.selectedNodes)
            }
        },
        beforeDestroy() {
            document.body.removeEventListener('click',this.bodyClick)
        }
    }
</script>

<style scoped >
    .combobox-ztree{
        position: relative;

    }
    .combobox-ztree >>> .combobox-ztree-body{
        position: absolute;
        background-color: #fff;
        z-index: 1000;
        width: 100%;

    }
    .combobox-ztree >>> .ztree {
        border-style:solid;
        border-color: rgba(0, 0, 0, .1);
        border-width: 0 1px 1px 1px;
        overflow: auto;
    }

</style>
