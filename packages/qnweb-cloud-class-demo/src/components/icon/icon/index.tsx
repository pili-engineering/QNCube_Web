import React from 'react';
import classNames from 'classnames';
import { camelCase } from 'lodash';

import * as images from '@/components/_images';

import './index.scss';

export type IconType =
  'bg-icon-btn'
  | 'icon-abnormality'
  | 'icon-arrow-line'
  | 'icon-chat'
  | 'icon-circle-line'
  | 'icon-confirm'
  | 'icon-drawer'
  | 'icon-geometry'
  | 'icon-gesture'
  | 'icon-hangup'
  | 'icon-laser-2'
  | 'icon-laser-3'
  | 'icon-laser-4'
  | 'icon-link'
  | 'icon-microphone-off'
  | 'icon-microphone-on'
  | 'icon-mouse'
  | 'icon-normal'
  | 'icon-pen'
  | 'icon-pen-mark'
  | 'icon-pen-pencil'
  | 'icon-pitch-on'
  | 'icon-pitch-on-off'
  | 'icon-quit'
  | 'icon-rectangle-line'
  | 'icon-room-loading'
  | 'icon-rubber'
  | 'icon-rubber-30'
  | 'icon-rubber-35'
  | 'icon-rubber-40'
  | 'icon-rubber-45'
  | 'icon-rubber-50'
  | 'icon-rubber-colorful'
  | 'icon-screen'
  | 'icon-screen-2'
  | 'icon-share'
  | 'icon-share-mobile'
  | 'icon-share-screen-on'
  | 'icon-solid-line'
  | 'icon-speaker-test'
  | 'icon-upload'
  | 'icon-video-off'
  | 'icon-video-on'
  | 'icon-whiteboard'
  | 'laser-2'
  | 'laser-2-selected'
  | 'nav-settle'
  | 'nav-to-chat'
  | 'tab-icon'
  | 'icon-tool-box'
  | 'icon-screen-share'

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  type: IconType;
  text?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = (props) => {
  const {
    className, text, type, size, ...restProps
  } = props;
  const src = images[camelCase(type) as keyof typeof images];
  const renderSizeValue = size ? `${size}px` : '';
  return (
    <span
      className={classNames('icon', className)}
      {...restProps}
    >
      <img
        className="icon-img"
        style={{ width: renderSizeValue, height: renderSizeValue }}
        src={src}
        alt="icon-img"
      />
      {text && <div className="icon-text">{text}</div>}
    </span>
  );
};
