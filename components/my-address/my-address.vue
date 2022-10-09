<template>
	<view class="address">
		<!-- 顶部按钮 -->
		<view class="choose-address-box" v-if="JSON.stringify(address) == '{}'">
			<button type="primary" size="mini" @click="onChooseAddress">请选择收货地址+</button>
		</view>
		<!-- 收货人信息 -->
		<view class="address-info" v-else @click="onChooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人：<text>{{address.userName}}</text></view>
				</view>
				<view class="row1-right">
					<view class="phone">电话：<text>{{address.telNumber}}</text></view>
					<uni-icons type="right" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">{{detailaAddress}}</view>
			</view>
		</view>
		<!-- 底部分割线 -->
		<image src="/static/cart_border@2x.png"></image>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex";
	import {
		showMsg
	} from "@/utils/tools.js"
	export default {
		name: "my-address",
		data() {
			return {
				// address:{}
			};
		},
		computed: {
			...mapState('m_user', ['address']),
			// 详细地址
			detailaAddress() {
				if (Object.keys(this.address).length != 0) {
					return this.address.provinceName + this.address.cityName + this.address.countyName + this.address
						.detailInfo
				} else {
					return ''
				}
			}
		},
		methods: {
			...mapMutations('m_user', ['updateAddress']),
			onChooseAddress() {
				uni.chooseAddress({
					success: (res) => {
						// this.address = res;
						// 存储到store中
						this.updateAddress(res)

					},
					fail: (error) => {
						console.log('error', error)
						if (error && (error.errMsg === 'chooseAddress:fail auth deny' || error.errMsg ===
								'chooseAddress:fail authorize no response')) {
								// 通过调用这个函数，让用户重新授权
							this.reAuth()
						}
					}
				})
			},
			// 让用户重新授权
			reAuth() {
				uni.showModal({
					content: "检测到您没打开地址权限，是否去设置打开？",
					confirmText: "确认",
					cancelText: "取消",
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							return uni.openSetting({
								success: (settingResult) => {
									console.log('settingResult',settingResult);
									if (settingResult.authSetting['scope.address']) {
										return showMsg('授权成功！请选择地址')
									} else {
										return showMsg('您取消了地址授权！')
									}
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
							return showMsg("您取消了地址授权！")
						}
					},
					fail: (error) => {
						return error
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.address {
		padding: 10px;
		position: relative;
		height: 90px;

		.choose-address-box {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
		}

		.address-info {
			display: flex;
			flex-direction: column;
			height: 100%;
			font-size: 12px;

			.row1 {
				display: flex;
				justify-content: space-between;
			}

			.row1-right {
				display: flex;
				justify-content: space-between;
			}

			.row2 {
				display: flex;
				align-items: center;
				margin-top: 10px;
			}

			.row2-left {
				white-space: nowrap;
			}
		}

		image {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 5px;
			display: block;
		}
	}
</style>
