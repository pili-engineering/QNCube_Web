qnweb-high-level-rtc / [Exports](modules.md)

# <center>qnweb-high-level-rtc</center>

<center>七牛云 RTC high-level SDK</center>

## 角色

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

## MutableTrackRoom

> 角色:
> 
> 拉流角色: 不加入rtc房间，通过信令监听用户加入房间/退出房间/切换麦克风等事件
> 
> 用户角色: 加入rtc房间，但是只能订阅track，不能发布track，通过rtc事件监听用户加入房间/退出房间/切换麦克风等事件
> 
> 主播角色: 加入rtc房间，可以发布track，通过rtc事件监听用户加入房间/退出房间/切换麦克风等事件
> 
> 思路:
> 
> 弱化麦位的概念，强化角色的概念，只有主播角色位于麦上，核心其实是rtc track的操作权限

## LazyTrackRoom

> 角色: 
> 
> 拉流角色: 不加入rtc房间，通过信令监听用户加入房间/退出房间/切换麦克风等事件
> 
> 用户角色: 加入rtc房间，但是只能订阅track，不能发布track，通过rtc事件监听用户加入房间/退出房间/切换麦克风等事件
> 
> 主播角色: 加入rtc房间，可以发布track，通过rtc事件监听用户加入房间/退出房间/切换麦克风等事件
>
> 思路:
> 
> 与MutableTrackRoom不同的是，LazyTrackRoom强化了麦位的概念，同样是主播角色位于麦上，但是内部维护了角色的切换，对外屏蔽了切换角色的方法
> 
> 用户通过调用上麦/下麦方法进行上下麦，下麦类型可以分为两种：一种作为拉流角色下麦，一种作为用户角色下麦
