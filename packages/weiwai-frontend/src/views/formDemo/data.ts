export const renderFrom: any = [
  {
    label: "角色:",
    key: "startTime",
    type: "DatePicker",
    rowId: 1,
    span: 6,
  },
  // {
  //   label: "结束日期:",
  //   key: "endTime",
  //   type: "DatePicker",
  //   rowId: 1,
  //   span: 6,
  // },
  // {
  //   label: "登录名/用户姓名:",
  //   key: "code",
  //   type: "Select",
  //   clearable: true,
  //   options: [{
  //     code: '111',
  //     value: '123'
  //   }],
  //   filterable: true,
  //   multiple: false,
  //   rowId: 1,
  //   filterMethod: true,
  //   reserveKeyword: true,
  //   span: 6,
  // },
  // {
  //   type: "Input",
  //   label: "机构名称:",
  //   key: "name",
  //   rowId: 1,
  //   span: 6,
  // },
  // {
  //   type: "Input",
  //   label: "科目代码:",
  //   key: "code1",
  //   // labelWidth: 80,
  //   rowId: 1,
  //   span: 6,
  // },
  // {
  //   type: "Input",
  //   label: "科目名称:",
  //   key: "name1",
  //   rowId: 1,
  //   span: 6,
  // },
  // {
  //   type: "Input",
  //   label: "投资类型:",
  //   key: "type",
  //   rowId: 1,
  //   span: 6,
  // },
  // {
  //   type: "Input",
  //   label: "审核状态:",
  //   key: "checked",
  //   rowId: 2,
  //   span: 18,
  // },
  // {
  //   type: "Input",
  //   label: "审核状态:",
  //   key: "checked",
  //   rowId: 2,
  //   span: 18,
  // },
  {
    type: "Buttons",
    rowId: 2,
    span: 12,
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
        label: "全部展开",
        size: "small",
        btnShow: 82102,
        onClick: (_: any, val: any, _this: any) => {
          _this.$emit("deleteRole");
        },
      },
      {
        label: "重置",
        size: "small",
        btnShow: 82102,
        onClick: (_: any, val: any, _this: any) => {
          _this.$emit("deleteRole");
        },
      },
      {
        label: "解析后导出",
        size: "small",
        btnShow: 82102,
        onClick: (_: any, val: any, _this: any) => {
          _this.$emit("deleteRole");
        },
      },
      {
        label: "源文件导出",
        size: "small",
        btnShow: 82102,
        onClick: (_: any, val: any, _this: any) => {
          _this.$emit("deleteRole");
        },
      },
    ],
  },
];

export const renderFrom1: any = [
  {
    type: "Input",
    label: "登录名/用户姓名:",
    key: "name1",
    rowId: 1,
    span: 6,
  },
  {
    label: "开始日期:",
    key: "startTime",
    // labelWidth: 80,
    type: "DatePicker",
    rowId: 1,
    span: 6,
  },
  {
    label: "结束日期:",
    key: "endTime",
    type: "DatePicker",
    rowId: 1,
    span: 6,
  },
  {
    label: "角色编码3:",
    key: "code",
    type: "Select",
    clearable: true,
    options: [],
    filterable: true,
    multiple: true,
    rowId: 1,
    filterMethod: true,
    reserveKeyword: true,
    span: 6,
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

export const formData1: any = {
  initData: initData(renderFrom1),
  maxRow: 1, //定义表单行数，如某个表单单独占一行
  maxCol: 4, //每行表单数
  isFoldRow: false,
  Folding: false,
  renderFrom: JSON.parse(JSON.stringify(renderFrom1)),
};
