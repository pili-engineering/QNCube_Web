import React from 'react';
import classNames from 'classnames';
import { Spin } from 'antd';
import SeatBg1 from './seat-bg-1.png';
import SeatBg2 from './seat-bg-2.png';
import './index.scss';

export interface AvatarMicSeatProps extends React.HTMLAttributes<HTMLDivElement> {
  isCameraOpen?: boolean; // 是否开启摄像头
  avatar?: string; // 头像
  avatarId?: string;
  type: 1 | 2; // 1: 比耶 2: 叉腰
  avatarIdPrefix?: string;
  spin?: boolean;
}

/**
 * 渲染spin
 * @param spin
 */
const renderSpin = (spin: boolean) => (spin ? (
  <div className="avatar-seat__avatar">
    <Spin className="avatar-seat__avatar-spin" tip="等待用户加入..." />
  </div>
) : null);

/**
 * 渲染摄像头
 * @param avatarIdPrefix
 * @param avatarId
 * @param isCameraOpen
 * @param avatar
 */
const renderCamera = (
  avatarIdPrefix: string | null | undefined,
  avatarId: string,
  isCameraOpen: boolean,
  avatar: string | null | undefined,
) => {
  const joinAvatarId = avatarIdPrefix ? `${avatarIdPrefix}-${avatarId}` : avatarId;
  return (
    <div className="avatar-seat__avatar" id={joinAvatarId}>
      {!isCameraOpen && avatar ? <img className="avatar-img" src={avatar} alt="avatar" /> : null}
    </div>
  );
};

const AvatarSeat: React.FC<AvatarMicSeatProps> = (props) => {
  const {
    className, type, avatarId = '',
    isCameraOpen = false, avatar, avatarIdPrefix,
    style, spin = false,
    ...restProps
  } = props;
  const mapSeatBg = {
    1: SeatBg1,
    2: SeatBg2,
  };
  const seatBg = mapSeatBg[type];
  return (
    <div
      className={classNames('avatar-seat', className)}
      style={{ backgroundImage: `url(${seatBg})`, ...style }}
      {...restProps}
    >
      {
        avatarId ? renderCamera(avatarIdPrefix, avatarId, isCameraOpen, avatar) : renderSpin(spin)
      }
    </div>
  );
};

export default AvatarSeat;
