import { saveFileBlob } from '../../uitls/request'
let loc = '/loc'
// 导出接口
export function specialExportFN(data?: any) {
  return saveFileBlob(`${loc}/outAssetMapping/export`, data)
}
