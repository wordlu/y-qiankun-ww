/**
 * 
 *  by wangmeng
 *
 */


import { createBrowserHistory } from 'history';
console.log('window.cusHistory:', window.cusHistory);
if (!window.cusHistory) {
  window.cusHistory = createBrowserHistory();
}

export default window.cusHistory;