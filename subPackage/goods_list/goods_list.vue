<template>
	<view class="goods-list-box">
		<block v-for="(item,index) in goodsList" :key="index">
			<view class="goods-item">
				<view class="goods-left-box">
					<image :src="item.goods_small_logo || defaultPic"></image>
				</view>
				<view class="goods-right-box">
					<text class="goods-name">{{item.goods_name}}</text>
					<text class="goods-price">￥{{item.goods_price}}</text>
				</view>
			</view>
		</block>

	</view>
</template>

<script>
	import {
		getGoodsListAPI
	} from "../../api/goodsListAPI.js"
	export default {
		data() {
			return {
				queryObj: {
					query: "",
					cid: "",
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				// 默认的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			}
		},
		onLoad(options) {
			this.queryObj.query = options.query || '';
			this.queryObj.cid = options.cid || '';
			this.getGoodsList();
		},
		methods: {
			async getGoodsList() {
				const res = await getGoodsListAPI(this.queryObj);
				this.goodsList = res.message.goods;
				this.total = res.message.total;
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
