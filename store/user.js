export default {
	namespaced: true,
	state: () => ({
		address:JSON.parse(uni.getStorageSync('address')  || "{}"),
		token: uni.getStorageSync('token') || '',
		userInfo:JSON.parse(uni.getStorageSync('userInfo') || "{}")
	}),
	
	mutations:{
		// 更新地址
		updateAddress(state,address) {
			state.address = address;
			this.commit('m_user/saveStorage')
		},
		// 更新用户信息
		updateUserInfo(state,userInfo) {
			state.userInfo = userInfo;
			this.commit('m_user/saveUserInfoToStorage');
			
		},
		// 更新token
		updateToken(state,token) {
			state.token = token;
			this.commit('m_user/saveToken');
		},
		// 存储到本地
		saveStorage(state) {
			uni.setStorageSync('address',JSON.stringify(state.address));
		},
		// 将用户信息存储到本地
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userInfo',JSON.stringify(state.userInfo));
		},
		// 将token存储到本地
		saveToken(state) {
			uni.setStorageSync("token",state.token);
		}
		
	},
	getters:{
		
	}
}