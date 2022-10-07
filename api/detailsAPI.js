import request from "@/utils/request.js";

export const getGoodsDetailsAPI = function(params) {
	const options = {
		url:"/api/public/v1/goods/detail",
		data:{
			goods_id:params
		}
	};
	return request(options)
}