import request from "../utils/request.js"

export const getGoodsListAPI = function(params) {
	const options = {
		url: "/api/public/v1/goods/search",
		data: {
			query: params.query,
			cid: params.cid,
			pagenum: params.pagenum,
			pagesize: params.pagesize
		}
	};
	return request(options);
}
