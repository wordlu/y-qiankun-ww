/**
 * 各页面的正则表达式
 */

/* 指标参数管理页面 */
export const paraCodeReg = /^[a-zA-Z0-9_]{1,50}$/; // 参数编码:必须为英文，字段长度限制在20以内，必填字段
export const paraNameReg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,100}$/; // 参数名称：字段长度限制在30以内，必填字段

// const paraNameReg = /^[a-zA-Z0-9]{1,30}$/; // 参数名称：字段长度限制在30以内，必填字段
// const paraMemoReg = /^[a-zA-Z0-9]{1,200}$/; // 参数说明：字段长度限制在200以内
// export const paraCodeReg = /[a-zA-Z0-9\\W_!@#$%^&*`~()-+=]{1,20}/g;

/* API服务基本信息页面 */
export const serveCodeReg = /^idx_[0-9a-zA-Z_]{1,50}$/

/* 指标目录管理页面 */
export const nodeNameReg = /^[a-zA-Z0-9\u4e00-\u9fa5_]{1,20}$/; // 指标树名称:必须为中文、英文、数字、下划线，字段长度限制在20以内，必填字段
export const idxCodeReg = /^Index_[0-9a-zA-Z_]{1,50}$/