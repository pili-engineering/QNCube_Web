# QNCube_Web

牛魔方demo

## 方案demo

* [监考场景](./packages/demo/qnweb-exam-system-demo/README.md)
* [面试场景](./packages/demo/qnweb-interview-demo/README.md)
* [检修场景](./packages/demo/qnweb-overhaul-demo/README.md)
* [一起看视频场景](./packages/demo/qnweb-video-together-demo/README.md)
* [云课堂场景](./packages/demo/qnweb-cloud-class-demo/README.md)
* [小程序端面试场景](./packages/demo/qnweapp-interview-demo/README.md)

## 快速启动

```shell
# <projectName> 为对应场景的项目名称，如：qnweb-exam-system-demo
$ pnpm i
$ pnpm --filter qnweb-high-level-rtc build:prod
$ pnpm --filter <projectName> dev
```
