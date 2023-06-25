import { defineStore } from "pinia";

import { cloneDeep, debounce } from 'lodash';
import { formatSelectOption } from "../../../../utils/utils";

import { Message, MessageBox } from 'element-ui'

import { FILE_TYPE } from '../const';
//test
import { FactoryApi } from '@services/factoryApi'
import { ServiceDataSrcAgingControllerApi, ServiceMailControllerApi, ServiceDictControllerApi } from '@services/weiwai'

const api = FactoryApi.createAPIInstance(ServiceDataSrcAgingControllerApi)
const comApi = FactoryApi.createAPIInstance(ServiceMailControllerApi)
const dicApi = FactoryApi.createAPIInstance(ServiceDictControllerApi)

export const tableColumn: any = [
  { prop: "fileTypeName", label: "文件类型", tooltip: true, width: 82 },
  { prop: "orgName", label: "管理机构", tooltip: true, width: 200 },
  { prop: "combin", label: "策略专户", tooltip: true, width: 215 },
  { prop: "pfId", label: "专户代码", tooltip: true, width: 90 },
  { prop: "agingRateName", label: "时效频率", tooltip: true, width: 80 },
  { prop: "gzDateName", label: "估值日", tooltip: true, width: 80 },
  { prop: "delayDay", label: "延迟天数", tooltip: true, width: 80 },
  { prop: "endTime", label: "截止时间", tooltip: true, width: 80 },
  {
    prop: "cChecked", label: "审核状态", tooltip: true, width: 80, dictCode: true, dict: [
      { code: 1, value: "已审核" },
      { code: 0, value: "未审核" },
    ]
  },
  { prop: "checkName", label: "审核人", tooltip: true, width: 75 },
  { prop: "checkTime", label: "审核时间", tooltip: true, width: 160 },
  { prop: "mdfyPrsn", label: "修改人", tooltip: true, width: 75 },
  { prop: "mdfyTime", label: "修改时间", tooltip: true, width: 160 },
  { prop: "createPrsn", label: "创建人", tooltip: true, width: 75 },
  { prop: "createTime", label: "创建时间", tooltip: true, width: 160 },
  { label: "操作", btnShow: true, width: 150, fixed: 'right' },
]

