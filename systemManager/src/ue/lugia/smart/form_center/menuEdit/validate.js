export default async param => {
  const { props, pageData } = param;
  const { field } = props;
  if (field === "menuType") {
    const { events } = param;
    const [event] = events;
    if (event.newValue === "" || event.newValue === undefined) {
      pageData.menuTypeError = "error";
      pageData.menuTypeHelp = "菜单类型不能为空";
    } else {
      pageData.menuTypeError = "";
    }
  }

  if (field === "parentId") {
    const { events } = param;
    const [event] = events;
    if (event.newValue.length === 0) {
      pageData.parentIdError = "error";
      pageData.parentIdHelp = "父菜单不能为空";
    } else {
      pageData.parentIdError = "";
    }
  }

  if (field === "name") {
    const { events } = param;
    const [event] = events;
    if (event.newValue === "") {
      pageData.nameError = "error";
      pageData.nameHelp = "菜单名称不能为空";
    } else {
      pageData.nameError = "";
    }
  }

  if (field === "path") {
    const { events } = param;
    const [event] = events;
    if (event.newValue === "") {
      pageData.pathError = "error";
      pageData.pathHelp = "菜单路径不能为空";
    } else {
      pageData.pathError = "";
    }
  }

  if (field === "embedType") {
    const { events } = param;
    const [event] = events;
  
    if (event.newValue === "" || event.newValue === undefined) {
      pageData.embedError = "error";
      pageData.embedHelp = "嵌入资源类型不能为空";
    } else {
      pageData.embedError = "";
    }
  }

  if (field === "sort") {
    const { events } = param;
    const [event] = events;
    if (event.newValue === "") {
      pageData.sortError = "error";
      pageData.sortHelp = "排序值不能为空";
    } else {
      pageData.sortError = "";
    }
  }

};

export function validate(pageData, model) {
  const state = model.getState();
  const form = state.get('form').toJS();

  const name = form.name;
  const type = form.type;
  const parentId = form.parentId;
  const path = form.path;
  const sort = form.sort;
  const embedType = form.embedType;
  let nameCode = false;
  let typeCode = false;
  let parentIdCode = false;
  let pathCode = false;
  let sortCode = false;
  // alert(roleCode);

  if (!type || !type.trim()) {
    pageData.menuTypeError = "error";
    pageData.menuTypeHelp = "菜单类型不能为空";
    typeCode = false;
    return false;
  } else {
    pageData.menuTypeError = "";
    typeCode = true;
    // return true;
  }
  if ((Array.isArray(parentId) && (parentId.length === 0 || !parentId[0]))) {
    pageData.parentIdError = "error";
    pageData.parentIdHelp = "父菜单不能为空";
    parentIdCode = false;
    return false;
  } else {
    pageData.parentIdError = "";
    parentIdCode = true;
    // return true;
  }
  if (!name || !name.trim()) {
    pageData.nameError = "error";
    pageData.nameHelp = "菜单名称不能为空";
    nameCode = false;
    return false;
  } else {
    pageData.nameError = "";
    nameCode = true;
    // return true;
  }

  if (!path || !path.trim()) {
    pageData.pathError = "error";
    pageData.pathHelp = "菜单路径不能为空";
    pathCode = false;
    return false;
  } else {
    pageData.pathError = "";
    pathCode = true;
    // return true;
  }
  
  if (!embedType || !embedType.trim()) {
    pageData.embedError = "error";
    pageData.embedHelp = "嵌入资源类型不能为空";
    pathCode = false;
    return false;
  } else {
    pageData.embedError = "";
    pathCode = true;
    // return true;
  }


  if (sort <= 0) {
    pageData.sortError = "error";
    pageData.sortHelp = "排序值不能为空或小于0";
    sortCode = false;
    return false;
  } else {
    pageData.sortError = "";
    sortCode = true;
    // return true;
  }

  if (nameCode && typeCode && parentIdCode && pathCode && sortCode) {
    return true;
  }
}