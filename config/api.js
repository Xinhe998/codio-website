const API_URL = require('./project_config').api.url;

module.exports = {
  register: `${API_URL}/register/register`,
  login: `${API_URL}/login/login`,
  create_project: `${API_URL}/member/CRPj`,
  create_file: `${API_URL}/member/CRjDetail`,
  update_file: `${API_URL}/member/UPPjDetail`,
  forget_password: `${API_URL}/Register/ForgetPwd`,
};
