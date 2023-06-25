import lugiax from "@lugia/lugiax";
import { message, Modal } from '@lugia/lugia-web';
import { fromJS } from "immutable";
import { getDataAuthTree, getDataByModelId, dataRoleAuthorize, getTreeBySearch, } from "@services/systemManage";
import { getUrlParams } from '@utils/urlFunction';
import { goBack } from '@utils/cusRouter';
import dataAuthV2Model from "./dataAuthV2";
import _ from "lodash";
import { Service } from "./dataAuthV2";
const info = [
  {
    widgetId: '0',
    title: '',
    fatherId: '',
    isExpand: true,
    children: [],
    cantTouch: true
  },
];
const __LUGIAX_MODEL_DEFINE__ = "dataAuth";
const table = [];
const state = {
  current: 1,
  pageSize: 10,
  total: 1000,
  table: info,
  totalText: "共计0条记录",
  selected: [],
  // 面包屑
  routes: [
    {
      "title": "系统管理"
    },
    {
      "title": "角色管理"
    },
    {
      "title": "数据权限"
    }
  ],
  treeData: info,
  selectedKeys: [], // 树的初始选中项
  treeItem: {},
  instance: null,
  tablePropertyArr: [], // 多选框组数据
  tablePropertyValue: [], // 选中的数据
  resetTablePropertyValue: [], // 重置的数据
  allValues: [], // 全选
  checkedItem: false,
  indeterminate: false,
  authorizeParam: {}, // 数据授权参数
  chooseItem: {}, // 当前树节点数据
  thisItem: [], //选中的多选框节点
  searchParam: '', // 搜索目录树参数
  authedData: [],
  currentTreeNodeParams: { widgetId: "", id: "", tablePropertyArr: [], selectedKeysItem: {} }
};
// 重构树 的数据
// let n = 0;
const getTreeInfo = (data, fatherName) => {
  return data.map(item => {
    // n++
    return {
      widgetId: `${item.id}`,
      widgetName: item.isNode && item.isNode == '1' ? 'folder' : 'file',
      isSelected: data[0] ? true : false,
      guid: item.id,
      title: item.name,
      fatherId: item.pid,
      alias: item.alias,
      isNode: item.isNode,
      fatherName,
      children: item.child ? getTreeInfo(item.child, item.name) : []
    }
  })
}
export default lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state,
  mutations: {
    sync: {
      getInstance(state, { events: [data] }, { getState, mutations }) {
        setTimeout(() => {
          mutations.setData(
            getState().set('instance', data)
          )
        })
      },
      setInitSelectedKeys(state) {
        const { selectedKeys, pagination } = state.toJS()
        if (selectedKeys.length === 0) return state;
        selectedKeys[0].item.pagination = pagination

        return state.set('selectedKeys', fromJS(selectedKeys)).set("treeData", fromJS([]))
      },
      setData(state, data) {
        return data;
      },
      onSelected(state, param) {
        const { events = [] } = param;
        const [seleckKeys = []] = events;
        return state.set("selected", seleckKeys);
      },
      // 多选框组change事件
      handleChange(state, { events: [value] }) {
        const { tablePropertyArr, resetTablePropertyValue } = state.toJS()
        const { newValue, newItem } = value;
        dataAuthV2Model.mutations.initIsEdit(!_.isEqual(resetTablePropertyValue, newValue));

        return state.set('tablePropertyValue', newValue)
          .set('thisItem', newItem)
          .set('checkedItem', newValue.length === tablePropertyArr.length)
          .set('indeterminate', !!newValue.length && newValue.length < tablePropertyArr.length)
      },
      // 全选
      handleCheckAll(state) {
        let { checkedItem, tablePropertyArr, allValues } = state.toJS()
        if (!checkedItem) {
          tablePropertyArr.forEach(item => {
            allValues.push(item.value)
          })
        } else {
          tablePropertyArr = []
        }
        return state.set('tablePropertyValue', checkedItem ? [] : allValues)
          .set('checkedItem', !checkedItem)
          .set('thisItem', tablePropertyArr)
          .set('indeterminate', false)

      },
      // 重置按钮
      doReset(state) {
        dataAuthV2Model.mutations.initIsEdit();
        const { resetTablePropertyValue, authedData, tablePropertyArr} = state.toJS();
        checkedArrLength && checkedArrLength < tablePropertyArr.length;
        const checkedArrLength = authedData.length;
        const isAllChecked = tablePropertyArr.length === checkedArrLength;
        const indeterminate = checkedArrLength && checkedArrLength < tablePropertyArr.length;
        return state.set('tablePropertyValue', fromJS(resetTablePropertyValue))
          .set('checkedItem', isAllChecked)
          .set('indeterminate', indeterminate);
      },
      // 取消按钮
      doCancel(state, param, { mutations, getState }) {
        mutations.setData(
          getState().set('tablePropertyValue', fromJS([]))
            .set('checkedItem', false)
        )
        goBack()
      },
    },
    inTime: {
      async setQueryParams({ searchParam }, handle) {
        handle.updateModel(handle.getState().set("searchParam", fromJS(searchParam)));
      },
      async setCurrentTreeNodeParams(params, handle) {
        handle.updateModel(handle.getState().set("currentTreeNodeParams", fromJS(params)));
      },
    },
    async: {
      // 初始化
      async init(state, param, { mutations, getState }) {
        mutations.setData(
          getState().set('tablePropertyValue', fromJS([]))
        )
        mutations.asyncQueryTree();
      },
      async setTreeData(state, newData, { getState }) {
        state = getState().set('treeData', fromJS(newData))
        return state
      },
      // 获取树
      async queryTree(state, param, { mutations, getState, }) {
        getDataAuthTree().then(({ data }) => {
          if (data) {
            const
              newData = info.slice(),
              treeInfo = getTreeInfo([data], newData[0].title)

            newData[0].children = treeInfo
            mutations.setData(
              getState().set('treeData', fromJS(treeInfo))
            )

            const { instance, selectedKeys } = getState().toJS()
            if (data.length === 0) return state;
            if (selectedKeys.length === 0) {
              instance && instance.setSelectChange({ widgetId: treeInfo[0].children[0].widgetId, item: treeInfo[0] })
            } else {
              instance && instance.setSelectChange(selectedKeys[0])
            }

            instance && instance.setExpandChange(treeInfo[0].widgetId)

          }
        })
        return state
      },
      // 点击树获取信息
      async getInfoByTree(state, { events: [{ selectedKeys, emit }] }, { mutations, getState }) {
        const [{ widgetId, item: selectedKeysItem }] = selectedKeys,
          { id } = getUrlParams();
        let { tablePropertyArr, authedData, tablePropertyValue, resetTablePropertyValue } = getState().toJS();
        const currentNode = { widgetId, id, tablePropertyArr, selectedKeysItem };
        const { isEdit } = Service.getState();
        mutations.setCurrentTreeNodeParamsInTime(currentNode);
        if (!isEdit || _.isEqual(tablePropertyValue, resetTablePropertyValue)) {
          dataAuthV2Model.mutations.initIsEdit(false);
          mutations.asyncGetDataByModelId();
        } else {
          dataAuthV2Model.mutations.onShowModal({ isEdit: true });
        }
      },
      async getDataByModelId(state, params, { mutations, getState }) {
        let { currentTreeNodeParams: { widgetId, id, tablePropertyArr, selectedKeysItem } } = getState().toJS();
        let checkedAuths = [];
        getDataByModelId(widgetId, id).then(({ data, status }) => {
          if (status === 200) {
            tablePropertyArr = data.child.map(item => (
              {
                text: item.name + "(" + item.alias + ")",
                value: item.id,
                alias: item.alias,
                id: item.id,
                name: item.name
              }
            ))
            if (data && data.roleDataPermVo && data.roleDataPermVo.entityList) {
              data.roleDataPermVo.entityList.forEach(item => {
                item.columnEntityList = item.columnEntityList ? item.columnEntityList : []
                item.columnEntityList.forEach(e => {
                  checkedAuths.push(e?.columnId)
                })
              })
            }
            const checkedArrLength = checkedAuths.length;
            const isAllChecked = tablePropertyArr.length === checkedArrLength;
            const indeterminate = checkedArrLength && checkedArrLength < tablePropertyArr.length;
            mutations.setData(
              getState().set('tablePropertyArr', fromJS(tablePropertyArr))
                .set('chooseItem', fromJS(selectedKeysItem))
                .set('authedData', fromJS(checkedAuths))
                .set('tablePropertyValue', fromJS(checkedAuths))
                .set('resetTablePropertyValue', fromJS(checkedAuths))
                .set('checkedItem', isAllChecked)
                .set('indeterminate', indeterminate)
            )
          }
        })
      },
      // 数据权限授权
      async authorizeData(state, param, { mutations, getState }) {
        const { tablePropertyValue, resetTablePropertyValue, chooseItem, tablePropertyArr, checkedItem } = state.toJS(),
          { id } = getUrlParams();
        let { authorizeParam, thisItem } = state.toJS();
        thisItem = thisItem.filter(res => res != undefined)
        authorizeParam = {
          entityList: [
            {
              columnEntityList: thisItem.map(item => ({
                columnId: item.id,
                columnName: item.name,
                columnalias: item.alias
              })),
              modelAlias: chooseItem.alias,
              modelId: chooseItem.widgetId,
              modelName: chooseItem.title
            }
          ],
          roleId: id
        }

        Modal.confirm({
          title: "授权提示",
          content: "确认授权当前视图!",
          onOk: () => {
            dataRoleAuthorize(authorizeParam).then(({ status, message }) => {
              if (status === 200) {
                dataAuthV2Model.mutations.initIsEdit(false);
                message['success'](message, 2)
                mutations.setData(
                  getState().set('indeterminate', false)
                )
              }
            })
          },
          okButtonProps: { type: "primary" }
        });
      },
      // 按条件查询树
      async getTree(state, param, { mutations, getState, }) {
        const { events: [target] } = param;
        const newValue = target?.newValue;
        mutations.setQueryParamsInTime({ searchParam: newValue });
        mutations.asyncGetTreeBySearch(newValue);
      },
      async getTreeBySearch(state, param, { mutations, getState, }) {
        getTreeBySearch(param).then(({ status, data }) => {
          if (status === 200) {
            const
              newData = info.slice(),
              treeInfo = getTreeInfo([data], newData[0].title)

            newData[0].children = treeInfo
            mutations.setData(
              getState().set('treeData', fromJS(treeInfo))
            )

            const { instance, selectedKeys } = getState().toJS()
            if (!data.child.length) return state
            if (selectedKeys.length === 0) {
              instance && instance.setSelectChange({ widgetId: treeInfo[0].children[0].widgetId, item: treeInfo[0] })
            } else {
              instance && instance.setSelectChange(selectedKeys[0])
            }
          }
        })
        return state
      },
    }
  }
});
