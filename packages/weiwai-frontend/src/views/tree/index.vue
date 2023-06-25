<template>
    <div>
            <Tree :treeList="treeList" :hasParent="hasParent" :checkedKeys="checkedKeys" :resetScroll="resetScroll"
            :expandedKeys="expandedKeys" :showCheck="showCheck" @treeChange="checkTreeNode" />

       
            <Upload @input="receiveList" :filelist="filelist" :fileSize="80" :fileLimit="2" listType="text"
            :fileType="['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt']" />
        </div>
</template>
<script>
import Tree from "@/components/Tree/index.vue";
import Upload from "@/components/Upload/index.vue";
export default {
    name: "TreeDemo",
    data: () => {
        return {
            treeList: [
                {
                    id: 1,
                    label: "东南",
                    children: [
                        {
                            id: 2,
                            label: "上海",
                            children: [
                                { id: 3, label: "普陀" },
                                { id: 4, label: "黄埔" },
                                { id: 5, label: "徐汇" },
                            ],
                        },
                        {
                            id: 7,
                            label: "江苏",
                            children: [
                                { id: 8, label: "南京" },
                                { id: 9, label: "苏州" },
                                { id: 10, label: "无锡" },
                            ],
                        },
                        {
                            id: 12,
                            label: "浙江",
                            children: [
                                { id: 13, label: "杭州" },
                                { id: 14, label: "宁波" },
                                { id: 15, label: "嘉兴" },
                            ],
                        },
                    ],
                },
                {
                    id: 17,
                    label: "西北",
                    children: [
                        {
                            id: 18,
                            label: "陕西",
                            children: [
                                { id: 19, label: "西安" },
                                { id: 20, label: "延安" },
                            ],
                        },
                        {
                            id: 21,
                            label: "新疆维吾尔族自治区",
                            children: [
                                { id: 22, label: "乌鲁木齐" },
                                { id: 23, label: "克拉玛依" },
                            ],
                        },
                    ],
                },
            ],
            filelist: [],
            hasParent: false,
            checkedKeys: [],
            expandedKeys: [],
            resetScroll: false,
            showCheck: true,
        };
    },
    components: { Tree, Upload },
    methods: {
        receiveList(data) {
            console.log(data)
        },
        checkTreeNode(data) {
            console.log(data)
        }
    }
};
</script>
<style lang="less">
html,
body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
}
</style>
  