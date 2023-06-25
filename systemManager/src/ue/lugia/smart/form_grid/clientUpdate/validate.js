// 终端管理表单校验
export default async param => {
  const { props, pageData } = param;
  const { field } = props;
  console.log(field);
  
  // 终端id
  if (field === "clientId") {
    const { events } = param;
    const [event] = events;
    if (event.newValue === "") {
      pageData.clientIdError = "error";
      pageData.clientIdHelp = "终端id不能为空";
    } else {
      pageData.clientIdError = "";
    }
  }

  // 校验秘钥
  if (field === "clientSecret") {
    const { events } = param;
    const [event] = events;
    if (event.newValue === "") {
      pageData.clientSecretError = "error";
      pageData.clientSecretHelp = "秘钥不能为空";
    } else {
      pageData.clientSecretError = "";
    }
  }

  // 授权范围
  if (field === "scope") {
    const { events } = param;
    const [event] = events;
    if (event.newValue === "") {
      pageData.scopeError = "error";
      pageData.scopeHelp = "授权范围不能为空";
    } else {
      pageData.scopeError = "";
    }
  }

  // 授权类型
  if (field === "authorizedGrantTypes") {
    const { events } = param;
    const [event] = events;
    if (event.newValue === "") {
      pageData.authorizedGrantTypesError = "error";
      pageData.authorizedGrantTypesHelp = "授权类型不能为空";
    } else {
      pageData.authorizedGrantTypesError = "";
    }
  }

};

export function validate(pageData, model) {
  const state = model.getState();

  const callBackDisabled = state.get('callBackDisabled'); // 控制回调地址的修改
  const form = state.get('form').toJS();
  const clientSecretState = state.get('clientSecretState'); // 控制秘钥输入验证的状态
  const cs = form.clientSecret;
  const ci = form.clientId;
  const sc = form.scope;
  const agt = form.authorizedGrantTypes;
  const wsru = form.webServerRedirectUri;
  let csCode = false;
  let ciCode = false;
  let scCode = false;
  let agtCode = false;
  let wsruCode = false;
  // alert(roleCode);

  if (!ci || !ci.trim()) {
    pageData.clientIdError = "error";
    pageData.clientIdHelp = "终端id不能为空";
    ciCode = false;
    return false;
  } else {
    pageData.clientIdError = "";
    ciCode = true;
    // return true;
  }
  console.log('clientSecretState', clientSecretState);
  if (!clientSecretState) {
    if (!cs || !cs.trim()) {
      pageData.clientSecretError = "error";
      pageData.clientSecretHelp = "秘钥不能为空";
      csCode = false;
      return false;
    } else {
      pageData.clientSecretError = "";
      csCode = true;
      // return true;
    }
    // 后需可能增加确认秘钥
  } else {
    console.log('秘钥不为空', clientSecretState);
    pageData.clientSecretError = "error";
    pageData.clientSecretHelp = "";
    csCode = true;
    // return true;
  }

  if (!sc || !sc.trim()) {
    pageData.scopeError = "error";
    pageData.scopeHelp = "授权范围不能为空";
    scCode = false;
    return false;
  } else {
    pageData.scopeError = "";
    scCode = true;
    // return true;
  }

  if (agt.length < 0) {
    pageData.authorizedGrantTypesError = "error";
    pageData.authorizedGrantTypesHelp = "授权类型不能为空";
    agtCode = false;
    return false;
  } else {
    pageData.authorizedGrantTypesError = "";
    agtCode = true;
    // return true;
  }

  if (!callBackDisabled) {
    if (!wsru || !wsru.trim()) {
      console.log('回调地址不能为空');
      pageData.webServerRedirectUriError = "error";
      pageData.webServerRedirectUriHelp = "回调地址不能为空";
      wsruCode = false;
      return false;
    } else {
      pageData.webServerRedirectUriError = "";
      wsruCode = true;
      // return true;
    }
  } else {
    wsruCode = true;
  }


  if (ciCode && scCode && agtCode && wsruCode) {
    return true;
  }
}