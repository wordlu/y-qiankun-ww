import * as mock from "./mock";

const userList = [
  { id: 1, username: "admin", password: "123", cellPhone: "181" },
  { id: 2, username: "222", cellPhone: "222" }
];
const userData = [
  {
    id: 1,
    name: "王易",
    phone: "13590873847",
    path: [
      "/Dashboard",
      "/Dashboard/analyse",
      "/Dashboard/monitor",
      "/Dashboard/desk"
    ]
  },
  {
    id: 2,
    name: "赵散",
    phone: "13378643567",
    path: [
      "/user",
      "/form",
      "/list",
      "/detail",
      "/abnormal",
      "/personal",
      "/Dashboard/analyse",
      "/Dashboard/monitor",
      "/Dashboard/desk"
    ]
  },
  {
    id: 3,
    name: "刘司",
    phone: "15877658864",
    path: [
      "/user",
      "/form",
      "/list",
      "/detail",
      "/abnormal",
      "/personal",
      "/Dashboard/analyse",
      "/Dashboard/monitor",
      "/Dashboard/desk"
    ]
  },
  {
    id: 4,
    name: "张期",
    phone: "15177836698",
    path: [
      "/user",
      "/form",
      "/list",
      "/detail",
      "/abnormal",
      "/personal",
      "/Dashboard/analyse",
      "/Dashboard/monitor",
      "/Dashboard/desk"
    ]
  },
  {
    id: 5,
    name: "范午",
    phone: "15876543456",
    path: [
      "/user",
      "/form",
      "/list",
      "/detail",
      "/abnormal",
      "/personal",
      "/Dashboard/analyse",
      "/Dashboard/monitor",
      "/Dashboard/desk"
    ]
  },
  {
    id: 6,
    name: "李祺",
    phone: "13399876785",
    path: [
      "/user",
      "/form",
      "/list",
      "/detail",
      "/abnormal",
      "/personal",
      "/Dashboard/analyse",
      "/Dashboard/monitor",
      "/Dashboard/desk"
    ]
  }
];
export default {
  ...mock,
  "/example": "https://easy-mock.com/mock/5c36fa23c0fe6620a6a800be",
  "/api/array": [
    { name: "apple", value: 1.2 },
    { name: "orange", value: 0.95 }
  ],
  "/api/object": {
    shop: {
      taxPercent: 8,
      items: [{ name: "apple", value: 1.2 }, { name: "orange", value: 0.95 }]
    }
  },
  "/api/function": function(req, res) {
    res.end("Mock Function.");
  },
  "POST /api/login": function(req, res) {
    const requestBody = req.body;
    const {
      loginInfo: { username, password }
    } = requestBody;
    const checkRole = userList.filter(item => {
      return (
        (item.username === username || item.cellPhone === username) &&
        item.password === password
      );
    });
    if (checkRole.length) {
      res.json({ status: 200, allowPass: true });
    } else {
      res.json({ status: 1101, allowPass: false, error: "用户名或密码错误" });
    }
  },
  "POST /api/register": function(req, res) {
    const requestBody = req.body;
    const {
      registerInfo: { username, cellPhone }
    } = requestBody;
    const id = userList.length++;
    userList.push({ id, username: username || cellPhone, cellPhone });
    res.json({ status: 200, data: { userId: id, register: true } });
  },
  "POST /api/savePassWord": function(req, res) {
    const requestBody = req.body;
    const {
      data: { password, userId }
    } = requestBody;
    userList.map(item => {
      if (item.id === userId) item.password = password;
    });
    res.json({ status: 200 });
  },
  "POST /api/checkAuthority": function(req, res) {
    const requestBody = req.body;
    const {
      query: { value, name }
    } = requestBody;
    let checkRole = false;
    userData.filter(item => {
      checkRole = item.path.indexOf(value) > -1;
    });
    if (checkRole || name === "admin") {
      res.json({ status: 200, allowPass: true });
    } else {
      res.json({
        status: 403,
        allowPass: false,
        error: "您没有访问权限"
      });
    }
  }
};
