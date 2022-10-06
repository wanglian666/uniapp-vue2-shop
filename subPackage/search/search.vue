<template>
	<view>
		<view class="search-box">
			<uni-search-bar v-model="keyWord" placeholder="请输入搜索内容" radius="100" @input="handlerInput"
				cancelButton="none">
			</uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length != 0">
			<view class="sugg-item" v-for="(item,index) in searchResults" :key="index" @click="gotoDetail(item)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="forward" size="16"></uni-icons>
			</view>
		</view>

		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash-filled" size="18" @click="onDeleteHistoryList"></uni-icons>
			</view>
			<view class="history-item">
				<uni-tag :text="item" inverted="true" v-for="(item,index) in reverseHistoryList" :key="index"
					@click="handlerTag(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getSearchListAPI
	} from "../../api/searchAPI.js"
	export default {
		data() {
			return {
				// 延时器timerID
				timer: null,
				keyWord: "",
				// 搜索的结果列表
				searchResults: [],
				// 搜索历史的数组
				historyList: [],
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync("historyList") || '[]');
		},
		computed: {
			reverseHistoryList() {
				return [...this.historyList].reverse();
			}
		},
		methods: {
			handlerInput() {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					// 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
					this.getSearchList();
				}, 500)
			},
			async getSearchList(params) {
				// if(params) {
				// 	this.keyWord = params;
				// }
				if (this.keyWord.length == 0) {
					this.searchResults = [];
					return
				}
				const res = await getSearchListAPI(this.keyWord);
				this.searchResults = res.message;
			},
			// 跳转到详情页
			gotoDetail(item) {
				uni.navigateTo({
					url: "/subPackage/goods_details/goods_details?goods_id=" + item.goods_id
				});
			},
			// 删除搜索历史数组
			onDeleteHistoryList() {
				this.historyList = [];
				uni.clearStorageSync();
			},
			// 点击搜索历史标签进行搜索
			handlerTag(item) {
				// this.getSearchList(item);
				uni.navigateTo({
					url:'/subPackage/goods_list/goods_list?query=' +item
				})
			}
		},
		watch: {
			// 将关键字存入historyList
			searchResults: function(newVal) {
				if (newVal && newVal.length > 0) {
					if (!this.historyList.includes(this.keyWord)) {
						this.historyList.push(this.keyWord);
						uni.setStorageSync("historyList", JSON.stringify(this.historyList));
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	// 搜索建议
	.sugg-list {
		padding: 0 10px;

		.sugg-item {
			display: flex;
			justify-content: space-between;
			font-size: 12px;
			border-bottom: 1px solid #efefef;
			padding: 10px 0;

			.goods-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}

	// 搜索历史
	.history-box {
		padding: 0 10px;

		.history-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 12px;
			border-bottom: 1px solid #efefef;
		}

		.history-item {
			display: flex;
			flex-wrap: wrap;
			margin-top: 10px;

			uni-tag {
				margin-bottom: 10px;
				margin-right: 5px;
			}
		}
	}
</style>
