export const getUrlParams = (url) => {
    if(!url){
        url = window.location.href
    }
    if (url.indexOf('?') == 1 || url.indexOf('?') === -1) return false;
    const arr = url.split('?')[1].split('&');
    const obj = {};
    // 获取全部参数及其值
    arr.forEach(item => {
        const [key, value] = item.split('=');
        obj[key] = value;
    })
    // 返回结果
    return obj;
}