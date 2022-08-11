import React, { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CloudClassIconFont } from '@/components';

import './index.scss';

export enum NetworkGrade {
  /**
   * 网络质量未知
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * 质量极好
   */
  EXCELLENT = 'EXCELLENT',
  /**
   * 用户主观感觉和极好差不多，但码率可能略低于极好
   */
  GOOD = 'GOOD',
  /**
   * 网络一般
   */
  FAIR = 'FAIR',
  /**
   * 网络质量差，影响正常通信
   */
  POOR = 'POOR'
}

export interface NetworkStat {
  rtt?: number;
  packetLossRate?: number;
  networkGrade?: NetworkGrade;
}

export interface RoomHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  networkStat?: NetworkStat;
  onClose?: () => void;
  roomId: string;
}

export const RoomHeader: FC<RoomHeaderProps> = (props) => {
  const {
    className, title, networkStat, onClose, roomId, ...restProps
  } = props;
  const map = new Map([
    ['UNKNOWN', '网络等级获取中...'],
    ['EXCELLENT', '优'],
    ['GOOD', '良'],
    ['FAIR', '一般'],
    ['POOR', '较差'],
  ]);
  const networkGradeText = map.get(networkStat?.networkGrade || 'UNKNOWN');
  return (
    <div className={classNames('room-header', className)} {...restProps}>
      {
        networkStat ? (
          <span className="network">
            {
              networkStat.rtt !== undefined ? (
                <span className="network-item">
                  延时：
                  {networkStat.rtt}
                </span>
              ) : null
            }
            {
              networkStat.packetLossRate !== undefined ? (
                <span className="network-item">
                  丢包率：
                  {Math.floor(networkStat.packetLossRate * 100)}
                  %
                </span>
              ) : null
            }
            {
              networkStat.networkGrade !== undefined ? (
                <span className="network-item">
                  网络状态：
                  {networkGradeText}
                </span>
              ) : null
            }
          </span>
        ) : null
      }
      <span className="main">
        <span className="title">{title || '暂无标题'}</span>
        <span className="room-id">
          课堂密钥为：
          {roomId}
        </span>
      </span>
      <span className="buttons">
        <CloudClassIconFont
          type="icon-jieshu"
          className="close-button"
          onClick={onClose}
        />
      </span>
    </div>
  );
};
