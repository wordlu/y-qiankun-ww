import { validate } from "./validate";
export default async param => {
  const { props, pageData, models } = param;
  const [model] = models;
  if (!validate(pageData, model)) {
    return false;
  }
  const { mutations } = model;
  await mutations.asyncSaveRecord({});
  console.info("onSave form");
  console.info("param", param);
};
