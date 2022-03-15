[qnweb-high-level-rtc](../README.md) / [Exports](../modules.md) / QNRTMAdapter

# Class: QNRTMAdapter

## Implements

- [`RtmAdapter`](../interfaces/RtmAdapter.md)

## Table of contents

### Constructors

- [constructor](QNRTMAdapter.md#constructor)

### Properties

- [appKey](QNRTMAdapter.md#appkey)
- [im](QNRTMAdapter.md#im)
- [initCount](QNRTMAdapter.md#initcount)
- [joinChannelSuccessCallback](QNRTMAdapter.md#joinchannelsuccesscallback)
- [localMessageQueue](QNRTMAdapter.md#localmessagequeue)
- [loginCallback](QNRTMAdapter.md#logincallback)
- [maxInitCount](QNRTMAdapter.md#maxinitcount)
- [sendChannelMsgCallback](QNRTMAdapter.md#sendchannelmsgcallback)
- [tag](QNRTMAdapter.md#tag)

### Methods

- [\_connect](QNRTMAdapter.md#_connect)
- [\_sendChannelMsg](QNRTMAdapter.md#_sendchannelmsg)
- [addIMEventListener](QNRTMAdapter.md#addimeventlistener)
- [connect](QNRTMAdapter.md#connect)
- [getIM](QNRTMAdapter.md#getim)
- [joinChannel](QNRTMAdapter.md#joinchannel)
- [leaveChannel](QNRTMAdapter.md#leavechannel)
- [sendChannelMsg](QNRTMAdapter.md#sendchannelmsg)

## Constructors

### constructor

• **new QNRTMAdapter**(`appKey`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appKey` | `string` |

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts:27](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts#L27)

## Properties

### appKey

• **appKey**: `string`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts:10](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts#L10)

___

### im

• **im**: `any`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts:11](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts#L11)

___

### initCount

• **initCount**: `number`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts:15](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts#L15)

___

### joinChannelSuccessCallback

• `Private` **joinChannelSuccessCallback**: `undefined` \| (`res?`: `unknown`) => `void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts:25](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts#L25)

___

### localMessageQueue

• **localMessageQueue**: { `callback?`: [`RtmCallBack`](../interfaces/RtmCallBack.md) ; `channelId`: `string` ; `clientMId`: `number` ; `isDispatchToLocal`: `boolean` ; `msg`: `string`  }[] = `[]`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts:17](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts#L17)

___

### loginCallback

• `Optional` **loginCallback**: ``null`` \| [`RtmCallBack`](../interfaces/RtmCallBack.md)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts:12](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts#L12)

___

### maxInitCount

• **maxInitCount**: `number`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts:14](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts#L14)

___

### sendChannelMsgCallback

• `Optional` **sendChannelMsgCallback**: ``null`` \| [`RtmCallBack`](../interfaces/RtmCallBack.md)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts:13](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts#L13)

___

### tag

• **tag**: `string` = `'QNRTMAdapter'`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts:24](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts#L24)

## Methods

### \_connect

▸ **_connect**(`config`, `callback?`): `void`

初始化 im 内部实现

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Object` |
| `config.name` | `string` |
| `config.password` | `string` |
| `callback?` | [`RtmCallBack`](../interfaces/RtmCallBack.md) |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts:155](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts#L155)

___

### \_sendChannelMsg

▸ **_sendChannelMsg**(`msg`, `channelId`, `isDispatchToLocal`, `callback?`): `void`

发送频道消息内部消息

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `channelId` | `string` |
| `isDispatchToLocal` | `boolean` |
| `callback?` | [`RtmCallBack`](../interfaces/RtmCallBack.md) |

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts:230](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts#L230)

___

### addIMEventListener

▸ **addIMEventListener**(): `void`

设置监听

#### Returns

`void`

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts:68](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts#L68)

___

### connect

▸ **connect**(`config`, `callback?`): `Promise`<`unknown`\>

初始化 im

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Object` |
| `config.name` | `string` |
| `config.password` | `string` |
| `callback?` | [`RtmCallBack`](../interfaces/RtmCallBack.md) |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts:169](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts#L169)

___

### getIM

▸ **getIM**(): `Promise`<`any`\>

获取IM实例
因为im实例过程中，是个异步任务，所以需要定时实例，直到实例成功

#### Returns

`Promise`<`any`\>

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts:42](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts#L42)

___

### joinChannel

▸ **joinChannel**(`channelId`, `callback?`): `any`

加入聊天室

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelId` | `string` |
| `callback?` | [`RtmCallBack`](../interfaces/RtmCallBack.md) |

#### Returns

`any`

#### Implementation of

[RtmAdapter](../interfaces/RtmAdapter.md).[joinChannel](../interfaces/RtmAdapter.md#joinchannel)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts:189](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts#L189)

___

### leaveChannel

▸ **leaveChannel**(`channelId`, `callback?`): `any`

退出聊天室

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelId` | `string` |
| `callback?` | [`RtmCallBack`](../interfaces/RtmCallBack.md) |

#### Returns

`any`

#### Implementation of

[RtmAdapter](../interfaces/RtmAdapter.md).[leaveChannel](../interfaces/RtmAdapter.md#leavechannel)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts:212](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts#L212)

___

### sendChannelMsg

▸ **sendChannelMsg**(`msg`, `channelId`, `isDispatchToLocal`, `callback?`): `Promise`<`unknown`\>

发送频道消息
发送消息

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `channelId` | `string` |
| `isDispatchToLocal` | `boolean` |
| `callback?` | [`RtmCallBack`](../interfaces/RtmCallBack.md) |

#### Returns

`Promise`<`unknown`\>

#### Implementation of

[RtmAdapter](../interfaces/RtmAdapter.md).[sendChannelMsg](../interfaces/RtmAdapter.md#sendchannelmsg)

#### Defined in

[packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts:253](https://github.com/Spencer17x/solutions/blob/84e2f808/Frontend/front-end-solutions/packages/demo/qnweb-high-level-rtc/src/core/QNRTMAdapter.ts#L253)
