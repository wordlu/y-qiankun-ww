<template>
  <EditTable title="机构扩展信息" :tableColumnList="tableColumnList" :formData="formData" :isEdit="false" :showOption="false"
    :recordCreatorProps="{ record: defaultRow }" :multipleSelection="multipleSelection"
    @handleSelectionChange="handleSelectionChange">
    <template slot="operate" slot-scope="{row,editRowIndex}">
      <el-popconfirm title="删除此行？" @confirm="onDelete(row, editRowIndex)">
        <i class="el-icon-delete" slot="reference" @click.stop></i>
      </el-popconfirm>
      <!-- <el-button type="text" size="mini" @click="onEdit(row)">编辑</el-button>
      <el-button type="text" size="mini" @click="onShow(row)">查看</el-button> -->
    </template>
  </EditTable>
</template>
<script lang="ts">
import EditTable from './index.vue';
import { tableColumnList, defaultRow, Row, SelectOption } from './data';

export default {
  components: { EditTable },
  props: {
  },
  data() {
    return {
      tableColumnList,
      defaultRow,
      formData: {
        tableData: [
          {
            text: "黄金糕",
            name: "小麦33",
            age: "上海市普陀区金沙江路 1518 弄",
          },
          {
            text: "黄金糕",
            name: "小虎33",
            age: "上海市普陀区金沙江路 1538 弄",
          },
          {
            text: "黄金糕",
            name: "小麦33",
            age: "上海市普陀区金沙江路 1418 弄",
          },
        ],
      },
      multipleSelection: [],
    };
  },
  methods: {
    handleSelectionChange() {
    },
    onDelete(row: Row, editRowIndex: number) {
      console.log(row, editRowIndex, '删除')
    },
    onEdit(row: Row) {
      console.log(row, '编辑')
    },
    onShow(row: Row) {
      console.log(row, '查看')
    },
  }
}
</script>
