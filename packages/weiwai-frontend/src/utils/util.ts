import moment from 'moment'
// import store from '@store'
import { Loading, Message } from 'element-ui'

export function currencyFormatter(currency, precision = 2) {
  if (currency !== undefined && currency !== null) {
    currency = currency.toString().replace(/\$|,/g, '')
  }
  // 检查传入数值为数值类型
  if (isNaN(currency) || currency === '' || currency === null) {
    return ''
  }

  // 获取符号(正/负数)
  let sign = currency * 1 === (currency = Math.abs(currency))

  currency = Math.floor(currency * Math.pow(10, precision) + 0.50000000001) // 把指定的小数位先转换成整数.多余的小数位四舍五入
  let cents = currency % Math.pow(10, precision) // 求出小数位数值
  currency = Math.floor(currency / Math.pow(10, precision)).toString() // 求出整数位数值

  if (precision !== 0) {
    cents = cents.toString() // 把小数位转换成字符串,以便求小数位长度

    // 补足小数位到指定的位数
    while (cents.length < precision) {
      cents = '0' + cents
    }
    cents = '.' + cents
  } else {
    cents = ''
  }

  if (currency) {
    currency = thousandthFormatter(currency)
  }
  return (sign ? '' : '-') + currency + cents
}

export function thousandthFormatter(value) {
  let currency = value + ''
  let result = 0
  if (currency) {
    // 对整数部分进行千分位格式化.
    for (let i = 0; i < Math.floor((currency.length - (1 + i)) / 3); i++) {
      currency =
        currency.substring(0, currency.length - (4 * i + 3)) +
        ',' +
        currency.substring(currency.length - (4 * i + 3))
    }
    result = currency
  }
  return result
}
// 小数位不做四舍五入处理，整数部分化为千位符
export function thousandthFormatter2(value) {
  let currency = value
  if (currency !== undefined && currency !== null) {
    currency = currency.toString().replace(/\$|,/g, '')
  }
  let zs = ''
  let xs = ''
  if (currency) {
    if (currency.indexOf('.') > -1) {
      zs = currency.split('.')[0]
      xs = currency.split('.')[1]
      currency = zs
    }
  }

  let result = 0
  if (currency) {
    // 对整数部分进行千分位格式化.
    for (let i = 0; i < Math.floor((currency.length - (1 + i)) / 3); i++) {
      currency =
        currency.substring(0, currency.length - (4 * i + 3)) +
        ',' +
        currency.substring(currency.length - (4 * i + 3))
    }
    result = currency
  }
  // 这里是为了判断原数据是不是小数
  if (value.toString().indexOf('.') > -1) {
    result = result + '.' + xs
  }

  return result
}
// 判断提交对象里是否有空值
export function deleteEmpty(a) {
  for (var key in a) {
    if (a[key] === '' || a[key] === undefined || a[key] === null) {
      delete a[key]
    }
  }
}
export function arrayFind(arr, key, value) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][key] === value) {
      return arr[i]
    }
  }
}

export function uniqueArray(arr, key) {
  let uni = []
  arr.forEach(item => {
    if (!arrayFind(uni, key, item[key])) {
      uni.push(item)
    }
  })
  return uni
}
export function uniqueArrayObj(arr) {
  let map = new Map()
  for (let item of arr) {
    if (!map.has(item.name)) {
      map.set(item.name, item)
    }
  }
  return map
}

export function arrayFindDeep(arr, key, value) {
  for (let i = 0; i < arr.length; i += 1) {
    const item = arr[i]
    if (item.children) {
      const menu = arrayFindDeep(item.children, key, value)
      if (menu) {
        return menu
      }
    } else if (arr[i][key] === value) {
      return arr[i]
    }
  }
}

// echarts绘图有些情况下rgba带有透明度不识别 换算成十六进制
export function hexify(color) {
  if (/rgba/.test(color)) {
    var values = color
      .replace(/rgba?\(/, '')
      .replace(/\)/, '')
      .replace(/[\s+]/g, '')
      .split(',')
    var a = parseFloat(values[3] || 1)
    var r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255)
    var g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255)
    var b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255)
    return (
      '#' +
      ('0' + r.toString(16)).slice(-2) +
      ('0' + g.toString(16)).slice(-2) +
      ('0' + b.toString(16)).slice(-2)
    )
  } else {
    return color
  }
}

// 查询树形节点的父节点
export function findParentNode(tree, node, prop) {
  let theMan = null
  for (let i = 0; i < tree.length; i++) {
    let item = tree[i]
    if (item.children) {
      if (item.children.some(child => (prop ? child[prop] === node[prop] : child === node))) {
        theMan = item
        break
      } else {
        theMan = findParentNode(item.children, node, prop)
        if (theMan) {
          break
        }
      }
    }
  }

  return theMan
}

// 除去请求参数里面的属性值为空的键值对
export function removeNullInObject(config) {
  if (config instanceof Object && !Array.isArray(config)) {
    for (let key in config) {
      if (Array.isArray(config[key]) && config[key].length === 0) {
        delete config[key]
      } else if (!config[key] && config[key] !== 0) {
        delete config[key]
      }
    }
  }
  return config
}

// 将对象转换成form-data形式
export function obj2FormData(obj, form, namespace) {
  let formData = form || new FormData()
  let keys = Object.keys(obj)
  for (let key of keys.values()) {
    let val = obj[key]
    if (val) {
      // 对象嵌套
      let formKey = namespace ? `${namespace}[${key}]` : key

      if (val instanceof Array) {
        //  数组内容
        if (val[0] && val[0] instanceof File) {
          // 文件上传
          for (let f of val.values()) {
            formData.append(formKey, f)
          }
        } else {
          formData.append(formKey, val.join(','))
        }
      } else if (typeof val === 'object') {
        if (val instanceof File) {
          formData.append(formKey, val)
        } else {
          // 递归调用
          obj2FormData(val, formData, formKey)
        }
      } else {
        // 文本内容(不含对象)
        formData.append(formKey, val)
      }
    }
  }

  return formData
}

