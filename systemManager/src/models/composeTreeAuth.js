import lugiax from '@lugia/lugiax';
import { message } from '@lugia/lugia-web';
import { myContainer } from "@ysstech-data/ssf-fida-model-manager/lib/inversify.config";
import { TYPES } from "@ysstech-data/ssf-fida-model-manager/lib/types";
import { getUrlParams } from '@utils/urlFunction';
import { fromJS } from 'immutable';
import { go, goBack } from '@utils/cusRouter';
import dataAuthV2Model from "./dataAuthV2";
import _ from "lodash";
import { Service as DataAuthV2Service } from "./dataAuthV2";

const typeName = TYPES[`ComposeTreeAuthService`];
export const Service = myContainer.get(typeName);
const state = Service.getState();
const __LUGIAX_MODEL_DEFINE__ = 'composeTreeAuth';

const composeTreeAuthModel = lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state: {
    ...state,
    preSelectedKeysLength: 0
  },
  mutations: {
    sync: {
      onChange(state, params, { mutations }) {
        const { events: [selectedKeys, selectedItem] } = params;
        const { pfId: selectedItemPfId, id: selectedItemId } = selectedItem;
        const { preSelectedKeysLength } = state.toJS();
        let selectedKeysLength = selectedKeys.length;
        const checked = preSelectedKeysLength < selectedKeysLength;
        const { composeTreeObject = {} } = Service.getState();
        const tempObj = Object.fromEntries(
          selectedKeys.filter(item => item !== 'undefined').map((item) => [item, item])
        );
        let selectedPfIds = []
        for (const key in tempObj) {
          const { pfId, nodeType, isExpire } = composeTreeObject[key];
          if (nodeType === "combination") {
            selectedPfIds.push(pfId);
          }
        }
        if (checked) {
          selectedPfIds.push(selectedItemPfId);
          state = state.set("preSelectedKeysLength", fromJS(selectedKeysLength));
        }
        selectedPfIds = [...new Set(selectedPfIds)];
        const pfIdList = selectedPfIds.filter(item => item !== 'undefined');
        Service.setSelectIdsAndPfIds({ selectedPfIds: pfIdList, selectedIds: selectedKeys });

        const { tempSelectedPfIds } = Service.getState();
        DataAuthV2Service.setIsEdit(!_.isEqual(tempSelectedPfIds, selectedPfIds));
        return state.setIn(["composeTreeConfig", "selectedKeys"], fromJS(pfIdList));
      },
      onSelectTree(state, params, { mutations }) {
        const { composeTreeConfig: { selectedKeys }, tempSelectedPfIds, selectedPfIds } = Service.getState();
        const { isEdit } = DataAuthV2Service.getState();
        const { events: [treeItem] } = params;
        const { newItem, oldItem } = treeItem;

        Service.selectComposeTree(newItem, oldItem);

        if (_.isEqual(tempSelectedPfIds, selectedPfIds)) {
          dataAuthV2Model.mutations.initIsEdit();
          mutations.asyncQueryComposeTreeDetails({});
        } else {
          dataAuthV2Model.mutations.onShowModal({ isEdit: true, selectType: "selectTree" });
        }
      },
      onClickBtns(state, params, { mutations }) {
        const { events: [e] } = params;
        const { eventsName } = e;
        eventsName && mutations[eventsName]();
      },
      onSave(state, params, { mutations }) {
        const { saveComposeTreeParams } = Service.getState();
        mutations.asyncSaveComposeTree(saveComposeTreeParams);
      },
      goBack(state, params) {
        go({ url: "/systemManage/roleManage" })
      }
    },
    async: {
      async init(state, params, { mutations }) {
        const { roleId } = getUrlParams();
        await Service.init({ roleId });
        const { composeTreeList, composeTreeId, composeTree, selectedIds = {}, composeTreeConfig = {}, buttons = [], tempSelectedPfIds = [] } = Service.getState();
        const { selectedKeys } = composeTreeConfig;
        const preSelectedKeysLength = selectedKeys.length - 1;
        return state.set("composeTreeList", fromJS(composeTreeList))
          .set("composeTreeId", fromJS(composeTreeId))
          .set("composeTree", fromJS(composeTree))
          .set("composeTreeConfig", fromJS(composeTreeConfig))
          .set("buttons", fromJS(buttons))
          .set("tempSelectedPfIds", fromJS(tempSelectedPfIds))
          .set("preSelectedKeysLength", fromJS(preSelectedKeysLength));
      },
      async queryComposeTreeDetails(state, params, { mutations }) {
        const { composeTreeId, saveComposeTreeParams: { roleId = ''} } = Service.getState();
        await Service.queryComposeTreeDetails({ composeTreeId, roleId });
        dataAuthV2Model.mutations.initIsEdit();
        const { composeTree, composeTreeConfig } = Service.getState();
        return state.set("composeTreeId", fromJS(composeTreeId)).set("composeTree", fromJS(composeTree)).set("composeTreeConfig", fromJS(composeTreeConfig))
      },
      async saveComposeTree(state, params, { mutations }) {
        const res = await Service.saveComposeTree(params);
        if (res?.status === 200) {
          message.success(res?.message);
          mutations.asyncQueryComposeTreeDetails({});
        }
      },
    }
  }
});
export default composeTreeAuthModel;