import { defineStore } from "pinia";

import { cloneDeep, debounce } from 'lodash';
import { formatSelectOption, downloadFile } from "../../../../utils/utils";

import { Message, MessageBox } from 'element-ui'

import { FILE_TYPE } from '../const';
//test
import { FactoryApi } from '@services/factoryApi'
import { ServiceMailRulesControllerApi, ServiceMailControllerApi, ServiceDataSrcAgingControllerApi } from '@services/weiwai'

const api = FactoryApi.createAPIInstance(ServiceMailRulesControllerApi)
const comApi = FactoryApi.createAPIInstance(ServiceMailControllerApi)
const combinmApi = FactoryApi.createAPIInstance(ServiceDataSrcAgingControllerApi)


export const tableColumn: any = [
  { prop: "wfTypeName", label: "文件类型", tooltip: true, width: 82 },
  { prop: "senderName", label: "策略专户", tooltip: true },
  { prop: "orgName", label: "机构名称", tooltip: true, width: 215 },
  { prop: "matchTitle", label: "匹配路径", tooltip: true, width: 185 },
  { prop: "matchFile", label: "匹配文件", tooltip: true, width: 185 },
  {
    prop: "cChecked", label: "审核状态", tooltip: true, width: 80, dictCode: true, dict: [
      { code: 1, value: "已审核" },
      { code: 0, value: "未审核" },
    ]
  },
  { prop: "checkName", label: "审核人", tooltip: true, width: 100 },
  { prop: "parsingRules", label: "解析规则", tooltip: true },
  { label: "操作", btnShow: true, width: 150, fixed: 'right' },
]

