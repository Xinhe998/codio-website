// const editorInitialState = {
//   html:
//         '<div class="mainCard"> <div class="mainCard__avatar"> <img src="http://image.coolapk.com/apk_logo/2017/0323/E69CAAE6A087E9A298-7-for-134190-o_1bbtjhbd81t7q1t6otvli4ft7oq-uid-797034.png" alt="avatar"/> </div><div class="mainCard__title">Hello, I am Xinhe.</div><div class="mainCard__desc"> Hi, I am Xinhe Hsu (許歆荷).<br/> This is Codio website. </div><div class="mainCard__actions"> <a> Click me </a> </div></div>',
//   css:
//     'body{background: #F7F8FF; display: flex; justify-content: center;}.mainCard{display: flex; justify-content: center; border-radius: 10px; background: #fff; box-shadow: 0px 30px 99px rgba(108, 108, 108, 0.1); flex-direction: column; text-align: center; padding: 30px 80px; margin-top: 30px;}.mainCard__avatar{position: relative; border: 2px #f4f4fa; background: #f4f4fa; border-radius: 100%; width: 140px; height: 140px; margin: 0 auto;}.mainCard__avatar img{width: 150px; height: 150px; clip-path: circle(65px at center); -webkit-clip-path: circle(65px at center); vertical-align: middle; padding: 5px; margin: -9.5px;}.mainCard__title{font-weight: 500; font-size: 15px; color: #3c3c3c; margin: 20px 0;}.mainCard__desc{font-weight: 300; font-size: 12px; color: #3c3c3c; margin: 10px 0; line-height: 1.5;}.mainCard__actions{display: flex; flex-direction: column; margin: 10px 0;}.mainCard__actions a{height: 44px; border-radius: 3px; background: #3c3c3c; color: #fff; font-weight: normal; font-size: 15px; margin: 10px 0; text-decoration: none; line-height: 2.8;}',
//   js: 'console.log("helloworld");console.log(123)',
//   logs: '',
// };

const editorInitialState = {
  project_id: '',
  project_title: '',
  html: '',
  css: '',
  js: '',
  logs: '',
};


export default function (state = editorInitialState, action) {
  switch (action.type) {
  case 'ADD_HTML': {
    return Object.assign({}, state, { html: action.payload });
  }
  case 'ADD_CSS': {
    return Object.assign({}, state, { css: action.payload });
  }
  case 'ADD_JS': {
    return Object.assign({}, state, { js: action.payload });
  }
  case 'ADD_LOGS': {
    return Object.assign({}, state, { logs: action.payload });
  }
  default:
    return state;
  }
}
