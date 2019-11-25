if (process.env.NODE_ENV === 'production' || process.env.CIRCLECI) {
  var { API_URL } = process.env;
} else {
  var API_URL = require('./project_config').api.url2;
}

module.exports = {
  register: `${API_URL}/Members/Register`,
  login: `${API_URL}/Members/Login`,
  create_project: `${API_URL}/member/CRPj`,
  create_file: `${API_URL}/member/CRjDetail`,
  update_file: `${API_URL}/Members/UpdateMember`,
  forget_password: `${API_URL}/Members/ForgetPassword?E_mail=`,
};
