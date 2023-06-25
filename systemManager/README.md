# 一个基于 Lugia技术栈的single-spa子项目模板

## 安装步骤：

#### 安装 dataMiddle-portal 主框架
```bash
git clone http://219.141.235.67:28081/Data-Middleground-Develop-Area/product-code/web/dataMiddle-portal

yarn install / npm install / cnpm install

npm run start
```


#### 安装 dataMiddle-template 子项目
```javascript
git clone http://219.141.235.67:28081/Data-Middleground-Develop-Area/product-code/web/dataMiddle-template

yarn install / npm install / cnpm install

npm run start

// 浏览器中ip地址后手动加上自己配置的url
http://localhost:3000/dataQuality/validateRule
```

#### single-spa项目联调
```javascript
cd dataMiddle-template

npm run build

npm run serve-react
```
```javascript
cd dataMiddle-portal

npm run start

// 浏览器中ip地址后手动加上自己配置的url
http://localhost:3000/dataQuality/validateRule
```


## 接口服务地址

| 名称        | 端口号   | 测试环境swagger地址|
| :---------- | :----- | :--- | ---- | -------- |
| 权限管理    | 30010 |  http://192.168.100.159:30010/doc.html  |
| etl工具    | 30020 |  http://192.168.100.160:30020/doc.html  |
| etl采集    | 30030 |  http://192.168.100.160:30030/doc.html  |
| 数据标准    | 30040 |  http://192.168.100.161:30040/doc.html  |
| 数据质量    | 30050 |  http://192.168.100.161:30050/doc.html  |
| 主数据    | 30060 |  http://192.168.100.162:30060/doc.html  |
| 元数据    | 30070 |  http://192.168.100.162:30070/doc.html  |
| 指标引擎    | 30080 |  http://192.168.100.163:30080/doc.html  |


## 项目迁移


- pageage.json
```bash
修改scripts里 start 和 serve-react 的启动端口号为项目对应的端口号
修改 name 为项目名称
```

- lugia.config
```bash
 修改 publicPath 和 proxy 的端口号为项目对应的端口号，根据项目修改代理
```

- src/models，src/pages，src/ue，src/services，.lugiamega，config
```bash
 从原项目复制进来
```

- src/config/router/cusRouting.config.js
```bash
// 从原项目把路由注册迁移进来（value值统一改成多级，一级路由统一为本项目英文名）例：
const cusRouting = [
  {
    id:'jCtv3wI-5p',
    value: '/dataQuality/validateRule',
    text: '校验规则',
    icon: 'lugia-icon-financial_editor',
    render: async ()=>import('../../pages/validateRule.lugiad'),
   }
];
```

## 版本更新

[1] V1.0.0-release

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE10+, Edge                                                                                                                                                                                                     | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           |

## 接口服务地址

| 名称        | 端口号   | 测试环境swagger地址|
| :---------- | :----- | :--- | ---- | -------- |
| 权限管理    | 30010 |  http://192.168.100.159:30010/doc.html  |
| etl工具    | 30020 |  http://192.168.100.160:30020/doc.html  |
| etl采集    | 30030 |  http://192.168.100.160:30030/doc.html  |
| 数据标准    | 30040 |  http://192.168.100.161:30040/doc.html  |
| 数据质量    | 30050 |  http://192.168.100.161:30050/doc.html  |
| 主数据    | 30060 |  http://192.168.100.162:30060/doc.html  |
| 元数据    | 30070 |  http://192.168.100.162:30070/doc.html  |
| 指标引擎    | 30080 |  http://192.168.100.163:30080/doc.html  |