export function obj3FormData(obj, form, namespace, isArray) {
  let formData = form || new FormData()
  let keys = Object.keys(obj)
  for (let key of keys.values()) {
    let val = obj[key]
    if (!val && val !== false) {
      continue
    }
    let formKey
    if (isArray) {
      formKey = namespace ? `${namespace}[${key}]` : key
    } else {
      formKey = namespace ? `${namespace}.${key}` : key
    }
    if (val instanceof File) {
      formData.append(formKey, val)
    } else if (val instanceof Array) {
      if (val[0] instanceof File) {
        formKey = namespace ? `${namespace}` : key
        // 文件上传
        for (let f of val.values()) {
          formData.append(formKey, f)
        }
      } else {
        obj3FormData(val, formData, formKey, true)
      }
    } else if (val instanceof Object) {
      obj3FormData(val, formData, formKey, false)
    } else {
      // 文本内容(不含对象)
      formData.append(formKey, val)
    }
  }
  return formData
}

export function getQueryStringArgs() {
  let qs = location.search.length > 0 ? location.search.substring(1) : ''
  let args = {}
  let items = qs.length ? qs.split('&') : []
  let item = null
  let name = null
  let value = null

  let i = 0
  let len = items.length
  for (i = 0; i < len; i++) {
    item = items[i].split('=')
    name = decodeURIComponent(item[0])
    value = decodeURIComponent(item[1])

    if (name.length) {
      args[name] = value
    }
  }

  return args
}

/**
 * 在一定时间内执行最后一次操作
 * 返回一个代理函数，该函数会在500毫秒之后执行实际函数
 * 当在500ms内再次调用该函数时，取消上一次的调用
 */
export function lastCallWapper(interval = 500) {
  let timer = null
  return function(fun) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fun, interval)
  }
}

export function delEmptyAttr(params) {
  for (let attr in params) {
    if (params[attr] === null || params[attr] === '' || params[attr] === undefined) {
      delete params[attr]
    }
  }
}

// 获取当前系统时间
export function currentDate() {
  let year = new Date().getFullYear() // 年
  let month = new Date().getMonth() + 1 // 月
  let day = new Date().getDate() // 日
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (day >= 0 && day <= 9) {
    day = '0' + day
  }
  let currentDate = year + '-' + month + '-' + day
  return currentDate
}
export const initData = ary => {
  let data = {}
  ary.forEach(element => {
    if (!['Buttons', 'Button'].includes(element.type)) {
      data[element.key] = element.initValue || ''
    }
  })
  return data
}

export const chartExport = ({ dom, title, type }) => {
  let myChart = dom
  let picInfo = myChart.getDataURL({
    type: type,
    pixelRatio: 1.5,
    backgroundColor: 'white'
  })
  const elink = document.createElement('a')
  elink.download = title + moment(new Date()).format('YYYYMMDD HH:mm')
  elink.style.display = 'none'
  elink.href = picInfo
  document.body.appendChild(elink)
  elink.click()
  URL.revokeObjectURL(elink.href)
  document.body.removeChild(elink)
}

export const dateConfig = () => {
  // const dateList = store.state.user.ableDate || []
  const dateList = []
  let endDate = ''
  let beginDate = ''
  if (dateList.length > 0) {
    endDate = dateList[dateList.length - 1] || ''
    beginDate = dateList[0]
  }
  return {
    beginDate,
    endDate,
    ableDate: dateList
  }
}

export const pickerOptions = time => {
  return !dateConfig().ableDate.includes(moment(time).format('YYYYMMDD'))
}

// 列表项新华行业相关列处理 - 保留行业最后一级，悬浮显示全部
export function renderColumnsIndustry(h, prop) {
  const cutName = prop && prop.split('/')
  return h('el-tooltip', { props: { effect: 'dark', placement: 'top' } }, [
    h('span', { slot: 'content' }, prop),
    h('span', cutName ? cutName[cutName.length - 1] : '')
  ])
}
export function suspension(h, prop) {
  let sub = ''
  if (prop.length > 99) {
    sub = prop.substring(0, 100) + '...'
  } else {
    sub = prop
  }
  return h('el-tooltip', { props: { effect: 'dark', placement: 'top' } }, [
    h('span', { slot: 'content' }, prop),
    h('span', sub)
  ])
}
export function handleColumns(data) {
  let columns = []
  data.map(item => columns.push({ label: item.name, prop: item.code, align: 'center' }))
  return columns
}

// 排序 降序
export function compare(property, index) {
  return function(a, b) {
    let value1 = a[property][index]
    let value2 = b[property][index]
    return value2 - value1
  }
}

// 页面导出方法 - 加loading
export function baseDownLoad(fn, params, total, failDownload) {
  if (total && total > 20000) {
    Message({
      message: '当前导出数据大于20000条，请完善搜索条件',
      type: 'warning'
    })
    return
  }
  if (failDownload) {
    const { isAllow, message } = failDownload
    if (!isAllow) {
      Message({
        message,
        type: 'warning'
      })
      return
    }
  }
  const loading = Loading.service({
    fullscreen: true,
    text: '正在导出数据...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  fn(params)
    .then(res => {
      loading.close()
    })
    .catch(() => {
      loading.close()
    })
}

export function isEmpty(input) {
  return input + '' === 'null' || input + '' === 'undefined' || input.trim
    ? input.trim() === ''
    : input.replace(/^\s+|\s+$/gm, '') === ''
}
