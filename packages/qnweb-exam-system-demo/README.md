# qnweb-exam-system-demo

监考场景

## 功能

* 实时互动
    * 实时视频/音频聊天 (RTC)
    * 实时消息传递 (RTM)
* 登录方式
    * 手机验证码登录

## 技术选型

* [React](https://github.com/facebook/react)
* [TypeScript](https://github.com/microsoft/TypeScript)
* [Vite](https://github.com/vitejs/vite)
* [qnweb-high-level-rtc](./qnweb-high-level-rtc)
* [qnweb-exam-sdk](https://developer.qiniu.com/rtc/11856/exam-sdk)

## 快速启动

```shell
$ pnpm install
$ pnpm dev
```

## 如何打包

```shell
$ pnpm build
```

## 目录结构

```
├── instructions (demo操作说明)
├── src
│   ├── api (api接口)
│   ├── components (通用组件)
│   ├── config (配置)
│   ├── env.d.ts
│   ├── eruda.d.ts
│   ├── hooks (hooks封装)
│   ├── layouts 
│   ├── main.tsx (入口)
│   ├── pages (页面)
│   ├── register (注册器)
│   ├── router (前端路由)
│   ├── store (状态管理)
│   ├── style (全局样式)
│   ├── utils (通用方法)
│   ├── version.d.ts
│   └── vite-env.d.ts
├── tsconfig.json (参考: https://www.typescriptlang.org/tsconfig)
└── vite.config.ts (参考: https://vitejs.dev/config/)
```

### config 

* api.ts: 接口请求配置
* env.ts: 环境配置
* im.ts: im 配置


