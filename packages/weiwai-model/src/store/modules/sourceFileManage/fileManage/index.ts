import { defineStore } from "pinia";

import { cloneDeep, debounce } from 'lodash';
import { formatSelectOption, downloadFile } from "../../../../utils/utils";

import { Message, MessageBox } from 'element-ui'
//test
import { FactoryApi } from '@services/factoryApi'
import { ServiceFileControllerApi, ServiceDictControllerApi } from '@services/weiwai'

const api = FactoryApi.createAPIInstance(ServiceFileControllerApi)
const dicApi = FactoryApi.createAPIInstance(ServiceDictControllerApi)


export const tableColumn: any = [
  { prop: "filePath", label: "文件路径", tooltip: true, width: 1014 },
  { prop: "fileDate", label: "文件更新日期", tooltip: true },
  { label: "操作", btnShow: true, width: 150, fixed: 'right' },
]

export const renderFrom: any = [
  {
    label: "文件类型",
    key: "fileType",
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
    label: "文件路径",
    key: "filePath",
    type: "Input",
    clearable: true,
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
  file: [],
  fileName: '',
  filePath: '',
  fileType: ''
}

export const useFileManageStore = defineStore('fileManage', {
  state: () => ({
    searchFormData: formData,
    pageInfo: {
      startPage: 1,
      pageSize: 20
    },
    pathList: [],
    tableData: {},
    tableLoading: false,
    tableColumn,
    selectable: [],
    drawerTitle: '上传',
    loading: false,
    drawerVisible: false,
    addForm: cloneDeep(defaultFormData),
    rules: {
      fileType: { required: true, message: '请输入', trigger: 'change' },
      file: { required: true, message: '请选择文件', trigger: 'change' }
    },
    dialogVisible: false,
    searchForm: {}
  }),
  actions: {
    async init() {
      // 文件路径 select options
      const { data: res } = await api.filesPathListPost()
      this.pathList = res?.data || []

      //默认选中全部
      // this.searchFormData.initData.fileType = 'ALL'

      // 文件类型 select options
      const { data: dicRes } = await dicApi.dicAllByClassIdPost({ classId: "WJ_GL" })
      this.searchFormData.renderFrom.forEach((item: any) => {
        if (item.key === 'fileType') {
          item.options = formatSelectOption(dicRes?.data, { label: 'keyName', value: 'keyId', })
        }
      });
    },
    async getFileLists() {
      const params = { ...this.searchFormData.initData, ...this.searchForm, ...this.pageInfo };
      this.tableLoading = true;
      const { data: res } = await api.filesGetFileListPost(params);
      if (res && res?.success) {
        this.tableData = res
      }
      this.tableLoading = false;
    },
    inquire: debounce(function (val: any) {
      this.searchForm = val;
      this.getFileLists()
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
    onDelete(row: any) {
      MessageBox.confirm('确定要删除内容吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'globalMessageDel'
      }).then(async () => {
        const { data: res } = await api.filesDeleteFilePost({ id: row.id, fileName: row.fileName, rootPath: row.rootPath });
        if (res && res?.success) {
          Message({
            type: 'success',
            message: '删除成功!'
          });
          this.getFileLists()
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
      const { data: res } = await api.filesDownVailePost({ fileName: row.fileName, rootPath: row.rootPath })
      if (res && res?.success) {
        const res = await api.filesDownloadFilePost({ fileName: row.fileName, rootPath: row.rootPath }, { responseType: 'blob' })
        downloadFile(res)
      } else {
        Message({
          type: 'error',
          message: res?.message || '文件不存在'
        });
      }
    }, 500),
    onChangUpload(file: any, fileList: any) {
      this.addForm.file = [...fileList];
      this.addForm.fileName = file.name;
    },
    onExceed(files: any) {
      const name = files[0].name || '';
      this.addForm.file = [{ raw: files[0], name }]
      this.addForm.fileName = name;
    },
    onRemove() {
      this.addForm.file = []
      this.addForm.fileName = '';
    },
    //上传
    handleUpload(ref: any) {
      this.drawerVisible = true;
      this.addForm = { ...cloneDeep(defaultFormData), fileType: ref.useData?.initData?.fileType };
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
          let { file, fileType, filePath }: any = this.addForm

          this.loading = true;

          file = file[0].raw || '';

          const { data: res } = await api.filesUploadFilePost(fileType, file, filePath)

          if (res && res?.success) {
            Message({
              type: 'success',
              message: '上传成功!'
            });
            this.onCancel();
            this.getFileLists()
          } else {
            Message({
              type: 'error',
              message: '上传失败'
            });
          }
          this.addForm = cloneDeep(defaultFormData)
          this.loading = false
        } else {
          this.loading = false
          return false;
        }
      });
    }, 500),
    showUpload(ref: any,): boolean {
      //文件类型 === '手工'，显示上传
      ref?.tableRef?.getHeight();
      const { fileType } = ref?.searchRef?.useData?.initData || {};
      return fileType === "MANUAL";
    }
  }
})
