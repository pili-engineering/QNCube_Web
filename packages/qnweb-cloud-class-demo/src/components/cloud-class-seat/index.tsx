import React, { CSSProperties } from 'react';
import classNames from 'classnames';

import { CloudClassIconFont } from '@/components';

import './index.scss';

export interface ICloudClassSeat {
  username?: string;
  isMicOpen: boolean;
  isCameraOpen: boolean;
}

export type CloudClassSeatProps = ICloudClassSeat & {
  className?: string;
  id?: string;
  style?: CSSProperties;
}

export const CloudClassSeat: React.FC<CloudClassSeatProps> = (props) => {
  const {
    className, username,
    isMicOpen, isCameraOpen,
    ...restProps
  } = props;
  return (
    <div
      className={
        classNames('cloud-class-seat', `cloud-class-seat--${isCameraOpen ? 'open' : 'close'}`, className)
      }
      {...restProps}
    >
      {
        isCameraOpen ? null : (
          <CloudClassIconFont
            type="icon-ball-camera-full"
            className="placeholder"
          />
        )
      }
      <div className="bottom-bar">
        <span className="username" title={username}>
          {username}
        </span>
        <span className="camera-mic">
          {
            isCameraOpen ? (
              <CloudClassIconFont
                className="icon"
                type="icon-shexiangtou_shiti"
              />
            ) : (
              <CloudClassIconFont
                className="icon"
                type="icon-shexiangtouguanbi"
              />
            )
          }
          {
            isMicOpen ? (
              <CloudClassIconFont
                className="icon"
                type="icon-maikefeng"
              />
            ) : (
              <CloudClassIconFont
                className="icon"
                type="icon-maikefeng_guanbi"
              />
            )
          }
        </span>
      </div>
    </div>
  );
};
