
// tabBar 购物车右上角徽章
import {
	mapGetters
} from "vuex"

export default {
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	watch:{
		total(){
			this.setBadge()
		}
	},
	onShow() {
		this.setBadge()
	},
	methods:{
		setBadge() {
			uni.setTabBarBadge({
				index: 2,
				text: this.total + ''
			})
		}
	}
}
