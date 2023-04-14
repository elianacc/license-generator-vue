import request from '@api/baseRequest'

// 分页查询证书
function getLicensePage (params, success, warn) {
  request.post('/api/licenseInfo/getPage', JSON.stringify(params), success, warn)
}

// 添加证书
function insertLicense (params, success, warn) {
  request.post('/api/licenseInfo/insert', JSON.stringify(params), success, warn)
}

// 重授证书
function resetLicense (params, success, warn) {
  request.put('/api/licenseInfo/resetLicense', JSON.stringify(params), success, warn)
}


export { getLicensePage, insertLicense, resetLicense }