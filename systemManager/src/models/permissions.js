import lugiax from "@lugia/lugiax";
import { fromJS } from 'immutable';

const NODE_ENV = process.env.NODE_ENV;
const model = "permissionsModel";
const state = {
  permissions: {},
};

export default lugiax.register({
  model,
  state,
  mutations: {
    sync: {
      getPermissions(state, params, { getState }) {
        const { permissions: { visible } } = params;
        let buttonPermission = { visible };
        return getState().set('permissions', fromJS(buttonPermission))
      }
    },
    async: {
    },
  },
});
