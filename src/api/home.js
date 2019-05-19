import request from '../utils/request.js'
export function getBrandList(){
  return request({
    url:'https://baojia.chelun.com/v2-car-getMasterBrandList.html?_1558013326050',
    method:'get'
  })
}
export function getCarType(params){
  return request({
    url:'https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html',
    method:'get',
    params
  })
}