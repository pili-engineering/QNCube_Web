import React, { useMemo } from 'react';
import classNames from 'classnames';

import { ICloudClassSeat, CloudClassSeat, IconFont, iconWithDisabled } from '@/components';
import { useUserStore } from '@/store';

import './index.scss';


export interface RTCPanelProps {
  /**
   * class名
   */
  className?: string;
  /**
   * 麦位列表
   */
  seats: (ICloudClassSeat & { userId: string })[];
  /**
   * 主麦位数量
   */
  mainSeatCount?: number;
  /**
   * 摄像头是否开启
   */
  isCameraOpen?: boolean;
  /**
   * 麦克风是否开启
   */
  isMicOpen?: boolean;
  /**
   * 摄像头切换
   * @param open
   */
  onCameraChanged?: (open: boolean) => void;
  /**
   * 麦克风切换
   * @param open
   */
  onMicChanged?: (open: boolean) => void;
  /**
   * 聊天框切换
   */
  onChatVisibleChanged?: () => void;
  /**
   * 工具栏
   */
  toolVisible?: boolean;
  /**
   * 聊天icon
   */
  chatIconVisible?: boolean;
}

export const RTCPanel: React.FC<RTCPanelProps> = (props) => {
  const {
    className, seats, mainSeatCount = 1,
    isCameraOpen, isMicOpen, onCameraChanged, onMicChanged,
    chatIconVisible = true, onChatVisibleChanged, toolVisible, ...restProps
  } = props;
  const { state } = useUserStore();

  /**
   * 我的座位
   */
  const mySeat = useMemo(() => {
    return seats.find(
      item => item.userId === state.userInfo?.accountId
    );
  }, [seats, state.userInfo?.accountId]);

  /**
   * 工具栏
   */
  const renderTool = () => {
    return <div className="panel-bar">
      <div className="panel-bar-left">
        {
          chatIconVisible ? (
            <IconFont
              type="icon-IMliaotian"
              className="icon"
              onClick={onChatVisibleChanged}
            />
          ) : null
        }
      </div>
      <div className="panel-bar-right">
        <IconFont
          className="icon"
          type={
            isCameraOpen && !mySeat?.isCameraDisabled ?
              iconWithDisabled('icon-shexiangtou', mySeat?.isCameraDisabled) :
              iconWithDisabled('icon-shexiangtou_guanbi', mySeat?.isCameraDisabled)
          }
          onClick={() => onCameraChanged?.(!isCameraOpen)}
        />
        <IconFont
          className="icon"
          type={
            isMicOpen && !mySeat?.isMicDisabled ?
              iconWithDisabled('icon-line-122', mySeat?.isMicDisabled) :
              iconWithDisabled('icon-line-121', mySeat?.isMicDisabled)
          }
          onClick={() => onMicChanged?.(!isMicOpen)}
        />
      </div>
    </div>;
  };

  /**
   * 座位渲染
   * @param seats
   */
  const renderClassSeats = (seats: RTCPanelProps['seats']) => {
    return seats.map((seat) => {
      const { userId, ...seatProps } = seat;
      return <CloudClassSeat
        className="seat"
        id={userId}
        key={userId}
        {...seatProps}
      />;
    });
  };

  return (
    <div className={classNames('rtc-panel', className)} {...restProps}>
      <div className="main-seats">
        {renderClassSeats(seats.slice(0, mainSeatCount))}
      </div>
      {toolVisible ? renderTool() : null}
      <div className="minor-seats">
        {renderClassSeats(seats.slice(mainSeatCount))}
      </div>
    </div>
  );
};
