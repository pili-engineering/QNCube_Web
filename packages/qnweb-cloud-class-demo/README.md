# qnweb-cloud-class-demo

云课堂场景

## 功能

* 实时互动
    * 实时视频/音频聊天 (RTC)
    * 实时消息传递 (RTM)
    * 多功能交互式白板
* 登录方式
    * 手机验证码登录

## 技术选型

* [React](https://github.com/facebook/react)
* [React](https://github.com/facebook/react)
* [TypeScript](https://github.com/microsoft/TypeScript)
* [Vite](https://github.com/vitejs/vite)
* [qnweb-high-level-rtc](./qnweb-high-level-rtc)
* [qnweb-whiteboard](https://www.npmjs.com/package/qnweb-whiteboard)

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
├── README.md
├── index.html
├── jest.config.ts
├── package.json
├── src
│   ├── App.tsx
│   ├── __tests__
│   ├── api (api接口)
│   ├── components (通用组件)
│   ├── config (通用配置)
│   ├── env.d.ts
│   ├── hooks (封装hooks)
│   ├── main.tsx (入口)
│   ├── pages (页面)
│   ├── router (前端路由)
│   ├── static (资源，包含图片)
│   ├── store (状态管理)
│   ├── style (通用样式)
│   ├── ui-kit (通用组件)
│   ├── utils (通用方法)
│   ├── version.d.ts
│   └── vite-env.d.ts
├── tsconfig.json (参考: https://www.typescriptlang.org/tsconfig)
└── vite.config.ts (参考: https://vitejs.dev/config/)
```
