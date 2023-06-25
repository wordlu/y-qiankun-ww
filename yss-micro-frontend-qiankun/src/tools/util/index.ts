/**
 * 向上递归获取tree结构
 * @param tree 整个路由树
 * @param func 匹配函数
 * @param path 存储数据的数组
 * @returns  path ['一级','二级','三级','...']
 */
function treeFindPath(tree: any, func: (data: string) => string, path = [], key: string) {
  if (!tree) return [];
  for (const data of tree) {
    const { children } = data;
    path.push(data[key]);
    if (func(data)) return path;
    if (children) {
      const findChildren = treeFindPath(children, func, path, key);
      if (findChildren.length) return findChildren;
    }
    path.pop();
  }
  return [];
}

/**
 * 根据路径匹配路由对象
 * @param list 整个路由树
 * @param routePath 路径
 * @returns 返回 {...对象信息}
 */
function getObjByRoute(list: any, routePath: string) {
  if (!(list instanceof Array)) return null;
  for (let i in list) {
    let item = list[i];
    let { path, children } = list[i];
    if (path === routePath) return item;
    else {
      if (children) {
        let obj = getObjByRoute(children, routePath);
        if (obj) return obj;
      }
    }
  }
}

export { treeFindPath, getObjByRoute };
