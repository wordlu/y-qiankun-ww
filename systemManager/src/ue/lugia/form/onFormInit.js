export default async param => {
  const { props, pageData, models } = param;
  if (props.edit) {
    pageData.$set("save", true);
    const [model] = models;
    const { mutations } = model;
    const id = "get by location";
    mutations.asyncGetRecord({ id });
  }
  pageData.theme.MainBoxCard.Container.normal.height = Math.max(
    pageData.theme.MainBoxCard.Container.normal.height,
    document.body.clientHeight - 90
  );
};
