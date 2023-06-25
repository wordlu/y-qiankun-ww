import { saveFileBlob } from '../uitls/request'
let loc = '/loc'
// 导出接口
export function exportExcelFN(data?: any) {
  return saveFileBlob(`${loc}/dataExport/exportExcel`, data)
}
