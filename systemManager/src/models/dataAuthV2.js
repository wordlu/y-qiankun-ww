import lugiax from '@lugia/lugiax';
import { myContainer } from "@ysstech-data/ssf-fida-model-manager/lib/inversify.config";
import { TYPES } from "@ysstech-data/ssf-fida-model-manager/lib/types";
import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { getUrlParams } from '@utils/urlFunction';
import { compare } from "../utils";
import composeTreeAuthModel from "./composeTreeAuth";
import dataAuthModel from "./dataAuth";
import queryTimeAuthModel from "./queryTimeAuth";
import CustomFooter from "../components/CustomFooter";
import ComposeTree from "@/pages/composeTreeAuth.lugiad";
import DataRole from "@/pages/dataAuth.lugiad";
import QueryTimeAuth from "@/pages/queryTimeAuth.lugiad";
import { Service as DataAuthTreeService } from "./composeTreeAuth";

const typeName = TYPES[`DataAuthV2Service`];
export const Service = myContainer.get(typeName);
const state = Service.getState();
console.log(state, Service)
const __LUGIAX_MODEL_DEFINE__ = 'dataAuthV2';
const checkBoxData = [
  {
    text: '组合树授权',
    title: '组合树授权',
    value: 'composeTree',
    content: <ComposeTree />,
    order: 0,
  },
  {
    text: '数据视图授权',
    title: '数据视图授权',
    value: 'dataRole',
    content: <DataRole />,
    order: 1
  },
  {
    text: '查询时间授权',
    title: '查询时间授权',
    value: 'queryTime',
    content: <QueryTimeAuth />,
    order: 2
  },
]
const tabsData = [
  { title: '组合树授权', content: <ComposeTree />, value: 'composeTree' },
  { title: '数据视图授权', content: <DataRole />, value: 'dataRole' },
  { title: '查询时间授权', content: <QueryTimeAuth />, value: 'queryTime' }
]
const customFooter = <CustomFooter onCancel={() => { dataAuthV2Model.mutations.onCancel() }} onOk={() => { dataAuthV2Model.mutations.onOk() }}></CustomFooter>;

