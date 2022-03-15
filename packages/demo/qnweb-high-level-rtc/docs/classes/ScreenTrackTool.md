[qnweb-high-level-rtc](../README.md) / [Exports](../modules.md) / ScreenTrackTool

# Class: ScreenTrackTool

屏幕共享

## Table of contents

### Constructors

- [constructor](ScreenTrackTool.md#constructor)

### Properties

- [localScreenParams](ScreenTrackTool.md#localscreenparams)
- [localScreenTrack](ScreenTrackTool.md#localscreentrack)
- [rtcRoom](ScreenTrackTool.md#rtcroom)
- [screenMicSeatListeners](ScreenTrackTool.md#screenmicseatlisteners)
- [screenMicSeats](ScreenTrackTool.md#screenmicseats)
- [tag](ScreenTrackTool.md#tag)

### Methods

- [addScreenMicSeatListener](ScreenTrackTool.md#addscreenmicseatlistener)
- [clear](ScreenTrackTool.md#clear)
- [disableScreen](ScreenTrackTool.md#disablescreen)
- [enableScreen](ScreenTrackTool.md#enablescreen)
- [getUserScreenTrack](ScreenTrackTool.md#getuserscreentrack)
- [handleRtcUserPublished](ScreenTrackTool.md#handlertcuserpublished)
- [handleRtcUserUnpublished](ScreenTrackTool.md#handlertcuserunpublished)
- [muteAllRemoteScreen](ScreenTrackTool.md#muteallremotescreen)
- [muteLocalScreen](ScreenTrackTool.md#mutelocalscreen)
- [muteRemoteScreen](ScreenTrackTool.md#muteremotescreen)
- [removeScreenMicSeatListener](ScreenTrackTool.md#removescreenmicseatlistener)
- [setLocalScreenWindowView](ScreenTrackTool.md#setlocalscreenwindowview)
- [setUpLocalScreenParams](ScreenTrackTool.md#setuplocalscreenparams)
- [setUserScreenWindowView](ScreenTrackTool.md#setuserscreenwindowview)
- [userSitDown](ScreenTrackTool.md#usersitdown)
- [userSitUp](ScreenTrackTool.md#usersitup)

## Constructors

### constructor

• **new ScreenTrackTool**(`rtcRoom`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rtcRoom` | [`RtcRoom`](RtcRoom.md) |

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:33](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L33)

## Properties

### localScreenParams

• `Optional` **localScreenParams**: `QNScreenVideoTrackConfig`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:25](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L25)

___

### localScreenTrack

• `Optional` **localScreenTrack**: ``null`` \| `QNScreenVideoTrack`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:27](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L27)

___

### rtcRoom

• **rtcRoom**: [`RtcRoom`](RtcRoom.md)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:21](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L21)

___

### screenMicSeatListeners

• **screenMicSeatListeners**: [`ScreenMicSeatListener`](../interfaces/ScreenMicSeatListener.md)[]

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:31](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L31)

___

### screenMicSeats

• **screenMicSeats**: [`ScreenMicSeat`](../interfaces/ScreenMicSeat.md)[] = `[]`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:29](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L29)

___

### tag

• **tag**: `string` = `'[ScreenTrackTool]'`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:22](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L22)

## Methods

### addScreenMicSeatListener

▸ **addScreenMicSeatListener**(`listener`): `void`

添加屏幕共享麦位监听

#### Parameters

| Name | Type |
| :------ | :------ |
| `listener` | [`ScreenMicSeatListener`](../interfaces/ScreenMicSeatListener.md) |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:54](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L54)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:42](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L42)

___

### disableScreen

▸ **disableScreen**(): `undefined` \| `Promise`<`void`\>

取消发布本地屏幕

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:159](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L159)

___

### enableScreen

▸ **enableScreen**(): `Promise`<`void`\>

采集本地屏幕/采集并发布本地屏幕
未在房间内只采集本地track, 在房间内采集并发布本地track
角色只限制发布track，目的是为了兼容设备检测时采集摄像头

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:137](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L137)

___

### getUserScreenTrack

▸ **getUserScreenTrack**(`userID`): `undefined` \| `QNRemoteTrack` \| `QNLocalTrack`

获取用户麦克风track

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | `string` |

#### Returns

`undefined` \| `QNRemoteTrack` \| `QNLocalTrack`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:249](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L249)

___

### handleRtcUserPublished

▸ **handleRtcUserPublished**(`userID`, `tracks`): `void`

用户发布track

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | `string` |
| `tracks` | (`QNRemoteVideoTrack` \| `QNRemoteAudioTrack`)[] |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:73](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L73)

___

### handleRtcUserUnpublished

▸ **handleRtcUserUnpublished**(`userID`, `tracks`): `void`

用户取消发布track

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | `string` |
| `tracks` | (`QNRemoteVideoTrack` \| `QNRemoteAudioTrack`)[] |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:100](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L100)

___

### muteAllRemoteScreen

▸ **muteAllRemoteScreen**(`muted`): `Promise`<`void`\> \| `Promise`<{ `audioTracks`: `QNRemoteAudioTrack`[] ; `videoTracks`: `QNRemoteVideoTrack`[]  }\>

屏蔽/不屏蔽远端所有屏幕采集

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `muted` | `boolean` | true-关闭、false-开启 |

#### Returns

`Promise`<`void`\> \| `Promise`<{ `audioTracks`: `QNRemoteAudioTrack`[] ; `videoTracks`: `QNRemoteVideoTrack`[]  }\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:290](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L290)

___

### muteLocalScreen

▸ **muteLocalScreen**(`muted`): `void`

mute 屏幕

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `muted` | `boolean` | true-关闭、false-开启 |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:226](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L226)

___

### muteRemoteScreen

▸ **muteRemoteScreen**(`userID`, `muted`): `Promise`<`void`\> \| `Promise`<{ `audioTracks`: `QNRemoteAudioTrack`[] ; `videoTracks`: `QNRemoteVideoTrack`[]  }\>

屏蔽/不屏蔽远端某人的屏幕采集

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userID` | `string` |  |
| `muted` | `boolean` | true-关闭、false-开启 |

#### Returns

`Promise`<`void`\> \| `Promise`<{ `audioTracks`: `QNRemoteAudioTrack`[] ; `videoTracks`: `QNRemoteVideoTrack`[]  }\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:264](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L264)

___

### removeScreenMicSeatListener

▸ **removeScreenMicSeatListener**(`listener`): `void`

移除屏幕共享麦位监听

#### Parameters

| Name | Type |
| :------ | :------ |
| `listener` | [`ScreenMicSeatListener`](../interfaces/ScreenMicSeatListener.md) |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:62](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L62)

___

### setLocalScreenWindowView

▸ **setLocalScreenWindowView**(`elementId`): `undefined` \| `Promise`<`void`\>

设置本地屏幕预览窗口

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `elementId` | `string` | 元素id |

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:236](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L236)

___

### setUpLocalScreenParams

▸ **setUpLocalScreenParams**(`config?`): `void`

设置屏幕采集参数

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | `QNScreenVideoTrackConfig` |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:125](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L125)

___

### setUserScreenWindowView

▸ **setUserScreenWindowView**(`userID`, `elementId`): `undefined` \| `Promise`<`void`\>

设置远端某个用户屏幕预览窗口

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userID` | `string` | 用户id |
| `elementId` | `string` | 元素id |

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:312](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L312)

___

### userSitDown

▸ `Private` **userSitDown**(`userID`): `void`

用户上麦

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | `string` |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:182](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L182)

___

### userSitUp

▸ `Private` **userSitUp**(`userID`): `void`

用户下麦

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | `string` |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts:208](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/ScreenTrackTool.ts#L208)
