import { createFromIconfontCN } from '@ant-design/icons';
import { IconFontProps } from '@ant-design/icons/es/components/IconFont';
import React from 'react';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2899535_5d47tf12ck4.js',
});

const CloudClassIconFont: React.FC<IconFontProps> = (props) => <IconFont {...props} />;

export default CloudClassIconFont;
