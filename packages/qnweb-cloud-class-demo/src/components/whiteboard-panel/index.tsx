import React, {
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { TabsProps } from 'antd/lib/tabs';

import {
  Toolbar,
  ToolbarProps,
  WhiteBoardTabs,
} from '@/components';

import './index.scss';

export interface WhiteBoardPanelProps extends HTMLAttributes<HTMLDivElement> {
  toolbarProps?: ToolbarProps;
  tabsProps?: TabsProps;
  toolbarVisible: boolean;
  tabsVisible: boolean;
  locked?: boolean;
}

export const WhiteBoardPanel: React.FC<WhiteBoardPanelProps> = (props) => {
  const {
    className, tabsProps, toolbarProps, toolbarVisible, tabsVisible, locked, ...restProps
  } = props;

  return (
    <div
      className={classNames('wb-panel', className)}
      {...restProps}
    >
      {tabsVisible ? <WhiteBoardTabs {...tabsProps} /> : null}
      <div
        id="canvasBox"
        className={classNames('whiteboard-canvas', {
          'whiteboard-canvas-locked': locked,
        })}
      />
      {toolbarVisible ? <Toolbar {...toolbarProps} /> : null}
    </div>
  );
};
