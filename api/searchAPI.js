import request from "../utils/request.js"

export const getSearchListAPI = function (params) {
	const options = {
		url:'/api/public/v1/goods/qsearch',
		data:{
			query:params
		}
	};
	return request(options)
}