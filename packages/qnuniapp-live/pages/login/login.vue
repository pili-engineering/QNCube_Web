<template>
	<view class="container">
		<view class="title" @click="showModal = true">
			欢迎登录
		</view>
		<view class="card">
			<view class="label label-phone">
				<view class="label-title">手机号</view>
				<view class="label-input">
					<input placeholder="请输入手机号" v-model="phone"/>
				</view>
			</view>
			<view class="tip">Tips: 新用户可直接通过验证码注册登录</view>
			<view class="label">
				<view class="label-title">验证码</view>
				<view class="label-input sms-input">
					<input placeholder="请输入验证码" v-model="smsCode"/>
					<view class="sms-button" @click="onGetSmmCode">
						{{count || "获取验证码"}}
					</view>
				</view>
			</view>
			<button :loading="loading" class="button" @click="onLogin">登录</button>
			<view class="radio">
				<label @click="checked = !checked">
					<radio class="radio-component" :checked="checked" />
					我已阅读并同意
					<text class="link" @click.stop="gotoUrl(`https://www.qiniu.com/user-agreement`)">《七牛云服务用户协议》</text>
					和
					<text class="link" @click.stop="gotoUrl(`https://www.qiniu.com/privacy-right`)">《隐私权政策》</text>
				</label>
			</view>
		</view>
		
		<view class="version">
			当前版本: {{version}}
		</view>
		
		<view class="modal" v-if="showModal">
			<view class="modal-mask"></view>
			<view class="modal-card">
				<view 
					:class="['modal-card-context', { 'modal-card-context--active': curEnv === item[0] }]" 
					v-for="item in list"
					@click="onChangeEnv(item[0])"
				>
					{{item[1].title}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { uniNavigateTo, uniShowModal, uniShowToast } from "@/utils";
	import { BaseApi, StorageApi, config } from '@/api';
	
	export default {
		data() {
			return {
				checked: false,
				count: null,
				phone: "",
				smsCode: "",
				loading: false,
				list: Object.entries(config),
				curEnv: StorageApi.getEnv(),
				showModal: false,
				version: plus.runtime.version
			}
		},
		methods: {
			onChangeEnv(env) {
				this.curEnv = env;
				StorageApi.setEnv(this.curEnv);
				this.showModal = false;
			},
			/**
			 * 点击登录按钮
			 */
			onLogin() {
				if (!this.checked) {
					uniShowModal({
						content: '请阅读并同意七牛云服务用户协议和隐私权政策',
						showCancel: false
					})
					return;
				}
				this.loading = true
				BaseApi.signUpOrIn({
					phone: this.phone,
					smsCode: this.smsCode,
				}).then((result) => {
					this.loading = false;
					const imConfig = result.data.imConfig;
					StorageApi.setIMConfig(imConfig);
					StorageApi.setAuthorization(result.data.loginToken);
					uniNavigateTo({
						url: '/pages/room-list/room-list'
					})
				}).catch(error => {
					this.loading = false;
				})
			},
			/**
			 * 打开外链
			 * @param {Object} url
			 */
			gotoUrl(url) {
				uniNavigateTo({
					url: `/pages/webview/webview?url=${url}`
				})
			},
			/**
			 * 点击获取验证码
			 */
			onGetSmmCode() {
				if (this.count === null) {
					BaseApi.getSmsCode({
						phone: this.phone,
					}).then(result => {
						uniShowToast({
							title: '验证码发送成功'
						});
						this.enableTimer(60);
					});
				}
			},
			/**
			 * 开始倒计时
			 * @param {Object} count
			 */
			enableTimer(count) {
				this.count = count;
				this.timer = setInterval(() => {
					this.count--;
					if (this.count <= 0) {
						clearInterval(this.timer);
						this.timer = null;
						this.count = null;
					}
				}, 1000)
			}
		},
		onUnload() {
			clearInterval(this.timer);
			this.timer = null;
		}
	}
</script>

<style>
	.title {
		padding: 100rpx 0;
		color: #1890FF;
		font-weight: bold;
		font-size: 40rpx;
		text-align: center;
	}

	.card {
		padding: 20rpx 40rpx;
	}

	.tip {
		color: #999999;
		font-size: 24rpx;
		padding-bottom: 40rpx;
	}

	.label {
		padding-bottom: 40rpx;
	}
	
	.label-phone {
		padding-bottom: 10rpx;
	}

	.label-title {
		color: #000;
		font-weight: bold;
		padding-bottom: 20rpx;
	}
	
	.label-input>input {
		border-bottom: 1px solid #E8E8E8;
	}

	.sms-input {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.sms-input>input {
		flex: 1;
	}

	.sms-button {
		color: #40a9ff;
		font-weight: bold;
		width: 180rpx;
		text-align: center;
	}

	.button {
		width: 100%;
		border-radius: 52rpx;
		background-color: #1890ff;
		border-color: #1890ff;
		color: #fff;
		font-weight: bold;
	}

	.radio {
		font-size: 24rpx;
		color: #007AFF;
		padding: 20rpx 0;
		text-align: center;
	}

	.radio-component {
		transform: scale(0.7);
	}

	.link {
		font-weight: bold;
	}
	
	.modal-mask {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}
	.modal-card {
		width: 80%;
		background-color: #fff;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);	
		padding: 20rpx;
	}
	.modal-card-context {
		color: #000;
		background-color: #007AFF;
		color: #fff;
		margin: 20rpx 0;
		padding: 20rpx;
		text-align: center;
		border: 4rpx solid #007AFF;
	}
	.modal-card-context--active {
		border: 4rpx solid red;
	}
	.version {
		text-align: center;
		font-size: 12px;
	}
</style>
