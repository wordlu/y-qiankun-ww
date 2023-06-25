import Mock from "mockjs";

/**
 * 生成数据列表
 */
const getInitData = () => {
  const dataDb = Mock.mock({
    "data|200-500": [{
      id: "@id",
      userCodeName: "@cname",
      emailUser: "@name",
      emailAddr: "@email",
      emailServerCodeName: "@mac",
      modifierName: "@name",
      modifyTime: "@date",
      email: "@email",
      emailServerCode: "@ip",
      emailPwd: "@guid",
      mac: "@mac",
      moTel: "0",
      passMark: "",
      "sex|0-1": 1,
      sexName: ["男", "女"],

      updatePsd: "@title",
      updateTime: "@date",
      userCode: "@guid",
      userJobNum: "",
      userLimit: "",
      "moneny|1-10000.1-3": 1,
      "monenyRich|1-10000.1-3": 1,
      "userName|1": ["张三", "李四"],
      userPwd: "@id",
      userSource: "@id",
      zipCode: "@id",
      name: "@name",
      value: "@id",
      label: "@name",
      address: "@region",
    }, ],
  });
  return {
    content: dataDb.data,
  };
};

Mock.setup({
  timeout: 1500, // 设置延迟响应，模拟向后端请求数据
});

// 查询接口--get
Mock.mock("/crud/query", "post", {
  code: "success",
  success: true,
  msg: "success",
  data: {
    content: getInitData().content,
    currentPage: 1,
    pageSize: 50,
    totalCount: 106,
  },
});
