[qnweb-high-level-rtc](../README.md) / [Exports](../modules.md) / LazyTrackRoom

# Class: LazyTrackRoom

## Hierarchy

- [`RtcRoom`](RtcRoom.md)

  ↳ **`LazyTrackRoom`**

## Table of contents

### Constructors

- [constructor](LazyTrackRoom.md#constructor)

### Properties

- [QNRTCVersion](LazyTrackRoom.md#qnrtcversion)
- [clientRoleType](LazyTrackRoom.md#clientroletype)
- [currentUserExtension](LazyTrackRoom.md#currentuserextension)
- [currentUserId](LazyTrackRoom.md#currentuserid)
- [customTrackTool](LazyTrackRoom.md#customtracktool)
- [filteredTrackTypes](LazyTrackRoom.md#filteredtracktypes)
- [isJoined](LazyTrackRoom.md#isjoined)
- [localCameraParams](LazyTrackRoom.md#localcameraparams)
- [localCameraTrack](LazyTrackRoom.md#localcameratrack)
- [localMicrophoneParams](LazyTrackRoom.md#localmicrophoneparams)
- [localMicrophoneTrack](LazyTrackRoom.md#localmicrophonetrack)
- [localTracks](LazyTrackRoom.md#localtracks)
- [mMicSeats](LazyTrackRoom.md#mmicseats)
- [micSeatListeners](LazyTrackRoom.md#micseatlisteners)
- [mixStreamTool](LazyTrackRoom.md#mixstreamtool)
- [playerTool](LazyTrackRoom.md#playertool)
- [roomEntity](LazyTrackRoom.md#roomentity)
- [rtcClient](LazyTrackRoom.md#rtcclient)
- [screenTrackTool](LazyTrackRoom.md#screentracktool)
- [subscribedTracks](LazyTrackRoom.md#subscribedtracks)
- [tag](LazyTrackRoom.md#tag)

### Methods

- [addMicSeatListener](LazyTrackRoom.md#addmicseatlistener)
- [addTrackMuteListener](LazyTrackRoom.md#addtrackmutelistener)
- [bindEvents](LazyTrackRoom.md#bindevents)
- [disableCamera](LazyTrackRoom.md#disablecamera)
- [disableMicrophone](LazyTrackRoom.md#disablemicrophone)
- [enableCamera](LazyTrackRoom.md#enablecamera)
- [enableMicrophone](LazyTrackRoom.md#enablemicrophone)
- [getCustomTrackTool](LazyTrackRoom.md#getcustomtracktool)
- [getMicSeatByUid](LazyTrackRoom.md#getmicseatbyuid)
- [getMixStreamTool](LazyTrackRoom.md#getmixstreamtool)
- [getPlayerTool](LazyTrackRoom.md#getplayertool)
- [getRtcClient](LazyTrackRoom.md#getrtcclient)
- [getRtmClient](LazyTrackRoom.md#getrtmclient)
- [getScreenTrackTool](LazyTrackRoom.md#getscreentracktool)
- [getSubscribeTracks](LazyTrackRoom.md#getsubscribetracks)
- [getUserCameraTrack](LazyTrackRoom.md#getusercameratrack)
- [getUserMicrophoneTrack](LazyTrackRoom.md#getusermicrophonetrack)
- [handleRtcConnectionStateChanged](LazyTrackRoom.md#handlertcconnectionstatechanged)
- [handleRtcDirectLivestreamingStateChanged](LazyTrackRoom.md#handlertcdirectlivestreamingstatechanged)
- [handleRtcMessageReceived](LazyTrackRoom.md#handlertcmessagereceived)
- [handleRtcTranscodingLivestreamingStateChanged](LazyTrackRoom.md#handlertctranscodinglivestreamingstatechanged)
- [handleRtcUserJoined](LazyTrackRoom.md#handlertcuserjoined)
- [handleRtcUserLeft](LazyTrackRoom.md#handlertcuserleft)
- [handleRtcUserPublished](LazyTrackRoom.md#handlertcuserpublished)
- [handleRtcUserReconnected](LazyTrackRoom.md#handlertcuserreconnected)
- [handleRtcUserReconnecting](LazyTrackRoom.md#handlertcuserreconnecting)
- [handleRtcUserUnpublished](LazyTrackRoom.md#handlertcuserunpublished)
- [handleRtmMessageReceived](LazyTrackRoom.md#handlertmmessagereceived)
- [initTrackMicSeats](LazyTrackRoom.md#inittrackmicseats)
- [joinRoom](LazyTrackRoom.md#joinroom)
- [leaveRoom](LazyTrackRoom.md#leaveroom)
- [muteAllRemoteCamera](LazyTrackRoom.md#muteallremotecamera)
- [muteAllRemoteMicrophone](LazyTrackRoom.md#muteallremotemicrophone)
- [muteLocalCamera](LazyTrackRoom.md#mutelocalcamera)
- [muteLocalMicrophone](LazyTrackRoom.md#mutelocalmicrophone)
- [muteRemoteCamera](LazyTrackRoom.md#muteremotecamera)
- [muteRemoteMicrophone](LazyTrackRoom.md#muteremotemicrophone)
- [removeMicSeatListener](LazyTrackRoom.md#removemicseatlistener)
- [setClientRoleType](LazyTrackRoom.md#setclientroletype)
- [setFilteredTrackTypes](LazyTrackRoom.md#setfilteredtracktypes)
- [setLocalCameraWindowView](LazyTrackRoom.md#setlocalcamerawindowview)
- [setLocalMicrophoneWindowView](LazyTrackRoom.md#setlocalmicrophonewindowview)
- [setUpLocalCameraParams](LazyTrackRoom.md#setuplocalcameraparams)
- [setUpLocalMicrophoneParams](LazyTrackRoom.md#setuplocalmicrophoneparams)
- [setUserCameraWindowView](LazyTrackRoom.md#setusercamerawindowview)
- [setUserMicrophoneWindowView](LazyTrackRoom.md#setusermicrophonewindowview)
- [sitDown](LazyTrackRoom.md#sitdown)
- [sitUp](LazyTrackRoom.md#situp)
- [unbindEvents](LazyTrackRoom.md#unbindevents)
- [userCameraStatusChanged](LazyTrackRoom.md#usercamerastatuschanged)
- [userClientTypeSyncMicSeats](LazyTrackRoom.md#userclienttypesyncmicseats)
- [userMicrophoneStatusChanged](LazyTrackRoom.md#usermicrophonestatuschanged)
- [userSitDown](LazyTrackRoom.md#usersitdown)
- [userSitUp](LazyTrackRoom.md#usersitup)

## Constructors

### constructor

• **new LazyTrackRoom**()

#### Overrides

[RtcRoom](RtcRoom.md).[constructor](RtcRoom.md#constructor)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:41](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L41)

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

• **mMicSeats**: [`LazyTrackRoomSeat`](../interfaces/LazyTrackRoomSeat.md)[] = `[]`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:37](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L37)

___

### micSeatListeners

• **micSeatListeners**: [`MicSeatListener`](../interfaces/MicSeatListener.md)<[`LazyTrackRoomSeat`](../interfaces/LazyTrackRoomSeat.md)\>[] = `[]`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:38](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L38)

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

• **tag**: `string` = `'[LazyTrackRoom]'`

#### Overrides

[RtcRoom](RtcRoom.md).[tag](RtcRoom.md#tag)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:39](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L39)

## Methods

### addMicSeatListener

▸ **addMicSeatListener**(`listener`): `void`

添加麦位事件监听

#### Parameters

| Name | Type |
| :------ | :------ |
| `listener` | [`MicSeatListener`](../interfaces/MicSeatListener.md)<[`LazyTrackRoomSeat`](../interfaces/LazyTrackRoomSeat.md)\> |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:61](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L61)

___

### addTrackMuteListener

▸ `Private` **addTrackMuteListener**(`tracks`): `void`

监听远端track的mute事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `tracks` | `QNRemoteTrack`[] |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:377](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L377)

___

### bindEvents

▸ `Private` **bindEvents**(): `void`

注册RTC事件监听

**`link`** https://developer.qiniu.com/rtc/9246/WEB%20API%20%E6%A6%82%E8%A7%88

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:322](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L322)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:138](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L138)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:170](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L170)

___

### enableCamera

▸ **enableCamera**(): `Promise`<`void`\>

开启摄像头
有人打开摄像头则触发打开摄像头回调

#### Returns

`Promise`<`void`\>

#### Overrides

[RtcRoom](RtcRoom.md).[enableCamera](RtcRoom.md#enablecamera)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:122](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L122)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:154](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L154)

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

▸ `Private` **getMicSeatByUid**(`uid`): `undefined` \| [`LazyTrackRoomSeat`](../interfaces/LazyTrackRoomSeat.md)

根据id查找麦位

#### Parameters

| Name | Type |
| :------ | :------ |
| `uid` | `string` |

#### Returns

`undefined` \| [`LazyTrackRoomSeat`](../interfaces/LazyTrackRoomSeat.md)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:634](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L634)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:469](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L469)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:506](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L506)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:478](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L478)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:516](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L516)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:398](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L398)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:408](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L408)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:418](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L418)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:496](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L496)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:487](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L487)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:446](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L446)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:525](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L525)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:362](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L362)

___

### joinRoom

▸ **joinRoom**(`roomEntity`, `userExtension?`): `Promise`<`void`\>

加入房间

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:88](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L88)

___

### leaveRoom

▸ **leaveRoom**(): `Promise`<`void`\>

离开房间

#### Returns

`Promise`<`void`\>

#### Overrides

[RtcRoom](RtcRoom.md).[leaveRoom](RtcRoom.md#leaveroom)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:108](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L108)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:251](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L251)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:269](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L269)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:186](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L186)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:201](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L201)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:218](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L218)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:235](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L235)

___

### removeMicSeatListener

▸ **removeMicSeatListener**(`listener`): `void`

移除事件监听

#### Parameters

| Name | Type |
| :------ | :------ |
| `listener` | [`MicSeatListener`](../interfaces/MicSeatListener.md)<[`LazyTrackRoomSeat`](../interfaces/LazyTrackRoomSeat.md)\> |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:69](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L69)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:101](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L101)

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

### sitDown

▸ **sitDown**(): `void`

主动

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:286](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L286)

___

### sitUp

▸ **sitUp**(): `void`

下麦

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:304](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L304)

___

### unbindEvents

▸ `Private` **unbindEvents**(): `void`

解绑RTC事件监听

**`link`** https://developer.qiniu.com/rtc/9246/WEB%20API%20%E6%A6%82%E8%A7%88

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:342](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L342)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:595](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L595)

___

### userClientTypeSyncMicSeats

▸ **userClientTypeSyncMicSeats**(`mMicSeats`): `void`

初始化同步麦位

#### Parameters

| Name | Type |
| :------ | :------ |
| `mMicSeats` | [`LazyTrackRoomSeat`](../interfaces/LazyTrackRoomSeat.md)[] |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:79](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L79)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:615](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L615)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:557](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L557)

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

[packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts:578](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/LazyTrackRoom.ts#L578)
