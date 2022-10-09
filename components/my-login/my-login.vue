<template>
	<view class="login-box">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<button type="primary" class="login-btn" open-type="getUserInfo" @getuserinfo="getuserInfo">一键登录</button>
		<view class="tip-text">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import {
		showMsg
	} from "@/utils/tools.js";
	import {
		mapMutations
	} from "vuex";
	import {getLoginToken} from "@/api/login.js"
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo','updateToken']),
			getuserInfo(e) {
				console.log(e)
				if (e.detail.errMsg == "getUserInfo:fail auth deny") return showMsg("您取消了登录授权！")
				// console.log(e.detail.userInfo);
				this.updateUserInfo(e.detail.userInfo)
				this.getToken(e.detail)
			},
			async getToken(info) {
				// 获取code
				const [error, res] = await uni.login();
				if (error || res.errMsg !== 'login:ok') return showMsg('登录失败!');
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				};
				 // const data =  await getLoginToken(query);
				 // console.log('接口',res);
				 this.updateToken("aaabbb");


			}
		}
	}
</script>

<style lang="scss">
	.login-box {
		height: 750rpx;
		background-color: #F8F8F8;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;

		&::after {
			position: absolute;
			bottom: 0;
			left: 0;
			content: "";
			display: block;
			background-color: red;
			width: 100%;
			height: 40px;
			border-radius: 100%;
			transform: translateY(50%);
			background-color: #fff;
		}

		.login-btn {
			width: 90%;
			background-color: #C00000;
			margin: 10px 0;
			border-radius: 100px;
		}

		.tip-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>
