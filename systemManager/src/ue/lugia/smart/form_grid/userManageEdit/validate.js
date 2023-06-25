export default async param => {
  const { props, pageData } = param;
  const { field } = props;
  let usernameReg = /^\s*$/g;
  if (field === "loginName") {
    const { events } = param;
    const [event] = events;
    if (event.newValue === "" || usernameReg.test(event.newValue)) {
      pageData.loginNameError = "error";
      pageData.loginNameHelp = "登录账号不能为空";
    } else {
      pageData.loginNameError = "";
    }
  }

  if (field === "name") {
    const { events } = param;
    const [event] = events;
    if (event.newValue === "" || usernameReg.test(event.newValue)) {
      pageData.nameError = "error";
      pageData.nameHelp = "用户名不能为空";
    } else {
      pageData.nameError = "";
    }
  }

  if (field === "lockFlag") {
    const { events } = param;
    const [event] = events;
    if (event.newValue === "") {
      pageData.lockFlagError = "error";
      pageData.lockFlagHelp = "用户状态不能为空";
    } else {
      pageData.lockFlagError = "";
    }
  }

  if (field === "mobile") {
    const { events } = param;
    const [event] = events;

    if (!(/^1[3|4|5|7|8]\d{9}$/.test(event.newValue))) {
      pageData.mobileError = "error";
      pageData.mobileHelp = "手机号码格式不正确";
    } else {
      pageData.mobileError = "";
    }
  }

  if (field === "password") {
    const { events } = param;
    const [event] = events;
    if (event.newValue === "") {
      pageData.passwordError = "error";
      pageData.passwordHelp = "密码不能为空";
    } else {
      pageData.passwordError = "";
    }
  }

  if (field === "confirmPassword") {
    const { events } = param;
    const [event] = events;
    if (event.newValue === "") {
      pageData.confirmPasswordError = "error";
      pageData.confirmPasswordHelp = "密码不能为空";
    } else {
      pageData.confirmPasswordError = "";
    }
  }
};

export function validate(pageData, model) {
  const state = model.getState();

  const loginName = state.getIn(["userForm", "loginName"]);
  const username = state.getIn(["userForm", "username"]);
  const lockFlag = state.getIn(["userForm", "lockFlag"]);
  // const phone = state.getIn(["userForm", "phone"]);
  const password = state.getIn(["userForm", "password"]);
  const confirmPassword = state.getIn(["userForm", "confirmPassword"]);
  const pwdState = state.get('pwdState'); // 控制密码输入验证的状态

  let loginNameCode = false;
  let usernameCode = false;
  let lockFlagCode = false;
  // let phoneCode = false;
  let passwordCode = false;
  let confirmPasswordCode = false;

  if (!loginName || !loginName.trim()) {
    pageData.loginNameError = "error";
    pageData.loginNameHelp = "登录账号不能为空";
    loginNameCode = false;
    return false;
  } else {
    pageData.loginNameError = "";
    loginNameCode = true;
    // return true;
  }

  if (!username || !username.trim()) {
    pageData.usernameError = "error";
    pageData.usernameHelp = "用户名不能为空";
    usernameCode = false;
    return false;
  } else {
    pageData.usernameError = "";
    usernameCode = true;
    // return true;
  }
  if (lockFlag == undefined) {
    pageData.lockFlagError = "error";
    pageData.lockFlagHelp = "用户状态不能为空";
    lockFlagCode = false;
    return false;
  } else {
    pageData.lockFlagError = "";
    lockFlagCode = true;
    // return true;
  }

  // if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
  //   pageData.mobileError = "error";
  //   pageData.mobileHelp = "手机号码格式不正确";
  //   phoneCode = false;
  //   return false;
  // } else {
  //   pageData.mobileError = "";
  //   phoneCode = true;
  //   // return true;
  // }

  // 控制密码输入验证的状态
  if (!pwdState) {
    if (!password || !password.trim()) {
      pageData.passwordError = "error";
      pageData.passwordHelp = "密码不能为空";
      passwordCode = false;
      return false;
    } else {
      pageData.passwordError = "";
      passwordCode = true;
      // return true;
    }

    if (!confirmPassword || password !== confirmPassword) {
      pageData.confirmPasswordError = "error";
      pageData.confirmPasswordHelp = "密码不相同";
      confirmPasswordCode = false;
      return false;
    } else {
      pageData.confirmPasswordError = "";
      confirmPasswordCode = true;
      // return true;
    }
  } else {
    pageData.passwordError = "";
    pageData.confirmPasswordError = "";
    passwordCode = true;
    confirmPasswordCode = true;
    // return true;
  }


  if (loginNameCode && usernameCode && lockFlagCode && passwordCode && confirmPasswordCode) {
    return true;
  }
}