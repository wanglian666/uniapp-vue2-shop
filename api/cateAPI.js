import request from "../utils/request.js"

export const getCateListAPI = function() {
	const options = {
		url:"/api/public/v1/categories"
	};
	return request(options);
}