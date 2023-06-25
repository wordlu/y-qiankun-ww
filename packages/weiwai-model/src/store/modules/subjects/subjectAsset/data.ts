//左侧抽屉中的列表数据
export const tableColumnList = [
  {
    prop: 'sAssetCode',
    label: '资产代码',
    tooltip: true,
    width: 96,
    isEdit: false,
  },
  {
    prop: 'sAssetName',
    tooltip: true,
    label: '资产名称',
    width: 243,
    isEdit: false,
  },
  {
    prop: 'sMktName',
    label: '市场',
    tooltip: true,
    isEdit: false,
  },
  {
    prop: 'sAssetType',
    label: '资产类型',
    tooltip: true,
    isEdit: false,  
  },
]

export const tableColumn: array = [
  { prop: "assetCode", label: "资产代码", width: 96, tooltip: true},
  { prop: "assetName", label: "资产名称", width: 243,tooltip: true},
  { prop: "assetType", label: "资产大类", width: 100, tooltip: true},
  { prop: "mktCode", label: "市场" },
  { prop: "sAssetCode", label: "标准代码", width: 96, tooltip: true},
  { prop: "sAssetName", label: "标准名称", width: 243, tooltip: true},
  { prop: "sAssetType", label: "标准大类", width: 120, tooltip: true},
  { prop: "sMktCode", label: "标准市场" },
  { prop: "orgId", label: "机构代码", width: 96,tooltip: true},
  { prop: "orgName", label: "机构名称", width: 243,tooltip: true},
  { prop: "pfId", label: "专户代码", width: 96,tooltip: true},
  { prop: "pfName", label: "专户名称", width: 243,tooltip: true},
  { prop: "isValidName", label: "映射状态", width: 90},
  { prop: "createPrsn", label: "创建人", tooltip: true, width: 75},
  { prop: "mdfyPrsn", label: "修改人", tooltip: true, width: 75},
  { prop: "checkName", label: "审核人", tooltip: true, width: 75},
  { label: "操作",
    // btnShow 是否显示按钮
    btnShow: true,
    width: 119,
    fixed: 'right',

  },
]

// 表单
export const renderFrom: array = [
  {
    type: "Input",
    label: "资产名称(代码):",
    clearable: true,
    key: "assetName",
    rowId: 1,
    span: 6,
  },
  {
    label: "资产大类:",
    key: "assetType",
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
    label: "审核状态:",
    key: "cChecked",
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
    label: "映射状态:",
    key: "isValid",
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