export const renderFrom: any = [
  {
    label: "文件类型",
    key: "fileType",
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
    label: "管理机构",
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
    label: "策略专户",
    key: "combin",
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
    label: "审核状态",
    key: "cChecked",
    type: "Select",
    clearable: true,
    options: [
      { keyName: '已审核', keyId: 1 },
      { keyName: '未审核', keyId: 0 },
    ],
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


const defaultFormData: any = {
  fileType: '',
  orgId: '',
  combin: '',
  agingRate: '',
  delayDay: '',
  endTime: '',
  gzDate: '',
}

export const useAgingManageStore = defineStore('agingManage', {
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
    agingRateList: [],
    gzDateList: [],
    cCheckedList: [],
    drawerTitle: '新增',
    loading: false,
    drawerVisible: false,
    addForm: cloneDeep(defaultFormData),
    rules: {
      fileType: { required: true, message: '请选择', trigger: ['blur'] },
      orgId: { required: true, message: '请选择', trigger: ['blur'] },
      agingRate: { required: true, message: '请选择', trigger: ['blur'] },
      combin: { required: true, message: '请选择', trigger: ['blur'] },
      endTime: { required: true, message: '请选择', trigger: ['blur'] },
      delayDay: [
        { pattern: /^[0-9]{1,2}$/, message: '只能输入0-99的数字', trigger: ['blur'] }
      ],
    },
    searchForm: {},
    fileType: FILE_TYPE,
    selecTable: []
  }),
  actions: {
    async init() {
      //策略专户 select option
      const { data: combRes } = await api.dataAgingGetCombinListPost();
      this.combinList = formatSelectOption(combRes?.data, { label: 'keyName', value: 'keyId' }) || [];

      // 管理机构 select option
      const { data: res } = await comApi.mailOrgListPost()
      this.orgList = formatSelectOption(res?.data, { label: 'keyName', value: 'keyId' }) || [];

      //时效频率 select option
      const { data: agingRateRes } = await dicApi.dicAllByClassIdPost({ "classId": "DATE_RATE" })
      this.agingRateList = formatSelectOption(agingRateRes?.data, { label: 'keyName', value: 'keyId' }) || [];

      //估值日期 select option
      const { data: gzRes } = await api.dataAgingGetListByAgingPost()
      this.gzDateList = formatSelectOption(gzRes?.data, { label: 'keyName', value: 'keyId' }) || [];

      this.searchFormData.renderFrom.forEach((item: any) => {
        if (item.key === 'orgId') {
          item.options = this.orgList;
        } else if (item.key === 'combin') {
          item.options = this.combinList;
        }
      });
      // this.searchFormData.initData.fileType = 'tr_penetrate_report';
    },
    async getAgingsList() {
      const params = { ...this.searchFormData.initData, ...this.searchForm, ...this.pageInfo };
      this.tableLoading = true;
      const { data: res } = await api.dataAgingQueryPost(params);
      if (res && res?.success) {
        this.tableData = res
      }
      this.tableLoading = false;
    },
    inquire: debounce(function (val: any) {
      this.searchForm = val;
      this.getAgingsList()
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
    // table 多选
    handleSelectionChange(rows: any) {
      this.selecTable = rows;
    },
    onAdd() {

      this.drawerTitle = '新增';
      this.drawerVisible = true;
      this.addForm = { ...cloneDeep(defaultFormData) }
    },
    //批量 审核|反审核
    onBatchChecked: debounce(async function (type = 1) {
      if (!this.selecTable.length) {
        Message({
          type: 'warning',
          message: '未选择任何数据'
        })
        return false;
      }

      let isValid = this.selecTable.some((row) => row.cChecked);
      let isNoValid = this.selecTable.some((row) => !row.cChecked);

      if (type === 0 && isNoValid) {
        Message({
          type: 'warning',
          message: '所选择的数据包含未审核状态数据'
        })
        return false;
      }

      if (type === 1 && isValid) {
        Message({
          type: 'warning',
          message: '所选择的数据包含已审核状态数据'
        })
        return false;
      }

      let ids = this.selecTable.map((item: any) => item.id) || [];
      const { data: res } = await api.dataAgingBatchApprovePost({ ids, checked: type });
      if (res && res?.success) {
        Message({
          type: 'success',
          message: type ? '审核成功!' : '反审核成功!'
        });
        this.getAgingsList()
      } else {
        Message({
          type: 'error',
          message: '操作失败'
        })
      }
    }, 500),
    //审核|反审核
    onChecked: debounce(async function (row: any, type = 1) {
      const { data: res } = await api.dataAgingCheckPost({ id: row.id, checked: type });
      if (res && res?.success) {
        Message({
          type: 'success',
          message: type ? '审核成功!' : '反审核成功!'
        });
        this.getAgingsList()
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
        const { data: res } = await api.dataAgingDeletePost({ id: row.id });
        if (res && res?.success) {
          Message({
            type: 'success',
            message: '删除成功!'
          });
          this.getAgingsList()
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
    handleCommand(val: string, row: any) {
      if (val === 'edit') {
        this.drawerTitle = '编辑';
        this.drawerVisible = true;
        const newObj = { ...row, fileTypeName: this.searchFormData.initData.type }
        this.addForm = Object.assign(this.addForm, newObj)
      } else if (val === 'delete') {
        this.onDelete(row)
      }
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
          const params: any = { ...this.addForm }

          if (this.drawerTitle === '新增') {

            const { orgId, combin, fileType } = this.addForm;

            const { data: existRes } = await api.dataAgingIsExistPost({ orgId, combin, fileType });

            if (existRes && existRes?.success) {
              Message({
                type: 'warning',
                message: '已存在'
              });
              return false
            }
            this.loading = true;
            resData = await api.dataAgingAddPost(params)

          } else {
            this.loading = true;
            resData = await api.dataAgingEditPost(params)
          }

          const { data: res }: any = resData;

          if (res && res?.success) {
            Message({
              type: 'success',
              message: this.drawerTitle === '新增' ? '新增成功!' : '更新成功!'
            });
            this.onCancel();
            this.getAgingsList()
          } else {
            Message({
              type: 'error',
              message: '操作失败'
            });
          }
          this.addForm = cloneDeep(defaultFormData)
          this.loading = false
        } else {
          this.loading = false
          return false;
        }
      });
    }, 500)
  }

})
