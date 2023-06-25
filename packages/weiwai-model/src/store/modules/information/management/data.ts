export const renderFrom: any = [
  {
    type: 'Input',
    label: '组合代码:',
    key: 'pfId',
    rowId: 1,
    span: 6
  },
  {
    type: 'Input',
    label: '组合名称:',
    key: 'pfName',
    rowId: 1,
    span: 6
  },
  {
    label: '投资管理人:',
    key: 'mngrId',
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
    label: '资产类型:',
    key: 'assetType',
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
    label: '审核状态:',
    key: 'cChecked',
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
    label: '持仓状态:',
    key: 'posState',
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
  renderFrom: renderFrom
}

export const tableColumn: any = [
  { prop: 'pfId', label: '组合代码', width: '96' },
  { prop: 'pfName', label: '组合名称', width: '243', tooltip: true },
  { prop: 'chgDate', label: '组合成立日期', width: '181' },
  { prop: 'endDate', label: '组合截止日期', width: '181' },
  { prop: 'mngrNm', label: '投资管理人', width: '243', tooltip: true },
  { prop: 'assetTypeNm', label: '资产类型', width: '90' },
  { prop: 'marketCode', label: '市场代码', width: '96' },
  { prop: 'marketCode2', label: '市场代码2', width: '96' },
  { prop: 'posStateName', label: '持仓状态', width: '90' },
  { prop: 'createPrsn', label: '创建人', width: '75' },
  { prop: 'mdfyPrsn', label: '修改人', width: '75' },
  { prop: 'checkName', label: '审核人', width: '75' },
  { label: '操作', btnShow: true, width: 120, fixed: 'right' }
]

export const tableColumnList: any = [
  {
    prop: 'extField',
    label: '扩展属性',
    type: 'select',
    width: 196,
    options: [],
    disabled: false,
    dictShow: true,
    dict: []
  },
  {
    prop: 'extFieldValue',
    label: '扩展值',
    type: 'input',
    placeholder: '请输入内容',
    disabled: false,
    width: 196,
    fieldProps: {
      clearable: true,
      maxlength: '10'
    },
    rules: [{ min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }]
  },
  {
    prop: 'extFieldNote',
    label: '备注',
    type: 'input',
    placeholder: '请输入内容',
    isEdit: true,
    fieldProps: {
      clearable: false,
      maxlength: '100',
      showWordLimit: false
    },
    rules: [{ min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }]
  }
]
export type Row = { extField: string; extFieldValue: string; extFieldNote: string }
export const defaultRow: Row = { extField: '', extFieldValue: '', extFieldNote: '' }
