<template>
	<view class="settle-contanier">
		<!-- 全选 -->
		<label class="radio" @click="isCheckAll">
			<radio color="#C00000" :checked="isFullChecked" /><text>全选</text>
		</label>
		<!-- 合计 -->
		<view class="amount-box">
			合计：<text class="amount">￥{{checkGoodsAmount}}</text>
		</view>
		<!-- 结算 -->
		<view class="settle-box" @click="settlement">结算({{checkCount}})</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from "vuex";
	import {showMsg} from "@/utils/tools.js"
	export default {
		name: "my-settle",
		computed:{
			...mapGetters('m_cart',['checkCount','total','checkGoodsAmount']),
			...mapState('m_user',['address','token']),
			// 是否全选
			isFullChecked() {
				return this.checkCount == this.total
			}
		},
		data() {
			return {

			};
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			isCheckAll() {
				console.log(this.isFullChecked);
				this.updateAllGoodsState(!this.isFullChecked)
			},
			// 结算
			settlement() {
				if(!this.checkCount) return showMsg("请选择要结算的商品！");
				if(!this.address) return showMsg("请选择地址！");
				if(!this.token) return showMsg("请先登录！");
				
			}
		}
	}
</script>

<style lang="scss">
	.settle-contanier {
		 position: fixed;
		  bottom: 0;
		  left: 0;
		  width: 100%;
		  height: 50px;
		  background-color: white;
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		  padding-left: 5px;
		  font-size: 14px;

		.radio {
			display: flex;
			align-items: center;
		}
		.amount {
			color: #C00000;
		}

		.settle-box {
			min-width: 100px;
			height: 50px;
			line-height: 50px;
			text-align: center;
			color: #fff;
			padding: 0 10px;
			background-color: #C00000;
		}
	}
</style>
