export default {
	namespaced: true,
	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	getters: {
		total(state) {
			if (state.cart.length > 0) {
				let count = 0;
				state.cart.forEach(v => count += v.goods_count);
				return count;
			}
		}
	},
	mutations: {
		addToCart(state, goodsObj) {
			const findResult = state.cart.find(v => v.goods_id == goodsObj.goods_id);
			if (findResult == undefined) {
				state.cart.push(goodsObj)
			} else {
				findResult.goods_count++
			}
			console.log('cart', state.cart);
			this.commit('m_cart/saveStorage');
		},
		saveStorage(state) {
			uni.setStorageSync('cart',JSON.stringify(state.cart));
		},
		// 更新购物车radio勾选状态
		updataGoodsState(state,goods) {
			const findResult =  state.cart.find(v => v.goods_id == goods.goods_id);
			if(findResult) {
				findResult.goods_state = !goods.goods_state
			}
			this.commit('m_cart/saveStorage');
		},
		// 更新购物车goods_count字段
		updataGoodsCount(state,goods) {
			const findResult = state.cart.find(v => v.goods_id == goods.goods_id);
			if(findResult) {
				findResult.goods_count = goods.goods_count
			}
			console.log('findResult',findResult);
			this.commit('m_cart/saveStorage');
		},
		// 根据商品id删除
		removeGoodsById(state,goods_id) {
			state.cart = state.cart.filter(v => v.goods_id != goods_id);
			console.log('state.cart',state.cart);
			this.commit('m_cart/saveStorage');
		}
	}
}
