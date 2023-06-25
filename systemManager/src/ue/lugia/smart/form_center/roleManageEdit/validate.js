export default async param => {
  const { props, pageData } = param;
  const { field } = props;
  // console.log(props, field);
  if (field === "roleCode") {
    const { events } = param;
    const [event] = events;
    if (event.newValue === "") {
      pageData.roleCodeError = "error";
      pageData.roleCodeHelp = "角色编码不能为空";
    } else if(!(/^[0-9a-zA-Z_]{1,50}$/.test(event.newValue))){
      pageData.roleCodeError = "error";
      pageData.roleCodeHelp = "格式错误，仅支持长度不超过50的数字、字母、下划线组合";
    } else {
      pageData.roleCodeError = "";
    }
  }

  if (field === "roleName") {
    const { events } = param;
    const [event] = events;
    if (event.newValue === "") {
      pageData.roleNameError = "error";
      pageData.roleNameHelp = "角色名称不能为空";
    } else {
      pageData.roleNameError = "";
    }
  }
};


export function validate(pageData, model) {
  const state = model.getState();
  const roleCode = state.getIn(["form", "roleCode"])
  const roleName = state.getIn(["form", "roleName"])
  let codeState = false;
  let nameState = false;
  // alert(roleCode);
  if (!roleCode || !roleCode.trim()) {
    pageData.roleCodeError = "error";
    pageData.roleCodeHelp = "角色编码不能为空";
    codeState = false;
    return false;
  } else {
    pageData.roleCodeError = "";
    codeState = true;
    // return true;
  }

  if (!roleName || !roleName.trim()) {
    pageData.roleNameError = "error";
    pageData.roleNameHelp = "角色名称不能为空";
    nameState = false;
    return false;
  } else {
    pageData.roleNameError = "";
    nameState = true;
    // return true;
  }
  if (codeState && nameState) {
    return true;
  }
}
