<template>
	<view class="container">
		<video v-if="rtcInfo" @error="onVideoErrorCallback" :controls="false" :autoplay="true" :style="fullScreenStyle"
			:src="rtcInfo.flvPlayUrl"></video>
	</view>
</template>

<script>
	import {
		BaseRoomApi
	} from '@/api';
	import {
		uniShowModal
	} from '@/utils';

	export default {
		data() {
			return {
				roomId: null,
				rtcInfo: null,
				roomInfo: null,
				userInfo: null,
				screenWidth: 0,
				screenHeight: 0
			}
		},
		computed: {
			/**
			 * 全屏
			 */
			fullScreenStyle() {
				return {
					width: `${this.screenWidth}px`,
					height: `${this.screenHeight}px`,
					position: 'fixed',
					top: 0,
					right: 0,
					left: 0,
					bottom: 0,
				}
			}
		},
		methods: {
			/**
			 * 错误监听
			 * @param {Object} e
			 */
			onVideoErrorCallback(e) {
				console.log('onVideoErrorCallback', error)
				uniShowModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			/**
			 * 开启心跳
			 */
			enableHeartBeat() {
				const startHeartBeat = (ms = 0) => {
					this.heartBeatTimer = setTimeout(() => {
						BaseRoomApi.heartBeat({
							roomId: this.roomId
						}).then(result => {
							console.log('BaseRoomApi.heartBeat result', result);
							clearTimeout(this.heartBeatTimer);
							startHeartBeat(result.data.interval);
						});
					}, ms)
				}
				startHeartBeat();
			},
			/**
			 * 加入通用房间
			 */
			joinRoom() {
				uni.showLoading({
					title: '加入房间中...'
				})
				BaseRoomApi.joinRoom({
					roomId: this.roomId
				}).then(result => {
					const {
						rtcInfo = {}, roomInfo = {}, userInfo = {}
					} = result.data;
					this.rtcInfo = rtcInfo;
					this.roomInfo = roomInfo;
					this.userInfo = userInfo;
					console.log('rtcInfo', this.rtcInfo)
					uni.hideLoading();
					this.enableHeartBeat();
					uniShowModal({
						content: '成功加入房间',
						showCancel: false
					})
				})
			}
		},
		onLoad(options) {
			this.roomId = options.roomId;
			const {
				screenWidth,
				screenHeight
			} = uni.getSystemInfoSync();
			this.screenWidth = screenWidth;
			this.screenHeight = screenHeight;
			this.joinRoom();
		}
	}
</script>

<style>
</style>
