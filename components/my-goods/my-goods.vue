<template>
	<view class="goods-item">
		<view class="goods-left-box">
			<radio v-if="showRadio" :checked="item.goods_state" color="#C00000" @click="radioClickHandler"></radio>
			<image :src="item.goods_small_logo || defaultPic"></image>
		</view>
		<view class="goods-right-box">
			<text class="goods-name">{{item.goods_name}}</text>
			<view class="right-box-bottom">
				<text class="goods-price">￥{{item.goods_price | toFixed}}</text>
				<uni-number-box v-if="showNumBox" v-model="item.goods_count" :min="1" @change="onHandlerChange"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		props: {
			item: {
				type: Object,
				default: {}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNumBox :{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// 默认的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'

			};
		},
		// 过滤器，价格取两位小数
		filters: {
			toFixed: function(num) {
				return Number(num).toFixed(2)
			}
		},
		methods: {
			// 子组件向父组件传递  更改radio勾选状态
			radioClickHandler() {
				this.$emit('radioChange', {
					goods_id: this.item.goods_id,
					goods_state: this.item.goods_state
				})
			},
			// 监听number-box数值改变
			onHandlerChange(value) {
				this.$emit('numberChange',{
					goods_id: this.item.goods_id,
					goods_count: Number(value)
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #efefef;
		padding: 15px 10px;

		.goods-left-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-right: 20px;

			image {
				width: 100px;
				height: 100px;
			}
		}

		.goods-right-box {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;

			.goods-name {
				font-size: 12px;
			}

			.right-box-bottom {
				display: flex;
				justify-content: space-between;
				.goods-price {
					color: red;
					font-size: 18px;
				}
			}

		}
	}
</style>
