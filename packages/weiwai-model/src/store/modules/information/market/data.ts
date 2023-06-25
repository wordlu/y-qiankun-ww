export const renderFrom: any = [
  {
    label: '任务日期:',
    key: 'taskDate',
    type: 'DatePicker',
    rowId: 1,
    span: 8
  },
  {
    label: '估值日期:',
    key: 'bizDate',
    type: 'DatePicker',
    rowId: 1,
    span: 8
  },
  {
    label: '接口类型:',
    key: 'type',
    type: 'Select',
    clearable: true,
    options: [],
    filterable: true,
    rowId: 1,
    filterMethod: true,
    reserveKeyword: true,
    span: 8
  },
  {
    label: '文件类型:',
    key: 'num',
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
    span: 8,
    children: [
      {
        label: '查询',
        btnShow: 82103,
        size: 'small',
        btnType: 'primary',
        onClick: (_: any, val: any, _this: any) => {
          _this.$refs.myForm.validate((valid: any) => {
            if (valid) {
              _this.$emit('inquire', val.initData)
            }
          })
        }
      },
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
const rules = {
  taskDate: [{ required: true, message: '请选择', trigger: 'blur' }],
  type: [{ required: true, message: '请选择', trigger: 'blur' }]
}
export const formData: any = {
  initData: initData(renderFrom),
  rules,
  maxRow: 1,
  maxCol: 2, //每行表单数
  isFoldRow: false,
  Folding: false,
  renderFrom: renderFrom
}

export const defaultProps = {
  label: 'name',
  children: 'children'
}

export const tableColumn = [
  { prop: 'typeName', label: '接口类型' },
  { prop: 'bizDate', label: '任务日期' },
  { prop: 'createTime', label: '导出时间' },
  { prop: 'createPrsn', label: '导出人' }
]
