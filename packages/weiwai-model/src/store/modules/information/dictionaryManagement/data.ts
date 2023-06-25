import cloneDeep from 'lodash/cloneDeep'
import router from 'vue-router'
export const renderFrom: any = [
  {
    label: '分类代码:',
    key: 'classId',
    type: 'Select',
    clearable: true,
    options: [],
    filterable: true,
    rowId: 1,
    filterMethod: true,
    reserveKeyword: true,
    span: 6
  },
  {
    label: '分类名称:',
    key: 'dicClassName',
    type: 'Select',
    clearable: true,
    options: [],
    filterable: true,
    rowId: 1,
    filterMethod: true,
    reserveKeyword: true,
    span: 6
  },
  {
    label: '分类英文名:',
    key: 'classEname',
    type: 'Select',
    clearable: true,
    options: [],
    filterable: true,
    rowId: 1,
    filterMethod: true,
    reserveKeyword: true,
    span: 6
  },
  {
    type: 'Buttons',
    span: 6,
    rowId: 2,
    children: [
      {
        label: '查询',
        btnShow: 82103,
        size: 'small',
        btnType: 'primary',
        onClick: (_: any, val: any, _this: any) => {
          _this.$emit('inquire', val.initData)
        }
      },
      {
        label: '重置',
        size: 'small',
        btnShow: 82102,
        onClick: (_: any, val: any, _this: any) => {
          _this.$emit('reset', val.initData)
          val.initData = initData(renderFrom)
        }
      }
    ]
  }
]

export const initData = (ary: any) => {
  const data: any = {}
  ary.forEach((element: any) => {
    if (!['Buttons', 'Button'].includes(element.type)) {
      data[element.key] = element.initValue || ''
    }
  })
  return data
}

export const formData: any = {
  initData: initData(renderFrom),
  maxRow: 1,
  maxCol: 4, //每行表单数
  isFoldRow: false,
  Folding: false,
  renderFrom: cloneDeep(renderFrom)
}

export const tableColumn: any = [
  { prop: 'classId', label: '分类代码', width: '98' },
  { prop: 'dicClassName', label: '分类名称', width: '243' },
  { prop: 'classEname', label: '分类英文名称', width: '243' },
  { prop: 'keyId', label: '键值代码', width: '98' },
  { prop: 'keyName', label: '键值名称', width: '243' },
  { prop: 'keyEname', label: '键值英文名称', width: '243' },
  {
    prop: 'state',
    label: '状态',
    width: '90',
    dictCode: true,
    dict: [
      { code: 1, value: '启用' },
      { code: 0, value: '禁用' }
    ]
  },
  { prop: 'createTime', label: '创建/更新时间', width: '181' },
  { prop: 'memo', label: '备注', tooltip: true, sortable: true, width: '175' },
  {
    label: '操作',
    // btnShow 是否显示按钮
    btnShow: true,
    width: 120,
    fixed: 'right'
  }
]
export const tableColumnTwo: any = [
  { prop: 'keyId', label: '键值代码', tooltip: true },
  { prop: 'keyName', label: '键值名称' },
  { prop: 'keyEname', label: '键值英文名称' },
  {
    prop: 'state',
    label: '状态',
    dictCode: true,
    dict: [
      { code: 1, value: '启用' },
      { code: 0, value: '禁用' }
    ]
  },
  { prop: 'createTime', label: '创建/更新时间' }
]
//左侧抽屉中的列表数据
export const tableColumnList = [
  {
    prop: 'extend',
    label: '扩展属性',
    type: 'select',
    width: 196,
    options: [
      {
        value: '黄金糕',
        label: '黄金糕'
      },
      {
        value: '双皮奶',
        label: '双皮奶'
      },
      {
        value: '蚵仔煎',
        label: '蚵仔煎'
      },
      {
        value: '龙须面',
        label: '龙须面'
      },
      {
        value: '北京烤鸭',
        label: '北京烤鸭'
      }
    ],
    disabled: false,
    rules: [{ required: true, message: '请选择', trigger: 'blur' }]
  },
  {
    prop: 'extendVal',
    label: '扩展值',
    type: 'input',
    placeholder: '请输入内容',
    disabled: false,
    width: 196,

    fieldProps: {
      clearable: true,
      maxlength: '10'
    },
    rules: [
      // { required: true, message: '请输入内容', trigger: ['blur', 'change'] },
      { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
    ]
  },
  {
    prop: 'remarks',
    label: '备注',
    type: 'input',
    placeholder: '请输入内容',
    isEdit: true,
    fieldProps: {
      clearable: false,
      maxlength: '100',
      showWordLimit: false
    },
    width: 294,
    rules: [{ min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }]
  }
]

export type Row = { extend: string; extendVal: string; remarks: string }

export const defaultRow: Row = { extend: '', extendVal: '', remarks: '' }

//列表的数据
