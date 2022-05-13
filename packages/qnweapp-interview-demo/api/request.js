import { requestConfig } from '../config/index';

/**
 * 请求promise化
 * @param {*} config 
 */
export default function request(config) {
  const { url, loading = true, ...rest } = config;
  if (loading) {
    wx.showLoading({
      title: '数据加载中...',
    });
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: requestConfig.baseURL + url,
      success(res) {
        const { code, message, data } = res.data;
        if (code === 0) {
          resolve(data);    
        } else if (code === 401001 || code === 401003) {
          (async function isNeedLogin() {
            await wx.showModal({
              title: '提示',
              content: message,
              showCancel: false
            });
            wx.navigateTo({
              url: '/pages/login/login',
            });
          })();
        } else {
          wx.showToast({
            title: message,
            icon: 'none'
          });
          reject(res);
        }
      },
      fail(error) {
        wx.showToast({
          title: error.errMsg,
          icon: 'none'
        })
        reject(error);
      },
      complete() {
        console.log('请求结束😁');
        if (loading) wx.hideLoading();
      },
      ...rest,
    });
  });
}