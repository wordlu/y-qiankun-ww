import { validate } from "./validate";
// export default async param => {
//   const { props, pageData, models } = param;
//   const [model] = models;
//   const { mutations } = model;
//   // let state = model.getState().toJS().pageStatus;
//   // console.log('pageData', pageData);
//   await mutations.asyncSaveRecord({});
//   console.info("onSave form");
// };
export default async param => {
  const { pageData, models } = param;
  const [model] = models;

  if (!validate(pageData, model)) {
    return false;
  }
  // console.log(pageData);
  const { mutations } = model;
  await mutations.asyncSaveRecord({});
  console.info("onSave form");

};
