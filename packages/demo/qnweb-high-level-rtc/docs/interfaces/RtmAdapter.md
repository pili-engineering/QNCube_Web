[qnweb-high-level-rtc](../README.md) / [Exports](../modules.md) / RtmAdapter

# Interface: RtmAdapter

适配器

## Implemented by

- [`QNRTMAdapter`](../classes/QNRTMAdapter.md)
- [`RongCloudRTMAdapter`](../classes/RongCloudRTMAdapter.md)

## Table of contents

### Methods

- [createChannel](RtmAdapter.md#createchannel)
- [joinChannel](RtmAdapter.md#joinchannel)
- [leaveChannel](RtmAdapter.md#leavechannel)
- [releaseChannel](RtmAdapter.md#releasechannel)
- [sendC2cMsg](RtmAdapter.md#sendc2cmsg)
- [sendChannelMsg](RtmAdapter.md#sendchannelmsg)

## Methods

### createChannel

▸ `Optional` **createChannel**(`channelId`, `callback?`): `Promise`<`unknown`\>

TODO
创建频道

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelId` | `string` |
| `callback?` | [`RtmCallBack`](RtmCallBack.md) |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/types/rtm.ts:33](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/types/rtm.ts#L33)

___

### joinChannel

▸ **joinChannel**(`channelId`, `callback?`): `Promise`<`unknown`\>

加入频道

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelId` | `string` |
| `callback?` | [`RtmCallBack`](RtmCallBack.md) |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/types/rtm.ts:39](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/types/rtm.ts#L39)

___

### leaveChannel

▸ **leaveChannel**(`channelId`, `callback?`): `Promise`<`unknown`\>

离开频道

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelId` | `string` |
| `callback?` | [`RtmCallBack`](RtmCallBack.md) |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/types/rtm.ts:45](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/types/rtm.ts#L45)

___

### releaseChannel

▸ `Optional` **releaseChannel**(`channelId`, `callback?`): `Promise`<`unknown`\>

TODO
销毁频道

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelId` | `string` |
| `callback?` | [`RtmCallBack`](RtmCallBack.md) |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/types/rtm.ts:52](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/types/rtm.ts#L52)

___

### sendC2cMsg

▸ `Optional` **sendC2cMsg**(`msg`, `peerId`, `isDispatchToLocal`, `callback?`): `Promise`<`unknown`\>

TODO
发送 c2c 消息

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `peerId` | `string` |
| `isDispatchToLocal` | `boolean` |
| `callback?` | [`RtmCallBack`](RtmCallBack.md) |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/types/rtm.ts:18](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/types/rtm.ts#L18)

___

### sendChannelMsg

▸ **sendChannelMsg**(`msg`, `channelId`, `isDispatchToLocal`, `callback?`): `Promise`<`unknown`\>

发送频道消息

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `channelId` | `string` |
| `isDispatchToLocal` | `boolean` |
| `callback?` | [`RtmCallBack`](RtmCallBack.md) |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/types/rtm.ts:26](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/types/rtm.ts#L26)
