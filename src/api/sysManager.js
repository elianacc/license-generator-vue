import request from '@api/baseRequest'

// 系统管理员登入
function sysManagerLogin (params, success, warn) {
  request.post('/api/sys/manager/login', JSON.stringify(params), success, warn)
}

// 系统管理员注销
function sysManagerLogout (success) {
  request.get('/api/sys/manager/logout', null, success)
}

// 获取当前登入管理员信息
function getCurrentSysManagerMsg (success) {
  request.get('/api/sys/manager/getCurrentManagerMsg', null, success)
}

// 判断系统管理员认证状态
function judgeManagerAuthen (success, warn) {
  request.get('/api/sys/manager/judgeAuthen', null, success, warn)
}

export {
  sysManagerLogin,
  sysManagerLogout,
  getCurrentSysManagerMsg,
  judgeManagerAuthen
}