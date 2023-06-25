export const renderFrom: any = [
  {
    type: 'Input',
    label: '机构名称:',
    key: 'orgName',
    rowId: 1,
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
  { prop: 'orgName', label: '机构名称', width: '243', tooltip: true },
  { prop: 'orgSname', label: '机构简称', width: '100' },
  { prop: 'orgCode', label: '统一社会信用代码', width: '200' },
  { prop: 'note1', label: '财汇代码', width: '96' },
  { prop: 'checkName', label: '审核人', width: '75' },
  { prop: 'mdfyPrsn', label: '修改人', width: '75' },
  { prop: 'createPrsn', label: '创建人', width: '75' },
  { prop: 'createTime', label: '创建时间', width: '181' },
  { prop: 'note2', label: '备注' },
  {
    label: '操作',
    // btnShow 是否显示按钮
    btnShow: true,
    width: 120,
    fixed: 'right'
  }
]

//左侧抽屉中的列表数据
export const tableColumnList: any = [
  {
    prop: 'extend',
    label: '扩展属性',
    type: 'select',
    dictShow: true,
    dict: [
      { code: 'ext1', value: '属性1' },
      { code: 'ext2', value: '属性2' },
      { code: 'FILEMODE', value: '接受方式' }
    ],
    options: [],
    disabled: false,
    rules: [{ required: true, message: '请选择', trigger: 'blur' }]
  },
  {
    prop: 'extendVal',
    label: '扩展值',
    type: 'input',
    placeholder: '请输入内容',

    fieldProps: {
      clearable: true,
      maxlength: '10'
    },
    rules: [{ min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }]
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
    rules: [{ min: 1, max: 200, message: '长度在 2 到 300 个字符', trigger: 'blur' }]
  }
]

export type Row = { extend: any; extendVal: any; remarks: any }

export const defaultRow: Row = { extend: '', extendVal: '', remarks: '' }

//列表的数据
