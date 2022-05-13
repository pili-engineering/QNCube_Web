import React, { FC, HTMLAttributes, MouseEventHandler } from 'react';
import QRCode from 'qrcode.react';
import classNames from 'classnames';
import './index.scss';

export interface QrCodePopupProps extends HTMLAttributes<HTMLDivElement>{
  qrCodeUrl: string;
  visible?: boolean;
  onZoomIn?: MouseEventHandler<HTMLSpanElement>; // 缩小
  onZoomOut?: MouseEventHandler<HTMLSpanElement>; // 放大
}

const QrCodePopup: FC<QrCodePopupProps> = (props) => {
  const {
    className, qrCodeUrl, visible, onZoomIn, onZoomOut, ...restProps
  } = props;
  return (
    <div className={classNames('qr-code-popup', className)} {...restProps}>
      <div className="header">
        <div className="text">请用手机扫描</div>
        <div className="buttons">
          <span className="button button--zoom-in" onClick={onZoomIn} />
          <span className="button button--zoom-out" onClick={onZoomOut} />
        </div>
      </div>
      {
      visible && (
      <div className="body" data-url={qrCodeUrl}>
        <QRCode value={qrCodeUrl} size={180} />
      </div>
      )
    }
    </div>
  );
};

export default QrCodePopup;
