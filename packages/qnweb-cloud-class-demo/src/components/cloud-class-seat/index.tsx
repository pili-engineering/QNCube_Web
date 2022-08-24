import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { Popover } from 'antd';

import { IconFont } from '@/components';

import './index.scss';

/**
 * 拼接带有disabled字段的icon字符串
 * @param base
 * @param disabled
 */
export const iconWithDisabled = (base: string, disabled?: boolean) => {
  return disabled ? `${base}-disabled` : base;
};

export interface ICloudClassSeat {
  /**
   * 用户名
   */
  username?: string;
  /**
   * 麦克风开启
   */
  isMicOpen: boolean;
  /**
   * 摄像头开启
   */
  isCameraOpen: boolean;
  /**
   * 麦克风被禁用
   */
  isMicDisabled?: boolean;
  /**
   * 摄像头被禁用
   */
  isCameraDisabled?: boolean;
  /**
   * 悬浮窗是否可见
   */
  popoverVisible?: boolean;
  /**
   * 麦克风被禁用切换
   * @param muted
   */
  onMicDisabledChanged?: (muted: boolean) => void;
  /**
   * 摄像头被禁用切换
   * @param muted
   */
  onCameraDisabledChanged?: (muted: boolean) => void;
  /**
   * 点击踢人按钮
   */
  onKickClick?: () => void;
}

export type CloudClassSeatProps = ICloudClassSeat & {
  className?: string;
  id?: string;
  style?: CSSProperties;
}

const biggerStyle: CSSProperties = {
  fontSize: '24px',
  margin: '0 5px'
};

export const CloudClassSeat: React.FC<CloudClassSeatProps> = (props) => {
  const {
    className, username,
    isMicOpen, isCameraOpen,
    isMicDisabled, isCameraDisabled,
    onMicDisabledChanged, onCameraDisabledChanged,
    popoverVisible,
    onKickClick,
    ...restProps
  } = props;

  const renderSeat = () => {
    return <div
      className={
        classNames(
          'cloud-class-seat',
          `cloud-class-seat--camera-${isCameraOpen && !isCameraDisabled ? 'open' : 'close'}`,
          className
        )
      }
      {...restProps}
    >
      {
        isCameraOpen && !isCameraDisabled ? null : (
          <IconFont
            type="icon-ball-camera-full"
            className="placeholder"
            style={{ color: isCameraDisabled ? '#ff0000' : '#a6a6a6' }}
          />
        )
      }
      <div className="footer">
        <span className="username" title={username}>
          {username}
        </span>
        <span className="camera-mic">
          <IconFont
            className="icon"
            type={
              isCameraOpen && !isCameraDisabled ?
                iconWithDisabled('icon-shexiangtou', isCameraDisabled) :
                iconWithDisabled('icon-shexiangtou_guanbi', isCameraDisabled)
            }
          />
          <IconFont
            className="icon"
            type={
              isMicOpen && !isMicDisabled ?
                iconWithDisabled('icon-line-122', isMicDisabled) :
                iconWithDisabled('icon-line-121', isMicDisabled)
            }
          />
        </span>
      </div>
    </div>;
  };

  return popoverVisible ? <Popover
    placement="bottomLeft"
    content={
      <div className="cloud-class-seat-box">
        {
          onCameraDisabledChanged && <IconFont
            style={biggerStyle}
            type={isCameraDisabled ? 'icon-shexiangtou_guanbi' : 'icon-shexiangtou'}
            onClick={() => onCameraDisabledChanged(!isCameraDisabled)}
          />
        }
        {
          onMicDisabledChanged && <IconFont
            style={biggerStyle}
            type={isMicDisabled ? 'icon-line-121' : 'icon-line-122'}
            onClick={() => onMicDisabledChanged(!isMicDisabled)}
          />
        }
        {
          onKickClick && <IconFont
            style={biggerStyle}
            type="icon-tiren"
            onClick={onKickClick}
          />
        }
      </div>
    }
  >
    {renderSeat()}
  </Popover> : renderSeat();
};
