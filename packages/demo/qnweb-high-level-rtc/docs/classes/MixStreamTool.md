[qnweb-high-level-rtc](../README.md) / [Exports](../modules.md) / MixStreamTool

# Class: MixStreamTool

混流

## Table of contents

### Constructors

- [constructor](MixStreamTool.md#constructor)

### Properties

- [extRtcEventMap](MixStreamTool.md#extrtceventmap)
- [rtcEventMap](MixStreamTool.md#rtceventmap)
- [rtcRoom](MixStreamTool.md#rtcroom)
- [tag](MixStreamTool.md#tag)
- [toDoCameraMergeOptionsMap](MixStreamTool.md#todocameramergeoptionsmap)
- [toDoCustomMergeOptionsMap](MixStreamTool.md#todocustommergeoptionsmap)
- [toDoMicrophoneMergeOptionsMap](MixStreamTool.md#todomicrophonemergeoptionsmap)
- [toDoScreenMergeOptionsMap](MixStreamTool.md#todoscreenmergeoptionsmap)
- [tracksMap](MixStreamTool.md#tracksmap)

### Methods

- [bindLiveStreamingListener](MixStreamTool.md#bindlivestreaminglistener)
- [clear](MixStreamTool.md#clear)
- [getPushUri](MixStreamTool.md#getpushuri)
- [getRoomId](MixStreamTool.md#getroomid)
- [handleLocalPublished](MixStreamTool.md#handlelocalpublished)
- [handleLocalUnPublished](MixStreamTool.md#handlelocalunpublished)
- [handleUserPublished](MixStreamTool.md#handleuserpublished)
- [handleUserUnPublished](MixStreamTool.md#handleuserunpublished)
- [publishTracksToUpdateOps](MixStreamTool.md#publishtrackstoupdateops)
- [resetOps](MixStreamTool.md#resetops)
- [roomLeft](MixStreamTool.md#roomleft)
- [startForwardJob](MixStreamTool.md#startforwardjob)
- [startMixStreamJob](MixStreamTool.md#startmixstreamjob)
- [stopForwardJob](MixStreamTool.md#stopforwardjob)
- [stopMixStreamJob](MixStreamTool.md#stopmixstreamjob)
- [unbindLiveStreamingListener](MixStreamTool.md#unbindlivestreaminglistener)
- [updateUserCameraMergeOptions](MixStreamTool.md#updateusercameramergeoptions)
- [updateUserCustomAudioMergeOptions](MixStreamTool.md#updateusercustomaudiomergeoptions)
- [updateUserCustomVideoMergeOptions](MixStreamTool.md#updateusercustomvideomergeoptions)
- [updateUserMergeOptions](MixStreamTool.md#updateusermergeoptions)
- [updateUserMicrophoneMergeOptions](MixStreamTool.md#updateusermicrophonemergeoptions)
- [updateUserScreenMergeOptions](MixStreamTool.md#updateuserscreenmergeoptions)

## Constructors

### constructor

• **new MixStreamTool**(`rtcRoom`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rtcRoom` | [`RtcRoom`](RtcRoom.md) |

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:83](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L83)

## Properties

### extRtcEventMap

• **extRtcEventMap**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `localPublished` | `undefined` \| `Function` |
| `localUnPublished` | `undefined` \| `Function` |
| `roomLeft` | `undefined` \| `Function` |

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:57](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L57)

___

### rtcEventMap

• **rtcEventMap**: `Object`

#### Index signature

▪ [key: `string`]: `Function`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:54](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L54)

___

### rtcRoom

• `Optional` **rtcRoom**: [`RtcRoom`](RtcRoom.md)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:47](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L47)

___

### tag

• **tag**: `string` = `'MixStreamManager'`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:48](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L48)

___

### toDoCameraMergeOptionsMap

• **toDoCameraMergeOptionsMap**: `Map`<`string`, [`MergeOption`](../modules.md#mergeoption)\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:50](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L50)

___

### toDoCustomMergeOptionsMap

• **toDoCustomMergeOptionsMap**: `Map`<`string`, [`MergeOption`](../modules.md#mergeoption)\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:53](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L53)

___

### toDoMicrophoneMergeOptionsMap

• **toDoMicrophoneMergeOptionsMap**: `Map`<`string`, [`MergeOption`](../modules.md#mergeoption)\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:51](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L51)

___

### toDoScreenMergeOptionsMap

• **toDoScreenMergeOptionsMap**: `Map`<`string`, [`MergeOption`](../modules.md#mergeoption)\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:52](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L52)

___

### tracksMap

• **tracksMap**: `Map`<`string`, [`MergeOption`](../modules.md#mergeoption)\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:49](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L49)

## Methods

### bindLiveStreamingListener

▸ **bindLiveStreamingListener**(): `void`

设置监听

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:182](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L182)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:447](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L447)

___

### getPushUri

▸ **getPushUri**(): `string`

推流地址

#### Returns

`string`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:64](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L64)

___

### getRoomId

▸ **getRoomId**(): `string`

房间id

#### Returns

`string`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:75](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L75)

___

### handleLocalPublished

▸ **handleLocalPublished**(`tracks`): `void`

监听本地用户发布track

#### Parameters

| Name | Type |
| :------ | :------ |
| `tracks` | `QNLocalTrack`[] |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:163](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L163)

___

### handleLocalUnPublished

▸ **handleLocalUnPublished**(`tracks`): `void`

监听本地用户取消发布track

#### Parameters

| Name | Type |
| :------ | :------ |
| `tracks` | `QNLocalTrack`[] |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:172](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L172)

___

### handleUserPublished

▸ **handleUserPublished**(`userID`, `tracks`): `void`

监听远端用户发布track

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | `string` |
| `tracks` | (`QNRemoteVideoTrack` \| `QNRemoteAudioTrack`)[] |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:142](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L142)

___

### handleUserUnPublished

▸ **handleUserUnPublished**(`userID`, `tracks`): `void`

监听远端用户取消发布track

#### Parameters

| Name | Type |
| :------ | :------ |
| `userID` | `string` |
| `tracks` | (`QNRemoteVideoTrack` \| `QNRemoteAudioTrack`)[] |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:152](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L152)

___

### publishTracksToUpdateOps

▸ `Private` **publishTracksToUpdateOps**(`track`): `undefined` \| `Promise`<`void`\>

监听publish更新ops

#### Parameters

| Name | Type |
| :------ | :------ |
| `track` | `QNTrack` |

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:102](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L102)

___

### resetOps

▸ **resetOps**(): `undefined` \| `Promise`<`void`\>

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:426](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L426)

___

### roomLeft

▸ **roomLeft**(): `void`

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:442](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L442)

___

### startForwardJob

▸ **startForwardJob**(): `undefined` \| `Promise`<`void`\>

启动前台转推, 默认实现推本地轨道

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:219](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L219)

___

### startMixStreamJob

▸ **startMixStreamJob**(`config?`): `undefined` \| `Promise`<`void`\>

启动混流

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`MixStreamJobConfig`](../modules.md#mixstreamjobconfig) |

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:240](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L240)

___

### stopForwardJob

▸ **stopForwardJob**(): `undefined` \| `Promise`<`void`\>

停止前台推流

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:231](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L231)

___

### stopMixStreamJob

▸ **stopMixStreamJob**(): `undefined` \| `Promise`<`void`\>

停止混流

#### Returns

`undefined` \| `Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:256](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L256)

___

### unbindLiveStreamingListener

▸ **unbindLiveStreamingListener**(): `void`

取消设置监听

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:201](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L201)

___

### updateUserCameraMergeOptions

▸ **updateUserCameraMergeOptions**(`userId`, `option?`): `void` \| `Promise`<`void`\>

更新用户摄像头混流参数

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |
| `option?` | [`MergeOption`](../modules.md#mergeoption) |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:267](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L267)

___

### updateUserCustomAudioMergeOptions

▸ **updateUserCustomAudioMergeOptions**(`extraTrackTag`, `userId`, `isNeed`): `void` \| `Promise`<`void`\>

更新用户自定义音频混流参数

#### Parameters

| Name | Type |
| :------ | :------ |
| `extraTrackTag` | `string` |
| `userId` | `string` |
| `isNeed` | `boolean` |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:337](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L337)

___

### updateUserCustomVideoMergeOptions

▸ **updateUserCustomVideoMergeOptions**(`extraTrackTag`, `userId`, `option`): `void` \| `Promise`<`void`\>

更新用户自定义视频混流参数

#### Parameters

| Name | Type |
| :------ | :------ |
| `extraTrackTag` | `string` |
| `userId` | `string` |
| `option` | [`MergeOption`](../modules.md#mergeoption) |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:315](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L315)

___

### updateUserMergeOptions

▸ `Private` **updateUserMergeOptions**(`config`): `void` \| `Promise`<`void`\>

更新混流参数

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Object` |
| `config.option?` | ``null`` \| [`MergeOption`](../modules.md#mergeoption) |
| `config.tag?` | `string` |
| `config.trackId?` | ``null`` \| `string` |
| `config.userId` | `string` |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:357](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L357)

___

### updateUserMicrophoneMergeOptions

▸ **updateUserMicrophoneMergeOptions**(`userId`, `isNeed?`): `void` \| `Promise`<`void`\>

更新用户麦克风混流参数

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |
| `isNeed?` | `boolean` |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:282](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L282)

___

### updateUserScreenMergeOptions

▸ **updateUserScreenMergeOptions**(`userId`, `option?`): `void` \| `Promise`<`void`\>

更新用户屏幕采集混流参数

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |
| `option?` | [`MergeOption`](../modules.md#mergeoption) |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts:297](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/MixStreamTool.ts#L297)
