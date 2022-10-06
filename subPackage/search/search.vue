<template>
	<view class="search-box">
		<uni-search-bar placeholder="请输入搜索内容" radius="100" @input="handlerInput" cancelButton="none"></uni-search-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 延时器timerID
				timer:null,
				keyWord:"",
				
			};
		},
		methods:{
			handlerInput(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					 // 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
					this.keyWord = e;
					console.log(this.keyWord)
				},500)
				
			}
		}
	}
</script>

<style lang="scss">

</style>
