[qnweb-high-level-rtc](../README.md) / [Exports](../modules.md) / RtcRoom

# Class: RtcRoom

## Hierarchy

- **`RtcRoom`**

  ↳ [`LazyTrackRoom`](LazyTrackRoom.md)

  ↳ [`MutableTrackRoom`](MutableTrackRoom.md)

## Table of contents

### Constructors

- [constructor](RtcRoom.md#constructor)

### Properties

- [QNRTCVersion](RtcRoom.md#qnrtcversion)
- [clientRoleType](RtcRoom.md#clientroletype)
- [currentUserExtension](RtcRoom.md#currentuserextension)
- [currentUserId](RtcRoom.md#currentuserid)
- [customTrackTool](RtcRoom.md#customtracktool)
- [filteredTrackTypes](RtcRoom.md#filteredtracktypes)
- [isJoined](RtcRoom.md#isjoined)
- [localCameraParams](RtcRoom.md#localcameraparams)
- [localCameraTrack](RtcRoom.md#localcameratrack)
- [localMicrophoneParams](RtcRoom.md#localmicrophoneparams)
- [localMicrophoneTrack](RtcRoom.md#localmicrophonetrack)
- [localTracks](RtcRoom.md#localtracks)
- [mixStreamTool](RtcRoom.md#mixstreamtool)
- [playerTool](RtcRoom.md#playertool)
- [roomEntity](RtcRoom.md#roomentity)
- [rtcClient](RtcRoom.md#rtcclient)
- [screenTrackTool](RtcRoom.md#screentracktool)
- [subscribedTracks](RtcRoom.md#subscribedtracks)
- [tag](RtcRoom.md#tag)

### Methods

- [clear](RtcRoom.md#clear)
- [disableCamera](RtcRoom.md#disablecamera)
- [disableMicrophone](RtcRoom.md#disablemicrophone)
- [enableCamera](RtcRoom.md#enablecamera)
- [enableMicrophone](RtcRoom.md#enablemicrophone)
- [getCustomTrackTool](RtcRoom.md#getcustomtracktool)
- [getMixStreamTool](RtcRoom.md#getmixstreamtool)
- [getPlayerTool](RtcRoom.md#getplayertool)
- [getRtcClient](RtcRoom.md#getrtcclient)
- [getRtmClient](RtcRoom.md#getrtmclient)
- [getScreenTrackTool](RtcRoom.md#getscreentracktool)
- [getSubscribeTracks](RtcRoom.md#getsubscribetracks)
- [getUserCameraTrack](RtcRoom.md#getusercameratrack)
- [getUserMicrophoneTrack](RtcRoom.md#getusermicrophonetrack)
- [joinRoom](RtcRoom.md#joinroom)
- [joinRtcRoom](RtcRoom.md#joinrtcroom)
- [leaveRoom](RtcRoom.md#leaveroom)
- [leaveRtcRoom](RtcRoom.md#leavertcroom)
- [muteAllRemoteCamera](RtcRoom.md#muteallremotecamera)
- [muteAllRemoteMicrophone](RtcRoom.md#muteallremotemicrophone)
- [muteLocalCamera](RtcRoom.md#mutelocalcamera)
- [muteLocalMicrophone](RtcRoom.md#mutelocalmicrophone)
- [muteRemoteCamera](RtcRoom.md#muteremotecamera)
- [muteRemoteMicrophone](RtcRoom.md#muteremotemicrophone)
- [setClientRoleType](RtcRoom.md#setclientroletype)
- [setFilteredTrackTypes](RtcRoom.md#setfilteredtracktypes)
- [setLocalCameraWindowView](RtcRoom.md#setlocalcamerawindowview)
- [setLocalMicrophoneWindowView](RtcRoom.md#setlocalmicrophonewindowview)
- [setUpLocalCameraParams](RtcRoom.md#setuplocalcameraparams)
- [setUpLocalMicrophoneParams](RtcRoom.md#setuplocalmicrophoneparams)
- [setUserCameraWindowView](RtcRoom.md#setusercamerawindowview)
- [setUserMicrophoneWindowView](RtcRoom.md#setusermicrophonewindowview)

## Constructors

### constructor

• **new RtcRoom**()

## Properties

### QNRTCVersion

• **QNRTCVersion**: `string` = `QNRTC.VERSION`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:43](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L43)

___

### clientRoleType

• **clientRoleType**: [`ClientRoleType`](../enums/ClientRoleType.md) = `ClientRoleType.CLIENT_ROLE_AUDIENCE`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:36](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L36)

___

### currentUserExtension

• `Optional` **currentUserExtension**: [`UserExtension`](../interfaces/UserExtension.md)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:42](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L42)

___

### currentUserId

• **currentUserId**: `string` = `''`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:41](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L41)

___

### customTrackTool

• **customTrackTool**: [`CustomTrackTool`](CustomTrackTool.md)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:38](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L38)

___

### filteredTrackTypes

• **filteredTrackTypes**: `string`[] = `[]`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:47](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L47)

___

### isJoined

• **isJoined**: `boolean` = `false`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:29](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L29)

___

### localCameraParams

• `Optional` **localCameraParams**: `QNCameraVideoTrackConfig`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:30](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L30)

___

### localCameraTrack

• `Optional` **localCameraTrack**: ``null`` \| `QNCameraVideoTrack`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:32](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L32)

___

### localMicrophoneParams

• `Optional` **localMicrophoneParams**: `QNMicrophoneAudioTrackConfig`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:31](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L31)

___

### localMicrophoneTrack

• `Optional` **localMicrophoneTrack**: ``null`` \| `QNMicrophoneAudioTrack`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:33](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L33)

___

### localTracks

• **localTracks**: `QNLocalTrack`[] = `[]`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:34](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L34)

___

### mixStreamTool

• **mixStreamTool**: [`MixStreamTool`](MixStreamTool.md)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:39](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L39)

___

### playerTool

• **playerTool**: [`PlayerTool`](PlayerTool.md)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:40](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L40)

___

### roomEntity

• **roomEntity**: ``null`` \| [`RoomEntity`](../interfaces/RoomEntity.md) = `null`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:27](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L27)

___

### rtcClient

• **rtcClient**: `QNRTCClient`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:28](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L28)

___

### screenTrackTool

• **screenTrackTool**: [`ScreenTrackTool`](ScreenTrackTool.md)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:37](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L37)

___

### subscribedTracks

• **subscribedTracks**: `QNRemoteTrack`[] = `[]`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:35](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L35)

___

### tag

• **tag**: `string` = `'[RtcRoom]'`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:44](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L44)

## Methods

### clear

▸ `Private` **clear**(): `void`

清理

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:452](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L452)

___

### disableCamera

▸ **disableCamera**(): `undefined` \| `Promise`<`void`\>

取消发布本地摄像头

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:189](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L189)

___

### disableMicrophone

▸ **disableMicrophone**(): `undefined` \| `Promise`<`void`\>

取消发布本地麦克风

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:209](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L209)

___

### enableCamera

▸ **enableCamera**(): `Promise`<`undefined` \| `void`\>

采集本地摄像头/采集并发布本地摄像头

#### Returns

`Promise`<`undefined` \| `void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:151](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L151)

___

### enableMicrophone

▸ **enableMicrophone**(): `Promise`<`undefined` \| `void`\>

采集本地麦克风/采集并发布本地麦克风

#### Returns

`Promise`<`undefined` \| `void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:170](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L170)

___

### getCustomTrackTool

▸ **getCustomTrackTool**(): [`CustomTrackTool`](CustomTrackTool.md)

#### Returns

[`CustomTrackTool`](CustomTrackTool.md)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:436](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L436)

___

### getMixStreamTool

▸ **getMixStreamTool**(): [`MixStreamTool`](MixStreamTool.md)

#### Returns

[`MixStreamTool`](MixStreamTool.md)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:440](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L440)

___

### getPlayerTool

▸ **getPlayerTool**(): [`PlayerTool`](PlayerTool.md)

#### Returns

[`PlayerTool`](PlayerTool.md)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:444](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L444)

___

### getRtcClient

▸ **getRtcClient**(): `QNRTCClient`

获取QNRTCClient

#### Returns

`QNRTCClient`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:52](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L52)

___

### getRtmClient

▸ **getRtmClient**(): [`RtmAdapter`](../interfaces/RtmAdapter.md)

获取rtmClient

#### Returns

[`RtmAdapter`](../interfaces/RtmAdapter.md)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:59](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L59)

___

### getScreenTrackTool

▸ **getScreenTrackTool**(): [`ScreenTrackTool`](ScreenTrackTool.md)

#### Returns

[`ScreenTrackTool`](ScreenTrackTool.md)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:432](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L432)

___

### getSubscribeTracks

▸ `Protected` **getSubscribeTracks**(`remoteTracks`): `QNRemoteTrack`[]

获取需要订阅的track

#### Parameters

| Name | Type |
| :------ | :------ |
| `remoteTracks` | `QNRemoteTrack`[] |

#### Returns

`QNRemoteTrack`[]

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:505](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L505)

___

### getUserCameraTrack

▸ **getUserCameraTrack**(`userId`): `undefined` \| `QNRemoteTrack` \| `QNLocalTrack`

获取用户摄像头track

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |

#### Returns

`undefined` \| `QNRemoteTrack` \| `QNLocalTrack`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:408](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L408)

___

### getUserMicrophoneTrack

▸ **getUserMicrophoneTrack**(`userId`): `undefined` \| `QNRemoteTrack` \| `QNLocalTrack`

获取用户麦克风track

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |

#### Returns

`undefined` \| `QNRemoteTrack` \| `QNLocalTrack`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:422](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L422)

___

### joinRoom

▸ **joinRoom**(`roomEntity`, `userExtension?`): `Promise`<`void`\>

加入房间

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `roomEntity` | [`RoomEntity`](../interfaces/RoomEntity.md) | 房间实体 |
| `userExtension?` | [`UserExtension`](../interfaces/UserExtension.md) |  |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:76](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L76)

___

### joinRtcRoom

▸ `Private` **joinRtcRoom**(`roomToken`): `Promise`<`void`\>

区分用户角色加入rtc房间

#### Parameters

| Name | Type |
| :------ | :------ |
| `roomToken` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:469](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L469)

___

### leaveRoom

▸ **leaveRoom**(): `Promise`<`void`\>

离开房间
销毁本地的track

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:109](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L109)

___

### leaveRtcRoom

▸ `Private` **leaveRtcRoom**(): `Promise`<`void`\>

区分用户角色离开rtc房间

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:484](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L484)

___

### muteAllRemoteCamera

▸ **muteAllRemoteCamera**(`muted`): `Promise`<`void`\> \| `Promise`<{ `audioTracks`: `QNRemoteAudioTrack`[] ; `videoTracks`: `QNRemoteVideoTrack`[]  }\>

屏蔽/不屏蔽远端所有摄像头

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `muted` | `boolean` | true-关闭、false-开启 |

#### Returns

`Promise`<`void`\> \| `Promise`<{ `audioTracks`: `QNRemoteAudioTrack`[] ; `videoTracks`: `QNRemoteVideoTrack`[]  }\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:298](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L298)

___

### muteAllRemoteMicrophone

▸ **muteAllRemoteMicrophone**(`muted`): `Promise`<`void`\> \| `Promise`<{ `audioTracks`: `QNRemoteAudioTrack`[] ; `videoTracks`: `QNRemoteVideoTrack`[]  }\>

屏蔽/不屏蔽远端所有麦克风

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `muted` | `boolean` | true-关闭、false-开启 |

#### Returns

`Promise`<`void`\> \| `Promise`<{ `audioTracks`: `QNRemoteAudioTrack`[] ; `videoTracks`: `QNRemoteVideoTrack`[]  }\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:319](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L319)

___

### muteLocalCamera

▸ **muteLocalCamera**(`muted`): `void`

开关摄像头

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `muted` | `boolean` | true-关闭、false-开启 |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:230](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L230)

___

### muteLocalMicrophone

▸ **muteLocalMicrophone**(`muted`): `void`

开关麦克风

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `muted` | `boolean` | true-关闭、false-开启 |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:240](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L240)

___

### muteRemoteCamera

▸ **muteRemoteCamera**(`userId`, `muted`): `Promise`<`void`\> \| `Promise`<{ `audioTracks`: `QNRemoteAudioTrack`[] ; `videoTracks`: `QNRemoteVideoTrack`[]  }\>

屏蔽/不屏蔽远端某人的摄像头

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `string` | 用户id |
| `muted` | `boolean` | true-关闭、false-开启 |

#### Returns

`Promise`<`void`\> \| `Promise`<{ `audioTracks`: `QNRemoteAudioTrack`[] ; `videoTracks`: `QNRemoteVideoTrack`[]  }\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:251](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L251)

___

### muteRemoteMicrophone

▸ **muteRemoteMicrophone**(`userId`, `muted`): `Promise`<`void`\> \| `Promise`<{ `audioTracks`: `QNRemoteAudioTrack`[] ; `videoTracks`: `QNRemoteVideoTrack`[]  }\>

屏蔽/不屏蔽远端某人的麦克风

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `string` | 用户id |
| `muted` | `boolean` | true-关闭、false-开启 |

#### Returns

`Promise`<`void`\> \| `Promise`<{ `audioTracks`: `QNRemoteAudioTrack`[] ; `videoTracks`: `QNRemoteVideoTrack`[]  }\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:275](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L275)

___

### setClientRoleType

▸ **setClientRoleType**(`clientRoleType`): `void`

设置用户角色

#### Parameters

| Name | Type |
| :------ | :------ |
| `clientRoleType` | [`ClientRoleType`](../enums/ClientRoleType.md) |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:67](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L67)

___

### setFilteredTrackTypes

▸ **setFilteredTrackTypes**(`trackTypes`): `void`

更新过滤掉远端指定的track类型

#### Parameters

| Name | Type |
| :------ | :------ |
| `trackTypes` | `string`[] |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:496](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L496)

___

### setLocalCameraWindowView

▸ **setLocalCameraWindowView**(`elementId`): `undefined` \| `Promise`<`void`\>

设置本地摄像头预览窗口

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `elementId` | `string` | 元素id |

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:340](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L340)

___

### setLocalMicrophoneWindowView

▸ **setLocalMicrophoneWindowView**(`elementId`): `undefined` \| `Promise`<`void`\>

设置本地麦克风预览窗口

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `elementId` | `string` | 元素id |

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:353](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L353)

___

### setUpLocalCameraParams

▸ **setUpLocalCameraParams**(`config?`): `void`

设置摄像头采集参数

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | `QNCameraVideoTrackConfig` |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:130](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L130)

___

### setUpLocalMicrophoneParams

▸ **setUpLocalMicrophoneParams**(`config?`): `void`

设置麦克风采集参数

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | `QNMicrophoneAudioTrackConfig` |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:141](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L141)

___

### setUserCameraWindowView

▸ **setUserCameraWindowView**(`userId`, `elementId`): `undefined` \| `Promise`<`void`\>

设置远端某个用户摄像头预览窗口

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `string` | 用户id |
| `elementId` | `string` | 元素id |

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:367](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L367)

___

### setUserMicrophoneWindowView

▸ **setUserMicrophoneWindowView**(`userId`, `elementId`): `undefined` \| `Promise`<`void`\>

设置远端某个用户麦克风预览窗口

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `string` | 用户id |
| `elementId` | `string` | 元素id |

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:388](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L388)
