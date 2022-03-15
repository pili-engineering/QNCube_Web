[qnweb-high-level-rtc](../README.md) / [Exports](../modules.md) / RongCloudRTMAdapter

# Class: RongCloudRTMAdapter

融云 IM 适配器

## Implements

- [`RtmAdapter`](../interfaces/RtmAdapter.md)

## Table of contents

### Constructors

- [constructor](RongCloudRTMAdapter.md#constructor)

### Properties

- [im](RongCloudRTMAdapter.md#im)

### Methods

- [addIMEventListener](RongCloudRTMAdapter.md#addimeventlistener)
- [connect](RongCloudRTMAdapter.md#connect)
- [joinChannel](RongCloudRTMAdapter.md#joinchannel)
- [leaveChannel](RongCloudRTMAdapter.md#leavechannel)
- [sendChannelMsg](RongCloudRTMAdapter.md#sendchannelmsg)

## Constructors

### constructor

• **new RongCloudRTMAdapter**(`appkey`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appkey` | `string` |

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RongCloudRTMAdapter.ts:11](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RongCloudRTMAdapter.ts#L11)

## Properties

### im

• **im**: `IMClient`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RongCloudRTMAdapter.ts:9](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RongCloudRTMAdapter.ts#L9)

## Methods

### addIMEventListener

▸ **addIMEventListener**(): `void`

设置监听

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RongCloudRTMAdapter.ts:21](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RongCloudRTMAdapter.ts#L21)

___

### connect

▸ **connect**(`token`, `callback?`): `Promise`<`void`\>

连接融云服务器

**`link`** https://doc.rongcloud.cn/im/Web/4.X/guide/connection/connect/web

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `callback?` | [`RtmCallBack`](../interfaces/RtmCallBack.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RongCloudRTMAdapter.ts:47](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RongCloudRTMAdapter.ts#L47)

___

### joinChannel

▸ **joinChannel**(`channelId`, `callback?`): `Promise`<`void`\>

加入聊天室

**`link`** https://doc.rongcloud.cn/im/Web/4.X/guide/chatroom/manage/basic/join/web

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelId` | `string` |
| `callback?` | [`RtmCallBack`](../interfaces/RtmCallBack.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[RtmAdapter](../interfaces/RtmAdapter.md).[joinChannel](../interfaces/RtmAdapter.md#joinchannel)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RongCloudRTMAdapter.ts:66](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RongCloudRTMAdapter.ts#L66)

___

### leaveChannel

▸ **leaveChannel**(`channelId`, `callback?`): `Promise`<`void`\>

退出聊天室

**`link`** https://doc.rongcloud.cn/im/Web/4.X/guide/chatroom/manage/basic/quit/web

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelId` | `string` |
| `callback?` | [`RtmCallBack`](../interfaces/RtmCallBack.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[RtmAdapter](../interfaces/RtmAdapter.md).[leaveChannel](../interfaces/RtmAdapter.md#leavechannel)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RongCloudRTMAdapter.ts:87](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RongCloudRTMAdapter.ts#L87)

___

### sendChannelMsg

▸ **sendChannelMsg**(`msg`, `channelId`, `isDispatchToLocal`, `callback?`): `Promise`<`void`\>

发送消息

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `channelId` | `string` |
| `isDispatchToLocal` | `boolean` |
| `callback?` | [`RtmCallBack`](../interfaces/RtmCallBack.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[RtmAdapter](../interfaces/RtmAdapter.md).[sendChannelMsg](../interfaces/RtmAdapter.md#sendchannelmsg)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/RongCloudRTMAdapter.ts:107](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/RongCloudRTMAdapter.ts#L107)
