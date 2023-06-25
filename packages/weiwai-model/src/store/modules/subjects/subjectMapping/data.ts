export const renderFrom: any = [
  {
    label: '标准科目体系:',
    key: 'subjSystem',
    type: 'Select',
    clearable: true,
    options: [],
    filterable: true,
    rowId: 1,
    filterMethod: true,
    reserveKeyword: true,
    span: 8,
  },
  {
    label: '机构名称:',
    key: 'orgId',
    type: 'Select',
    clearable: true,
    options: [{
      code: '123',
      name: '机构名称'
    }],
    filterable: true,
    rowId: 1,
    filterMethod: true,
    reserveKeyword: true,
    span: 8
  },
  {
    label: '科目层级:',
    key: 'nSubjLevel',
    type: 'Select',
    clearable: true,
    options: [{
      code: '1',
      name: '一级'
    }],
    filterable: true,
    rowId: 1,
    filterMethod: true,
    reserveKeyword: true,
    span: 8
  },
  {
    label: '审核状态:',
    key: 'cChecked',
    type: 'Select',
    clearable: true,
    options: [
      { code: 1, name: '单文件' },
      { code: 2, name: '多文件' }
    ],
    filterable: true,
    rowId: 1,
    filterMethod: true,
    reserveKeyword: true,
    span: 8
  },
  {
    type: 'Buttons',
    rowId: 2,
    span: 16,
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
        label: "重置",
        size: "small",
        btnShow: 82102,
        onClick: (_: any, val: any, _this: any) => {
          val.initData = initData(renderFrom)
          _this.$emit('reset')
        },
      },
    ]
  },
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

export const defaultProps = {
  children: "children",
  label: "menuHead",
}

export const tableColumn = [
  { prop: 'orgName', label: '机构名称', width: 243, tooltip: true },
  { prop: 'cSubjCode', label: '科目代码', width: 96, tooltip: true },
  { prop: 'cSubjName', label: '科目名称', width: 243, tooltip: true },
  {
    statusShow: true,
    label: "状态",
    tooltip: true,
    width: 90,
    align: "center",
  },
  { prop: 'cSubjCodeBz', label: '对应标准科目代码', width: 140, tooltip: true },
  { prop: 'cSubjNameBz', label: '对应标准科目名称', width: 243, tooltip: true },
  { prop: 'subjSystemBz', label: '对应标准科目体系', width: 140, tooltip: true },
  { prop: 'nSubjLevelName', label: '科目层级',width:150 },
  { prop: 'checkName', label: '审核人',width:75 },
  { prop: 'checkTime', label: '审核时间',width:181 },
  { prop: 'mdfyPrsn', label: '修改人',width:75 },
  { prop: 'mdfyTime', label: '修改时间',width:181 },
  { label: "操作",
    // btnShow 是否显示按钮
    btnShow: true,
    width: 119,
    fixed: 'right',
  },
]
