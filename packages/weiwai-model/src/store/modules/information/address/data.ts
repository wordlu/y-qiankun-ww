export const renderFrom: any = [
  {
    type: 'Input',
    label: '联系人:',
    key: 'contacts',
    rowId: 1,
    span: 6
  },
  {
    label: '机构名称:',
    key: 'orgName',
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
  renderFrom: renderFrom
}

export const tableColumn: any = [
  { prop: 'orgId', label: '机构代码', width: '96', tooltip: true },
  { prop: 'orgName', label: '机构名称', width: '243' },
  { prop: 'job', label: '职务', width: '150' ,tooltip: true},
  { prop: 'contacts', label: '联系人', width: '75' },
  { prop: 'tel', label: '联系方式', width: '150' },
  { prop: 'tel1', label: '联系方式2', width: '150' },
  { prop: 'mail', label: '电子邮箱', width: '150' },
  {
    prop: 'isValid',
    label: '是否有效',
    width: '90',
    dictCode: true,
    dict: [
      { code: 1, value: '启用' },
      { code: 0, value: '禁用' }
    ]
  },
  { prop: 'createTime', label: '创建/更新时间', width: '181' },
  { prop: 'memo', label: '备注', tooltip: true ,width:'200'},
  {
    label: '操作',
    // btnShow 是否显示按钮
    btnShow: true,
    width: 120,
    fixed: 'right'
  }
]
export const tableColumnTwo: any = [
  { prop: 'orgName', label: '机构名称', width: '100', tooltip: true },
  { prop: 'contacts', label: '联系人', width: '200' },
  { prop: 'job', label: '职务', width: '200' },
  { prop: 'tel', label: '联系方式', width: '200' },
  { prop: 'mail', label: '电子邮箱', width: '200' },
  {
    prop: 'isValid',
    label: '是否有效',
    width: '200',
    dictCode: true,
    dict: [
      { code: 1, value: '启用' },
      { code: 0, value: '禁用' }
    ]
  },
  { prop: 'createTime', label: '创建/更新时间', width: '200' }
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
      { required: true, message: '请输入内容', trigger: ['blur', 'change'] },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
    rules: [{ required: true, message: '请输入', trigger: 'blur' }]
  }
]

export type Row = { extend: string; extendVal: string; remarks: string }

export const defaultRow: Row = { extend: '', extendVal: '', remarks: '' }

//列表的数据
