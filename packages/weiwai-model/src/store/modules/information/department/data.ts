export const renderFrom: any = [
  {
    type: 'Input',
    label: '投顾机构代码:',
    key: 'orgId',
    rowId: 1,
    span: 6,
    placeholder: '投顾机构代码'
  },
  {
    type: 'Input',
    label: '投顾机构名称:',
    key: 'orgName',
    rowId: 1,
    span: 6,
    placeholder: '投顾机构名称'
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
  { prop: 'orgId', label: '投顾机构代码', tooltip: true,},
  { prop: 'orgName', label: '投顾机构名称', tooltip: true,},
  { prop: 'remark1', label: '备注1', tooltip: true },
  { prop: 'remark2', label: '备注2', tooltip: true },
  { prop: 'createPrsn', label: '创建人',  },
  { prop: 'createTime', label: '创建时间' },
  { label: '操作', btnShow: true,  }
]
