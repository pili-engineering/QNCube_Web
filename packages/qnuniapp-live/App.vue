<script>
	import {
		StorageApi
	} from './api';
	import {
		uniNavigateTo
	} from './utils'

	export default {
		globalData: {
			platform: null
		},
		computed: {
			/**
			 * 是否是安卓
			 */
			isAndroid() {
				return this.platform === 'android'
			},
		},
		methods: {
			/**
			 * 请求授权
			 */
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
		},
		onLaunch: function() {
			this.requestPermissions();
			console.log('App Launch', this.platform);
			plus.screen.lockOrientation('portrait-primary'); // 强制竖屏
			if (StorageApi.getAuthorization()) {
				uniNavigateTo({
					url: '/pages/room-list/room-list'
				});
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
