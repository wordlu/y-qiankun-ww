export const tableColumn: array = [
  { prop: "orgName", label: "机构名称", width: 243, tooltip: true},
  { prop: "subjSystem", label: "科目体系", width: 100,tooltip: true},
  { prop: "cSubjCode", label: "科目代码", width: 96, tooltip: true},
  { prop: "cSubjName", label: "科目名称", width: 243, tooltip: true},
  { prop: "subjCode", label: "成本科目代码", width: 110, tooltip: true},
  { prop: "subjName", label: "成本科目名称", width: 243, tooltip: true},
  { prop: "assetTypena", label: "投资类别", width: 150, tooltip: true},
  { prop: "validName", label: "数据状态", width: 90 },
  { prop: "createPrsn", label: "修改人", width: 75 },
  { prop: "checkName", label: "审核人", width: 75},
  { prop: "remarke", label: "备注", width: 175, tooltip: true},
  { label: "操作",
    // btnShow 是否显示按钮
    btnShow: true,
    width: 119,
    fixed: 'right'
  },
]

// 表单
export const renderFrom: array = [
  {
    label: "机构名称:",
    key: "orgId",
    type: "Select",
    clearable: true,
    options: [{
      code: '111',
      value: '123'
    }],
    filterable: true,
    multiple: false,
    rowId: 1,
    filterMethod: true,
    reserveKeyword: true,
    span: 6,
  },
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
    clearable: true,
    label: "科目名称:",
    key: "cSubjName",
    rowId: 1,
    span: 6,
  },
  {
    label: "投资类型:",
    key: "assetType",
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
    label: "审核状态:",
    key: "cChecked",
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
