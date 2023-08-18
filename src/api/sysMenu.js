import request from '@api/baseRequest'

// 查询系统侧边菜单
function getSysSideMenu (success) {
  request.get('/api/sys/menu/getSysSideMenu', null, success)
}

// 查询系统子菜单（根据路径）
function getSysMenuSubByIndex (params, success, warn) {
  request.get('/api/sys/menuSub/getByIndex', { index: params }, success, warn)
}

export {
  getSysSideMenu,
  getSysMenuSubByIndex
}