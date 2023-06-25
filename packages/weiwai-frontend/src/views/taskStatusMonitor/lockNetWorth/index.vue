<!-- 净值数据锁定 -->
<template>
    <div class="myContainer">
        <div class="left">
            <el-select v-model="netWorth.selectVal" size="small" placeholder="请选择">
                <el-option v-for="item in netWorth.options" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
            </el-select>
            <Tree :treeList="netWorth.treeList" :hasParent="netWorth.hasParent" :checkedKeys="netWorth.checkedKeys"
                :resetScroll="netWorth.resetScroll" :expandedKeys="netWorth.expandedKeys"
                :defaultProps="netWorth.defaultProps" filterName="name" :showCheck="netWorth.showCheck"
                @treeChange="netWorth.checkTreeNode" />
        </div>
        <div class="right">
            <div class="form">
                <div style="background: #fff;">
                    <BaseForm :form-data="netWorth.formData" :set-options="netWorth.setOptions"
                        @inquire="netWorth.inquire" />
                </div>
            </div>
            <BaseTable ref="baseTable" :tableData="netWorth.tableData" selection="multiple" :serialShow="true"
                :tableColumn="netWorth.tableColumn" :border="true" :pagination="true" :pageInfo="netWorth.pageInfo"
                :total="netWorth.pageInfo.total" @sizeChange="netWorth.sizeChange" @pageChange="netWorth.pageChange" :loadingShow="netWorth.loadingShow">
                <template slot="multiple-operation" slot-scope="{ selectionData }">
                    <el-button @click="() => netWorth.lock(0, selectionData)">锁定</el-button>
                    <el-button @click="() => netWorth.lock(1, selectionData)">解锁</el-button>
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
import { lockNetWorthStore } from "@model/store/modules/dataView/lockNetWorth";
export default Vue.extend({
    name: "lockNetWorth",
    components: { Tree, BaseTable, BaseDropdown, BaseForm },
    computed: {
        netWorth() {
            const netWorth = lockNetWorthStore();
            return netWorth
        },
    },
    async created() {
        this.netWorth.init()
        this.netWorth.formData = await this.netWorth.initForm(this.netWorth.formData)
    },
    data: () => {
        return {};
    },
    methods: {
    },
    watch: {
        'netWorth.selectVal'(val) {
            this.netWorth.getTreeFN()
        }
    },
    beforeDestroy() {
        console.log(233);
        
        this.netWorth.clear()
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
