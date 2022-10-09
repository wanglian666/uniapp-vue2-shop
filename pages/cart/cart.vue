<template>
	<view class="cart-contaner" v-if="cart.length != 0">
		<!-- 收货地址 区域 -->
		<my-address></my-address>
		<view class="cart-title">
			<uni-icons type="shop" size="16"></uni-icons>
			<view class="cart-title-text">购物车</view>
		</view>

		<!-- 列表 -->
		<uni-swipe-action>
			<block v-for="(item,index) in cart" :key="index">
				<uni-swipe-action-item :right-options="options" @click="onClick(item)">
					<my-goods :item="item" :showRadio="true" :showNumBox="true" @radioChange="onRadioChange"
						@numberChange="onNumberChange"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		<!-- 自定义结算组件 -->
		<my-settle></my-settle>
	</view>
	
	<!-- 空白购物车区域 -->
	<view class="empty-cart" v-else>
		<image class="empty-img" src="/static/cart_empty@2x.png"></image>
		<text class="tip-text">空空如也~</text>
	</view>
</template>

<script>
	import tabBadge from "@/mixins/tabbar-badge.js.js";
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		mixins: [tabBadge],
		computed: {
			...mapState('m_cart', ['cart'])
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}]
			};
		},

		methods: {
			...mapMutations('m_cart', ['updataGoodsState', 'updataGoodsCount', 'removeGoodsById']),
			// 更改radio勾选状态
			onRadioChange(e) {
				this.updataGoodsState(e);
			},
			// number-box数据改变
			onNumberChange(e) {
				this.updataGoodsCount(e);
			},
			// 滑动删除
			onClick(item) {
				console.log(item.goods_id);
				this.removeGoodsById(item.goods_id);
			}

		},
	}
</script>

<style lang="scss">
	.cart-contaner {
		padding-bottom: 50px;
	}
	.cart-title {
		display: flex;
		padding: 10px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			margin-left: 10px;
		}
	}
	
	.empty-cart {
		display: flex;
		flex-direction: column;
		  justify-content: center;
		  align-items: center;
		  padding-top: 100px;
		.empty-img {
			width: 90px;
			height: 90px;
		}
		.tip-text {
			color: gray;
			margin-top: 10px;
			font-size: 12px;
		}
	}
</style>
