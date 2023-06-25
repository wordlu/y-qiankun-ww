/**
 *
 * create by lyq
 *
 * @flow
 */
import lugiax from "@lugia/lugiax";
import React from "react";
import { go } from "@utils/cusRouter";
import breadcrumbs from "./breadcrumbs";

const model = "menuList";
const state = {
  menuState: {
    value: null,
  },
};

export default lugiax.register({
  model,
  state,
  mutations: {
    sync: {
      onSelect(state, inParam) {
        const { value } = inParam;
        breadcrumbs.mutations.asyncOnAddTabs(inParam);
        go({ url: value });
        return state.setIn(["menuState", "value"], value);
      },
    },
  },
});
