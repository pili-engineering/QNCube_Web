<template>
	<view class="container">
		<view class="list">
			<view 
				class="card" 
				:style="{backgroundImage: `url(${item.image})`}" 
				v-for="(item,index) in list" :key="item.id"
				@click="onJoinRoom(item)"
			>
				<view class="card-bottom">
					<view class="card-bottom-left">
						{{item.title}}
					</view>
					<view class="card-bottom-right">
						{{item.totalUsers}}人
					</view>
				</view>
			</view>
		</view>
		<button class="button" @click="onCreateRoomModal">创建房间</button>
		<!-- <button class="button" @click="onJoinRoomModal">加入房间</button> -->
	</view>
</template>

<script>
	import { BaseRoomApi } from '@/api';
	import { uniShowModal, uniShowToast, uniNavigateTo } from '@/utils';
	
	export default {
		data() {
			return {
				list: [],
				pageSize: 10,
				pageNum: 1,
				total: 0,
				endPage: false
			}
		},
		methods: {
			/**
			 * 点击加入房间
			 * @param {Object} room
			 */
			onJoinRoom(room) {
				uniNavigateTo({
					url: `/pages/room/room?roomId=${room.roomId}`
				})
			},
			/**
			 * 加载房间列表数据
			 */
			loadRoomList(pageNum, loading = true) {
				console.log('loadRoomList')
				uni.showLoading({
					title: '列表数据加载中...',
				});
				this.pageNum = pageNum;
				return BaseRoomApi.listRoom({
					pageSize: this.pageSize,
					pageNum: this.pageNum
				}).then(result => {
					console.log('BaseRoomApi.listRoom', result);
					this.total = result.data.total;
					this.list = this.list.concat(result.data.list);
					this.endPage = result.data.endPage;
					if (loading) {
						uni.hideLoading()
					}
				}).catch(() => {
					if (loading) {
						uni.hideLoading()
					}
				});
			},
			/**
			 * 创建房间弹窗
			 */
			onCreateRoomModal() {
				uniShowModal({
					title: '创建房间',
					editable: true,
					placeholderText: '请输入房间名'
				}).then(result => {
					console.log('onCreateRoomModal', result)
					if (result.confirm) {
						return BaseRoomApi.createRoom({
							title: result.content
						}).then(result => {
							console.log('onCreateRoomModal uniNavigateTo', result);
							uniNavigateTo({
								url: `/pages/room/room?roomId=${result.data.roomInfo.roomId}`
							});
						})
					}
				})
			},
			/**
			 * 加入房间弹窗
			 */
			onJoinRoomModal() {
				uniShowModal({
					title: '加入房间',
					editable: true,
					placeholderText: '请输入roomToken',
					success(res) {
						if (res.confirm) {
							uniNavigateTo({
								url: `/pages/room/room?roomToken=${res.content}`
							})	
						}
					}
				})
			}
		},
		onLoad() {
			this.list = [];
			this.loadRoomList(1);
		},
		onPullDownRefresh() {
			this.list = [];
			this.loadRoomList(1).then(() => {
				uni.stopPullDownRefresh()
			});
		},
		onReachBottom() {
			if (this.endPage) {
				return;
			}
			this.loadRoomList(this.pageNum + 1);
		}
	}
</script>

<style>
	.list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	.card {
		width: 48%;
		padding-bottom: 48%;
		background-size: 100% 100%;
		position: relative;
		box-sizing: border-box;
	}
	
	.card-bottom {
		position: absolute;
		width: 100%;
		bottom: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		color: #fff;
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #00000080;
	}
	
	.button {
		background-color: #1890ff;
		color: #fff;
		border-radius: 50rpx;
		width: 364rpx;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 112rpx;
	}
</style>
