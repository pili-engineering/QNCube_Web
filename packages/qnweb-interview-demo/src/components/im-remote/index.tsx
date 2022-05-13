import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Button, Input } from 'antd';
import dayjs from 'dayjs';

import { BaseUserInfo, IMConfig } from '@/api';
import { MessageBodyAction, sendTextMessage, useGroupByMessages, useQNIM } from '@/hooks';
import iconLink from './icon-link.svg';
import ClipboardButton, { ClipboardButtonProps } from '../clipboard-button';
import { LeaveUser } from '../video-remote';

import './index.scss';

export interface IMRemoteProps extends React.HTMLAttributes<HTMLDivElement> {
  candidateName?: string;
  career?: string;
  interviewId?: string;
  copyConfig: ClipboardButtonProps;
  onlineUserList?: BaseUserInfo[];
  allUserList?: BaseUserInfo[];
  userInfo?: BaseUserInfo;
  leaveUser?: LeaveUser;
  imConfig?: IMConfig;
  interviewRoomJoined: boolean;
}

const IMRemote: React.FC<IMRemoteProps> = props => {

  const {
    userInfo, leaveUser,
    candidateName, career, className,
    copyConfig, imConfig, allUserList
  } = props;
  const [inputVal, setInputVal] = useState('');
  const chatContentRef = useRef<HTMLDivElement>(null);

  const { messages, im } = useQNIM(imConfig);
  const [groupByDateMessages] = useGroupByMessages(messages)

  useEffect(() => {
    /**
     * 通过rtc来监听离开
     * IM监听的话用户直接杀进程IM是监听不到的
     */
    console.log('userInfo', userInfo);
    if (leaveUser) {
      const senderName = allUserList?.find(u => leaveUser.userId === u.accountId)?.nickname;
      sendTextMessage({
        im,
        imGroupId: imConfig?.imGroupId,
        content: {
          action: MessageBodyAction.QuitRoom,
          msgStr: {
            senderId: leaveUser.userId,
            senderName,
            msgContent: '离开了房间'
          }
        }
      });
    }
  }, [allUserList, im, imConfig?.imGroupId, leaveUser, userInfo])

  useEffect(() => {
    const scrollEle = chatContentRef.current;
    if (scrollEle) {
      scrollEle.scrollTop = scrollEle.scrollHeight;
    }
  }, [groupByDateMessages]);

  /**
   * 点击发送消息
   */
  const onSendButtonClick:  React.MouseEventHandler<HTMLElement> = () => {
    sendTextMessage({
      im,
      imGroupId: imConfig?.imGroupId,
      content: {
        action: MessageBodyAction.PubChatText,
        msgStr: {
          senderId: userInfo?.accountId,
          senderName: userInfo?.nickname,
          msgContent: inputVal
        }
      }
    });
    setInputVal('')
  }

  return <div className={classNames('im-remote', className)}>
    <div className="header">
      <div className="title">
        <div className="label">面试者</div>
        <div className="hint">{candidateName}</div>
      </div>
      <div className="title">
        <div className="label">面试岗位</div>
        <div className="hint">{career}</div>
      </div>
      <div className="row-flex-end">
        <ClipboardButton {...copyConfig}>
          <div className="copy-btn">
            <img className="copy-btn-icon" src={iconLink} alt=""/>
            <span className="copy-btn-text">复制本次面试地址</span>
          </div>
        </ClipboardButton>
      </div>
    </div>
    <div className="content" ref={chatContentRef}>
      {
        groupByDateMessages.map(groupMessageItem => {
          return <div className="message-group" key={groupMessageItem.dateTitle}>
            <div className="message-date">{groupMessageItem.dateTitle}</div>
            <div className="message-ctx">
              {
                groupMessageItem.list?.map((listMessage, index) => {
                  const isWelcome = listMessage.content.action === MessageBodyAction.Welcome;
                  const isPubChatText = listMessage.content.action === MessageBodyAction.PubChatText;
                  const senderName = listMessage.content.msgStr.senderName;
                  const msgContent = listMessage.content.msgStr.msgContent;
                  const isMe = listMessage.content.msgStr.senderId === userInfo?.accountId;
                  return <div
                    className={classNames('message-ctx-item', { welcome: isWelcome })}
                    key={index}
                  >
                    <div className="time">{dayjs(+listMessage.timestamp).format('HH:mm:ss')}</div>
                    {
                      isPubChatText &&
											<div className="username">{senderName}：</div>
                    }
                    {
                      isPubChatText ?
                        <div className="text">{msgContent}</div> :
                        <div className="text">{isMe ? '您' : `${senderName}`}{msgContent}</div>
                    }
                  </div>;
                })
              }
            </div>
          </div>;
        })
      }
    </div>
    <div className="input-wrap">
      <Input.TextArea
        className="chat-box"
        value={inputVal}
        onChange={event => setInputVal(event.target.value)}
        placeholder="请输入文字..."
      />
      <div className="btn-wrap">
        <Button
          className="send-btn"
          type="primary"
          onClick={onSendButtonClick}
        >发送</Button>
      </div>
    </div>
  </div>;
};

export default IMRemote;
