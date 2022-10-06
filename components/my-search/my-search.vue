<template>
	<view>
		<view class="my-search-contanier" :style="{'background-color':bgColor}" @click="searchBoxHandler">
			<view class="my-search-box" :style="{'border-radius':radius + 'px'}">
				<uni-icons type="search" size="17"></uni-icons>
				<text class="placeholder">搜索</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props:{
			bgColor:{
				type:String,
				default:"#C00000"
			},
			radius:{
				type:Number,
				default:18
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			searchBoxHandler () {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-contanier {
		height: 50px;
		// background-color: #C00000;
		padding: 0 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		.my-search-box {
			width: 100%;
			height: 36px;
			line-height: 36px;
			background-color: #fff;
			// border-radius: 18px;
			text-align: center;
			.placeholder {
				font-size: 16px;
				margin-left: 5px;
			}
		}
	}

</style>