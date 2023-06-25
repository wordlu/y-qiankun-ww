import lugiax from '@lugia/lugiax';
import {go} from '@utils/cusRouter';
import { roleSelectAll, userMenu } from "@services/systemManage";
import { fromJS } from 'immutable';
import { Modal, message } from '@lugia/lugia-web';
const __LUGIAX_MODEL_DEFINE__ = 'userManageAuth';
const state = {
  menu: '',
  menuMutliple: true,
  initMenuTree: {
    valueField: 'roleId',
    displayField: 'roleName',
    limitCount: 1000,
    onlySelectLeaf: false,
    disabled: false
  },
  menuTree: []
  // menuTree: [
  //   { value: '1', text: '选项 1' },
  //   { value: '1.1', text: '选项 1.1', pid: '1', path: '1' },
  //   {
  //     value: '1.1.1',
  //     text: '选项 1.1.1',
  //     pid: '1.1',
  //     path: '1/1.1',
  //     isLeaf: true
  //   },
  //   {
  //     value: '1.1.2',
  //     text: '选项 1.1.2',
  //     pid: '1.1',
  //     path: '1/1.1',
  //     isLeaf: true,
  //     notCanSelect: true
  //   },

  //   { value: '1.2', text: '选项 1.2', pid: '1', path: '1' },
  //   {
  //     value: '1.2.1',
  //     text: '选项 1.2.1',
  //     pid: '1.2',
  //     path: '1/1.2',
  //     isLeaf: true
  //   },
  //   { value: '1.2.2', text: '选项 1.2.2', pid: '1.2', path: '1/1.2' },
  //   {
  //     value: '1.2.2.1',
  //     text: '选项 1.2.2.1',
  //     pid: '1.2.2',
  //     path: '1/1.2/1.2.2',
  //     isLeaf: true
  //   },

  //   {
  //     value: '1.2.2.2',
  //     text: '选项 1.2.2.2',
  //     pid: '1.2.2',
  //     path: '1/1.2/1.2.2',
  //     isLeaf: true
  //   },

  //   { value: '1.3', text: '选项 1.3', pid: '1', path: '1', isLeaf: true },

  //   { value: '2', text: '选项 2' },
  //   { value: '2.1', text: '选项 2.1', pid: '2', path: '2', isLeaf: true },
  //   { value: '2.2', text: '选项 2.2', pid: '2', path: '2', isLeaf: true }
  // ],
};
export default lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state,
  mutations: {
    sync: {
      doReset(state, param) {
        console.info('doReset', param);
        return state;
      }
    },
    async: {
      async getRecord(state, { id }) {
        let states = state;
        const data = await roleSelectAll();
        let menuTree = data.data;

        return states
          .set('menuTree', fromJS(menuTree));
      },
      async addRecord(state) {
        console.info('addRecord');
        return state;
      },
      async saveRecord(state) {
        // 用户授权请求
        console.info('授权');
        message['success']('授权成功', 2);
        go({ url: '/userManage' });
        return state;
      }
    }
  }
});
