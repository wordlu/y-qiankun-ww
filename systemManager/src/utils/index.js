import Permission from "@ysstech-data/data-web/dist/permissions-hoc/class";
import { getTableOperationPermissionResult } from "@ysstech-data/data-web/dist/permissions-hoc/utils";
import { fromJS } from "immutable";
import moment from "moment";
import { getUrlParams } from '@utils/urlFunction';
import { isArray } from '@ysstech-data/type-utils';
import permissionsModel from '../models/permissions';

const NODE_ENV = process.env.NODE_ENV;

let permission;
export const getPermissions = () => {
  if (!permission) {
    permission = Permission.getInstance(NODE_ENV);
  }
  return permission.getPermissions();
};

export const resetOperation = (permissions, operation, setOperationInTime) => {
  let buttonPermission = permissions;
  const { visible } = permissions;
  let timer = null;
  if (Array.isArray(visible) && visible.length === 0 || !buttonPermission.visible) {
    let number = 0;
    timer = setInterval(() => {
      if (number < 5) {
        const { permissions: newPermissions } = permissionsModel.getState().toJS();
        buttonPermission = newPermissions;
        const newOperation = getTableOperationPermissionResult(operation);
        setOperationInTime(newOperation);
        number++;
      } else {
        clearInterval(timer);
      }
      
    }, 100);
  } else {
    clearInterval(timer);
  }
};

export const inTimeSetOperation = {
  async setOperation(params, handle) {
    handle.updateModel(
      handle
        .getState()
        .set("operation", fromJS(params))
    );
  },
}

export const compare = function (prop) {
  return function (obj1, obj2) {
    var val1 = obj1[prop];
    var val2 = obj2[prop];
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2);
    }
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  }
}



export const getTimeRange = (timeRange, type = "") => {
  if (Array.isArray(timeRange) && timeRange.length > 0) {
    timeRange[timeRange.length - 1].value = type;
  }
  return timeRange;
};

export const subtractTime = (subtractNum = "1", uni = "days", reg = "YYYY-MM-DD") => {
  return moment(moment().subtract(subtractNum, uni)).format(reg);
};

export const endOfTime = (subtractNum = "1", uni = "days", reg = "YYYY-MM-DD") => {
  return moment(moment().locale('zh-cn').endOf(uni).subtract(subtractNum, uni)).format(reg);
};

export const getStartYearDate = () => {
  return moment(
    moment()
      .year(moment().year())
      .startOf("year")
      .valueOf()
  ).format("YYYY-MM-DD");
};

export const halfYear = (reg = "YYYY-MM-DD") => {
  let num = 0;
  if (moment().month() > 5) {
    num = moment().month() - 5
  } else {
    num = moment().month()
  }
  return moment(moment().locale('zh-cn').endOf("month").subtract(num, "month")).format(reg);
};


export const timeRange = [
  {
    value: "assignDate",
    text: "指定日"
  },
  {
    value: "1,months",
    text: "近1月"
  },
  {
    value: "3,months",
    text: "近3月"
  },
  {
    value: "6,months",
    text: "近半年"
  },
  {
    value: "1,years",
    text: "近1年"
  },
  {
    value: "3,years",
    text: "近3年"
  },
  {
    value: "5,years",
    text: "近5年"
  }
];


export const validateTypeDate = {
  defaultStatus: {
    validateStatus: "default",
    help: "",
  },
  errorStatus: {
    validateStatus: "error",
    help: "请填写正确格式的日期",
  },
  greaterThanStatus: {
    validateStatus: "error",
    help: "开始时间不能晚于结束时间",
  },
  moreThan3YearsStatus: {
    validateStatus: "error",
    help: "开始时间与结束时间的间隔不能超过3年",
  },
};


export const assignDateValidate = (assignDate = []) => {
  const [data1 = "", data2 = ""] = assignDate;

  if (!data1 || !data2) {
    return {
      help: "请选择日期区间",
      validateStatus: "error"
    };
  } else if (
    moment(data1).format("YYYYMMDD") > moment(data2).format("YYYYMMDD")
  ) {
    return {
      help: "开始日期不能大于结束日期",
      validateStatus: "error"
    };
  }

  return {
    help: "",
    validateStatus: "default"
  };
};


export const pageSizeOptions = [
  "10",
  "15",
  "20",
  "30",
  "50",
  "100",
  "200",
  "300",
  "500",
  "1000"
];

export const getRoleId = () => {
  const { roleId = "" } = getUrlParams();
  return roleId;
}

export const getDuplicateList = (array) => {
  if (!Array.isArray(array)) {
    return [];
  }
  let selectList = [];
  let values = [];
  let map = array.reduce((all, m) => {
    let list = all.get(m.pfId);
    if (!list) {
      list = [];
      all.set(m.pfId, list);
    }
    list.push(m);
    return all;
  }, new Map());

  const newMap = Array.from(map.entries())
    .filter(([pfId, list]) => list.length > 1);
  newMap.forEach(([pfId, list]) => {
    values = list.map(m => m.id);
    selectList = selectList.concat(list);
  });

  return { selectList, newMap };
}

export const getArrayDifference = (array, other) => {
  if (!isArray(array) || !isArray(other)) {
    return [];
  }
  return array.concat(other).filter((v, i, arr) => {
    return arr.indexOf(v) === arr.lastIndexOf(v);
  });
}

export const deleteCommonArrayItem = (array, other) => {
  const common = array.filter((val) => { return other.indexOf(val) > -1 });
  const diff = other.filter((val) => { return common.indexOf(val) === -1 });
  return diff;
}
