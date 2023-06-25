export const renderFrom: any = [
  {
    label: '工作流中文名:',
    key: 'wfName',
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
    label: '工作流地址:',
    key: 'wfId',
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
    label: '状态:',
    key: 'sta',
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
    label: '上级步骤:',
    key: 'wfDatatype',
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
    label: '业务属性:',
    key: 'wfAttr',
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
  { prop: 'wfName', label: '工作流中文名', width: '243' },
  { prop: 'wfId', label: '工作流地址' },
  { prop: 'wfDatatypeName', label: '上级步骤' },
  { prop: 'wfAttrName', label: '业务属性', width: '90' },
  { prop: 'wfMode', label: '工作流类型', width: '90' },
  {
    prop: 'sta',
    label: '状态',
    width: '90',
    dictCode: true,
    dict: [
      { code: 0, value: '禁用' },
      { code: 1, value: '启用' }
    ]
  },
  { label: '操作', btnShow: true, width: 120 }
]
