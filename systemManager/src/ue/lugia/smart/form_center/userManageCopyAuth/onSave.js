export default async param => {
  const { props, pageData, models } = param;
  const [model] = models;
  const { mutations } = model;
  await mutations.asyncSaveRecord({});
  console.info("onSave form");
  console.info("param", param);
};
