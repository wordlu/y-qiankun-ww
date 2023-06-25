export const tableColumn: array = [
  {
    prop: "cSubjCode",
    label: "科目代码",
    type: "input",
    placeholder: "科目代码",
    tooltip: true,
    disabled: false,
    width: 96,
    isEdit: true,
    fieldProps: {
      clearable: true,
      maxlength: "10"
    },
    rules: [
      { required: true, message: "", trigger: ["blur",'change']},
    ],
  },
  {
    prop: "cSubjName",
    label: "科目名称",
    type: "input",
    placeholder: "科目名称",
    disabled: false,
    tooltip: true,
    width: 243,
    isEdit: true,
    fieldProps: {
      clearable: true,
      maxlength: "10"
    },
    rules: [
      { required: true, message: "", trigger: ["blur",'change']},
    ],
  },
  {
    prop: "mapType",
    label: "科目映射规则",
    isEdit: true,
    tooltip: true,
    dictShow: true,
    type: "select",
    options: [ ],
    disabled: false,
    width: 120,
  },
  {
    prop: "cSubjCls",
    label: "科目类别",
    dictShow: true,
    tooltip: true,
    isEdit: true,
    type: "select",
    options: [],
    disabled: false,
    width: 120,
  },
  {
    prop: "nWay",
    label: "余额方向",
    dictShow: true,
    isEdit: true,
    type: "select",
    options: [ ],
    disabled: false,
    width: 80,
  },
  {
    prop: "cCuryCode",
    dictShow: true,
    isEdit: true,
    label: "币种",
    type: "select",
    options: [],
    disabled: false,
    width: 80,
  },
  {
    prop: "isDetail",
    dictShow: true,
    isEdit: true,
    label: "明细科目",
    tooltip: true,
    type: "select",
    options: [],
    disabled: false,
    width: 80,
  },
  {
    prop: "pSubjCode",
    isEdit: true,
    label: "父级科目",
    tooltip: true,
    type: "input",
    placeholder: "科目代码",
    disabled: false,
    width: 100,
    fieldProps: {
      clearable: true,
      maxlength: "10"
    },
  },
  {
    prop: "nSubjLevel",
    isEdit: true,
    dictShow: true,
    label: "科目层级",
    type: "select",
    options: [],
    disabled: false,
    width: 80,
  },
  {
    prop: "isV",
    isEdit: true,
    label: "是否虚拟科目",
    dictShow: true,
    type: "select",
    options: [],
    disabled: false,
    width: 120,
  },
  {
    prop: "isSum",
    isEdit: true,
    label: "是否参与汇总",
    dictShow: true,
    type: "select",
    options: [],
    disabled: false,
    width: 120,
  },
  { prop: "checkName", label: "审核人", width: 75, tooltip: true,},
  { prop: "checkTime", label: "审核时间", width: 181,},
  { prop: "createPrsn", label: "创建人", width: 75, tooltip: true,},
  { prop: "createTime", label: "创建时间", width: 181,},
  { prop: "mdfyPrsn", label: "修改人", width: 75, tooltip: true,},
  { prop: "mdfyTime", label: "修改时间", width: 181,},
  { label: "操作",
    // btnShow 是否显示按钮
    btnShow: true,
    width: 119,
    fixed: 'right',
  },
]

const rules = {
  orgId: [{ required: true, message: '请选择机构', trigger: 'blur' }],
  subjSystem: [{ required: true, message: '请选择科目体系', trigger: 'blur' }]
}

// 表单
export const renderFrom: array = [
  {
    type: "Input",
    label: "科目代码:",
    clearable: true,
    key: "cSubjCode",
    rowId: 1,
    span: 6,
  },
  {
    type: "Input",
    label: "科目名称:",
    clearable: true,
    key: "cSubjName",
    rowId: 1,
    span: 6,
  },
  {
    label: "科目类别:",
    key: "cSubjCls",
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
    label: "机构名称:",
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
    label: "科目体系:",
    key: "subjSystem",
    type: "Select",
    clearable: true,
    options: [{
      "code": "0",
      "name": "默认科目体系",
    }],
    filterable: true,
    multiple: false,
    rowId: 1,
    filterMethod: true,
    reserveKeyword: true,
    span: 6,
  },
  {
    label: "审核状态:",
    key: "cChecked",
    type: "Select",
    clearable: true,
    options: [{
      code: '91440300708470788Q',
      name: '鹏华基金管理有限公司'
    }],
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
          _this.$refs.myForm.validate((valid: any) => {
            if (valid) {
              _this.$emit('inquire', val.initData)
            }
          })
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
  rules,
  maxRow: 1,
  maxCol: 4, //每行表单数
  isFoldRow: false,
  Folding: false,
  renderFrom: renderFrom,
};
