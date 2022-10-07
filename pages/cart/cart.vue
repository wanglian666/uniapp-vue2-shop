<template>
	<view>
		<!-- 收货地址 -->
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
	.cart-title {
		display: flex;
		padding: 10px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			margin-left: 10px;
		}
	}
</style>
