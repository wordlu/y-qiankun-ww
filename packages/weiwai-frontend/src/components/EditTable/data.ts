export type Row = { text: string; name: string; age: string };

export type SelectOption = { value: string; label: string };

export const defaultRow: Row = { text: "", name: "", age: "" };

export const tableColumnList = [
  {
    prop: "text",
    label: "扩展属性",
    type: "select",
    options: [
      {
        value: "黄金糕",
        label: "黄金糕",
      },
      {
        value: "双皮奶",
        label: "双皮奶",
      },
      {
        value: "蚵仔煎",
        label: "蚵仔煎",
      },
      {
        value: "龙须面",
        label: "龙须面",
      },
      {
        value: "北京烤鸭",
        label: "北京烤鸭",
      },
    ],
    disabled: false,
    width: 240,
    rules: [
      { required: true, message: "请选择", trigger: "blur" },
    ],
  },
  {
    prop: "name",
    label: "扩展属性",
    type: "input",
    placeholder: "请输入内容",
    disabled: false,
    width: 240,
    fieldProps: {
      clearable: true,
      maxlength: "10"
    },
    rules: [
      { required: true, message: "请输入内容", trigger: ["blur", 'change'] },
      { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
    ],
  },
  {
    prop: "age",
    label: "扩展属性2",
    type: "input",
    placeholder: "请输入内容",
    isEdit: true,
    width: 240,
    fieldProps: {
      clearable: false,
      maxlength: "100",
      showWordLimit: false
    },
    rules: [{ required: true, message: "请输入", trigger: "blur" }],
  },
];
