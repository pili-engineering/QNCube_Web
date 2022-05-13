import React from 'react';
import classNames from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';
import { message } from 'antd';

import Icon from '@/components/icon';

import './index.scss';

export interface ChatPanelInfoProps {
  className?: string;
  style?: React.CSSProperties;
  /**
   * 面试者/候选人
   */
  candidate?: string;
  /**
   * 面试岗位
   */
  job?: string;
  /**
   * 复制的内容
   */
  copyText?: string;
}

const prefixCls = 'chat-panel-info';

/**
 * 聊天室信息
 * 包含面试者、面试岗位的信息
 * @param props
 * @constructor
 */
export const ChatPanelInfo: React.FC<ChatPanelInfoProps> = (props) => {
  const { className, candidate, job, copyText, ...restProps } = props;

  const renderInfo = () => {
    return <div className="info">
      <div className="ctx">
        <span className="ctx-label">面试者</span>
        <span className="ctx-content overflow-dot" title={candidate}>{candidate}</span>
      </div>
      <div className="ctx">
        <span className="ctx-label">面试岗位</span>
        <span className="ctx-content overflow-dot" title={job}>{job}</span>
      </div>
    </div>;
  };

  const onCopy = (text: string, result: boolean) => {
    if (result) {
      message.success('复制成功');
    } else {
      message.error('复制失败');
    }
  };

  return <div className={classNames(prefixCls, className)} {...restProps}>
    {renderInfo()}
    <div className="button">
      <CopyToClipboard
        text={copyText || ''}
        onCopy={onCopy}
      >
        <span className="copy-button">
          <Icon type="iconLink"/>
          <span className="text">复制本次面试地址</span>
        </span>
      </CopyToClipboard>
    </div>
  </div>;
};
