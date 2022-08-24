import React from 'react';
import styles from './index.module.scss';
import { getUrlQueryParams } from '@/util/url';

const RecentQrCode = () => {
  const fileUrl = getUrlQueryParams('fileUrl');
  const fileName = getUrlQueryParams('fileName');
  const download = (url: string) => {
    const ua = navigator.userAgent.toLowerCase();
    const isWeiXin = ua.indexOf('micromessenger') !== -1;
    if (isWeiXin) {
      window.location.href = url;
    } else {
      convertImgToBase64(url);
    }
  };
  const convertImgToBase64 = (url: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // 图片跨域
    img.onload = () => {
      if (ctx) {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/base64');
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = fileName || 'picture';
        a.click();
        a.remove();
        canvas.remove();
      }
    };
    img.src = url;
  };
  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <div className={styles.title}>欢迎体验Avatar虚拟形象自动生成</div>
        <div className={styles.card}>
          {
            fileUrl ? <img src={fileUrl} alt="fileUrl" /> : <span>未获取到图片</span>
          }
        </div>
        <div className={styles.buttonContainer}>
          {
            fileUrl && (
              <div
                onClick={() => download(fileUrl)}
                className={styles.button}
              >
                立即下载
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default RecentQrCode;
