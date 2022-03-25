import React, { HTMLAttributes, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Popover } from 'antd';
import { BaseIcon } from '../../../../components';
import IconPenPencil from '../../../../static/images/icon-pen-pencil.svg';
import IconPenMark from '../../../../static/images/icon-pen-mark.svg';
import IconRubberColorful from '../../../../static/images/icon-rubber-colorful.svg';
import IconRubber from '../../../../static/images/icon-rubber.svg';
import './index.scss';

interface WhiteBoardToolBarProps extends HTMLAttributes<HTMLDivElement>{
  whiteBoard: any;
  documentChanged?: boolean;
}

interface DotSizeSelectorProps {
  sizes: string[];
  value: string;
  onChange: (value: string) => void;
}

interface DotColorSelectorProps {
  colors: string[];
  value: string;
  onChange: (value: string) => void;
}

interface RubberSizeSelectorProps {
  sizes: string[];
  value: string;
  onChange: (value: string) => void;
}

const DotSizeSelector: React.FC<DotSizeSelectorProps> = (props) => {
  const { sizes, value, onChange } = props;
  return (
    <div
      className="dot-size-selector"
    >
      {
        sizes.map((size) => {
          const activated = value === size;
          return (
            <div
              key={size}
              className={
                classNames('dot', {
                  activated,
                })
              }
              style={{
                width: `${size}px`,
                height: `${size}px`,
              }}
              onClick={() => onChange(size)}
            />
          );
        })
      }
    </div>
  );
};

const DotColorSelector: React.FC<DotColorSelectorProps> = (props) => {
  const { colors, value, onChange } = props;
  return (
    <div
      className="dot-color-selector"
    >
      {
        colors.map((color) => {
          const activated = value === color;
          return (
            <div
              key={color}
              className={
                classNames('dot', {
                  activated,
                })
              }
              style={{
                backgroundColor: color,
              }}
              onClick={() => onChange(color)}
            />
          );
        })
      }
    </div>
  );
};

const RubberSizeSelector:React.FC<RubberSizeSelectorProps> = (props) => {
  const { sizes, value, onChange } = props;
  return (
    <div className="rubber-size-selector">
      {
        sizes.map((size) => {
          const activated = value === size;
          return (
            <BaseIcon
              key={size}
              src={IconRubberColorful}
              className={
                classNames('icon', {
                  activated,
                })
              }
              style={{
                width: `${size}px`,
                height: `${size}px`,
              }}
              onClick={() => onChange(size)}
            />
          );
        })
      }
    </div>
  );
};

const WhiteBoardToolBar: React.FC<WhiteBoardToolBarProps> = (props) => {
  const {
    className, whiteBoard, documentChanged, ...restProps
  } = props;
  const colors = ['#1f9f8c', '#000000', '#f44336', '#ffffff', '#ffc000', '#0086d0'];
  const sizes = ['10', '15', '20', '25', '30'];
  const [size, setSize] = useState('10');
  const [color, setColor] = useState('#1f9f8c');
  const [mode, setMode] = useState<'pencil' | 'rubber' | 'mark'>('pencil');
  useEffect(() => {
    if (whiteBoard && documentChanged) {
      console.log('whiteBoard log setInputMode mode', mode);
      whiteBoard.setInputMode(mode);
    }
  }, [mode, whiteBoard, documentChanged]);
  useEffect(() => {
    if (whiteBoard && documentChanged) {
      if (mode === 'pencil' || mode === 'mark') {
        const typeMap = { pencil: 0, mark: 1 };
        const penStyle = {
          type: typeMap[mode],
          color: mode === 'pencil'
            ? `#ff${color.replace('#', '')}`
            : `#7f${color.replace('#', '')}`,
          size: +size,
        };
        console.log('whiteBoard log setPenStyle penStyle', penStyle);
        whiteBoard.setPenStyle(penStyle);
      } else {
        console.log('whiteBoard log setEraseSize size', size);
        whiteBoard.setEraseSize(+size);
      }
    }
  }, [color, whiteBoard, documentChanged, size, mode]);
  return (
    <div
      className={classNames('whiteboard-tool-bar', className)}
      {...restProps}
    >
      <Popover
        content={(
          <div style={{ display: 'flex' }}>
            <DotColorSelector
              value={color}
              colors={colors}
              onChange={(value) => setColor(value)}
            />
            <DotSizeSelector
              value={size}
              sizes={sizes}
              onChange={(value) => setSize(value)}
            />
          </div>
        )}
        trigger="click"
        placement="right"
      >
        <BaseIcon
          className="icon"
          src={IconPenPencil}
          onClick={() => setMode('pencil')}
        />
      </Popover>
      <Popover
        content={(
          <div style={{ display: 'flex' }}>
            <DotColorSelector
              value={color}
              colors={colors}
              onChange={(value) => setColor(value)}
            />
            <DotSizeSelector
              value={size}
              sizes={sizes}
              onChange={(value) => setSize(value)}
            />
          </div>
        )}
        trigger="click"
        placement="right"
      >
        <BaseIcon
          className="icon"
          src={IconPenMark}
          onClick={() => setMode('mark')}
        />
      </Popover>
      <Popover
        content={(
          <RubberSizeSelector
            value={size}
            sizes={sizes}
            onChange={(value) => setSize(value)}
          />
        )}
        trigger="click"
        placement="right"
      >
        <BaseIcon
          className="icon"
          src={IconRubber}
          onClick={() => setMode('rubber')}
        />
      </Popover>
    </div>
  );
};

export default WhiteBoardToolBar;
