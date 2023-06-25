import lugiax from "@lugia/lugiax";
import { getMenuById, menu, getMenuType } from "@services/systemManage";
import { go, goBack } from "@utils/cusRouter";
import { message } from "@lugia/lugia-web";
import { fromJS } from "immutable";
import { getUrlParams } from "@utils/urlFunction";
import { getUserMenu, getAuthRoutes } from "@utils/localStorage";
import { dwFormValidate } from "@ysstech-data/validate-business";
let getMenuId = (menus, id, name) => {
  let pname = [];
  menus.forEach((item) => {
    if (item.id === id) {
      pname.push(item.name);
      window.localStorage.setItem("parentIdName", pname);
      return pname;
    } else {
      if (item.children && item.children.length > 0) {
        // 有子菜单
        getMenuId(item.children, id, name);
      }
    }
  });
};
export const formColumnInit = [
  {
    required: true,
    type: "select",
    label: "菜单类型",
    id: "type",
    field: "form.value.type",
    validateField: "form.validate.type",
    dataField: "form.data.typeOptions",
    validator: [],
  },
  {
    required: true,
    type: "treeSelect",
    label: "父菜单",
    id: "parentId",
    field: "form.value.parentId",
    validateField: "form.validate.parentId",
    dataField: "form.data.parentIdOptions",
    validator: [],
    props: {
      field: "parentId",
      placeholder: "请输入父菜单",
      displayField: "name",
      valueField: "id",
      translateTreeData: true,
      canSearch: true,
      expandAll: true,
      pathField: "__path",
      pidField: "pid",
      onlySelectLeaf: false,
    },
  },
  {
    required: true,
    type: "input",
    label: "菜单名称",
    id: "name",
    field: "form.value.name",
    validateField: "form.validate.name",
  },

  {
    required: true,
    type: "input",
    label: "权限标识",
    id: "permission",
    field: "form.value.permission",
    validateField: "form.validate.permission",
    visibleField: "form.visible.permission",
  },
  {
    required: true,
    type: "input",
    label: "路由路径",
    id: "path",
    field: "form.value.path",
    validateField: "form.validate.path",
    visibleField: "form.visible.path",
    validator: [],
  },
  {
    required: true,
    type: "select",
    label: "嵌入资源类型",
    id: "embedType",
    field: "form.value.embedType",
    validateField: "form.validate.embedType",
    dataField: "form.data.embedTypeOptions",
    visibleField: "form.visible.path",
    validator: [],
  },
  {
    required: true,
    type: "numberInput",
    label: "排序",
    id: "sort",
    field: "form.value.sort",
    validateField: "form.validate.sort",
    visibleField: "form.visible.path",
    validator: [],
    props: {
      min: 1,
    },
  },
  {
    required: false,
    type: "input",
    label: "图标",
    id: "icon",
    field: "form.value.icon",
    validateField: "form.validate.icon",
    visibleField: "form.visible.path",
    validator: [],
  },
];
const __LUGIAX_MODEL_DEFINE__ = "menuEdit";
const state = {
  initFrom: {
    name: "",
    parentId: "-1",
    parentIdName: ["根节点"], // 父菜单的displayValue
    path: "",
    sort: "" || 1,
    type: "0",
    embedType: "1", // 嵌入资源类型
    permission: "",
    icon: "",
    permission: "",
  },

  menuParams: {
    createTime: "",
    delFlag: "",
    icon: "",
    keepAlive: "",
    menuId: 0,
    name: "",
    parentId: 0,
    path: "",
    permission: "",
    sort: "",
    type: "",
    updateTime: "",
  },

  permissionState: false,
  preData: {},

  form: {
    value: {
      name: "", // 菜单名称
      parentId: "-1", // 父菜单id
      parentIdName: ["根节点"], // 父菜单的displayValue
      path: "", // 菜单路径
      sort: "" || 1, // 排序
      type: "0", // 类型
      embedType: "1", // 嵌入资源类型
      permission: "", // 菜单权限标识，菜单类型为按钮时，可填写，其他的情况disabled
      icon: "",
      permission: "",
    },
    data: {
      typeOptions: [
        {
          value: "0",
          text: "菜单",
        },
        {
          value: "1",
          text: "内嵌菜单",
        },
        {
          value: "5",
          text: "功能按钮",
        },
      ],
      parentIdOptions: [],
      embedTypeOptions: [
        {
          value: "1",
          text: "自有资源",
        },
        {
          value: "2",
          text: "iframe",
        },
        {
          value: "3",
          text: "连接",
        },
      ],
    },
    validate: {},
    visible: {
      permission: true,
      path: false,
    },
  },
  formColumns: formColumnInit,
};
export default lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state,
  mutations: {
    sync: {
      doReset(state, param, { mutations }) {
        const { preData, initFrom } = state.toJS();
        const type = getUrlParams(window.location.search).state;
        let parentIdName = window.localStorage.getItem("parentIdName");
        if (type === "add") {
          parentIdName = ["根节点"];
          state = mutations.changeType({ type: initFrom.type });
          state = state
            .setIn(["form", "value"], fromJS(initFrom))
            .set("parentIdName", fromJS(parentIdName));
        } else {
          state = mutations.changeType({ type: preData.type });
          state = state.setIn(["form", "value"], fromJS(preData));
        }
        if (preData.parentId === -1) {
          parentIdName = ["根节点"];
          state = state.set("parentIdName", fromJS(parentIdName));
        } else {
          state = state.set("parentIdName", fromJS(parentIdName));
        }
        return state;
      },
      back(state, params, { mutations, getState }) {
        const { data , form} = state.toJS()
        goBack();
        state = getState()
        .setIn(["form", "validate"], fromJS({}))
        return state

      },
      getMenu(state, param) {
        return state;
      },
      changeType(state, params, { mutations, getState }) {
        const { type } = params;
        if (type === "5") {
          state = getState()
            .setIn(["form", "visible", "path"], true)
            .setIn(["form", "visible", "permission"], false);
        } else {
          state = getState()
            .setIn(["form", "visible", "path"], false)
            .setIn(["form", "visible", "permission"], true);
        }
        return state;
      },
    },
    async: {
      async getRecord(state, { id }, { mutations, getState }) {
        const { initFrom } = state.toJS();
        const type = getUrlParams(window.location.search).state;
        let newState = getState();
        const param = {
          menuName: " ",
        };
        const menuTree = await menu(param);
        let tree = [
          {
            hasChildren: true,
            icon: "lugia-icon-financial_editor",
            label: "根节点",
            parentId: null,
            path: "/",
            permission: "",
            sort: 9999,
            spread: false,
            type: "0",
            key: -1,
            id: -1,
            name: "根节点",
            children: menuTree.data,
          },
        ];
        newState = newState.setIn(["form", "data", "parentIdOptions"], tree)
        if (!id || type === "add") {
          return newState
            .setIn(["form", "value"], fromJS(initFrom))
            .setIn(["form", "visible", "path"], false)
            .setIn(["form", "visible", "permission"], true);
        }

        const { data } = await getMenuById("GET", { menuId: id });
        data.parentId = data.parentId.toString();
        getMenuId(tree, data.parentId, data.name);
        let parentIdName = window.localStorage.getItem("parentIdName");
        // parentIdName = getMenuId(tree, data.parentId, data.name); 获取父菜单的名称
        if (data && data.parentId === -1) {
          parentIdName = ["根节点"];
        }
        newState = mutations.changeType({ type: data.type });
        newState = newState
          .setIn(["form", "value"], fromJS(data))
          .set("preData", fromJS(data))
          .setIn(["form", "data", "parentIdOptions"], tree)
          .setIn(["form", "parentIdName"], parentIdName)
        return newState;
      },
      async addRecord(state) {
        return state;
      },
      async saveRecord(state, param, { mutations, getState }) {
        const result = await dwFormValidate({
          mutations,
          param: {
            columnPath: "formColumns",
            dataPath: "form.value",
          },
        });

        if (result) {
          let newState = getState();
          let params = newState.getIn(["form", "value"]).toJS();
          let type = getUrlParams(window.location.search).state;
          // 获取到的parentId是数组？？
          for (const key in params) {
            if (params.hasOwnProperty(key) && key === "parentId") {
              params[key] = Array.isArray(params[key])
                ? params[key].join("")
                : params[key];
            }
          }
          if (type === "add") {
            getMenuById("POST", params).then((data) => {
              // message['success']('新增成功', 2);
              message.info(data.msg);
              if (data.code === 200) {
                goBack();
              }
            });
          } else {
            getMenuById("PUT", params).then((data) => {
              message.info(data.msg);
              if (data.code === 200) {
                goBack();
              }
            });
          }

          return state;
        }
      },
      async getMenuTypeList(state, params, { mutations, getState }) {
        const { data } = await getMenuType();
        return state.setIn(["form", "data", "typeOptions"], fromJS(data));
      },
    },
  },
});
