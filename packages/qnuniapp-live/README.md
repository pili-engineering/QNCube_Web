# qnuniapp-live

直播场景

## 概述

**qnuniapp-live** 基于 [QNRTC-Uniapp](https://developer.qiniu.com/rtc/11847/an-overview-of-the-uniapp-sdk) 进行直播场景的开发。

## 如何运行

* 需要在插件市场载入 [JS 插件](https://ext.dcloud.net.cn/plugin?id=6859) 以及 [Native 插件](https://ext.dcloud.net.cn/plugin?id=6857)。JS 插件主要负责处理加工原生返回的数据，便于使用者调用，Native 插件负责直接调用原生接口返回 JS 插件。
* 需要在插件市场载入 [uni-icons图标](https://ext.dcloud.net.cn/plugin?name=uni-icons)，主要用于该 demo 的 icon ui 展示。
* 通过 HBuilderX 导入该项目，通过【运行->运行到手机或模拟器】选择基座进行运行。

## 项目结构

```
.
├── App.vue // 根文件
├── api // 业务api接口
├── pages
│   ├── audience-room // 观众观看页
│   ├── broadcaster-room // 主播开播页
│   ├── login // 登录页
│   ├── room-list // 房间列表页
│   └── webview // webview页面
└── utils // 工具函数
```

## FAQ(常见问题)

### 支持打包到哪些端？

仅支持 安卓 和 iOS 端

### 如何体验 Demo？

* **安卓端**：http://fir.qnsdk.com/mpve

* **iOS**：http://fir.qnsdk.com/ulx8

### 无法正常使用rtc通话？

检查一下是否开启相关权限，首先在 **manifest.json** 的 **App权限配置** 添加摄像头和麦克风的权限，其次安卓端需要添加相关允许授权代码来提示用户允许授权，代码部分参考App.vue中的requestPermissions方法，如下所示：

```ts
export default {
  methods: {
    requestPermissions() {
				this.platform = uni.getSystemInfoSync().platform;
				if (this.isAndroid) {
					const permission = [
						"android.permission.RECORD_AUDIO",
						"android.permission.CAMERA",
						"android.permission.WRITE_EXTERNAL_STORAGE"
					]
					if (plus.android) {
						for (const i of permission) {
							plus.android.requestPermissions(
								[i],
								function(resultObj) {
									for (var i = 0; i < resultObj.granted.length; i++) {
										var grantedPermission = resultObj.granted[i];
										console.log('已获取的权限：' + grantedPermission);
									}
									for (var i = 0; i < resultObj.deniedPresent.length; i++) {
										var deniedPresentPermission = resultObj.deniedPresent[i];
										console.log('拒绝本次申请的权限：' + deniedPresentPermission);
									}
									for (var i = 0; i < resultObj.deniedAlways.length; i++) {
										var deniedAlwaysPermission = resultObj.deniedAlways[i];
										console.log('永久拒绝申请的权限：' + deniedAlwaysPermission);
									}
								},
								function(error) {
									console.log('申请权限错误：' + error.code + " = " + error.message);
								}
							);
						}
					}
				}
			},
  }
}
```

### 视频无法正常播放，提示添加 videoplayer模块？

参考 https://ask.dcloud.net.cn/article/283 和 https://ask.dcloud.net.cn/question/113030

需要在 **manifest.json** 的 **App模块配置=>VideoPlayer(视频播放)** 勾选上
