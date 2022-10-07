<template>
	<view class="goods-list-box">
		<view v-for="(item,index) in goodsList" :key="index" @click="gotoDetails(item)">
			<my-goods :item="item"></my-goods>
		</view>

	</view>
</template>

<script>
	import {
		getGoodsListAPI
	} from "../../api/goodsListAPI.js"
	import {showMsg} from "../../utils/tools.js"
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
				// 节流阀
				isLoading:false,
			}
		},
		onLoad(options) {
			this.queryObj.query = options.query || '';
			this.queryObj.cid = options.cid || '';
			this.getGoodsList();
		},
		methods: {
			async getGoodsList(cb) {
				// 正在发起网络请求
				this.isLoading = true;
				const res = await getGoodsListAPI(this.queryObj);
				// 为数据赋值：通过展开运算符的形式，进行新旧数据的拼接
				this.goodsList = [...this.goodsList,...res.message.goods];
				this.total = res.message.total;
				// 网络请求结束
				this.isLoading = false;
				// 停止当前页面下拉刷新
				cb && cb();
			},
			// 跳转至详情页
			gotoDetails(item) {
				uni.navigateTo({
					url:"/subPackage/goods_details/goods_details?goods_id=" +item.goods_id
				})
			}
		},
		// 上拉触底加载数据事件
		onReachBottom() {
			// 判断数据是否加载完毕
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return showMsg("数据加载完毕！")
			// 判断是否正在请求其它数据，如果是，则不发起额外的请求
			if(this.isLoading) return
			// pagenum +1
			this.queryObj.pagenum += 1;
			this.getGoodsList();			
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.queryObj.pagenum = 1;
			this.goodsList = [];
			this.isLoading = false;
			this.total = 0;
			this.getGoodsList(() => {
				uni.stopPullDownRefresh()
			});
		}
	}
</script>

<style lang="scss">
	
</style>
