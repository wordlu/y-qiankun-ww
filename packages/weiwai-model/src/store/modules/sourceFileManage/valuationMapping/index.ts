
import { defineStore } from "pinia";
import { cloneDeep, debounce } from 'lodash';
import { formatSelectOptionNoKey } from "../../../../utils/utils";

import { Message } from 'element-ui';
//test
import { FactoryApi } from '@services/factoryApi';
import { ServiceValuationConfigControllerApi } from '@services/weiwai';

const api = FactoryApi.createAPIInstance(ServiceValuationConfigControllerApi);


export const categoryTableColumn: any = [
  { prop: "tagCode", label: "目标代码", tooltip: true },
  { prop: "tagName", label: "目标列名", tooltip: true },
  {
    prop: "valid", label: "是否有效", tooltip: true, dictCode: true, dict: [
      { code: 1, value: "有效" },
      { code: 0, value: "无效" },
    ],
  },
  { prop: "mdfyTime", label: "创建/更新时间", tooltip: true }
]

export const tableColumn: any = [
  { prop: "fileTag", label: "文件标记", tooltip: true },
  { prop: "orgId", label: "机构代码", tooltip: true, width: 80 },
  { prop: "fileType", label: "文件类型", tooltip: true, width: 80 },
  { prop: "colName", label: "列名称", tooltip: true, width: 80 },
  { prop: "tagCode", label: "目标代码", tooltip: true, width: 106 },
  { prop: "tagName", label: "目标列名", tooltip: true, width: 110 },
  {
    prop: "valid", label: "是否有效", tooltip: true, dictCode: true, dict: [
      { code: 1, value: "有效" },
      { code: 0, value: "无效" },
    ], width: 80
  },
  { prop: "colNum", label: "列序号", tooltip: true, width: 80 },
  { prop: "tagNum", label: "目标序号", tooltip: true, width: 80 },
  { prop: "tagTable", label: "目标表", tooltip: true, width: 80 },
  { prop: "createTime", label: "创建时间", tooltip: true, width: 160 },
  { prop: "mdfyTime", label: "更新时间", tooltip: true, width: 160 },
  { label: "操作", btnShow: true, width: 150, fixed: 'right' },
]

export const renderFrom: any = [
  {
    label: "文件标记",
    key: "fileTag",
    type: "Select",
    clearable: true,
    options: [],
    filterable: true,
    multiple: false,
    rowId: 1,
    filterMethod: true,
    reserveKeyword: true,
    span: 6,
    tooltip: true
  },
  {
    label: "机构代码",
    key: "orgId",
    type: "Select",
    clearable: true,
    options: [],
    filterable: true,
    multiple: false,
    rowId: 1,
    filterMethod: true,
    reserveKeyword: true,
    span: 6,
  },
  {
    type: "Buttons",
    rowId: 2,
    children: [
      {
        label: "查询",
        btnShow: 82103,
        size: "small",
        btnType: "primary",
        onClick: (_: any, val: any, _this: any) => {
          _this.$emit("inquire", val.initData);
        },
      },
      {
        label: "重置",
        size: "small",
        btnShow: 82102,
        onClick: (_: any, val: any, _this: any) => {
          val.initData = initData(renderFrom)
          _this.$emit('reset')
        },
      },
    ],
  },
];

export const initData = (ary: any) => {
  const data: any = {};
  ary.forEach((element: any) => {
    if (!["Buttons", "Button"].includes(element.type)) {
      data[element.key] = element.initValue || "";
    }
  });
  return data;
};

export const formData: any = {
  initData: initData(renderFrom),
  maxRow: 1,
  maxCol: 4, //每行表单数
  isFoldRow: false,
  Folding: false,
  renderFrom: renderFrom,
};


const defaultFormData = {
  fileTag: '',
  tagCode: '',
  tagName: '',
  orgId: '',
  fileType: '',
  colNum: '',
  colName: '',
  tagNum: '',
  tagTable: '',
  valid: ''
}

