<template>
	<view>
		<my-search @click="gotoSearch"></my-search>
		<view class="scroll-view-container">
			<!-- 左侧的滚动视图区域 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height:windowHeight+'px'}">
				<block v-for="(item,index) in cateList" :key="index">
					<view :class="['left-scroll-view-item',index === activeIndex ? 'active':'']"
						@click="onChangeIndex(index)">{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			<!-- 右侧的滚动视图区域 -->
			<scroll-view class="right-scroll-view" scroll-y="true" :style="{height:windowHeight+'px'}"
				:scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item,index) in cateLevel2">
					<view class="cate-lv2-title">/ {{item.cat_name}} /</view>
					<!-- 动态渲染三级分类的列表数据 -->
					<view class="cate-lv3-list">
						<!-- 三级分类 Item 项 -->
						<view class="cate-lv3-item" v-for="(item2,index2) in item.children" :key="index2" @click="gotoGoodsList(item2)">
							<image :src="item2.cat_icon"></image>
							<text>{{item2.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		getCateListAPI
	} from "../../api/cateAPI.js"
	export default {
		data() {
			return {
				// 当前设备的可用高度
				windowHeight: 0,
				activeIndex: 0,
				cateList: [],
				cateLevel2: [],
				// 滚动条距离顶部的距离
				scrollTop: 0
			}
		},

		onLoad() {
			const windowInfo = uni.getWindowInfo();
			// 减去搜索框的高度得到可用区的高度
			this.windowHeight = windowInfo.windowHeight - 50;
			this.getCateList()
		},
		methods: {
			async getCateList() {
				const res = await getCateListAPI();
				console.log(res)
				this.cateList = res.message;
				this.cateLevel2 = res.message[0].children;
			},
			onChangeIndex(index) {
				this.activeIndex = index;
				this.cateLevel2 = this.cateList[index].children;
				// 让 scrollTop 的值在 0 与 1 之间切换 让滚动条重置至顶部
				this.scrollTop = this.scrollTop == 0 ? 1 : 0;
			},
			// 跳转到商品列表
			gotoGoodsList(item) {
				uni.navigateTo({
					url:'/subPackage/goods_list/goods_list?cid=' + item.cat_id
				})
			},
			// 跳转到搜索页面
			gotoSearch() {
				console.log('ok')
				uni.navigateTo({
					url:'/subPackage/search/search'
				})
			}

		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 100px;

			.left-scroll-view-item {
				line-height: 60px;
				background-color: #f7f7f7;
				font-size: 12px;
				text-align: center;
			}

			.active {
				background-color: #fff;
				position: relative;

				&::before {
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
					content: "";
					display: block;
					width: 5rpx;
					height: 30px;
					background-color: #C00000;
				}
			}
		}

		.right-scroll-view {
			flex: 1;
		}

		.cate-lv2-title {
			font-size: 12px;
			font-weight: 700;
			text-align: center;
			padding: 15px 0;
		}

		.cate-lv3-list {
			display: flex;
			flex-wrap: wrap;

			.cate-lv3-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 33.33%;
				margin-bottom: 10px;

				image {
					width: 60px;
					height: 60px;
				}

				text {
					font-size: 12px;
				}
			}
		}
	}
</style>
