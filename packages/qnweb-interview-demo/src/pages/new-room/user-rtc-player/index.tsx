import React  from 'react';
import classNames from 'classnames';

import './index.scss';

export interface UserRtcPlayerProps {
  className?: string;
  style?: React.CSSProperties;
  /**
   * 播放器id
   */
  playerId: string;
  /**
   * 用户名
   */
  username?: string;
  /**
   * 底部footer
   */
  footer?: React.ReactNode;
  /**
   * 封面图
   */
  cover?: string;
  /**
   * 是否显示视频
   */
  isVideoOpen?: boolean;
  /**
   * 点击播放器
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const prefixCls = 'user-rtc-player';

export const UserRtcPlayer: React.FC<UserRtcPlayerProps> = (props) => {
  const {
    className, username, footer,
    isVideoOpen, cover, playerId,
    ...restProps
  } = props;

  /**
   * 渲染底部信息
   */
  const renderFooter = () => {
    return footer === null || footer ?
      footer :
      <div className={`${prefixCls}_footer`}>{username}</div>;
  };

  /**
   * 渲染封面
   */
  const renderCover = () => {
    return !isVideoOpen ?
      <div className={`${prefixCls}_cover`}>
        {
          cover ? <img
            src={cover}
            alt={cover}
            className={`${prefixCls}_cover-img`}
          /> : '用户摄像头已关闭'
        }
      </div> : null;
  };

  return <div className={classNames(prefixCls, className)} {...restProps}>
    <div id={playerId} className={`${prefixCls}_video-container`}></div>
    {renderCover()}
    {renderFooter()}
  </div>;
};
