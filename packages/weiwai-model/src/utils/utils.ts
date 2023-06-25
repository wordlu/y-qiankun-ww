export const formatSelectOption = (data: any[], { label, value }: { label: string, value: string }) => {

  if (!Array.isArray(data) || !data.length) { return data }

  return data.map((item) => {
    item.label = item[label]
    item.name = item[label]
    item.value = item[value]
    item.code = item[value]
    return item
  })
}

export const formatSelectOptionNoKey = (data: any[],) => {

  if (!Array.isArray(data) || !data.length) { return data }

  return data.map((item) => {
    return { laebl: item, keyName: item, value: item, keyId: item }
  })
}

export const DOWN_TYPE: any = {
  'doc': 'application/msword',
  'bin': 'application/octet-stream',
  'exe': 'application/octet-stream',
  'so': 'application/octet-stream',
  'dll': 'application/octet-stream',
  'pdf': 'application/pdf',
  'ai': 'application/postscript',
  'xls': 'application/vnd.ms-excel',
  'ppt': 'application/vnd.ms-powerpoint',
  'dir': 'application/x-director',
  'js': 'application/x-javascript',
  'swf': 'application/x-shockwave-flash',
  'xhtml': 'application/xhtml+xml',
  'xht': 'application/xhtml+xml',
  'zip': 'application/zip',
  'mid': 'audio/midi',
  'midi': 'audio/midi',
  'mp3': 'audio/mpeg',
  'rm': 'audio/x-pn-realaudio',
  'rpm': 'audio/x-pn-realaudio-plugin',
  'wav': 'audio/x-wav',
  'bmp': 'image/bmp',
  'gif': 'image/gif',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'png': 'image/png',
  'css': 'text/css',
  'html': 'text/html',
  'htm': 'text/html',
  'txt': 'text/plain',
  'xsl': 'text/xml',
  'xml': 'text/xml',
  'mpeg': 'video/mpeg',
  'mpg': 'video/mpeg',
  'avi': 'video/x-msvideo',
  'movie': 'video/x-sgi-movie'
}
// 下载
export const downloadFile = (res: any) => {

  let resName = res.headers['content-disposition'] || '';

  if (res && !res?.data || !resName) {
    return false;
  }

  let fileName = resName.match(/=(.*)$/)[1]?.replace(/"/g, '');
  let fileType = fileName.split('.')[1] || 'txt';

  let type = DOWN_TYPE[fileType]

  let blob = new Blob([res.data], { type });
  let downloadElement = document.createElement('a');
  let href = window.URL.createObjectURL(blob);
  downloadElement.href = href;
  downloadElement.download = decodeURIComponent(fileName);
  document.body.appendChild(downloadElement);
  downloadElement.click();
  document.body.removeChild(downloadElement);
  window.URL.revokeObjectURL(href);
}

