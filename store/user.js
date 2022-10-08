export default {
	namespaced: true,
	state: () => ({
		address:JSON.parse(uni.getStorageSync('address')  || "{}")
	}),
	
	mutations:{
		// 更新地址
		updateAddress(state,address) {
			state.address = address;
			this.commit('m_user/saveStorage')
		},
		// 存储到本地
		saveStorage(state) {
			uni.setStorageSync('address',JSON.stringify(state.address));
		}
	},
	getters:{
		
	}
}