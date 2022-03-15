[qnweb-high-level-rtc](../README.md) / [Exports](../modules.md) / MutableTrackRoom

# Class: MutableTrackRoom

## Hierarchy

- [`RtcRoom`](RtcRoom.md)

  ↳ **`MutableTrackRoom`**

## Table of contents

### Constructors

- [constructor](MutableTrackRoom.md#constructor)

### Properties

- [QNRTCVersion](MutableTrackRoom.md#qnrtcversion)
- [clientRoleType](MutableTrackRoom.md#clientroletype)
- [currentUserExtension](MutableTrackRoom.md#currentuserextension)
- [currentUserId](MutableTrackRoom.md#currentuserid)
- [customTrackTool](MutableTrackRoom.md#customtracktool)
- [filteredTrackTypes](MutableTrackRoom.md#filteredtracktypes)
- [isJoined](MutableTrackRoom.md#isjoined)
- [localCameraParams](MutableTrackRoom.md#localcameraparams)
- [localCameraTrack](MutableTrackRoom.md#localcameratrack)
- [localMicrophoneParams](MutableTrackRoom.md#localmicrophoneparams)
- [localMicrophoneTrack](MutableTrackRoom.md#localmicrophonetrack)
- [localTracks](MutableTrackRoom.md#localtracks)
- [mMicSeats](MutableTrackRoom.md#mmicseats)
- [micSeatListeners](MutableTrackRoom.md#micseatlisteners)
- [mixStreamTool](MutableTrackRoom.md#mixstreamtool)
- [playerTool](MutableTrackRoom.md#playertool)
- [roomEntity](MutableTrackRoom.md#roomentity)
- [rtcClient](MutableTrackRoom.md#rtcclient)
- [screenTrackTool](MutableTrackRoom.md#screentracktool)
- [subscribedTracks](MutableTrackRoom.md#subscribedtracks)
- [tag](MutableTrackRoom.md#tag)

### Methods

- [addMicSeatListener](MutableTrackRoom.md#addmicseatlistener)
- [addTrackMuteListener](MutableTrackRoom.md#addtrackmutelistener)
- [bindEvents](MutableTrackRoom.md#bindevents)
- [disableCamera](MutableTrackRoom.md#disablecamera)
- [disableMicrophone](MutableTrackRoom.md#disablemicrophone)
- [enableCamera](MutableTrackRoom.md#enablecamera)
- [enableMicrophone](MutableTrackRoom.md#enablemicrophone)
- [getCustomTrackTool](MutableTrackRoom.md#getcustomtracktool)
- [getMicSeatByUid](MutableTrackRoom.md#getmicseatbyuid)
- [getMixStreamTool](MutableTrackRoom.md#getmixstreamtool)
- [getPlayerTool](MutableTrackRoom.md#getplayertool)
- [getRtcClient](MutableTrackRoom.md#getrtcclient)
- [getRtmClient](MutableTrackRoom.md#getrtmclient)
- [getScreenTrackTool](MutableTrackRoom.md#getscreentracktool)
- [getSubscribeTracks](MutableTrackRoom.md#getsubscribetracks)
- [getUserCameraTrack](MutableTrackRoom.md#getusercameratrack)
- [getUserMicrophoneTrack](MutableTrackRoom.md#getusermicrophonetrack)
- [handleRtcConnectionStateChanged](MutableTrackRoom.md#handlertcconnectionstatechanged)
- [handleRtcDirectLivestreamingStateChanged](MutableTrackRoom.md#handlertcdirectlivestreamingstatechanged)
- [handleRtcMessageReceived](MutableTrackRoom.md#handlertcmessagereceived)
- [handleRtcTranscodingLivestreamingStateChanged](MutableTrackRoom.md#handlertctranscodinglivestreamingstatechanged)
- [handleRtcUserJoined](MutableTrackRoom.md#handlertcuserjoined)
- [handleRtcUserLeft](MutableTrackRoom.md#handlertcuserleft)
- [handleRtcUserPublished](MutableTrackRoom.md#handlertcuserpublished)
- [handleRtcUserReconnected](MutableTrackRoom.md#handlertcuserreconnected)
- [handleRtcUserReconnecting](MutableTrackRoom.md#handlertcuserreconnecting)
- [handleRtcUserUnpublished](MutableTrackRoom.md#handlertcuserunpublished)
- [handleRtmMessageReceived](MutableTrackRoom.md#handlertmmessagereceived)
- [initRemoteMicSeats](MutableTrackRoom.md#initremotemicseats)
- [initTrackMicSeats](MutableTrackRoom.md#inittrackmicseats)
- [joinRoom](MutableTrackRoom.md#joinroom)
- [leaveRoom](MutableTrackRoom.md#leaveroom)
- [muteAllRemoteCamera](MutableTrackRoom.md#muteallremotecamera)
- [muteAllRemoteMicrophone](MutableTrackRoom.md#muteallremotemicrophone)
- [muteLocalCamera](MutableTrackRoom.md#mutelocalcamera)
- [muteLocalMicrophone](MutableTrackRoom.md#mutelocalmicrophone)
- [muteRemoteCamera](MutableTrackRoom.md#muteremotecamera)
- [muteRemoteMicrophone](MutableTrackRoom.md#muteremotemicrophone)
- [removeMicSeatListener](MutableTrackRoom.md#removemicseatlistener)
- [setClientRoleType](MutableTrackRoom.md#setclientroletype)
- [setFilteredTrackTypes](MutableTrackRoom.md#setfilteredtracktypes)
- [setLocalCameraWindowView](MutableTrackRoom.md#setlocalcamerawindowview)
- [setLocalMicrophoneWindowView](MutableTrackRoom.md#setlocalmicrophonewindowview)
- [setUpLocalCameraParams](MutableTrackRoom.md#setuplocalcameraparams)
- [setUpLocalMicrophoneParams](MutableTrackRoom.md#setuplocalmicrophoneparams)
- [setUserCameraWindowView](MutableTrackRoom.md#setusercamerawindowview)
- [setUserMicrophoneWindowView](MutableTrackRoom.md#setusermicrophonewindowview)
- [unbindEvents](MutableTrackRoom.md#unbindevents)
- [userCameraStatusChanged](MutableTrackRoom.md#usercamerastatuschanged)
- [userClientTypeSyncMicSeats](MutableTrackRoom.md#userclienttypesyncmicseats)
- [userMicrophoneStatusChanged](MutableTrackRoom.md#usermicrophonestatuschanged)
- [userSitDown](MutableTrackRoom.md#usersitdown)
- [userSitUp](MutableTrackRoom.md#usersitup)

## Constructors

### constructor

• **new MutableTrackRoom**()

#### Overrides

[RtcRoom](RtcRoom.md).[constructor](RtcRoom.md#constructor)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:37](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L37)

## Properties

### QNRTCVersion

• **QNRTCVersion**: `string` = `QNRTC.VERSION`

#### Inherited from

[RtcRoom](RtcRoom.md).[QNRTCVersion](RtcRoom.md#qnrtcversion)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:43](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L43)

___

### clientRoleType

• **clientRoleType**: [`ClientRoleType`](../enums/ClientRoleType.md) = `ClientRoleType.CLIENT_ROLE_AUDIENCE`

#### Inherited from

[RtcRoom](RtcRoom.md).[clientRoleType](RtcRoom.md#clientroletype)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:36](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L36)

___

### currentUserExtension

• `Optional` **currentUserExtension**: [`UserExtension`](../interfaces/UserExtension.md)

#### Inherited from

[RtcRoom](RtcRoom.md).[currentUserExtension](RtcRoom.md#currentuserextension)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:42](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L42)

___

### currentUserId

• **currentUserId**: `string` = `''`

#### Inherited from

[RtcRoom](RtcRoom.md).[currentUserId](RtcRoom.md#currentuserid)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:41](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L41)

___

### customTrackTool

• **customTrackTool**: [`CustomTrackTool`](CustomTrackTool.md)

#### Inherited from

[RtcRoom](RtcRoom.md).[customTrackTool](RtcRoom.md#customtracktool)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:38](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L38)

___

### filteredTrackTypes

• **filteredTrackTypes**: `string`[] = `[]`

#### Inherited from

[RtcRoom](RtcRoom.md).[filteredTrackTypes](RtcRoom.md#filteredtracktypes)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:47](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L47)

___

### isJoined

• **isJoined**: `boolean` = `false`

#### Inherited from

[RtcRoom](RtcRoom.md).[isJoined](RtcRoom.md#isjoined)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:29](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L29)

___

### localCameraParams

• `Optional` **localCameraParams**: `QNCameraVideoTrackConfig`

#### Inherited from

[RtcRoom](RtcRoom.md).[localCameraParams](RtcRoom.md#localcameraparams)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:30](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L30)

___

### localCameraTrack

• `Optional` **localCameraTrack**: ``null`` \| `QNCameraVideoTrack`

#### Inherited from

[RtcRoom](RtcRoom.md).[localCameraTrack](RtcRoom.md#localcameratrack)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:32](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L32)

___

### localMicrophoneParams

• `Optional` **localMicrophoneParams**: `QNMicrophoneAudioTrackConfig`

#### Inherited from

[RtcRoom](RtcRoom.md).[localMicrophoneParams](RtcRoom.md#localmicrophoneparams)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:31](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L31)

___

### localMicrophoneTrack

• `Optional` **localMicrophoneTrack**: ``null`` \| `QNMicrophoneAudioTrack`

#### Inherited from

[RtcRoom](RtcRoom.md).[localMicrophoneTrack](RtcRoom.md#localmicrophonetrack)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:33](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L33)

___

### localTracks

• **localTracks**: `QNLocalTrack`[] = `[]`

#### Inherited from

[RtcRoom](RtcRoom.md).[localTracks](RtcRoom.md#localtracks)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:34](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L34)

___

### mMicSeats

• **mMicSeats**: [`MutableTrackRoomSeat`](../interfaces/MutableTrackRoomSeat.md)[] = `[]`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:34](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L34)

___

### micSeatListeners

• **micSeatListeners**: [`MicSeatListener`](../interfaces/MicSeatListener.md)<[`MutableTrackRoomSeat`](../interfaces/MutableTrackRoomSeat.md)\>[] = `[]`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:35](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L35)

___

### mixStreamTool

• **mixStreamTool**: [`MixStreamTool`](MixStreamTool.md)

#### Inherited from

[RtcRoom](RtcRoom.md).[mixStreamTool](RtcRoom.md#mixstreamtool)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:39](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L39)

___

### playerTool

• **playerTool**: [`PlayerTool`](PlayerTool.md)

#### Inherited from

[RtcRoom](RtcRoom.md).[playerTool](RtcRoom.md#playertool)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:40](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L40)

___

### roomEntity

• **roomEntity**: ``null`` \| [`RoomEntity`](../interfaces/RoomEntity.md) = `null`

#### Inherited from

[RtcRoom](RtcRoom.md).[roomEntity](RtcRoom.md#roomentity)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:27](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L27)

___

### rtcClient

• **rtcClient**: `QNRTCClient`

#### Inherited from

[RtcRoom](RtcRoom.md).[rtcClient](RtcRoom.md#rtcclient)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:28](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L28)

___

### screenTrackTool

• **screenTrackTool**: [`ScreenTrackTool`](ScreenTrackTool.md)

#### Inherited from

[RtcRoom](RtcRoom.md).[screenTrackTool](RtcRoom.md#screentracktool)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:37](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L37)

___

### subscribedTracks

• **subscribedTracks**: `QNRemoteTrack`[] = `[]`

#### Inherited from

[RtcRoom](RtcRoom.md).[subscribedTracks](RtcRoom.md#subscribedtracks)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:35](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L35)

___

### tag

• **tag**: `string` = `'[MutableTrackRoom]'`

#### Overrides

[RtcRoom](RtcRoom.md).[tag](RtcRoom.md#tag)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:36](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L36)

## Methods

### addMicSeatListener

▸ **addMicSeatListener**(`listener`): `void`

添加麦位事件监听

#### Parameters

| Name | Type |
| :------ | :------ |
| `listener` | [`MicSeatListener`](../interfaces/MicSeatListener.md)<[`MutableTrackRoomSeat`](../interfaces/MutableTrackRoomSeat.md)\> |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:57](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L57)

___

### addTrackMuteListener

▸ `Private` **addTrackMuteListener**(`tracks`): `void`

监听track的mute事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `tracks` | `QNRemoteTrack`[] |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:630](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L630)

___

### bindEvents

▸ `Private` **bindEvents**(): `void`

注册事件监听

**`link`** https://developer.qiniu.com/rtc/9246/WEB%20API%20%E6%A6%82%E8%A7%88

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:329](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L329)

___

### disableCamera

▸ **disableCamera**(): `Promise`<`void`\>

关闭摄像头
有人关闭摄像头则触发关闭摄像头回调

#### Returns

`Promise`<`void`\>

#### Overrides

[RtcRoom](RtcRoom.md).[disableCamera](RtcRoom.md#disablecamera)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:166](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L166)

___

### disableMicrophone

▸ **disableMicrophone**(): `Promise`<`void`\>

关闭麦克风
有人关闭麦克风则触发关闭麦克风回调

#### Returns

`Promise`<`void`\>

#### Overrides

[RtcRoom](RtcRoom.md).[disableMicrophone](RtcRoom.md#disablemicrophone)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:204](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L204)

___

### enableCamera

▸ **enableCamera**(): `Promise`<`void`\>

开启摄像头
主播角色: 开启摄像头+发布
有人打开摄像头则触发打开摄像头回调

#### Returns

`Promise`<`void`\>

#### Overrides

[RtcRoom](RtcRoom.md).[enableCamera](RtcRoom.md#enablecamera)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:147](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L147)

___

### enableMicrophone

▸ **enableMicrophone**(): `Promise`<`void`\>

开启麦克风
有人打开麦克风则触发打开麦克风回调

#### Returns

`Promise`<`void`\>

#### Overrides

[RtcRoom](RtcRoom.md).[enableMicrophone](RtcRoom.md#enablemicrophone)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:185](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L185)

___

### getCustomTrackTool

▸ **getCustomTrackTool**(): [`CustomTrackTool`](CustomTrackTool.md)

#### Returns

[`CustomTrackTool`](CustomTrackTool.md)

#### Inherited from

[RtcRoom](RtcRoom.md).[getCustomTrackTool](RtcRoom.md#getcustomtracktool)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:436](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L436)

___

### getMicSeatByUid

▸ `Private` **getMicSeatByUid**(`uid`): `undefined` \| [`MutableTrackRoomSeat`](../interfaces/MutableTrackRoomSeat.md)

根据id查找麦位

#### Parameters

| Name | Type |
| :------ | :------ |
| `uid` | `string` |

#### Returns

`undefined` \| [`MutableTrackRoomSeat`](../interfaces/MutableTrackRoomSeat.md)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:668](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L668)

___

### getMixStreamTool

▸ **getMixStreamTool**(): [`MixStreamTool`](MixStreamTool.md)

#### Returns

[`MixStreamTool`](MixStreamTool.md)

#### Inherited from

[RtcRoom](RtcRoom.md).[getMixStreamTool](RtcRoom.md#getmixstreamtool)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:440](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L440)

___

### getPlayerTool

▸ **getPlayerTool**(): [`PlayerTool`](PlayerTool.md)

#### Returns

[`PlayerTool`](PlayerTool.md)

#### Inherited from

[RtcRoom](RtcRoom.md).[getPlayerTool](RtcRoom.md#getplayertool)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:444](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L444)

___

### getRtcClient

▸ **getRtcClient**(): `QNRTCClient`

获取QNRTCClient

#### Returns

`QNRTCClient`

#### Inherited from

[RtcRoom](RtcRoom.md).[getRtcClient](RtcRoom.md#getrtcclient)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:52](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L52)

___

### getRtmClient

▸ **getRtmClient**(): [`RtmAdapter`](../interfaces/RtmAdapter.md)

获取rtmClient

#### Returns

[`RtmAdapter`](../interfaces/RtmAdapter.md)

#### Inherited from

[RtcRoom](RtcRoom.md).[getRtmClient](RtcRoom.md#getrtmclient)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:59](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L59)

___

### getScreenTrackTool

▸ **getScreenTrackTool**(): [`ScreenTrackTool`](ScreenTrackTool.md)

#### Returns

[`ScreenTrackTool`](ScreenTrackTool.md)

#### Inherited from

[RtcRoom](RtcRoom.md).[getScreenTrackTool](RtcRoom.md#getscreentracktool)

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

#### Inherited from

[RtcRoom](RtcRoom.md).[getSubscribeTracks](RtcRoom.md#getsubscribetracks)

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

#### Inherited from

[RtcRoom](RtcRoom.md).[getUserCameraTrack](RtcRoom.md#getusercameratrack)

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

#### Inherited from

[RtcRoom](RtcRoom.md).[getUserMicrophoneTrack](RtcRoom.md#getusermicrophonetrack)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:422](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L422)

___

### handleRtcConnectionStateChanged

▸ `Private` **handleRtcConnectionStateChanged**(`connectionState`, `info`): `void`

连接状态改变

**`link`** https://developer.qiniu.com/rtc/9090/WebQNRTCClient#connection-state-changed

#### Parameters

| Name | Type |
| :------ | :------ |
| `connectionState` | `QNConnectionState` |
| `info` | `QNConnectionDisconnectedInfo` |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:559](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L559)

___

### handleRtcDirectLivestreamingStateChanged

▸ `Private` **handleRtcDirectLivestreamingStateChanged**(`streamID`, `state`): `void`

CDN 转推状态变化

**`link`** https://developer.qiniu.com/rtc/9090/WebQNRTCClient#direct-livestreaming-state-changed

#### Parameters

| Name | Type |
| :------ | :------ |
| `streamID` | `string` |
| `state` | `QNLiveStreamingState` |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:596](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L596)

___

### handleRtcMessageReceived

▸ `Private` **handleRtcMessageReceived**(`message`): `void`

信息接收

**`link`** https://developer.qiniu.com/rtc/9090/WebQNRTCClient#message-received

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `QNCustomMessage` |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:568](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L568)

___

### handleRtcTranscodingLivestreamingStateChanged

▸ `Private` **handleRtcTranscodingLivestreamingStateChanged**(`streamID`, `state`): `void`

合流转推状态变化

**`link`** https://developer.qiniu.com/rtc/9090/WebQNRTCClient#transcoding-livestreaming-state-changed

#### Parameters

| Name | Type |
| :------ | :------ |
| `streamID` | `string` |
| `state` | `QNLiveStreamingState` |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:606](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L606)

___

### handleRtcUserJoined

▸ `Private` **handleRtcUserJoined**(`remoteUserID`, `userData?`): `void`

用户加入房间

**`link`** https://developer.qiniu.com/rtc/9090/WebQNRTCClient#user-joined

#### Parameters

| Name | Type |
| :------ | :------ |
| `remoteUserID` | `string` |
| `userData?` | `string` |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:483](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L483)

___

### handleRtcUserLeft

▸ `Private` **handleRtcUserLeft**(`remoteUserID`): `void`

用户离开房间

**`link`** https://developer.qiniu.com/rtc/9090/WebQNRTCClient#user-left

#### Parameters

| Name | Type |
| :------ | :------ |
| `remoteUserID` | `string` |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:497](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L497)

___

### handleRtcUserPublished

▸ `Private` **handleRtcUserPublished**(`userID`, `tracks`): `void`

用户添加媒体轨

**`link`** https://developer.qiniu.com/rtc/9090/WebQNRTCClient#user-published

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | `string` |
| `tracks` | (`QNRemoteVideoTrack` \| `QNRemoteAudioTrack`)[] |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:508](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L508)

___

### handleRtcUserReconnected

▸ `Private` **handleRtcUserReconnected**(`remoteUserID`): `void`

用户重连成功

**`link`** https://developer.qiniu.com/rtc/9090/WebQNRTCClient#user-reconnected

#### Parameters

| Name | Type |
| :------ | :------ |
| `remoteUserID` | `string` |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:586](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L586)

___

### handleRtcUserReconnecting

▸ `Private` **handleRtcUserReconnecting**(`remoteUserID`): `void`

用户重连中

**`link`** https://developer.qiniu.com/rtc/9090/WebQNRTCClient#user-reconnecting

#### Parameters

| Name | Type |
| :------ | :------ |
| `remoteUserID` | `string` |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:577](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L577)

___

### handleRtcUserUnpublished

▸ `Private` **handleRtcUserUnpublished**(`userID`, `tracks`): `void`

用户移除媒体轨

**`link`** https://developer.qiniu.com/rtc/9090/WebQNRTCClient#user-unpublished

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | `string` |
| `tracks` | (`QNRemoteVideoTrack` \| `QNRemoteAudioTrack`)[] |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:536](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L536)

___

### handleRtmMessageReceived

▸ `Private` **handleRtmMessageReceived**(`msg`, `peerId`): `void`

监听IM消息

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `peerId` | `string` |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:450](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L450)

___

### initRemoteMicSeats

▸ `Private` **initRemoteMicSeats**(): `void`

初始化远端用户麦位

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:648](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L648)

___

### initTrackMicSeats

▸ `Private` **initTrackMicSeats**(`tracks`): `void`

初始化track对应麦位数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `tracks` | `QNRemoteTrack`[] |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:614](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L614)

___

### joinRoom

▸ **joinRoom**(`roomEntity`, `userExtension?`): `Promise`<`void`\>

加入房间
主播角色: 加入房间+上麦
其他角色: 离开房间

#### Parameters

| Name | Type |
| :------ | :------ |
| `roomEntity` | [`RoomEntity`](../interfaces/RoomEntity.md) |
| `userExtension?` | [`UserExtension`](../interfaces/UserExtension.md) |

#### Returns

`Promise`<`void`\>

#### Overrides

[RtcRoom](RtcRoom.md).[joinRoom](RtcRoom.md#joinroom)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:94](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L94)

___

### leaveRoom

▸ **leaveRoom**(): `Promise`<`void`\>

离开房间
主播角色: 离开房间+下麦
其他角色: 离开房间

#### Returns

`Promise`<`void`\>

#### Overrides

[RtcRoom](RtcRoom.md).[leaveRoom](RtcRoom.md#leaveroom)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:121](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L121)

___

### muteAllRemoteCamera

▸ **muteAllRemoteCamera**(`muted`): `Promise`<`void`\>

mute远端所有摄像头

#### Parameters

| Name | Type |
| :------ | :------ |
| `muted` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Overrides

[RtcRoom](RtcRoom.md).[muteAllRemoteCamera](RtcRoom.md#muteallremotecamera)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:293](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L293)

___

### muteAllRemoteMicrophone

▸ **muteAllRemoteMicrophone**(`muted`): `Promise`<`void`\>

mute远端所有麦克风

#### Parameters

| Name | Type |
| :------ | :------ |
| `muted` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Overrides

[RtcRoom](RtcRoom.md).[muteAllRemoteMicrophone](RtcRoom.md#muteallremotemicrophone)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:311](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L311)

___

### muteLocalCamera

▸ **muteLocalCamera**(`muted`): `void`

mute摄像头

#### Parameters

| Name | Type |
| :------ | :------ |
| `muted` | `boolean` |

#### Returns

`void`

#### Overrides

[RtcRoom](RtcRoom.md).[muteLocalCamera](RtcRoom.md#mutelocalcamera)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:223](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L223)

___

### muteLocalMicrophone

▸ **muteLocalMicrophone**(`muted`): `void`

mute麦克风

#### Parameters

| Name | Type |
| :------ | :------ |
| `muted` | `boolean` |

#### Returns

`void`

#### Overrides

[RtcRoom](RtcRoom.md).[muteLocalMicrophone](RtcRoom.md#mutelocalmicrophone)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:241](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L241)

___

### muteRemoteCamera

▸ **muteRemoteCamera**(`userId`, `muted`): `Promise`<`void`\>

mute远端摄像头

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |
| `muted` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Overrides

[RtcRoom](RtcRoom.md).[muteRemoteCamera](RtcRoom.md#muteremotecamera)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:260](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L260)

___

### muteRemoteMicrophone

▸ **muteRemoteMicrophone**(`userId`, `muted`): `Promise`<`void`\>

mute远端麦克风

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |
| `muted` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Overrides

[RtcRoom](RtcRoom.md).[muteRemoteMicrophone](RtcRoom.md#muteremotemicrophone)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:277](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L277)

___

### removeMicSeatListener

▸ **removeMicSeatListener**(`listener`): `void`

移除事件监听

#### Parameters

| Name | Type |
| :------ | :------ |
| `listener` | [`MicSeatListener`](../interfaces/MicSeatListener.md)<[`MutableTrackRoomSeat`](../interfaces/MutableTrackRoomSeat.md)\> |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:65](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L65)

___

### setClientRoleType

▸ **setClientRoleType**(`clientRoleType`): `void`

切换角色

#### Parameters

| Name | Type |
| :------ | :------ |
| `clientRoleType` | [`ClientRoleType`](../enums/ClientRoleType.md) |

#### Returns

`void`

#### Overrides

[RtcRoom](RtcRoom.md).[setClientRoleType](RtcRoom.md#setclientroletype)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:83](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L83)

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

#### Inherited from

[RtcRoom](RtcRoom.md).[setFilteredTrackTypes](RtcRoom.md#setfilteredtracktypes)

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

#### Inherited from

[RtcRoom](RtcRoom.md).[setLocalCameraWindowView](RtcRoom.md#setlocalcamerawindowview)

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

#### Inherited from

[RtcRoom](RtcRoom.md).[setLocalMicrophoneWindowView](RtcRoom.md#setlocalmicrophonewindowview)

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

#### Inherited from

[RtcRoom](RtcRoom.md).[setUpLocalCameraParams](RtcRoom.md#setuplocalcameraparams)

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

#### Inherited from

[RtcRoom](RtcRoom.md).[setUpLocalMicrophoneParams](RtcRoom.md#setuplocalmicrophoneparams)

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

#### Inherited from

[RtcRoom](RtcRoom.md).[setUserCameraWindowView](RtcRoom.md#setusercamerawindowview)

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

#### Inherited from

[RtcRoom](RtcRoom.md).[setUserMicrophoneWindowView](RtcRoom.md#setusermicrophonewindowview)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts:388](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RtcRoom.ts#L388)

___

### unbindEvents

▸ `Private` **unbindEvents**(): `void`

解绑事件监听

**`link`** https://developer.qiniu.com/rtc/9246/WEB%20API%20%E6%A6%82%E8%A7%88

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:349](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L349)

___

### userCameraStatusChanged

▸ `Private` **userCameraStatusChanged**(`uid`, `status`): `void`

用户摄像头状态改变

#### Parameters

| Name | Type |
| :------ | :------ |
| `uid` | `string` |
| `status` | `boolean` |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:410](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L410)

___

### userClientTypeSyncMicSeats

▸ **userClientTypeSyncMicSeats**(`mMicSeats`): `void`

初始化同步麦位

#### Parameters

| Name | Type |
| :------ | :------ |
| `mMicSeats` | [`MutableTrackRoomSeat`](../interfaces/MutableTrackRoomSeat.md)[] |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:75](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L75)

___

### userMicrophoneStatusChanged

▸ `Private` **userMicrophoneStatusChanged**(`uid`, `status`): `void`

用户麦克风状态改变

#### Parameters

| Name | Type |
| :------ | :------ |
| `uid` | `string` |
| `status` | `boolean` |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:430](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L430)

___

### userSitDown

▸ `Private` **userSitDown**(`uid`, `userExtension?`): `void`

上麦

#### Parameters

| Name | Type |
| :------ | :------ |
| `uid` | `string` |
| `userExtension?` | [`UserExtension`](../interfaces/UserExtension.md) |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:370](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L370)

___

### userSitUp

▸ `Private` **userSitUp**(`uid`): `void`

下麦

#### Parameters

| Name | Type |
| :------ | :------ |
| `uid` | `string` |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts:391](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MutableTrackRoom.ts#L391)
