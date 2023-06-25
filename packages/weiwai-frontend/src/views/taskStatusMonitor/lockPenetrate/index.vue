<!-- 穿透数据锁定 -->
<template>
    <div class="myContainer">
        <div class="left">
            <el-select v-model="lockPenetrate.selectVal" size="small" placeholder="请选择">
                <el-option v-for="item in lockPenetrate.options" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
            </el-select>
            <Tree :treeList="lockPenetrate.treeList" :hasParent="lockPenetrate.hasParent"
                :checkedKeys="lockPenetrate.checkedKeys" :resetScroll="lockPenetrate.resetScroll"
                :expandedKeys="lockPenetrate.expandedKeys" :defaultProps="lockPenetrate.defaultProps" filterName="name"
                :showCheck="lockPenetrate.showCheck" @treeChange="lockPenetrate.checkTreeNode" />
        </div>
        <div class="right">
            <div class="form">
                <div style="background: #fff;">
                    <BaseForm :form-data="lockPenetrate.formData" :set-options="lockPenetrate.setOptions"
                        @inquire="lockPenetrate.inquire" />
                </div>
            </div>
            <BaseTable ref="baseTable" :tableData="lockPenetrate.tableData" :serialShow="true" selection="multiple"
                :tableColumn="lockPenetrate.tableColumn" :border="true" :pagination="true"
                :pageInfo="lockPenetrate.pageInfo" :total="lockPenetrate.pageInfo.total"
                :loadingShow="lockPenetrate.loadingShow" @sizeChange="lockPenetrate.sizeChange"
                @pageChange="lockPenetrate.pageChange">
                <template slot="multiple-operation" slot-scope="{ selectionData }">
                    <el-button @click="() => lockPenetrate.lock(0, selectionData)">锁定</el-button>
                    <el-button @click="() => lockPenetrate.lock(1, selectionData)">解锁</el-button>
                </template>
                <template slot="statusShow" slot-scope="{row}">
                    <div v-if="row.lockState == 0">
                        <span class="circle danger-circle"></span>
                        <span class="danger-circle-text">锁定</span>
                    </div>
                    <div v-else>
                        <span class="circle success-circle"></span>
                        <span class="success-circle-text">未锁定</span>
                    </div>
                </template>
            </BaseTable>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Tree from "@/components/Tree/index.vue";
import BaseForm from "@/components/BaseForm/index.vue";
import BaseTable from "@/components/BaseTable/BaseTable.vue";
import BaseDropdown from "@/components/BaseDropdown/BaseDropdown.vue";
import { lockPenetrateStore } from "@model/store/modules/dataView/lockPenetrate";
export default Vue.extend({
    name: "lockPenetrate",
    components: { Tree, BaseTable, BaseDropdown, BaseForm },
    computed: {
        lockPenetrate() {
            const lockPenetrate = lockPenetrateStore();
            return lockPenetrate
        },
    },
    async created() {
        this.lockPenetrate.init()
        this.lockPenetrate.formData = await this.lockPenetrate.initForm(this.lockPenetrate.formData)
    },
    data: () => {
        return {};
    },
    methods: {
    },
    watch: {
        'lockPenetrate.selectVal'(val) {
            this.lockPenetrate.getTreeFN()
        }
    },
    beforeDestroy() {
        this.lockPenetrate.resetInfo()
    },
});
</script>
<style lang="less" scoped>
html,
body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
}

.myContainer {
    display: flex;
    background: #f5f8ff;
    width: 100%;
    height: 100%;
}

.left {
    width: 392px !important;
    background: #fff;
    padding: 16px 16px 0 16px;
    margin-right: 16px;

    ::v-deep .el-select {
        margin-bottom: 15px;
    }

    ::v-deep .el-select--small {
        width: 100%;
    }
}

.right {
    flex: 1;
    background: #F5F8FF;
    overflow: hidden;

    .form {
        background: #F5F8FF;
        margin-bottom: 15px;
    }

    .grid {
        .basetable {}
    }
}
.circle {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50% 50%;
    margin-right: 8px;
    margin-left: 8px;
}

.danger-circle {
    background: #FF4B33;
}

.danger-circle-text {
    color: #FF4B33;
}

.success-circle {
    background: #6FD13F;
}

.success-circle-text {
    color: #6FD13F;
}
</style>
