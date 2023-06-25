export default async param => {
  const { models } = param;
  const [model] = models;
  const { mutations } = model;
  console.info("按需进行表单验证");
  console.info("doQuery");
  await mutations.asyncQuery({});
};
