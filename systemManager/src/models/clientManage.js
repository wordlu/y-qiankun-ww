import lugiax from "@lugia/lugiax";
import { fromJS } from "immutable";
import { Modal, message } from "@lugia/lugia-web";
import { go } from "@utils/cusRouter";
import {
  clientSelectAll,
  clientView,
  clientDelete,
  clientDeleteBatch,
  clientGetGrantType,
} from "@services/systemManage";
import { pageSizeOption } from "../enums/common";
import { getPermissions, resetOperation, inTimeSetOperation } from "../utils";
import { getTableOperationPermissionResult } from "@ysstech-data/data-web/dist/permissions-hoc/utils";
import { btnsClickEvent } from "../utils/btnsClickEvent";
import permissionsModel from './permissions';

const { permissions } = permissionsModel.getState().toJS();
const operation = [
    {
      text: "设置秘钥",
      eventType: "onInitPassWord",
      permissionId: "sysManage_clientManage_initPwd",
    },
    {
      text: "编辑",
      eventType: "onEdit",
      permissionId: "sysManage_clientManage_add",
    },
    { text: "查看", eventType: "onView" },
    {
      text: "删除",
      eventType: "onDelete",
      permissionId: "sysManage_clientManage_del",
    },
  ];

const __LUGIAX_MODEL_DEFINE__ = "clientManage";
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
      key: "clientId",
      title: "终端code",
      dataIndex: "clientId",
      width: 100,
      align: "left",
      showEllipsis: false,
    },
    {
      key: "authorizedGrantTypes",
      title: "权限类型",
      dataIndex: "authorizedGrantTypes",
      width: 300,
      align: "left",
      showEllipsis: true,
    },
    {
      key: "scope",
      title: "授权范围",
      dataIndex: "scope",
      width: 80,
      align: "left",
      showEllipsis: true,
    },
    {
      key: "webServerRedirectUri",
      title: "回调地址",
      dataIndex: "webServerRedirectUri",
      width: 200,
      align: "left",
      showEllipsis: true,
    },
    {
      key: "additionalInformation",
      title: "备注信息",
      dataIndex: "additionalInformation",
      width: 200,
      align: "left",
      showEllipsis: true,
    },
  ],
  totalText: "共计0条记录",
  selected: [],
  searchData: {
    clientId: "",
  },
  searchDataInit: {
    clientId: "",
  },
  operation: getTableOperationPermissionResult(operation),
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
        permissionId: "sysManage_clientManage_add",
        permissions: permissions,
        icon: "lugia-icon-reminder_plus",
      },
    },
    {
      title: "删除",
      eventsName: "asyncDeleteSelected",
      btnProps: {
        permissionId: "sysManage_clientManage_del",
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
        state = state.set("searchData", state.get("searchDataInit"));
        return state;
      },
      add(state) {
        go({ url: `/systemManage/clientManage/clientUpdate?state=add` });
        return state;
      },
      onSelected(state, param) {
        const { events = [] } = param;
        const [seleckKeys = []] = events;
        return state.set("selected", seleckKeys);
      },
    },
    inTime: {
      ...inTimeSetOperation
    },
    async: {
      async onInitPassWord(state, param) {
        const { events = [] } = param;
        const [, record, index] = events;
        go({
          url: `/systemManage/clientManage/clientManageInitCs?state=edit&id=${encodeURIComponent(record?.clientId)}`,
        });
        return state;
      },
      // 批量删除
      async deleteSelected(state, param, { mutations }) {
        const selected = state.get("selected");
        if (!selected || !selected.length) {
          message["error"]("请选择至少一条记录", 3);
          return;
        }
        const params = {
          clientIds: selected.join(","),
        };
        Modal.confirm({
          title: "删除提示",
          content: "您将删除选中的记录，是否确认？",
          onOk: () => {
            clientDeleteBatch(params)
              .then((data) => {
                if (data.code === 200) {
                  mutations.asyncQuery(state);
                }
                message["success"](data.msg, 2);
              })
              .catch((err) => {
              });
          },
          okButtonProps: { type: "danger" },
        });
        return state;
      },
      async onDelete(state, param, { mutations }) {
        const { events = [] } = param;
        const [text, record] = events;
        const { clientId } = record;
        
        clientDelete({ id: encodeURIComponent(clientId) })
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
          url: `/systemManage/clientManage/clientUpdate?state=edit&id=${encodeURIComponent(record?.clientId)}`,
        });
        return state;
      },
      async onView(state, param) {
        const { events = [] } = param;
        const [text, record] = events;
        const { key, id } = record;
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
        const { data } = await clientGetGrantType();
        const { pageSize, pageNum, total } = newState.get("pagination").toJS(),
          { searchData } = state.toJS();
        const res = await clientView({
          clientId: encodeURIComponent(searchData.clientId.replace(/\s*/g, "")) || "",
          pageNum,
          pageSize,
        });
        if (res && res.data) {
          newState = newState
            .set(
              "table",
              fromJS(
                res.data.records.map((item) => {
                  let types = [];
                  let typesName = [];
                  if (item.authorizedGrantTypes) {
                    types = item.authorizedGrantTypes.split(",");
                    types.forEach((element) => {
                      typesName.push(data[element]);
                    });
                  }
                  item.authorizedGrantTypesName = typesName.join(",");
                  item.key = item.clientId;
                  return item;
                })
              )
            )
            .setIn(["pagination", "total"], res.data.total);
        }
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
