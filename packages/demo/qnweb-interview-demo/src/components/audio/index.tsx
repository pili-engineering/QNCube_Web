import React, { Fragment, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { linkConfig } from '../../config';
import './index.scss';

interface AudioProps extends React.AudioHTMLAttributes<HTMLAudioElement> {

}

const Audio: React.FC<AudioProps> = props => {
  const { src = `${linkConfig.cloudStorageUrl}/device-test-audio.mp3`, controls = true } = props;
  const audioBarGroup = 6;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const playAudio = () => {
    const audioEle = audioRef.current;
    if (!audioEle) return;
    audioEle.play();
  };
  useEffect(() => {
    const audioEle = audioRef.current;
    if (!audioEle) return;
    const changeAudioDuration = () => setAudioDuration(Math.floor(audioEle.duration));
    const audioTimeUpdate = () => {
      if (audioEle.currentTime >= audioEle.duration) {
        setAudioCurrentTime(0);
      } else {
        setAudioCurrentTime(Math.floor(audioEle.currentTime));
      }
    };
    audioEle.addEventListener('durationchange', changeAudioDuration);
    audioEle.addEventListener('timeupdate', audioTimeUpdate);
    return () => {
      audioEle.removeEventListener('durationchange', changeAudioDuration);
      audioEle.removeEventListener('timeupdate', audioTimeUpdate);
    };
  }, []);
  return <div className="audio-box">
    <div className="audio-play-btn" onClick={playAudio}></div>
    <div className="audio-graph">
      {
        Array.from(Array(audioBarGroup)).map((bar, index) => {
          return <Fragment key={index}>
            <div className={classNames('audio-bar audio-bar-10', { 'green-bar': index < audioCurrentTime })}></div>
            <div className={classNames('audio-bar audio-bar-14', { 'green-bar': index < audioCurrentTime })}></div>
            <div className={classNames('audio-bar audio-bar-18', { 'green-bar': index < audioCurrentTime })}></div>
            {
              index < audioBarGroup &&
							<div className={classNames('audio-bar audio-bar-14', { 'green-bar': index < audioCurrentTime })}></div>
            }
          </Fragment>;
        })
      }
    </div>
    <div className="time-total">{audioDuration}"</div>
    <audio
      controls={controls}
      src={src}
      className="test-audio-player"
      ref={audioRef}
    ></audio>
  </div>;
};

export default Audio;