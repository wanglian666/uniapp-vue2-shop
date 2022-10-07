<template>
	<view>
		<!-- 搜索 -->
		<view class="search-box">
			<my-search @click="gotoSearch"></my-search>
		</view>
		<!-- 轮播图 -->
		<swiper indicator-dots autoplay circular interval="3000">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subPackage/goods_details/goods_details?goods_id='+item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 导航 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src"></image>
			</view>
		</view>
		<!-- 楼层 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<image class="floor-title" :src="item.floor_title.image_src"></image>
				<view class="floor-img-box">
					<!-- 左侧大图片的盒子 -->
					<navigator class="img-left-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧 4 个小图片的盒子 -->
					<view class="img-right-box">
						<navigator class="img-right-item" v-for="(item2,index2) in item.product_list" :key="index2"
							v-if="index2 != 0" :url="item2.url">
							<image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}" mode="widthFix">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getSwiperListAPI,
		getNavListAPI,
		getFloorListAPI
	} from "../../api/homeAPI.js";
	import tabBadge from "@/mixins/tabbar-badge.js.js"
	export default {
		mixins:[tabBadge],
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: [],
			};
		},
		onLoad() {
			this.getSwiperList();
			this.getNavList();
			this.getFloorList();
		},
		methods: {
			// 轮播图
			async getSwiperList() {
				const res = await getSwiperListAPI();
				this.swiperList = res.message;
			},
			// 导航
			async getNavList() {
				const res = await getNavListAPI();
				this.navList = res.message;
			},
			// 跳转
			navClickHandler(item) {
				if (item.name == "分类") {
					uni.switchTab({
						url: "/pages/cate/cate"
					})
				}
			},
			// 获取楼层数据
			async getFloorList() {
				const res = await getFloorListAPI();
				res.message.forEach(v => {
					v.product_list.forEach(item => {
						item.url = "/subPackage/goods_list/goods_list?" + item.navigator_url.split("?")[1];
					})
				})
				this.floorList = res.message;
			},
			gotoSearch() {
				uni.navigateTo({
					url:'/subPackage/search/search'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		padding: 15px 0;

		.nav-item,
		image {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-item {
		margin-bottom: 20rpx;
	}

	.floor-title {
		width: 100%;
		height: 60rpx;
	}

	.floor-img-box {
		display: flex;
		padding-left: 15rpx;
	}

	.img-right-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	
	.search-box {
		// 设置吸顶效果
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>
