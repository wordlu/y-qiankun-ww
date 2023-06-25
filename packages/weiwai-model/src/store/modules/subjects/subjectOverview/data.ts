export const tableColumn: array = [
  { prop: "orgName", label: "管理机构", },
  { prop: "subjSystem1", label: "科目体系1", },
  { prop: "subjSystem2", label: "科目体系2", },
  { prop: "subjSystemCode", label: "科目体系3", },
  {
    statusShow: true,
    label: "状态",
    width: 90,
    align: "center",
  },
]

// 表单
export const renderFrom: array = [
  {
    label: "管理机构:",
    key: "orgId",
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
