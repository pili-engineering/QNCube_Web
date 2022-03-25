import React from 'react';
import classNames from 'classnames';
import { ICloudClassSeat, CloudClassSeat, CloudClassIconFont } from '..';
import './index.scss';

export interface RTCPanelProps {
  className?: string;
  seats: (ICloudClassSeat & {userId: string})[];
  mainSeatCount?: number; // 主麦位数量
  isCameraOpen?: boolean;
  isMicOpen?: boolean;
  onToggleCamera?: (open: boolean) => void;
  onToggleMic?: (open: boolean) => void;
  onToggleChatPanel?: () => void;
  barVisible?: boolean;
  chatIconVisible?: boolean;
}

const RTCPanel: React.FC<RTCPanelProps> = (props) => {
  const {
    className, seats, mainSeatCount = 1,
    isCameraOpen = true, isMicOpen = true, onToggleCamera, onToggleMic,
    chatIconVisible = true, onToggleChatPanel, barVisible, ...restProps
  } = props;
  return (
    <div className={classNames('rtc-panel', className)} {...restProps}>
      <div className="main-seats">
        {
          seats.slice(0, mainSeatCount).map((seat) => (
            <CloudClassSeat
              id={seat.userId}
              className="seat"
              username={seat.username}
              isMicOpen={seat.isMicOpen}
              isCameraOpen={seat.isCameraOpen}
              key={seat.userId}
            />
          ))
        }
      </div>
      {
        barVisible ? (
          <div className="panel-bar">
            <div className="panel-bar-left">
              {
                chatIconVisible ? (
                  <CloudClassIconFont
                    type="icon-IMliaotian"
                    className="icon"
                    onClick={() => onToggleChatPanel && onToggleChatPanel()}
                  />
                ) : null
              }
            </div>
            <div className="panel-bar-right">
              <CloudClassIconFont
                className="icon"
                type={isCameraOpen ? 'icon-shexiangtou_shiti' : 'icon-shexiangtouguanbi'}
                onClick={() => onToggleCamera && onToggleCamera(!isCameraOpen)}
              />
              <CloudClassIconFont
                className="icon"
                type={isMicOpen ? 'icon-maikefeng' : 'icon-maikefeng_guanbi'}
                onClick={() => onToggleMic && onToggleMic(!isMicOpen)}
              />
            </div>
          </div>
        ) : null
      }
      <div className="minor-seats">
        {
          seats.slice(mainSeatCount).map((seat) => (
            <CloudClassSeat
              id={seat.userId}
              className="seat"
              username={seat.username}
              isMicOpen={seat.isMicOpen}
              isCameraOpen={seat.isCameraOpen}
              key={seat.userId}
            />
          ))
        }
      </div>
    </div>
  );
};

export default RTCPanel;
