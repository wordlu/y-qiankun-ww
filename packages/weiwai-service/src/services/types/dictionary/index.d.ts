interface addDataTs {
  classId: string
  dicClassName: string
  classEname: string
  keyId: string
  keyName: string
  keyEname: string
  state: boolean
  memo: string
}

export interface dictionaryState {
  multipleSelection: any
  setOptions: any
  tableData: any
  tableDataTwo: any
  pageInfo: any
  pageInfoDia: any
  addData: addDataTs
  show: boolean
  showTwo: boolean
  title: string
  options: any
  dialogVisible: boolean
  addVisible: boolean
  row: any
  formObject: any
  height: string
  loadingShow: boolean
  dialogLoadingShow:boolean
}

export interface organizationState {
  formData1: any
  setOptions: any
  tableData: any
  pageInfo: any
  addData: {
    orgName: string
    orgSname: string
    orgCode: string
    note1: string
    note2: string
  }
  show: boolean
  creditshow: boolean
  title: string
  addVisible: boolean
  row: any
  formObject: any
  isEdit: boolean
  editShow: boolean
  loadingShow:boolean
}
export interface addressState {
  setOptions: any
  tableData: any
  tableDataTwo: any
  pageInfo: any
  addData: {
    orgId: string
    orgName: string
    contacts: string
    tel: string
    tel1: string
    isValid: string
    job: string
    mail: string
    memo: string
  }
  show: boolean
  showTwo: boolean
  title: string
  addVisible: boolean
  dialogVisible: boolean
  options: any
  formObject: any
  DiaPageInfo: any
  orgName: string
  formDataObject: any
  loadingShow: boolean
  dialogLoadingShow:boolean
}
export interface managementState {
  setOptions: any
  tableData: any
  pageInfo: any
  addVisible: boolean

  addData: {
    pfName: string
    pfId: string
    mngrId: string
    trustmngrId: string
    posState: string
    assetType: string
    chgDate: string
    endDate: string
    investMgr: string
    investDepName: string
    investWay: string
    orgId: string
    marketCode: string
    marketCode2: string
    investDep: any
  }
  show: boolean
  title: string
  optionOne: any
  optionTwo: any
  optionThree: any
  optionFour: any
  optionFive: any
  optionSix: any
  optionSeven: any
  formData1: any
  activeName: string
  fieldList: any
  targetData: any
  targetList: any
  fieldData: any
  editData: any
  formObject: any
  loadingShow:boolean
}

export interface managerState {
  setOptions: any
  tableData: any
  pageInfo: any
  addVisible: boolean
  addData: {
    investMgr: string
    mgrName: string
    investDep: string
    depName: string
  }
  show: boolean
  title: string
  formObject: any
  loadingShow:boolean
}
export interface departmentState {
  setOptions: any
  tableData: any
  pageInfo: any
  addVisible: boolean
  addData: {
    orgId: string
    orgName: string
    remark1: string
    remark2: string
  }
  show: boolean
  title: string
  formObject: any
  loadingShow:boolean
}
export interface scriptingState {
  setOptions: any
  tableData: any
  pageInfo: any
  addVisible: boolean
  addData: {
    wfMode: string
    wfName: string
    wfId: string
    maxRuntime: number
    wfDatatype: string
    wfAttr: string
    wfDesc: string
  }
  show: boolean
  title: string
  formObject: any
  optionOne: any
  optionTwo: any
  optionThree: any
  loadingShow:boolean
}
export interface treeState {
  height: number
  setOptions: any
  filterText: string
  treeData: any
  defaultProps: {
    label: string
    children: string
  }
  title: string
  addVisible: boolean
  addData: {
    pfChildName: string
    treeType: string
    pfTag: string
    userIds: any
  }
  optionOne: any
  optionTwo: any
  optionThree: any
  type: string
  pfChildName: string
  row: any
  groupData: any
  pitchGroup: any
  filterTextTwo: any
  newName: any
  optionsKey: any
  combination: any
  formObject:any
}
export interface marketState {
  treeList: any
  hasParent: boolean
  checkedKeys: any
  expandedKeys: any
  resetScroll: boolean
  showCheck: boolean
  tableData: any
  daterangeValue: any
  options: any
  selectVal: any
  setOptions: any
  checkedTreeNode: any
  tabList: any
  pageInfo: any
  formObject: any
  loadingShow: boolean
  treeLoading:boolean
}