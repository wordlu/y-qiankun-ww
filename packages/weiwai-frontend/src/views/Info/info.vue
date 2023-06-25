<template>
  <div>
    <BaseTable :tableData="tableData" :tableColumn="tableColumn" :border="true" selection="multiple"
      :selectable="selectable" :pagination="true" :pageInfo="{
          pageSize: 1,
          pageCount: 2,
        }" :total="100" @pageChange="pageChange">
      <template slot="multiple-operation" slot-scope="{ selectionData }">
        <el-button type="primary" @click="click1(selectionData)">批量操作</el-button>
        <el-button>点击</el-button>
        <BaseDropdown buttonName="更多菜单" :dropdownList="dropdownList" @handleCommand="handleCommand"></BaseDropdown>
      </template>
      <template slot="btnshow" slot-scope="{row}">
        <el-button type="text" size="mini" @click="del(row)">删除</el-button>
        <BaseDropdown textName="更多" :dropdownList="dropdownList" @handleCommand="handleCommand"></BaseDropdown>
      </template>
    </BaseTable>
  </div>
</template>
<script lang="ts">
import BaseTable from "@/components/BaseTable/BaseTable.vue";
import BaseDropdown from "@/components/BaseDropdown/BaseDropdown.vue";
import Vue from "vue";

export default Vue.extend({
  name: 'Info',
  components: { BaseTable, BaseDropdown },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-01",
          name: "王小虎",
          address: 1,
          icon: "",
          phone: "123123123",
        },
        {
          date: "2016-05-03",
          name: "王小虎1",
          address: 0,
          phone: "123123123",
          icon: "el-icon-delete",
        },
      ],
      tableColumn: [
        { prop: "date", label: "时间" },
        {
          prop: "name",
          label: "姓名",
          align: "center",
          filterShow: true, //筛选是否显示箭头
          // 表格筛选
          filters: [
            { text: "王小虎", value: 1 },
            { text: "王小虎1", value: 0 },
          ],
          // 表格筛选的逻辑
          filterTag: (value: any, row: any) => {
            return value === row.address;
          },
        },
        //字典值转换
        {
          prop: "address", label: "地址", dictCode: true, dict: [
            { code: 0, value: "打卡失败" },
            { code: 1, value: "打卡成功" },
          ],
        },
        //icon图标
        { prop: "icon", label: "图标", icon: true, width: 50, align: "center" },
        // 使用函数转换
        {
          prop: "phone",
          label: "电话号码",
          format: (row: any) => {
            return `${row.name}(${row.phone})`;
          },
        },
        {
          label: "操作",
          // btnShow 是否显示按钮
          btnShow: true,
        },
      ],
      // 字典值

      dropdownList: [
        { value: 1, name: 1 },
        { value: 2, name: 2 },
        { value: 3, name: 3 },
      ],
    };
  },
  methods: {
    click1(list: any) {
      console.log(list);
    },
    // 控制当前是否禁用 返回值false禁用 true不禁用
    selectable(value: any) {
      return value.icon;
    },
    del(value: any) {
      console.log(value);
    },
    // 当前页发生变化触发的事件
    pageChange(val: any) {
      console.log(val);
    },
    handleClick(val: any) {
      console.log(val, 1111);
    },
    handleCommand(val: any) {
      console.log(val);
    },
  },
});
</script>
<style scoped>
/* .el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 12px;
}
.el-icon-arrow-down {
  font-size: 12px;
} */
.qq {
  width: 300px !important;
}
</style>
