<template>
	<view>
		<!-- 未登录 -->
		<my-login v-if="!token"></my-login>
		<!-- 用户信息 -->
		<my-userInfo v-else></my-userInfo>
	</view>
</template>

<script>
	import tabBadge from "@/mixins/tabbar-badge.js.js";
	import {mapState} from "vuex"
	export default {
		mixins:[tabBadge],
		computed:{
			...mapState('m_user',['token'])
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
