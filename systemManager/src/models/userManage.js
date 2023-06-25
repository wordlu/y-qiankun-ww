import lugiax from "@lugia/lugiax";
import { Modal, message } from "@lugia/lugia-web";
import { go } from "@utils/cusRouter";
import { fromJS } from "immutable";
import {
  userSelectAll,
  userPage,
  user,
  userDeleteBatch,
  updateUserPassword,
} from "@services/systemManage";
import { pageSizeOption } from "../enums/common";
import { getPermissions, resetOperation, inTimeSetOperation } from "../utils";
import { btnsClickEvent } from "../utils/btnsClickEvent";
import { getTableOperationPermissionResult } from "@ysstech-data/data-web/dist/permissions-hoc/utils";
import permissionsModel from './permissions';

const { permissions } = permissionsModel.getState().toJS();
const operation = [
  {
    text: "重置密码",
    eventType: "onInitPassWord",
    permissionId: "sysManage_userManage_initPwd",
  },
  {
    text: "授权",
    eventType: "onAuthorize",
    permissionId: "sysManage_userManage_authorize",
  },
  { text: "查看", eventType: "onView" },
  {
    text: "修改",
    eventType: "onEdit",
    permissionId: "sysManage_userManage_add",
  },
  {
    text: "删除",
    eventType: "onDelete",
    permissionId: "sysManage_userManage_del",
  },
];

const __LUGIAX_MODEL_DEFINE__ = "userManage";

const state = {
  batons: [
    {
      title: "新增",
      eventsName: "add",
      type: "primary",

      btnProps: {
        permissionId: "sysManage_userManage_add",
        permissions: permissions,
        icon: "lugia-icon-reminder_plus",
      },
    },
    {
      title: "删除",
      eventsName: "asyncDeleteSelected",
      btnProps: {
        permissionId: "sysManage_userManage_del",
        permissions: permissions,
      },
    },
  ],
  current: 1,
  pageSize: 10,
  total: 1000,
  table: [],
  columns: [
    {
      key: "rowNum",
      title: "序号",
      dataIndex: "rowNum",
      width: 80,
      align: "left",
      showEllipsis: false,
    },
    {
      key: "loginName",
      title: "登录账号",
      dataIndex: "loginName",
      width: 100,
      align: "left",
      showEllipsis: false,
    },
    {
      key: "username",
      title: "用户名",
      dataIndex: "username",
      width: 100,
      align: "left",
      showEllipsis: true,
    },
    {
      key: "phone",
      title: "手机号",
      dataIndex: "phone",
      width: 100,
      align: "left",
      showEllipsis: true,
    },
    {
      key: "roles",
      title: "用户角色",
      dataIndex: "roles",
      width: 200,
      align: "left",
      showEllipsis: true,
    },
    {
      key: "createTime",
      title: "创建时间",
      dataIndex: "createTime",
      width: 140,
      align: "left",
      showEllipsis: true,
    },
    {
      key: "updateTime",
      title: "修改时间",
      dataIndex: "updateTime",
      width: 140,
      align: "left",
      showEllipsis: false,
    },
  ],
  totalText: "共计0条记录",
  userName: "",
  selected: [],
  operation: getTableOperationPermissionResult(operation),
  showCheckbox: true,
  operationWidth: 260,
  pagination: {
    total: 10,
    pageNum: 1,
    pageSize: 15,
  },
  pageSizeOption,
};

