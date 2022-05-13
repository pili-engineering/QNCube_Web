import React, { CSSProperties, useEffect, useRef } from 'react';
import BulletScreen from 'rc-bullets';
import { IChatMessage } from '@/components/chat-message';

/**
 * 弹幕通用样式
 */
const bulletStyle: CSSProperties = {
  fontSize: '32px',
  color: '#fff',
  // backgroundColor: '#435860',
  padding: '5px 10px',
  borderRadius: '150px',
};

/**
 * 调色盘
 */
const paletteColors = [
  '#FE0302', '#FF7204', '#FFAA02',
  '#FFD302', '#FFFF00', '#A0EE00',
  '#00CD00', '#CC0273', '#FFFFFF',
];

const useRenderBullet = (currentBulletMessage?: IChatMessage) => {
  const bulletContainer = useRef<any>(null);

  /**
   * 渲染弹幕效果
   * @param message
   */
  const renderBullet = (message: IChatMessage) => {
    const container = bulletContainer.current;
    const randomIndex = Math.floor(Math.random() * paletteColors.length) || 0;
    const color = paletteColors[randomIndex];
    container.push(
      <div style={{ ...bulletStyle, color }}>{message.content}</div>,
    );
  };

  useEffect(() => {
    /**
     * 绑定弹幕实例
     */
    bulletContainer.current = new BulletScreen('#bulletScreen');
  }, []);
  /**
   * 接收弹幕并展示
   */
  useEffect(() => {
    if (currentBulletMessage) {
      renderBullet(currentBulletMessage);
    }
  }, [currentBulletMessage]);
};

export default useRenderBullet;