const dataAuthV2Model = lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state: {
    ...state,
    checkBoxData,
    tabsData,
    customFooter,
    checkedCopy:['composeTree', 'dataRole', 'queryTime'],
    tabsDataCopy:tabsData
  },
  mutations: {
    sync: {
      init(state){
        const { tabsDataCopy, checkedCopy, } = state.toJS();
        return state.set("checked", fromJS(checkedCopy)).set('tabsData',fromJS(tabsDataCopy)).set("activeTabValue", 'composeTree')
      },
      handleCheck(state, params) {
               
        const { events: [e] } = params;
        let { newValue = [], newItem = [], oldItem = [] } = e;
        
        const oldLength = oldItem.length;
        const newLength = newItem.length;
        const checkedOrNot = oldLength - newLength > 0 ? "cancelCheck" : "check";
        const hideTabs = newLength ? true : false;
        const hideTabsCard = !hideTabs;
        const { tempActiveTabValue, visible } = Service.getState();
        let nextActiveTabValue = nextActiveTabValue = checkedOrNot === "cancelCheck" ? newItem[0]?.value : tempActiveTabValue;
        newItem.sort(compare("order"))
        if (checkedOrNot === "cancelCheck") {
          state = state.set("activeTabValue", fromJS(nextActiveTabValue))
          Service.setState({ activeTabValue: nextActiveTabValue });
        }
        
        Service.setState({ checked: newValue, tabsData: newItem, hideTabs, hideTabsCard, tempActiveTabValue: nextActiveTabValue });
        return state.set("checked", fromJS(newValue))
          .set("tabsData", fromJS(newItem))
          .set("hideTabs", fromJS(hideTabs))
          .set("hideTabsCard", fromJS(hideTabsCard));
      },
      handleTab(state, params, { mutations }) {
        const { activeTabValue, isEdit } = Service.getState();
        const { events: [e] } = params;
        const { newValue = "", oldValue = "" } = e;

        if (newValue !== oldValue && isEdit) {
          Service.setState({ visible: true });
          state = state.set("visible", fromJS(true)).set("selectType", fromJS("selectTab"))
        }

        Service.setState({ tempActiveTabValue: newValue });

        if (!isEdit) {
          Service.setState({ activeTabValue: newValue });
          Service.setIsEdit(false);
          return state.set("activeTabValue", fromJS(newValue)).set("tempActiveTabValue", fromJS(newValue));
        }

        return state.set("tempActiveTabValue", fromJS(newValue));
      },
      onCancel(state, params) {
        const { visible, activeTabValue, tempActiveTabValue } = state.toJS();
        let newVisible = !visible;
        Service.setState({ visible: newVisible, activeTabValue, tempActiveTabValue });
        const { composeTree: [{ id }] } = DataAuthTreeService.getState();
        DataAuthTreeService.selectComposeTree({ value: id }, {});
        return state.set("visible", fromJS(newVisible));

      },
      onShowModal(state, params, { mutations }) {
        const { visible } = state.toJS();
        const { isEdit = false, selectType } = params;
        let newVisible = !visible;
        
        Service.setState({ visible: newVisible });
        Service.setIsEdit(isEdit);
        return state.set("visible", fromJS(newVisible)).set("selectType", fromJS(selectType));
      },
      QueryComposeTreeDetail(state, params) {
        composeTreeAuthModel.mutations.asyncQueryComposeTreeDetails({});
      },
      QueryInfoByTree(state, params) {
        dataAuthModel.mutations.asyncGetDataByModelId();
      },
      QueryTimeAuthInit(state, params) {
        queryTimeAuthModel.mutations.asyncInit();
      },
      onOk(state, params, { mutations }) {
        const { activeTabValue, isEdit, tempActiveTabValue } = Service.getState();
        const { tempActiveTabValue: temp, visible, selectType } = state.toJS();
        let newVisible = !visible;
        
        if (isEdit) {
          switch (activeTabValue) {
            case "composeTree":
              mutations.QueryComposeTreeDetail();
              break;
            case "dataRole":
              mutations.QueryInfoByTree();
              break;
            case "queryTime":
              mutations.QueryTimeAuthInit();
              break;
            default:
              break;
          }
        } else {
          state = state.set("activeTabValue", fromJS(tempActiveTabValue));
        }
        mutations.initIsEdit(false);
        Service.setState({ visible: newVisible });
        const currTab = selectType !== "selectTab" ? activeTabValue : tempActiveTabValue;
        return state.set("visible", fromJS(newVisible))
          .set("activeTabValue", fromJS(currTab));
      },
      initIsEdit(state, params = false) {
        Service.setIsEdit(params);
      }
    },
    async: {
      init(state, params, { mutations }) {
        
        mutations.initIsEdit();
        const { breadcrumb, checked, activeTabValue, tempActiveTabValue, visible, modalTitle, hideTabs, checkedConfig, isEdit } = Service.getState();
      
        
        return state.set("breadcrumb", fromJS(breadcrumb))
          .set("checked", fromJS(checked))
          .set("checkBoxData", fromJS(checkBoxData))
          .set("tabsData", fromJS(tabsData))
          .set("activeTabValue", fromJS(activeTabValue))
          .set("tempActiveTabValue", fromJS(tempActiveTabValue))
          .set("visible", fromJS(visible))
          .set("customFooter", fromJS(customFooter))
          .set("modalTitle", fromJS(modalTitle))
          .set("hideTabs", fromJS(hideTabs))
          .set("checkedConfig", fromJS(checkedConfig))
          .set("isEdit", fromJS(isEdit));
      }
    }
  }
});
export default dataAuthV2Model;