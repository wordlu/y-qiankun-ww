// import routing from './routing.config';
const cusRouting = [
  // {
  //   value: '/systemManage/page1',
  //   text: '测试页面1',
  //   icon: 'lugia-icon-financial_editor',
  //   id: '/systemManage/page1',
  //   render: () => import('@/pages/page1')
  // },
  // {
  //   value: '/systemManage/page2',
  //   text: '测试页面2',
  //   icon: 'lugia-icon-financial_editor',
  //   id: '/systemManage/page2',
  //   render: () => import('@/pages/page2')
  // },
  {
    value: "/systemManage",
    id: "1",
    text: "系统管理",
    icon: "lugia-icon-financial_editor",
    children: [
      {
        id: 'dataAuthV2',
        value: '/systemManage/roleManage/dataAuthV2',
        text: '数据权限',
        icon: 'lugia-icon-financial_editor',
        render: async () => import('@/pages/dataAuthV2.lugiad')
      },
      {
        id: 'composeTreeAuth',
        value: '/systemManage/roleManage/composeTreeAuth',
        text: '组合树授权',
        icon: 'lugia-icon-financial_editor',
        render: async () => import('@/pages/composeTreeAuth.lugiad')
      },
      {
        value: '/systemManage/roleManage/queryTimeAuth',
        text: '查询时间授权',
        icon: 'lugia-icon-financial_editor',
        id: 'queryTimeAuth',
        render: () => import('@/pages/queryTimeAuth.lugiad')
      },
      {
        value: "/systemManage/clientManage",
        text: "终端管理",
        icon: "lugia-icon-financial_editor",
        id: "11",
        exact: true,
        render: () => import("@/pages/clientManage.lugiad"),
        // children: [
        //   {
        //     value: '/systemManage/clientManage/clientUpdate',
        //     text: '终端管理编辑',
        //     icon: 'lugia-icon-financial_editor',
        //     id: '1111',
        //     isShowMenu: true,
        //     render: () => import('@/pages/clientUpdate.lugiad'),
        //   }
        // ]
      },
      {
        value: "/systemManage/clientManage/clientUpdate",
        text: "终端管理编辑",
        icon: "lugia-icon-financial_editor",
        id: "111",
        isShowMenu: false,
        render: () => import("@/pages/clientUpdate.lugiad"),
      },
      {
        value: "/systemManage/clientManage/clientManageInitCs",
        text: "设置秘钥",
        icon: "lugia-icon-financial_editor",
        id: "112",
        isShowMenu: false,
        render: () => import("@/pages/clientManageInitCs.lugiad"),
      },
      {
        value: "/systemManage/roleManage",
        id: "12",
        text: "角色管理",
        exact: true,
        icon: "lugia-icon-financial_editor",
        render: () => import("@/pages/roleManage.lugiad"),
      },
      {
        value: "/systemManage/roleManage/roleManageEdit",
        id: "121",
        isShowMenu: false,
        text: "角色管理编辑",
        render: () => import("@/pages/roleManageEdit.lugiad"),
      },
      {
        value: "/systemManage/roleManage/roleAuth",
        text: "菜单授权",
        icon: "lugia-icon-financial_editor",
        id: "122",
        isShowMenu: false,
        render: () => import("@/pages/roleAuth.lugiad"),
      },
      {
        value: "/systemManage/roleManage/dataAuth",
        text: "数据权限",
        icon: "lugia-icon-financial_editor",
        id: "151",
        render: () => import("@/pages/dataAuth.lugiad"),
      },

      {
        value: "/systemManage/userManage",
        id: "13",
        text: "用户管理",
        exact: true,
        icon: "lugia-icon-financial_editor",
        render: () => import("@/pages/userManage.lugiad"),
      },
      {
        value: "/systemManage/userManage/userManageEdit",
        text: "用户管理编辑",
        isShowMenu: false,
        id: "131",
        render: () => import("@/pages/userManageEdit.lugiad"),
      },
      {
        value: "/systemManage/userManage/userManageInitPsd",
        text: "重置密码",
        isShowMenu: false,
        id: "135",
        render: () => import("@/pages/userManageInitPsd.lugiad"),
      },
      {
        value: "/systemManage/userManage/userManageAuth",
        text: "用户授权",
        isShowMenu: false,
        id: "132",
        render: () => import("@/pages/userManageAuth.lugiad"),
      },
      {
        value: "/systemManage/userManage/userManageRoleAuth",
        text: "角色授权",
        isShowMenu: false,
        id: "133",
        render: () => import("@/pages/userManageRoleAuth.lugiad"),
      },
      {
        value: "/systemManage/userManage/userManageCopyAuth",
        text: "复制授权",
        isShowMenu: false,
        id: "134",
        render: () => import("@/pages/userManageCopyAuth.lugiad"),
      },
      {
        value: "/systemManage/menuManage",
        text: "菜单管理",
        icon: "lugia-icon-financial_questionnaire",
        id: "14",
        render: () => import("@/pages/menuManage.lugiad"),
      },
      {
        value: "/systemManage/menuManage/menuEdit",
        text: "菜单管理编辑",
        icon: "lugia-icon-financial_editor",
        id: "141",
        render: () => import("@/pages/menuEdit/index.jsx"),
      },
      {
        value: '/systemManage/logManage/operationLog',
        text: '操作日志',
        icon: 'lugia-icon-financial_editor',
        id: 'operationLog',
        render: () => import('@/pages/operationLog.lugiad')
      },
      {
        value: '/systemManage/systemSetting',
        text: '系统设置',
        icon: 'lugia-icon-financial_editor',
        id: 'systemSetting',
        render: () => import('@/pages/logSetting.lugiad')
      }
    ],
  },
  // {
  //   id:'jCtv3wI-5p',
  //   value: '/dataQuality/validateRule',
  //   text: '校验规则',
  //   icon: 'lugia-icon-financial_editor',
  //   render: async ()=>import('../../pages/validateRule.lugiad'),
  //  },

  // {
  //   id:'85SWIzlYO-',
  //   value: '/dataQuality/validateRuleEdit',
  //   text: '校验规则编辑',
  //   icon: 'lugia-icon-financial_editor',
  //   render: async ()=>import('../../pages/validateRuleEdit.lugiad'),
  //  },
];

export default [...cusRouting];
