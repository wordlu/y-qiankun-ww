import Demo from '@/views/Demo/index.vue'
import Info from '@/views/Info/info.vue'
import FormDemo from '@/views/formDemo/index.vue'
import Tree from '@/views/tree/index.vue'
import UserAuth from '@/views/information/userAuth/index.vue'

const routers = [
  {
    path: '/',
    redirect: '/homepage',
    meta: {
      title: '/',
      mainBodyShow: false,
      hidden: true
    }
  },
  {
    path: '/demos',
    name: 'demos',
    meta: {
      title: 'DEMOS',
      mainBodyShow: false,
      hidden: true
    },
    component: () => import('@/views/Demo/index.vue'),
    children: [
      {
        path: 'info',
        name: 'info',
        meta: {
          title: 'info',
          mainBodyShow: false
        },
        component: Info
      },
      {
        path: 'form',
        meta: {
          title: 'form',
          mainBodyShow: false
        },
        component: FormDemo
      },
      {
        path: 'tree',
        meta: {
          title: 'tree',
          mainBodyShow: false
        },
        component: Tree
      },
      {
        path: 'editTableDemo',
        name: 'editTableDemo',
        meta: {
          title: 'editTableDemo',
          mainBodyShow: false
        },
        component: () => import('@/components/EditTable/Demo.vue')
      }
    ]
  },
  {
    path: '/subjects',
    name: 'subjects',
    meta: {
      title: '科目管理',
      mainBodyShow: false
    },
    component: () => import('@/views/subjects/index.vue'),
    children: [
      {
        path: 'subjectInvest',
        name: 'subjectInvest',
        meta: {
          title: '科目投资大类维护',
          mainBodyShow: false
        },
        component: () => import('@/views/subjects/subjectInvest/index.vue')
      },
      {
        path: 'subjectAsset',
        name: 'subjectAsset',
        meta: {
          title: '委外资产映射',
          mainBodyShow: false
        },
        component: () => import('@/views/subjects/subjectAsset/index.vue')
      },
      {
        path: 'subjectOverview',
        name: 'subjectOverview',
        meta: {
          title: '科目总览',
          mainBodyShow: false
        },
        component: () => import('@/views/subjects/subjectOverview/index.vue')
      },
      {
        path: 'subjectSystem',
        name: 'subjectSystem',
        meta: {
          title: '科目体系维护',
          mainBodyShow: false
        },
        component: () => import('@/views/subjects/subjectSystem/index.vue')
      },
      {
        path: 'subjectMapping',
        name: 'subjectMapping',
        meta: {
          title: '科目映射维护',
          mainBodyShow: false
        },
        component: () => import('@/views/subjects/subjectMapping/index.vue')
      },
      {
        path: 'userAuth',
        name: 'userAuth',
        meta: {
          title: '用户数据授权',
          mainBodyShow: false
        },
        component: UserAuth
      }
    ]
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   meta: {
  //     title: '登录',
  //     mainBodyShow: true,
  //     hidden: true
  //   },
  //   component: () => import('@/views/login/index.vue')
  // },
  {
    path: '/sourceFileManage',
    name: 'sourceFileManage',
    meta: {
      title: '源文件管理',
      mainBodyShow: false
    },
    component: () => import('@/views/sourceFileManage/index.vue'),
    children: [
      {
        path: 'fileManage',
        name: 'fileManage',
        meta: {
          title: '源文件管理',
          mainBodyShow: false
        },
        component: () => import('@/views/sourceFileManage/fileManage/index.vue')
      },
      {
        path: 'fileInfo',
        name: 'fileInfo',
        meta: {
          title: '源文件信息',
          mainBodyShow: false
        },
        component: () => import('@/views/sourceFileManage/sourceFileInfo/index.vue')
      },
      {
        path: 'analyticRule',
        name: 'analyticRule',
        meta: {
          title: '解析规则维护',
          mainBodyShow: false
        },
        component: () => import('@/views/sourceFileManage/analyticRule/index.vue')
      },
      {
        path: 'agingManage',
        name: 'agingManage',
        meta: {
          title: '时效管理',
          mainBodyShow: false
        },
        component: () => import('@/views/sourceFileManage/agingManage/index.vue')
      },
      {
        path: 'valuationMapping',
        name: 'valuationMapping',
        meta: {
          title: '估值表列映射',
          mainBodyShow: false
        },
        component: () => import('@/views/sourceFileManage/valuationMapping/index.vue')
      },
      {
        path: 'orgIndicatorMapping',
        name: 'orgIndicatorMapping',
        meta: {
          title: '机构指标映射',
          mainBodyShow: false
        },
        component: () => import('@/views/sourceFileManage/orgIndicatorMapping/index.vue')
      }
    ]
  },
  {
    path: '/taskStatusMonitor',
    name: 'taskStatusMonitor',
    meta: {
      title: '任务状态监控',
      mainBodyShow: false
    },
    component: () => import('@/views/taskStatusMonitor/index.vue'),
    children: [
      {
        path: 'stepDimension',
        name: 'stepDimension',
        meta: {
          title: '批处理总览（步骤维度）',
          mainBodyShow: false
        },
        component: () => import('@/views/taskStatusMonitor/stepDimension/index.vue')
      },
      {
        path: 'specialDimension',
        name: 'specialDimension',
        meta: {
          title: '批处理总览（专户维度）',
          mainBodyShow: false
        },
        component: () => import('@/views/taskStatusMonitor/specialDimension/index.vue')
      },
      {
        path: 'lockValuation',
        name: 'lockValuation',
        meta: {
          title: '估值数据锁定',
          mainBodyShow: false
        },
        component: () => import('@/views/taskStatusMonitor/lockValuation/index.vue')
      },
      {
        path: 'lockNetWorth',
        name: 'lockNetWorth',
        meta: {
          title: '净值数据锁定',
          mainBodyShow: false
        },
        component: () => import('@/views/taskStatusMonitor/lockNetWorth/index.vue')
      },
      {
        path: 'lockPenetrate',
        name: 'lockPenetrate',
        meta: {
          title: '穿透数据锁定',
          mainBodyShow: false
        },
        component: () => import('@/views/taskStatusMonitor/lockPenetrate/index.vue')
      },
      {
        path: 'detailLog',
        name: 'detailLog',
        meta: {
          title: '任务详细日志',
          mainBodyShow: false
        },
        component: () => import('@/views/taskStatusMonitor/detailLog/index.vue')
      }
    ]
  },
  {
    path: '/standardDataViewing',
    name: 'standardDataViewing',
    meta: {
      title: '标准数据查看',
      mainBodyShow: false
    },
    component: () => import('@/views/standardDataViewing/index.vue'),
    children: [
      {
        path: 'indicatorView',
        name: 'indicatorView',
        meta: {
          title: '指标查看',
          mainBodyShow: false
        },
        component: () => import('@/views/standardDataViewing/indicatorView/index.vue')
      },
      {
        path: 'analyticValuation',
        name: 'analyticValuation',
        meta: {
          title: '解析后估值表',
          mainBodyShow: false
        },
        component: () => import('@/views/standardDataViewing/analyticValuation/index.vue')
      },
      {
        path: 'virtualNetworth',
        name: 'virtualNetworth',
        meta: {
          title: '虚拟净值查看',
          mainBodyShow: false
        },
        component: () => import('@/views/standardDataViewing/virtualNetworth/index.vue')
      },
      {
        path: 'penetrationReport',
        name: 'penetrationReport',
        meta: {
          title: '穿透报告查询',
          mainBodyShow: false
        },
        component: () => import('@/views/standardDataViewing/penetrationReport/index.vue')
      },
      {
        path: 'information/market',
        name: 'market',
        meta: {
          title: '行情文件导出',
          mainBodyShow: false
        },
        component: () => import('@/views/information/market/market.vue')
      }
    ]
  },
  {
    path: '/information',
    name: 'information',
    meta: {
      title: '基本信息',
      mainBodyShow: false
    },
    component: () => import('@/views/information/index.vue'),
    children: [
      {
        path: 'organizationInfo',
        name: 'organizationInfo',
        meta: {
          title: '机构信息',
          mainBodyShow: false
        },
        component: () => import('@/views/information/organizationInfo/organizationInfo.vue')
      },
      {
        path: 'dictionaryManagement',
        name: 'dictionaryManagement',
        meta: {
          title: '数据字典管理',
          mainBodyShow: false
        },
        component: () => import('@/views/information/dictionaryManagement/dictionaryManagement.vue')
      },
      {
        path: 'address',
        name: 'address',
        meta: {
          title: '机构通讯录',
          mainBodyShow: false
        },
        component: () => import('@/views/information/address/address.vue')
      },
      {
        path: 'manager',
        name: 'manager',
        meta: {
          title: '投资经理维护',
          mainBodyShow: false
        },
        component: () => import('@/views/information/manager/manager.vue')
      },
      {
        path: 'department',
        name: 'department',
        meta: {
          title: '投资部门维护',
          mainBodyShow: false
        },
        component: () => import('@/views/information/department/department.vue')
      },
      {
        path: 'scripting',
        name: 'scripting',
        meta: {
          title: '流程管理',
          mainBodyShow: false
        },
        component: () => import('@/views/information/scripting/scripting.vue')
      },
      {
        path: 'management',
        name: 'management',
        meta: {
          title: '产品信息管理',
          mainBodyShow: false
        },
        component: () => import('@/views/information/management/management.vue')
      },
      {
        path: 'tree',
        name: 'tree',
        meta: {
          title: '产品树',
          mainBodyShow: false
        },
        component: () => import('@/views/information/tree/tree.vue')
      }
    ]
  },

  {
    path: '/homePage',
    // name: 'homePage',
    meta: {
      title: '首页-监控总览',
      mainBodyShow: false
    },
    component: () => import('@/views/dataShow/homePage/index.vue')
  }
]
export default routers
