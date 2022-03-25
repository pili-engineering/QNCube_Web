import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import styles from './index.module.scss';
import { getRecentImageApi } from '@/api/messyApi';
import { useInterval } from 'ahooks';

const RecentQrCode = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    getRecentImageApi().then((response) => {
      setFileUrl(response.fileUrl);
      setFileName(response.fileName);
    });
  }, []);

  useInterval(() => {
    getRecentImageApi().then((response) => {
      setFileUrl(response.fileUrl);
      setFileName(response.fileName);
    });
  }, 1000);
  return (
    <div className={styles.container}>
      <QRCode
        value={`${window.location.origin}/recent/image?fileUrl=${fileUrl}&fileName=${fileName}`}
        size={300}
        className={styles.qrCode}
      />
    </div>
  );
};

export default RecentQrCode;
