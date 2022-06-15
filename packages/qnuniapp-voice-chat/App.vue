<script>
	import {
		StorageApi
	} from './api';
	import {
		uniNavigateTo
	} from './utils'

	export default {
		onLaunch: function() {
			console.log('App Launch');
			plus.screen.lockOrientation('portrait-primary'); // 强制竖屏
			if (StorageApi.getAuthorization()) {
				uniNavigateTo({
					url: '/pages/room-list/room-list'
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
</style>
