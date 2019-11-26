if (process.env.NODE_ENV === 'production' || process.env.CIRCLECI) {
  var { API_URL } = process.env;
} else {
  var API_URL = require('./project_config').api.url2;
}

module.exports = {
  register: `${API_URL}/Members/Register`,
  login: `${API_URL}/Members/Login`,
  create_project: `${API_URL}/Project/CRproject`,
  delete_project: `${API_URL}/Project/DelMProject?mp_no=`,
  create_file: `${API_URL}/member/CRjDetail`,
  forget_password: `${API_URL}/Members/ForgetPassword?E_mail=`,
  get_all_tags: `${API_URL}/Project/GetAllHashtag`,
  add_tag: `${API_URL}/Project/AddTag?newTag=`,
};
