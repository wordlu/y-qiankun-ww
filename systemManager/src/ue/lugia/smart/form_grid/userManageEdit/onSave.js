import { validate } from "./validate";
export default async param => {
  const { props, pageData, models } = param;
  const [model] = models;
  
  if (!validate(pageData, model)) {
    return false;
  }
  const { getState, mutations } = model;
  mutations.setLoading({ loadingFlag: true })
  const { loadingFlag } = getState().toJS()
  await mutations.asyncSaveRecord({});
  mutations.setLoading({ loadingFlag: false })
  console.info("onSave form");
  console.info("param", param, getState().toJS());
};
