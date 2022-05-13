/**
 * 检查摄像头和麦克风的权限
 */
export const checkPermission = () => {
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.record']) {
        wx.authorize({
          scope: 'scope.record',
          success() {
            // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
          },
          fail: () => {
            wx.showModal({
              title: '缺少录音权限',
              content: '请前往设置打开小程序设置',
              confirmText: '前往设置',
              showCancel: false,
              success: (res) => {
                if (res.confirm) {
                  wx.openSetting({
                    success(res) {
                      console.log(res.authSetting)
                      checkPermission()
                    }
                  })
                }
              },
            })
          }
        })
      }

      if (!res.authSetting['scope.camera']) {
        wx.authorize({
          scope: 'scope.camera',
          success() {
            // 用户已经同意小程序使用摄像头功能，后续调用 wx.startRecord 接口不会弹窗询问
          },
          fail: () => {
            wx.showModal({
              title: '缺少摄像头权限',
              content: '请前往设置打开小程序设置',
              confirmText: '前往设置',
              showCancel: false,
              success: (res) => {
                if (res.confirm) {
                  wx.openSetting({
                    success(res) {
                      console.log(res.authSetting)
                      checkPermission()
                    }
                  })
                }
              },
            })
          }
        })
      }
      wx.getSystemInfo({
        success(res) {
          const cameraAuthorized = res.cameraAuthorized;
          const microphoneAuthorized = res.microphoneAuthorized;
      
          console.log('摄像头权限:' + cameraAuthorized);
          console.log('麦克风权限:' + microphoneAuthorized);
          // cameraAuthorized & microphoneAuthorized 在 小程序 lib 2.6.0 开始支持
          if (cameraAuthorized === false || microphoneAuthorized === false) {
            wx.showModal({
              title: '缺少权限',
              content: '请前往系统设置打开微信的摄像头和麦克风权限',
              confirmText: '知道了',
              showCancel: false,
              success: (res) => {
                if (res.confirm) {
                  checkPermission()
                }
              },
            })
          }
        }
      })
    }
  })
}

// 摄像头
export const isCameraTrack = track => {
  // 兼容小程序没有t自定义tag的问题
  return track.kind === 'video' && track.tag !== 'screen';
}

// 音频
export const isAudioTrack = track => track.kind === 'audio';

// 屏幕共享
export const isScreenTrack = track => track.kind === 'video' && track.tag === 'screen';