import React from "react";
import lugiax from "@lugia/lugiax";
import { Modal, message, Select } from "@lugia/lugia-web";
import styled from "styled-components";
import { fromJS } from "immutable";
import { go } from "@utils/cusRouter";
import doRequest from "../components/utils/requestFunction";
import {
  roleSelectAll,
  rolePage,
  rolePageList,
  getRoleById,
  roleDeleteBatch,
} from "@services/systemManage";
import { pageSizeOption, dataAuthOption } from "../enums/common";
import { getPermissions, resetOperation, inTimeSetOperation } from "../utils";
import { btnsClickEvent } from "../utils/btnsClickEvent";
import { getTableOperationPermissionResult } from "@ysstech-data/data-web/dist/permissions-hoc/utils";
import permissionsModel from './permissions';

const { permissions } = permissionsModel.getState().toJS();
const operation = [
  {
    text: "授权",
    eventType: "onRoleAuthorize",
    permissionId: "sysManage_roleManage_authorize",
  },
  {
    text: "编辑",
    eventType: "onEdit",
    permissionId: "sysManage_roleManage_add",
  },
  { text: "查看", eventType: "onView" },
  {
    text: "删除",
    eventType: "onDelete",
    permissionId: "sysManage_roleManage_del",
  },
];
const __LUGIAX_MODEL_DEFINE__ = "roleManage";

const state = {
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
      key: "roleCode",
      title: "角色编码",
      dataIndex: "roleCode",
      width: 120,
      align: "left",
      showEllipsis: true,
    },
    {
      key: "roleName",
      title: "角色名称",
      dataIndex: "roleName",
      width: 120,
      align: "left",
      showEllipsis: true,
    },
    {
      key: "roleType",
      title: "角色类型",
      dataIndex: "roleType",
      width: 80,
      align: "left",
      showEllipsis: true,
    },
    {
      key: "roleDesc",
      title: "角色描述",
      dataIndex: "roleDesc",
      width: 180,
      align: "left",
      showEllipsis: false,
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
  selected: [],
  roleName: "",
  form: {
    roleName: "",
    roleType: "",
  },
  dataAuthOption,
  operation: getTableOperationPermissionResult(operation),
  initList: [
    {
      roleId: "",
      roleName: "",
    },
  ],
  pagination: {
    total: 10,
    pageNum: 1,
    pageSize: 15,
  },
  pageSizeOption,
  btns: [
    {
      title: "新增",
      eventsName: "add",
      type: "primary",

      btnProps: {
        permissionId: "sysManage_roleManage_add",
        permissions: permissions,
        icon: "lugia-icon-reminder_plus",
      },
    },
    {
      title: "删除",
      eventsName: "asyncDeleteSelected",
      btnProps: {
        permissionId: "sysManage_roleManage_del",
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
        state = state
          .setIn(["form", "roleName"], "")
          .setIn(["form", "roleType"], "");
        return state;
      },
      add(state) {
        go({ url: "/systemManage/roleManage/roleManageEdit?state=add" });
        return state;
      },
      onSelected(state, param) {
        const { events = [] } = param;
        const [seleckKeys = []] = events;
        return state.set("selected", seleckKeys);
      },
      onRoleAuthorize(state, param, { mutations }) {
        const { events = [] } = param;
        const [, record, index] = events;
        const { roleType, roleId, roleName } = record;
        // const url = roleType === '数据权限' ? `/dataMiddleMasterDataManagementPOC/applicationSysAuth?id=${roleId}&roleId=${roleId}` : `/systemManage/roleManage/roleAuth?state=edit&id=${roleId}&roleName=${roleName}`;

        const url = roleType === '数据权限' ? `/systemManage/roleManage/dataAuth?id=${roleId}&roleId=${roleId}` : `/systemManage/roleManage/roleAuth?state=edit&id=${roleId}&roleName=${roleName}`;
        go({ url });
      },
    },
    inTime: {
      ...inTimeSetOperation
    },
    async: {
      async deleteSelected(state, param, { mutations }) {
        const selected = state.get("selected");
        if (!selected.length) {
          message["error"]("请选择至少一条记录", 3);
          return;
        }
        let params = {
          roleIds: selected.join(","),
        };
        Modal.confirm({
          title: "删除提示",
          content: "您将删除选中的记录，是否确认？",
          onOk: () => {
            roleDeleteBatch(params)
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
      async onDelete(state, param, { mutations }) {
        const { events = [] } = param;
        const [text, record] = events;
        const { roleId } = record;
        getRoleById("DELETE", { id: roleId })
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
          url: `/systemManage/roleManage/roleManageEdit?state=edit&id=${record.roleId}`,
        });
        return state;
      },
      async onView(state, param) {
        const { events = [] } = param;
        const [text, record] = events;
        const { roleId } = record;
        getRoleById("GET", { id: roleId }).then((data) => {
          message.info(data.msg);
        });
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
        const form = newState.get("form").toJS();
        const { pageSize, pageNum, total } = newState.get("pagination").toJS();
        const { data } = await rolePage({
          // ...form,
          roleName: form.roleName.replace(/\s*/g, "") || "",
          roleType: form.roleType || "",
          pageNum,
          pageSize,
        });

        let list = newState.get("initList").toJS();
        newState = newState
          .set(
            "table",
            fromJS(
              data?.records.map((item) => {
                item.roleType = item.roleType === 0 ? "功能权限" : "数据权限";
                item.key = item.roleId;
                item.selected = (
                  <React.Fragment>
                    <Select
                      valueField={"roleId"}
                      displayField={"roleName"}
                      data={item.list || list}
                    />
                  </React.Fragment>
                );

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
        newState = newState
          .setIn(["pagination", "pageNum"], 1)
          .setIn(["pagination", "pageSize"], pageSize);
        newState = await mutations.asyncQueryData(newState);
        return newState;
      },
      //点击分页触发
      async onChangePage(state, param, { mutations, getState }) {
        let newState = getState();
        const {
          events: [event],
        } = param;
        const { current, pageSize, total } = event;
        if (current) {
          newState = newState
            .setIn(["pagination", "pageSize"], pageSize)
            .setIn(["pagination", "pageNum"], current);
          newState = await mutations.asyncQueryData(newState);
        }
        return newState;
      },
    },
  },
});
