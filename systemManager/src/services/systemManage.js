import { stringify } from "qs";
import request from "@utils/requestFunction";

const manage = "/yapi/api/manager";

// ---------------------- 角色管理 ----------------- //
// 角色管理列表
export async function roleSelectAll(params) {
  return request(`${manage}/role/list?${stringify(params)}`, {
    method: "GET",
  });
}
// 角色管理列表 /role/page
export async function rolePage({ pageSize, pageNum, roleName, roleType }) {
  return request(
    `${manage}/role?pageSize=${pageSize}&pageNum=${pageNum}&roleName=${roleName}&roleType=${roleType}`,
    {
      method: "GET",
    }
  );
}
// 数据权限树
export async function getDataAuthTree() {
  return request(`${manage}/datarole/initModelColumnList`, {
    method: "GET",
  });
}
// 数据权限授权
export async function dataRoleAuthorize(params) {
  return request(`${manage}/datarole/dataRoleAuthorize`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}
// 查询数据权限树下的字段和已经授权的数据
export async function getDataByModelId(modelId, roleId) {
  return request(
    `${manage}/datarole/initColumnByModelId?modelId=${modelId}&roleId=${roleId}`,
    {
      method: "GET",
    }
  );
}
// 按条件查询树
export async function getTreeBySearch(query = "") {
  return request(`${manage}/datarole/searchTree?query=${query}`, {
    method: "POST",
  });
}
// 角色管理列表 /role/page
export async function rolePageList({ pageSize, pageNum, roleName, roleType }) {
  return request(
    `${manage}/role?pageSize=${pageSize}&pageNum=${pageNum}&roleName=${roleName}&roleType=${roleType}`,
    {
      method: "GET",
    }
  );
}

// 添加角色角色信息post / 修改角色 put
export async function addRole(method, params) {
  return request(`${manage}/role`, {
    method: method,
    body: {
      ...params,
    },
  });
}

// 通过ID查询角色信息get / 通过ID删除角色 delete
export async function getRoleById(method, { id }) {
  return request(`${manage}/role/${id}`, {
    method: method,
  });
}

// 角色授权
export async function roleAuth(params) {
  return request(`${manage}/role/menu`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}

// 批量删除角色
export async function roleDeleteBatch(params) {
  return request(`${manage}/role/deleteBatch?${stringify(params)}`, {
    method: "DELETE",
  });
}
// ---------------------- 用户管理 ----------------- //
// 用户管理列表
export async function userSelectAll(params) {
  return request(`${manage}/user/selectAll?${stringify(params)}`, {
    method: "GET",
  });
}

// 分页查询用户列表
export async function userPage({ pageSize, pageNum, userName }) {
  return request(`${manage}/user/${pageSize}/${pageNum}/${userName}`, {
    method: "GET",
  });
}
// 新建用户
export async function user(method, params) {
  return request(`${manage}/user/${params.id || ""}`, {
    method: method,
    body: {
      ...params,
    },
  });
}

// 获取用户资源详情
export async function getUserById({ id }) {
  return request(`${manage}/user/${id}`, {
    method: "GET",
  });
}

// 删除用户
export async function userDelete({ id }) {
  return request(`${manage}/user/delete/${id}`, {
    method: "DELETE",
  });
}

// 更新用户资源
export async function userEdit(params) {
  return request(`${manage}/user`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}

// // 更新用户资源
// export async function userEdit(params) {
//   return request(`${manage}/user/edit`,{
//     method: 'PUT',
//     body: {
//       ...params
//     },
//   });
// }

// /user/menu 用户授权
export async function userMenu(params) {
  return request(`${manage}/user/menu`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}

// 批量删除用户
export async function userDeleteBatch(params) {
  return request(`${manage}/user/deleteBatch?${stringify(params)}`, {
    method: "DELETE",
    // body: {
    //   ...params
    // },
  });
}

// 重置密码
export async function updateUserPassword(params) {
  return request(`${manage}/user/updateUserPassword`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}
// ---------------------- 终端管理 ----------------- //

// 终端列表
export async function clientSelectAll(params) {
  return request(`${manage}/client/selectAll`, {
    method: "GET",
  });
}

// 终端id查询列表
export async function clientView({ pageSize, pageNum, clientId = "" }) {
  return request(`${manage}/client/view/${pageSize}/${pageNum}/${clientId}`, {
    method: "GET",
  });
}

// 终端id查询终端详情
export async function clientViewDetail(params) {
  return request(`${manage}/client/view/${params.clientId}`, {
    method: "GET",
  });
}

// 新建终端
export async function clientInsert(params) {
  return request(`${manage}/client/insert`, {
    method: "POST",
    body: {
      ...params,
    },
  });
}

// 更新终端资源
export async function clientEdit(params) {
  return request(`${manage}/client/update`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}

// 删除终端资源
export async function clientDelete({ id }) {
  return request(`${manage}/client/delete/${id}`, {
    method: "DELETE",
  });
}

// 获取当前支持的授权模式
export async function clientGetGrantType() {
  return request(`${manage}/client/getGrantType`, {
    method: "GET",
  });
}

// 批量删除终端
export async function clientDeleteBatch(params) {
  return request(`${manage}/client/deleteBatch?${stringify(params)}`, {
    method: "DELETE",
  });
}

// 设置秘钥
export async function updateClientSecret(params) {
  return request(`${manage}/client/updateClientSecret`, {
    method: "PUT",
    body: {
      ...params,
    },
  });
}

// ---------------------- 菜单管理 ----------------- //

// 返回当前用户的树形菜单集合
export async function menu(params) {
  // {pageSize, pageNum, menuName}
  // /menu/{pageSize}/{pageNum}/{menuName}
  return request(`${manage}/menu/menuName?${stringify(params)}`, {
    method: "GET",
  });
}

// 查询角色id下的菜单
export async function roleMenu(params) {
  return request(`${manage}/menu/tree/${params.roleId}`, {
    method: "GET",
  });
}
// 通过ID查询菜单的详细信息get  更新put
export async function getMenuById(method, params) {
  let url = "";
  if (method === "GET") {
    url = `${manage}/menu/${params.menuId}`;
  } else if (method === "PUT" || method === "POST") {
    url = `${manage}/menu`;
  }
  return request(url, {
    method: method,
    body: {
      ...params,
    },
  });
}

// 删除
export async function menuDelete({ id }) {
  return request(`${manage}/menu/${id}`, {
    method: "DELETE",
  });
}

// 批量删除菜单
export async function menuDeleteBatch(params) {
  return request(`${manage}/menu/deleteBatch?${stringify(params)}`, {
    method: "DELETE",
  });
}

// 获取菜单类型
export async function getMenuType(params) {
  return request(`${manage}/menu/menuTypeVo`, {
    method: "GET",
  });
}


//操作日志查询
export async function getOperateLog(params) {
  return request(`${manage}/log/operate/query`, {
    method: 'POST',
    body: {
      ...params
    }
  });
}


//通过RoleId获取查询时间
export async function getPeriod(params) {
  return request(`${manage}/compose/query/period?${stringify(params)}`, {
    method: 'GET'
  });
}
//操作日志查询
export async function setPeriod(params) {
  return request(`${manage}/compose/save/queryTime`, {
    method: 'POST',
    body: {
      ...params
    }
  });
}


//系统配置查询
export async function getConfig(params) {
  return request(`${manage}/config/query`, {
    method: 'GET',
  });
}

//系统配置保存
export async function setConfig(params) {
  return request(`${manage}/config/save`, {
    method: 'POST',
    body: {
      ...params
    }
  });
}


//获取菜单类型
export async function getMenuTypes() {
  return request(`${manage}/menu/menuTypes`, {
    method: 'GET'
  });
}



//获取菜单类型
export async function getUserSynchronization() {
  return request(`${manage}/ssf/sync`, {
    method: 'GET'
  });
}
