[qnweb-high-level-rtc](../README.md) / [Exports](../modules.md) / MicSeatListener

# Interface: MicSeatListener<T\>

麦位事件监听

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`MicSeat`](MicSeat.md) = [`MicSeat`](MicSeat.md) |

## Table of contents

### Properties

- [onCameraStatusChanged](MicSeatListener.md#oncamerastatuschanged)
- [onMicrophoneStatusChanged](MicSeatListener.md#onmicrophonestatuschanged)
- [onUserSitDown](MicSeatListener.md#onusersitdown)
- [onUserSitUp](MicSeatListener.md#onusersitup)

## Properties

### onCameraStatusChanged

• `Optional` **onCameraStatusChanged**: [`MicSeatListenerCallback`](../modules.md#micseatlistenercallback)<`T`\>

摄像头状态改变

**`param`**

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/types/rtc.ts:64](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/types/rtc.ts#L64)

___

### onMicrophoneStatusChanged

• `Optional` **onMicrophoneStatusChanged**: [`MicSeatListenerCallback`](../modules.md#micseatlistenercallback)<`T`\>

麦克风状态改变

**`param`**

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/types/rtc.ts:58](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/types/rtc.ts#L58)

___

### onUserSitDown

• `Optional` **onUserSitDown**: [`MicSeatListenerCallback`](../modules.md#micseatlistenercallback)<`T`\>

有人上麦

**`param`**

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/types/rtc.ts:46](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/types/rtc.ts#L46)

___

### onUserSitUp

• `Optional` **onUserSitUp**: [`MicSeatListenerCallback`](../modules.md#micseatlistenercallback)<`T`\>

有人下麦

**`param`**

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/types/rtc.ts:52](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/types/rtc.ts#L52)
