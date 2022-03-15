<div align="center">
    <h1>QNCube_Web</h1>
    <p>牛魔方demo</p>
</div>

## 方案demo

* [监考场景](./packages/demo/qnweb-exam-system-demo)
* [面试场景](./packages/demo/qnweapp-interview-demo)

## 快速启动

```shell
# <projectName> 为对应场景的项目名称，如：qnweb-exam-system-demo
$ pnpm i
$ pnpm --filter qnweb-high-level-rtc build:prod
$ pnpm --filter <projectName> dev
```
