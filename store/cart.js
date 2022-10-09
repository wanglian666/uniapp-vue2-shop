export default {
	namespaced: true,
	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	getters: {
		// 购物车中所有商品的总数量
		total(state) {
			if (state.cart.length > 0) {

				// let count = 0;
				// state.cart.forEach(v => count += v.goods_count);
				// return count;

				return state.cart.reduce((total, item) => total += item.goods_count, 0)
			}
		},
		// 购物车中已勾选商品的总数量
		checkCount(state) {
			// 先使用 filter 方法，从购物车中过滤器已勾选的商品
			// 再使用 reduce 方法，将已勾选的商品总数量进行累加
			// reduce() 的返回值就是已勾选的商品的总数量
			return state.cart.filter(v => v.goods_state).reduce((total, item) => total += item.goods_count, 0);
		},
		// 购物车已勾选商品的总价
		checkGoodsAmount(state) {
			// 先使用 filter 方法，从购物车中过滤器已勾选的商品
			// 再使用 reduce 方法，将已勾选的商品数量 * 单价之后，进行累加
			// reduce() 的返回值就是已勾选的商品的总价
			// 最后调用 toFixed(2) 方法，保留两位小数
			return state.cart.filter(v => v.goods_state).reduce((total, item) => total += item.goods_count * item
				.goods_price, 0).toFixed(2)
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
			// console.log('cart', state.cart);
			this.commit('m_cart/saveStorage');
		},
		saveStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart));
		},
		// 更新购物车radio勾选状态
		updataGoodsState(state, goods) {
			const findResult = state.cart.find(v => v.goods_id == goods.goods_id);
			if (findResult) {
				findResult.goods_state = !goods.goods_state
			}
			this.commit('m_cart/saveStorage');
		},
		// 更新购物车goods_count字段
		updataGoodsCount(state, goods) {
			const findResult = state.cart.find(v => v.goods_id == goods.goods_id);
			if (findResult) {
				findResult.goods_count = goods.goods_count
			}
			// console.log('findResult', findResult);
			this.commit('m_cart/saveStorage');
		},
		// 根据商品id删除
		removeGoodsById(state, goods_id) {
			state.cart = state.cart.filter(v => v.goods_id != goods_id);
			// console.log('state.cart', state.cart);
			this.commit('m_cart/saveStorage');
		},
		// 更新所有商品的勾选状态
		updateAllGoodsState(state, newState) {
			state.cart.forEach(v => v.goods_state = newState);
			this.commit('m_cart/saveStorage');
		}
	}
}
