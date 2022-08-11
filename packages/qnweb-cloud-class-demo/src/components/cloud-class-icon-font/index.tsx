import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { IconFontProps } from '@ant-design/icons/es/components/IconFont';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2899535_5d47tf12ck4.js',
});

export const CloudClassIconFont: React.FC<IconFontProps> = (props) => {
  return <IconFont {...props} />;
};
