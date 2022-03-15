[qnweb-high-level-rtc](README.md) / Exports

# qnweb-high-level-rtc

## Table of contents

### Enumerations

- [ClientRoleType](enums/ClientRoleType.md)

### Classes

- [CustomTrackTool](classes/CustomTrackTool.md)
- [LazyTrackRoom](classes/LazyTrackRoom.md)
- [LogModel](classes/LogModel.md)
- [MixStreamTool](classes/MixStreamTool.md)
- [MutableTrackRoom](classes/MutableTrackRoom.md)
- [PlayerTool](classes/PlayerTool.md)
- [QNRTMAdapter](classes/QNRTMAdapter.md)
- [RongCloudRTMAdapter](classes/RongCloudRTMAdapter.md)
- [RtcRoom](classes/RtcRoom.md)
- [ScreenTrackTool](classes/ScreenTrackTool.md)

### Interfaces

- [BarrageEntity](interfaces/BarrageEntity.md)
- [BarrageSignaling](interfaces/BarrageSignaling.md)
- [BaseMessageJson](interfaces/BaseMessageJson.md)
- [BaseMessageJsonData](interfaces/BaseMessageJsonData.md)
- [CameraMicStatusSignaling](interfaces/CameraMicStatusSignaling.md)
- [ChannelAttributesChangeJson](interfaces/ChannelAttributesChangeJson.md)
- [ChannelAttributesChangeValueJson](interfaces/ChannelAttributesChangeValueJson.md)
- [CustomMicSeat](interfaces/CustomMicSeat.md)
- [CustomTrackSignaling](interfaces/CustomTrackSignaling.md)
- [ForbiddenMicSeatMsg](interfaces/ForbiddenMicSeatMsg.md)
- [GiftEntity](interfaces/GiftEntity.md)
- [GiftInfo](interfaces/GiftInfo.md)
- [GiftSignaling](interfaces/GiftSignaling.md)
- [Invitation](interfaces/Invitation.md)
- [InviteSignaling](interfaces/InviteSignaling.md)
- [LazyTrackRoomSeat](interfaces/LazyTrackRoomSeat.md)
- [LikeEntity](interfaces/LikeEntity.md)
- [LikeSignaling](interfaces/LikeSignaling.md)
- [LinkerKickOutFromMicSeatSignaling](interfaces/LinkerKickOutFromMicSeatSignaling.md)
- [LinkerSitDownUpSignaling](interfaces/LinkerSitDownUpSignaling.md)
- [MicSeat](interfaces/MicSeat.md)
- [MicSeatListener](interfaces/MicSeatListener.md)
- [MutableTrackRoomSeat](interfaces/MutableTrackRoomSeat.md)
- [PkSession](interfaces/PkSession.md)
- [PubSignaling](interfaces/PubSignaling.md)
- [RoomEntity](interfaces/RoomEntity.md)
- [RtcRoomInfo](interfaces/RtcRoomInfo.md)
- [RtmAdapter](interfaces/RtmAdapter.md)
- [RtmCallBack](interfaces/RtmCallBack.md)
- [ScreenMicSeat](interfaces/ScreenMicSeat.md)
- [ScreenMicSeatListener](interfaces/ScreenMicSeatListener.md)
- [ScreenSignaling](interfaces/ScreenSignaling.md)
- [SitDownUpSignaling](interfaces/SitDownUpSignaling.md)
- [UserExtension](interfaces/UserExtension.md)
- [UserMicSeat](interfaces/UserMicSeat.md)

### Type aliases

