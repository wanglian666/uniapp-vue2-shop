import request from "@/utils/request.js"

export const getLoginToken = function(params) {
	console.log('params',params);
	const options = {
		url:"/api/public/v1/users/wxlogin",
		data:params
		// data:{
		// 	code: params.code,
		// 	encryptedData: params.encryptedData,
		// 	iv: params.iv,
		// 	rawData: params.rawData,
		// 	signature: params.signature
		// }
	};
	return request(options)
	
}