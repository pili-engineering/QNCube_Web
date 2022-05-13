# qnweapp-interview-demo

面试场景小程序端

## 功能

* 实时互动
  * 实时视频/音频聊天 (RTC)
  * 实时消息传递 (RTM)
* 登录方式
  * 手机验证码登录
  
## 快速启动

* project.config.json 的 appid 改为你的小程序 appid
* 打开微信开发工具导入项目
* 运行 ```npm i```
* 微信开发者工具: 工具 => 构建 npm

由于微信开发者工具无法完全模拟音视频通话，建议音视频通话模块采用真机调试或者预览模式进行测试。

## SDK

* pili-rtc-wxapp: 小程序rtc sdk
* qnweapp-im: 小程序im sdk

## 目录结构

```
├── api (api接口)
├── app.js
├── app.json
├── app.wxss
├── components (通用组件)
├── config (通用配置)
├── im (im sdk)
├── images (图片资源)
├── pages (页面)
├── project.config.json (小程序项目配置)
├── project.private.config.json
├── sitemap.json
├── store (状态管理)
└── utils (通用方法)
```

