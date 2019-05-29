import request from '../utils/request.js'
// 获取车品牌接口
export function getBrandList(){
  return request({
    url:'https://baojia.chelun.com/v2-car-getMasterBrandList.html?_1558013326050',
    method:'get'
  })
}
// 获取某个牌子的车型接口
export function getCarType(params){
  return request({
    url:'https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html',
    method:'get',
    params
  })
}
// 获取车的详细信息
export function getCarDetail(params){
  return request({
    url:'https://baojia.chelun.com/v2-car-getInfoAndListById.html',
    method:'get',
    params
  })
}
// 获取城市所有列表
export function getCityList(){
  return request({
    url:'https://baojia.chelun.com/v1-city-alllist.html?_1558497503639',
    method:'get',
  })
}
// 获取特定城市省份列表
export function getProvinceById(params){//{cityId}
  return request({
    url:'https://baojia.chelun.com/v1-city-alllist.html?',
    method:'get',
    params
  })
}
//获取当前所在城市
export function getCurCity(params){
  return request({
    url:'https://baojia.chelun.com/location-client.html',
    method:'get',
    params
  })
}
//选择报价经销商
export function chooseDealer(params){ //{carId,cityId}
  return request({
    url:'https://baojia.chelun.com/v2-dealer-alllist.html',
    method: 'get',
    params
  })
}
//获取特定车系 图片
export function pictureById(params){
  return request({
    url:'https://baojia.chelun.com/v2-car-getImageList.html',
    method:'get',
    params
  })
}
//获取颜色列表
export function getColor(params){
  return request({//SerialID=3395&_1558665354493
    url:'https://baojia.chelun.com/v2-car-getModelImageYearColor.html',
    method:'get',
    params
  })
}
//获取类别图片列表
export function getCategoryImageList(params){//SerialID=2593&ImageID=6&Page=1&PageSize=30&_1558696277073
  return request({
    url:'https://baojia.chelun.com/v2-car-getCategoryImageList.html?',
    method:'get',
    params
  })
}