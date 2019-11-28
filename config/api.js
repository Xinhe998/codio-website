let API_URL = '';
if (process.env.NODE_ENV === 'production' || process.env.CIRCLECI || process.env.CI) {
  API_URL = process.env.API_URL;
} else {
  API_URL = require('./project_config').api.url2;
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
  save_code: `${API_URL}/Project/SaveCode`,
  get_code_by_project_id: `${API_URL}/Project/UseMnoGetProject`,
  update_personal_info: `${API_URL}/Members/UpdateMember`,
  create_portfolio: `${API_URL}/Personal/CRcollection`,
  get_portfolio: `${API_URL}/Personal/GetCollection`,
  get_user_all_projects: `${API_URL}/Project/GetMemberAllProject`,
};
