import lugiax from "@lugia/lugiax";
import { timeRange } from "../utils";
const __LUGIAX_MODEL_DEFINE__ = "user";
const state = {
  type: "ssf",
  selectData: timeRange,
  timeRange: "",
  valueField: "value",
  displayField: "text",
  selectValue: "",
  rangePickerValue: [],
};

let model = lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state,
  mutations: {
    sync: {
      onChange(state, params) {
        console.log("变化了...", params)
      },
    },
    async: {}
  }
});

export default model;
