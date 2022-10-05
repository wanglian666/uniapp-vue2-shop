<template>
	<view>
		<view class="my-search-contanier">
			<view class="my-search-box">
				<uni-icons type="search" size="17"></uni-icons>
				<text class="placeholder">搜索</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.my-search-contanier {
		height: 50px;
		background-color: #C00000;
		padding: 0 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		.my-search-box {
			width: 100%;
			height: 36px;
			line-height: 36px;
			background-color: #fff;
			border-radius: 18px;
			text-align: center;
			.placeholder {
				font-size: 16px;
				margin-left: 5px;
			}
		}
	}

</style>