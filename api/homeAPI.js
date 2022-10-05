import request from "../utils/request.js"

// 获取轮播图
export const getSwiperListAPI = function() {
	const options = {
		url: '/api/public/v1/home/swiperdata'
	};
	return request(options)
	
} 

// 获取导航list

export const getNavListAPI = function() {
	const options = {
		url:'/api/public/v1/home/catitems'
	}
	return request(options)
}

// 获取楼层数据
export const getFloorListAPI = function() {
	const options = {
		url:'/api/public/v1/home/floordata'
	}
	return request(options)
}