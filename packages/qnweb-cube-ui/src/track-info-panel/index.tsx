import React from 'react';
import classNames from 'classnames';
import { QNLocalAudioTrackStats, QNLocalVideoTrackStats } from 'qnweb-rtc';

import { prefixCls } from '../_utils';

import './index.scss';

export interface TrackInfoPanelProps {
  className?: string;
  style?: React.CSSProperties;
  audioStatus?: QNLocalAudioTrackStats;
  videoStatus?: QNLocalVideoTrackStats;
  screenStatus?: QNLocalVideoTrackStats;
  isMobile?: boolean;
}

const rootCls = prefixCls('track-info-panel');

export const TrackInfoPanel: React.FC<TrackInfoPanelProps> = (props) => {
  const { videoStatus, screenStatus, audioStatus, isMobile = false, className, style } = props;
  return <div className={classNames(rootCls, { [`${rootCls}-mobile`]: isMobile }, className)} style={style}>
    <div className="content">
      <div className="ctx">
        <div className="label">视频丢包率</div>
        <span className="value">
          {
            videoStatus ?
              Number(videoStatus.uplinkLostRate * 100).toFixed(2) :
              '0.00'
          } %
        </span>
      </div>
      <div className="ctx">
        <div className="label">音频丢包率</div>
        <span
          className="value"
        >
          {
            audioStatus ?
              Number(audioStatus.uplinkLostRate * 100).toFixed(2) :
              '0.00'
          } %
        </span>
      </div>
      <div className="ctx">
        <div className="label">屏幕分享丢包率</div>
        <span
          className="value"
        >
          {
            screenStatus ?
              Number(screenStatus.uplinkLostRate * 100).toFixed(2) :
              '0.00'
          } %
        </span>
      </div>
      <div className="ctx">
        <div className="label">视频实时码率</div>
        <span
          className="value"
        >
          {
            videoStatus ?
              Number(videoStatus.uplinkBitrate / 1000).toFixed(2) :
              '0.00'
          } kbps
        </span>
      </div>
      <div className="ctx">
        <div className="label">音频实时码率</div>
        <span
          className="value"
        >
          {
            audioStatus ?
              Number(audioStatus.uplinkBitrate / 1000).toFixed(2) :
              '0.00'
          } kbps
        </span>
      </div>
      <div className="ctx">
        <div className="label">屏幕分享实时码率</div>
        <span
          className="value"
        >
          {
            screenStatus ?
              Number(screenStatus.uplinkBitrate / 1000).toFixed(2) :
              '0.00'
          } kbps
        </span>
      </div>
    </div>
  </div>;
};
