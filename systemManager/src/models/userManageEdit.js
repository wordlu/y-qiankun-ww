import lugiax from "@lugia/lugiax";
import { go, goBack } from "@utils/cusRouter";
import { message } from "@lugia/lugia-web";
import { fromJS } from "immutable";
import {
  user,
  getUserById,
  userEdit,
  rolePageList,
} from "@services/systemManage";
import { getUrlParams } from "@utils/urlFunction";
import userManageModel from "./userManage";

const __LUGIAX_MODEL_DEFINE__ = "userManageEdit";
const state = {
  current: "1",
  pageSize: "1000",
  roleName: "",
  roleType: "",
  userForm: {
    avatar: "", // 头像地址 https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg
    // createTime: '', // 创建时间
    // delFlag: '', // 0正常， 1不正常
    // deptId: 0, // 预留字段 所属部门
    lockFlag: "0", // 锁定标记
    confirmPassword: "", // 确认密码，预留字段
    password: "", // 密码
    phone: "", // 手机
    role: null, // 角色授权
    loginName: "", // 登录账号
    // updateTime: '', // 修改时间
    // userId: 0, // 主键id
    username: "", // 用户名
  },
  initForm: {
    avatar: "", // 头像地址
    // createTime: '', // 创建时间
    // delFlag: '', // 0正常， 1不正常
    // deptId: 0, // 预留字段
    lockFlag: "0", // 锁定标记
    confirmPassword: "", // 确认密码，预留字段
    password: "", // 密码
    phone: "", // 手机
    role: null, // 角色授权
    loginName: "", // 登录账号
    // updateTime: '', // 修改时间
    // userId: 0, // 主键id
    username: "", // 用户名
  },
  resetForm: {
    avatar: "", // 头像地址
    // createTime: '', // 创建时间
    // delFlag: '', // 0正常， 1不正常
    // deptId: 0, // 预留字段
    lockFlag: "0", // 锁定标记
    confirmPassword: "", // 确认密码，预留字段
    password: "", // 密码
    phone: "", // 手机
    role: null, // 角色授权
    loginName: "", // 登录账号
    // updateTime: '', // 修改时间
    // userId: 0, // 主键id
    username: "", // 用户名
  },
  roleIdMut: true,
  pageStatus: "",
  lockedOption: [
    {
      value: 0,
      text: "正常",
    },
    {
      value: 1,
      text: "锁定",
    },
  ],
  delFlagOption: [
    {
      value: "0",
      text: "正常",
    },
    {
      value: "1",
      text: "删除",
    },
  ],
  deptIdOption: [
    {
      value: "1",
      text: "公司领导",
    },
    {
      value: "2",
      text: "组合管理部",
    },
  ],
  roleIdOption: [],
  roleIdField: {
    valueField: "roleId",
    displayField: "roleName",
  },
  defaultRoleValue: [], // 角色列表默认值
  defaultDisplayValue: [],
  pwdState: false, // 控制密码输入验证的状态
  loadingFlag: false
};
export default lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state,
  mutations: {
    sync: {
      doReset(state, param) {
        let searchURL = window.location.search;
        searchURL = searchURL.substring(1, searchURL.length);
        let targetPageId = searchURL.split("&")[0].split("=")[1];
        state = state.set("pageStatus", targetPageId);
        state = state.set("userForm", state.get("initForm"));
        return state;
      },
      onSelect(state, param) {
        const { events } = param;
        const [item = {}] = events;
        // newValue
        let newValue = item.newValue;
        newValue = newValue.map((item) => {
          return String(item);
        });

        state = state
          .setIn(["userForm", "role"], newValue)
          .set("defaultDisplayValue", item.newDisplayValue);
        return state;
      },
      reset(state) {
        return state
          .set("userForm", state.get("resetForm"))
          .set("initForm", state.get("resetForm"))
          .set("pwdState", false);
      },
      setState(state, params) {
        return params;
      },
      setLoading(state, params, { mutations }) {
        const { loadingFlag = true } = params;
        mutations.setState(
          state.set("loadingFlag", loadingFlag)
        )
      }
    },
    async: {
      async init(state, param, { getState, mutations }) {
        mutations.doReset();
        mutations.asyncGetRecord(state, param, { getState, mutations });
        // mutations.asyncGetRoleIds(state, param, { getState, mutations });
      },
      async getRoleIds(state, param, { getState }) {
        const { current, pageSize, roleName, roleType } = state.toJS();
        const roleList = await rolePageList({
          pageNum: current,
          pageSize,
          roleName,
          roleType,
        });
        let roleListData = roleList.data;
        let rows = roleListData.records;
        state = state.set("roleIdOption", rows);
        return state;
      },
      async getRecord(state, { id }, { getState }) {
                console.log('init loadingFlag:',)

        const { state: pageState } = getUrlParams(),
          { initFrom } = state.toJS();
        let newState = getState();
        const roleList = await rolePageList({
          pageNum: state.get("current"),
          pageSize: state.get("pageSize"),
        });
        let roleListData = roleList.data;
        let rows = roleListData.rows;
        newState = newState.set("roleIdOption", rows);
        if (pageState === "add") {
          newState = newState.set("userForm", fromJS(initFrom));
        }
        if (!id) return;
        // let newState = getState();
        // 设置密码框的disable
        newState = newState.set("pwdState", true);
        const { data } = await getUserById({ id: id });
        if (data) {
          let targetUser = data;
          let roles = [];
          let rolesName = [];
          targetUser.roleList.forEach((element) => {
            roles.push(element.roleId);
            rolesName.push(element.roleName);
          });
          newState = newState
            .set("userForm", fromJS(data))
            .set("initForm", fromJS(data))
            .set("defaultRoleValue", roles)
            .setIn(["userForm", "role"], roles)
            .setIn(["initForm", "role"], roles)
            .set("defaultDisplayValue", rolesName);
        }

        return newState;
      },
      async addRecord(state) {
        return state;
      },
      async saveRecord(state, param, { getState, mutations }) {
        let flag = getUrlParams(window.location.search).state;
        let params = state.get("userForm").toJS();
        params.key = undefined;
        if (!params.role) {
          params.role = [];
        }
        if (flag === "add") {
          // 新增
          await user("POST", params).then((data) => {
            message.info(data.msg);
            if (data.code === 200) {
              goBack();
            }
          });
        } else {
          // 编辑
          await userEdit(params).then((data) => {
            message.info(data.msg);
            if (data.code === 200) {
              goBack();
            }
          });
        }
        // return state;
      },
    },
  },
});