export const useValuationMappingStore = defineStore('valuationMapping', {
  state: () => ({
    searchFormData: formData,
    pageInfo: {
      startPage: 1,
      pageSize: 20
    },
    orgIdList: [],
    fileTagList: [],
    tableData: {},
    tableLoading: false,
    tableColumn,
    selecTable: [],
    drawerTitle: '新增',
    loading: false,
    drawerVisible: false,
    addForm: cloneDeep(defaultFormData),
    rules: {
      fileTag: { required: true, message: '请输入', trigger: ['blur'] },
      tagCode: [{ required: true, message: '请输入', trigger: ['blur'] }, { max: 50, message: '该输入项的最大长度是50个字符', trigger: 'blur' }],
      tagName: [{ required: true, message: '请输入', trigger: ['blur'] }, { max: 200, message: '该输入项的最大长度是200个字符', trigger: 'blur' }],
      orgId: [{ required: true, message: '请输入', trigger: ['blur'] }, { max: 50, message: '该输入项的最大长度是50个字符', trigger: 'blur' }],
      fileType: [{ required: true, message: '请输入', trigger: ['blur'] }, { max: 50, message: '该输入项的最大长度是50个字符', trigger: 'blur' }],
      colNum: [{ required: true, message: '请输入', trigger: ['blur'] }, { pattern: /^[0-9]{1,2}$/, message: '只能输入0-99的数字', trigger: ['blur'] }],
      colName: [{ max: 200, message: '该输入项的最大长度是200个字符', trigger: 'blur' }],
      tagNum: [{ required: true, message: '请输入', trigger: ['blur'] }, { pattern: /^[0-9]{1,2}$/, message: '只能输入0-99的数字', trigger: ['blur'] }],
      tagTable: [{ max: 200, message: '该输入项的最大长度是200个字符', trigger: 'blur' }],
      valid: { required: true, message: '请选择', trigger: ['blur'] },
    },
    dialogVisible: false,
    categoryTableColumn,
    categoryTableData: {},
    cTableLoading: false,
    categoryPageInfo: {
      startPage: 1,
      pageSize: 10
    },
    addChild: false,
    fileTag: '',
    searchForm: {},
  }),
  actions: {
    async init() {
      // 文件标记 select options
      const { data: res } = await api.valuationConfigFileTagPost()
      this.fileTagList = formatSelectOptionNoKey(res?.data) || []

      // 机构代码 select options
      const { data: orgIdRes } = await api.valuationConfigOrgListPost()
      this.orgIdList = formatSelectOptionNoKey(orgIdRes?.data) || []

      this.searchFormData.renderFrom.forEach((item: any) => {
        if (item.key === 'fileTag') {
          item.options = this.fileTagList;
        } else if (item.key === 'orgId') {
          item.options = this.orgIdList;
        }
      });
    },
    //获取table 数据
    async getValuationLists() {
      const params = { ...this.searchFormData.initData, ...this.searchForm, ...this.pageInfo }
      this.tableLoading = true;
      const { data: res } = await api.valuationConfigAllPost(params);
      if (res && res?.success) {
        this.tableData = res;
      }
      this.tableLoading = false;
    },
    //获取 查看分类 数据
    async getAllByFileTags() {
      const params = { fileTag: this?.fileTag, ...this.categoryPageInfo }
      this.cTableLoading = true;
      const { data: res } = await api.valuationConfigAllByIdPost(params);
      if (res && res?.success) {
        this.categoryTableData = res;
      }
      this.cTableLoading = false;
    },
    inquire: debounce(function (val: any) {
      this.searchForm = val
      this.getValuationLists()
    }, 500),
    reset: debounce(function (val: any) {
      this.searchForm = val;
      this.pageInfo = {
        startPage: 1,
        pageSize: 20
      }
    }, 500),
    // table 分页
    pageChange(val: number) {
      this.pageInfo.startPage = val;
    },
    // table 页码
    sizeChange(val: number) {
      this.pageInfo.pageSize = val;
    },
    // table 多选
    handleSelectionChange(rows: any) {
      this.selecTable = rows;
    },
    //新增
    onAdd() {
      this.drawerTitle = '新增';
      this.addForm = cloneDeep(defaultFormData);
      this.drawerVisible = true;
    },
    //查看此分类
    onViewCategory(row: any) {
      this.fileTag = row?.fileTag;
      this.categoryPageInfo.startPage = 1;
      this.getAllByFileTags()
      this.dialogVisible = true;
    },
    // 查看此分类  分页
    cPageChange(val: number) {
      this.categoryPageInfo.startPage = val;
    },
    // 查看此分类  页码
    cSizeChange(val: number) {
      this.categoryPageInfo.pageSize = val;
    },
    // 查看此分类  弹框
    onCloseDialog() {
      this.dialogVisible = false;
      this.addChild = false;
    },
    //更多下拉
    handleCommand(val: string, row: any) {
      if (val === 'edit') {
        this.drawerTitle = '编辑';
        this.addForm = { ...this.addForm, ...row }
      } else {
        this.drawerTitle = '添加子项';
        this.addChild = true;
        this.addForm = { ...defaultFormData, fileTag: row.fileTag };
      }
      this.drawerVisible = true;
    },
    //启用|禁止
    handleState: debounce(async function (type: string) {
      if (!this.selecTable.length) {
        Message({
          type: 'warning',
          message: '未选择任何数据'
        })
        return false;
      }

      let isValid = this.selecTable.some((row) => row.valid);
      let isNoValid = this.selecTable.some((row) => !row.valid);

      if (type === 'false' && isNoValid) {
        Message({
          type: 'warning',
          message: '所选择的数据包含无效状态数据'
        })
        return false;
      }

      if (type === 'true' && isValid) {
        Message({
          type: 'warning',
          message: '所选择的数据包含有效状态数据'
        })
        return false;
      }

      let ids = this.selecTable.map((item: any) => item.id) || [];

      const { data: res } = await api.valuationConfigStatePost({ state: type, ids });

      if (res && res?.success) {
        Message({
          type: 'success',
          message: type == 'true' ? `启用成功!` : '禁用成功!'
        });
        this.selecTable = [];
        this.getValuationLists()
      } else {
        Message({
          type: 'error',
          message: '操作失败'
        })
      }
    }, 500),
    // 抽屉关闭 函数
    onClose() {
      this.drawerVisible = false;
      this.addChild = false;
    },
    onCancel() {
      this.loading = false;
      this.onClose()
    },
    onOk: debounce(function (formRef: any) {
      formRef?.validate(async (valid: any) => {
        if (valid) {

          let resData: any = {};
          const params: any = { ...this.addForm }
          let isAdd = ['新增', '添加子项'].includes(this.drawerTitle);

          if (isAdd) {

            const validateParams = { fileTag: params.fileTag, tagCode: params.tagCode }

            const { data: existRes } = await api.valuationConfigExistPost(validateParams);

            if (existRes) {
              Message({
                type: 'warning',
                message: '已存在'
              });
              return false
            }
            this.loading = true;
            resData = await api.valuationConfigAddPost(params)

          } else {
            this.loading = true;
            resData = await api.valuationConfigEditPost(params)
          }

          const { data: res }: any = resData;

          if (res && res?.success) {
            Message({
              type: 'success',
              message: isAdd ? '新增成功!' : '更新成功!'
            });
            this.onCancel();
            this.getValuationLists()
            this.init();
          } else {
            Message({
              type: 'error',
              message: '操作失败'
            });
          }

          this.loading = false
          this.addForm = cloneDeep(defaultFormData)
        } else {
          this.loading = false
          return false;
        }
      });
    }, 500)
  }
})
