import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { IconFontProps } from '@ant-design/icons/es/components/IconFont';

const AliIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3592190_xlr7co3hn2.js',
});


export const IconFont: React.FC<IconFontProps> = (props) => {
  return <AliIcon {...props} />;
};
