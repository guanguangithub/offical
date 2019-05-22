import { autorun } from 'mobx'
import BrandList  from './modules/brandList.js'
import CarDetail  from './modules/carDetails.js'
const brandList = new BrandList()
const carDetail = new CarDetail()
// console.log(brandList)
autorun(()=>{
  // brandList.brandList
})
export default {
  brandList,
  carDetail
}