export const renderFrom: any = [
  {
    label: "文件类型",
    key: "wfType",
    type: "Select",
    clearable: true,
    options: FILE_TYPE,
    filterable: true,
    multiple: false,
    rowId: 1,
    filterMethod: true,
    reserveKeyword: true,
    span: 6,
  },
  {
    label: "机构名称",
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
    type: "Input",
    label: "解析规则",
    key: "parsingRules",
    clearable: true,
    rowId: 1,
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


const defaultFormData: any = {
  wfType: '',
  sender: '',
  orgId: '',
  matchTitle: '',
  matchFile: '',
  parsingRules: '',
  file: [],
  fileName: '',
}

export const useAnalyticRuleStore = defineStore('analyticRule', {
  state: () => ({
    searchFormData: formData,
    pageInfo: {
      startPage: 1,
      pageSize: 20
    },
    tableData: {},
    tableLoading: false,
    tableColumn,
    orgList: [],
    combinList: [],
    selectable: [],
    drawerTitle: '新增',
    loading: false,
    drawerVisible: false,
    addForm: cloneDeep(defaultFormData),
    rules: {
      wfType: { required: true, message: '请选择', trigger: ['blur'] },
      orgId: { required: true, message: '请选择', trigger: ['blur'] },
      matchFile: [{ required: true, message: '请输入内容', trigger: ['blur'] }, { max: 200, message: '该输入项的最大长度是200个字符', trigger: 'blur' }],
      matchTitle: [{ required: true, message: '请输入内容', trigger: ['blur'] }, { max: 200, message: '该输入项的最大长度是200个字符', trigger: 'blur' }],
      parsingRules: [{ max: 50, message: '该输入项的最大长度是50个字符', trigger: 'blur' }],
    },
    searchForm: {},
    fileType: FILE_TYPE
  }),
  actions: {
    async init() {
      // 策略专户 select options
      const { data: combRes } = await combinmApi.dataAgingGetCombinListPost();
      this.combinList = formatSelectOption(combRes?.data, { label: 'keyName', value: 'keyId' }) || [];

      // 机构名称 select options
      const { data: res } = await comApi.mailOrgListPost()
      this.orgList = formatSelectOption(res?.data, { label: 'keyName', value: 'keyId' }) || [];

      this.searchFormData.renderFrom.forEach((item: any) => {
        if (item.key === 'orgId') {
          item.options = this.orgList;
        }
      });
      // this.searchFormData.initData.wfType = 'tr_penetrate_report';
    },
    async getRulesList() {
      const params = { ...this.searchFormData.initData, ...this.searchForm, ...this.pageInfo };
      this.tableLoading = true;
      const { data: res } = await api.mailRulesGetMailRulesListPost(params);
      if (res && res?.success) {
        this.tableData = res
      }
      this.tableLoading = false;
    },
    inquire: debounce(function (val: any) {
      this.searchForm = val;
      this.getRulesList()
    }, 500),
    reset: debounce(function (val: any) {
      this.searchForm = val;
      this.pageInfo = {
        startPage: 1,
        pageSize: 20
      }
    }, 500),
    // 当前页发生变化触发的事件
    pageChange(val: number) {
      this.pageInfo.startPage = val;
    },
    // 当前页发生变化触发的事件
    sizeChange(val: number) {
      this.pageInfo.pageSize = val;
    },
    //
    handleSelectionChange(val: number) {
      console.log('handleSelectionChange')
    },
    onAdd() {
      this.drawerTitle = '新增';
      this.drawerVisible = true;
      this.addForm = { ...cloneDeep(defaultFormData) }
    },
    //审核|反审核
    onChecked: debounce(async function (row: any, type = 1) {
      const { data: res } = await api.mailRulesCheckPost({ id: row.id, cChecked: type });
      if (res && res?.success) {
        Message({
          type: 'success',
          message: type ? '审核成功!' : '反审核成功!'
        });
        this.getRulesList()
      } else {
        Message({
          type: 'error',
          message: '操作失败'
        })
      }
    }, 500),
    onDelete(row: any) {
      MessageBox.confirm('确定要删除内容吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'globalMessageDel'
      }).then(async () => {
        const { data: res } = await api.mailRulesDeletePost({ id: row.id });
        if (res && res?.success) {
          Message({
            type: 'success',
            message: '删除成功!'
          });
          this.getRulesList()
        } else {
          Message({
            type: 'error',
            message: '删除失败!'
          })
        }
      }).catch(() => {
        Message({
          type: 'warning',
          message: '已取消删除'
        });
      });
    },
    onDownload: debounce(async function (row: any) {
      const { data: res } = await api.mailRulesDownVailePost({ parsingRules: row?.parsingRules })
      if (res && res?.success) {
        const res = await api.mailRulesDownloadPost(row?.parsingRules, { responseType: 'blob' })
        downloadFile(res)
      } else {
        Message({
          type: 'error',
          message: res?.message || '文件不存在'
        });
      }
    }, 500),
    handleCommand(val: string, row: any) {
      if (val === 'edit' || val === 'view') {
        this.drawerTitle = val === 'edit' ? '编辑' : '查看';
        this.drawerVisible = true;
        this.addForm = { ...this.addForm, ...row }
      } else if (val === 'delete') {
        this.onDelete(row)
      } else if (val === 'download') {
        this.onDownload(row)
      }
    },
    onChangUpload(file: any, fileList: any) {
      this.addForm.file = [...fileList];
      this.addForm.fileName = file.name;
      this.addForm.parsingRules = file.name;
    },
    onExceed(files: any) {
      const name = files[0].name || '';
      this.addForm.file = [{ raw: files[0], name }];
      this.addForm.fileName = name;
      this.addForm.parsingRules = name;
    },
    onRemove() {
      this.addForm.file = []
      this.addForm.fileName = '';
      this.addForm.parsingRules = '';
    },
    // 抽屉关闭 函数
    onClose() {
      this.drawerVisible = false;
    },
    onCancel() {
      this.loading = false;
      this.onClose()
    },
    onOk: debounce(function (formRef: any) {
      formRef?.validate(async (valid: any) => {
        if (valid) {

          let resData: any = {};
          let { matchFile, id, matchTitle, orgId, parsingRules, sender, file, wfType, } = this.addForm

          file = file?.[0]?.raw || '';

          this.loading = true;

          if (this.drawerTitle === '新增') {
            resData = await api.mailRulesRegisterPost(matchFile, matchTitle, orgId, parsingRules, sender, file, wfType)
          } else {
            resData = await api.mailRulesUpdatePost(file, id, matchFile, matchTitle, orgId, parsingRules, sender, wfType)
          }

          const { data: res }: any = resData;

          if (res && res?.success) {
            Message({
              type: 'success',
              message: this.drawerTitle === '新增' ? '新增成功!' : '更新成功!'
            });
            this.onCancel();
            this.getRulesList()
          } else {
            Message({
              type: 'error',
              message: '操作失败'
            });
          }
          this.loading = false;
          this.addForm = cloneDeep(defaultFormData)
        } else {
          this.loading = false
          return false;
        }
      });
    }, 500)
  }
})
