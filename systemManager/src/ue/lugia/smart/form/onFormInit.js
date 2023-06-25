import { getUrlParams } from '@utils/urlFunction'

export default async param => {
 
  const {
    props,
    pageData,
    models
  } = param;
  const { state, id } = getUrlParams(props.location.search);
  const [model] = models;
  const { mutations} = model;
  if (state === 'edit') {
    pageData.$set('save', true);
    pageData.text = "保存";
    mutations.asyncGetRecord({
      id
    });
  }else {
    pageData.$set('save', false);
    pageData.text = "新增";
    // mutations.doReset({});
  }
  pageData.theme.MainBoxCard.Container.normal.height = Math.max(
    pageData.theme.MainBoxCard.Container.normal.height,
    document.body.clientHeight - 130
  );
};
