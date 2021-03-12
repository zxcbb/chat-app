
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/common/login/login","pages/tabbar/index/index","pages/tabbar/mail/mail","pages/tabbar/find/find","pages/tabbar/my/my","pages/chat/chat/chat","pages/chat/video/video","pages/chat/chat-set/chat-set","pages/mail/user-base/user-base","pages/mail/user-remark-tag/user-remark-tag","pages/mail/user-tag-set/user-tag-set","pages/mail/user-moments-auth/user-moments-auth","pages/mail/send-card/send-card","pages/mail/user-report/user-report","pages/find/moments/moments","pages/my/userinfo/userinfo","pages/my/code/code","pages/my/fava/fava","pages/common/search/search","pages/find/add-moment/add-moment","pages/my/setting/setting","pages/mail/add-friend/add-friend","pages/mail/apply-list/apply-list","pages/mail/mail/mail","pages/mail/group-list/group-list","pages/chat/group-remark/group-remark","pages/chat/chat-list/chat-list"],"window":{"navigationStyle":"custom","navigationBarTextStyle":"black","navigationBarTitleText":"仿微信","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8","titleNView":false,"scrollIndicator":"none"},"tabBar":{"color":"#000000","fontSize":"12px","selectedColor":"#08C261","borderStyle":"black","backgroundColor":"#F8F8F8","list":[{"pagePath":"pages/tabbar/index/index","iconPath":"static/tabbar/message.png","selectedIconPath":"static/tabbar/message-s.png","text":"首页"},{"pagePath":"pages/tabbar/mail/mail","iconPath":"static/tabbar/contact.png","selectedIconPath":"static/tabbar/contact-s.png","text":"通讯录"},{"pagePath":"pages/tabbar/find/find","iconPath":"static/tabbar/discover.png","selectedIconPath":"static/tabbar/discover-s.png","text":"发现"},{"pagePath":"pages/tabbar/my/my","iconPath":"static/tabbar/my.png","selectedIconPath":"static/tabbar/my-s.png","text":"我"}]},"nvueCompiler":"uni-app","renderer":"native","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"app","compilerVersion":"3.0.5","entryPagePath":"pages/common/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/common/login/login","meta":{"isQuit":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/tabbar/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":false}},{"path":"/pages/tabbar/mail/mail","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":false}},{"path":"/pages/tabbar/find/find","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":false}},{"path":"/pages/tabbar/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":false}},{"path":"/pages/chat/chat/chat","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/chat/video/video","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/chat/chat-set/chat-set","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/mail/user-base/user-base","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/mail/user-remark-tag/user-remark-tag","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/mail/user-tag-set/user-tag-set","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/mail/user-moments-auth/user-moments-auth","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/mail/send-card/send-card","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/mail/user-report/user-report","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/find/moments/moments","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/my/userinfo/userinfo","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/my/code/code","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/my/fava/fava","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":true}},{"path":"/pages/common/search/search","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/find/add-moment/add-moment","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/my/setting/setting","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/mail/add-friend/add-friend","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/mail/apply-list/apply-list","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":true}},{"path":"/pages/mail/mail/mail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/mail/group-list/group-list","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":true}},{"path":"/pages/chat/group-remark/group-remark","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/chat/chat-list/chat-list","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