export default lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state,
  mutations: {
    sync: {
      btnsClickEvent,
      resetQuery(state, params, { mutations }) {
        btnsClickEvent(state, params, { mutations });
        state = state.set("userName", "");
        return state;
      },
      resetSearchQuery(state, params, { mutations }) {
        state = state.set("userName", "");
        return state;
      },
      add(state) {
        go({ url: "/systemManage/userManage/userManageEdit?state=add" });
        return state;
      },
      onSelected(state, param) {
        const { events = [] } = param;
        const [seleckKeys = []] = events;
        return state.set("selected", seleckKeys);
      },
      onExpand(state, params, { mutations, getState }) {
      },
    },
    inTime: {
      ...inTimeSetOperation
    },
    async: {
      // 批量删除
      async deleteSelected(state, param, { mutations }) {
        const selected = state.get("selected");
        if (!selected.length) {
          message["error"]("请选择至少一条记录", 3);
          return;
        }
        let params = {
          userIds: selected.join(","),
        };
        Modal.confirm({
          title: "删除提示",
          content: "您将删除选中的记录，是否确认？",
          onOk: () => {
            userDeleteBatch(params)
              .then((data) => {
                if (data.code === 200) {
                  mutations.asyncQuery(state);
                }
                message["success"](data.msg, 2);
              })
              .catch((err) => {
                message["error"](err.msg, 2);
              });
          },
          okButtonProps: { type: "danger" },
        });

        return state;
      },
      async onInitPassWord(state, param) {
        const { events = [] } = param;
        const [, record, index] = events;
        go({
          url: `/systemManage/userManage/userManageInitPsd?state=edit&id=${record.userId}`,
        });
        return state;
      },
      async onAuthorize(state, param) {
        const { events = [] } = param;
        const [, record, index] = events;
        // 给用户授于角色
        go({
          url: `/systemManage/userManage/userManageRoleAuth?state=edit&id=${record.userId}&username=${record.username}`,
        });
        return state;
      },
      async onRoleAuthorize(state, param, { mutations }) {
        const { events = [] } = param;
        const [, record, index] = events;
        // 给用户授于角色
        go({
          url: `/systemManage/userManage/userManageRoleAuth?state=edit&id=${record.userId}&username=${record.username}`,
        });
        return state;
      },
      async onDelete(state, param, { mutations, getState }) {
        const {
          events: [text, record],
        } = param;
        user("DELETE", { id: record.userId })
          .then((data) => {
            if (data.code === 200) {
              mutations.asyncQuery(state);
            }
            message["success"](data.msg, 2);
          })
          .catch((err) => {
            message["error"](err.msg, 2);
          });
        return state;
      },
      async onEdit(state, param) {
        const {
          events: [text, record],
        } = param;
        go({
          url: `/systemManage/userManage/userManageEdit?state=edit&id=${record.userId}`,
        });
        return state;
      },
      async onView(state, param) {
        const { events = [] } = param;
        const [text, record] = events;
        const { key } = record;
        return state;
      },
      async query(state, param, { mutations, getState }) {
        let newState = getState();
        const { pageNum } = param;
        newState = newState.setIn(
          ["pagination", "pageNum"],
          pageNum ? pageNum : 1
        );
        newState = await mutations.asyncQueryData(newState);
        resetOperation(permissions, operation, mutations.setOperationInTime);
        return newState;
      },
      async queryData(state, newState, { mutations, getState }) {
        const { pageSize, pageNum, total } = newState.get("pagination").toJS(),
          { userName } = state.toJS();
        const params = {
          userName: userName.replace(/\s*/g, "") || "",
          pageNum: pageNum,
          pageSize: pageSize,
        };
        const { data } = await userPage(params);
        newState = newState
          .set(
            "table",
            fromJS(
              data?.records.map((item) => {
                item.key = item.userId;
                let temp = [];
                item.list.forEach((e) => {
                  temp.push(e.roleName);
                });
                item.roles = temp.join(", ");
                return item;
              })
            )
          )
          .setIn(["pagination", "total"], data.total);
        return newState;
      },
      // 分页
      async onShowSizeChange(state, param, { mutations, getState }) {
        let newState = getState();
        const {
          events: [pageNum, pageSize],
        } = param;
        // 选择pageSize的时候，当前页数要初始化
        newState = newState.setIn(["pagination", "pageNum"], 1);
        newState = newState.setIn(["pagination", "pageSize"], pageSize);
        mutations.asyncQueryData(newState);
        return newState;
      },
      //点击分页触发
      async onChangePage(state, param, { mutations, getState }) {
        let newState = getState();
        const { events } = param;
        const [event] = events;
        const { current, pageSize, total } = event;
        newState = newState
          .setIn(["pagination", "pageSize"], pageSize)
          .setIn(["pagination", "pageNum"], current);
        mutations.asyncQueryData(newState);
        return newState;
      },
    },
  },
});
