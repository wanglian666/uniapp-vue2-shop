<template>
	<view class="address">
		<!-- 顶部按钮 -->
		<view class="choose-address-box" v-if="JSON.stringify(address) == '{}'">
			<button type="primary" size="mini">请选择收货地址+</button>
		</view>
		<!-- 收货人信息 -->
		<view class="address-info" v-else>
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人：<text>大漂亮</text></view>
				</view>
				<view class="row1-right">
					<view class="phone">电话：<text>138XXXX5555</text></view>
					<uni-icons type="right" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">河北省邯郸市肥乡区xxx 河北省邯郸市肥乡区xxx 河北省邯郸市肥乡区xxx 河北省邯郸市肥乡区xxx</view>
			</view>
		</view>
		<!-- 底部分割线 -->
		<image src="/static/cart_border@2x.png"></image>
	</view>
</template>

<script>
	export default {
		name: "my-address",
		data() {
			return {
				address: {
					name:'zs'
				}

			};
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
				justify-content: space-between;
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