- [ExtQNClientEventName](modules.md#extqnclienteventname)
- [KickOutSignaling](modules.md#kickoutsignaling)
- [LogLevel](modules.md#loglevel)
- [MergeOption](modules.md#mergeoption)
- [MicSeatListenerCallback](modules.md#micseatlistenercallback)
- [MixStreamJobConfig](modules.md#mixstreamjobconfig)
- [PkSignaling](modules.md#pksignaling)
- [RtmManagerLister](modules.md#rtmmanagerlister)
- [UserJoinSignaling](modules.md#userjoinsignaling)

### Properties

- [ExtQNClientEventListener](modules.md#extqnclienteventlistener)
- [RoomManager](modules.md#roommanager)
- [RoomSignalingManager](modules.md#roomsignalingmanager)
- [RtmManager](modules.md#rtmmanager)

### Variables

- [log](modules.md#log)

### Functions

- [parseRoomToken](modules.md#parseroomtoken)

## Type aliases

### ExtQNClientEventName

Ƭ **ExtQNClientEventName**: ``"localPublished"`` \| ``"localUnPublished"`` \| ``"roomLeft"``

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/event-bus/ExtQNClientEventListener.ts:1](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/event-bus/ExtQNClientEventListener.ts#L1)

___

### KickOutSignaling

Ƭ **KickOutSignaling**: { `action`: ``"rtc_kickOutFromMicSeat"`` ; `data`: { `msg`: `string` ; `seat`: [`UserMicSeat`](interfaces/UserMicSeat.md)  }  } \| { `action`: ``"rtc_kickOutFromRoom"`` ; `data`: { `msg`: `string` ; `uid`: `string`  }  }

踢人信令

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/types/signaling.ts:38](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/types/signaling.ts#L38)

___

### LogLevel

Ƭ **LogLevel**: ``"disable"`` \| ``"warning"`` \| ``"debug"`` \| ``"log"``

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/util/log.ts:1](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/util/log.ts#L1)

___

### MergeOption

Ƭ **MergeOption**: `Omit`<`QNTranscodingLiveStreamingTrack`, ``"trackID"``\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:15](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L15)

___

### MicSeatListenerCallback

Ƭ **MicSeatListenerCallback**<`T`\>: (`res`: `T`) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`MicSeat`](interfaces/MicSeat.md) = [`MicSeat`](interfaces/MicSeat.md) |

#### Type declaration

▸ (`res`): `void`

麦位事件监听回调

##### Parameters

| Name | Type |
| :------ | :------ |
| `res` | `T` |

##### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/types/rtc.ts:36](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/types/rtc.ts#L36)

___

### MixStreamJobConfig

Ƭ **MixStreamJobConfig**: `Omit`<`QNTranscodingLiveStreamingConfig`, ``"streamID"`` \| ``"url"``\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:13](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L13)

___

### PkSignaling

Ƭ **PkSignaling**: { `action`: ``"rtc_onPKStart"`` ; `data`: [`PkSession`](interfaces/PkSession.md)  } \| { `action`: ``"rtc_onError"`` \| ``"rtc_onPKStop"`` ; `data`: { `code`: `number` ; `msg`: `string`  }  } \| { `action`: ``"rtc_onPkEvent"`` ; `data`: { `eventKey`: `number` ; `value`: `string`  }  }

pk信令

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/types/signaling.ts:93](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/types/signaling.ts#L93)

___

### RtmManagerLister

Ƭ **RtmManagerLister**: (`msg`: `string`, `peerId`: `string`) => `void`

#### Type declaration

▸ (`msg`, `peerId`): `void`

RtmManager 监听器

##### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `peerId` | `string` |

##### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/types/rtm.ts:4](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/types/rtm.ts#L4)

___

### UserJoinSignaling

Ƭ **UserJoinSignaling**: { `action`: ``"rtc_userJoin"`` ; `data`: [`UserExtension`](interfaces/UserExtension.md)  } \| { `action`: ``"rtc_userLeft"`` ; `data`: [`UserExtension`](interfaces/UserExtension.md)  }

用户角色进入退出信令

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/types/signaling.ts:63](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/types/signaling.ts#L63)

## Properties

### ExtQNClientEventListener

• **ExtQNClientEventListener**: `ExtQNClientEventListener`

___

### RoomManager

• **RoomManager**: `RoomManager`

___

### RoomSignalingManager

• **RoomSignalingManager**: `RoomSignalingManager`

___

### RtmManager

• **RtmManager**: `RtmManager`

## Variables

### log

• `Const` **log**: [`LogModel`](classes/LogModel.md)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/util/log.ts:63](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/util/log.ts#L63)

## Functions

### parseRoomToken

▸ **parseRoomToken**(`token`): [`RtcRoomInfo`](interfaces/RtcRoomInfo.md)

解析roomToken

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

[`RtcRoomInfo`](interfaces/RtcRoomInfo.md)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/util/rtc.ts:16](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/util/rtc.ts#L16)
