/**
 * 发送文本消息
 * interface SendMessageConfig { 
 *  im: any; 
 *  imGroupId?: number;
 *  content: MessageBody;
 * }
 * interface MessageBody {
 *  action: MessageBodyAction;
 *  // senderId、senderName、msgContent
 *  msgStr: MessageBodyMsgStr;
 * }
 * enum MessageBodyAction {
 *  QuitRoom = 'quit_room',
 *  Welcome = 'welcome',
 *  PubChatText = 'pub_chat_text'
 * }
 * interface MessageBodyMsgStr {
 *  senderId?: string;
 *  senderName?: string;
 *  msgContent?: string;
 * }
 * @param {SendMessageConfig} sendMessageConfig 
 */
export function sendTextMessage(sendMessageConfig){
  const im = sendMessageConfig.im;
  const cuid = im.userManage.getUid() + '';
  const message = {
    content: JSON.stringify({
      action: sendMessageConfig.content.action,
      msgStr: {
        ...sendMessageConfig.content.msgStr,
        senderId: cuid,
      }
    }),
    gid: sendMessageConfig.imGroupId
  };
  im.sysManage.sendGroupMessage(message);
}