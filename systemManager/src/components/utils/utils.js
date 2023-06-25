/*
 * Create by wangcuixia on 2019-11-13
 * @flow
 */

export default function isHasChildrenArray(data: Array): boolean {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return false;
  } else {
    return true;
  }
}
function getData(arr: Array<Object>) {
  const resultData = [];
  arr.forEach(item => {
    const { children } = item;
    if (children && Array.isArray(children)) {
      resultData.push(...getData(children));
    } else {
      resultData.push(item);
    }
  });
  return resultData;
}
const getFilterTreeData = (arr: Array<Object>): Array<Object> => {
  return getData(arr);
};

export const getIncludesRes = (str: string, value: string): Boolean => {
  const upperCaseString = str.toLowerCase();
  const upperCaseValue = value.toLowerCase();
  return upperCaseString.includes(upperCaseValue);
};

export const getInputRes = (
  value: string,
  data: Array<Object> = []
): Array<Object> => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return [];
  }
  const filterData = getFilterTreeData(data) || [];
  const resData = [];
  filterData.forEach(item => {
    const { title } = item;
    if (getIncludesRes(title, value)) {
      resData.push(item);
    }
  });
  return resData;
};

export function deepClone(data) {
  return JSON.parse(JSON.stringify(data));
}

export function isArray(value) {
  return Array.isArray(value)
}

export function isObject(value) {
  return value !== null && typeof value === 'object'
}

export function isNumber(value) {
  return typeof value === 'number'
}

export function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]'
}

export function isUndefined(value) {
  return typeof value === 'undefined'
}

export function toJson(obj, pretty) {
  if (this.isUndefined(obj)) return undefined
  if (!this.isNumber(pretty)) {
      pretty = pretty ? 2 : null
  }
  return JSON.stringify(obj, null, pretty)
}

export function isFuction(value) {
  return Object.prototype.toString.call(value) === "[object Fuction]"
}

export function is(type, value) {
  return Object.prototype.toString.call(value) === `[object ${type}]`
}
