import lugiax from '@lugia/lugiax';
import { go } from '@utils/cusRouter';
import { fromJS } from "immutable";

const model = 'breadcrumbs';
const state = {
  breadcrumbsData: [
    // { title: "Tab1", content: "content of Tab1", path: "" },
    // { title: "Tab1", content: "content of Tab1", path: "" },
  ]
};
export default lugiax.register({
  model,
  state,
  mutations: {
    sync: {

    },
    async: {
      async onAddTabs(state, inParam) {
        const { newItem: { value, text } } = inParam;
        if (!value) return state;

        const routes = state.get('breadcrumbsData').toJS();
        if (routes.some(item => item.path === value)) return state;

        routes.push({
          title: text || 'no-title',
          content: '',
          path: value
        });
        return state.set("breadcrumbsData", fromJS(routes))
      },
      async onChangeTab(state, inParam) {
        // console.log('inParam', inParam, state.get('breadcrumbsData').toJS())
        const { newItem: { path } } = inParam
        go({
          url: path
        })
        return state;
      },
      async onDeleteTab(state, inParam) {
        // console.log(state.get('breadcrumbsData').toJS())
        const { item } = inParam;
        const routes = state.get('breadcrumbsData').toJS();
        for (const [i, v] of routes.entries()) {
          if (v.path === item.path) {
            routes.splice(i, 1);
            break;
          }
        }
        return state.set("breadcrumbsData", fromJS(routes))
      },
    },
  },
});
