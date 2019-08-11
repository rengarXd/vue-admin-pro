const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  account: state => state.user.account,
  size: state => state.app.size,
  permission_routes: state => state.permission.routes,
  role: state => state.user.domainName,
  errorLogs: state => state.errorLog.logs,
  // roles: state => state.user.roles
}
export default getters
