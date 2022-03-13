import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { QNRTPlayer } from 'qn-rtplayer-web';
import { Button } from 'antd';
import './index.scss';

export enum ExamStatus {
  NotIn = 1,
  In,
  Finished
}

export interface ExamStudentSeatProps extends React.HTMLAttributes<HTMLDivElement>{
  username: string;
  playUrl: string;
  seatId: string;
  examStatus: ExamStatus;
  cheatingText?: string;
}

QNRTPlayer.setLogLevel('disable');

export const mapExamStatusToText = new Map([
  [ExamStatus.NotIn, '未开始'],
  [ExamStatus.In, '考试中'],
  [ExamStatus.Finished, '已交卷'],
]);

const ExamStudentSeat: React.FC<ExamStudentSeatProps> = (props) => {
  const {
    className, username, playUrl, seatId, examStatus, cheatingText, ...restProps
  } = props;
  const [player, setPlayer] = useState<QNRTPlayer>();
  const [isNeedReplay, setIsNeedReplay] = useState(false);

  /**
   * 初始化播放器
   */
  useEffect(() => {
    const qnPlayer = new QNRTPlayer();
    const handlePlayerStateChanged = (state: number) => {
      if (state === 3) {
        setIsNeedReplay(false);
      }
    };
    qnPlayer.init({
      controls: false,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    });
    qnPlayer.on('playerStateChanged', handlePlayerStateChanged);
    setPlayer(qnPlayer);
    return () => {
      qnPlayer.off('playerStateChanged', handlePlayerStateChanged);
    };
  }, []);

  /**
   * 播放rtmp流
   */
  useEffect(() => {
    if (player && playUrl) {
      const container = document.getElementById(`video-${seatId}`);
      if (container) {
        player.play(playUrl, container).catch(() => {
          setIsNeedReplay(true);
        });
      }
    }
  }, [player, playUrl, seatId]);

  /**
   * 播放失败重新播放
   */
  const onReplay: React.MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
    player?.resume();
  };

  const renderPlaceholderText = () => (playUrl ? null : '暂无视频');

  return (
    <div className={classNames('exam-student-seat', className)} {...restProps}>
      <span className="tag-status">{mapExamStatusToText.get(examStatus)}</span>
      <div className="video" id={`video-${seatId}`}>
        <span className="placeholder">
          {
            isNeedReplay
              ? <Button type="primary" onClick={onReplay}>点击重新播放</Button>
              : renderPlaceholderText()
          }
        </span>
      </div>
      <div className="info">
        <div className="info-ctx" title={username}>{username}</div>
        <div className="info-ctx" title={cheatingText}>
          {cheatingText}
        </div>
      </div>
    </div>
  );
};

export default ExamStudentSeat;
