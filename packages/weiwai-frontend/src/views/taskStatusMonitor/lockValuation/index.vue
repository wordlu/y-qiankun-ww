<!-- 估值数据锁定 -->
<template>
    <div class="myContainer">
        <div class="left">
            <el-select v-model="lockValuation.selectVal" size="small" placeholder="请选择">
                <el-option v-for="item in lockValuation.options" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
            </el-select>
            <Tree :treeList="lockValuation.treeList" :hasParent="lockValuation.hasParent"
                :checkedKeys="lockValuation.checkedKeys" :resetScroll="lockValuation.resetScroll"
                :expandedKeys="lockValuation.expandedKeys" :defaultProps="lockValuation.defaultProps" filterName="name"
                :showCheck="lockValuation.showCheck" @treeChange="lockValuation.checkTreeNode" />
        </div>
        <div class="right">
            <div class="form">
                <div style="background: #fff;">
                    <BaseForm :form-data="lockValuation.formData" :set-options="lockValuation.setOptions"
                        @inquire="lockValuation.inquire" />
                </div>
            </div>
            <BaseTable ref="baseTable" :tableData="lockValuation.tableData" :serialShow="true" selection="multiple"
                :tableColumn="lockValuation.tableColumn" :border="true" :pagination="true"
                :pageInfo="lockValuation.pageInfo" :total="lockValuation.pageInfo.total"
                :loadingShow="lockValuation.loadingShow" @sizeChange="lockValuation.sizeChange"
                @pageChange="lockValuation.pageChange">
                <template slot="multiple-operation" slot-scope="{ selectionData }">
                    <el-button @click="() => lockValuation.lock(0, selectionData)">锁定</el-button>
                    <el-button @click="() => lockValuation.lock(1, selectionData)">解锁</el-button>
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
import { lockValuationStore } from "@model/store/modules/dataView/lockValuation";
export default Vue.extend({
    name: "lockValuation",
    components: { Tree, BaseTable, BaseDropdown, BaseForm },
    computed: {
        lockValuation() {
            const lockValuation = lockValuationStore();
            return lockValuation
        },
    },
    async created() {
        this.lockValuation.formData = await this.lockValuation.initForm(this.lockValuation.formData)
        this.lockValuation.init()
    },
    data: () => {
        return {};
    },
    methods: {
    },
    watch: {
        'lockValuation.selectVal'(val) {
            this.lockValuation.getTreeFN()
        }
    },
    beforeDestroy() {
        this.lockValuation.resetInfo()
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
