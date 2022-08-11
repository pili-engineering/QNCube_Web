import React  from 'react';
import classNames from 'classnames';
import { Button } from 'antd';

import Icon from '@/components/icon';

import './index.scss';

export interface VideoPanelProps {
  className?: string;
  style?: React.CSSProperties;
  /**
   * 房间标题
   */
  title?: string;
  /**
   * 前/后屏
   */
  isSwitched?: boolean;
  onSwitchedChange?: (value: boolean) => void;
  /**
   * 本地摄像头
   */
  isLocalCameraOn?: boolean;
  onLocalCameraChange?: (value: boolean) => void;
  /**
   * 本地麦克风
   */
  isLocalMicrophoneOn?: boolean;
  onLocalMicrophoneChange?: (value: boolean) => void;
  /**
   * 本地屏幕共享
   */
  isLocalScreenOn?: boolean;
  onLocalScreenChange?: (value: boolean) => void;
  /**
   * 离开按钮点击事件
   */
  onLeaveClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * 结束按钮点击事件
   */
  onEndClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * 挂断
   */
  onHangupClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * 结束按钮显隐
   */
  showEndButton?: boolean;
  /**
   * 离开按钮显隐
   */
  showLeaveButton?: boolean;
}

const prefixCls = 'video-panel';

export const VideoPanel: React.FC<VideoPanelProps> = (props) => {
  const {
    className, title,
    isSwitched, onSwitchedChange,
    isLocalCameraOn, onLocalCameraChange,
    isLocalMicrophoneOn, onLocalMicrophoneChange,
    isLocalScreenOn, onLocalScreenChange,
    onLeaveClick, onHangupClick, onEndClick,
    showEndButton, showLeaveButton,
    children,
    ...restProps
  } = props;
  return <div className={classNames(prefixCls, className)} {...restProps}>
    <div className="header" title={title}>{title}</div>
    <div className="body">
      {children}
      <Icon
        type={isSwitched ? 'iconScreen' : 'iconScreen2'}
        className="icon-remote-screen"
        onClick={() => onSwitchedChange?.(!isSwitched)}
      />
      <div className="body-bar">
        <Icon
          type={isLocalMicrophoneOn ? 'iconMicrophoneOn' : 'iconMicrophoneOff'}
          className="icon-gap"
          onClick={() => onLocalMicrophoneChange?.(!isLocalMicrophoneOn)}
        />
        <Icon
          type="iconHangup"
          className="icon-gap"
          onClick={onHangupClick}
        />
        <Icon
          type={isLocalCameraOn ? 'iconVideoOn' : 'iconVideoOff'}
          className="icon-gap"
          onClick={() => onLocalCameraChange?.(!isLocalCameraOn)}
        />
      </div>
    </div>
    <div className="footer">
      <Icon
        type={isLocalScreenOn ? 'iconShareScreenOn' : 'iconShare'}
        className="icon-local-screen"
        onClick={() => onLocalScreenChange?.(!isLocalScreenOn)}
      />
      <div className="buttons">
        {showEndButton && <Button className="button" type="primary" danger onClick={onEndClick}>结束本轮面试</Button>}
        {showLeaveButton && <Button className="button" type="primary" onClick={onLeaveClick}>离开面试房间</Button>}
      </div>
    </div>
  </div>;
};

