<template>
	<view v-if="goodsDetailsObj.goods_name">
		<!-- 轮播图 -->
		<swiper indicator-dots autoplay circular interval="3000">
			<swiper-item v-for="(item,index) in goodsDetailsObj.pics" :key="index" @click="previewImg(index)"> 
				<image :src="item.pics_big"></image>
			</swiper-item>
		</swiper>
		
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<view class="goods-price">￥{{goodsDetailsObj.goods_price}}</view>
			<view class="goods-info-body">
				<view class="goods-name">{{goodsDetailsObj.goods_name}}</view>
				<view class="collect">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="carriage">快递：免运费</view>
		</view>
		
		<!-- 渲染商品详情信息 -->
		<rich-text :nodes="goodsDetailsObj.goods_introduce"></rich-text>
	</view>
</template>

<script>
	import {getGoodsDetailsAPI} from "@/api/detailsAPI.js"
	export default {
		data() {
			return {
				goodsDetailsObj:{}
				
			};
		},
		onLoad(options) {
			const goods_id = options.goods_id;
			this.getGoodsDetails(goods_id);
		},
		methods:{
			async getGoodsDetails(goods_id) {
				const res =  await getGoodsDetailsAPI(goods_id);
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g,'<img style="display:block;"').replace(/webp/g,'jpg');
				this.goodsDetailsObj = res.message;				
			},
			// 预览图片
			previewImg(index) {
				const imgArr = this.goodsDetailsObj.pics.map(v => v.pics_big);
				uni.previewImage({
					// 预览时，默认显示图片的索引
					current:index,
				// 所有图片 url 地址的数组
					urls:imgArr
				})
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;
		image {
			width: 100%;
			height: 100%;
			display: block;
		}
	}
	
	// 商品信息区域
	.goods-info-box {
		font-size: 12px;
		padding: 10px;
		.goods-price {
			font-size: 20px;
			color: red;
		}
		.goods-info-body {
			margin: 10px 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goods-name {
				flex: 1;
				margin-right: 10px;
			}
			.collect {
				color: gray;
				width: 50px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1px solid #efefef;
			}
		}
		.carriage {
			color: gray;
		}
		
	}

</style>
