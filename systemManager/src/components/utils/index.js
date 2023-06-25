export const dateFormat = (fmt, date) => {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(),
    "m+": (date.getMonth() + 1).toString(),
    "d+": date.getDate().toString(),
    "H+": date.getHours().toString(),
    "M+": date.getMinutes().toString(),
    "S+": date.getSeconds().toString()
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
};

export const findItemInArrayByValue = (
  dataSource,
  value,
  comparedKey,
  findkey
) => {
  let temItem = dataSource.find(item => {
    return item[comparedKey] == value;
  });
  return temItem[findkey];
};

export const generateUUID = () => {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
};
export const getInitRouter = (state, routeData) => {
  let r = routeData;
  let len = routeData.length;
  let route = state.get('route', route).toJS();
  if (Array.isArray(r)) {
      for (let index = 0; index < len; index++) {
        let e = r[index];
        if (e.children && e.children.length > 0) {
          route = getInitRouter(state, e.children);
        } else {
          
          route.push(e.value);
          return state.set('route', route);
        }

      }
  }
};

export const getMenuId = (menus, list) => {
  let r = list;
  menus.forEach(item => {
    // 所有菜单的id都要选择
    r.push(item.id);
    if (item.children && item.children.length > 0) {
      // 有子菜单
      getMenuId(item.children, r);
    }
  });
  return r;
};