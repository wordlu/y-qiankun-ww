import axios1 from 'axios'
const axios = axios1.create({
  // 本地联调使用这个
  // baseURL: 'http://127.0.0.1:30012'
  // 发版使用这个
  baseURL: 'http://192.168.103.35:30012'
})

export function saveFileBlob(url: any, params: any) {
  return new Promise((resolve, reject) => {
    axios({
      responseType: 'blob',
      method: 'post',
      url: url,
      data: params,
      headers: getHeaders()
    })
      .then(res => {
        console.log(res);
        
        if (res.data.type === 'application/json') {
          const reader = new FileReader()
          reader.readAsText(res.data, 'utf-8')
          resolve(res)
        } else {
          let fileName
          fileName = res.headers['content-disposition'].split('filename=')[1].replace(/"/g, '')
          fileName = decodeURIComponent(fileName)
          downloadFileStream(res.data, fileName)
          resolve(res)
        }
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}
function getHeaders(options?: any) {
  const headers = Object.assign(
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`
    },
    options
  )
  return headers
}
//文件导出使用这个
function downloadFileStream(stream: any, fileName: any) {
        console.log(stream)

  const blob = new Blob([stream])
  // 非IE下载
  const elink = document.createElement('a')
  elink.download = fileName
  elink.style.display = 'none'
  elink.href = URL.createObjectURL(blob)
  document.body.appendChild(elink)
  elink.click()
  URL.revokeObjectURL(elink.href) // 释放URL 对象
  document.body.removeChild(elink)
}
