# qnweb-high-level-rtc

一个基于 qnweb-rtc 二次封装的 High Level SDK，屏蔽了 track 相关的概念，采用麦位的形式进行音视频通话。

## 安装依赖

```shell
$ pnpm install
```

## 如何打包

```shell
$ pnpm build:prod
```

## 生成文档

```shell
# 生成 markdown 文档
$ pnpm doc:md

或者

# 生成 html 文档
$ pnpm doc:html
```

## 角色系统

通过 setClientRoleType 设置角色，不同角色有用不同的 rtc 操作权限。

* 主播角色：可以发布并订阅流
* 用户角色：会加入不可以发布流，只能订阅流
* 拉流角色：不能发布流，也不能订阅流，为 rtmp 拉流角色，一般不需要切换设置为该角色

```ts
export enum ClientRoleType {
  /**
   * 主播角色
   */
  CLIENT_ROLE_BROADCASTER = 0,
  /**
   * 用户角色
   */
  CLIENT_ROLE_AUDIENCE = 1,
  /**
   * 拉流角色
   */
  CLIENT_ROLE_PULLER = -1
}
```


