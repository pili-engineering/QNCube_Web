import React, { CSSProperties } from 'react';
import QRCode from 'qrcode.react';
import classNames from 'classnames';

import './index.scss';

export interface MobileMediaDetectorPros {
  qrCodeUrl: string;
  className?: string;
  style?: CSSProperties;
}

const MobileMediaDetector: React.FC<MobileMediaDetectorPros> = (props) => {
  const { qrCodeUrl, className, ...restProps } = props;
  return (
    <div className={classNames('mobile-media-detector', className)} {...restProps}>
      <div className="main">
        <div id="mobile-camera" className="mobile-camera" />
      </div>
      <div className="guide">
        <div className="guide-text" data-url={qrCodeUrl}>请使用副设备扫描下方二维码:</div>
        <QRCode value={qrCodeUrl} />
      </div>
    </div>
  );
};
export default MobileMediaDetector;
