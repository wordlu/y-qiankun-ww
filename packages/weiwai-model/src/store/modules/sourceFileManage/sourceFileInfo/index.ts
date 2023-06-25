import { defineStore } from "pinia";

import { formatSelectOption, downloadFile } from "../../../../utils/utils";

import { Message } from 'element-ui'
//test
import { FactoryApi } from '@services/factoryApi'
import { ServiceMailControllerApi, ServiceMasterDataManagementControllerApi } from '@services/weiwai'

import { debounce } from 'lodash'

const api = FactoryApi.createAPIInstance(ServiceMailControllerApi)
const comApi = FactoryApi.createAPIInstance(ServiceMasterDataManagementControllerApi)

export const tableColumn: any = [
  { prop: "mailTitle", label: "文件标记", tooltip: true, },
  { prop: "sendDate", label: "发送日期", tooltip: true, width: 160 },
  { prop: "addresser", label: "文件来源", tooltip: true, width: 100 },
  { prop: "orgName", label: "发送机构", tooltip: true, width: 185 },
  { prop: "analysisErrorInfo", label: "解析规则", tooltip: true, width: 110 },
  { prop: "fileName", label: "附件", tooltip: true, fileName: true, },
  {
    prop: "state",
    label: "邮件状态",
    stateId: true,
    width: 106
  },
  {
    label: "操作",
    btnShow: true,
    fixed: 'right',
    width: 150
  },
]

export const renderFrom: any = [
  {
    type: "DatePickerDaterange",
    label: "起止日期",
    key: "date",
    rowId: 1,
    span: 6,
  },
  {
    label: "邮件状态",
    key: "state",
    type: "Select",
    clearable: true,
    options: [
      { code: '已解析', value: '1' },
      { code: '不解析', value: '2' },
      { code: '待解析', value: '3' },
      { code: '解析错误', value: '4' },
      { code: '未建组合', value: '5' },
    ],
    filterable: true,
    multiple: false,
    rowId: 1,
    filterMethod: true,
    reserveKeyword: true,
    span: 6,
  },
  {
    type: "Input",
    label: "邮件内容",
    key: "mailContent",
    clearable: true,
    rowId: 1,
    span: 6,
  },
  {
    label: "发送机构",
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

export const useSourceFileInfoStore = defineStore('sourceFileInfo', {
  state: () => ({
    searchFormData: formData,
    pageInfo: {
      startPage: 1,
      pageSize: 20
    },
    tableData: {},
    tableLoading: false,
    tableColumn,
    dialogVisible: false,
    mailText: '',
    searchForm: { date: [] }
  }),
  actions: {
    async init() {
      //发送机构 select options
      const { data: res } = await api.mailOrgListPost();

      // 邮件状态 select options
      const { data: mailRes } = await api.mailMailStatePost();

      if (res && res?.success) {
        this.searchFormData.renderFrom.forEach((item: any) => {
          if (item.key === 'orgId') {
            item.options = formatSelectOption(res?.data || [], { label: 'keyName', value: 'keyId' }) || []
          }
        });
      }

      if (mailRes && mailRes?.success) {
        this.searchFormData.renderFrom.forEach((item: any) => {
          if (item.key === 'state') {
            item.options = formatSelectOption(mailRes?.data || [], { label: 'keyName', value: 'keyId' }) || []
          }
        });
      }
    },
    //获取table 数据
    async getSearchTable() {
      let newParams = { ...this.searchFormData.initData, ...this.searchForm, ...this.formatDate(this.searchForm?.date), ...this.pageInfo };
      this.tableLoading = true;
      const { data: res } = await api.mailSearchPost(newParams);
      if (res && res?.success) {
        this.tableData = res
      }
      this.tableLoading = false;
    },
    //格式化 起止日期
    formatDate(date: string[]) {
      let beginDate = '', endDate = '';
      if (Array.isArray(date) && date.length > 0) {
        beginDate = date?.[0];
        endDate = date?.[1];
      }
      return { beginDate, endDate }
    },
    //查询
    inquire: debounce(function (val: any) {
      this.searchForm = val;
      this.getSearchTable()
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
      this.pageInfo.startPage = val
    },
    // 当前页发生变化触发的事件
    sizeChange(val: number) {
      this.pageInfo.pageSize = val
    },
    updataEmail: debounce(async function () {
      this.tableLoading = true;
      const { data: res } = await api.mailUpdateMailPost();
      if (res && res?.success) {
        Message({
          type: 'success',
          message: '收取邮件成功!'
        });
        this.getSearchTable()
      } else {
        Message({
          type: 'error',
          message: '收取邮件失败!'
        })
        this.tableLoading = false;
      }
    }, 500),
    async onAnalysis(row: any) {
      const { data: res } = await api.mailRulesFileAnalysisPost(row);
      if (res && res?.success) {
        Message({
          type: 'success',
          message: '解析成功!'
        });
      } else {
        Message({
          type: 'error',
          message: '解析失败！'
        })
      }
    },
    async onShow(row: any) {
      const { data: res } = await api.mailViewPost({ id: row.id });
      if (res && res?.success) {
        this.dialogVisible = true
        this.mailText = res?.data || '';
      } else {
        Message({
          type: 'error',
          message: '查看失败'
        })
      }
    },
    onCloseDialog() {
      this.dialogVisible = false;
    },
    onDownload: debounce(async function (row: any) {
      const { data: res } = await api.mailDownVailePost({ id: row?.id, fileDir: row?.fileDir })
      if (res && res?.success) {
        const res = await api.mailDownloadPost(row.id, row.fileDir, { responseType: 'blob' })
        downloadFile(res)
      } else {
        Message({
          type: 'error',
          message: res?.message || '文件不存在'
        });
      }
    }, 500),
  }
})
