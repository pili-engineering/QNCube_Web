import React from 'react';
import classNames from 'classnames';
import { camelCase } from 'lodash';
import * as images from '../_images';
// import { tuple } from '../_utils';
import './index.scss';

// 这种方式 type="icon-xxx" webStorm 中没有提示
// 在 type={"icon-xxx"} 却能提示出来
// const IconTypes = tuple(
//   'icon-arrow-line', 'icon-pen-mark', 'icon-rubber-50',
//   'icon-circle-line', 'icon-pen-pencil', 'icon-rubber',
//   'icon-drawer', 'icon-pen', 'icon-solid-line',
//   'icon-geometry', 'icon-rectangle-line', 'icon-upload',
//   'icon-gesture', 'icon-room-loading', 'index.js',
//   'icon-laser-2', 'icon-rubber-30', 'laser-2-selected',
//   'icon-laser-3', 'icon-rubber-35', 'laser-2',
//   'icon-laser-4', 'icon-rubber-40', 'nav-settle',
//   'icon-mouse', 'icon-rubber-45', 'nav-to-chat',
// );
//
// export type IconType = typeof IconTypes[number];

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
  | 'index.ts'
  | 'laser-2'
  | 'laser-2-selected'
  | 'nav-settle'
  | 'nav-to-chat'
  | 'tab-icon'

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  type: IconType;
  text?: string;
  size?: number;
}

const Icon: React.FC<IconProps> = (props) => {
  const {
    className, text, type, size, ...restProps
  } = props;
  // @ts-ignore
  const src = images[camelCase(type)];
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
      { text && <span className="icon-text">{text}</span>}
    </span>
  );
};

export default Icon;
