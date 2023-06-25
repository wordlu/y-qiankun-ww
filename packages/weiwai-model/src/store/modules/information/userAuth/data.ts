export const tableColumn: array = [
  { prop: "userName", label: "用户名称" },
  { prop: "userLoginCode", label: "登录名称", },
  // { 
  //   prop: "authSta", 
  //   label: "是否授权", 
  //   dictCode: true,
  //   dict: [
  //     { code: '1', value: "未授权" },
  //     { code: '2', value: "已授权(已审核)" },
  //     { code: '3', value: "已授权(未审核)" },
  //   ]
  // },
  {
    statusShow: true,
    label: "是否授权",
    width: 150,
    align: "center",
  },
  { prop: "mdfyPrsn", label: "授权人", },
  { prop: "mdfyTime", label: "授权时间", },
  { prop: "checkerName", label: "审核人", },
  { label: "操作",
    // btnShow 是否显示按钮
    btnShow: true,
  },
]

export const renderFrom: array = [
  {
    type: "Input",
    label: "用户名称:",
    key: "userName",
    clearable: true,
    rowId: 1,
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
