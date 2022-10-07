<template>
	<view class="goods-item">
		<view class="goods-left-box">
			<image :src="item.goods_small_logo || defaultPic"></image>
		</view>
		<view class="goods-right-box">
			<text class="goods-name">{{item.goods_name}}</text>
			<text class="goods-price">￥{{item.goods_price | toFixed}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			item:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				// 默认的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
				
			};
		},
		// 过滤器，价格取两位小数
		filters:{
			toFixed:function(num) {
				return Number(num).toFixed(2)
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
			margin-right: 10px;
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
	
			.goods-price {
				color: red;
				font-size: 18px;
			}
		}
	}

</style>