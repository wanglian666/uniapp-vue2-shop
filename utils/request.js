import {showMsg} from "./tools.js"
const BASE_URL = "https://api-hmugo-web.itheima.net";
const request = function(options) {
	// const {
	// 	url="",
	// 	type="GET",
	// 	data= {},
	// 	header={}
	// } = options;
	uni.showLoading({
		title:'数据加载中...'
	})

	 return new Promise((resolve, reject) => {
	        uni.request({
	            url: BASE_URL + options.url || "",
	            method: options.type || "GET",
	            data: options.data || {},
	            header: options.header || {},
	            dataType: 'json',         
	        }).then((response) => {
	            let res= response[1].data;     
				// console.log(res)
				if(res.meta.status !== 200) {
					showMsg("接口异常");
					reject(response);
				}
				resolve(res);
	        }).catch(error => {
				showMsg("接口异常");
				reject(error);
	        }).finally(() => {
				setTimeout(function() {
				    uni.hideLoading();
				}, 200);
			})
	    });
}


export default request;







