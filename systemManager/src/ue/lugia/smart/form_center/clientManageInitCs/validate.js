export default async param => {
  const { props, pageData } = param;
  const { field } = props;
  console.log(field);

  if (field === "newpassword") {
    const { events } = param;
    const [event] = events;
    if (event.newValue === "") {
      pageData.newpasswordError = "error";
      pageData.newpasswordHelp = "秘钥不能为空";
    } else {
      pageData.newpasswordError = "";
    }
  }

  if (field === "confirmPassword") {
    const { events } = param;
    const [event] = events;
    if (event.newValue === "") {
      pageData.confirmPasswordError = "error";
      pageData.confirmPasswordHelp = "秘钥不能为空";
    } else {
      pageData.confirmPasswordError = "";
    }
  }

};

export function validate(pageData, model) {
  const state = model.getState();
  const newpassword = state.getIn(["form", "newpassword"]);
  const confirmPassword = state.getIn(["form", "confirmPassword"]);

  let newpasswordCode = false;
  let confirmPasswordCode = false;

  if (!newpassword || !newpassword.trim()) {
    pageData.newpasswordError = "error";
    pageData.newpasswordHelp = "秘钥不能为空";
    newpasswordCode = false;
    return false;
  } else {
    pageData.newpasswordError = "";
    newpasswordCode = true;
    // return true;
  }

  if (!confirmPassword || newpassword !== confirmPassword) {
    pageData.confirmPasswordError = "error";
    pageData.confirmPasswordHelp = "秘钥不相同";
    confirmPasswordCode = false;
    return false;
  } else {
    pageData.confirmPasswordError = "";
    confirmPasswordCode = true;
    // return true;
  }

  if (newpasswordCode && confirmPasswordCode) {
    return true;
  }
}