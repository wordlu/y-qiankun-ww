import lugiax from "@lugia/lugiax";
import { Modal, message } from "@lugia/lugia-web";
import { menu, menuDelete, menuDeleteBatch } from "@services/systemManage";
import { fromJS } from "immutable";
import { go } from "@utils/cusRouter";
import { setUserMenu } from "@utils/localStorage";
import { getMenuId } from "@utils";
import { getPermissions } from "../utils";
import { btnsClickEvent } from "../utils/btnsClickEvent";
const permissions = getPermissions();
let getMenu = (menus) => {
  return menus.map((item) => {
    item.key = item.id;
    if (item.children && item.children.length > 0) {
      // 有子菜单
      getMenu(item.children);
    } else {
      delete item.children;
    }
    return item;
  });
};
const __LUGIAX_MODEL_DEFINE__ = "menuManage";
const state = {
  current: 1,
  pageSize: 10,
  total: 1000,
  table: [],
  columns: [
    {
      key: "name",
      title: "菜单名称",
      dataIndex: "name",
      width: 120,
      align: "left",
      showEllipsis: false,
    },
    {
      key: "path",
      title: "路径",
      dataIndex: "path",
      width: 200,
      align: "left",
      showEllipsis: false,
    },
    {
      key: "menuType",
      title: "菜单类型",
      dataIndex: "menuType",
      width: 100,
      align: "left",
      showEllipsis: true,
    },
  ],
  totalText: "共计0条记录",
  selected: [],
  menuName: "",
  btns: [
    {
      title: "新增",
      eventsName: "add",
      type: "primary",

      btnProps: {
        permissionId: "sysManage_menuManage_add",
        permissions: permissions,
        icon: "lugia-icon-reminder_plus",
      },
    },
    {
      title: "删除",
      eventsName: "asyncDeleteSelected",
      btnProps: {
        permissionId: "sysManage_menuManage_del",
        permissions: permissions,
      },
    },
  ],
};
export default lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state,
  mutations: {
    sync: {
      btnsClickEvent,
      resetQuery(state) {
        state = state.set("menuName", "");
        return state;
      },
      add(state) {
        go({ url: "/systemManage/menuManage/menuEdit?state=add" });
        return state;
      },
      onSelected(state, param) {
        let { events = [] } = param;
        let [selectKeys = [], menus = []] = events;
        let menuIds = getMenuId(menus, selectKeys);
        console.log(events, menuIds);
        selectKeys = [...new Set(menuIds)];
        console.log("selectKeys:", selectKeys);
        return state.set("selected", selectKeys);
      },
    },
    async: {
      async deleteSelected(state, param, { mutations }) {
        const selected = state.get("selected");
        if (!selected.length) {
          message["error"]("请选择至少一条记录", 3);
          return;
        }
        let params = {
          menuIds: selected.join(","),
        };
        Modal.confirm({
          title: "删除提示",
          content: "您将删除选中的记录，是否确认？",
          onOk: () => {
            menuDeleteBatch(params)
              .then((data) => {
                message["success"](data.msg, 2);
                mutations.asyncQuery(state);
              })
              .catch((err) => {
                console.log(err);
              });
          },
          okButtonProps: { type: "danger" },
        });

        return state;
      },
      async onDelete(state, param, { mutations }) {
        const { events = [] } = param;
        const [text, record] = events;
        const { id } = record;
        menuDelete({ id: id }).then((data) => {
          message["success"](data.msg, 2);
          mutations.asyncQuery(state);
        });
        return state;
      },
      async onEdit(state, param) {
        const { events = [] } = param;
        const [text, record] = events;
        const { id } = record;
        go({ url: `/systemManage/menuManage/menuEdit?state=edit&id=${id}` });
        return state;
      },
      async onView(state, param) {
        const { events = [] } = param;
        const [text, record] = events;
        const { key } = record;
        console.info("查看", record);
        return state;
      },
      async query(state) {
        const newTotal = 100;
        let states = state;
        let param = {
          menuName: state.get("menuName").replace(/\s*/g, "") || " ",
        };
        const data = await menu(param);
        let menuTree = data.data;
        let menus = getMenu(menuTree);
        console.log("menus", menus);
        if (menus) {
          return states
            .set("table", fromJS(menus))
            .set("total", newTotal)
            .set("selected", fromJS([]));
        } else {
          return states;
        }
      },
      async onChangePage(state, param) {
        const { events } = param;
        const [event] = events;
        const { current, pageSize, total } = event;
        state = state.set("current", current);
        state = state.set("pageSize", pageSize);
        state = state.set("selected", fromJS([]));
        return state;
      },
    },
  },
});
